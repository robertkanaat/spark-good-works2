import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Remove SPA route prefetching that causes 404 errors
    // React Router handles route prefetching internally via code splitting
    
    // Optimize font loading for better performance
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
    document.head.appendChild(fontLink);

    // Remove unused CSS (if any) after initial render
    requestIdleCallback(() => {
      // Clean up any unused CSS classes
      const unusedStyles = document.querySelectorAll('style[data-emotion]');
      unusedStyles.forEach(style => {
        if (style.textContent?.includes('unused')) {
          style.remove();
        }
      });
    });

    return () => {
      // No cleanup needed for font preload
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;