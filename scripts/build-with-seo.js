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
  
  // Now replace the about page with our custom HTML template
  console.log('🔄 Replacing about page with custom SEO template...');
  const distPath = path.resolve('dist');
  const aboutPagePath = path.resolve(distPath, 'about', 'index.html');
  const aboutTemplatePath = path.resolve('about.html');
  
  if (fs.existsSync(aboutTemplatePath) && fs.existsSync(aboutPagePath)) {
    // Read the generated about page to extract Vite assets
    const generatedContent = fs.readFileSync(aboutPagePath, 'utf8');
    const templateContent = fs.readFileSync(aboutTemplatePath, 'utf8');
    
    // Extract script and link tags from the generated content
    const scriptMatches = generatedContent.match(/<script[^>]*>[\s\S]*?<\/script>|<script[^>]*\/>/gi) || [];
    const linkMatches = generatedContent.match(/<link[^>]*rel=["'](?:stylesheet|modulepreload)["'][^>]*>/gi) || [];
    
    // Filter for Vite assets
    const viteAssets = [...scriptMatches, ...linkMatches]
      .filter(tag => 
        tag.includes('type="module"') || 
        tag.includes('.css') || 
        tag.includes('modulepreload')
      );
    
    // Insert Vite assets into the template before closing head tag
    const finalContent = templateContent.replace(
      '</head>',
      `\n    <!-- Vite Assets -->\n    ${viteAssets.join('\n    ')}\n  </head>`
    );
    
    // Write the final content
    fs.writeFileSync(aboutPagePath, finalContent);
    console.log('✅ About page replaced with custom SEO template!');
  }
  
} catch (error) {
  console.error('❌ Build or pre-rendering failed:', error.message);
  process.exit(1);
}