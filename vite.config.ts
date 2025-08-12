import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { exec } from "child_process";

// Plugin to run react-snap after build
const reactSnapPlugin = () => ({
  name: 'react-snap',
  closeBundle: async (): Promise<void> => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Running react-snap for pre-rendering...');
      return new Promise<void>((resolve, reject) => {
        exec('npx react-snap', (error, stdout, stderr) => {
          if (error) {
            console.error('React-snap failed:', error);
            reject(error);
          } else {
            console.log('React-snap completed successfully!');
            console.log(stdout);
            resolve();
          }
        });
      });
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'production' && reactSnapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
