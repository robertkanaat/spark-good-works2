import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadCriticalImages, lazyPreloadImages } from "./utils/imagePreloader.ts"

// Preload critical images immediately
preloadCriticalImages();

// Lazy preload other images
lazyPreloadImages();

const rootElement = document.getElementById("root")!;

// Check if content was pre-rendered by react-snap
const isPrerendered = rootElement.hasChildNodes();

console.log('🔍 Debug info:', {
  hasChildNodes: isPrerendered,
  innerHTML: rootElement.innerHTML,
  childElementCount: rootElement.childElementCount
});

if (isPrerendered) {
  // Use hydration for pre-rendered content (preserves SEO HTML)
  console.log('✅ Using hydration for pre-rendered content');
  hydrateRoot(rootElement, <App />);
} else {
  // Use standard rendering for client-side navigation
  console.log('⚠️ No pre-rendered content found, using standard rendering');
  createRoot(rootElement).render(<App />);
}
