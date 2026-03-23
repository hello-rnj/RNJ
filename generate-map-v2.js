const fs = require('fs');
const path = require('path');

const mapWidth = 1346;
const mapHeight = 641;

// Countries that should be highlighted (Europe, Africa, Middle East) - GREEN #BBCB2E
const highlightedCountries = [
  // Europe
  'AL', 'AT', 'BE', 'BG', 'BA', 'BY', 'CH', 'CZ', 'DE', 'EE', 'ES', 'FI', 'HR', 'HU', 'IE', 'IS',
  'LT', 'LU', 'LV', 'MD', 'ME', 'MK', 'NL', 'PL', 'PT', 'RO', 'RS', 'SE', 'SI', 'SK', 'UA', 'XK',
  // Africa
  'DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CF', 'TD', 'CD', 'CG', 'CI', 'DJ', 'EG', 'GQ', 'ER',
  'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MZ', 'NA',
  'NE', 'NG', 'RW', 'SN', 'SL', 'SO', 'ZA', 'SS', 'SD', 'SZ', 'TZ', 'TG', 'TN', 'UG', 'EH', 'ZM', 'ZW',
  // Middle East
  'AE', 'BH', 'IL', 'IQ', 'JO', 'KW', 'LB', 'QA', 'SA', 'SY', 'YE', 'PS',
  // Islands
  'YT', 'RE'
];

// Countries that should NOT be highlighted (rest of world) - WHITE #F7FCFF
const nonHighlightedCountries = [
  // Asia (excluding Middle East)
  'AF', 'AM', 'AZ', 'BD', 'BT', 'BN', 'KH', 'CN', 'GE', 'IN', 'ID', 'IR', 'JP', 'KZ', 'KG', 'KP', 'KR',
  'LA', 'MY', 'MV', 'MN', 'MM', 'NP', 'PK', 'PH', 'RU', 'SG', 'LK', 'TW', 'TJ', 'TH', 'TL', 'TM', 'UZ', 'VN',
  // Americas
  'AR', 'BS', 'BZ', 'BO', 'BR', 'CA', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 'GF', 'GL', 'GT', 'GY',
  'HT', 'HN', 'JM', 'MX', 'NI', 'PA', 'PY', 'PE', 'PR', 'SR', 'TT', 'US', 'UY', 'VE',
  // Oceania
  'AU', 'FJ', 'NZ', 'PG', 'SB',
  // Caribbean
  'AW', 'AI', 'BB', 'BL', 'BM', 'CW', 'DM', 'MQ', 'BQBO', 'BQSE', 'BQSA'
];

// All elements with their CSS positions
const elements = [
  // Highlighted countries (BBCB2E) - Europe, Africa, Middle East
  { name: 'Vector', left: 47.7, top: 57.2 },
  { name: 'Vector-1', left: 47.82, top: 56.67 },
  { name: 'AL', left: 49.49, top: 39.41 },
  { name: 'AE', left: 59.07, top: 45.49 },
  { name: 'AT', left: 46.79, top: 37.13 },
  { name: 'BI', left: 52.83, top: 55.91 },
  { name: 'BE', left: 44.97, top: 36.26 },
  { name: 'BJ', left: 44.56, top: 50.56 },
  { name: 'BF', left: 42.74, top: 49.51 },
  { name: 'BG', left: 50.25, top: 38.85 },
  { name: 'BA', left: 48.48, top: 38.49 },
  { name: 'BY', left: 50.13, top: 34.63 },
  { name: 'BW', left: 50.01, top: 61.52 },
  { name: 'CF', left: 48.56, top: 50.96 },
  { name: 'CH', left: 45.9, top: 37.56 },
  { name: 'CI', left: 41.82, top: 51.19 },
  { name: 'CM', left: 46.82, top: 50.33 },
  { name: 'CD', left: 47.9, top: 53.12 },
  { name: 'CG', left: 47.58, top: 53.68 },
  { name: 'CZ', left: 47.44, top: 36.39 },
  { name: 'DE', left: 45.83, top: 35.04 },
  { name: 'DJ', left: 56.47, top: 50.39 },
  { name: 'DZ', left: 41.87, top: 41.44 },
  { name: 'EG', left: 51.28, top: 43.46 },
  { name: 'ER', left: 54.88, top: 48.45 },
  { name: 'EE', left: 49.84, top: 33.46 },
  { name: 'ET', left: 53.96, top: 49.56 },
  { name: 'FI', left: 48.73, top: 30.06 },
  { name: 'GA', left: 46.91, top: 54.19 },
  { name: 'GH', left: 43.38, top: 50.98 },
  { name: 'GN', left: 39.92, top: 50.43 },
  { name: 'GM', left: 39.43, top: 49.96 },
  { name: 'GW', left: 39.47, top: 50.41 },
  { name: 'GQ', left: 47.06, top: 54.21 },
  { name: 'HR', left: 47.92, top: 38.03 },
  { name: 'HU', left: 48.54, top: 37.27 },
  { name: 'IE', left: 41.83, top: 34.99 },
  { name: 'IL', left: 53.94, top: 42.85 },
  { name: 'IQ', left: 55.12, top: 41.34 },
  { name: 'IS', left: 38.95, top: 31.19 },
  { name: 'JO', left: 54.17, top: 42.81 },
  { name: 'KE', left: 54.27, top: 53.03 },
  { name: 'KW', left: 57.47, top: 44.02 },
  { name: 'LB', left: 54.11, top: 42.34 },
  { name: 'LR', left: 40.98, top: 51.91 },
  { name: 'LY', left: 46.98, top: 42.9 },
  { name: 'LS', left: 51.93, top: 65.54 },
  { name: 'LT', left: 49.44, top: 34.56 },
  { name: 'LU', left: 45.78, top: 36.74 },
  { name: 'LV', left: 49.42, top: 34.01 },
  { name: 'MA', left: 39.44, top: 41.93 },
  { name: 'MD', left: 51.19, top: 37.33 },
  { name: 'MG', left: 56.74, top: 59.46 },
  { name: 'MK', left: 49.82, top: 39.54 },
  { name: 'ML', left: 40.8, top: 45.89 },
  { name: 'ME', left: 49.25, top: 39.11 },
  { name: 'MZ', left: 53.09, top: 58.83 },
  { name: 'MR', left: 39.43, top: 45 },
  { name: 'MW', left: 53.83, top: 58.43 },
  { name: 'NA', left: 47.73, top: 61.26 },
  { name: 'NE', left: 44.42, top: 46.44 },
  { name: 'NG', left: 45.12, top: 49.96 },
  { name: 'NL', left: 45.17, top: 35.55 },
  { name: 'PL', left: 47.82, top: 35.09 },
  { name: 'PT', left: 41.74, top: 39.56 },
  { name: 'QA', left: 58.79, top: 45.47 },
  { name: 'RO', left: 49.61, top: 37.42 },
  { name: 'RW', left: 52.83, top: 55.46 },
  { name: 'EH', left: 39.43, top: 44.91 },
  { name: 'SA', left: 54.14, top: 43.25 },
  { name: 'SD', left: 50.72, top: 46.98 },
  { name: 'SS', left: 51.31, top: 50.56 },
  { name: 'SN', left: 39.22, top: 48.96 },
  { name: 'SL', left: 40.46, top: 51.36 },
  { name: 'RS', left: 49.25, top: 38.15 },
  { name: 'SK', left: 48.67, top: 36.94 },
  { name: 'SI', left: 47.91, top: 37.91 },
  { name: 'SE', left: 46.94, top: 30.38 },
  { name: 'SZ', left: 53.05, top: 64.45 },
  { name: 'SY', left: 54.24, top: 41.4 },
  { name: 'TD', left: 48.26, top: 46.46 },
  { name: 'TG', left: 44.32, top: 51.01 },
  { name: 'TN', left: 46.42, top: 41.36 },
  { name: 'TZ', left: 53, top: 55.41 },
  { name: 'UG', left: 53, top: 53.48 },
  { name: 'UA', left: 50.01, top: 35.96 },
  { name: 'XK', left: 49.68, top: 39.2 },
  { name: 'YE', left: 56.69, top: 48.08 },
  { name: 'ZA', left: 48.95, top: 63.15 },
  { name: 'ZM', left: 50.67, top: 58.06 },
  { name: 'ZW', left: 51.63, top: 60.73 },
  { name: 'SO', left: 56.34, top: 50.64 },
  { name: 'ES', left: 41.84, top: 39.03 },
  { name: 'BH', left: 58.69, top: 45.42 },
  { name: 'YT', left: 57.44, top: 59.69 },
  { name: 'RE', left: 60.21, top: 62.7 },
  { name: 'PS', left: 54.11, top: 43.12 },
  
  // Non-highlighted countries (F7FCFF) - Americas, Asia, Oceania
  { name: 'AF', left: 61.15, top: 40.94 },
  { name: 'AM', left: 56.04, top: 39.94 },
  { name: 'BD', left: 69.45, top: 45.35 },
  { name: 'BZ', left: 18.47, top: 48.26 },
  { name: 'BO', left: 24.06, top: 58.62 },
  { name: 'BR', left: 22.7, top: 53.13 },
  { name: 'BN', left: 77.77, top: 53.05 },
  { name: 'BT', left: 69.52, top: 44.67 },
  { name: 'CO', left: 21.18, top: 50.49 },
  { name: 'CR', left: 19.28, top: 50.93 },
  { name: 'CU', left: 19.95, top: 46.54 },
  { name: 'DO', left: 23.57, top: 47.76 },
  { name: 'EC', left: 20.6, top: 54.54 },
  { name: 'GE', left: 54.93, top: 39.1 },
  { name: 'GL', left: 30.54, top: 26.45 },
  { name: 'GT', left: 17.55, top: 48.51 },
  { name: 'GY', left: 26.36, top: 51.98 },
  { name: 'HN', left: 18.38, top: 49.18 },
  { name: 'HT', left: 22.83, top: 47.75 },
  { name: 'IN', left: 63.83, top: 42.03 },
  { name: 'IR', left: 56.28, top: 40.49 },
  { name: 'JM', left: 21.71, top: 48.25 },
  { name: 'KZ', left: 56.28, top: 34.9 },
  { name: 'KG', left: 63.11, top: 39.19 },
  { name: 'KH', left: 74.09, top: 49.7 },
  { name: 'KR', left: 78.79, top: 40.89 },
  { name: 'KP', left: 77.91, top: 39.3 },
  { name: 'LA', left: 73.14, top: 46.81 },
  { name: 'LK', left: 67.62, top: 51.45 },
  { name: 'MX', left: 11.65, top: 43.05 },
  { name: 'MM', left: 70.84, top: 44.66 },
  { name: 'MN', left: 66.77, top: 36.06 },
  { name: 'NI', left: 18.83, top: 49.54 },
  { name: 'NP', left: 66.95, top: 43.89 },
  { name: 'PK', left: 61.47, top: 41.43 },
  { name: 'PA', left: 20.09, top: 51.52 },
  { name: 'PE', left: 20.5, top: 55.07 },
  { name: 'PY', left: 26.35, top: 62.14 },
  { name: 'SV', left: 18.14, top: 49.76 },
  { name: 'SR', left: 27.34, top: 52.83 },
  { name: 'TH', left: 72.44, top: 47.56 },
  { name: 'TJ', left: 62.63, top: 40.04 },
  { name: 'TM', left: 58.38, top: 39.39 },
  { name: 'TL', left: 80.83, top: 58.08 },
  { name: 'TW', left: 78.7, top: 45.77 },
  { name: 'UY', left: 28.08, top: 66.08 },
  { name: 'UZ', left: 59.03, top: 38.36 },
  { name: 'VE', left: 22.93, top: 50.58 },
  { name: 'VN', left: 73.62, top: 46.48 },
  { name: 'GF', left: 28.35, top: 52.94 },
  { name: 'AW', left: 23.94, top: 50.41 },
  { name: 'AI', left: 26.12, top: 48.35 },
  { name: 'BB', left: 26.98, top: 50.15 },
  { name: 'BL', left: 26.17, top: 48.47 },
  { name: 'BM', left: 26.24, top: 43.17 },
  { name: 'CW', left: 24.19, top: 50.5 },
  { name: 'DM', left: 26.5, top: 49.32 },
  { name: 'MQ', left: 26.56, top: 49.59 },
  { name: 'BQBO', left: 24.41, top: 50.53 },
  { name: 'BQSE', left: 26.12, top: 48.63 },
  { name: 'BQSA', left: 26.05, top: 48.57 },
];

// Add all Vector elements
for (let i = 2; i <= 100; i++) {
  elements.push({ name: `Vector-${i}`, left: 0, top: 0 });
}

function getColor(name) {
  // Check if it's a highlighted country
  if (highlightedCountries.includes(name)) {
    return '#BBCB2E';
  }
  // Check if it starts with Vector (these are part of the map outline)
  if (name.startsWith('Vector')) {
    return '#F7FCFF'; // Default to white for vectors
  }
  return '#F7FCFF';
}

let svgContent = `<svg width="1346" height="641" viewBox="0 0 1346 641" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1346" height="641" fill="#003300"/>
`;

let processed = 0;
let skipped = 0;

for (const el of elements) {
  const filePath = path.join('public', `${el.name}.svg`);
  
  if (!fs.existsSync(filePath)) {
    skipped++;
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const pathMatch = content.match(/<path[^>]*d="([^"]+)"[^>]*/);
  
  if (pathMatch) {
    const x = (el.left / 100) * mapWidth;
    const y = (el.top / 100) * mapHeight;
    const dAttr = pathMatch[0].match(/d="([^"]+)"/);
    const color = getColor(el.name);
    
    if (dAttr) {
      svgContent += `  <g transform="translate(${x.toFixed(2)}, ${y.toFixed(2)})">
    <path d="${dAttr[1]}" fill="${color}" stroke="black" stroke-width="0.14983" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
`;
      processed++;
    }
  }
}

svgContent += '</svg>';

fs.writeFileSync('public/world-map.svg', svgContent);
console.log(`World map created! Processed: ${processed}, Skipped: ${skipped}`);
