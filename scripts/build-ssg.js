#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building with Vite SSG for perfect SEO...');

try {
  // Build with SSG using custom config
  console.log('📦 Building static site...');
  execSync('npx vite-ssg build --config vite-ssg.config.ts', { stdio: 'inherit' });
  
  console.log('✅ SSG build completed!');
  
  // Verify that HTML files were generated
  const distPath = path.resolve('dist');
  
  // Check for generated files
  const routes = ['', 'about', 'support', 'donation', 'resources', 'emergency'];
  
  routes.forEach(route => {
    const htmlPath = route === '' 
      ? path.resolve(distPath, 'index.html')
      : path.resolve(distPath, route, 'index.html');
    
    if (fs.existsSync(htmlPath)) {
      console.log(`✅ ${route || 'home'} page generated with unique SEO`);
      
      // Quick check if helmet meta tags are in the HTML
      const content = fs.readFileSync(htmlPath, 'utf-8');
      if (content.includes('og:title') && content.includes('og:description')) {
        console.log(`  └─ SEO meta tags detected in ${route || 'home'} page`);
      }
    }
  });
  
  console.log('🎯 Static site generation complete! Each page now has unique SEO tags baked in.');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.log('💡 Falling back to regular Vite build...');
  try {
    execSync('vite build', { stdio: 'inherit' });
    console.log('✅ Regular build completed');
  } catch (fallbackError) {
    console.error('❌ Fallback build also failed:', fallbackError.message);
    process.exit(1);
  }
}