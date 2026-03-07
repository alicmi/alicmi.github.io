import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  headerImagePosition?: string;
  draggable?: boolean;
  onContextMenu?: (e: React.MouseEvent) => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  headerImagePosition = "object-center",
  draggable = false,
  onContextMenu,
  onError
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#FFB800] font-mono text-[10px] gap-2 z-10 bg-[#0C323D]/40 backdrop-blur-sm rounded-[inherit]">
          <Loader2 className="animate-spin w-5 h-5 opacity-70" />
          <span className="tracking-widest uppercase opacity-60">Loading...</span>
        </div>
      )}
      
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full ${headerImagePosition} transition-all duration-700 ${loading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'} rounded-[inherit]`}
        onLoad={() => setLoading(false)}
        onError={onError}
        draggable={draggable}
        onContextMenu={onContextMenu}
      />
    </div>
  );
};

export default LazyImage;
