import React, { useEffect, useRef } from 'react';
import { PROJECTS, CONNECTIONS, TOPICS, TOPIC_CONNECTIONS, TOPIC_WEIGHTS } from '../constants';

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
  const activeIdRef = useRef(activeId);

  // Keep the ref updated so the p5 sketch can access the latest activeId without re-init
  useEffect(() => { activeIdRef.current = activeId; }, [activeId]);

  useEffect(() => {
    let p5Instance: any = null;
    let intervalId: any = null;
    let resizeObserver: ResizeObserver | null = null;

    const sketch = (p: any) => {
      let nodes: any[] = [];
      let springs: any[] = [];
      
      // Configuration
      const isDesktop = window.innerWidth > 800;
      const MAX_SPEED = isDesktop ? 1.2 : 0.6;         
      const DRAG = isDesktop ? 0.92 : 0.98;             
      const CENTER_GRAVITY = isDesktop ? 0.004 : 0.001;  
      const REPULSION_STRENGTH = isDesktop ? 6000 : 6000; 
      const WALL_FORCE_STRENGTH = 5.0; 
      let WALL_DIST = isDesktop ? 160 : 120;         
      const COLLISION_BOX_SCALE = isDesktop ? 0.85 : 0.8; 
      const STIFFNESS = 0.01;        
      const BOUNCE_IMPULSE = 0.1;    
      
      // Bounds state
      // activeMaxX: The boundary for active/related nodes (visible area)
      // globalMaxX: The boundary for background nodes
      let bounds = { 
          minX: 0, 
          activeMaxX: 0, 
          globalMaxX: 0,
          minY: 0, 
          maxY: 0, 
          cx: 0, 
          cy: 0, 
          anchorX: 0, 
          anchorY: 0 
      };

      const updateBounds = () => {
        const w = p.width;
        const h = p.height;
        const isDesktop = window.innerWidth > 800;

        // Puffer zones
        const marginLeft = isDesktop ? 100 : 40; 
        const marginRight = isDesktop ? 40 : 40;
        
        const marginTop = isDesktop ? 140 : 40; 
        const anchorMarginTop = isDesktop ? 60 : 40;
        const marginBottom = isDesktop ? 80 : 20;

        // Check active state
        const active = activeIdRef.current;
        // Determine if the active item is a project (which triggers the wide 2/3 panel)
        const isProjectActive = active ? PROJECTS.some(p => p.id === active) : false;

        // Calculate Visible Areas based on Content Panel state
        // If active project: Content Panel covers Right 2/3. Visible Graph = Left 1/3.
        // If topic or nothing: Content Panel covers Right 1/3. Visible Graph = Left 2/3.
        
        const visibleRatio = isProjectActive ? 0.33 : 0.66;
        const visibleWidth = isDesktop ? w * visibleRatio : w; 
        
        // For global max (irrelevant nodes), allows them to go slightly behind panel
        const globalMaxWidth = w - marginRight;

        // Anchor X calculation:
        // We want movement! 
        // If Project Active (Small Graph Area): Push anchor further left (e.g., 9%).
        // If Topic/None (Large Graph Area): Keep anchor more centered in the void (e.g., 15%).
        const aXRatio = isProjectActive ? 0.09 : 0.15;
        const aX = isDesktop ? Math.max(marginLeft + 20, w * aXRatio) : -1000; // Hide anchor off-screen on mobile

        bounds = {
            minX: marginLeft,
            activeMaxX: isDesktop ? Math.max(marginLeft + 100, visibleWidth - 50) : (w - marginRight), 
            globalMaxX: isDesktop ? globalMaxWidth : (w - marginRight),
            minY: isDesktop ? marginTop : 20,
            maxY: isDesktop ? (h - marginBottom) : (h - 20),
            cx: visibleWidth / 2, // Center of gravity shifts to visible area
            cy: h / 2,
            anchorX: aX,
            anchorY: isDesktop ? anchorMarginTop : -1000 // Hide anchor off-screen on mobile
        };
      };

      class Node {
        id: string; label: string; type: string;
        pos!: any; vel!: any; acc!: any;
        w!: number; h!: number; textSize!: number;
        fixed: boolean = false;
        noiseX: number; noiseY: number;
        speedMult: number;

        constructor(id: string, label: string, type: string) {
          this.id = id; this.label = label; this.type = type;
          
          this.noiseX = p.random(10000);
          this.noiseY = p.random(10000);
          const isDesktop = window.innerWidth > 800;
          this.speedMult = p.random(0.5, isDesktop ? 1.5 : 1.2); 
          
          this.vel = p.createVector(0,0);
          this.acc = p.createVector(0,0);

          if (type === 'anchor') {
             this.fixed = true;
             // Initialize directly at current target to avoid huge jump on load
             this.pos = p.createVector(bounds.anchorX, bounds.anchorY);
             this.updateDimensions();
          } else if (type === 'project') {
             const isMobile = window.innerWidth <= 800;
             this.textSize = isMobile ? 16 : 40;
             this.pos = p.createVector(p.random(bounds.minX, bounds.activeMaxX), p.random(bounds.minY, bounds.maxY));
             p.textFont('Courier Prime');
             p.textSize(this.textSize);
             p.textStyle(p.BOLD);
             this.w = p.textWidth(this.label);
             this.h = this.textSize * 1.4;
          } else {
             const isMobile = window.innerWidth <= 800;
             const w = TOPIC_WEIGHTS[label] || 3;
             this.textSize = isMobile ? (w === 2 ? 13 : w === 3 ? 12 : 11) : (w === 2 ? 32 : w === 3 ? 28 : 26);
             this.pos = p.createVector(p.random(bounds.minX, bounds.activeMaxX), p.random(bounds.minY, bounds.maxY));
             p.textFont('Inter');
             p.textSize(this.textSize);
             p.textStyle(p.NORMAL);
             this.w = p.textWidth(this.label);
             this.h = this.textSize * 1.4;
          }
        }

        updateDimensions() {
             if (this.type === 'anchor') {
                 const isLg = window.innerWidth > 1024;
                 this.textSize = isLg ? 30 : 24; 
                 p.textSize(this.textSize);
                 p.textFont('Inter');
                 const displayLabel = this.label.replace(/ß/g, 'ẞ').toUpperCase();
                 this.w = p.textWidth(displayLabel) * 1.2; 
                 this.h = this.textSize * 1.5;
             }
        }

        applyForces() {
            if (this.fixed || !this.pos) return;

            // Determine if this node is "relevant" (active or connected to active)
            // If so, it must obey the tighter `activeMaxX`.
            // If not, it can drift to `globalMaxX`.
            const active = activeIdRef.current;
            const isRelevant = !active || (this.id === active) || isConnected(this.id, active);
            
            // Dynamic bounds for this specific node
            const myMaxX = isRelevant ? bounds.activeMaxX : bounds.globalMaxX;

            // 1. Central Gravity
            // Gravity target shifts based on relevance to keep relevant nodes in view
            const targetCx = isRelevant ? bounds.cx : (bounds.cx + 200); 
            const toCenter = p.createVector(targetCx - this.pos.x, bounds.cy - this.pos.y);
            this.acc.add(toCenter.mult(CENTER_GRAVITY));

            // 2. Soft Repulsive Wall Fields
            // Left Wall (Same for all)
            if (this.pos.x < bounds.minX + WALL_DIST) {
                let dist = this.pos.x - bounds.minX;
                let force = WALL_FORCE_STRENGTH * Math.pow((WALL_DIST - dist) / WALL_DIST, 2); 
                this.acc.x += Math.max(0, force); 
            }
            
            // Right Wall (Dynamic)
            if (this.pos.x > myMaxX - WALL_DIST) {
                let dist = myMaxX - this.pos.x;
                // If node is already past the wall (e.g. transitioning state), push harder
                if (dist < 0) {
                     this.acc.x -= WALL_FORCE_STRENGTH * 2;
                } else {
                    let force = WALL_FORCE_STRENGTH * Math.pow((WALL_DIST - dist) / WALL_DIST, 2); 
                    this.acc.x -= Math.max(0, force);
                }
            }
            
            // Top/Bottom
            if (this.pos.y < bounds.minY + WALL_DIST) {
                let dist = this.pos.y - bounds.minY;
                let force = WALL_FORCE_STRENGTH * Math.pow((WALL_DIST - dist) / WALL_DIST, 2); 
                this.acc.y += Math.max(0, force);
            }
            if (this.pos.y > bounds.maxY - WALL_DIST) {
                let dist = bounds.maxY - this.pos.y;
                let force = WALL_FORCE_STRENGTH * Math.pow((WALL_DIST - dist) / WALL_DIST, 2); 
                this.acc.y -= Math.max(0, force);
            }

            // 3. Random Movement
            const isDesktop = window.innerWidth > 800;
            const t = p.frameCount * 0.003 * this.speedMult;
            const nX = p.map(p.noise(this.noiseX, t), 0, 1, -1, 1);
            const nY = p.map(p.noise(this.noiseY, t), 0, 1, -1, 1);
            this.acc.add(p.createVector(nX, nY).mult(isDesktop ? 0.08 : 0.1)); 

            // 4. Mouse Attraction
            if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
                const d = p.dist(p.mouseX, p.mouseY, this.pos.x, this.pos.y);
                const attractRange = 200; 
                if (d < attractRange) {
                    const attract = p.createVector(p.mouseX - this.pos.x, p.mouseY - this.pos.y);
                    attract.normalize();
                    attract.mult(0.8 * (1 - d/attractRange)); 
                    this.acc.add(attract);
                }
            }
        }

        update() {
            if (!this.pos) return;
            
            if (this.fixed) {
                // Smoothly interpolate to the current bounds target (animation effect)
                // Using 0.05 allows for a visible "slide" when switching modes
                this.pos.x = p.lerp(this.pos.x, bounds.anchorX, 0.05);
                this.pos.y = p.lerp(this.pos.y, bounds.anchorY, 0.05);
                return;
            }

            this.vel.add(this.acc);
            this.vel.limit(MAX_SPEED);
            this.vel.mult(DRAG);

            this.pos.add(this.vel);
            this.acc.mult(0); 

            // 5. Hard Wall Bounce
            const active = activeIdRef.current;
            const isRelevant = !active || (this.id === active) || isConnected(this.id, active);
            const myMaxX = isRelevant ? bounds.activeMaxX : bounds.globalMaxX;
            const myMaxY = isRelevant ? bounds.maxY : (p.height - 80);

            const buffer = 5;
            const bounceFactor = isDesktop ? -0.2 : -0.5;
            if (this.pos.x < bounds.minX - buffer) {
                this.pos.x = bounds.minX - buffer;
                this.vel.x *= bounceFactor; 
            }
            if (this.pos.x > myMaxX + buffer) {
                this.pos.x = myMaxX + buffer;
                this.vel.x *= bounceFactor;
            }
            if (this.pos.y < bounds.minY) {
                this.pos.y = bounds.minY;
                this.vel.y *= bounceFactor;
            }
            if (this.pos.y > myMaxY) {
                this.pos.y = myMaxY;
                this.vel.y *= bounceFactor;
            }
        }

        display() {
            if (!this.pos) return;
            
            const isDesktop = window.innerWidth > 800;
            if (!isDesktop && this.type === 'anchor') return; // Don't draw anchor on mobile
            
            p.push();
            const isActive = activeIdRef.current === this.id;
            const hasActive = !!activeIdRef.current;
            const isRelated = hasActive && isConnected(this.id, activeIdRef.current);
            
            let alpha = 255;
            // Reduce alpha significantly for background nodes when something is active
            if (hasActive && !isActive && !isRelated && this.type !== 'anchor') alpha = 30;
            
            p.translate(this.pos.x, this.pos.y);
            p.noStroke();
            
            if (this.type === 'anchor') {
                const isLg = window.innerWidth > 1024;
                const fontSize = isLg ? 30 : 24;

                p.drawingContext.save();
                p.drawingContext.font = `300 ${fontSize}px Inter, sans-serif`;
                p.drawingContext.letterSpacing = "0.1em"; // tracking-widest
                p.drawingContext.textAlign = "left";
                p.drawingContext.textBaseline = "middle";
                p.drawingContext.fillStyle = `rgba(255, 215, 0, ${alpha/255})`; // Gold #FFD700
                
                const displayLabel = this.label.replace(/ß/g, 'ẞ').toUpperCase();
                p.drawingContext.fillText(displayLabel, 0, 0);
                p.drawingContext.restore();

            } else if (this.type === 'project') {
                if (isActive) p.fill(255, 215, 0, alpha);
                else p.fill(255, alpha);
                
                p.textSize(this.textSize);
                p.textFont('Courier Prime');
                p.textStyle(p.BOLD);
                p.textAlign(p.CENTER, p.CENTER);
                p.text(this.label, 0, 0);

            } else {
                if (isActive) p.fill(255, 215, 0, alpha);
                else p.fill(255, alpha);
                
                p.textSize(this.textSize);
                p.textFont('Inter');
                p.textStyle(p.NORMAL);
                p.textAlign(p.CENTER, p.CENTER);
                p.text(this.label, 0, 0);
            }
            
            p.pop();
        }
      }

      function applyGlobalRepulsion() {
          for (let i = 0; i < nodes.length; i++) {
              for (let j = i + 1; j < nodes.length; j++) {
                  let a = nodes[i];
                  let b = nodes[j];
                  if (!a || !b || !a.pos || !b.pos) continue; 
                  if (a.fixed && b.fixed) continue;

                  let dx = a.pos.x - b.pos.x;
                  let dy = a.pos.y - b.pos.y;
                  
                  if (a.type === 'anchor') dx = (a.pos.x + a.w/2) - b.pos.x;
                  if (b.type === 'anchor') dx = a.pos.x - (b.pos.x + b.w/2);

                  let dSq = dx*dx + dy*dy;
                  if (dSq < 1) dSq = 1;
                  
                  let dist = Math.sqrt(dSq);
                  let forceMag = REPULSION_STRENGTH / dSq;
                  forceMag = Math.min(forceMag, 5); 

                  let fx = (dx / dist) * forceMag;
                  let fy = (dy / dist) * forceMag;

                  if (!a.fixed) {
                      a.acc.x += fx;
                      a.acc.y += fy;
                  }
                  if (!b.fixed) {
                      b.acc.x -= fx;
                      b.acc.y -= fy;
                  }
              }
          }
      }

      function resolveCollisions() {
          for (let i = 0; i < nodes.length; i++) {
              for (let j = i + 1; j < nodes.length; j++) {
                  let a = nodes[i], b = nodes[j];
                  if (!a || !b || !a.pos || !b.pos) continue;
                  if (a.fixed && b.fixed) continue;

                  let ax = a.type === 'anchor' ? a.pos.x + a.w/2 : a.pos.x;
                  let ay = a.pos.y;
                  let bx = b.type === 'anchor' ? b.pos.x + b.w/2 : b.pos.x;
                  let by = b.pos.y;

                  let dx = bx - ax;
                  let dy = by - ay;
                  
                  let minW = ((a.w + b.w) / 2) * COLLISION_BOX_SCALE;
                  let minH = ((a.h + b.h) / 2) * COLLISION_BOX_SCALE;
                  
                  if (a.type === 'anchor' || b.type === 'anchor') {
                      minW *= 1.4; 
                      minH *= 1.4;
                  }

                  if (Math.abs(dx) < minW && Math.abs(dy) < minH) {
                      let ox = minW - Math.abs(dx);
                      let oy = minH - Math.abs(dy);

                      if (ox < oy) {
                          let move = ox * STIFFNESS; 
                          let dir = dx > 0 ? 1 : -1;
                          
                          if (!a.fixed) {
                              a.pos.x -= dir * move;
                              a.vel.x -= dir * BOUNCE_IMPULSE; 
                          }
                          if (!b.fixed) {
                              b.pos.x += dir * move;
                              b.vel.x += dir * BOUNCE_IMPULSE;
                          }
                      } else {
                          let move = oy * STIFFNESS;
                          let dir = dy > 0 ? 1 : -1;

                          if (!a.fixed) {
                              a.pos.y -= dir * move;
                              a.vel.y -= dir * BOUNCE_IMPULSE;
                          }
                          if (!b.fixed) {
                              b.pos.y += dir * move;
                              b.vel.y += dir * BOUNCE_IMPULSE;
                          }
                      }
                  }
              }
          }
      }

      function isConnected(idA: string, idB: string | null) {
          if (!idB) return false;
          return springs.some(s => (s.a.id === idA && s.b.id === idB) || (s.a.id === idB && s.b.id === idA));
      }

      p.setup = () => {
          const w = containerRef.current?.offsetWidth || 100;
          const h = containerRef.current?.offsetHeight || 100;
          const canvas = p.createCanvas(w, h);
          
          // Ensure click events only register when the canvas itself is clicked, 
          // preventing clicks on UI overlays (like the ContentPanel) from resetting the graph.
          canvas.mousePressed((e: MouseEvent) => {
              // Only proceed if the click was directly on the canvas element
              if (e.target !== canvas.elt) return;

              let clickedNode = false;
              
              for (let n of nodes) {
                  if (!n.pos) continue;
                  let cx = n.type === 'anchor' ? n.pos.x + n.w/2 : n.pos.x;
                  if (Math.abs(p.mouseX - cx) < n.w/2 && Math.abs(p.mouseY - n.pos.y) < n.h/2) {
                      onNodeClick(n.id);
                      clickedNode = true;
                      break; 
                  }
              }
              
              if (!clickedNode) {
                  onNodeClick(null);
              }
          });

          updateBounds();
          
          nodes = []; springs = [];
          
          nodes.push(new Node("root", "Alina Schmeiß", "anchor"));

          PROJECTS.forEach(p => nodes.push(new Node(p.id, p.label, 'project')));
          
          TOPICS.forEach(t => {
             const hasLinks = PROJECTS.some(p => CONNECTIONS[p.id]?.includes(t)) || 
                              TOPIC_CONNECTIONS.some(tc => tc.source === t || tc.target === t);
             if (hasLinks) nodes.push(new Node(t, t, 'topic'));
          });

          const addLink = (id1: string, id2: string) => {
              const n1 = nodes.find(n => n.id === id1);
              const n2 = nodes.find(n => n.id === id2);
              if (n1 && n2) springs.push({a: n1, b: n2});
          };

          nodes.filter(n => n.type === 'topic').forEach(t => {
              PROJECTS.forEach(p => {
                  if (CONNECTIONS[p.id]?.includes(t.label)) addLink(t.id, p.id);
              });
          });
          TOPIC_CONNECTIONS.forEach(tc => addLink(tc.source, tc.target));

          // Pre-Warm
          for(let i=0; i<300; i++) {
               applyGlobalRepulsion();
               nodes.forEach(n => { n.applyForces(); n.update(); });
               resolveCollisions();
          }
      };

      p.draw = () => {
          p.background("#114552");
          
          // Check if bounds need update based on active state change
          updateBounds();

          applyGlobalRepulsion(); 
          nodes.forEach(n => { n.applyForces(); n.update(); });
          resolveCollisions(); 

          const active = activeIdRef.current;
          springs.forEach(s => {
              if (!s.a.pos || !s.b.pos) return;
              const isRelevant = active && (s.a.id === active || s.b.id === active);
              
              const alpha = isRelevant ? 255 : 60; 
              p.stroke(255, 215, 0, alpha);
              
              p.strokeWeight(isRelevant ? 1.2 : 0.6);
              
              p.noFill();
              
              let ax = s.a.type === 'anchor' ? s.a.pos.x + s.a.w : s.a.pos.x;
              let bx = s.b.type === 'anchor' ? s.b.pos.x + s.b.w : s.b.pos.x;
              
              p.bezier(ax, s.a.pos.y, ax, s.a.pos.y + 30, bx, s.b.pos.y - 30, bx, s.b.pos.y);
          });

          let hovered = false;
          nodes.forEach(n => {
              n.display();
              if (n.pos) {
                  let cx = n.type === 'anchor' ? n.pos.x + n.w/2 : n.pos.x;
                  if (Math.abs(p.mouseX - cx) < n.w/2 && Math.abs(p.mouseY - n.pos.y) < n.h/2) {
                      hovered = true;
                  }
              }
          });
          p.cursor(hovered ? 'pointer' : 'default');

          // Draw Instructions Text
          // Align with the anchor node's X position
          p.push();
          p.fill(255, 215, 0, 180); // Gold, slightly transparent
          p.textFont('Inter');
          p.textSize(10);
          p.textAlign(p.LEFT, p.BOTTOM);
          
          const isDesktop = window.innerWidth > 800;
          if (!isDesktop) return; 
          
          p.text("Click a project or topic to see connections and details.", bounds.anchorX, p.height - 40);
          p.pop();
      };

      p.windowResized = () => {
          if (containerRef.current) {
              p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
              updateBounds();
              
              const anchor = nodes.find(n => n.type === 'anchor');
              if (anchor) {
                 anchor.updateDimensions();
                 anchor.pos.set(bounds.anchorX, bounds.anchorY);
              }
          }
      };
    };

    const initP5 = () => {
        if (window.p5 && containerRef.current && containerRef.current.offsetWidth > 0) {
            if (intervalId) clearInterval(intervalId);
            if (p5Instance) p5Instance.remove();
            
            p5Instance = new window.p5(sketch, containerRef.current);
            
            if (containerRef.current) {
                resizeObserver = new ResizeObserver(() => {
                    if (p5Instance) {
                        p5Instance.windowResized();
                    }
                });
                resizeObserver.observe(containerRef.current);
            }
        }
    };

    initP5();
    if (!p5Instance) {
        intervalId = setInterval(initP5, 200);
    }

    return () => {
        if (intervalId) clearInterval(intervalId);
        if (p5Instance) p5Instance.remove();
        if (resizeObserver) resizeObserver.disconnect();
    };
  }, [onNodeClick]); 

  return <div ref={containerRef} className="w-full h-full" />;
};

export default NetworkGraph;
