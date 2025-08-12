#!/usr/bin/env node

import { execSync } from 'child_process';

console.log('🚀 Building application...');
try {
  execSync('vite build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
  
  console.log('🎯 Running react-snap for pre-rendering...');
  execSync('npx react-snap', { stdio: 'inherit' });
  console.log('✅ Pre-rendering completed successfully!');
} catch (error) {
  console.error('❌ Build or pre-rendering failed:', error.message);
  process.exit(1);
}