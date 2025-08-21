import { useEffect } from 'react';

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Prefetch critical pages that users are likely to visit
    const criticalPages = ['/emergency', '/donation', '/resources'];
    
    criticalPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });

    // Optimize font loading
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
      // Cleanup prefetch links on unmount
      document.querySelectorAll('link[rel="prefetch"]').forEach(link => {
        link.remove();
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;