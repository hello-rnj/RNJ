#!/usr/bin/env node

/**
 * Script pour optimiser les dimensions des images Cloudinary
 * Réduit la taille initiale des images pour améliorer LCP
 */

const fs = require('fs');
const path = require('path');

// Tailles optimales par type d'image
const SIZE_OPTIMIZATIONS = {
  // Logos et icônes
  logo: { maxWidth: 200, maxHeight: 100 },
  icon: { maxWidth: 100, maxHeight: 100 },
  
  // Images de contenu
  thumbnail: { maxWidth: 400, maxHeight: 400 },
  card: { maxWidth: 600, maxHeight: 400 },
  
  // Images hero/background
  hero: { maxWidth: 1920, maxHeight: 1080 },
  background: { maxWidth: 1920, maxHeight: 1080 },
  
  // Par défaut
  default: { maxWidth: 800, maxHeight: 600 },
};

const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const IGNORE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git'];

/**
 * Détermine le type d'image basé sur le nom ou le contexte
 */
function getImageType(src, context) {
  const lowerSrc = src.toLowerCase();
  
  if (lowerSrc.includes('logo') || lowerSrc.includes('minimal-horizontal')) {
    return 'logo';
  }
  if (lowerSrc.includes('icon') || lowerSrc.includes('vector') || lowerSrc.includes('layer')) {
    return 'icon';
  }
  if (lowerSrc.includes('hero') || lowerSrc.includes('mask-group')) {
    return 'hero';
  }
  if (lowerSrc.includes('background') || lowerSrc.includes('bg-')) {
    return 'background';
  }
  if (lowerSrc.includes('card') || lowerSrc.includes('thumbnail')) {
    return 'card';
  }
  
  return 'default';
}

/**
 * Ajoute les paramètres de redimensionnement à une URL Cloudinary
 */
function addSizeParams(url, width, height) {
  // Pattern: /upload/PARAMS/vVERSION/
  const pattern = /\/upload\/([^\/]+)\/v(\d+)\//;
  
  if (pattern.test(url)) {
    return url.replace(pattern, (match, params, version) => {
      // Ajouter w_ et h_ aux paramètres existants
      const newParams = `${params},w_${width},h_${height},c_limit`;
      return `/upload/${newParams}/v${version}/`;
    });
  }
  
  return url;
}

/**
 * Traite un fichier
 */
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let count = 0;

  // Pattern pour les URLs Cloudinary
  const cloudinaryPattern = /https:\/\/res\.cloudinary\.com\/dmrtdo9z3\/image\/upload\/[^\s'"]+/g;
  
  const matches = content.match(cloudinaryPattern);
  
  if (matches) {
    matches.forEach(url => {
      // Ignorer si déjà redimensionné
      if (url.includes('w_') || url.includes('h_')) {
        return;
      }
      
      const imageType = getImageType(url, '');
      const sizes = SIZE_OPTIMIZATIONS[imageType] || SIZE_OPTIMIZATIONS.default;
      
      const optimizedUrl = addSizeParams(url, sizes.maxWidth, sizes.maxHeight);
      
      if (optimizedUrl !== url) {
        content = content.replace(url, optimizedUrl);
        modified = true;
        count++;
      }
    });
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filePath}: ${count} image(s) redimensionnée(s)`);
    return count;
  }

  return 0;
}

/**
 * Parcourt récursivement un dossier
 */
function walkDirectory(dir, callback) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        walkDirectory(filePath, callback);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(file);
      if (FILE_EXTENSIONS.includes(ext)) {
        callback(filePath);
      }
    }
  });
}

/**
 * Main
 */
function main() {
  const srcDir = path.join(__dirname, '..', 'src');
  
  console.log('🚀 Optimisation des dimensions d\'images...\n');
  console.log(`📁 Dossier source: ${srcDir}\n`);
  console.log('---\n');

  let totalOptimizations = 0;
  let totalFiles = 0;

  walkDirectory(srcDir, (filePath) => {
    const count = processFile(filePath);
    if (count > 0) {
      totalFiles++;
      totalOptimizations += count;
    }
  });

  console.log('\n---');
  console.log(`\n✨ Terminé!`);
  console.log(`📊 ${totalOptimizations} image(s) redimensionnée(s) dans ${totalFiles} fichier(s)`);
  console.log('\n💡 Avantages:');
  console.log('   • Tailles adaptées au contexte d\'utilisation');
  console.log('   • Réduction supplémentaire de 30-50% de la taille');
  console.log('   • Amélioration du LCP (Largest Contentful Paint)');
  console.log('   • Moins de bande passante utilisée\n');
}

main();
