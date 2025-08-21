import { lazy } from 'react';

// Lazy load heavy components that aren't needed for initial render
export const LazyTestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
export const LazyFeaturesSection = lazy(() => import('@/components/FeaturesSection'));
export const LazyStatsSection = lazy(() => import('@/components/StatsSection'));
export const LazyVideoSection = lazy(() => import('@/components/VideoSection'));
export const LazyBlogPreviewSection = lazy(() => import('@/components/BlogPreviewSection'));
export const LazyOpenLetterPreview = lazy(() => import('@/components/OpenLetterPreview'));
export const LazyHomeFAQSection = lazy(() => import('@/components/HomeFAQSection'));

// Lazy load pages to prevent MIME type issues with routing
export const LazyBlog = lazy(() => import('@/pages/Blog'));
export const LazyBlogPost = lazy(() => import('@/pages/BlogPost'));

// Lazy load admin and less common components
export const LazyAdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
export const LazyTreatmentCenterMap = lazy(() => import('@/components/TreatmentCenterMap'));
export const LazySupportGroupMap = lazy(() => import('@/components/SupportGroupMap'));