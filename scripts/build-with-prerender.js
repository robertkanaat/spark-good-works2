#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('Building application...');
execSync('npm run build:dev', { stdio: 'inherit' });

console.log('Pre-rendering with react-snap...');
try {
  execSync('npx react-snap', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      REACT_SNAP_SOURCE: 'dist',
      REACT_SNAP_MINIFY_HTML: 'false'
    }
  });
  console.log('✅ Pre-rendering completed successfully!');
} catch (error) {
  console.error('❌ Pre-rendering failed:', error.message);
  process.exit(1);
}