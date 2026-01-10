import React, { useEffect, useRef } from 'react';
import { PROJECTS, CONNECTIONS, TOPICS } from '../constants';

// We need to declare p5 properly for TypeScript if not using a type definition file
declare global {
  interface Window {
    p5: any;
  }
}

interface NetworkGraphProps {
  onNodeClick: (id: string | null) => void;
  activeId: string | null;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ onNodeClick, activeId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);

  // Keep activeId in a ref for p5 to access without re-init
  const activeIdRef = useRef(activeId);
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    if (!containerRef.current || !window.p5) return;

    const sketch = (p: any) => {
      let nodes: any[] = [];
      let springs: any[] = [];
      let anchorNode: any;
      let activeNode: any = null;

      class Node {
        id: string;
        label: string;
        type: string;
        pos: any;
        vel: any;
        z: number;
        fixed: boolean;
        noiseOffset: number;

        constructor(id: string, label: string, type: string) {
          this.id = id;
          this.label = label;
          this.type = type;
          this.pos = p.createVector(p.random(p.width * 0.5), p.random(p.height));
          this.vel = p.createVector(0, 0);
          this.z = p.random(0.5, 1.5);
          this.fixed = false;
          this.noiseOffset = p.random(1000);
        }

        drift(amt: number) {
          if (this.fixed) return;
          this.pos.x += p.map(p.noise(this.noiseOffset + p.frameCount * amt), 0, 1, -1, 1);
          this.pos.y += p.map(p.noise(this.noiseOffset + 100 + p.frameCount * amt), 0, 1, -1, 1);
          
          // Boundaries
          if (this.pos.x > p.width * 0.8) this.pos.x -= 2;
          if (this.pos.x < 40) this.pos.x += 2;
          if (this.pos.y > p.height - 40) this.pos.y -= 2;
          if (this.pos.y < 40) this.pos.y += 2;
        }

        update() {
          if (!this.fixed) {
            this.vel.mult(0.9);
            this.pos.add(this.vel);
          }
        }

        display() {
          p.push();
          p.translate(this.pos.x, this.pos.y);
          p.scale(this.z);
          
          // Check external active state or internal active node
          const currentActiveId = activeIdRef.current;
          const isThisActive = currentActiveId === this.id;
          const isAnythingActive = !!currentActiveId;
          
          let alpha = p.map(this.z, 0.5, 1.5, 100, 255);
          
          // Dim if something is active but not this, and not connected
          if (isAnythingActive && !isThisActive && !isConnected(this.id, currentActiveId)) {
             alpha *= 0.2;
          }

          p.fill(255, alpha);
          p.noStroke();
          
          if (this.type === 'anchor') {
             p.textSize(22);
             p.textAlign(p.LEFT);
          } else if (this.type === 'project') {
             p.textSize(14);
             p.textAlign(p.CENTER);
          } else {
             p.textSize(10);
             p.textAlign(p.CENTER);
          }

          // Highlight active
          if (isThisActive) {
            p.fill(255, 215, 0, 255); // Gold
          }

          p.text(this.label, 0, 0);
          p.pop();
        }
      }

      class Spring {
        a: Node;
        b: Node;
        len: number;

        constructor(a: Node, b: Node, len: number) {
          this.a = a;
          this.b = b;
          this.len = len;
        }

        update() {
          // Use window.p5.Vector for static method access or p.Vector if available
          let force = window.p5.Vector.sub(this.b.pos, this.a.pos);
          let stretch = force.mag() - this.len;
          force.setMag(stretch * 0.01);
          if (!this.a.fixed) this.a.vel.add(force);
          if (!this.b.fixed) this.b.vel.sub(force);
        }

        display() {
          const currentActiveId = activeIdRef.current;
          let alpha = currentActiveId ? 40 : 80;
          
          if (currentActiveId && (this.a.id === currentActiveId || this.b.id === currentActiveId)) {
            alpha = 200;
          }

          p.stroke(255, 215, 0, alpha);
          p.strokeWeight(0.5);
          p.noFill();
          p.bezier(this.a.pos.x, this.a.pos.y, this.a.pos.x + 20, this.a.pos.y - 20, this.b.pos.x - 20, this.b.pos.y + 20, this.b.pos.x, this.b.pos.y);
          
          let t = (p.frameCount * 0.01 + this.a.noiseOffset) % 1;
          let px = p.bezierPoint(this.a.pos.x, this.a.pos.x + 20, this.b.pos.x - 20, this.b.pos.x, t);
          let py = p.bezierPoint(this.a.pos.y, this.a.pos.y - 20, this.b.pos.y + 20, this.b.pos.y, t);
          p.fill(255, 215, 0, alpha + 50);
          p.circle(px, py, 3);
        }
      }

      function isConnected(idA: string, idB: string | null) {
         if (!idB) return false;
         // Find actual node objects
         const nodeA = nodes.find(n => n.id === idA);
         const nodeB = nodes.find(n => n.id === idB);
         if (!nodeA || !nodeB) return false;

         return springs.some(s => (s.a === nodeA && s.b === nodeB) || (s.a === nodeB && s.b === nodeA));
      }

      p.setup = () => {
        p.createCanvas(containerRef.current!.offsetWidth, containerRef.current!.offsetHeight);
        
        anchorNode = new Node("root", "alina schmeiß", "anchor");
        anchorNode.pos = p.createVector(60, 60);
        anchorNode.fixed = true;
        nodes.push(anchorNode);

        PROJECTS.forEach(proj => {
            let n = new Node(proj.id, proj.label, 'project');
            nodes.push(n);
            springs.push(new Spring(anchorNode, n, 200));
        });

        // Use a Set to avoid duplicate topic nodes if multiple projects share them
        // Although constant list TOPICS is unique, good to be safe.
        TOPICS.forEach(topic => {
            // Only add topic if connected to at least one project
            const connectedProjects = PROJECTS.filter(proj => CONNECTIONS[proj.id]?.includes(topic));
            if (connectedProjects.length > 0) {
                 let n = new Node(topic, topic, 'topic');
                 nodes.push(n);
                 connectedProjects.forEach(proj => {
                     const pNode = nodes.find(node => node.id === proj.id);
                     if (pNode) {
                         springs.push(new Spring(n, pNode, 120));
                     }
                 });
            }
        });
      };

      p.draw = () => {
        p.background("#004d4d");
        let speed = (p.mouseX < p.width * 0.66) ? 0.02 : 0.005;

        nodes.forEach(n => {
            n.drift(speed);
            n.update();
            n.display();
        });

        springs.forEach(s => {
            s.update();
            s.display();
        });
      };

      p.windowResized = () => {
        if (containerRef.current) {
            p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        }
      };

      p.mousePressed = () => {
         // Check if click is on canvas
         if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) return;

         let clicked = false;
         nodes.forEach(n => {
             let d = p.dist(p.mouseX, p.mouseY, n.pos.x, n.pos.y);
             if (d < 30) {
                 if (n.type === 'anchor') {
                    onNodeClick(null);
                 } else if (n.type === 'project') {
                    onNodeClick(n.id);
                 }
                 clicked = true;
             }
         });
         
         // If clicked empty space, do nothing or maybe reset?
         // Original code didn't reset on empty space, only on 'anchor'.
      };
    };

    p5InstanceRef.current = new window.p5(sketch, containerRef.current);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, [onNodeClick]); // Re-init if handler changes (unlikely)

  return <div ref={containerRef} className="w-full h-full" />;
};

export default NetworkGraph;