import React from 'react';
import { Project, MediaItem } from '../types';
import { PROJECTS, CONNECTIONS, TOPIC_DESCRIPTIONS, TOPIC_GALLERIES, TOPIC_VIDEOS } from '../constants';
import ImageSequenceViewer from './ImageSequenceViewer.tsx';
import LazyImage from './LazyImage.tsx';

interface ContentPanelProps {
  activeProject: Project | null;
  activeTopic: string | null;
  showCV?: boolean;
  onLinkClick: (id: string) => void;
  onShowCV?: () => void;
}

const ContentPanel: React.FC<ContentPanelProps> = ({ activeProject, activeTopic, showCV, onLinkClick, onShowCV }) => {
  
  // Find projects for the active topic
  const topicProjects = activeTopic 
    ? PROJECTS.filter(p => CONNECTIONS[p.id]?.includes(activeTopic))
    : [];

  // Helper to safely extract URL from string or MediaItem
  const getMediaUrl = (item: string | MediaItem): string => {
      return typeof item === 'string' ? item : item.url;
  };

  // Helper to safely extract caption from string or MediaItem
  const getMediaCaption = (item: string | MediaItem): string | undefined => {
      return typeof item === 'string' ? undefined : item.caption;
  };

  // Helper to convert Cloud Storage Share Links to Direct Image Links
  const getDirectImageUrl = (item: string | MediaItem) => {
      const url = getMediaUrl(item);
      if (!url || url.includes("PASTE_")) return "";
      
      // Google Drive: Use thumbnail endpoint which acts as a reliable CDN
      // Input: https://drive.google.com/file/d/123abc/view?usp=sharing
      // Output: https://drive.google.com/thumbnail?id=123abc&sz=w2500
      if (url.includes('drive.google.com') && url.includes('/file/d/')) {
          const idMatch = url.match(/\/file\/d\/([^/?]+)/);
          if (idMatch && idMatch[1]) {
              // sz=w2500 requests the image at up to 2500px width
              return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w2500`;
          }
      }

      // OneDrive: Attempt to convert shortlinks to download links
      // Input: https://1drv.ms/i/c/...?e=...
      // Output: https://1drv.ms/i/c/...?download=1
      if (url.includes('1drv.ms')) {
          const baseUrl = url.split('?')[0];
          return `${baseUrl}?download=1`;
      }

      // Dropbox: Convert dl=0 to raw=1
      if (url.includes('dropbox.com')) {
          return url.replace('?dl=0', '?raw=1');
      }

      return url;
  };

  // Helper to convert Google Drive Video Links to Embed URL
  const getVideoEmbedUrl = (url: string) => {
      if (!url) return "";
      // Input: https://drive.google.com/file/d/1-b8lhma3HTEy1S_y2b3LeIobkcx79qFd/view?usp=sharing
      // Output: https://drive.google.com/file/d/1-b8lhma3HTEy1S_y2b3LeIobkcx79qFd/preview
      const idMatch = url.match(/\/file\/d\/([^/?]+)/);
      if (idMatch && idMatch[1]) {
          return `https://drive.google.com/file/d/${idMatch[1]}/preview`;
      }
      return url;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const img = e.currentTarget;
      const currentSrc = img.src;

      // Google Drive Fallback Strategy
      // If the 'thumbnail' link fails, try the 'export=view' link.
      if (currentSrc.includes('drive.google.com/thumbnail')) {
          const idMatch = currentSrc.match(/id=([^&]+)/);
          if (idMatch && idMatch[1]) {
             // Check if we already tried this to prevent infinite loops
             if (img.getAttribute('data-tried-fallback') !== 'true') {
                 const newSrc = `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
                 console.log("Thumbnail failed, switching to fallback:", newSrc);
                 img.setAttribute('data-tried-fallback', 'true');
                 img.src = newSrc;
                 return;
             }
          }
      }

      // If all fails, hide the image
      img.style.display = 'none';
      console.warn("Failed to load image:", currentSrc);
  };

  // Parse text for {{Topic|Display}} format
  const renderTextWithLinks = (text: string) => {
      return text.split('\n').filter(t => t.trim() !== '').map((paragraph, pIdx) => {
          // Split by the regex capturing group so we keep the delimiters to identify them
          const parts = paragraph.split(/(\{\{[^|]+\|[^}]+\}\})/g);
          
          return (
              <p key={pIdx}>
                  {parts.map((part, i) => {
                      // Check if this part matches our link format
                      const match = part.match(/^\{\{([^|]+)\|([^}]+)\}\}$/);
                      if (match) {
                          const [_, topicId, displayText] = match;
                          return (
                              <span 
                                  key={i}
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      onLinkClick(topicId);
                                  }}
                                  className="cursor-pointer text-[#FFB800] hover:underline hover:text-white transition-colors"
                              >
                                  {displayText}
                              </span>
                          );
                      }
                      return <span key={i}>{part}</span>;
                  })}
              </p>
          );
      });
  };

  // CV Render Logic
  if (showCV) {
    return (
      <div 
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full p-8 lg:p-12 overflow-y-auto backdrop-blur-[2px] bg-gradient-to-r from-[#F0F7F8]/60 via-[#F0F7F8] via-3% to-[#F0F7F8] text-[#082129] z-10 custom-scrollbar relative"
      >
         
         {/* Title area */}
         <div className="relative z-20 mb-4 lg:mb-6">
             <h1 className="text-lg lg:text-2xl font-light text-[#FFB800] tracking-widest uppercase m-0 leading-tight">
               Curriculum<br />Vitae
             </h1>
             <LazyImage 
               src={getDirectImageUrl("https://drive.google.com/file/d/1HP3W1P8VbMFqokIwLszlinMinCyKWDXM/view?usp=sharing")} 
               alt="Profile" 
               className="absolute -right-20 lg:-right-44 top-4 lg:top-6 w-24 h-24 lg:w-36 lg:h-36 rounded-full border border-[#FFB800]/30 shadow-xl z-30 bg-black/5"
               headerImagePosition="object-cover"
               onError={handleImageError}
             />
         </div>

         {/* Layout: Content without lines */}
         <div className="relative">
            <div className="space-y-12 relative z-10">
                 {/* Section 1: High School */}
                 <div className="relative group">
                     <h2 className="text-base font-bold font-mono text-[#!082129] mb-2 group-hover:text-[#FFB800] transition-colors">High school</h2>
                     <p className="text-[9px] lg:text-xs font-mono text-[#FFB800]/70 mb-3 tracking-wider">2013-2021</p>
                     <ul className="list-none space-y-2 text-xs lg:text-[11px] font-mono opacity-90 border-l border-[#FFB800]/30 pl-4">
                         <li className="flex items-start">
                             <span className="mr-2 text-[#FFB800] opacity-70">•</span> Gymnasium Dresden-Bühlau
                         </li>
                         <li className="flex items-start">
                             <span className="mr-2 text-[#FFB800] opacity-70">•</span> Graduation grade: 1.7
                         </li>
                         <li className="flex items-start">
                             <span className="mr-2 text-[#FFB800] opacity-70">•</span> High school exchange year in Kentucky, USA
                         </li>
                     </ul>
                 </div>

                 {/* Section 2: Internships */}
                 <div className="relative group pt-4">
                     <h2 className="text-base font-bold font-mono text-[#!082129] mb-2 group-hover:text-[#FFB800] transition-colors">Internships and personal volunteering</h2>
                     {/* Removed date range as requested */}
                     <ul className="list-none space-y-2 text-xs lg:text-[11px] font-mono opacity-90 border-l border-[#FFB800]/30 pl-4 mt-3">
                         <li className="flex items-start">
                             <span className="mr-2 text-[#FFB800] opacity-70">•</span> Involvement in social and youth associations
                         </li>
                         <li className="flex items-start">
                             <span className="mr-2 text-[#FFB800] opacity-70">•</span> One year online internship at the Political Youth Council Dresden
                         </li>
                         <li className="flex items-start">
                             <span className="mr-2 text-[#FFB800] opacity-70">•</span> One year trip to Eastern Europe with a self-converted VW T4, volunteer work through "work and travel"
                         </li>
                         <li className="flex items-start">
                             <span className="mr-2 text-[#FFB800] opacity-70">•</span>
                             <span className="flex-1">Six-month internship at creative industry lobby <span className="whitespace-nowrap">“<a href="https://creative.nrw/" target="_blank" rel="noopener noreferrer" className="text-[#FFB800] hover:underline">creative.nrw</a>”, BOROS</span></span>
                         </li>
                         <li className="flex items-start">
                             <span className="mr-2 text-[#FFB800] opacity-70">•</span> volunteering for NGO "Foodsharing"
                         </li>
                         <li className="flex items-start">
                             <span className="mr-2 text-[#FFB800] opacity-70">•</span> One year of being head of student Council at KISD
                         </li>
                     </ul>
                 </div>

                 {/* Section 3: Education */}
                 <div className="relative group pt-4">
                     <h2 className="text-base font-bold font-mono text-[#!082129] mb-2 group-hover:text-[#FFB800] transition-colors">Academic further education</h2>
                     
                     <div className="mb-6">
                        <p className="text-[9px] lg:text-xs font-mono text-[#FFB800]/70 mb-2 tracking-wider">2022-2024</p>
                        <ul className="list-none space-y-2 text-xs lg:text-[11px] font-mono opacity-90 border-l border-[#FFB800]/30 pl-4">
                            <li className="flex items-start">
                                <span className="mr-2 text-[#FFB800] opacity-70">•</span> 3 semesters, studies at Ecosign – Academy for Design, "Sustainable Design," in Cologne
                            </li>
                        </ul>
                     </div>

                     <div>
                        <p className="text-[9px] lg:text-xs font-mono text-[#FFB800]/70 mb-2 tracking-wider">2024-2029</p>
                        <ul className="list-none space-y-2 text-xs lg:text-[11px] font-mono opacity-90 border-l border-[#FFB800]/30 pl-4">
                            <li className="flex items-start">
                                <span className="mr-2 text-[#FFB800] opacity-70">•</span> Studies at Cologne International School of Design (KISD)
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-[#FFB800] opacity-70">•</span> Integrated Design Bachelor + Master of European Design
                            </li>
                        </ul>
                     </div>
                 </div>
            </div>
         </div>
      </div>
    );
  }

  const isDefaultPage = !activeProject && !activeTopic && !showCV;

  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className={`
        h-full flex flex-col p-4 lg:p-16 overflow-y-auto backdrop-blur-[2px] 
        transition-all duration-500 custom-scrollbar z-10
        ${isDefaultPage 
          ? 'bg-gradient-to-r from-[#F0F7F8]/60 via-[#F0F7F8] via-3% to-[#F0F7F8] text-[#082129]' 
          : 'bg-gradient-to-r from-[#114552]/60 via-[#0C323D] via-3% to-[#0C323D]/95 text-white'}
      `}
    >
      
      {activeProject ? (
        <div className="animate-fade-in-up flex flex-col pb-10">
           
           {/* 1. Sticky Header / Title & Meta */}
           <div className="sticky top-[-1rem] lg:top-[-4rem] pt-2 lg:pt-4 pb-2 lg:pb-4 z-20 backdrop-blur-md bg-[#0C323D]/80 mb-6 border-b border-[#FFB800]/20 -mx-4 px-4 shadow-sm">
             <h1 className="text-base lg:text-2xl font-light text-[#FFB800] tracking-widest uppercase m-0">
               {activeProject.label}
               {activeProject.id === 'p7' && (
                 <span className="ml-4 text-[10px] font-mono bg-[#FFB800] text-[#0C323D] px-2 py-0.5 rounded-full animate-pulse align-middle">New!</span>
               )}
             </h1>
             {/* Subtitle / Meta Info */}
             {activeProject.metaInfo && (
                <p className="font-mono text-[#FFB800] text-xs mt-2 opacity-90 leading-tight">
                    {activeProject.metaInfo}
                </p>
             )}
           </div>

           {/* 2. Header Image */}
           {getDirectImageUrl(activeProject.img) && (
               <div className="mb-8 shrink-0">
                   <LazyImage 
                     src={getDirectImageUrl(activeProject.img)} 
                     alt={activeProject.label} 
                     className={`w-full rounded-sm ${activeProject.id === 'p8' ? 'h-32 lg:h-40' : 'h-64 lg:h-96'}`}
                     headerImagePosition={`object-cover grayscale-[20%] hover:grayscale-0 hover:scale-105 ${activeProject.headerImagePosition || 'object-center'}`}
                     onError={handleImageError}
                     draggable={false}
                     onContextMenu={(e) => e.preventDefault()} 
                   />
                   {getMediaCaption(activeProject.img) && (
                       <p className="font-mono text-[10px] text-[#FFB800]/80 italic mt-1">{getMediaCaption(activeProject.img)}</p>
                   )}
               </div>
           )}
           
           {/* 3. Text Content */}
           <div className="font-sans text-[9px] lg:text-[11px] leading-relaxed opacity-90 space-y-3 text-justify mb-8">
             {renderTextWithLinks(activeProject.text)}
           </div>

           {/* Image Sequence Viewer if any */}
           {activeProject.imageSequence && activeProject.imageSequence.length > 0 && (
               <ImageSequenceViewer images={activeProject.imageSequence} />
           )}

           {/* 4. Gallery Images */}
           {activeProject.gallery && activeProject.gallery.map((item, idx) => (
             <div key={`img-${idx}`} className="w-full mt-4 shrink-0">
                 <LazyImage 
                   src={getDirectImageUrl(item)} 
                   alt={`${activeProject.label} gallery ${idx + 1}`} 
                   className="w-full rounded-sm"
                   headerImagePosition="h-auto grayscale-[20%] hover:grayscale-0"
                   onError={handleImageError}
                   draggable={false}
                   onContextMenu={(e) => e.preventDefault()}
                 />
                 {getMediaCaption(item) && (
                     <p className="font-mono text-[10px] text-[#FFB800]/80 italic mt-1">{getMediaCaption(item)}</p>
                 )}
             </div>
           ))}

           {/* 5. Videos (if any) */}
           {activeProject.videos && activeProject.videos.length > 0 && (
             <div className={`mt-4 w-full grid gap-4 ${activeProject.videos.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
               {activeProject.videos.map((video, idx) => (
                 <div key={`vid-${idx}`} className="flex flex-col gap-2">
                    <div 
                        className={`w-full rounded-sm overflow-hidden bg-black/20 relative shadow-md border border-[#FFB800]/10 ${activeProject.videoAspectRatio || 'aspect-video'}`}
                    >
                        <iframe 
                            src={getVideoEmbedUrl(video.url)} 
                            className="w-full h-full" 
                            allow="autoplay" 
                            title={`${activeProject.label} video ${idx + 1}`}
                        ></iframe>
                    </div>
                    {video.caption && (
                        <p className="font-mono text-[10px] text-[#FFB800]/80 italic mt-1">{video.caption}</p>
                    )}
                 </div>
               ))}
             </div>
           )}

        </div>
      ) : activeTopic ? (
        <div className="animate-fade-in-up flex flex-col pb-10">
            <h1 className="text-lg lg:text-2xl font-light mb-6 text-[#FFB800] tracking-widest uppercase shrink-0">
              {activeTopic}
            </h1>
            
            {/* Topic Description (if available) */}
            {TOPIC_DESCRIPTIONS[activeTopic] && (
                <div className="font-mono text-[9px] lg:text-[11px] leading-relaxed opacity-90 text-justify mb-8 border-l-2 border-[#FFB800] pl-4 py-1">
                    {TOPIC_DESCRIPTIONS[activeTopic]}
                </div>
            )}
            
            {/* Topic Gallery (e.g. for Drawing) */}
            {TOPIC_GALLERIES[activeTopic] && TOPIC_GALLERIES[activeTopic].length > 0 && (
                 <div className="mb-4 space-y-4">
                    {TOPIC_GALLERIES[activeTopic].map((imgUrl, idx) => (
                         <div key={`topic-img-${idx}`} className="w-full shrink-0">
                            <LazyImage 
                              src={getDirectImageUrl(imgUrl)} 
                              alt={`${activeTopic} gallery ${idx + 1}`} 
                              className="w-full rounded-sm"
                              headerImagePosition="h-auto grayscale-[20%] hover:grayscale-0"
                              onError={handleImageError}
                              draggable={false}
                              onContextMenu={(e) => e.preventDefault()}
                            />
                         </div>
                    ))}
                 </div>
            )}

            {/* Topic Videos (e.g. for Drawing) */}
            {TOPIC_VIDEOS[activeTopic] && TOPIC_VIDEOS[activeTopic].length > 0 && (
                 <div className={`mb-8 w-full grid gap-4 ${TOPIC_VIDEOS[activeTopic].length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {TOPIC_VIDEOS[activeTopic].map((vidUrl, idx) => (
                         <div key={`topic-vid-${idx}`} className="w-full rounded-sm overflow-hidden bg-black/20 shrink-0 relative aspect-video shadow-md border border-[#FFB800]/10">
                            <iframe 
                                src={getVideoEmbedUrl(vidUrl)} 
                                className="w-full h-full" 
                                allow="autoplay" 
                                title={`${activeTopic} video ${idx + 1}`}
                            ></iframe>
                         </div>
                    ))}
                 </div>
            )}

            <p className="font-mono text-[10px] mb-4 opacity-70 shrink-0 tracking-wider">RELATED PROJECTS</p>

            <div className="space-y-3 pr-2">
                {topicProjects.length > 0 ? (
                    topicProjects.map(p => (
                        <div 
                            key={p.id} 
                            onClick={(e) => {
                                e.stopPropagation();
                                onLinkClick(p.id);
                            }}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onLinkClick(p.id);
                                }
                            }}
                            className="group cursor-pointer bg-black/10 hover:bg-[#FFB800]/10 rounded-sm border-l-2 border-transparent hover:border-[#FFB800] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#FFB800]/50 overflow-hidden"
                        >
                            {/* Teaser Image */}
                            {getDirectImageUrl(p.img) && (
                                <div className="w-full h-16 lg:h-20 overflow-hidden mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <LazyImage 
                                        src={getDirectImageUrl(p.img)} 
                                        alt={p.label}
                                        className="w-full h-full"
                                        headerImagePosition="object-cover"
                                        onError={handleImageError}
                                    />
                                </div>
                            )}
                            <div className="px-4 pb-4">
                                <h3 className="text-base font-light group-hover:text-[#FFB800] transition-colors group-hover:underline decoration-[#FFB800]/50 underline-offset-4">{p.label}</h3>
                                <p className="text-[11px] lg:text-[12px] font-mono opacity-60 mt-1 line-clamp-2">{p.text}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="font-mono text-xs lg:text-[11px] opacity-50">No specific projects linked directly, but this concept permeates my work.</p>
                )}
            </div>
        </div>
      ) : (
        <div className="flex flex-col justify-start h-full animate-fade-in relative">
           <div className="font-mono text-[9px] lg:text-[13px] leading-relaxed opacity-90 space-y-2 lg:space-y-4">
             <p>
               In my head, my work, and my life, nothing exists in isolation. I believe that we are all part of a living system — an interconnected web.
             </p>
             <p>
               I am an Integrated Designer, which means I see design in relationships. I lean torwards a 'sweet spot' where social justice, environmental stewardship, and creative expression meet.
             </p>
             <p>
               Design is often used to fuel consumption and exploitation. I choose a different path and design to improve. While aligning one’s work with one's deepest values can feel like a radical act in today's world, it is a Utopia I refuse to give up on.
             </p>
             <p>
               This portfolio is a living map of that journey, following my steps around Europe and the world.
             </p>
             
             {/* CV Link replacing the instruction text */}
             <div className={`mt-8 pt-6 border-t ${isDefaultPage ? 'border-[#082129]/20' : 'border-[#FFB800]/30'}`}>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if(onShowCV) onShowCV();
                  }}
                  className={`text-xs font-light tracking-widest uppercase border-b border-transparent pb-0.5 transition-colors ${isDefaultPage ? 'text-[#082129] hover:text-[#FFB800] hover:border-[#FFB800]' : 'text-[#FFB800] hover:text-white hover:border-[#FFB800]'}`}
                >
                  Curriculum Vitae
                </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ContentPanel;
