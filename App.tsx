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
      {/* 
        Network Visualization 
        On mobile: Top 40% (via flex order)
        On desktop: Full screen absolute background
      */}
      <div className="h-[40vh] md:h-full w-full relative md:absolute md:inset-0 z-0 order-1">
        <NetworkGraph onNodeClick={handleNodeClick} activeId={graphActiveId} />
      </div>

      {/* 
        Content Panel
        On mobile: Bottom 60% (via flex order)
        On desktop: Absolute right overlay.
          - Default: w-1/3
          - Active Project: w-2/3
      */}
      <div className={`
          h-[60vh] md:h-full 
          relative md:absolute md:right-0 md:top-0 
          z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.2)] 
          order-2
          transition-all duration-700 ease-in-out
          w-full
          ${activeProjectId ? 'md:w-2/3' : 'md:w-1/3'}
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