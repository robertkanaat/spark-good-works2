#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Building application...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

console.log('📄 Pre-rendering with react-snap...');
try {
  execSync('npx react-snap', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production'
    }
  });
  console.log('✅ Pre-rendering completed successfully!');
  console.log('📁 Static HTML files generated in dist/ directory');
} catch (error) {
  console.error('❌ Pre-rendering failed:', error.message);
  console.error('Build succeeded but pre-rendering failed');
  process.exit(1);
}