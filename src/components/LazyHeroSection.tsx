import { lazy } from 'react';

// Lazy load the HeroSection component to reduce initial bundle size
const HeroSection = lazy(() => import('./HeroSection'));

export default HeroSection;