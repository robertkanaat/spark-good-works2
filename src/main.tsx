import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';
import App from './App.tsx';
import './index.css';
import { preloadCriticalImages, lazyPreloadImages } from './utils/imagePreloader.ts';

// Debug log to confirm rendering
console.log('main.tsx: Initializing React app');

// Preload critical images
preloadCriticalImages();
// Lazy preload other images
lazyPreloadImages();

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('main.tsx: Root element not found');
} else {
  try {
    createRoot(rootElement).render(
      <HelmetProvider>
        <ToastProvider>
          <App />
          <ToastViewport />
        </ToastProvider>
      </HelmetProvider>
    );
  } catch (error) {
    console.error('main.tsx: Error rendering app:', error);
  }
}