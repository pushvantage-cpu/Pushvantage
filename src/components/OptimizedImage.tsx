import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If local jpg/png image, generate WebP path for modern browsers
  const webpSrc =
    src && (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png'))
      ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
      : null;

  return (
    <div
      className={`relative overflow-hidden ${containerClassName} ${
        !isLoaded && !hasError ? 'bg-neutral-100' : ''
      }`}
    >
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-200/50 to-neutral-100 animate-pulse pointer-events-none"
        />
      )}

      {hasError ? (
        <div className="w-full h-full min-h-[140px] flex flex-col items-center justify-center bg-neutral-100 text-neutral-400 p-4 text-center">
          <span className="text-xs font-semibold text-neutral-600 line-clamp-1">{alt}</span>
          <span className="text-[10px] text-neutral-400 mt-1">Push Vantage Studio</span>
        </div>
      ) : (
        <picture className="w-full h-full flex items-center justify-center">
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            // @ts-expect-error fetchPriority standard attribute for high LCP prioritization
            fetchpriority={priority ? 'high' : 'auto'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`${className} transition-opacity duration-200 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            {...props}
          />
        </picture>
      )}
    </div>
  );
};
