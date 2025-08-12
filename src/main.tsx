import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadCriticalImages, lazyPreloadImages } from "./utils/imagePreloader.ts"

// Preload critical images immediately
preloadCriticalImages();

// Lazy preload other images
lazyPreloadImages();

const rootElement = document.getElementById("root")!;

// Use hydration in production (when pre-rendered) and createRoot in development
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
