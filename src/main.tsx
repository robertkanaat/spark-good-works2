import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadCriticalImages, lazyPreloadImages } from "./utils/imagePreloader.ts"

// Preload critical images immediately
preloadCriticalImages();

// Lazy preload other images
lazyPreloadImages();

const rootElement = document.getElementById("root")!;

// Standard React rendering
createRoot(rootElement).render(<App />);
