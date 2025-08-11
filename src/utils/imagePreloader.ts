/**
 * Preloads critical images that should be available immediately
 */
export const preloadCriticalImages = () => {
  const criticalImages = [
    '/lovable-uploads/503e117d-b085-47e8-916d-ecb3995e75e9.png', // Logo
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Lazy preloads images that will likely be needed soon
 */
export const lazyPreloadImages = () => {
  const lazyImages = [
    '/assets/hero-recovery-person.jpg',
    '/assets/hero-family-embrace.jpg',
    '/assets/video-preview-v2.jpg',
  ];

  // Wait for initial page load, then preload
  setTimeout(() => {
    lazyImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, 2000);
};

/**
 * Preloads images when user interacts with elements that will show them
 */
export const preloadOnHover = (src: string) => {
  const img = new Image();
  img.src = src;
};