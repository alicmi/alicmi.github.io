import React from 'react';
import { Project } from '../types';

interface ContentPanelProps {
  activeProject: Project | null;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ activeProject }) => {
  return (
    <div className="h-full flex flex-col p-10 overflow-y-auto backdrop-blur-md bg-gradient-to-r from-[#004d4d]/0 via-[#005a5a]/70 to-[#005a5a]/90 text-white z-10 transition-colors duration-500">
      
      {activeProject ? (
        <div className="animate-fade-in-up">
           <div className="w-full h-64 mb-8 rounded-sm overflow-hidden bg-black/20">
              <img 
                src={activeProject.img} 
                alt={activeProject.label} 
                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
           </div>
           
           <h1 className="text-3xl font-light mb-6 text-[#FFD700] tracking-widest uppercase">
             {activeProject.label}
           </h1>
           
           <div className="font-mono text-sm leading-relaxed opacity-90 space-y-4 text-justify">
             <p>{activeProject.text}</p>
             <p className="opacity-70 mt-4 italic border-l-2 border-[#FFD700] pl-4">
               “Design is not just what it looks like and feels like. Design is how it works... and who it works for.”
             </p>
           </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center h-full animate-fade-in">
           <h1 className="text-4xl font-light mb-8 text-[#FFD700] tracking-widest">
             alina schmeiß
           </h1>
           
           <div className="font-mono text-sm leading-relaxed opacity-90 space-y-6">
             <p>
               In my head, my work, and my life, nothing exists in isolation. I believe that we are all part of a living system—an interconnected web of humans, nature, and the universe.
             </p>
             <p>
               I am an Integrated Designer, which means I don’t just design objects; I design relationships. My work lives in the 'sweet spot' where social justice, environmental stewardship, and creative expression meet.
             </p>
             <p>
               Design is often used to fuel consumption and exploitation. I choose a different path. I design to improve—socially, environmentally, and globally. While aligning one’s work with one's deepest values can feel like a radical act in today's world, it is a Utopia I refuse to give up on. This portfolio is a living map of that journey.
             </p>
             <div className="mt-12 pt-8 border-t border-[#FFD700]/30 text-xs text-[#FFD700]/70">
                <p>Drag nodes to explore connections. Click a project to see details.</p>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ContentPanel;
