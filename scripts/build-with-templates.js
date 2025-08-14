#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building application...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
  
  // Copy about.html to dist folder for the /about route
  console.log('📋 Copying custom HTML templates...');
  const distPath = path.resolve('dist');
  const aboutHtmlSource = path.resolve('about.html');
  const aboutHtmlDest = path.resolve(distPath, 'about.html');
  
  if (fs.existsSync(aboutHtmlSource)) {
    fs.copyFileSync(aboutHtmlSource, aboutHtmlDest);
    console.log('✅ about.html copied to dist folder');
  }
  
  console.log('🎯 Running react-snap for pre-rendering...');
  execSync('npx react-snap', { stdio: 'inherit' });
  console.log('✅ Pre-rendering completed successfully!');
} catch (error) {
  console.error('❌ Build or pre-rendering failed:', error.message);
  process.exit(1);
}