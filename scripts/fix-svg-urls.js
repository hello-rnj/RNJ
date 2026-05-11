#!/usr/bin/env node

/**
 * Fix SVG Cloudinary URLs - Remove w_ and h_ params from SVG files
 * SVGs are vector-based and don't need dimension constraints
 * Only raster images (PNG, JPG, WebP) should have w_ and h_
 */

const fs = require('fs');
const path = require('path');

const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const IGNORE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git'];

/**
 * Remove w_ h_ c_limit from SVG URLs only
 */
function fixSvgUrl(url) {
  // Only process SVG URLs
  if (!url.toLowerCase().endsWith('.svg')) {
    return url;
  }

  // Remove w_NNN, h_NNN, c_limit from the params
  return url
    .replace(/,w_\d+/g, '')
    .replace(/,h_\d+/g, '')
    .replace(/,c_limit/g, '')
    .replace(/w_\d+,/g, '')
    .replace(/h_\d+,/g, '')
    .replace(/c_limit,/g, '')
    // Clean up any double commas
    .replace(/,,+/g, ',')
    // Clean up trailing comma before /
    .replace(/,\//g, '/');
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let count = 0;

  const cloudinaryPattern = /https:\/\/res\.cloudinary\.com\/dmrtdo9z3\/image\/upload\/[^\s'"]+\.svg/g;
  const matches = content.match(cloudinaryPattern);

  if (matches) {
    matches.forEach(url => {
      const fixed = fixSvgUrl(url);
      if (fixed !== url) {
        content = content.split(url).join(fixed);
        modified = true;
        count++;
      }
    });
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${path.basename(filePath)}: ${count} SVG URL(s) fixed`);
    return count;
  }
  return 0;
}

function walkDirectory(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) walkDirectory(filePath, callback);
    } else if (FILE_EXTENSIONS.includes(path.extname(file))) {
      callback(filePath);
    }
  });
}

function main() {
  const srcDir = path.join(__dirname, '..', 'src');
  console.log('🔧 Fixing SVG Cloudinary URLs...\n');

  let total = 0;
  walkDirectory(srcDir, filePath => {
    total += processFile(filePath);
  });

  console.log(`\n✨ Done! ${total} SVG URL(s) fixed.`);
  console.log('SVGs are vector-based - no w_/h_ params needed.\n');
}

main();
