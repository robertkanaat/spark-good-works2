#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building application...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
  
  console.log('🎯 Running react-snap for pre-rendering...');
  execSync('npx react-snap', { stdio: 'inherit' });
  console.log('✅ Pre-rendering completed successfully!');
  
  // Create about directory and copy custom HTML
  console.log('📋 Setting up custom about page...');
  const distPath = path.resolve('dist');
  const aboutDir = path.resolve(distPath, 'about');
  const aboutTemplatePath = path.resolve('about.html');
  const aboutDestPath = path.resolve(aboutDir, 'index.html');
  const mainIndexPath = path.resolve(distPath, 'index.html');
  
  if (fs.existsSync(aboutTemplatePath) && fs.existsSync(mainIndexPath)) {
    // Ensure about directory exists
    if (!fs.existsSync(aboutDir)) {
      fs.mkdirSync(aboutDir, { recursive: true });
    }
    
    // Read the main index.html to extract Vite assets
    const mainIndexContent = fs.readFileSync(mainIndexPath, 'utf8');
    const aboutTemplate = fs.readFileSync(aboutTemplatePath, 'utf8');
    
    // Extract script and link tags for assets
    const scriptMatches = mainIndexContent.match(/<script[^>]*src[^>]*><\/script>/gi) || [];
    const linkMatches = mainIndexContent.match(/<link[^>]*rel=["'](?:stylesheet|modulepreload)["'][^>]*>/gi) || [];
    
    // Combine assets
    const viteAssets = [...linkMatches, ...scriptMatches];
    
    // Insert assets into about.html template
    const finalContent = aboutTemplate.replace(
      '</head>',
      `\n    <!-- Vite Build Assets -->\n    ${viteAssets.join('\n    ')}\n  </head>`
    );
    
    // Write the final about page
    fs.writeFileSync(aboutDestPath, finalContent);
    console.log('✅ Custom about page created with SEO template and Vite assets!');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}