import heroRecoveryPerson from "@/assets/hero-recovery-person.jpg";
import heroFamilyEmbrace from "@/assets/hero-family-embrace.jpg";

/**
 * Preloads critical images that should be available immediately
 */
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/genius-recovery-uploads/503e117d-b085-47e8-916d-ecb3995e75e9.png', // Logo
    heroRecoveryPerson,
    heroFamilyEmbrace,
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.type = src.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
    document.head.appendChild(link);
  });
};

/**
 * Lazy preloads images that will likely be needed soon
 */
export const lazyPreloadImages = () => {
  // Use requestIdleCallback for better performance
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Preload images using dynamic imports for better bundling
      import('@/assets/video-preview-v2.jpg');
    });
  }
};

/**
 * Preloads images when user interacts with elements that will show them
 */
export const preloadOnHover = (src: string) => {
  const img = new Image();
  img.src = src;
};