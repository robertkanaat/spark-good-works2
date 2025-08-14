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
  
  // Create a completely separate about.html file at the root level
  console.log('📋 Creating standalone about page...');
  const distPath = path.resolve('dist');
  const aboutTemplatePath = path.resolve('about.html');
  const aboutStandalonePath = path.resolve(distPath, 'about.html');
  
  if (fs.existsSync(aboutTemplatePath)) {
    // Read main index to get Vite assets
    const mainIndexPath = path.resolve(distPath, 'index.html');
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
    
    // Write as about.html directly in dist root
    fs.writeFileSync(aboutStandalonePath, finalContent);
    console.log('✅ Standalone about.html created!');
    
    // Also create a redirect rule for /about to /about.html
    const redirectsContent = '/about /about.html 200\n';
    fs.writeFileSync(path.resolve(distPath, '_redirects'), redirectsContent);
    console.log('✅ Redirect rule created for /about -> /about.html');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}