const fs = require('fs');
const path = require('path');

const mapWidth = 1346;
const mapHeight = 640.52;

// Highlighted countries (Europe, Africa, Middle East)
const highlightedCountries = {
  'AF': [61.15, 40.94], 'AL': [49.49, 39.41], 'AE': [59.07, 45.49], 'AM': [56.04, 39.94],
  'AT': [46.79, 37.13], 'BI': [52.83, 55.91], 'BE': [44.97, 36.26], 'BJ': [44.56, 50.56],
  'BF': [42.74, 49.51], 'BG': [50.25, 38.85], 'BA': [48.48, 38.49], 'BY': [50.13, 34.63],
  'BW': [50.01, 61.52], 'CF': [48.56, 50.96], 'CH': [45.9, 37.56], 'CI': [41.82, 51.19],
  'CM': [46.82, 50.33], 'CD': [47.9, 53.12], 'CG': [47.58, 53.68], 'CZ': [47.44, 36.39],
  'DE': [45.83, 35.04], 'DJ': [56.47, 50.39], 'DZ': [41.87, 41.44], 'EG': [51.28, 43.46],
  'ER': [54.88, 48.45], 'EE': [49.84, 33.46], 'ET': [53.96, 49.56], 'FI': [48.73, 30.06],
  'GA': [46.91, 54.19], 'GH': [43.38, 50.98], 'GN': [39.92, 50.43], 'GM': [39.43, 49.96],
  'GW': [39.47, 50.41], 'GQ': [47.06, 54.21], 'HR': [47.92, 38.03], 'HU': [48.54, 37.27],
  'IE': [41.83, 34.99], 'IL': [53.94, 42.85], 'IQ': [55.12, 41.34], 'IR': [56.28, 40.49],
  'JO': [54.17, 42.81], 'KE': [54.27, 53.03], 'KW': [57.47, 44.02], 'LB': [54.11, 42.34],
  'LR': [40.98, 51.91], 'LS': [51.93, 65.54], 'LT': [49.44, 34.56], 'LU': [45.78, 36.74],
  'LV': [49.42, 34.01], 'LY': [46.98, 42.9], 'MA': [39.44, 41.93], 'MD': [51.19, 37.33],
  'ME': [49.25, 39.11], 'MG': [56.74, 59.46], 'MK': [49.82, 39.54], 'ML': [40.8, 45.89],
  'MR': [39.43, 45], 'MW': [53.83, 58.43], 'MZ': [53.09, 58.83], 'NA': [47.73, 61.26],
  'NE': [44.42, 46.44], 'NG': [45.12, 49.96], 'NL': [45.17, 35.55], 'PL': [47.82, 35.09],
  'PT': [41.74, 39.56], 'QA': [58.79, 45.47], 'RO': [49.61, 37.42], 'RS': [49.25, 38.15],
  'RW': [52.83, 55.46], 'SA': [54.14, 43.25], 'SD': [50.72, 46.98], 'SE': [46.94, 30.38],
  'SI': [47.91, 37.91], 'SK': [48.67, 36.94], 'SL': [40.46, 51.36], 'SN': [39.22, 48.96],
  'SO': [56.34, 50.64], 'SS': [51.31, 50.56], 'SY': [54.24, 41.4], 'SZ': [53.05, 64.45],
  'TD': [48.26, 46.46], 'TG': [44.32, 51.01], 'TN': [46.42, 41.36], 'TZ': [53, 55.41],
  'UA': [50.01, 35.96], 'UG': [53, 53.48], 'XK': [49.68, 39.2], 'YE': [56.69, 48.08],
  'ZA': [48.95, 63.15], 'ZM': [50.67, 58.06], 'ZW': [51.63, 60.73], 'EH': [39.43, 44.91],
  'ES': [41.84, 39.03], 'GE': [54.93, 39.1], 'YT': [57.44, 59.69], 'RE': [60.21, 62.7],
  'BH': [58.69, 45.42], 'PS': [54.11, 43.12], 'AO': [47.7, 57.2]
};

// Non-highlighted countries
const otherCountries = {
  'BD': [69.45, 45.35], 'BZ': [18.47, 48.26], 'BO': [24.06, 58.62], 'BR': [22.7, 53.13],
  'BN': [77.77, 53.05], 'BT': [69.52, 44.67], 'CO': [21.18, 50.49], 'CR': [19.28, 50.93],
  'CU': [19.95, 46.54], 'GL': [30.54, 26.45], 'GT': [17.55, 48.51], 'GY': [26.36, 51.98],
  'HN': [18.38, 49.18], 'HT': [22.83, 47.75], 'IN': [63.83, 42.03], 'IS': [38.95, 31.19],
  'JM': [21.71, 48.25], 'KG': [63.11, 39.19], 'KH': [74.09, 49.7], 'KP': [77.91, 39.3],
  'KR': [78.79, 40.89], 'KZ': [56.28, 34.9], 'LA': [73.14, 46.81], 'LK': [67.62, 51.45],
  'MM': [70.84, 44.66], 'MN': [66.77, 36.06], 'MX': [11.65, 43.05], 'NI': [18.83, 49.54],
  'NP': [66.95, 43.89], 'PA': [20.09, 51.52], 'PE': [20.5, 55.07], 'PK': [61.47, 41.43],
  'PY': [26.35, 62.14], 'SR': [27.34, 52.83], 'SV': [18.14, 49.76], 'TH': [72.44, 47.56],
  'TJ': [62.63, 40.04], 'TL': [80.83, 58.08], 'TM': [58.38, 39.39], 'TW': [78.7, 45.77],
  'UY': [28.08, 66.08], 'UZ': [59.03, 38.36], 'VE': [22.93, 50.58], 'VN': [73.62, 46.48],
  'DO': [23.57, 47.76], 'EC': [20.6, 54.54], 'GF': [28.35, 52.94]
};

let svgContent = `<svg width="1346" height="641" viewBox="0 0 1346 641" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1346" height="641" fill="#003300"/>
`;

function extractPath(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const dMatch = content.match(/d="([^"]+)"/);
  return dMatch ? dMatch[1] : null;
}

function addCountry(code, pos, fillColor) {
  const filePath = path.join('public', `${code}.svg`);
  const d = extractPath(filePath);
  if (d) {
    const x = (pos[0] / 100) * mapWidth;
    const y = (pos[1] / 100) * mapHeight;
    svgContent += `  <g transform="translate(${x.toFixed(2)}, ${y.toFixed(2)})"><path d="${d}" fill="${fillColor}" stroke="black" stroke-width="0.14983"/></g>\n`;
  }
}

// Add Vector files
for (let i = 0; i <= 100; i++) {
  const name = i === 0 ? 'Vector' : `Vector-${i}`;
  const filePath = path.join('public', `${name}.svg`);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const d = content.match(/d="([^"]+)"/);
    const isHighlighted = content.includes('fill="#BBCB2E"');
    if (d) {
      svgContent += `  <path d="${d[1]}" fill="${isHighlighted ? '#BBCB2E' : '#F7FCFF'}" stroke="black" stroke-width="0.14983"/>\n`;
    }
  }
}

// Add countries
for (const [code, pos] of Object.entries(otherCountries)) {
  addCountry(code, pos, '#F7FCFF');
}
for (const [code, pos] of Object.entries(highlightedCountries)) {
  addCountry(code, pos, '#BBCB2E');
}

svgContent += '</svg>';
fs.writeFileSync('public/world-map.svg', svgContent);
console.log('World map created!');
