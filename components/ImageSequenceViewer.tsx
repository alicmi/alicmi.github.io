import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LazyImage from './LazyImage.tsx';

interface ImageSequenceViewerProps {
  images: string[];
}

const ImageSequenceViewer: React.FC<ImageSequenceViewerProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Helper to convert Google Drive Share Links to Direct Image Links
  const getDirectImageUrl = (url: string) => {
      if (!url) return "";
      if (url.includes('drive.google.com') && url.includes('/file/d/')) {
          const idMatch = url.match(/\/file\/d\/([^/?]+)/);
          if (idMatch && idMatch[1]) {
              return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w2500`;
          }
      }
      return url;
  };

  return (
    <div className="flex flex-col items-center mt-8 mb-12 bg-black/20 p-4 lg:p-8 rounded-sm border border-[#FFB800]/10 shadow-inner relative group">
      <div className="relative w-full flex justify-center min-h-[300px] items-center">
        
        <LazyImage 
          src={getDirectImageUrl(images[currentIndex])} 
          alt={`Sequence page ${currentIndex + 1}`} 
          className="max-w-full rounded-sm shadow-2xl"
          headerImagePosition="h-auto"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 lg:-left-12 top-1/2 -translate-y-1/2 p-3 bg-[#0C323D]/80 text-[#FFB800] hover:text-white hover:bg-[#FFB800]/20 rounded-full transition-all z-20 shadow-lg border border-[#FFB800]/20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 lg:-right-12 top-1/2 -translate-y-1/2 p-3 bg-[#0C323D]/80 text-[#FFB800] hover:text-white hover:bg-[#FFB800]/20 rounded-full transition-all z-20 shadow-lg border border-[#FFB800]/20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
            </button>
          </>
        )}
      </div>
      
      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="font-mono text-[10px] lg:text-xs text-[#FFB800]/70 tracking-widest uppercase">
          Image {currentIndex + 1} of {images.length}
        </p>
        <div className="w-32 h-1 bg-[#FFB800]/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#FFB800] transition-all duration-300" 
            style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSequenceViewer;
