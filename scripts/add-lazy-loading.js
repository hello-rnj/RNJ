#!/usr/bin/env node

/**
 * Script pour ajouter le lazy loading à toutes les images non-critiques
 * et priority aux images critiques (above the fold)
 */

const fs = require('fs');
const path = require('path');

// Images critiques qui doivent charger immédiatement (above the fold)
const CRITICAL_IMAGES = [
  'minimal-horizontal-logo',
  'logo',
  'hero',
  'mask-group-12', // Hero section
  'mask-group-3', // Hero section
];

// Extensions de fichiers à traiter
const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const IGNORE_DIRS = ['node_modules', '.next', 'dist', 'build', '.git'];

/**
 * Vérifie si une image est critique
 */
function isCriticalImage(imageSrc) {
  return CRITICAL_IMAGES.some(critical => imageSrc.includes(critical));
}

/**
 * Traite un fichier et ajoute le lazy loading
 */
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let criticalCount = 0;
  let lazyCount = 0;

  // Pattern pour trouver les composants Image sans loading ou priority
  const imagePattern = /<Image\s+([^>]*?)\/>/g;
  
  let match;
  const replacements = [];
  
  while ((match = imagePattern.exec(content)) !== null) {
    const fullMatch = match[0];
    const props = match[1];
    
    // Ignorer si déjà loading ou priority
    if (props.includes('loading=') || props.includes('priority')) {
      continue;
    }
    
    // Extraire le src
    const srcMatch = props.match(/src=["']([^"']+)["']/);
    if (!srcMatch) continue;
    
    const src = srcMatch[1];
    const isCritical = isCriticalImage(src);
    
    let newProps = props;
    
    if (isCritical) {
      // Ajouter priority pour les images critiques
      newProps = props + ' priority';
      criticalCount++;
    } else {
      // Ajouter loading="lazy" pour les autres
      newProps = props + ' loading="lazy"';
      lazyCount++;
    }
    
    const newMatch = `<Image ${newProps}/>`;
    replacements.push({ old: fullMatch, new: newMatch });
  }
  
  // Appliquer les remplacements
  replacements.forEach(({ old, new: newStr }) => {
    content = content.replace(old, newStr);
    modified = true;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filePath}:`);
    if (criticalCount > 0) console.log(`   📌 ${criticalCount} image(s) critique(s) avec priority`);
    if (lazyCount > 0) console.log(`   ⏳ ${lazyCount} image(s) avec lazy loading`);
    return { critical: criticalCount, lazy: lazyCount };
  }

  return { critical: 0, lazy: 0 };
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
  
  console.log('🚀 Ajout du lazy loading intelligent...\n');
  console.log(`📁 Dossier source: ${srcDir}\n`);
  console.log('---\n');

  let totalCritical = 0;
  let totalLazy = 0;
  let totalFiles = 0;

  walkDirectory(srcDir, (filePath) => {
    const { critical, lazy } = processFile(filePath);
    if (critical > 0 || lazy > 0) {
      totalFiles++;
      totalCritical += critical;
      totalLazy += lazy;
    }
  });

  console.log('\n---');
  console.log(`\n✨ Terminé!`);
  console.log(`📊 ${totalFiles} fichier(s) modifié(s)`);
  console.log(`📌 ${totalCritical} image(s) critique(s) avec priority`);
  console.log(`⏳ ${totalLazy} image(s) avec lazy loading`);
  console.log('\n💡 Avantages:');
  console.log('   • Images critiques chargées immédiatement');
  console.log('   • Images non-visibles chargées à la demande');
  console.log('   • Réduction du temps de chargement initial');
  console.log('   • Meilleur score LCP (Largest Contentful Paint)\n');
}

main();
