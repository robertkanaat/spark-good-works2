import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LazyBackgroundImageProps {
  src: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  placeholder?: string;
}

const LazyBackgroundImage: React.FC<LazyBackgroundImageProps> = ({
  src,
  children,
  className,
  style,
  priority = false,
  placeholder = 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted-foreground) / 0.1) 100%)',
}) => {
  const [isLoaded, setIsLoaded] = useState(priority); // Load immediately if priority
  const [isInView, setIsInView] = useState(priority);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      // For LCP images, load immediately without lazy loading
      setIsLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          loadImage();
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => observer.disconnect();
  }, [priority, src]);

  const loadImage = () => {
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = src;
  };

  return (
    <div
      ref={divRef}
      className={cn("relative", className)}
      style={{
        ...style,
        backgroundImage: isLoaded ? `url(${src})` : placeholder,
        backgroundSize: 'cover',
        backgroundPosition: style?.backgroundPosition || 'center',
        backgroundRepeat: 'no-repeat',
        transition: priority ? 'none' : 'background-image 0.3s ease-in-out',
        willChange: priority ? 'auto' : 'background-image', // Avoid layout thrashing for LCP
      }}
    >
      {children}
    </div>
  );
};

export default LazyBackgroundImage;