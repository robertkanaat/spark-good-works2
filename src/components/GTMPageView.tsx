import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GTMPageView = () => {
  const location = useLocation();

  useEffect(() => {
    // Only push page view events on production domain
    if (
      typeof window !== 'undefined' &&
      (window.location.hostname === 'geniusrecovery.org' || 
       window.location.hostname === 'www.geniusrecovery.org')
    ) {
      // Track with Google Tag Manager
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: location.pathname,
          search: location.search,
          hash: location.hash,
          url: window.location.href,
          title: document.title
        }
      });

      // Track with Google Analytics
      if (window.gtag) {
        window.gtag('config', 'G-KRFV9ED0L3', {
          page_path: location.pathname + location.search,
          page_title: document.title,
        });
        window.gtag('config', 'GT-MQ7Q8CB', {
          page_path: location.pathname + location.search,
          page_title: document.title,
        });
      }

      console.log('GTM & GA page view tracked:', location.pathname);
    }
  }, [location]);

  return null;
};

export default GTMPageView;
