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
  
  // Post-process: Replace about page content with custom HTML template
  console.log('🔄 Replacing about page with custom SEO template...');
  const distPath = path.resolve('dist');
  const aboutPagePath = path.resolve(distPath, 'about', 'index.html');
  const aboutTemplatePath = path.resolve('about.html');
  
  if (fs.existsSync(aboutTemplatePath) && fs.existsSync(aboutPagePath)) {
    // Read both files
    const reactGeneratedContent = fs.readFileSync(aboutPagePath, 'utf8');
    const customTemplate = fs.readFileSync(aboutTemplatePath, 'utf8');
    
    // Extract only the essential assets from the React-generated file
    const jsModuleMatch = reactGeneratedContent.match(/<script[^>]*type="module"[^>]*src="[^"]*"[^>]*><\/script>/);
    const cssMatch = reactGeneratedContent.match(/<link[^>]*rel="stylesheet"[^>]*href="[^"]*"[^>]*>/);
    
    let assets = '';
    if (cssMatch) assets += `\n    ${cssMatch[0]}`;
    if (jsModuleMatch) assets += `\n    ${jsModuleMatch[0]}`;
    
    // Replace the head closing tag with assets + head closing
    const finalContent = customTemplate.replace('</head>', `${assets}\n  </head>`);
    
    // Write the final content
    fs.writeFileSync(aboutPagePath, finalContent);
    console.log('✅ About page replaced with custom SEO template + Vite assets!');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}