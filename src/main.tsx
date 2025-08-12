import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadCriticalImages, lazyPreloadImages } from "./utils/imagePreloader.ts"

// Preload critical images immediately
preloadCriticalImages();

// Lazy preload other images
lazyPreloadImages();

const rootElement = document.getElementById("root")!;
createRoot(rootElement).render(<App />);
