import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://lhwxxzxdsrykvznrtigf.supabase.co/functions/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          // UI component chunks - split by usage
          radix: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          radixExtended: ['@radix-ui/react-toast', '@radix-ui/react-scroll-area', '@radix-ui/react-select'],
          // Form and validation
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          // Utilities and styling
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
          // Charts and data visualization (only loaded when needed)
          charts: ['recharts'],
          // Supabase (only when auth/data features used)
          supabase: ['@supabase/supabase-js', '@tanstack/react-query'],
          // Icons (separate chunk as they're heavy)
          icons: ['lucide-react'],
        },
      },
    },
    target: 'es2020', // Modern browsers only - removes legacy polyfills
    minify: 'esbuild',
    cssMinify: true,
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 500,
    // Optimize images but keep reasonable limit
    assetsInlineLimit: 2048, // Reduced from 4096
    // Enable source maps for better debugging but smaller
    sourcemap: mode === 'development',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@supabase/supabase-js'], // Load on demand
  },
  esbuild: {
    // Remove console logs in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
