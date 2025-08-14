import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Separate config for vite-ssg
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes() {
      // Return all the routes you want to pre-render
      return [
        '/',
        '/about',
        '/support', 
        '/crisis-support',
        '/donors',
        '/donation',
        '/resources',
        '/emergency',
        '/blog',
        '/shop',
        '/open-letter',
        '/ai-companion',
        '/press',
        '/privacy-policy',
        '/terms-conditions',
        '/treatment-centers',
        '/contact',
        '/volunteer',
        '/faq'
      ]
    },
  },
});