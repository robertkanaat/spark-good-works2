import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import { preloadCriticalImages, lazyPreloadImages } from './utils/imagePreloader.ts';

// Dynamic import to avoid SSR issues
import('./App.tsx').then(({ default: App }) => {
  // Debug log to confirm rendering
  console.log('main.tsx: Initializing React app');

  // Preload critical images immediately
  preloadCriticalImages();

  // Lazy preload other images
  lazyPreloadImages();

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('main.tsx: Root element not found');
    return;
  }

  try {
    createRoot(rootElement).render(
      <HelmetProvider>
        <App />
      </HelmetProvider>
    );
  } catch (error) {
    console.error('main.tsx: Error rendering app:', error);
  }
}).catch(error => {
  console.error('main.tsx: Failed to load App:', error);
});