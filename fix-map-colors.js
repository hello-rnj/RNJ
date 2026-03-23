const fs = require('fs');

// Read the SVG file
let svg = fs.readFileSync('public/Group 23.svg', 'utf8');

// The map dimensions
const mapWidth = 1347;
const mapHeight = 641;

// Define regions that should be GREEN (#BBCB2E):
// - Europe (X: 540-720, Y: 100-250)
// - Africa (X: 520-760, Y: 250-500)
// - Middle East (X: 700-800, Y: 250-330)

// Define regions that should be WHITE (#F7FCFF):
// - Americas (X: 0-450)
// - Asia (X: 750-1350, except Middle East)
// - Oceania (X: 1000-1350, Y: 350-650)

// Function to check if a path should be green based on its first coordinate
function shouldBeGreen(pathD) {
  // Extract the first M coordinate
  const match = pathD.match(/M([\d.]+)\s+([\d.]+)/);
  if (!match) return null;
  
  const x = parseFloat(match[1]);
  const y = parseFloat(match[2]);
  
  // ============ GREEN REGIONS ============
  
  // --- EUROPE ---
  // Scandinavia (Norway, Sweden, Finland)
  if (x >= 540 && x <= 680 && y >= 40 && y <= 180) return true;
  
  // Western Europe (UK, Ireland, Portugal, Spain, France, Benelux)
  if (x >= 480 && x <= 620 && y >= 80 && y <= 280) return true;
  
  // Central & Eastern Europe (Germany, Poland, Italy, Balkans, Ukraine, Belarus)
  if (x >= 580 && x <= 720 && y >= 100 && y <= 280) return true;
  
  // --- AFRICA ---
  // North Africa (Morocco, Algeria, Tunisia, Libya, Egypt)
  if (x >= 480 && x <= 720 && y >= 260 && y <= 360) return true;
  
  // Sub-Saharan Africa
  if (x >= 500 && x <= 780 && y >= 320 && y <= 540) return true;
  
  // Southern Africa
  if (x >= 580 && x <= 720 && y >= 480 && y <= 560) return true;
  
  // Madagascar
  if (x >= 750 && x <= 810 && y >= 400 && y <= 520) return true;
  
  // --- MIDDLE EAST (except Turkey and Iran) ---
  // Levant (Syria, Lebanon, Israel, Jordan)
  if (x >= 700 && x <= 750 && y >= 240 && y <= 320) return true;
  
  // Iraq
  if (x >= 740 && x <= 790 && y >= 240 && y <= 310) return true;
  
  // Arabian Peninsula (Saudi Arabia, Yemen, Oman, UAE, Kuwait, Qatar, Bahrain)
  if (x >= 720 && x <= 830 && y >= 290 && y <= 430) return true;
  
  // Egypt extension (Sinai)
  if (x >= 680 && x <= 730 && y >= 280 && y <= 340) return true;
  
  // ============ WHITE REGIONS ============
  // Turkey (X: 680-760, Y: 200-250) - explicitly WHITE
  // Iran (X: 780-860, Y: 240-320) - explicitly WHITE
  // Americas, Asia, Oceania - WHITE
  
  return false;
}

// Process each path
const pathRegex = /<path d="([^"]+)" fill="(#[A-Fa-f0-9]+)"/g;
let match;
let changes = 0;

let newSvg = svg.replace(pathRegex, (fullMatch, pathD, currentColor) => {
  const shouldGreen = shouldBeGreen(pathD);
  
  if (shouldGreen === null) {
    return fullMatch;
  }
  
  const targetColor = shouldGreen ? '#BBCB2E' : '#F7FCFF';
  
  if (currentColor !== targetColor) {
    changes++;
    return `<path d="${pathD}" fill="${targetColor}"`;
  }
  
  return fullMatch;
});

fs.writeFileSync('public/world-map.svg', newSvg);
console.log(`Fixed ${changes} paths. Saved to public/world-map.svg`);
