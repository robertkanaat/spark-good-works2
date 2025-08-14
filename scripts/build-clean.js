#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building application...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
  
  // Copy about.html to replace the about route BEFORE react-snap
  console.log('📋 Setting up about page template...');
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
    
    // Read main index to get Vite assets
    const mainContent = fs.readFileSync(mainIndexPath, 'utf8');
    const aboutTemplate = fs.readFileSync(aboutTemplatePath, 'utf8');
    
    // Extract CSS and JS assets
    const cssMatch = mainContent.match(/<link[^>]*rel="stylesheet"[^>]*>/);
    const jsMatch = mainContent.match(/<script[^>]*type="module"[^>]*><\/script>/);
    
    let assets = '';
    if (cssMatch) assets += `\n    ${cssMatch[0]}`;
    if (jsMatch) assets += `\n    ${jsMatch[0]}`;
    
    // Insert assets into about template
    const finalContent = aboutTemplate.replace('</head>', `${assets}\n  </head>`);
    
    fs.writeFileSync(aboutDestPath, finalContent);
    console.log('✅ About page created with custom SEO template!');
  }
  
  console.log('🎯 Running react-snap for pre-rendering...');
  execSync('npx react-snap', { stdio: 'inherit' });
  console.log('✅ Pre-rendering completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}