#!/usr/bin/env node

/**
 * Fix raster image (PNG/JPG/WebP) Cloudinary URLs:
 * 1. Remove duplicate c_limit
 * 2. Set proper dimensions per image type
 */

const fs = require('fs');
const path = require('path');

const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const IGNORE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git'];

// Proper sizes per image context
const SIZE_RULES = [
  // Hero / large section backgrounds
  { pattern: /esg-conformit|mask-group-36|mask-group-44|mask-group-16|mask-group-17|mask-group-39|group-65|group-541|business-people/i, w: 1200, h: 900 },
  // Profile photos
  { pattern: /profile-entrepreneur|profile-investisseur|profile-institution/i, w: 400, h: 400 },
  // Logo
  { pattern: /minimal-horizontal-logo/i, w: 200, h: 80 },
  // OG / Twitter meta images
  { pattern: /og-|twitter-/i, w: 1200, h: 630 },
  // Generic groups / illustrations
  { pattern: /group-/i, w: 800, h: 800 },
  // Fallback
  { pattern: /.*/, w: 800, h: 600 },
];

function getSizeForUrl(url) {
  for (const rule of SIZE_RULES) {
    if (rule.pattern.test(url)) return { w: rule.w, h: rule.h };
  }
  return { w: 800, h: 600 };
}

function isRaster(url) {
  return /\.(png|jpg|jpeg|webp|gif)$/i.test(url);
}

function fixRasterUrl(url) {
  if (!isRaster(url)) return url;

  // 1. Strip ALL existing w_, h_, c_limit params (clean slate)
  let clean = url
    .replace(/,?c_limit/g, '')
    .replace(/,?w_\d+/g, '')
    .replace(/,?h_\d+/g, '')
    // Clean up orphan commas
    .replace(/,([,/])/g, '$1')
    .replace(/\/,/g, '/')
    // trailing comma before version segment
    .replace(/,(\/v\d+\/)/g, '$1');

  // 2. Insert proper params before the version segment
  const { w, h } = getSizeForUrl(url);
  clean = clean.replace(/(\/upload\/[^/]+)(\/v\d+\/)/, `$1,w_${w},h_${h},c_limit$2`);

  return clean;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let count = 0;

  const cloudinaryPattern = /https:\/\/res\.cloudinary\.com\/dmrtdo9z3\/image\/upload\/[^\s'"]+\.(png|jpg|jpeg|webp|gif)/gi;
  const matches = [...new Set(content.match(cloudinaryPattern) || [])];

  for (const url of matches) {
    const fixed = fixRasterUrl(url);
    if (fixed !== url) {
      content = content.split(url).join(fixed);
      modified = true;
      count++;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${path.basename(filePath)}: ${count} URL(s) fixed`);
    return count;
  }
  return 0;
}

function walkDirectory(dir, callback) {
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) walkDirectory(filePath, callback);
    } else if (FILE_EXTENSIONS.includes(path.extname(file))) {
      callback(filePath);
    }
  }
}

function main() {
  const srcDir = path.join(__dirname, '..', 'src');
  console.log('🔧 Fixing raster (PNG/JPG/WebP) Cloudinary URLs...\n');

  let total = 0;
  walkDirectory(srcDir, filePath => { total += processFile(filePath); });

  console.log(`\n✨ Done! ${total} raster URL(s) fixed.`);
  console.log('• Removed duplicate c_limit');
  console.log('• Set proper dimensions per image type\n');
}

main();
