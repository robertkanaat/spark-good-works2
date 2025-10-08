import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer: any[];
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
      // Ensure dataLayer exists
      window.dataLayer = window.dataLayer || [];
      
      // Push page view event to GTM
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

      console.log('GTM page view tracked:', location.pathname);
    }
  }, [location]);

  return null;
};

export default GTMPageView;
