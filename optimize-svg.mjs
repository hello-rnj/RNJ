#!/usr/bin/env node

import fs from 'node:fs/promises';

// Simple SVG optimization by removing unnecessary data
function optimizeSvg(svgContent) {
  let optimized = svgContent;
  
  // Remove comments
  optimized = optimized.replace(/<!--[\s\S]*?-->/g, '');
  
  // Remove redundant whitespace between tags
  optimized = optimized.replace(/>\s+</g, '><');
  
  // Remove default values
  optimized = optimized.replace(/fill="none"/g, '');
  optimized = optimized.replace(/stroke="none"/g, '');
  
  // Remove metadata
  optimized = optimized.replace(/<metadata[\s\S]*?<\/metadata>/g, '');
  
  // Remove empty groups
  optimized = optimized.replace(/<g[^>]*>\s*<\/g>/g, '');
  
  // Minify numbers (remove unnecessary decimal places)
  optimized = optimized.replace(/(\d+\.\d{3,})/g, (match) => {
    return parseFloat(match).toFixed(2);
  });
  
  return optimized.trim();
}

async function main() {
  const inputPath = '/var/www/rnj/public/optimized/Ramzi image.svg';
  const outputPath = '/var/www/rnj/public/optimized/Ramzi-image-optimized.svg';
  
  try {
    console.log('Reading SVG file...');
    const originalContent = await fs.readFile(inputPath, 'utf8');
    
    console.log('Original file size:', originalContent.length, 'bytes');
    
    console.log('Optimizing SVG...');
    const optimizedContent = optimizeSvg(originalContent);
    
    console.log('Optimized file size:', optimizedContent.length, 'bytes');
    console.log('Size reduction:', Math.round((1 - optimizedContent.length / originalContent.length) * 100), '%');
    
    await fs.writeFile(outputPath, optimizedContent, 'utf8');
    console.log('Optimized SVG saved to:', outputPath);
    
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main().catch(console.error);
