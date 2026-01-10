import React, { useState, useCallback } from 'react';
import NetworkGraph from './components/NetworkGraph';
import ContentPanel from './components/ContentPanel';
import ChatWidget from './components/ChatWidget';
import { PROJECTS } from './constants';
import { Project } from './types';

const App: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const activeProject = activeProjectId 
    ? PROJECTS.find(p => p.id === activeProjectId) || null 
    : null;

  const handleNodeClick = useCallback((id: string | null) => {
    setActiveProjectId(id);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden bg-[#004d4d] relative">
      {/* 
        Network Visualization 
        On mobile, it takes top 40%. On desktop, it takes left 66%.
      */}
      <div className="h-[40vh] md:h-full md:flex-[2] relative order-1 md:order-1 z-0">
        <NetworkGraph onNodeClick={handleNodeClick} activeId={activeProjectId} />
      </div>

      {/* 
        Content Panel
        On mobile, it takes bottom 60%. On desktop, it takes right 33%.
      */}
      <div className="h-[60vh] md:h-full md:flex-1 relative order-2 md:order-2 z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.2)]">
        <ContentPanel activeProject={activeProject} />
      </div>

      {/* AI Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default App;
