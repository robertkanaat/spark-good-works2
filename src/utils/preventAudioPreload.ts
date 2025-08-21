// Prevent audio files from auto-loading and consuming bandwidth
export const preventAudioAutoLoad = () => {
  // Find all audio elements and set preload to 'none'
  const audioElements = document.querySelectorAll('audio');
  audioElements.forEach((audio) => {
    if (audio.preload !== 'none') {
      audio.preload = 'none';
      // Remove src temporarily to prevent loading
      const originalSrc = audio.src;
      audio.removeAttribute('src');
      // Add click listener to load on demand
      audio.addEventListener('play', () => {
        if (!audio.src) {
          audio.src = originalSrc;
        }
      }, { once: true });
    }
  });
};

// Defer loading of external audio content
export const optimizeAudioElements = () => {
  // Use requestIdleCallback to optimize audio elements when browser is idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      preventAudioAutoLoad();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      preventAudioAutoLoad();
    }, 100);
  }
};