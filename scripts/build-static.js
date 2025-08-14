#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building application...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
  
  // Copy about.html directly to dist/about/index.html
  console.log('📋 Setting up static about page...');
  const distPath = path.resolve('dist');
  const aboutDir = path.resolve(distPath, 'about');
  const aboutTemplatePath = path.resolve('about.html');
  const aboutDestPath = path.resolve(aboutDir, 'index.html');
  
  if (fs.existsSync(aboutTemplatePath)) {
    // Ensure about directory exists
    if (!fs.existsSync(aboutDir)) {
      fs.mkdirSync(aboutDir, { recursive: true });
    }
    
    // Copy about.html directly
    fs.copyFileSync(aboutTemplatePath, aboutDestPath);
    console.log('✅ Static about page created from about.html template!');
  }
  
  console.log('🎯 Running react-snap for pre-rendering other pages...');
  execSync('npx react-snap', { stdio: 'inherit' });
  console.log('✅ Pre-rendering completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}