#!/usr/bin/env node

/**
 * Script pour optimiser automatiquement toutes les URLs Cloudinary dans le projet
 * Ajoute les paramètres d'optimisation sans modifier la qualité visuelle
 */

const fs = require('fs');
const path = require('path');

// Paramètres d'optimisation Cloudinary
const OPTIMIZATION_PARAMS = 'f_auto,q_auto:best,dpr_auto,fl_progressive';

// Extensions de fichiers à traiter
const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

// Dossiers à ignorer
const IGNORE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git'];

/**
 * Vérifie si une URL Cloudinary est déjà optimisée
 */
function isAlreadyOptimized(url) {
  return url.includes('f_auto') || url.includes('q_auto');
}

/**
 * Optimise une URL Cloudinary
 */
function optimizeUrl(url) {
  if (isAlreadyOptimized(url)) {
    return url;
  }

  // Pattern: https://res.cloudinary.com/CLOUD_NAME/image/upload/vVERSION/PATH
  const uploadPattern = /^(https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/)v(\d+)\//;
  
  if (uploadPattern.test(url)) {
    return url.replace(uploadPattern, `$1${OPTIMIZATION_PARAMS}/v$2/`);
  }

  // Pattern sans version: https://res.cloudinary.com/CLOUD_NAME/image/upload/PATH
  const uploadPatternNoVersion = /^(https:\/\/res\.cloudinary\.com\/[^\/]+\/image\/upload\/)/;
  
  if (uploadPatternNoVersion.test(url)) {
    return url.replace(uploadPatternNoVersion, `$1${OPTIMIZATION_PARAMS}/`);
  }

  return url;
}

/**
 * Traite un fichier et optimise les URLs Cloudinary
 */
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let count = 0;

  // Pattern pour trouver les URLs Cloudinary
  const cloudinaryPattern = /https:\/\/res\.cloudinary\.com\/dmrtdo9z3\/image\/upload\/[^\s'"]+/g;
  
  const matches = content.match(cloudinaryPattern);
  
  if (matches) {
    matches.forEach(url => {
      const optimizedUrl = optimizeUrl(url);
      if (optimizedUrl !== url) {
        content = content.replace(url, optimizedUrl);
        modified = true;
        count++;
      }
    });
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filePath}: ${count} URL(s) optimisée(s)`);
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
  
  console.log('🚀 Optimisation des URLs Cloudinary...\n');
  console.log(`📁 Dossier source: ${srcDir}\n`);
  console.log(`⚙️  Paramètres d'optimisation: ${OPTIMIZATION_PARAMS}\n`);
  console.log('---\n');

  let totalFiles = 0;
  let totalOptimizations = 0;

  walkDirectory(srcDir, (filePath) => {
    const count = processFile(filePath);
    if (count > 0) {
      totalFiles++;
      totalOptimizations += count;
    }
  });

  console.log('\n---');
  console.log(`\n✨ Terminé!`);
  console.log(`📊 ${totalOptimizations} URL(s) optimisée(s) dans ${totalFiles} fichier(s)`);
  console.log('\n💡 Avantages:');
  console.log('   • Format automatique (WebP/AVIF si supporté)');
  console.log('   • Qualité optimale automatique');
  console.log('   • Support Retina automatique (DPR)');
  console.log('   • Chargement progressif');
  console.log('   • Aucune perte de qualité visuelle\n');
}

main();
