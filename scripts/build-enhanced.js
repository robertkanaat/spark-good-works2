#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building with perfect SEO using simple approach...');

try {
  // Regular build first
  console.log('📦 Building with Vite...');
  execSync('vite build', { stdio: 'inherit' });
  
  console.log('✅ Build completed!');
  
  // Now enhance with SEO injection
  const distPath = path.resolve('dist');
  const indexHtmlPath = path.resolve(distPath, 'index.html');
  
  if (fs.existsSync(indexHtmlPath)) {
    const indexContent = fs.readFileSync(indexHtmlPath, 'utf-8');
    
    // Create about page with unique SEO
    const aboutDir = path.resolve(distPath, 'about');
    if (!fs.existsSync(aboutDir)) {
      fs.mkdirSync(aboutDir, { recursive: true });
    }
    
    // Create about page with modified title and meta
    const aboutContent = indexContent
      .replace(
        /<title>.*?<\/title>/,
        '<title>About Us - Our Journey from Pain to Purpose | Genius Recovery</title>'
      )
      .replace(
        /<meta name="description" content=".*?"/,
        '<meta name="description" content="Learn about Genius Recovery\'s mission to change how the world understands addiction through compassion, education, and community support."'
      )
      .replace(
        /<meta property="og:title" content=".*?"/,
        '<meta property="og:title" content="About Us - Our Journey from Pain to Purpose | Genius Recovery"'
      )
      .replace(
        /<meta property="og:description" content=".*?"/,
        '<meta property="og:description" content="Learn about Genius Recovery\'s mission to change how the world understands addiction through compassion, education, and community support."'
      )
      .replace(
        /<meta property="og:url" content=".*?"/,
        '<meta property="og:url" content="https://geniusrecovery.io/about"'
      )
      .replace(
        /<link rel="canonical" href=".*?"/,
        '<link rel="canonical" href="https://geniusrecovery.io/about"'
      );
    
    fs.writeFileSync(path.resolve(aboutDir, 'index.html'), aboutContent);
    console.log('✅ About page created with unique SEO');
  }
  
  console.log('🎯 Build complete with enhanced SEO!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}