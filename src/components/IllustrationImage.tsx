import React, { useState } from 'react';

interface IllustrationImageProps {
  src: string;
  alt: string;
  accentBg?: string;
  aspectClass?: string;
  className?: string;
}

/**
 * Renders painterly digital editorial illustrations with soft atmospheric framing
 * and a rich painterly SVG fallback container so no broken image frame ever appears.
 */
export const IllustrationImage: React.FC<IllustrationImageProps> = ({
  src,
  alt,
  accentBg = '#F7F3EA',
  aspectClass = 'aspect-[16/10]',
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`painterly-image-frame relative overflow-hidden ${aspectClass} ${className}`}
      style={{ backgroundColor: accentBg }}
    >
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center bg-[#F7F3EA] p-6 text-center"
          role="img"
          aria-label={alt}
        >
          <span className="max-w-[26ch] font-display text-sm font-bold text-[#172033]">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};
