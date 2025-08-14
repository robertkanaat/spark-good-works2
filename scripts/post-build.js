#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('📋 Post-build: Setting up HTML templates...');

const distPath = path.resolve('dist');

// Read the generated index.html from vite build
const builtIndexPath = path.resolve(distPath, 'index.html');
const aboutDestPath = path.resolve(distPath, 'about', 'index.html');

if (fs.existsSync(builtIndexPath)) {
  const indexContent = fs.readFileSync(builtIndexPath, 'utf8');
  
  // Read our custom about.html template
  const aboutTemplatePath = path.resolve('about.html');
  if (fs.existsSync(aboutTemplatePath)) {
    const aboutTemplate = fs.readFileSync(aboutTemplatePath, 'utf8');
    
    // Extract the head content from built index.html (contains vite assets)
    const indexHeadMatch = indexContent.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    const builtHead = indexHeadMatch ? indexHeadMatch[1] : '';
    
    // Extract script tags from built index.html
    const scriptMatches = builtHead.match(/<script[^>]*>[\s\S]*?<\/script>|<script[^>]*\/>/gi) || [];
    const linkMatches = builtHead.match(/<link[^>]*\/?>|<link[^>]*>[\s\S]*?<\/link>/gi) || [];
    
    // Get vite assets (js/css files)
    const viteAssets = [...scriptMatches, ...linkMatches]
      .filter(tag => tag.includes('.js') || tag.includes('.css') || tag.includes('modulepreload'));
    
    // Replace the head content in about.html template with SEO + vite assets
    const aboutTemplateHead = aboutTemplate.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
    if (aboutTemplateHead) {
      const seoHead = aboutTemplateHead[1];
      const combinedHead = seoHead + '\n\n    <!-- Vite Assets -->\n    ' + viteAssets.join('\n    ');
      const finalAboutContent = aboutTemplate.replace(
        /<head[^>]*>[\s\S]*?<\/head>/i,
        `<head>\n    ${combinedHead}\n  </head>`
      );
      
      // Ensure about directory exists
      const aboutDir = path.dirname(aboutDestPath);
      if (!fs.existsSync(aboutDir)) {
        fs.mkdirSync(aboutDir, { recursive: true });
      }
      
      // Write the final about/index.html
      fs.writeFileSync(aboutDestPath, finalAboutContent);
      console.log('✅ about/index.html created with SEO and Vite assets');
    }
  }
}

console.log('✅ Post-build setup completed!');