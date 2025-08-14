import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadCriticalImages, lazyPreloadImages } from "./utils/imagePreloader.ts"

// Debug log to confirm rendering
console.log('main.tsx: Initializing React app');

// Preload critical images immediately
preloadCriticalImages();
// Lazy preload other images
lazyPreloadImages();

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('main.tsx: Root element not found');
} else {
  createRoot(rootElement).render(<App />);
}