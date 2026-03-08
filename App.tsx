import React, { useState, useCallback } from 'react';
import NetworkGraph from './components/NetworkGraph.tsx';
import ContentPanel from './components/ContentPanel.tsx';
import { PROJECTS } from './constants';

const App: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [showCV, setShowCV] = useState<boolean>(false);

  const activeProject = activeProjectId 
    ? PROJECTS.find(p => p.id === activeProjectId) || null 
    : null;

  // activeId passed to graph is either project ID or topic string
  const graphActiveId = activeProjectId || activeTopic;

  const handleNodeClick = useCallback((id: string | null) => {
    if (!id) {
        // Clicking background clears everything
        setActiveProjectId(null);
        setActiveTopic(null);
        setShowCV(false);
        return;
    }

    // Special case for root node (Alina Schmeiß)
    if (id === 'root') {
        setActiveProjectId(null);
        setActiveTopic(null);
        setShowCV(true);
        return;
    }

    // Clicking a node always clears CV mode
    setShowCV(false);

    // Check if ID is a project
    const isProject = PROJECTS.some(p => p.id === id);
    if (isProject) {
        setActiveProjectId(id);
        setActiveTopic(null);
    } else {
        // Must be a topic
        setActiveProjectId(null);
        setActiveTopic(id);
    }
  }, []);

  const handleLinkClick = useCallback((id: string) => {
      if (id === 'root') {
          setActiveProjectId(null);
          setActiveTopic(null);
          setShowCV(true);
          return;
      }

      setShowCV(false);
      
      const isProject = PROJECTS.some(p => p.id === id);
      if (isProject) {
          setActiveProjectId(id);
          setActiveTopic(null);
      } else {
          setActiveProjectId(null);
          setActiveTopic(id);
      }
  }, []);

  const handleShowCV = useCallback(() => {
    setActiveProjectId(null);
    setActiveTopic(null);
    setShowCV(true);
  }, []);

  return (
    <div className="flex flex-col md:block h-screen w-screen overflow-hidden bg-[#114552] relative">
      {/* Mobile Header Section */}
      <div className="md:hidden flex flex-col bg-[#114552] z-[100] relative">
        {/* Disclaimer */}
        <div className="w-full p-1.5 bg-[#FFB800] text-[#114552] text-[9px] font-bold text-center uppercase tracking-wider pointer-events-none">
          This Portfolio is recommended to be viewed on a desktop device
        </div>
        
        {/* Name & Instructions */}
        <div className="px-6 py-4 flex flex-col gap-1">
          <h1 className="text-[#FFB800] text-xl font-light tracking-widest uppercase">
            Alina Schmeiß
          </h1>
          <p className="text-[#FFB800]/70 text-[10px] font-mono">
            Click nodes to see details.
          </p>
        </div>
      </div>

      {/* 
        Network Visualization 
        Absolute background to allow content panel to overlap
      */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <NetworkGraph onNodeClick={handleNodeClick} activeId={graphActiveId} />
      </div>

      {/* 
        Content Panel
        On mobile: Overlaps map at the bottom. 40vh default, 60vh for projects.
        On desktop: Right overlay.
      */}
      <div className={`
          h-[25vh] md:h-full 
          relative md:absolute md:right-0 md:top-0 md:left-auto
          z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.2)] md:shadow-[-10px_0_30px_rgba(0,0,0,0.2)] 
          transition-all duration-700 ease-in-out
          w-full
          ${activeProjectId ? 'h-[60vh] md:h-full md:w-2/3' : 'h-[40vh] md:h-full md:w-1/3'}
      `}>
        <ContentPanel 
            activeProject={activeProject} 
            activeTopic={activeTopic}
            showCV={showCV}
            onLinkClick={handleLinkClick}
            onShowCV={handleShowCV}
        />
      </div>
    </div>
  );
};

export default App;
