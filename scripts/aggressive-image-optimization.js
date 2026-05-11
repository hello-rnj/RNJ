#!/usr/bin/env node

/**
 * Optimisation AGRESSIVE des images Cloudinary
 * Réduit drastiquement les tailles pour améliorer LCP
 */

const fs = require('fs');
const path = require('path');

// Tailles TRÈS agressives pour maximiser la performance
const AGGRESSIVE_SIZES = {
  // SVG et icônes - TRÈS petits
  'vector-': { w: 50, h: 50 },
  'icon-': { w: 50, h: 50 },
  'pins-': { w: 80, h: 80 },
  'layer-': { w: 100, h: 100 },
  
  // Logos
  'logo': { w: 150, h: 80 },
  'minimal-horizontal-logo': { w: 150, h: 60 },
  
  // Groupes et illustrations
  'group-': { w: 400, h: 400 },
  'mask-group-12': { w: 80, h: 80 },  // Icône
  'mask-group-11': { w: 80, h: 80 },  // Icône
  'mask-group-3': { w: 80, h: 80 },   // Icône
  'mask-group-4': { w: 80, h: 80 },   // Icône
  'mask-group-5': { w: 80, h: 80 },   // Icône
  
  // Images hero/background - réduites
  'mask-group-16': { w: 800, h: 600 },
  'mask-group-17': { w: 800, h: 600 },
  'mask-group-39': { w: 600, h: 600 },
  'mask-group-44': { w: 800, h: 600 },
};

const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const IGNORE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git'];

/**
 * Trouve la taille optimale pour une image
 */
function getOptimalSize(url) {
  const lowerUrl = url.toLowerCase();
  
  // Chercher une correspondance exacte
  for (const [pattern, size] of Object.entries(AGGRESSIVE_SIZES)) {
    if (lowerUrl.includes(pattern.toLowerCase())) {
      return size;
    }
  }
  
  // Par défaut - très conservateur
  return { w: 400, h: 400 };
}

/**
 * Remplace les paramètres de taille dans une URL
 */
function replaceSizeParams(url, newSize) {
  // Supprimer les anciens paramètres w_ et h_
  let cleanUrl = url.replace(/,w_\d+/g, '').replace(/,h_\d+/g, '');
  cleanUrl = cleanUrl.replace(/w_\d+,/g, '').replace(/h_\d+,/g, '');
  
  // Pattern: /upload/PARAMS/vVERSION/
  const pattern = /\/upload\/([^\/]+)\/v(\d+)\//;
  
  if (pattern.test(cleanUrl)) {
    return cleanUrl.replace(pattern, (match, params, version) => {
      // Ajouter les nouveaux paramètres
      const newParams = `${params},w_${newSize.w},h_${newSize.h},c_limit`;
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
  const changes = [];

  // Pattern pour les URLs Cloudinary
  const cloudinaryPattern = /https:\/\/res\.cloudinary\.com\/dmrtdo9z3\/image\/upload\/[^\s'"]+/g;
  
  const matches = content.match(cloudinaryPattern);
  
  if (matches) {
    matches.forEach(url => {
      const optimalSize = getOptimalSize(url);
      const optimizedUrl = replaceSizeParams(url, optimalSize);
      
      if (optimizedUrl !== url) {
        // Extraire le nom du fichier pour le log
        const fileName = url.split('/').pop().substring(0, 30);
        changes.push(`${fileName}: ${optimalSize.w}×${optimalSize.h}`);
        
        content = content.replace(url, optimizedUrl);
        modified = true;
        count++;
      }
    });
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${path.basename(filePath)}: ${count} image(s)`);
    changes.slice(0, 3).forEach(change => console.log(`   → ${change}`));
    if (changes.length > 3) {
      console.log(`   ... et ${changes.length - 3} autres`);
    }
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
  
  console.log('🚀 Optimisation AGRESSIVE des images...\n');
  console.log('⚡ Réduction drastique des tailles pour maximiser la performance\n');
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
  console.log(`📊 ${totalOptimizations} image(s) optimisée(s) dans ${totalFiles} fichier(s)`);
  console.log('\n💡 Exemples de réduction:');
  console.log('   • Icônes: 1920×1080 → 50-80px');
  console.log('   • Logos: 800×600 → 150×80px');
  console.log('   • Illustrations: 1920×1080 → 400×400px');
  console.log('   • Hero images: 1920×1080 → 800×600px');
  console.log('\n🎯 Gain attendu: -80 à -95% de taille\n');
}

main();
