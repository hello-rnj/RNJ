'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import LandingFooter from '@/components/LandingFooter';

const partnerAssetLogos = [
  'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678791/rnj/asset-14-1-cda0f5e7.png',
  'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678792/rnj/asset-15-1-7f0249bf.png',
  'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779679416/rnj/asset-17-1-5077f95f.png',
  'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678793/rnj/asset-22-1-ac5775de.png',
  'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678793/rnj/asset-23-1-9c5664dc.png',
  'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678793/rnj/asset-24-1-1c05ea09.png',
  'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678794/rnj/asset-26-1-3d6250e2.png',
  'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678795/rnj/asset-27-1-8679f4ab.png',
  'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779679414/rnj/asset-28-1-d6d25061.png',
  '/optimized/Layer 1 (22).png',
  '/optimized/Layer 1 (23).png',
] as const;

const glowShapes = [
  {
    width: '404.34px',
    height: '423.25px',
    left: '913.7px',
    top: '262.27px',
    background: '#BBCB2E',
    filter: 'blur(160.282px)',
  },
  {
    width: '743.57px',
    height: '572.38px',
    left: '123.93px',
    top: '285.38px',
    background: '#BBCB2E',
    filter: 'blur(160.282px)',
  },
  {
    width: '534.82px',
    height: '411.69px',
    left: '1.05px',
    top: '63.78px',
    background: '#BBCB2E',
    filter: 'blur(115.285px)',
  },
  {
    width: '881.15px',
    height: '889.55px',
    left: '361.28px',
    top: '16.52px',
    background: '#F9FFC4',
    filter: 'blur(248.223px)',
  },
  {
    width: '742.52px',
    height: '726.76px',
    left: '361.28px',
    top: '16.52px',
    background: '#F9FFC4',
    filter: 'blur(248.223px)',
  },
  {
    width: '467.35px',
    height: '457.9px',
    left: '706.81px',
    top: '393.55px',
    background: '#F9FFC4',
    filter: 'blur(248.223px)',
  },
  {
    width: '276.21px',
    height: '269.91px',
    left: '966.21px',
    top: '636.15px',
    background: '#F9FFC4',
  },
  {
    width: '502.01px',
    height: '437.95px',
    left: '1043.93px',
    top: '407.2px',
    background: '#F9FFC4',
    filter: 'blur(248.223px)',
  },
  {
    width: '350.78px',
    height: '350.78px',
    left: '0px',
    top: '179.3px',
    background: '#BBCB2E',
    filter: 'blur(306.248px)',
  },
  {
    width: '412.74px',
    height: '425.34px',
    left: '39.91px',
    top: '530.08px',
    background: '#839705',
    filter: 'blur(318.798px)',
  },
  {
    width: '673.2px',
    height: '693.15px',
    left: '928.41px',
    top: '-0.29px',
    background: '#003300',
    filter: 'blur(413.257px)',
  },
  {
    width: '834.94px',
    height: '859.09px',
    left: '963.06px',
    top: '1029.99px',
    background: '#F5FFA1',
    filter: 'blur(413.257px)',
  },
  {
    width: '599.68px',
    height: '617.54px',
    left: '35.71px',
    top: '1278.9px',
    background: '#BBCB2E',
    filter: 'blur(413.257px)',
  },
  {
    width: '673.2px',
    height: '693.15px',
    left: '130.23px',
    top: '636.15px',
    background: '#003300',
    filter: 'blur(413.257px)',
  },
  {
    width: '412.74px',
    height: '425.34px',
    left: '1295.99px',
    top: '180.35px',
    background: '#839705',
    filter: 'blur(318.798px)',
  },
  {
    width: '169.09px',
    height: '174.34px',
    left: '1483.98px',
    top: '262.27px',
    background: '#839705',
    filter: 'blur(158.533px)',
  },
];


type ImpactCountryId = 'tn' | 'mr' | 'sn' | 'gn' | 'bf' | 'ne' | 'bj' | 'cd' | 'ae' | 'it' | 'fr' | 'be';

type ImpactCountry = {
  id: ImpactCountryId;
  code: string;
  name: string;
  years: string;
  focusYear: string;
  projects: string;
  mapSrc: string;
  summary: string;
  description: string;
  tags: readonly string[];
  miniMapWidth: number;
  miniMapHeight: number;
  miniMapBorder: string;
  cardLeft: string;
  cardTop: string;
  cardPopupLeft: number;
  cardPopupTop: number;
  pinStyle: CSSProperties;
};

const impactPinsFrame = {
  left: 37.74,
  top: 21.7,
  width: 14.75,
  height: 39.4,
} as const;

function readPercentValue(value: unknown) {
  const number = Number.parseFloat(String(value ?? '0').replace('%', ''));
  return Number.isFinite(number) ? number : 0;
}

// Each country's center, expressed as a percentage of the FULL map frame
// (pinStyle values are percentages of the small impactPinsFrame sub-box, so
// they're converted into the same coordinate space as a click on the map).
function getImpactCountryFrameCenter(country: ImpactCountry) {
  const localX = readPercentValue(country.pinStyle.left) + readPercentValue(country.pinStyle.width) / 2;
  const localY = readPercentValue(country.pinStyle.top) + readPercentValue(country.pinStyle.height) / 2;
  return {
    x: impactPinsFrame.left + (localX / 100) * impactPinsFrame.width,
    y: impactPinsFrame.top + (localY / 100) * impactPinsFrame.height,
  };
}

// The highlighted countries on the map image can be small and are sometimes packed
// close together (West Africa) or far apart (Belgium vs. UAE). Instead of relying on
// small fixed hitboxes — which either overlap (false positives) or leave gaps a real
// tap can miss (false negatives) — any click/tap on the map resolves to whichever
// country's center is nearest, as long as it's within a reasonable radius.
const IMPACT_COUNTRY_HIT_RADIUS_PERCENT = 9;

function resolveNearestImpactCountry(
  clientX: number,
  clientY: number,
  frameEl: HTMLElement | null
): ImpactCountry | null {
  if (!frameEl) return null;
  const rect = frameEl.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return null;
  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;

  // 1) Test precis: le point tombe-t-il dans la forme reelle d'un pays
  // (contour extrait de l'image de fond) ? Fonctionne identiquement sur
  // n'importe quel device puisque x/y et les polygones sont tous les deux
  // exprimes en % du cadre de la carte.
  const exactId = findCountryAtPoint(x, y);
  if (exactId) {
    const exact = impactCountries.find((country) => country.id === exactId);
    if (exact) return exact;
  }

  // 2) Repli: le pays dont le centre du pin est le plus proche, pour les
  // clics/tap juste a cote de la forme reelle (doigt imprecis sur mobile,
  // pays trop fin pour etre touche pile dessus, etc.).
  let closest: ImpactCountry | null = null;
  let closestDistance = Infinity;
  for (const country of impactCountries) {
    const center = getImpactCountryFrameCenter(country);
    const distance = (x - center.x) ** 2 + (y - center.y) ** 2;
    if (distance < closestDistance) {
      closestDistance = distance;
      closest = country;
    }
  }
  if (closest && closestDistance <= IMPACT_COUNTRY_HIT_RADIUS_PERCENT ** 2) {
    return closest;
  }
  return null;
}

function getImpactPopupVars(country: ImpactCountry): CSSProperties {
  // Position spécifique pour chaque pays selon le design Figma
  const leftPercent = (country.cardPopupLeft / 1346) * 100;
  const topPercent = (country.cardPopupTop / 640.52) * 100;

  return {
    '--card-left': `${leftPercent}%`,
    '--card-top': `${topPercent}%`,
    '--card-translate-x': '-50%',
    '--card-translate-y': '-100%',
  } as CSSProperties;
}

// Local country-shape thumbnails (replaces the old mapSrc, which pointed at
// the now-disabled dmrtdo9z3 Cloudinary account and 401'd).
const countryShapeSrc: Record<string, string> = {
  TN: '/optimized/TN.png',
  MR: '/optimized/MR.png',
  SN: '/optimized/SN.png',
  GN: '/optimized/GN.png',
  BF: '/optimized/BF.png',
  NE: '/optimized/NE.png',
  BJ: '/optimized/BJ.png',
  CD: '/optimized/CD.png',
  AE: '/optimized/AE.png',
  IT: '/optimized/Group 349135.png',
  FR: '/optimized/Vector (7).png',
  BE: '/optimized/BE (1).png',
};

const impactCountries: readonly ImpactCountry[] = [
  {
    id: 'tn',
    code: 'TN',
    name: 'Tunisia',
    years: '2024-2026',
    focusYear: '2026',
    projects: '45 Projets',
    mapSrc: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132735/rnj/tn-map-7a9a40cd.svg',
    summary: 'Conseil Stratégique & Réglementaire',
    description: "En Tunisie, RNJ Advisory accompagne institutions, investisseurs et entrepreneurs sur des projets à forte composante réglementaire. Nos missions couvrent l'analyse institutionnelle, la structuration juridique, la conformité et l'intégration des critères ESG afin de sécuriser les décisions et renforcer la viabilité à long terme.",
    tags: ['energy', 'durability', 'gouvernance'],
    miniMapWidth: 71.6,
    miniMapHeight: 150.19,
    miniMapBorder: '0.666051px solid #000000',
    cardLeft: '49%',
    cardTop: '20%',
    cardPopupLeft: 713,
    cardPopupTop: 488,
    pinStyle: {
      left: '54.62%',
      top: '17.69%',
      width: '7%',
      height: '10%',
    },
  },
  {
    id: 'mr',
    code: 'MR',
    name: 'Mauritanie',
    years: '2024-2026',
    focusYear: '2026',
    projects: '02 Projets',
    mapSrc: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132737/rnj/mr-f851e151.svg',
    summary: 'Conseil Stratégique & Réglementaire',
    description: "En Mauritanie, nous accompagnons les acteurs publics et privés sur la gouvernance de projet, le cadrage juridique et l'architecture institutionnelle. Notre approche aligne les initiatives d'investissement avec les obligations réglementaires et les objectifs de performance durable.",
    tags: ['energy', 'durability'],
    miniMapWidth: 102,
    miniMapHeight: 125,
    miniMapBorder: '1px solid #003300',
    cardLeft: '43%',
    cardTop: '30%',
    cardPopupLeft: 580,
    cardPopupTop: 559,
    pinStyle: {
      left: '18.35%',
      top: '44.43%',
      width: '7%',
      height: '10%',
    },
  },
  {
    id: 'sn',
    code: 'SN',
    name: 'Senegal',
    years: '2024-2026',
    focusYear: '2026',
    projects: '14 Projets',
    mapSrc: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132738/rnj/sn-fa0dd3fe.svg',
    summary: 'Conseil Stratégique & Réglementaire',
    description: "Au Sénégal, nous intervenons sur des dossiers à forte valeur stratégique : diagnostics institutionnels, analyse des risques réglementaires et mise en conformité opérationnelle. Notre objectif est de rendre les projets plus robustes, plus finançables et plus rapides à déployer.",
    tags: ['energy', 'durability'],
    miniMapWidth: 124,
    miniMapHeight: 99,
    miniMapBorder: '1px solid #003300',
    cardLeft: '42%',
    cardTop: '36%',
    cardPopupLeft: 563,
    cardPopupTop: 582,
    pinStyle: {
      left: '9.76%',
      top: '52.79%',
      width: '7%',
      height: '10%',
    },
  },
  {
    id: 'gn',
    code: 'GN',
    name: 'Guinée',
    years: '2024-2026',
    focusYear: '2026',
    projects: '05 Projets',
    mapSrc: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132739/rnj/gn-09d6746e.svg',
    summary: 'Conseil Stratégique & Réglementaire',
    description: "En Guinée, RNJ Advisory appuie la conception de cadres d'opération conformes, la coordination des parties prenantes et l'intégration des standards ESG. Nous facilitons le passage de la stratégie à une exécution opérationnelle mesurable.",
    tags: ['energy', 'durability'],
    miniMapWidth: 131,
    miniMapHeight: 107,
    miniMapBorder: '1px solid #003300',
    cardLeft: '43%',
    cardTop: '40%',
    cardPopupLeft: 580,
    cardPopupTop: 604,
    pinStyle: {
      left: '17.44%',
      top: '60.79%',
      width: '7%',
      height: '10%',
    },
  },
  {
    id: 'bf',
    code: 'BF',
    name: 'Burkina Faso',
    years: '2024-2026',
    focusYear: '2026',
    projects: '02 Projets',
    mapSrc: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132741/rnj/bf-82043e17.svg',
    summary: 'Conseil Stratégique & Réglementaire',
    description: "Au Burkina Faso, nous accompagnons la structuration de projets complexes avec une approche juridique, institutionnelle et de durabilité. Nos recommandations couvrent la gouvernance, la conformité et la feuille de route de mise en oeuvre.",
    tags: ['energy', 'durability'],
    miniMapWidth: 122,
    miniMapHeight: 101,
    miniMapBorder: '1px solid #003300',
    cardLeft: '45%',
    cardTop: '38%',
    cardPopupLeft: 617,
    cardPopupTop: 595,
    pinStyle: {
      left: '34.18%',
      top: '57.52%',
      width: '7%',
      height: '10%',
    },
  },
  {
    id: 'ne',
    code: 'NE',
    name: 'Niger',
    years: '2024-2026',
    focusYear: '2026',
    projects: '12 Projets',
    mapSrc: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132743/rnj/ne-27d79c5a.svg',
    summary: 'Conseil Stratégique & Réglementaire',
    description: "Au Niger, RNJ Advisory intervient sur la sécurisation des programmes d'investissement et des partenariats. Nous réalisons les analyses juridiques, réglementaires et institutionnelles nécessaires pour fiabiliser la décision et réduire les risques d'exécution.",
    tags: ['energy', 'durability'],
    miniMapWidth: 115,
    miniMapHeight: 101,
    miniMapBorder: '1px solid #003300',
    cardLeft: '50%',
    cardTop: '33%',
    cardPopupLeft: 663,
    cardPopupTop: 568,
    pinStyle: {
      left: '56.09%',
      top: '47.70%',
      width: '7%',
      height: '10%',
    },
  },
  {
    id: 'bj',
    code: 'BJ',
    name: 'Benin',
    years: '2024-2026',
    focusYear: '2026',
    projects: '11 Projets',
    mapSrc: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132742/rnj/bj-46e4c23a.svg',
    summary: 'Conseil Stratégique & Réglementaire',
    description: "Au Bénin, nous accompagnons la structuration des cadres de gouvernance, la clarté des responsabilités institutionnelles et l'alignement des dispositifs juridiques. L'objectif est de garantir la cohérence entre stratégie, exécution et impact.",
    tags: ['energy', 'durability'],
    miniMapWidth: 58,
    miniMapHeight: 133,
    miniMapBorder: '1px solid #003300',
    cardLeft: '46%',
    cardTop: '41%',
    cardPopupLeft: 685,
    cardPopupTop: 620,
    pinStyle: {
      left: '41.88%',
      top: '62.24%',
      width: '7%',
      height: '10%',
    },
  },
  {
    id: 'cd',
    code: 'CD',
    name: 'République démocratique du Congo',
    years: '2024-2026',
    focusYear: '2026',
    projects: '12 Projets',
    mapSrc: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132745/rnj/cd-c076eecb.svg',
    summary: 'Conseil Stratégique & Réglementaire',
    description: "En République démocratique du Congo, RNJ Advisory accompagne acteurs institutionnels et investisseurs dans la conception de projets durables et conformes. Nos interventions portent sur l'analyse réglementaire, les montages juridiques et les mécanismes de suivi de performance.",
    tags: ['energy', 'durability'],
    miniMapWidth: 119,
    miniMapHeight: 131,
    miniMapBorder: '1px solid #003300',
    cardLeft: '53%',
    cardTop: '50%',
    cardPopupLeft: 776,
    cardPopupTop: 677,
    pinStyle: {
      left: '83.06%',
      top: '84.06%',
      width: '7%',
      height: '10%',
    },
  },
  {
    id: 'ae',
    code: 'AE',
    name: 'UAE',
    years: '2024-2026',
    focusYear: '2026',
    projects: '01 Projet',
    mapSrc: '',
    summary: 'Conseil Stratégique & Réglementaire',
    description: "Aux Émirats arabes unis, RNJ Advisory accompagne les acteurs institutionnels et privés sur des projets à forte composante réglementaire et stratégique.",
    tags: ['energy', 'durability'],
    miniMapWidth: 136,
    miniMapHeight: 120,
    miniMapBorder: '1px solid #003300',
    cardLeft: '57%',
    cardTop: '50%',
    cardPopupLeft: 766,
    cardPopupTop: 600,
    pinStyle: {
      left: '126.36%',
      top: '65.81%',
      width: '7%',
      height: '10%',
    },
  },
  {
    id: 'it',
    code: 'IT',
    name: 'Italy',
    years: '2024-2026',
    focusYear: '2026',
    projects: '01 Projet',
    mapSrc: '',
    summary: 'Conseil Stratégique & Réglementaire',
    description: "En Italie, RNJ Advisory accompagne les acteurs institutionnels et privés sur des projets à forte composante réglementaire et stratégique.",
    tags: ['energy', 'durability'],
    miniMapWidth: 134.53,
    miniMapHeight: 155.51,
    miniMapBorder: '1.13836px solid #003300',
    cardLeft: '46%',
    cardTop: '33%',
    cardPopupLeft: 625,
    cardPopupTop: 600,
    pinStyle: {
      left: '59.96%',
      top: '7.13%',
      width: '7%',
      height: '10%',
    },
  },
  {
    id: 'fr',
    code: 'FR',
    name: 'France',
    years: '2024-2026',
    focusYear: '2026',
    projects: '01 Projet',
    mapSrc: '',
    summary: 'Conseil Stratégique & Réglementaire',
    description: "En France, RNJ Advisory accompagne les acteurs institutionnels et privés sur des projets à forte composante réglementaire et stratégique.",
    tags: ['energy', 'durability'],
    miniMapWidth: 147.55,
    miniMapHeight: 129.52,
    miniMapBorder: '1.23265px solid #003300',
    cardLeft: '47%',
    cardTop: '27%',
    cardPopupLeft: 634,
    cardPopupTop: 600,
    pinStyle: {
      left: '39.62%',
      top: '0.03%',
      width: '7%',
      height: '10%',
    },
  },
  {
    id: 'be',
    code: 'BE',
    name: 'Belgium',
    years: '2024-2026',
    focusYear: '2026',
    projects: '01 Projet',
    mapSrc: '',
    summary: 'Conseil Stratégique & Réglementaire',
    description: "En Belgique, RNJ Advisory accompagne les acteurs institutionnels et privés sur des projets à forte composante réglementaire et stratégique.",
    tags: ['energy', 'durability'],
    miniMapWidth: 151,
    miniMapHeight: 102,
    miniMapBorder: '1px solid #003300',
    cardLeft: '47%',
    cardTop: '21%',
    cardPopupLeft: 639,
    cardPopupTop: 600,
    pinStyle: {
      left: '44.70%',
      top: '-8.6%',
      width: '7%',
      height: '10%',
    },
  },
] as const;

// Contour precis de chaque pays mis en avant sur l'image de fond de la
// carte (maps-10375837.png), en % des dimensions de l'image (0-100 sur x
// et y). Extrait par analyse de pixels (composantes connexes + contours),
// pas dessine a la main -- ca colle exactement a la forme visible.
// Certains pays ont plusieurs anneaux (ex. l'Italie: le corps principal +
// un petit fragment de talon separe par l'anti-aliasing du trait de
// frontiere sur cette carte basse-resolution).
// Cette precision au pixel pres est ce qui permet a resolveNearestImpactCountry
// de detecter un clic/hover exact plutot qu'un simple point + rayon fixe --
// et comme tout est exprime en %, ca marche pareil sur n'importe quelle
// taille d'ecran (mobile, tablette, desktop).
const countryHitPolygons: Record<ImpactCountryId, readonly (readonly [number, number])[][]> = {
  tn: [[[46.30,30.72], [46.16,30.87], [46.09,31.17], [46.16,31.32], [46.16,32.20], [46.09,32.35], [46.09,32.64], [45.95,32.94], [45.95,33.38], [46.16,33.68], [46.45,34.42], [46.52,35.45], [46.52,34.86], [46.73,34.56], [46.87,34.12], [46.94,34.12], [46.94,33.83], [46.80,33.38], [46.66,33.38], [46.52,32.94], [46.52,32.64], [46.73,32.20], [46.66,31.17], [46.52,31.02], [46.52,30.72]]],
  mr: [[[41.03,38.26], [41.03,39.14], [40.96,39.29], [40.04,39.29], [40.04,40.92], [39.90,41.21], [39.69,41.21], [39.62,41.51], [39.69,41.65], [39.69,42.54], [39.62,42.69], [38.42,42.69], [38.63,43.28], [38.63,44.61], [38.70,44.76], [38.56,45.94], [39.06,45.79], [39.34,46.09], [39.83,47.27], [39.83,46.82], [39.90,46.68], [40.11,46.68], [40.18,46.82], [40.53,46.82], [40.60,46.68], [41.80,46.68], [41.80,45.94], [41.73,45.79], [41.73,44.31], [41.66,44.16], [41.66,42.69], [41.59,42.54], [41.59,41.06], [41.52,40.92], [41.52,39.73], [41.59,39.59], [41.87,39.59]]],
  sn: [[[38.56,46.38], [38.42,47.12], [38.28,47.41], [38.35,47.56], [38.35,47.86], [38.42,48.01], [38.70,48.01], [38.78,47.86], [39.13,48.01], [39.20,47.86], [39.34,48.15], [39.34,48.45], [39.13,48.74], [38.85,48.60], [38.56,48.89], [38.42,48.74], [38.42,48.89], [38.63,48.89], [38.70,48.74], [39.41,48.74], [39.69,49.04], [39.76,48.89], [39.90,48.89], [39.76,48.45], [39.69,47.56], [39.34,46.53], [39.20,46.53], [39.06,46.23]]],
  gn: [[[38.99,50.07], [39.06,50.22], [39.06,50.52], [39.41,51.26], [39.41,51.40], [39.48,51.40], [39.69,50.81], [39.83,50.66], [40.11,50.66], [40.32,51.26], [40.39,51.99], [40.53,51.85], [40.68,52.14], [40.75,52.73], [40.75,52.59], [40.89,52.44], [40.89,52.14], [41.03,51.85], [40.89,51.26], [40.89,50.52], [40.82,50.37], [40.82,49.78], [40.75,49.48], [40.60,49.48], [40.46,49.78], [40.25,49.78], [40.11,49.48], [39.97,49.63], [39.90,49.34], [39.76,49.34], [39.69,49.48], [39.41,49.19], [39.41,49.63], [39.27,49.93]]],
  bf: [[[43.63,47.41], [43.28,47.41], [42.86,48.01], [42.58,48.60], [42.37,48.60], [42.29,49.19], [42.08,49.63], [42.08,49.93], [42.01,50.07], [42.01,50.52], [42.15,50.96], [42.29,50.81], [42.58,50.81], [42.58,50.22], [42.65,50.07], [42.79,50.07], [42.86,49.93], [43.21,49.93], [43.28,50.07], [43.42,49.93], [43.91,49.93], [43.91,49.78], [44.19,49.34], [44.19,49.19], [43.91,49.04], [43.77,48.74], [43.77,48.45], [43.56,47.71]]],
  ne: [[[48.06,41.65], [47.92,41.80], [47.71,41.36], [47.29,41.06], [46.30,42.39], [45.46,43.87], [45.18,44.16], [45.04,44.16], [45.04,45.79], [44.83,46.38], [44.83,46.82], [44.55,47.12], [44.05,47.12], [43.98,47.41], [43.77,47.41], [43.77,47.71], [43.98,48.30], [43.98,48.60], [44.27,48.74], [44.41,49.04], [44.62,49.19], [44.76,48.60], [44.76,48.30], [45.04,47.86], [45.39,47.86], [45.67,48.15], [45.74,48.45], [46.16,48.30], [46.38,48.60], [46.59,48.60], [46.73,48.30], [47.01,48.30], [47.08,48.15], [47.43,48.45], [47.64,48.01], [47.85,48.30], [47.85,48.01], [47.71,47.56], [47.78,47.41], [47.85,46.68], [48.20,45.94], [48.28,44.16], [48.35,44.02], [48.35,43.13], [48.13,42.54], [48.13,41.95]]],
  bj: [[[44.48,49.48], [44.41,49.48], [44.27,49.93], [44.12,49.93], [43.91,50.52], [44.12,50.96], [44.12,51.40], [44.19,51.55], [44.19,53.47], [44.27,53.62], [44.34,53.62], [44.34,51.85], [44.55,51.26], [44.62,50.52], [44.69,50.37], [44.62,49.78]]],
  cd: [[[49.68,54.95], [49.54,55.24], [49.47,56.42], [49.33,57.02], [49.33,57.61], [49.26,57.76], [49.33,57.90], [49.33,58.35], [49.26,58.49], [49.26,58.94], [48.84,59.82], [48.70,60.56], [48.70,61.30], [48.20,62.33], [48.06,62.33], [47.99,62.04], [47.92,62.04], [47.78,62.33], [47.64,62.33], [47.57,62.78], [47.71,62.63], [48.77,62.63], [48.84,62.78], [48.91,63.52], [49.12,64.25], [49.54,64.11], [49.75,63.52], [49.89,63.52], [49.97,63.37], [50.18,63.66], [50.46,63.66], [50.53,63.81], [50.53,64.40], [50.60,64.55], [50.53,65.44], [50.67,65.88], [50.67,66.47], [50.88,66.47], [50.95,66.32], [51.02,66.47], [51.23,66.47], [51.58,66.77], [51.87,67.21], [52.15,66.91], [52.22,67.06], [52.22,67.36], [52.36,67.36], [52.36,67.06], [52.43,66.91], [52.43,66.03], [52.50,65.88], [52.43,65.14], [52.64,64.55], [52.99,64.40], [52.99,63.96], [52.71,63.22], [52.71,62.48], [52.64,62.33], [52.71,60.86], [52.64,60.71], [52.64,60.12], [52.78,59.53], [52.78,58.94], [52.92,58.49], [52.92,57.76], [53.27,56.87], [53.20,56.72], [53.20,55.84], [53.13,55.84], [52.92,55.24], [52.78,55.39], [52.36,55.39], [52.15,54.80], [51.16,54.95], [50.95,55.24], [50.81,55.10], [50.67,55.69], [50.32,55.39], [50.11,55.39], [49.97,55.10]]],
  ae: [[[60.73,39.29], [60.17,40.62], [59.61,40.62], [59.68,41.06], [60.52,41.36], [60.52,40.92], [60.66,40.33]]],
  it: [[[47.36,30.13], [47.43,30.28], [47.78,30.43], [47.99,30.72], [47.92,30.43], [47.99,30.13]], [[45.67,24.37], [45.60,24.96], [45.81,25.41], [45.95,25.11], [46.23,25.11], [46.52,25.41], [46.66,25.85], [46.66,26.14], [47.08,27.03], [47.29,27.33], [47.50,27.33], [47.71,27.77], [47.85,27.77], [47.99,28.21], [48.20,28.51], [48.35,29.10], [48.49,29.10], [48.28,28.51], [48.35,28.21], [48.56,27.92], [48.20,27.62], [48.06,27.33], [48.13,27.18], [47.99,27.33], [47.85,27.18], [46.94,25.11], [47.01,24.82], [46.94,24.52], [47.08,24.23], [47.36,24.08], [47.36,23.78], [47.08,23.78], [46.94,23.49], [46.80,23.49], [46.73,23.63], [46.59,23.63], [46.59,23.78], [46.38,24.08], [46.23,23.93], [46.16,24.23]]],
  fr: [[[42.44,22.30], [42.44,22.45], [42.86,22.75], [43.35,23.93], [43.35,25.11], [43.21,25.85], [43.28,26.14], [43.42,26.14], [43.49,26.29], [43.91,26.29], [44.12,26.59], [44.19,26.44], [44.34,26.44], [44.41,26.14], [44.62,25.85], [44.83,25.85], [44.90,25.70], [44.97,25.85], [45.32,25.85], [45.39,26.00], [45.60,25.70], [45.60,25.55], [45.46,25.41], [45.46,25.11], [45.39,24.96], [45.39,24.67], [45.46,24.52], [45.39,23.93], [45.25,24.08], [45.18,23.93], [45.18,23.49], [45.46,22.75], [45.60,22.75], [45.60,22.16], [45.67,22.01], [45.11,21.71], [44.97,21.42], [44.76,21.42], [44.12,20.53], [44.12,20.83], [43.98,21.27], [43.70,21.42], [43.35,21.86], [43.21,21.71], [43.21,22.16], [43.14,22.30], [42.93,22.30], [42.86,22.16], [42.51,22.16]]],
  be: [[[45.39,18.91], [45.25,18.76], [45.04,19.05], [44.90,19.05], [44.90,19.35], [44.76,19.94], [44.97,19.79], [45.11,20.09], [45.11,19.79], [45.18,19.64], [45.32,19.64]]],
};

// Ray casting standard (Jordan curve theorem): point dans un polygone ferme.
function isPointInRing(x: number, y: number, ring: readonly (readonly [number, number])[]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const intersects = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

// x,y en % de l'image de fond (0-100). Un pays peut avoir plusieurs
// anneaux disjoints (ex. Italie + son fragment de talon) -> on teste tous
// les anneaux, un point dans N'IMPORTE LEQUEL suffit.
function findCountryAtPoint(x: number, y: number): ImpactCountryId | null {
  for (const id of Object.keys(countryHitPolygons) as ImpactCountryId[]) {
    const rings = countryHitPolygons[id];
    if (rings.some((ring) => isPointInRing(x, y, ring))) {
      return id;
    }
  }
  return null;
}

const entrepreneurshipCards = [
  {
    title: 'Choix du statut juridique adapté',
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779674530/rnj/mask-group-12-bfc180ab.png',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
  {
    title: 'Faisabilité & plan financier',
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779674532/rnj/vector-19-81ce45a8.png',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 140.59,
  },
  {
    title: 'Démarches administratives',
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779674533/rnj/vector-18-18cc905b.png',
    iconWidth: 65.55,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
  {
    title: 'Conformité réglementaire',
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779674534/rnj/mask-group-11-4a32da53.png',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
];

const servicesFocusCards = [
  {
    title: 'Créer mon entreprise en Belgique',
    description: "Je lance mon activité avec un cadre juridique clair.",
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672855/rnj/mask-group-3-2ece0ef0.png',
    iconWidth: 67.41,
    iconHeight: 67.41,
  },
  {
    title: 'Obtenir un conseil juridique',
    description: "Je sécurise un projet complexe ou réglementé.",
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672855/rnj/mask-group-4-f2eb00c6.png',
    iconWidth: 77.59,
    iconHeight: 79.26,
  },
  {
    title: 'Accélérer ma croissance  Recruter hors UE',
    description: "Je développe mon organisation et je recrute à l'international.",
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672856/rnj/mask-group-5-c793fd9f.png',
    iconWidth: 77,
    iconHeight: 77,
  },
];

const strategicTrustCards = [
  {
    title: 'Cadre européen',
    description: 'Accès direct aux institutions et aux cadres réglementaires belges et européens.',
  },
  {
    title: 'Expertise locale',
    description: 'Connaissance approfondie du marché belge et des écosystèmes à Bruxelles.',
  },
  {
    title: 'Conseil stratégique',
    description: 'Des solutions juridiques et stratégiques adaptées à vos objectifs de croissance.',
  },
];

const institutionalCarouselCards = [
  {
    title: 'Analyse Institutionnelle & Réglementaire',
    description:
      'Études sectorielles (énergie, numérique, santé, environnement), analyses d’impact réglementaire et recommandations alignées avec les législations belges, tunisiennes et européennes.',
    image: '/optimized/group-348987-2.webp',
    bandBg: '#003300',
    textColor: '#FFFFFF',
    mirror: false,
  },
  {
    title: 'Structuration Juridique & Gouvernance',
    description:
      'Choix de la forme juridique (Belgique, Tunisie, international), création et transformation de sociétés, gouvernance, pactes d’associés, conventions de partenariat et opérations de transmission (M&A).',
    image: '/optimized/1768510829069%201.webp',
    bandBg: '#BBCB2E',
    textColor: '#FFFFFF',
    mirror: false,
  },
  {
    title: 'Droit Des Contrats & Sécurité Commerciale',
    description:
      'Rédaction, revue et négociation de contrats (clients, fournisseurs, partenaires), sous-traitance, licences et confidentialité. Nous réduisons les risques et sécurisons la relation commerciale à chaque étape clé.',
    image: '/optimized/1768510829154%201.webp',
    bandBg: '#E0E5C0',
    textColor: '#003300',
    mirror: false,
  },
  {
    title: 'Partenariats Public-Privé & Concessions',
    description:
      'Structuration juridique de projets PPP et concessions, appui aux entreprises, collectivités et institutions. Interventions sur l’énergie, les infrastructures et les projets d’intérêt général.',
    image: '/optimized/1775236031682%201.webp',
    bandBg: '#DDE597',
    textColor: '#003300',
    mirror: false,
  },
  {
    title: 'ESG, Conformité & Appels À Projets',
    description:
      'Audit juridique et compliance, protection des données (RGPD), mise en conformité opérationnelle. Accompagnement sur les appels à projets : éligibilité, cadrage juridique, rédaction et sécurisation contractuelle.',
    image: '/optimized/1775236032125%201.webp',
    bandBg: '#C2D0D3',
    textColor: '#0E434F',
    mirror: false,
  },
  {
    title: 'Veille Juridique & Anticipation Réglementaire',
    description:
      'Surveillance active des évolutions législatives et réglementaires en Belgique, en Europe et en Tunisie. Alertes ciblées sur les impacts potentiels et accompagnement dans l’anticipation des changements.',
    image: '/optimized/1778491345670%201.webp',
    bandBg: '#406640',
    textColor: '#FFFFFF',
    mirror: true,
  },
] as const;

const servicesFocusAnimationStates = [
  { activeCount: 0, lineFill: 0 },
  { activeCount: 1, lineFill: 0 },
  { activeCount: 2, lineFill: 50 },
  { activeCount: 3, lineFill: 100 },
] as const;

const whyChooseStripCards = [
  {
    title: 'Accompagnement humain, multilingue & engag\u00E9',
    description:
      "Proximit\u00E9, \u00E9coute active et respect de votre rythme : chez RNJ Advisory, nous mettons l'humain au c\u0153ur de chaque projet. Nous intervenons en fran\u00E7ais, en anglais et en arabe.",
    titleWidth: '301px',
    boxLeft: '-13.09%',
    boxRight: '92.99%',
  },
  {
    title: 'Expertise juridique & strat\u00E9gique',
    description:
      "Notre accompagnement repose sur la rigueur d'un pool d'experts sp\u00E9cialis\u00E9 en droit public, \u00E9nergie, strat\u00E9gie entrepreneuriale, gestion de projet et transformation op\u00E9rationnelle et digitale.",
    titleWidth: '259px',
    boxLeft: '8.13%',
    boxRight: '71.78%',
  },
  {
    title: 'Performances & fiabilit\u00E9',
    description:
      'Nous nous engageons \u00E0 vous offrir un service professionnel, rapide et s\u00E9curis\u00E9. Nos outils r\u00E9duisent les temps morts, fluidifient les d\u00E9marches administratives et renforcent vos r\u00E9sultats.',
    titleWidth: '259px',
    boxLeft: '29.35%',
    boxRight: '50.56%',
  },
  {
    title: 'M\u00E9thodologie et durabilit\u00E9',
    description:
      "Notre cadre d'accompagnement structur\u00E9 permet de clarifier les priorit\u00E9s, de construire une base solide et de d\u00E9ployer votre activit\u00E9 avec agilit\u00E9, automatisation et vision long terme.",
    titleWidth: '259px',
    boxLeft: '50.56%',
    boxRight: '29.35%',
  },
  {
    title: 'Ancrage local et ouverture internationale',
    description:
      'Bas\u00E9s \u00E0 Bruxelles et \u00E0 Tunis, nous accompagnons les porteurs de projet install\u00E9s en Belgique, les entrepreneurs hors UE et les institutions souhaitant structurer ou \u00E9tendre leur impact.',
    titleWidth: '285px',
    boxLeft: '71.78%',
    boxRight: '8.13%',
  },
  {
    title: 'Partenariats strat\u00E9giques avec des acteurs reconnus',
    description:
      "Nous collaborons avec un r\u00E9seau solide d'acteurs publics, priv\u00E9s et associatifs en Belgique comme en Tunisie.",
    titleWidth: '303px',
    boxLeft: '92.99%',
    boxRight: '-13.09%',
  },
];

const whyChooseCardGradients = [
  'linear-gradient(180deg, #003300 0%, #009900 100%)',
  'linear-gradient(180deg, #003300 0%, #BBCB2E 100%)',
];
const whyChooseCardActiveBackground = '#F7FCFF';
const whyChooseCardActiveBorder = '#6C8B68';

const whyChooseAnimatedCards = [
  {
    title: 'Approche humaine & multilingue',
    description: 'Une approche humaine, claire et multilingue.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676399/rnj/users-f9417797.png',
    iconWidth: 58.33,
    iconHeight: 61.14,
  },
  {
    title: 'Expertise juridique & stratégique',
    description:
      'Expertise en droit public, énergie, stratégie et transformation.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676400/rnj/law-ec037074.png',
    iconWidth: 60.38,
    iconHeight: 61.08,
  },
  {
    title: 'Performances & fiabilité',
    description: 'Un service rapide, sécurisé et orienté résultats.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676400/rnj/check-mark-89a3c66e.png',
    iconWidth: 54.62,
    iconHeight: 41.8,
  },
  {
    title: 'Méthodologie et durabilité',
    description: 'Un cadre structuré pour une croissance agile et durable.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676401/rnj/methologie-648e7fd2.png',
    iconWidth: 51.95,
    iconHeight: 60.34,
  },
  {
    title: 'Ancrage local et ouverture internationale',
    description: 'Bruxelles et Tunis : un accompagnement local et international.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676401/rnj/earth-c9fdae9d.png',
    iconWidth: 59.77,
    iconHeight: 59.77,
  },
  {
    title: 'Partenariats stratégiques avec des acteurs reconnus',
    description: 'Un réseau de partenaires actifs en Belgique et en Tunisie.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676402/rnj/handshake-387c4c1d.png',
    iconWidth: 83.23,
    iconHeight: 59,
  },
] as const;

const faqItems = [
  {
    question: "À qui s'adressent les services de RNJ Advisory ?",
    answer:
      "Nos services s’adressent aux entrepreneurs, PME, ASBL, investisseurs, bailleurs de fonds, institutions publiques et acteurs privés qui souhaitent structurer, sécuriser ou développer leurs projets dans un cadre conforme et durable.",
  },
  {
    question: 'Dans quels pays intervenez-vous ?',
    answer:
      "RNJ Advisory intervient principalement en Belgique, en Europe, dans la région MENA et en Afrique subsaharienne. Nous accompagnons des projets locaux, transfrontaliers et internationaux selon les enjeux réglementaires, institutionnels et stratégiques de chaque mission.",
  },
  {
    question: 'Quels types de projets accompagnez-vous ?',
    answer:
      "Nous accompagnons des projets de création d’entreprise, de structuration d’activité, de conformité réglementaire, d’études institutionnelles, de développement stratégique, ainsi que des projets d’implantation en Belgique et de partenariats internationaux.",
  },
  {
    question: "Comment se déroule une mission d'analyse réglementaire ?",
    answer:
      "Chaque mission débute par une phase de cadrage pour comprendre vos objectifs, votre secteur et votre contexte d’intervention. Nous analysons ensuite le cadre juridique et institutionnel applicable, identifions les risques, obligations et opportunités, puis formulons des recommandations concrètes et actionnables.",
  },
  {
    question: 'Avec quels types d’organisations intervenez-vous ?',
    answer:
      "Nous intervenons auprès d’entrepreneurs, de PME, d’ASBL, d’entreprises en croissance, d’institutions publiques, d’organisations privées, d’investisseurs et de bailleurs de fonds. Notre accompagnement s’adapte à la taille de la structure, à son niveau de maturité et à la nature du projet.",
  },
  {
    question: 'Intervenez-vous à l’international ?',
    answer:
      "Oui. Nous intervenons principalement en Europe, dans la région MENA et en Afrique subsaharienne, notamment pour des études institutionnelles, des réformes réglementaires, des conseils juridiques, l’accompagnement de porteurs de projet hors UE et le recrutement de talents hors UE.",
  },
  {
    question: 'Comment débute une mission ?',
    answer:
      "Chaque mission commence par un échange de cadrage pour clarifier vos besoins, vos priorités et le contexte du projet. À l’issue de cette étape, nous définissons le périmètre d’intervention, la méthodologie, les livrables attendus et le calendrier.",
  },
  {
    question: 'Confidentialité et sécurité des données ?',
    answer:
      "La confidentialité fait partie intégrante de notre méthode de travail. Les informations, documents et échanges confiés à RNJ Advisory sont traités avec discrétion, dans un cadre sécurisé et professionnel, conformément aux exigences applicables en matière de confidentialité et de protection des données.",
  },
  {
    question: 'Délais d’exécution ?',
    answer:
      "Les délais d’exécution varient selon la nature, la complexité et le niveau d’urgence du projet. Après la phase de cadrage, nous partageons un calendrier clair avec des étapes définies pour assurer une exécution rigoureuse, transparente et adaptée à vos priorités.",
  },
];

const whyChooseGridCards = [
  {
    title: 'Expertise juridique & stratégique',
    description:
      "Notre accompagnement repose sur la rigueur d'un pool d'experts spécialisés en droit public, énergie, stratégie entrepreneuriale, gestion de projet et transformation opérationnelle.",
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676400/rnj/law-ec037074.png',
    iconWidth: 97,
    iconHeight: 97,
    titleWidth: '270px',
    descriptionWidth: '344px',
  },
  {
    title: 'Performances & fiabilité',
    description:
      'Nous nous engageons à vous offrir un service professionnel, rapide et sécurisé. Nos outils réduisent les temps morts, fluidifient les démarches administratives et optimisent vos résultats.',
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676400/rnj/check-mark-89a3c66e.png',
    iconWidth: 82,
    iconHeight: 64,
    titleWidth: '178px',
    descriptionWidth: '344px',
  },
  {
    title: 'Méthodologie et durabilité',
    description:
      "Notre cadre d'accompagnement structuré permet de clarifier les priorités, de construire une base solide et de déployer votre activité avec agilité et vision long terme.",
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676401/rnj/methologie-648e7fd2.png',
    iconWidth: 86,
    iconHeight: 78,
    titleWidth: '270px',
    descriptionWidth: '368px',
  },
  {
    title: 'Accompagnement humain, multilingue & engagé',
    description:
      "Proximité, écoute active et respect de votre rythme : chez RNJ Advisory, nous mettons l'humain au cœur de chaque projet. Nous intervenons en français, anglais et arabe.",
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676399/rnj/users-f9417797.png',
    iconWidth: 55,
    iconHeight: 87,
    titleWidth: '326px',
    descriptionWidth: '376px',
  },
  {
    title: 'Ancrage local et ouverture internationale',
    description:
      'Basés à Bruxelles et à Tunis, nous accompagnons les porteurs de projet installés en Belgique, les entrepreneurs hors UE et les institutions souhaitant structurer ou étendre leur impact.',
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676401/rnj/earth-c9fdae9d.png',
    iconWidth: 52,
    iconHeight: 75,
    titleWidth: '310px',
    descriptionWidth: '344px',
  },
  {
    title: 'Partenariats stratégiques avec des acteurs reconnus',
    description:
      "Nous collaborons avec un réseau solide d'acteurs publics, privés et associatifs, en Belgique comme en Tunisie.",
    icon: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676402/rnj/handshake-387c4c1d.png',
    iconWidth: 77,
    iconHeight: 72,
    titleWidth: '330px',
    descriptionWidth: '344px',
  },
];

const projectsCarouselData = [
  {
    id: 'elmed',
    client: "MINISTÈRE DE L'INDUSTRIE, DES MINES ET DES ÉNERGIES RENOUVELABLES",
    title: 'Projet Elmed',
    description: "Conseil juridique pour la mise en place d'un cadre réglementaire favorisant le développement du projet Elmed et l'exportation de l'électricité verte entre la Tunisie et l'Europe.",
    interventions: [
      "Création d'un cadre réglementaire propice au projet Elmed.",
      "Mise en place des bases juridiques d'une autorité de régulation du secteur électrique.",
    ],
    pays: 'TUNISIE, ITALIE',
    flagEmojis: ['🇹🇳', '🇮🇹'],
    image: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672109/rnj/mask-group-16-f5d02d69.webp',
  },
  {
    id: 'eac',
    client: "MINISTÈRE DE L'ÉNERGIE ET DES MINES",
    title: "Certificats d'Attributs Énergétiques",
    description: "RNJ Advisory a contribué à la première phase de l'étude sur la conceptualisation des EAC en Tunisie, avec un atelier organisé à Tunis auprès du Ministère de l'Énergie et des Mines et des parties prenantes.",
    interventions: [
      "Analyse du cadre réglementaire des EAC.",
      "Organisation d'ateliers de consultation avec les parties prenantes.",
    ],
    pays: 'TUNISIE',
    flagEmojis: ['🇹🇳'],
    image: '/optimized/group-65.webp',
  },
  {
    id: 'interconnexion',
    client: "CLIENT INSTITUTIONNEL / SECTEUR ÉNERGÉTIQUE",
    title: "Interconnexion électrique Tunisie-Italie",
    description: "Étude juridique et institutionnelle pour la mise en place d'un cadre réglementaire propice à l'interconnexion électrique entre la Tunisie et l'Italie, ainsi que la création d'une autorité de régulation du secteur électrique en Tunisie.",
    interventions: [
      "Analyse du cadre réglementaire tunisien.",
      "Actualisation des textes réglementaires.",
      "Assistance à la mise en place du cadre réglementaire.",
    ],
    pays: 'TUNISIE, ITALIE',
    flagEmojis: ['🇹🇳', '🇮🇹'],
    image: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672110/rnj/mask-group-17-57db8ebe.webp',
  },
] as const;


function RegulationAnalysisSection() {
  return (
    <section className="w-full bg-[#F7FCFF] py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1321px] flex-col items-center justify-between gap-10 px-4 md:px-6 lg:gap-14 xl:gap-16 2xl:h-[582px] 2xl:flex-row 2xl:items-start 2xl:gap-0 2xl:px-0">
        <div className="flex w-full max-w-[988px] flex-col items-center gap-[40px] text-center sm:gap-[48px] lg:max-w-[760px] lg:gap-12 2xl:h-[582px] 2xl:max-w-[988px] 2xl:items-start 2xl:justify-between 2xl:gap-[88.09px] 2xl:text-left">
          <div className="flex items-center gap-3 2xl:w-[469.8px]">
            <span className="h-[11.81px] w-[11.81px] rounded-full bg-[#003300]" />
            <h3
              className="font-[Geist] font-bold text-[#003300] text-[clamp(20px,2.2vw,27.9642px)] leading-[30px] 2xl:text-[27.9642px] 2xl:leading-[30px]"
            >
              Études & Analyse Réglementaire
            </h3>
          </div>

          <div className="flex w-full flex-col items-center gap-10 lg:gap-10 2xl:w-[987.89px] 2xl:items-start 2xl:justify-center 2xl:gap-[65.02px]">
            <div className="flex w-full max-w-[820.21px] flex-col items-center gap-6 sm:gap-8 lg:max-w-[640px] lg:gap-8 2xl:max-w-[820.21px] 2xl:items-start 2xl:gap-[41.6px]">
              <h2
                className="text-center font-[EB_Garamond] text-[#003300] text-[clamp(34px,8vw,83.0753px)] leading-[clamp(34px,7vw,68px)] md:text-[52px] md:leading-[46px] lg:text-[60px] lg:leading-[54px] 2xl:text-left 2xl:text-[83.0753px] 2xl:leading-[68px]"
                style={{
                  maxWidth: '773.41px',
                  letterSpacing: '-0.03em',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontVariationSettings: '"wght" 600',
                  fontSynthesis: 'none',
                }}
              >
                Analyse{'\u00A0'}Institutionnelle & Réglementaire
              </h2>

              <p
                className="max-w-[820.21px] text-center font-[Geist] font-medium text-[#003300] text-[clamp(15px,3vw,20.9988px)] leading-[clamp(21px,3.3vw,23px)] md:max-w-[640px] lg:max-w-[620px] lg:text-[18px] lg:leading-[22px] 2xl:max-w-[820.21px] 2xl:text-left 2xl:text-[20.9988px] 2xl:leading-[23px]"
                style={{
                  opacity: 0.8,
                }}
              >
                Vous êtes un organisme public, une institution privée, un investisseur ou un bailleur de fonds ? RNJ Advisory
                vous accompagne dans l’analyse approfondie des environnements institutionnels, juridiques et réglementaires afin
                de sécuriser vos décisions stratégiques.
              </p>
            </div>

            <div className="flex w-full max-w-[634.22px] flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-center sm:gap-[12.4px] lg:justify-center lg:gap-4 2xl:w-[634.22px] 2xl:max-w-[634.22px] 2xl:justify-start 2xl:gap-[12.4px]">
              <Link
                href="/contact"
                className="flex h-[68px] w-full items-center justify-center rounded-[82.6547px] border-[2.48019px] border-[#003300] px-8 text-center font-[Geist] font-semibold text-[#003300] text-[clamp(18px,2vw,25.1616px)] leading-[25px] transition-colors hover:bg-[#003300] hover:text-[#F7FCFF] sm:h-[84.49px] sm:w-auto sm:px-[60px] lg:h-[72px] lg:min-w-[210px] lg:px-10 lg:text-[20px] lg:leading-[22px] 2xl:h-[84.49px] 2xl:w-[254.77px] 2xl:min-w-0 2xl:px-0 2xl:text-[25.1616px] 2xl:leading-[25px]"
                style={{ touchAction: 'manipulation' }}
              >
                En savoir plus
              </Link>

              <button
                type="button"
                className="flex h-[68px] w-full items-center justify-center rounded-[141.694px] bg-[#003300] px-6 text-center font-[Geist] font-semibold text-[#F7FCFF] text-[clamp(18px,2vw,25.1616px)] leading-[25px] transition-colors hover:bg-[#002200] sm:h-[83.04px] sm:w-auto sm:px-10 lg:h-[72px] lg:min-w-[290px] lg:px-10 lg:text-[20px] lg:leading-[22px] 2xl:h-[83.04px] 2xl:w-[367.05px] 2xl:min-w-0 2xl:px-[12.401px] 2xl:text-[25.1616px] 2xl:leading-[25px]"
                style={{ touchAction: 'manipulation' }}
              >
                Demander une analyse
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[220px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[340px] xl:max-w-[360px] 2xl:mx-0 2xl:w-[364.57px] 2xl:max-w-[364.57px]">
          <div className="relative h-[240px] w-full sm:h-[320px] md:h-[400px] lg:h-[460px] xl:h-[520px] 2xl:h-[580.66px]">
            <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779674333/rnj/light-bulb-1-1-aa32136c.png"
              alt="Ampoule - Analyse réglementaire"
              fill
              sizes="(min-width: 1536px) 364.57px, (min-width: 1280px) 360px, (min-width: 1024px) 340px, (min-width: 768px) 320px, (min-width: 640px) 280px, 220px"
              className="object-contain translate-y-2 md:translate-y-3 2xl:translate-y-4"
             loading="lazy"/>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseGridSection() {
  return (
    <section className="w-full bg-[#F7FCFF] px-4 py-16 md:px-6 md:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-[40px] lg:gap-[90px]">
        <div className="grid w-full justify-items-center gap-[16.16px] md:grid-cols-2 2xl:grid-cols-3">
          {whyChooseGridCards.map((card) => (
            <article
              key={card.title}
              className="relative mx-auto flex min-h-[360px] w-full max-w-[429.23px] flex-col items-center overflow-hidden rounded-[32px] border border-[#003300] bg-[#F7FCFF] px-5 pb-8 pt-9 text-center sm:min-h-[390px] sm:rounded-[40px] sm:px-7 sm:pb-10 sm:pt-10 2xl:h-[429.23px] 2xl:min-h-0 2xl:rounded-[70.6962px] 2xl:border-[2px] 2xl:px-0 2xl:pb-0 2xl:pt-0"
              style={{ boxShadow: '4px 4px 1.5px #003300' }}
            >
              <div
                className="relative left-auto top-auto mx-auto -translate-x-0 2xl:absolute 2xl:left-1/2 2xl:top-[58px] 2xl:-translate-x-1/2"
                style={{
                  width: `clamp(${Math.max(card.iconWidth - 24, 36)}px, 18vw, ${card.iconWidth}px)`,
                  height: `clamp(${Math.max(card.iconHeight - 24, 36)}px, 18vw, ${card.iconHeight}px)`,
                }}
              >
                <div
                  className="relative"
                  style={{
                    width: `clamp(${Math.max(card.iconWidth - 24, 36)}px, 18vw, ${card.iconWidth}px)`,
                    height: `clamp(${Math.max(card.iconHeight - 24, 36)}px, 18vw, ${card.iconHeight}px)`,
                  }}
                >
                  <Image
                    src={card.icon}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 97px, (min-width: 768px) 86px, 72px"
                    className="object-contain"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div
                className="relative left-auto mt-6 flex w-full max-w-[344px] -translate-x-0 flex-col items-center gap-4 px-1 sm:mt-8 sm:gap-4 2xl:absolute 2xl:left-1/2 2xl:top-[196.31px] 2xl:mt-0 2xl:-translate-x-1/2 2xl:gap-5 2xl:px-0"
                style={{
                  width: '100%',
                }}
              >
                <h3
                  className="break-words font-[Geist] font-extrabold text-[#003300]"
                  style={{
                    maxWidth: `min(100%, ${card.titleWidth})`,
                    fontSize: 'clamp(19px, 4.7vw, 23.6774px)',
                    lineHeight: 'clamp(23px, 5vw, 27px)',
                  }}
                >
                  {card.title}
                </h3>

                <p
                  className="break-words font-[Geist] font-medium text-[#003300]"
                  style={{
                    maxWidth: `min(100%, ${card.descriptionWidth})`,
                    fontSize: 'clamp(13.5px, 3.45vw, 17.124px)',
                    lineHeight: 'clamp(19px, 4.2vw, 20px)',
                  }}
                >
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type TabKey = 'installer' | 'structurer' | 'developper';

const entrepreneuriatTabs: Array<{
  key: TabKey;
  label: string;
  tag: string;
  title: string;
  description: string;
  bg: string;
  imageBg?: string;
  imageClassName?: string;
  textColor: string;
  buttonOutlineColor: string;
  buttonFilledBg: string;
  image: string;
}> = [
  {
    key: 'installer',
    label: "S'installer",
    tag: 'Entrepreneuriat',
    title: 'Entrepreneurs hors Union européenne : installation en Belgique',
    description:
      "Vous êtes ressortissant hors Union européenne et souhaitez développer votre activité en Belgique ? RNJ Advisory vous accompagne à chaque étape pour sécuriser votre installation sur les plans juridique, stratégique et administratif.",
    bg: '#BBCB2E',
    textColor: '#003300',
    buttonOutlineColor: '#003300',
    buttonFilledBg: '#003300',
    image: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779673668/rnj/group-541-2a130507.png',
  },
  {
    key: 'structurer',
    label: 'Structurer',
    tag: 'Structurer',
    title: 'Création & Structuration d’Entreprise',
    description:
      "Vous êtes indépendant ou vous préparez un lancement ? RNJ Advisory vous accompagne dès la phase de conception pour structurer votre projet sur des bases juridiques solides et économiquement viables.",
    bg: '#DDE597',
    textColor: '#003300',
    buttonOutlineColor: '#003300',
    buttonFilledBg: '#003300',
    image: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:good,w_1200,h_900,c_limit/v1779673669/rnj/optimized/group-541-1-5b55b5e0.png',
  },
  {
    key: 'developper',
    label: 'Développer',
    tag: 'Développer',
    title: 'PME & ASBL en Croissance',
    description:
      "Vous dirigez une PME ou une ASBL en croissance ? Nous vous aidons à professionnaliser votre organisation, sécuriser vos opérations et soutenir une expansion maîtrisée, y compris pour le recrutement hors UE.",
    bg: '#C1CB82',
    imageBg: '#D9D9D9',
    imageClassName: 'xl:object-cover xl:object-center xl:scale-[1.06]',
    textColor: '#003300',
    buttonOutlineColor: '#003300',
    buttonFilledBg: '#003300',
    image: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:good,w_1200,h_900,c_limit/v1779673670/rnj/optimized/group-541-2-59ca9193.png',
  },
];

function EntrepreneuriatTabsSection() {
  const TOTAL_DURATION = 13500;
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    let raf = 0;
    const start = performance.now() - progress * TOTAL_DURATION;
    const tick = (now: number) => {
      const elapsed = (now - start) % TOTAL_DURATION;
      setProgress(elapsed / TOTAL_DURATION);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  const activeIndex = Math.max(
    0,
    Math.min(
      entrepreneuriatTabs.length - 1,
      Math.floor(progress * entrepreneuriatTabs.length),
    ),
  );
  const active = entrepreneuriatTabs[activeIndex] ?? entrepreneuriatTabs[0];
  const activeImageSrc = active?.image ?? 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779673668/rnj/group-541-2a130507.png';

  const firstStepPercent = 100 / entrepreneuriatTabs.length;
  const progressPercent = Math.min(
    100,
    firstStepPercent + progress * (100 - firstStepPercent),
  );

  const setActiveIndex = (idx: number) => {
    setProgress(idx / entrepreneuriatTabs.length);
  };

  return (
    <section
      className="w-full bg-[#eff1ce] pt-8 sm:pt-10 md:pt-14 lg:pt-18 xl:pt-24 2xl:pt-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full">
        <div className="relative w-full overflow-hidden">
          <div
            className="relative h-[48px] w-full sm:h-[52px] md:h-[56px] lg:h-[61px]"
            style={{ backgroundColor: 'rgba(0,51,0,0.5)' }}
          >
            <div
              className="absolute left-0 top-0 h-full bg-[#003300]"
              style={{ width: `${progressPercent}%` }}
            />
            <div className="relative grid h-full w-full grid-cols-3">
              {entrepreneuriatTabs.map((tab, idx) => {
                const isActive = idx === activeIndex;
                const isPast = idx < activeIndex;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="relative flex items-center justify-center"
                  >
                    <span
                      className="whitespace-nowrap px-1.5 font-[Geist] text-[13px] font-semibold leading-[1.1] transition-opacity duration-500 sm:px-2 sm:text-[15px] md:text-[18px] lg:text-[20px] lg:leading-[14px]"
                      style={{
                        color: '#BBCB2E',
                        opacity: isActive || isPast ? 1 : 0.5,
                      }}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div key={active.key} className="tab-fade flex flex-col lg:min-h-[700px] xl:min-h-[835px] xl:flex-row">
            <div
              className="flex w-full flex-col px-4 py-6 sm:px-5 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12 xl:w-1/2 xl:px-[60px] xl:py-[89px] transition-colors duration-500"
              style={{ backgroundColor: active.bg }}
            >
              <div className="flex items-center gap-[6px] sm:gap-[7px] md:gap-[8px]">
                <span
                  className="inline-block h-[6px] w-[6px] rounded-full sm:h-[6.5px] sm:w-[6.5px] md:h-[7.28px] md:w-[7.28px]"
                  style={{ backgroundColor: active.textColor }}
                />
                <span
                  className="font-[Geist] text-[13px] font-bold leading-[1.1] sm:text-[14px] md:text-[16px] lg:text-[17.25px] lg:leading-[18px]"
                  style={{
                    color: active.textColor,
                  }}
                >
                  {active.tag}
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-8 md:mt-10 md:gap-10 lg:mt-12 lg:gap-12 xl:mt-[89px] xl:gap-[200px]">
                <div className="flex max-w-[595px] flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[30px]">
                  <h3
                    className="font-[EB_Garamond] font-semibold"
                    style={{
                      fontSize: 'clamp(34px, 5.2vw, 64px)',
                      lineHeight: '0.86',
                      letterSpacing: '-0.03em',
                      color: active.textColor,
                    }}
                  >
                    {active.title}
                  </h3>
                  <p
                    className="max-w-[572px] font-[Geist] font-medium text-[14px] leading-[1.25] sm:text-[15px] sm:leading-[1.2] md:text-[16px] md:leading-[17px]"
                    style={{
                      color: active.textColor,
                      opacity: 0.7,
                    }}
                  >
                    {active.description}
                  </p>
                </div>

                <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:gap-2.5 md:gap-[7.65px]">
                  <Link
                    href="/services"
                    className="inline-flex h-[46px] w-full items-center justify-center rounded-full px-5 font-[Geist] text-[14px] font-semibold leading-[1.1] transition-opacity hover:opacity-80 sm:h-[48px] sm:w-auto sm:min-w-[150px] sm:px-5 sm:text-[15px] md:h-[52px] md:min-w-[170px] md:px-[24px] md:text-[15.52px] md:leading-[16px]"
                    style={{
                      border: `1.53px solid ${active.buttonOutlineColor}`,
                      color: active.textColor,
                    }}
                  >
                    En savoir plus
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-[46px] w-full items-center justify-center rounded-full px-5 font-[Geist] text-[14px] font-semibold leading-[1.1] text-white transition-opacity hover:opacity-90 sm:h-[48px] sm:w-auto sm:min-w-[170px] sm:px-6 sm:text-[15px] md:h-[51.19px] md:min-w-[195px] md:px-[28px] md:text-[15.52px] md:leading-[16px]"
                    style={{
                      backgroundColor: active.buttonFilledBg,
                    }}
                  >
                    Prendre rendez-vous
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="relative w-full overflow-hidden transition-colors duration-500 xl:w-1/2"
              style={{ backgroundColor: active.imageBg ?? active.bg }}
            >
              <div className="relative w-full xl:absolute xl:inset-0 xl:h-full">
                {/* Below xl: image sizes naturally at full width (no crop/zoom). xl: absolute-fill with object-cover */}
                {/* iOS Safari needs explicit width/height + aspect-ratio for SVG sizing */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={activeImageSrc}
                  src={encodeURI(activeImageSrc)}
                  alt={active.title}
                  width={759}
                  height={835}
                  className={`block w-full h-auto min-h-[280px] [aspect-ratio:759/835] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[450px] xl:absolute xl:inset-0 xl:h-full xl:w-full xl:min-h-0 xl:object-contain xl:object-right-top xl:[aspect-ratio:auto] ${active.imageClassName ?? ''}`}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeImpactCountry, setActiveImpactCountry] = useState<ImpactCountryId | null>(null);
  const impactPinsFrameRef = useRef<HTMLDivElement>(null);
  const mapFrameRef = useRef<HTMLDivElement>(null);
  const [showStrategicPopup, setShowStrategicPopup] = useState(false);
  const [showCertificatesPopup, setShowCertificatesPopup] = useState(false);
  const [isInterconnectionCardActive, setIsInterconnectionCardActive] = useState(false);
  const [isInterconnectionReadMoreOpening, setIsInterconnectionReadMoreOpening] = useState(false);
  const [esgActiveCardIndex, setEsgActiveCardIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [hoveredScrollCardIndex, setHoveredScrollCardIndex] = useState<number | null>(null);
  const [hoveredFaqIndex, setHoveredFaqIndex] = useState<number | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [isMobileFaqViewport, setIsMobileFaqViewport] = useState(false);
  const [faqShowAll, setFaqShowAll] = useState(false);
  const faqSectionRef = useRef<HTMLDivElement | null>(null);
  const faqLastScrollY = useRef(0);
  const [servicesFocusStage, setServicesFocusStage] = useState(0);
  const [belgiumStep, setBelgiumStep] = useState(0);
  const [isInstitutionalCarouselPaused, setIsInstitutionalCarouselPaused] = useState(false);
  const [isInstitutionalCarouselInView, setIsInstitutionalCarouselInView] = useState(false);
  const [activeInstitutionalSlide, setActiveInstitutionalSlide] = useState(0);
  const institutionalCarouselRef = useRef<HTMLDivElement | null>(null);
  const institutionalCarouselSectionRef = useRef<HTMLDivElement | null>(null);
  const prevInstitutionalInView = useRef(false);
  const interconnectionCardTouchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interconnectionPopupOpenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLightBulbAnimated, setIsLightBulbAnimated] = useState(false);
  const lightBulbSectionRef = useRef<HTMLDivElement | null>(null);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const faqAnswerRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const [faqAnswerHeights, setFaqAnswerHeights] = useState<number[]>(() => faqItems.map(() => 0));
  const faqLayoutState = expandedFaqIndex !== null
    ? 'clicked'
    : hoveredFaqIndex !== null && !isMobileFaqViewport
      ? 'hover'
      : 'default';
  const faqPanelMinHeightClass = faqLayoutState === 'clicked'
    ? 'md:min-h-[865px]'
    : faqLayoutState === 'hover'
      ? 'md:min-h-[838px]'
      : 'md:min-h-[809px]';
  const faqContentMaxWidthClass = faqLayoutState === 'default' ? 'md:max-w-[1040px]' : 'md:max-w-[922px]';
  const faqRowsMaxWidthClass = faqLayoutState === 'default' ? 'md:max-w-[1046px]' : 'md:max-w-[922px]';
  const faqRowInnerMaxWidthClass = faqLayoutState === 'default' ? 'md:max-w-[925px]' : 'md:max-w-[803px]';

  const belgiumSteps = [
    {
      title: 'Diagnostic & cadrage',
      description: 'Évaluez votre projet et lancez votre activité en Belgique.',
      gradientWidth: '0%',
      circles: [
        { size: '56px', opacity: 1, number: '01' },
        { size: '28px', opacity: 0.6, number: '' },
        { size: '14px', opacity: 0.6, number: '' },
        { size: '14px', opacity: 0.6, number: '' },
        { size: '14px', opacity: 0.6, number: '' },
      ],
    },
    {
      title: 'Stratégie & structuration',
      description: 'Un plan sur mesure pour structurer et orienter votre projet.',
      gradientWidth: '32.67%',
      circles: [
        { size: '28px', opacity: 0.6, number: '' },
        { size: '56px', opacity: 1, number: '02' },
        { size: '28px', opacity: 0.6, number: '' },
        { size: '14px', opacity: 0.6, number: '' },
        { size: '14px', opacity: 0.6, number: '' },
      ],
    },
    {
      title: 'Mise en conformité & autorisations',
      description: 'Gestion des formalités et conformité de votre activité.',
      gradientWidth: '47.39%',
      circles: [
        { size: '14px', opacity: 0.6, number: '' },
        { size: '28px', opacity: 0.6, number: '' },
        { size: '56px', opacity: 1, number: '03' },
        { size: '28px', opacity: 0.6, number: '' },
        { size: '14px', opacity: 0.6, number: '' },
      ],
    },
    {
      title: 'Déploiement opérationnel',
      description: 'Accompagnement à l\'exécution et pilotage de votre projet.',
      gradientWidth: '65.17%',
      circles: [
        { size: '14px', opacity: 0.6, number: '' },
        { size: '14px', opacity: 0.6, number: '' },
        { size: '28px', opacity: 0.6, number: '' },
        { size: '56px', opacity: 1, number: '04' },
        { size: '28px', opacity: 0.6, number: '' },
      ],
    },
    {
      title: 'Suivi & performance durable',
      description: 'Suivi continu pour renforcer et pérenniser vos résultats.',
      gradientWidth: '83.65%',
      circles: [
        { size: '14px', opacity: 0.6, number: '' },
        { size: '14px', opacity: 0.6, number: '' },
        { size: '14px', opacity: 0.6, number: '' },
        { size: '28px', opacity: 0.6, number: '' },
        { size: '56px', opacity: 1, number: '05' },
      ],
    },
  ];
  const activeImpactCountryData = impactCountries.find((country) => country.id === activeImpactCountry) ?? null;

  useEffect(() => {
    const initialActivation = setTimeout(() => {
      setServicesFocusStage(1);
    }, 350);

    const interval = setInterval(() => {
      setServicesFocusStage((current) => {
        if (current === 0) {
          return 1;
        }
        return current === servicesFocusAnimationStates.length - 1 ? 1 : current + 1;
      });
    }, 1500);

    return () => {
      clearTimeout(initialActivation);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBelgiumStep((current) => (current + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEsgActiveCardIndex((current) => (current + 1) % 3);
    }, 1700);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateFaqAnswerHeights = () => {
      setFaqAnswerHeights(
        faqItems.map((_, index) => faqAnswerRefs.current[index]?.scrollHeight ?? 0)
      );
    };

    updateFaqAnswerHeights();
    window.addEventListener('resize', updateFaqAnswerHeights);

    return () => {
      window.removeEventListener('resize', updateFaqAnswerHeights);
    };
  }, []);

  useEffect(() => {
    const updateFaqViewport = () => {
      setIsMobileFaqViewport(window.innerWidth < 768);
    };

    updateFaqViewport();
    window.addEventListener('resize', updateFaqViewport);

    return () => {
      window.removeEventListener('resize', updateFaqViewport);
    };
  }, []);

  useEffect(() => {
    const handleFaqScroll = () => {
      const currentY = window.scrollY;
      const isScrollingUp = currentY < faqLastScrollY.current;
      faqLastScrollY.current = currentY;

      if (isScrollingUp && faqShowAll && faqSectionRef.current) {
        const rect = faqSectionRef.current.getBoundingClientRect();
        if (rect.top > window.innerHeight * 0.3) {
          setFaqShowAll(false);
          setExpandedFaqIndex(null);
        }
      }
    };

    window.addEventListener('scroll', handleFaqScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleFaqScroll);
  }, [faqShowAll]);

  const servicesFocusActiveCount = servicesFocusAnimationStates[servicesFocusStage].activeCount;
  const servicesFocusLineFill = servicesFocusAnimationStates[servicesFocusStage].lineFill;
  function closeStrategicPopup() {
    setShowStrategicPopup(false);
    setIsInterconnectionReadMoreOpening(false);
    setIsInterconnectionCardActive(false);
  }

  function triggerInterconnectionCardTouchFeedback() {
    if (interconnectionCardTouchTimeoutRef.current) {
      clearTimeout(interconnectionCardTouchTimeoutRef.current);
      interconnectionCardTouchTimeoutRef.current = null;
    }
    if (isInterconnectionCardActive) {
      setIsInterconnectionCardActive(false);
    } else {
      setIsInterconnectionCardActive(true);
    }
  }

  function openStrategicPopupWithTouchAnimation() {
    if (showStrategicPopup || isInterconnectionReadMoreOpening) return;
    const isTouchDevice =
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (interconnectionPopupOpenTimeoutRef.current) {
      clearTimeout(interconnectionPopupOpenTimeoutRef.current);
      interconnectionPopupOpenTimeoutRef.current = null;
    }
    setIsInterconnectionCardActive(true);
    setIsInterconnectionReadMoreOpening(true);
    interconnectionPopupOpenTimeoutRef.current = setTimeout(() => {
      setShowStrategicPopup(true);
      interconnectionPopupOpenTimeoutRef.current = null;
    }, isTouchDevice ? 220 : 180);
  }

  function scrollInstitutionalCarousel(direction: 'left' | 'right') {
    const carousel = institutionalCarouselRef.current;
    if (!carousel) return;

    const firstCard = carousel.querySelector('[data-institutional-card]') as HTMLElement | null;
    const styles = getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? carousel.clientWidth * 0.9;
    // Two full cards are visible per view from md breakpoint up — advance by a
    // whole pair so we always land on a pair boundary and never reveal a
    // partial third card mid-row.
    const cardsPerView = window.innerWidth >= 768 ? 2 : 1;
    const offset = (cardWidth + gap) * cardsPerView * (direction === 'right' ? 1 : -1);
    carousel.scrollBy({ left: offset, behavior: 'smooth' });
  }

  function handleInstitutionalCarouselScroll(carousel: HTMLDivElement) {
    const firstCard = carousel.querySelector('[data-institutional-card]') as HTMLElement | null;
    if (!firstCard) return;
    const styles = getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const step = cardWidth + gap;
    const totalUniqueCards = 6;
    const rawIndex = carousel.scrollLeft / step;
    const newIndex = Math.round(rawIndex) % totalUniqueCards;
    if (newIndex !== activeInstitutionalSlide) {
      setActiveInstitutionalSlide(newIndex);
    }
  }

  useEffect(() => {
    const section = institutionalCarouselSectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInstitutionalCarouselInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInstitutionalCarouselInView && !prevInstitutionalInView.current) {
      const carousel = institutionalCarouselRef.current;
      if (carousel) {
        carousel.scrollLeft = 0;
        setActiveInstitutionalSlide(0);
      }
    }
    prevInstitutionalInView.current = isInstitutionalCarouselInView;
  }, [isInstitutionalCarouselInView]);

  useEffect(() => {
    if (isInstitutionalCarouselPaused) return;
    if (!isInstitutionalCarouselInView) return;
    if (window.innerWidth < 1024) return;

    const interval = setInterval(() => {
      const carousel = institutionalCarouselRef.current;
      if (!carousel) return;

      const loopWidth = carousel.scrollWidth / 2;
      if (loopWidth > 0 && carousel.scrollLeft >= loopWidth) {
        carousel.scrollLeft -= loopWidth;
      }

      scrollInstitutionalCarousel('right');
    }, 5000);

    return () => clearInterval(interval);
  }, [isInstitutionalCarouselPaused, isInstitutionalCarouselInView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('Light bulb section intersecting:', entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsLightBulbAnimated(true);
        } else {
          setIsLightBulbAnimated(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-100px 0px -100px 0px',
      }
    );

    if (lightBulbSectionRef.current) {
      console.log('Observing light bulb section');
      observer.observe(lightBulbSectionRef.current);
    }

    return () => {
      if (lightBulbSectionRef.current) {
        observer.unobserve(lightBulbSectionRef.current);
      }
    };
  }, []);

  function navigateProject(dir: 'prev' | 'next') {
    setActiveProjectIndex((prev) => {
      if (dir === 'prev') return Math.max(0, prev - 1);
      return Math.min(projectsCarouselData.length - 1, prev + 1);
    });
  }

  function openProject(idx: number) {
    setActiveProjectIndex(idx);
    setShowProjectOverlay(true);
  }

  const activeProject = projectsCarouselData[activeProjectIndex] ?? projectsCarouselData[0];

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7FCFF] to-white">
      <Navbar />

      <div className="relative w-full">
        <div className="relative w-full overflow-hidden pb-[95px] sm:pb-[105px] md:pb-[120px] xl:pb-[130px] min-h-[760px] sm:min-h-[820px] md:min-h-[900px] lg:min-h-[940px] xl:min-h-[983px]">
          <Image
            src="/optimized/Frame 349083.png"
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 640px, (max-width: 1024px) 1200px, 1920px"
            className="object-cover object-center"
            aria-hidden="true"
          />

          <div
            className="absolute left-1/2 top-[95px] w-full max-w-[814px] -translate-x-1/2 px-4 sm:top-[115px] sm:px-6 md:top-[125px] md:px-8 lg:top-[150px] lg:px-10 xl:top-[185px] xl:px-0"
          >
            <div className="flex flex-col items-center gap-4 md:gap-6 xl:items-start xl:gap-[32px]">
              <div className="flex w-full flex-col items-center gap-4 md:gap-[24px] xl:items-start xl:gap-[32px]">
                <h1
                  className="about-hero-title eb_garamond_e16653e1-module__s6IC3q__className w-full max-w-[744px] text-center font-bold leading-[0.95] text-[#003300] text-[clamp(34px,9.5vw,64px)] xl:text-left"
                  style={{  color: '#003300' }}
                >
                  <span className="block sm:hidden">Conseil stratégique</span>
                  <span className="block sm:hidden">pour une performance</span>
                  <span className="block sm:hidden">durable</span>
                  <span className="hidden sm:block">Conseil stratégique pour</span>
                  <span className="hidden sm:block">une performance durable</span>
                </h1>
                <p
                  className="w-full max-w-[680px] text-center font-[Geist] text-[14px] font-normal leading-[1.45] sm:text-[15px] md:text-[16px] md:leading-[20px] xl:max-w-[618px] xl:text-left"
                  style={{ color: 'rgba(0, 51, 0, 0.7)' }}
                >
                  RNJ Advisory accompagne entrepreneurs, PME, ASBL, investisseurs et institutions en Belgique, en Europe et en Afrique pour structurer, sécuriser et accélérer leurs projets.
                </p>
              </div>

              <div className="relative flex w-full max-w-[560px] flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-[8px] xl:max-w-[473px] xl:justify-start">
                <Link
                  href="/contact"
                  className="group flex h-[52px] w-full max-w-[320px] items-center justify-center rounded-full bg-[#F7FCFF] transition-all duration-300 hover:bg-[#003300] sm:h-[56px] sm:w-auto sm:min-w-[220px] xl:h-[63px] xl:min-w-[229px]"
                  style={{ boxShadow: '2.10047px 4.20093px 22.6px rgba(0, 0, 0, 0.44)' }}
                >
                  <span
                    className="whitespace-nowrap text-center font-[Geist] font-semibold text-[#003300] text-[14px] leading-[16px] transition-colors duration-300 group-hover:text-white"
                  >
                    Découvrir nos services
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="group flex h-[52px] w-full max-w-[320px] items-center justify-center rounded-full bg-[#BBCB2E] shadow-lg transition-all duration-300 hover:bg-[#003300] sm:h-[56px] sm:w-auto sm:min-w-[232px] xl:h-[62px] xl:min-w-[228px]"
                  style={{
                    boxShadow: '2.10047px 4.20093px 22.6px rgba(0, 0, 0, 0.44)',
                  }}
                >
                  <span className="whitespace-nowrap text-center font-[Geist] text-[#003300] text-[14px] leading-[16px] font-bold tracking-[-0.02em] transition-colors duration-300 group-hover:text-[#BBCB2E]">
                    Contacter un conseiller
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative z-[1] mx-auto mt-[480px] w-full max-w-[1421px] px-4 sm:mt-[540px] sm:px-6 md:mt-[510px] lg:mt-[535px] xl:mt-[520px] xl:px-0">
            {/* Mobile: horizontal swipe (scroll-snap). md+: grid with fluid clamp sizes */}
            <div
              className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6 md:mx-0 md:grid md:w-full md:grid-cols-[1.95fr_0.9fr_1.2fr] md:items-stretch md:overflow-visible md:px-0 md:pb-0"
              style={{ gap: 'clamp(12px, 1.2vw, 20px)', ['--desktop-h' as string]: 'clamp(200px, 28vw, 284px)' }}
            >
              {/* Card 1 — image + text, flex-row always */}
              <article
                className="w-[85%] shrink-0 snap-center md:w-auto md:shrink md:snap-none md:h-[var(--desktop-h)]"
                style={{
                  borderRadius: 'clamp(20px, 3.5vw, 50px)',
                  padding: 'clamp(8px, 1vw, 14px)',
                  background: 'rgba(0, 0, 0, 0.15)',
                  boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.22)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex h-full items-center" style={{ gap: 'clamp(6px, 1.6vw, 32px)' }}>
                  <div
                    className="relative shrink-0 overflow-hidden"
                    style={{
                      width: 'clamp(120px, 18vw, 267px)',
                      height: 'clamp(120px, 18vw, 256px)',
                      borderRadius: 'clamp(14px, 2.5vw, 36px)',
                    }}
                  >
                    <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672106/rnj/group-527-v2-03944abc.webp"
                      alt="Quand la durabilité rencontre la stratégie"
                      fill
                      sizes="(min-width: 1487px) 267px, 18vw"
                      className="object-cover"
                      unoptimized
                      loading="eager"/>
                  </div>

                  <div className="flex flex-1 flex-col" style={{ width: 'clamp(100px, 23vw, 336px)', gap: 'clamp(4px, 0.9vw, 13px)' }}>
                    <h3 className="font-[Geist] font-medium text-white" style={{ fontSize: 'clamp(15px, 2.25vw, 32px)', lineHeight: 'clamp(17px, 2.4vw, 34px)' }}>
                      Quand la conformité devient un levier de croissance
                    </h3>
                    <p className="font-[Geist] font-medium text-white/60" style={{ fontSize: 'clamp(11px, 1.15vw, 16px)', lineHeight: 'clamp(14px, 1.4vw, 20px)' }}>
                      Nous transformons vos contraintes juridiques et réglementaires en décisions claires et actionnables.
                    </p>
                    <Link
                      href="/services"
                      className="w-fit font-[Geist] font-medium text-white underline underline-offset-4 transition-opacity hover:opacity-80"
                      style={{ fontSize: 'clamp(12px, 1.4vw, 20px)', lineHeight: 'clamp(14px, 1.5vw, 20px)' }}
                    >
                      Découvrez nos projets
                    </Link>
                  </div>
                </div>
              </article>

              {/* Card 2 — stats with avatar circles */}
              <article
                className="flex w-[85%] shrink-0 snap-center flex-col items-center justify-center md:w-auto md:shrink md:snap-none md:h-[var(--desktop-h)]"
                style={{
                  borderRadius: 'clamp(18px, 3.5vw, 50px)',
                  padding: 'clamp(14px, 2.5vw, 45px) clamp(14px, 3vw, 48px)',
                  background: 'rgba(0, 0, 0, 0.15)',
                  boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.22)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div
                  className="relative"
                  style={{
                    width: 'clamp(100px, 13vw, 182px)',
                    height: 'clamp(44px, 5.4vw, 76px)',
                    marginBottom: 'clamp(10px, 1.6vw, 28px)',
                  }}
                >
                  {[
                    { src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672107/rnj/openai-jake-stangel-1-c442a239.webp', alt: 'Customer 1', left: '0' },
                    { src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672107/rnj/businesswoman-explaining-esg-strategy-during-meeti-2026-01-08-08-14-47-utc-1-a731531a.webp', alt: 'Customer 2', left: 'clamp(28px, 3.7vw, 53px)' },
                    { src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672108/rnj/that-makes-it-official-cropped-shot-of-two-uniden-2026-01-09-09-21-38-utc-1-72edb5b8.webp', alt: 'Customer 3', left: 'clamp(56px, 7.5vw, 106px)' },
                  ].map((c) => (
                    <div
                      key={c.alt}
                      className="absolute top-0 overflow-hidden rounded-full border border-white/30"
                      style={{
                        left: c.left,
                        width: 'clamp(44px, 5.4vw, 76px)',
                        height: 'clamp(44px, 5.4vw, 76px)',
                      }}
                    >
                      <Image src={c.src} alt={c.alt} fill className="object-cover" unoptimized />
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="font-[Geist] font-medium text-white/70" style={{ fontSize: 'clamp(11px, 1.7vw, 24px)', lineHeight: 1.1 }}>
                    <span className="block">Des partenaires</span>
                    <span className="block">qui nous font confiance</span>
                  </p>
                </div>
              </article>

              {/* Card 3 — headline + paragraph */}
              <article
                className="flex w-[85%] shrink-0 snap-center flex-col justify-center md:w-auto md:shrink md:snap-none md:h-[var(--desktop-h)]"
                style={{
                  borderRadius: 'clamp(18px, 3.5vw, 50px)',
                  padding: 'clamp(14px, 2vw, 40px) clamp(16px, 2.5vw, 40px)',
                  background: 'rgba(0, 0, 0, 0.15)',
                  boxShadow: '0px 4px 18px rgba(0, 0, 0, 0.22)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex max-w-[336px] flex-col" style={{ gap: 'clamp(4px, 0.9vw, 13px)' }}>
                    <h3 className="font-[Geist] font-medium text-white" style={{ fontSize: 'clamp(15px, 2.25vw, 32px)', lineHeight: 'clamp(17px, 2.4vw, 34px)' }}>
                      Un parcours solide de plus que 30 ans
                    </h3>
                    <p className="font-[Geist] font-medium text-white/60" style={{ fontSize: 'clamp(11px, 1.15vw, 16px)', lineHeight: 'clamp(14px, 1.4vw, 20px)' }}>
                      Nous transformons la complexité réglementaire en plan d&apos;action concret.
                    </p>
                </div>
              </article>
            </div>
          </div>

          <section className="absolute inset-x-0 bottom-0 z-[2] w-full border-t border-white/40 bg-white/10 py-3 backdrop-blur-sm sm:py-3 md:py-4">
            <div className="w-full px-0">
              <div className="relative min-h-[64px] overflow-hidden sm:min-h-[72px] md:min-h-[82px] lg:min-h-[92px]">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[clamp(24px,6vw,80px)] bg-gradient-to-r from-white/15 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[clamp(24px,6vw,80px)] bg-gradient-to-l from-white/15 to-transparent" />

                {/* Anchored to the left edge, not centered: a centered track
                    would slide its right edge into view mid-animation and
                    leave the right half of the band empty at the loop wrap. */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                  <div
                    className="flex w-max items-center"
                    style={{
                      animation: 'scroll 26s linear infinite',
                      willChange: 'transform',
                    }}
                  >
                    {[...partnerAssetLogos, ...partnerAssetLogos].map((logo, index) => (
                      <div
                        key={`partner-asset-logo-home-${index}-${logo}`}
                        className="relative h-[clamp(38px,5.6vw,66px)] w-[clamp(128px,17.5vw,228px)] shrink-0 opacity-90 mr-[clamp(18px,3.2vw,52px)]"
                      >
                        <Image
                          src={logo}
                          alt={`Logo partenaire ${index % partnerAssetLogos.length + 1}`}
                          fill
                          className="object-contain [filter:brightness(0)_saturate(100%)_invert(100%)]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="relative w-full overflow-hidden bg-[#F7FCFF] py-8 sm:py-10 md:py-12 lg:min-h-[782px] lg:py-16">
          <div className="relative z-[2] mx-auto flex w-full max-w-[1395px] flex-col items-center gap-6 px-4 sm:gap-8 md:gap-10 lg:gap-[60px]">
            <div className="flex min-h-[48px] w-full max-w-[1391.5px] flex-wrap items-center justify-between gap-2 sm:min-h-[54px] sm:gap-3 md:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="h-[8px] w-[8px] rounded-full bg-[#003300] sm:h-[9px] sm:w-[9px] md:h-[10px] md:w-[10px]" />
                <span className="font-[Geist] text-[14px] font-bold leading-[1.05] text-[#003300] sm:text-[18px] md:text-[20px] lg:text-[23.6828px] lg:leading-[25px]">
                  Services
                </span>
              </div>

              <Link
                href="/contact"
                className="contact-btn inline-flex h-[42px] items-center justify-center rounded-[150px] bg-[#BBCB2E] px-5 font-[Geist] text-[14px] font-bold leading-[1.05] text-[#003300] sm:h-[48px] sm:px-7 sm:text-[16px] md:h-[54px] md:px-9 md:text-[20px] lg:h-[58px] lg:px-[43px] lg:text-[23.6828px] lg:leading-[25px]"
              >
                Contact
              </Link>
            </div>

            <div className="flex w-full max-w-[1395px] flex-col items-center gap-4 text-center sm:gap-6 md:gap-8 lg:gap-[48px]">
              <h2 className="font-[EB_Garamond] text-[36px] font-bold leading-[0.92] text-[#003300] sm:text-[48px] md:text-[60px] lg:text-[76px] xl:text-[100px] xl:leading-[80px]">
                Nos Services
              </h2>

              <p className="max-w-[753px] px-2 font-[Geist] text-[13px] font-normal leading-[1.4] text-[#003300]/50 sm:text-[15px] sm:leading-[1.35] md:text-[17px] lg:text-[20px] lg:leading-[24px]">
                Nous accompagnons les organisations qui veulent décider plus vite,
                rester conformes et déployer leurs projets avec impact, en
                Belgique et à l&apos;international.
              </p>
            </div>

            <div className="flex w-full max-w-[1065.41px] flex-col items-center gap-4 sm:gap-5 md:gap-6 lg:gap-[9px]">
              <div className="relative h-[38px] w-full max-w-[768px] rounded-full bg-transparent sm:h-[42px] md:h-[46px]">
                <div className="absolute left-[16px] right-[16px] top-1/2 h-[12px] -translate-y-1/2 rounded-full bg-[#D9D9D9] sm:left-[20px] sm:right-[20px] sm:h-[14px] md:left-[24.5px] md:right-[24.5px] md:h-[17px]">
                  <div
                    className="h-full rounded-full bg-[#BBCB2E] transition-all duration-500 ease-out"
                    style={{ width: `${servicesFocusLineFill}%` }}
                  />
                </div>

                {[1, 2, 3].map((step, index) => {
                  const isStepActive = servicesFocusActiveCount >= step;
                  const positionClass =
                    index === 0 ? 'left-0' : index === 1 ? 'left-1/2 -translate-x-1/2' : 'right-0';

                  return (
                    <div
                      key={step}
                      className={`absolute top-0 flex h-[38px] w-[38px] items-center justify-center rounded-full transition-colors duration-500 sm:h-[42px] sm:w-[42px] md:h-[46px] md:w-[46px] ${positionClass} ${
                        isStepActive ? 'bg-[#BBCB2E]' : 'bg-[#D9D9D9]'
                      }`}
                    >
                      <span
                        className={`font-[Geist] text-[16px] font-medium leading-[16px] text-[#003300] transition-opacity duration-500 sm:text-[18px] sm:leading-[18px] md:text-[22.2147px] md:leading-[22px] ${
                          isStepActive ? 'opacity-100' : 'opacity-40'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex w-full flex-nowrap items-stretch gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 md:gap-5 xl:gap-[14.7px]">
                {servicesFocusCards.map((card, index) => {
                  const isCardActive = servicesFocusActiveCount > index;

                  return (
                    <article
                      key={card.title}
                      className={`relative isolate flex h-[280px] w-[min(88vw,300px)] shrink-0 flex-col items-center px-5 pt-10 transition-all duration-500 ease-out sm:h-[310px] sm:w-[min(68vw,330px)] sm:px-6 sm:pt-12 md:h-[328px] md:w-[min(52vw,346px)] md:px-[24px] md:pt-[48px] lg:w-[345px] lg:px-[30.1322px] lg:pt-[57.9046px] ${
                        isCardActive
                          ? 'opacity-100 [filter:drop-shadow(0px_4px_23.1px_rgba(0,0,0,0.08))]'
                          : 'opacity-30'
                      }`}
                    >
                      <div className="pointer-events-none absolute left-0 top-[28px] h-[220px] w-full rounded-[32px] bg-[#DDE597] sm:top-[30px] sm:h-[245px] sm:rounded-[36px] md:top-[33px] md:h-[262px] md:rounded-[38.6311px]" />

                      <div className="relative z-[1] flex w-full max-w-[284.88px] flex-col items-center gap-6 sm:gap-7 md:gap-[35.54px]">
                        <Image
                          src={card.icon}
                          alt={card.title}
                          width={card.iconWidth}
                          height={card.iconHeight}
                          className="h-auto w-auto"
                        />

                        <div className="flex w-full flex-col items-center gap-2 sm:gap-2.5 md:gap-[13.13px]">
                          <h3 className="w-full text-center font-[Geist] text-[17px] font-extrabold leading-[1.15] text-[#003300] sm:text-[19px] md:text-[22.2147px] md:leading-[22px]">
                            {card.title}
                          </h3>

                          <p className="w-full text-center font-[Geist] text-[14px] font-medium leading-[1.25] text-[#003300]/50 sm:text-[15px] md:text-[17.41px] md:leading-[18px]">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <section className="relative w-full overflow-hidden bg-[#181818] py-10 sm:py-12 md:py-14 lg:py-16 xl:py-[62px]">
          <div className="relative z-[1] mx-auto flex w-full max-w-[1580px] flex-col items-center content-center px-4 sm:px-6 md:px-8 lg:px-8 xl:px-[70px]">
            <div className="flex w-full flex-col gap-8 lg:gap-10 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(380px,464.65px)] xl:items-start xl:gap-[56px]">
              <div className="flex w-full max-w-[779px] flex-col items-center gap-8 text-center lg:items-start lg:gap-10 lg:text-left xl:gap-[66px]">
                <div className="relative h-[30px] w-[225px]">
                  <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779673027/rnj/group-1-23b4740e.png"
                    alt="RNJ Advisory"
                    fill
                    className="object-contain object-center lg:object-left"
                   loading="lazy"/>
                </div>

                <div className="flex w-full max-w-[783.11px] flex-col gap-7 lg:gap-9 xl:gap-[43.92px]">
                  <div className="w-full max-w-[783.11px] flex-none grow-0">
                    <Image
                      src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779673803/rnj/optimized/concretisez-vos-idees-title.svg"
                      alt="Concrétisez vos idées avec un cabinet de conseils juridiques & stratégiques à Bruxelles"
                      width={730}
                      height={171}
                      className="w-full h-auto"
                      priority
                    />
                  </div>

                  <p className="mx-auto w-full max-w-[567px] font-[Geist] text-[14px] font-medium leading-[1.35] text-white/70 sm:text-[15px] md:text-[16px] md:leading-[1.25] lg:mx-0">
                    Basé à Bruxelles, au cœur des institutions européennes, RNJ Advisory combine expertise juridique, vision stratégique et exécution opérationnelle pour accompagner vos projets de bout en bout.
                  </p>
                </div>

                <div className="flex w-full max-w-[640px] flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-[9.15px] lg:max-w-none lg:justify-start">
                  <Link
                    href="/a-propos"
                    className="inline-flex h-[52px] w-full max-w-[360px] items-center justify-center rounded-[8.23702px] border border-white px-8 font-[Geist] text-[15px] font-semibold leading-[1.1] text-white sm:h-[58px] sm:w-auto sm:min-w-[160px] sm:max-w-none sm:px-5 sm:text-[17px] md:h-[62px] md:text-[18px]"
                  >
                    À propos
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex h-[52px] w-full max-w-[360px] items-center justify-center rounded-[8.23702px] bg-white px-8 font-[Geist] text-[15px] font-semibold leading-[1.1] text-[#181818] sm:h-[58px] sm:w-auto sm:min-w-[240px] sm:max-w-none sm:px-5 sm:text-[17px] md:h-[62px] md:min-w-[280px] md:text-[18px]"
                  >
                    Demander une consultation
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto h-[180px] w-full max-w-[280px] sm:h-[300px] sm:max-w-[380px] md:h-[360px] md:max-w-[430px] lg:h-[420px] lg:max-w-[464.65px] xl:mx-0 xl:ml-auto xl:h-[529.93px] xl:w-full xl:max-w-[464.65px]">
                <img
                  src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779673027/rnj/mask-group-39-06a5eb07.png"
                  alt="Partenaires en réunion"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:mt-12 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:mt-[88px] xl:gap-[40px]">
              {strategicTrustCards.map((card) => (
                <article
                  key={card.title}
                  className="flex min-h-[190px] flex-col items-center justify-center bg-white px-6 py-8 text-center md:min-h-[220px] md:px-8 xl:h-[237px]"
                >
                  <h3 className="font-[Geist] text-[24px] font-semibold leading-[1.06] tracking-[-0.03em] text-[#181818] sm:text-[28px] xl:text-[32px] xl:leading-[34px]">
                    {card.title}
                  </h3>
                  <p className="mt-4 max-w-[291px] font-[Geist] text-[14px] font-medium leading-[1.26] tracking-[-0.03em] text-black xl:text-[15px] xl:leading-[19px]">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-0 w-full bg-[#eff1ce] py-10 sm:py-12 md:py-14 lg:py-16">
          

          <div aria-hidden="true" className="h-12 lg:h-16 xl:h-20" />

          {/* Section Light bulb */}
          <div ref={lightBulbSectionRef} className="mx-auto mt-10 flex w-full max-w-[1392px] flex-col items-center gap-5 px-4 pb-8 text-center sm:px-6 md:px-8 lg:mt-16 lg:gap-[20px] lg:px-0 lg:pb-[46px] xl:mt-20">
            <div className={`relative h-[110px] w-[70px] ${isLightBulbAnimated ? 'lightbulb-scroll-active' : ''}`} style={{ marginBottom: '10px' }}>
              <div className={`lightbulb-lines absolute left-0 -top-20 h-full w-full transition-opacity duration-300 ${isLightBulbAnimated ? 'opacity-100' : 'opacity-0'}`}>
                <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779673195/rnj/group-349075-a2bbf73f.svg"
                  alt="Light bulb lines"
                  fill
                  className="object-contain"
                  unoptimized
                 loading="lazy"/>
              </div>
              <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779673194/rnj/layer-1-2-1d375d74.png"
                alt="Light bulb icon"
                fill
                sizes="120px"
                className="object-contain"
               loading="lazy"/>
            </div>

            <h3
              className="max-w-[1006.97px] font-[EB_Garamond] text-[#003300] text-[42px] font-medium leading-[1.02] sm:text-[50px] md:text-[56px] lg:text-[64px] lg:leading-[58px]"
              style={{ transform: 'rotate(0.1deg)' }}
            >
              Des solutions juridiques adaptées à chaque étape
            </h3>

            <p
              className="max-w-[1215.08px] font-[Geist] text-[18px] font-medium leading-[20px] text-[#003300]/50 lg:text-[20px]"
              style={{ transform: 'rotate(0.1deg)' }}
            >
              Un accompagnement structuré pour sécuriser vos projets en Belgique et accélérer votre croissance.
            </p>
          </div>

          {/* Section masquée - Analyse Institutionnelle & Réglementaire */}
          {false && (
          <div className="mx-auto mt-10 mb-4 flex w-full max-w-[1392px] flex-col items-center gap-10 px-4 sm:px-6 md:px-8 lg:mt-14 lg:mb-6 xl:mt-16 xl:mb-8 xl:flex-row xl:items-center xl:justify-between xl:gap-8 xl:px-0">
            <div className="flex w-full max-w-[988px] flex-col items-center gap-10 text-center xl:items-start xl:gap-[94px] xl:text-left">
              <div className="flex items-center gap-[13px]">
                <span className="h-[11.81px] w-[11.81px] rounded-full bg-[#003300]" />
                <h3 className="font-[Geist] text-[22px] font-bold leading-[1.06] text-[#003300] sm:text-[24px] lg:text-[27.9642px] lg:leading-[30px]">
                  Études &amp; Analyse Réglementaire
                </h3>
              </div>

              <div className="flex w-full max-w-[987.89px] flex-col items-center gap-10 xl:items-start xl:gap-[102px]">
                <div className="flex w-full max-w-[773.41px] flex-col items-center gap-7 xl:items-start xl:gap-[41.6px]">
                  <h2 className="font-[EB_Garamond] text-[32px] font-semibold leading-[0.95] tracking-[-0.02em] text-[#003300] sm:text-[40px] md:text-[50px] lg:text-[58px] lg:leading-[50px] xl:text-[68px] xl:leading-[56px]">
                    Analyse Institutionnelle &amp; Réglementaire
                  </h2>

                  <p className="max-w-[655px] font-[Geist] text-[15px] font-medium leading-[1.25] text-[#003300]/80 sm:text-[17px] md:text-[19px] lg:text-[20.9988px] lg:leading-[23px]">
                    RNJ Advisory vous accompagne dans l&apos;analyse approfondie des
                    environnements institutionnels, juridiques et réglementaires
                    afin de sécuriser vos décisions stratégiques.
                  </p>
                </div>

                <div className="flex w-full max-w-[634.22px] flex-col gap-3 sm:flex-row sm:items-start sm:justify-center sm:gap-[12.4px] xl:justify-start">
                  <Link
                    href="/a-propos"
                    className="inline-flex h-[68px] w-full items-center justify-center rounded-[82.6547px] border-[2.48019px] border-[#003300] px-8 font-[Geist] text-[18px] font-semibold leading-[25px] text-[#003300] sm:h-[84.49px] sm:w-auto sm:min-w-[250px] sm:px-10 xl:text-[25.1616px]"
                  >
                    En savoir plus
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex h-[68px] w-full items-center justify-center rounded-[141.694px] bg-[#003300] px-6 font-[Geist] text-[18px] font-semibold leading-[25px] text-[#F7FCFF] sm:h-[83.04px] sm:w-auto sm:min-w-[340px] sm:px-8 xl:text-[25.1616px]"
                  >
                    Demander une analyse
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-[380px] sm:max-w-[480px] md:max-w-[540px] xl:w-[580px] xl:max-w-none">
              <div className="relative h-[390px] w-full sm:h-[500px] md:h-[560px] xl:h-[566.12px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:good,w_800,h_600,c_limit/v1779672109/rnj/optimized/frame-559.webp"
                  alt="Illustration Analyse Réglementaire"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain object-center"
                />
              </div>
            </div>
          </div>
          )}
        </section>

        <section className="w-full bg-[#eff1ce] pb-10 pt-2 md:pb-12 md:pt-4 lg:pb-14">
          <div className="mx-auto w-full max-w-[1680px] px-0">
            <div className="relative min-h-[560px] overflow-hidden bg-[#003300] sm:min-h-[620px] md:min-h-[680px] lg:min-h-[760px]">
              <Image
                src="/optimized/entreprise.svg"
                alt=""
                fill
                className="object-cover object-center"
                unoptimized
                loading="lazy"
              />

              <div className="relative z-[1] mx-auto flex h-full w-full max-w-[1392px] flex-col gap-10 px-4 py-8 sm:gap-12 md:px-6 md:py-12 lg:justify-between lg:gap-16 lg:px-[20px] lg:py-[80px]">
                <div className="flex w-full flex-row items-center justify-between gap-3 sm:gap-5">
                  <div className="flex min-w-0 items-center gap-[8px] sm:gap-[12px]">
                    <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-white sm:h-[10px] sm:w-[10px]" />
                    <span
                      className="truncate font-[Geist] font-bold text-white"
                      style={{ fontSize: 'clamp(14px, 3.5vw, 23.3613px)', lineHeight: 1.1 }}
                    >
                      Entrepreneuriat
                    </span>
                  </div>

                  <Link
                    href="/contact"
                    className="contact-btn inline-flex h-[38px] w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#BBCB2E] px-[14px] font-[Geist] font-semibold text-[#003300] transition-colors hover:bg-[#D4E175] sm:h-[50px] sm:px-[32px] lg:px-[38px]"
                    style={{ fontSize: 'clamp(12px, 2.5vw, 22.5px)', lineHeight: 1 }}
                  >
                    Contact
                  </Link>
                </div>

                <div className="flex flex-col items-center gap-10 sm:gap-12 lg:flex-row lg:items-end lg:justify-between">
                  <div className="flex w-full max-w-[920px] flex-col gap-8 text-center sm:gap-10 lg:text-left">
                    <h2
                      className="font-[EB_Garamond] font-medium text-white"
                      style={{
                        fontSize: 'clamp(28px, 6.5vw, 72px)',
                        lineHeight: 'clamp(30px, 6.2vw, 68px)',
                        textTransform: 'capitalize',
                      }}
                    >
                      de la création d&apos;entreprise à l&apos;accélération
                    </h2> 
                    <p
                      className="mx-auto max-w-[520px] font-[Geist] font-semibold text-white/50 lg:mx-0"
                      style={{ fontSize: 'clamp(13px, 2.5vw, 16px)', lineHeight: 1.25 }}
                    >
                      Nous analysons votre environnement institutionnel et réglementaire pour sécuriser vos décisions et garantir la conformité de vos projets.
                    </p>

                  
                  </div>

                  <div className="w-full max-w-[280px] self-center sm:max-w-[320px] lg:ml-auto lg:w-fit lg:max-w-none lg:self-end">
                    <Image
                      src="/optimized/image.svg"
                      alt=""
                      width={238}
                      height={294}
                      loading="lazy"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EntrepreneuriatTabsSection />

        <section
              className="w-full bg-[#F7FCFF] py-16 md:py-24"
              style={{
                paddingBottom: 0,
              }}
            >
          <div className="mx-auto flex w-full max-w-[1513px] flex-col items-center gap-0 md:gap-[0px] px-4">
            <div className="relative w-full max-w-[1392px]">
              <div className="flex flex-col gap-8 md:gap-[90px]">
                <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
                  <div className="flex items-center gap-3">
                    <span className="h-[8px] w-[8px] md:h-[10px] md:w-[10px] rounded-full bg-[#003300]" />
                    <span className="font-[Geist] font-bold text-[#003300] text-[16px] md:text-[24px]">
                      Entrepreneuriat
                    </span>
                  </div>

                  <button
                    type="button"
                    className="contact-btn rounded-full bg-[#BBCB2E] px-6 md:px-[43px] py-3 md:py-4 font-[Geist] font-bold text-[#003300] text-[16px] md:text-[24px]"
                  >
                    Contact
                  </button>
                </div>

                <div className="flex flex-col items-center gap-6 md:gap-[41px] text-center">
                  <h2 className="max-w-[95%] sm:max-w-[90%] md:max-w-[824px] font-[EB_Garamond] font-extrabold text-[#003300] text-[28px] sm:text-[36px] md:text-[56px] lg:text-[80px] leading-[1.1] md:leading-[0.95]">
                    Indépendants et porteurs de projet
                  </h2>

                  <p className="max-w-[95%] sm:max-w-[92%] md:max-w-[998px] font-[Geist] font-medium text-[#003300] text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] leading-[1.5] md:leading-[1.4] opacity-50">
                    Vous êtes indépendant ou vous lancez votre activité ? Nous vous accompagnons pour transformer votre idée en projet conforme, finançable et prêt à se développer durablement.
                  </p>
                </div>

                <div className="mx-auto grid w-full max-w-[1120px] grid-cols-2 justify-items-center gap-x-4 gap-y-6 sm:gap-x-6 md:gap-x-[28px] md:gap-y-8 lg:gap-x-[32px] xl:grid-cols-4 xl:gap-x-[40px]">
                  {entrepreneurshipCards.map((card) => (
                    <div
                      key={card.title}
                      className="group flex min-h-[188px] h-auto md:h-[281px] w-full max-w-[170px] sm:max-w-[180px] md:max-w-[220px] xl:max-w-[217px] cursor-pointer flex-col items-center text-center"
                      onTouchStart={(e) => {
                        const element = e.currentTarget;
                        if (element && element.classList) {
                          element.classList.add('touch-active');
                          setTimeout(() => {
                            if (element && element.classList) {
                              element.classList.remove('touch-active');
                            }
                          }, 150);
                        }
                      }}
                    >
                      <div
                        className="relative h-[110px] w-[110px] sm:h-[120px] sm:w-[120px] md:h-[190px] md:w-[190px] lg:h-[204px] lg:w-[204px] xl:h-[217px] xl:w-[217px] rounded-[22px] md:rounded-[34px] xl:rounded-[40px] border-[3px] md:border-[4px] border-transparent bg-[rgba(187,203,46,0.5)] transition-all duration-300 ease-out group-hover:border-[#D1D98B] group-hover:bg-[#003300] group-active:border-[#D1D98B] group-active:bg-[#003300] touch-active:border-[#D1D98B] touch-active:bg-[#003300]"
                      >
                        <div
                          className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 h-[36px] w-[36px] sm:h-[40px] sm:w-[40px] md:h-[54px] md:w-[54px] xl:h-[60px] xl:w-[60px]"
                        >
                          <Image
                            src={card.icon}
                            alt={card.title}
                            fill
                            className="object-contain transition-all duration-300 ease-out group-hover:[filter:brightness(0)_saturate(100%)_invert(85%)_sepia(20%)_saturate(509%)_hue-rotate(30deg)_brightness(95%)_contrast(88%)] group-active:[filter:brightness(0)_saturate(100%)_invert(85%)_sepia(20%)_saturate(509%)_hue-rotate(30deg)_brightness(95%)_contrast(88%)] touch-active:[filter:brightness(0)_saturate(100%)_invert(85%)_sepia(20%)_saturate(509%)_hue-rotate(30deg)_brightness(95%)_contrast(88%)]"
                          />
                        </div>
                      </div>

                      <p className="mt-3 md:mt-5 xl:mt-6 max-w-[145px] sm:max-w-[150px] md:max-w-[176px] font-[Geist] font-semibold text-[#003300] text-[13px] sm:text-[14px] md:text-[18px] xl:text-[20px] leading-[1.25]">
                        {card.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section Accélération PME & ASBL */}
            <article
              className="relative my-16 w-screen max-w-none overflow-hidden bg-[#003300] md:my-20"
              style={{
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
                boxShadow: '2.01px 4.02px 28.45px rgba(0, 0, 0, 0.17)',
              }}
            >
              {/* Mobile: stack vertical | md+: side by side 50/50 */}
              <div className="flex min-h-[420px] flex-col md:flex-row md:h-[70vh]">

                {/* LEFT — image, order 2 on mobile (below text), order 1 on desktop */}
                <div className="relative order-2 h-[280px] w-full flex-shrink-0 overflow-hidden sm:h-[360px] md:order-1 md:h-full md:w-1/2">
                  <Image
                    src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779671275/rnj/optimized/mask-group-44-3cbc4b7d.svg"
                    alt="Accélération PME et ASBL"
                    fill
                    className="object-cover object-center"
                    loading="lazy"
                  />
                </div>

                {/* RIGHT — content, order 1 on mobile (above image), order 2 on desktop */}
                <div className="order-1 flex w-full flex-col gap-6 px-5 py-8 sm:gap-7 sm:px-8 sm:py-10 md:order-2 md:w-1/2 md:gap-8 md:px-10 md:py-12 xl:px-[60px] xl:py-[56px]">

                  {/* Tag */}
                  <div className="flex items-center gap-2.5">
                    <span className="h-[8px] w-[8px] flex-shrink-0 rounded-full bg-[#BFCCBF] md:h-[9.33px] md:w-[9.33px]" />
                    <span className="font-[Geist] text-[16px] font-semibold leading-[1.2] text-[#BFCCBF] md:text-[20px]">
                      Entrepreneuriat
                    </span>
                  </div>

                  {/* Middle — title + paragraphs */}
                  <div className="flex flex-col gap-5 xl:max-w-[552px]">
                    <h3 className="font-[EB_Garamond] text-[clamp(28px,7vw,64px)] font-semibold capitalize leading-[0.95] text-[#BFCCBF] md:leading-[0.94] xl:leading-[56px]">
                      accélération PME &amp;<br />ASBL recrutement<br />international
                    </h3>

                    <div className="flex flex-col gap-3 xl:max-w-[437px]">
                      <div className="rounded-[4px] px-[11px] py-[6px]">
                        <p className="font-[Geist] text-[14px] font-semibold leading-[1.6] text-[#BBCB2E] md:text-[16px]">
                          Vous êtes une PME ou une ASBL en croissance ?
                        </p>
                        <p className="font-[Geist] text-[14px] font-semibold leading-[1.6] text-[#BBCB2E] md:text-[16px]">
                          Vous souhaitez recruter des talents hors UE ?
                        </p>
                      </div>
                      <p className="font-[Geist] text-[13px] font-medium leading-[1.35] text-[#BFCCBF]/70 md:text-[16px] md:leading-[19px]">
                        Nous sécurisons vos recrutements internationaux pour vous concentrer sur votre développement.
                      </p>
                    </div>
                  </div>

                  {/* Buttons — pushed down with mt-auto on desktop, natural flow on mobile */}
                  <div className="mt-2 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-[9.8px] md:mt-auto">
                    <Link
                      href="/a-propos"
                      className="flex h-[52px] w-full items-center justify-center whitespace-nowrap rounded-full border-[1.97px] border-[#BFCCBF] px-6 font-[Geist] text-[15px] font-semibold leading-[20px] text-[#BFCCBF] transition-colors hover:bg-[#BFCCBF] hover:text-[#003300] sm:h-[56px] sm:w-auto sm:min-w-[146px] sm:px-8 sm:text-[16px] md:h-[67px]"
                    >
                      À propos
                    </Link>
                    <Link
                      href="/contact"
                      className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#BBCB2E] px-5 font-[Geist] text-[15px] font-semibold leading-[20px] text-[#003300] transition-colors hover:bg-[#D4E175] sm:h-[56px] sm:w-auto sm:min-w-[220px] sm:px-6 sm:text-[16px] md:h-[67px] md:min-w-[280px] lg:min-w-[331px]"
                    >
                      Planifier un entretien confidentiel
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Section Pourquoi choisir RNJ Advisory */}
            <section
              className="relative my-4 w-screen max-w-none bg-[#F7FCFF] py-8 sm:my-5 sm:py-9 md:my-6 md:py-10 lg:my-8 lg:py-14"
              style={{
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
              }}
            >
              <div className="w-full px-4">
                <div className="mb-[3.02px] flex flex-col gap-2 pl-4 sm:gap-2.5 sm:pl-8 md:gap-3 md:pl-12 lg:pl-16 xl:pl-20">
                  <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
                    <span className="h-[8px] w-[8px] rounded-full bg-[#003300] sm:h-[9px] sm:w-[9px] md:h-[10px] md:w-[10px]" />
                    <span className="font-[Geist] text-[15px] font-bold leading-[1.05] text-[#003300] sm:text-[17px] md:text-[20px] lg:text-[22px] xl:text-[23.6828px] xl:leading-[25px]">
                      Pourquoi choisir RNJ Advisory ?
                    </span>
                  </div>

                  <p className="font-[Geist] text-[14px] font-bold leading-[1.2] text-[#003300]/65 sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[20px] xl:leading-[18px]">
                    Une expertise rigoureuse au service de vos décisions
                  </p>
                </div>

                <div className="relative h-[340px] overflow-hidden py-5 sm:h-[380px] sm:py-6 md:h-[420px] md:py-7 lg:h-[480px] lg:py-8 xl:h-[512px]">
                  <div className="relative z-[1] h-full overflow-hidden">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2">
                      <div
                        className="flex w-max items-center gap-5"
                        style={{
                          animation: 'scroll 22s linear infinite',
                          willChange: 'transform',
                        }}
                      >
                        {[...whyChooseAnimatedCards, ...whyChooseAnimatedCards].map(
                          (card, index) => (
                            <article
                              key={`why-choose-desktop-${card.title}-${index}`}
                              className="flex h-[220px] w-[230px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-[8px] px-3 text-center transition-all duration-300 sm:h-[250px] sm:w-[260px] sm:rounded-[9px] sm:px-4 md:h-[270px] md:w-[280px] md:rounded-[10px] lg:h-[290px] lg:w-[300px] lg:px-5 xl:h-[304px] xl:w-[308.02px]"
                              style={{
                                background:
                                  hoveredScrollCardIndex === index
                                    ? whyChooseCardActiveBackground
                                    : '#D4E175',
                                border:
                                  hoveredScrollCardIndex === index
                                    ? `2px solid ${whyChooseCardActiveBorder}`
                                    : '2px solid transparent',
                                boxShadow:
                                  hoveredScrollCardIndex === index
                                    ? '0px 8px 26px rgba(0, 0, 0, 0.18)'
                                    : '0px 4px 22.4px rgba(0, 0, 0, 0.19)',
                                transform:
                                  hoveredScrollCardIndex === index
                                    ? 'translateY(-2px)'
                                    : 'translateY(0)',
                              }}
                              onMouseEnter={() => setHoveredScrollCardIndex(index)}
                              onMouseLeave={() => setHoveredScrollCardIndex(null)}
                              onTouchStart={() => setHoveredScrollCardIndex(index)}
                              onTouchEnd={() => {
                                setTimeout(() => {
                                  setHoveredScrollCardIndex(null);
                                }, 220);
                              }}
                            >
                              {!card.hideIcon && (
                                <div
                                  className="relative mb-3 sm:mb-4 md:mb-5"
                                  style={{
                                    width: `${Math.max(32, card.iconWidth * 0.65)}px`,
                                    height: `${Math.max(32, card.iconHeight * 0.65)}px`,
                                  }}
                                >
                                  <Image
                                    src={card.icon}
                                    alt={card.title}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              )}

                              <h3 className="mb-2 max-w-[303px] font-[EB_Garamond] text-[20px] font-bold leading-[1.08] text-[#003300] sm:mb-2.5 sm:text-[24px] sm:leading-[1.05] md:mb-3 md:text-[27px] md:leading-[1.02] lg:text-[30px] lg:leading-[24px] xl:text-[32px] xl:leading-[27px]">
                                {card.title}
                              </h3>

                              <p className="max-w-[262px] font-[Geist] text-[12px] font-medium leading-[1.15] text-[#003300]/50 sm:text-[13px] sm:leading-[1.12] md:text-[14px] md:leading-[1.1] lg:text-[15px] xl:text-[16px] xl:leading-[16px]">
                                {card.description}
                              </p>
                            </article>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {showStrategicPopup && (
              <div
                className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-4 py-6"
                onClick={closeStrategicPopup}
              >
                <div
                  className="relative flex max-h-[90vh] w-full max-w-[1323px] flex-col overflow-hidden rounded-[32px] bg-black/35 shadow-[0px_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-[16px] md:rounded-[60px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    aria-label="Fermer"
                    className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-white md:right-7 md:top-7"
                    onClick={closeStrategicPopup}
                  >
                    <X size={28} strokeWidth={2.6} />
                  </button>

                  <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6 sm:px-7 md:px-10 md:py-10 lg:px-14 lg:py-12">
                    <div className="relative mb-8 h-[36px] w-[92px] md:mb-12 md:h-[52px] md:w-[132px]">
                      <Image src="/optimized/minimal horizontal logo white 1.png"
                        alt="RNJ Advisory"
                        fill
                        className="object-contain object-left"
                       priority/>
                    </div>

                    <div className="max-w-[1139px]">
                      <h2 className="mb-6 font-[Geist] font-normal text-white text-[40px] leading-[0.98] sm:text-[56px] md:mb-8 md:text-[88px] md:leading-[0.98] lg:text-[128px]">
                        Interconnexion électrique Tunisie-Italie
                      </h2>

                      <div className="flex flex-col gap-9 lg:gap-[46px]">
                        <div className="flex max-w-[650px] flex-col gap-1">
                          <p className="font-[Geist] text-[20px] font-medium leading-[1.25] text-white/60 md:text-[26px] lg:text-[32px] lg:leading-[40px]">
                            Client : Institutionnel / Secteur énergétique
                          </p>
                          <p className="font-[Geist] text-[20px] font-medium leading-[1.25] text-white/60 md:text-[26px] lg:text-[32px] lg:leading-[40px]">
                            Périmètre : Tunisie – Italie
                            <span
                              role="img"
                              aria-label="Drapeau de l'Italie"
                              className="ml-2 inline-flex h-[16px] w-[24px] overflow-hidden rounded-[2px] border border-white/30 align-middle md:h-[20px] md:w-[30px] lg:h-[22px] lg:w-[33px]"
                            >
                              <span className="h-full w-1/3 bg-[#008C45]" />
                              <span className="h-full w-1/3 bg-white" />
                              <span className="h-full w-1/3 bg-[#CD212A]" />
                            </span>
                          </p>
                        </div>

                        <div className="flex flex-col gap-8 lg:gap-[45px]">
                          <p className="font-[Geist] text-[24px] font-medium leading-[1.18] text-white md:text-[30px] lg:text-[36px] lg:leading-[40px]">
                            Étude juridique et institutionnelle pour la mise en place d’un cadre réglementaire propice à
                            l’interconnexion électrique entre la Tunisie et l’Italie, ainsi que la création d’une autorité de
                            régulation du secteur électrique en Tunisie.
                          </p>

                          <div className="flex flex-col gap-4 lg:gap-5">
                            <p className="font-[Geist] text-[24px] font-bold leading-[1.18] text-white md:text-[30px] lg:text-[36px] lg:leading-[40px]">
                              Nos interventions :
                            </p>
                            <p className="font-[Geist] text-[24px] font-medium leading-[1.18] text-white md:text-[30px] lg:text-[36px] lg:leading-[40px]">
                              • Analyse du cadre réglementaire tunisien applicable au secteur de l’électricité et aux énergies
                              renouvelables
                            </p>
                            <p className="font-[Geist] text-[24px] font-medium leading-[1.18] text-white md:text-[30px] lg:text-[36px] lg:leading-[40px]">
                              • Actualisation des textes réglementaires relatifs à la création de l’autorité de régulation du
                              secteur électrique
                            </p>
                            <p className="font-[Geist] text-[24px] font-medium leading-[1.18] text-white md:text-[30px] lg:text-[36px] lg:leading-[40px]">
                              • Assistance à la mise en place d’un cadre réglementaire et contractuel propice à l’exportation
                              d’électricité via ELMED
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col items-start gap-4 md:mt-10">
                      <Link
                        href="/contact"
                        className="contact-btn inline-flex h-[68px] items-center justify-center rounded-full bg-white px-10 font-[Geist] text-[20px] font-medium text-black transition hover:opacity-90 md:h-[97px] md:px-[72px] md:text-[24px]"
                        onClick={closeStrategicPopup}
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showCertificatesPopup && (
              <div
                className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-4 py-6"
                onClick={() => setShowCertificatesPopup(false)}
              >
                <div
                  className="relative flex max-h-[90vh] w-full max-w-[1323px] flex-col overflow-hidden rounded-[32px] bg-black/35 shadow-[0px_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-[16px] md:rounded-[60px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    aria-label="Fermer"
                    className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-white md:right-7 md:top-7"
                    onClick={() => setShowCertificatesPopup(false)}
                  >
                    <X size={28} strokeWidth={2.6} />
                  </button>

                  <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6 sm:px-7 md:px-10 md:py-10 lg:px-14 lg:py-12">
                    <div className="relative mb-8 h-[36px] w-[92px] md:mb-12 md:h-[52px] md:w-[132px]">
                      <Image src="/optimized/minimal horizontal logo white 1.png"
                        alt="RNJ Advisory"
                        fill
                        className="object-contain object-left"
                       priority/>
                    </div>

                    <div className="max-w-[1139px]">
                      <h2 className="mb-6 font-[Geist] font-normal text-white text-[40px] leading-[0.98] sm:text-[56px] md:mb-8 md:text-[88px] md:leading-[0.98] lg:text-[128px]">
                        Certificats d’Attribut d&apos;Énergie et Garanties d’origine
                      </h2>

                      <p className="font-[Geist] font-normal text-white text-[16px] leading-[1.18] sm:text-[18px] md:text-[24px] md:leading-[1.12] lg:text-[32px]">
                        <span className="block">
                          Étude juridique pour la mise en place d’un cadre réglementaire applicable à l’émission des certificats d’Attribut d&apos;Énergie et des Garanties d’origine pour l’électricité produite à partir des énergies renouvelables.
                        </span>
                        <span className="block h-4 md:h-5 lg:h-6" aria-hidden="true" />
                        <span className="block">Nos interventions :</span>
                        <span className="block">• Analyse du cadre réglementaire tunisien</span>
                        <span className="block">• Identification des parties prenantes et précision des rôles à jouer par lesdites parties</span>
                        <span className="block">• Proposition d’un cadre institutionnel propice pour l’émission des certificats verts et garanties d’origine</span>
                        <span className="block">• Préparation des textes réglementaires requis pour la mise en place du projet</span>
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col items-start gap-4 md:mt-10">
                      <Link
                        href="/contact"
                        className="contact-btn inline-flex h-[68px] items-center justify-center rounded-full bg-white px-10 font-[Geist] text-[20px] font-medium text-black transition hover:opacity-90 md:h-[97px] md:px-[72px] md:text-[24px]"
                        onClick={() => setShowCertificatesPopup(false)}
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== FRAME 349336 — Three-card projects showcase (removed) ===== */}
            {false && <section className="w-full bg-[#F7FCFF] pb-10 pt-6 md:pb-12 md:pt-8 lg:pb-16 lg:pt-10">
              <div className="mx-auto grid w-full max-w-[1416px] grid-cols-1 gap-5 px-4 sm:px-5 md:px-6 lg:grid-cols-3 lg:gap-[27px] lg:px-8 xl:px-0">

                {/* Card 1 — Énergies Renouvelables (Group 349346) */}
                <article className="relative min-h-[520px] overflow-hidden rounded-[12px] lg:min-h-[626px]">
                  <Image src="/optimized/team-of-four-engineers-in-white-hard-hats-and-high-2026-03-27-00-39-32-utc%201.webp"
                    alt="Équipe d'ingénieurs — énergies renouvelables"
                    fill
                    className="object-cover"
                    unoptimized
                    loading="lazy"/>

                  <span
                    className="absolute left-[20px] top-[48px] inline-flex items-center justify-center px-5"
                    style={{
                      height: '30.37px',
                      background: '#003300',
                      borderRadius: '20.5224px',
                      fontFamily: 'Geist',
                      fontWeight: 400,
                      fontSize: '12.4919px',
                      color: 'rgba(255,255,255,0.7)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Énergies Renouvelables
                  </span>

                  <div
                    className="absolute inset-x-[6px] bottom-[8px] flex flex-col justify-end rounded-[14px] px-[14px] pb-[14px] pt-[18px]"
                    style={{ background: 'rgba(0, 51, 0, 0.7)' }}
                  >
                    <h3
                      className="font-[EB_Garamond] font-normal"
                      style={{ fontSize: '24px', lineHeight: '41px', color: '#F5FAC7' }}
                    >
                      Transition Énergétique Durable
                    </h3>
                    <p
                      className="mb-[18px] font-[Geist] font-normal"
                      style={{ fontSize: '11px', lineHeight: '13px', color: '#F5FAC7', opacity: 0.6 }}
                    >
                      RNJ Advisory accompagne les institutions dans l&apos;élaboration de politiques publiques
                      favorisant les investissements et le développement des énergies renouvelables.
                    </p>
                    <Link
                      href="/contact"
                      className="flex w-full items-center justify-center font-[Geist] font-bold"
                      style={{
                        height: '70.49px',
                        background: '#F5FAC7',
                        borderRadius: '52px',
                        fontSize: '13.3842px',
                        color: '#003300',
                      }}
                    >
                      Un projet en tête ?
                    </Link>
                  </div>
                </article>

                {/* Card 2 — Interconnexion électrique (Group 349347) */}
                <article
                  className="relative flex min-h-[520px] flex-col justify-end rounded-[12px] px-5 pb-[22px] pt-8 lg:min-h-[626px]"
                  style={{ background: '#C1CB82' }}
                >
                  <div className="flex flex-1 flex-col gap-[24px]">
                    <span className="flex items-center gap-2">
                      <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672853/rnj/layer-4-955dc651.png"
                        alt=""
                        width={36}
                        height={40}
                        style={{ width: '36px', height: 'auto' }}
                        unoptimized
                        loading="lazy"/>
                      <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672854/rnj/group-73892e5a.png"
                        alt="RNJ Advisory"
                        width={138}
                        height={37}
                        style={{ width: '138px', height: 'auto' }}
                        unoptimized
                        loading="lazy"/>
                    </span>

                    <h3
                      className="font-[EB_Garamond] font-normal capitalize"
                      style={{ fontSize: '40px', lineHeight: '47px', letterSpacing: '-0.03em', color: '#003300', maxWidth: '393.78px' }}
                    >
                      Interconnexion électrique Tunisie-Italie
                    </h3>

                    <p
                      className="font-[Geist] font-normal"
                      style={{ fontSize: '14.3518px', lineHeight: '20px', letterSpacing: '0.03em', color: '#003300', opacity: 0.6 }}
                    >
                      <span className="block">
                        Étude juridique et institutionnelle pour la mise en place d&apos;un cadre réglementaire
                        propice à l&apos;interconnexion électrique entre la Tunisie et l&apos;Italie, ainsi que la
                        création d&apos;une autorité de régulation du secteur électrique en Tunisie.
                      </span>
                      <span className="block h-2" aria-hidden="true" />
                      <span className="block">Nos interventions :</span>
                      <span className="block">• Analyse du cadre réglementaire tunisien applicable au secteur de l&apos;électricité et aux énergies renouvelables</span>
                      <span className="block">• Actualisation des textes réglementaires relatifs à la création de l&apos;autorité de régulation du secteur électrique</span>
                      <span className="block">• Assistance à la mise en place d&apos;un cadre réglementaire et contractuel propice à l&apos;exportation d&apos;électricité via ELMED</span>
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-[24px] flex w-full items-center justify-center font-[Geist] font-bold"
                    style={{
                      height: '70.49px',
                      background: '#FFFFFF',
                      borderRadius: '53px',
                      fontSize: '13.3842px',
                      color: '#003300',
                    }}
                  >
                    Discutons de vos enjeux.
                  </Link>
                </article>

                {/* Card 3 — Certificats d'Attributs Énergétiques (Group 349348) */}
                <article className="relative min-h-[520px] overflow-hidden rounded-[12px] lg:min-h-[626px]">
                  <Image src="/optimized/aerial-view-of-empty-stadium-surrounded-by-green-t-2026-03-18-09-51-08-utc%201.webp"
                    alt="Vue aérienne — certificats d'attributs énergétiques"
                    fill
                    className="object-cover"
                    unoptimized
                    loading="lazy"/>

                  <div
                    className="absolute inset-x-[6px] top-[16px] flex flex-col rounded-[14px] px-[14px] pb-[14px] pt-[20px]"
                    style={{ background: '#F5FAC7' }}
                  >
                    <h3
                      className="font-[EB_Garamond] font-normal"
                      style={{ fontSize: '38.9175px', lineHeight: '41px', color: '#003300', maxWidth: '357.81px' }}
                    >
                      Certificats d&apos;Attributs Énergétiques
                    </h3>
                    <p
                      className="mb-[20px] mt-[16px] font-[Geist] font-normal"
                      style={{ fontSize: '13.0409px', lineHeight: '13px', color: '#003300', opacity: 0.6 }}
                    >
                      RNJ Advisory a contribué à la première phase de l&apos;étude sur la conceptualisation des EAC
                      en Tunisie, avec un atelier organisé à Tunis auprès du Ministère de l&apos;Énergie et des Mines
                      et des parties prenantes.
                    </p>
                    <Link
                      href="/contact"
                      className="flex w-full items-center justify-center font-[Geist] font-bold"
                      style={{
                        height: '70.49px',
                        background: '#003300',
                        borderRadius: '52px',
                        fontSize: '13.3842px',
                        color: '#F5FAC7',
                      }}
                    >
                      intéressée
                    </Link>
                  </div>
                </article>
              </div>
            </section>}

            {/* ===== PROJECT OVERLAY PANEL ===== */}
            {showProjectOverlay && (
              <div className="pointer-events-none fixed inset-0 z-[9999] overscroll-none [overscroll-behavior:contain]">
                {/* Backdrop click-to-close */}
                <div
                  className="pointer-events-auto absolute inset-0"
                  onClick={() => setShowProjectOverlay(false)}
                />

                {/* Background image + gradient + panel */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                    src={activeProject.image}
                    style={{ transform: 'scale(1.02)', transformOrigin: 'center center', animation: '500ms ease 0s 1 normal both running fadeIn' }}
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.22)_55%,rgba(0,0,0,0.34)_100%)]"
                    aria-hidden="true"
                  />

                  {/* Sliding panel from the right */}
                  <div
                    className="pointer-events-auto absolute right-0 top-0 h-full w-[min(74vw,380px)] overflow-hidden border-l border-black/10 shadow-[-18px_0_36px_rgba(0,0,0,0.22)] sm:w-[min(66vw,430px)] md:w-[min(60vw,560px)] lg:w-[min(633px,44vw)]"
                    style={{ background: 'rgb(221, 229, 151)', animation: '550ms cubic-bezier(0.22, 1, 0.36, 1) 80ms 1 normal both running slideInRight' }}
                  >
                    <div className="relative flex h-full min-h-0 w-full flex-col">

                      {/* Close button */}
                      <button
                        type="button"
                        className="absolute right-3 top-[calc(env(safe-area-inset-top)+12px)] z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 transition hover:bg-black/20 sm:right-4 sm:top-[calc(env(safe-area-inset-top)+16px)]"
                        aria-label="Fermer"
                        style={{ color: 'rgb(0, 51, 0)' }}
                        onClick={() => setShowProjectOverlay(false)}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>

                      {/* Project image */}
                      <div
                        className="mx-4 mt-[calc(env(safe-area-inset-top)+48px)] flex-shrink-0 overflow-hidden rounded-[12px] bg-black/10 sm:mx-6 md:mx-8 lg:mx-[clamp(30px,8%,51px)]"
                        style={{ height: 'clamp(128px, 19vh, 210px)' }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt={activeProject.title}
                          className="h-full w-full object-cover"
                          src={activeProject.image}
                          style={{ animation: '500ms cubic-bezier(0.22, 1, 0.36, 1) 200ms 1 normal both running panelImageIn' }}
                        />
                      </div>

                      {/* Counter */}
                      <p
                        className="mt-3 px-4 font-[Geist] text-[11px] font-medium tracking-[-0.02em] sm:px-6 sm:text-[12px] md:px-8 md:text-[13px] lg:px-[clamp(30px,8%,51px)]"
                        style={{ color: 'rgb(0, 51, 0)', opacity: 0.5 }}
                      >
                        Projet {activeProjectIndex + 1}/{projectsCarouselData.length}
                      </p>

                      {/* Scrollable content */}
                      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-[calc(126px+env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pb-[calc(132px+env(safe-area-inset-bottom))] sm:pt-4 md:px-8 md:pb-[calc(140px+env(safe-area-inset-bottom))] md:pt-5 lg:px-[clamp(30px,8%,51px)] lg:pb-[126px] lg:pt-[clamp(16px,3%,32px)]">
                        <div className="flex flex-col gap-5 sm:gap-6 lg:gap-[clamp(24px,4%,51px)]">
                          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-[clamp(12px,2%,20px)]">
                            <p
                              className="font-[Geist] text-[11px] font-medium uppercase leading-tight tracking-[-0.02em] sm:text-[12px] md:text-[13px]"
                              style={{ color: 'rgb(0, 51, 0)' }}
                            >
                              Client : {activeProject.client}
                            </p>
                            <h3
                              className="font-[EB_Garamond] font-extrabold leading-[1.05] tracking-[-0.02em]"
                              style={{ color: 'rgb(0, 51, 0)', fontSize: 'clamp(24px, 5.8vw, 41px)' }}
                            >
                              {activeProject.title}
                            </h3>
                            <p
                              className="font-[Geist] text-[13px] font-medium leading-[1.5] tracking-[-0.02em] sm:text-[14px] lg:text-[clamp(12px,1.14vw,16px)]"
                              style={{ color: 'rgb(0, 51, 0)', opacity: 0.6 }}
                            >
                              {activeProject.description}
                            </p>
                          </div>
                          <p
                            className="font-[Geist] text-[11px] font-medium uppercase leading-tight tracking-[-0.02em] sm:text-[12px]"
                            style={{ color: 'rgb(0, 51, 0)', opacity: 0.35 }}
                          >
                            Pays : {activeProject.pays}
                          </p>
                        </div>
                      </div>

                      {/* Prev button */}
                      <button
                        type="button"
                        disabled={activeProjectIndex === 0}
                        className="absolute bottom-[calc(16px+env(safe-area-inset-bottom))] left-4 flex h-12 w-12 items-center justify-center rounded-full transition hover:brightness-110 sm:left-6 sm:h-14 sm:w-14 md:left-8 md:h-16 md:w-16 lg:bottom-[40px] lg:left-[clamp(30px,8%,51px)] lg:h-[clamp(48px,4.5vw,64px)] lg:w-[clamp(48px,4.5vw,64px)]"
                        aria-label="Projet précédent"
                        style={{ background: 'rgb(0, 51, 0)', opacity: activeProjectIndex === 0 ? 0.3 : 1 }}
                        onClick={() => navigateProject('prev')}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M13 4L7 10L13 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>

                      {/* Next button */}
                      <button
                        type="button"
                        disabled={activeProjectIndex === projectsCarouselData.length - 1}
                        className="absolute bottom-[calc(16px+env(safe-area-inset-bottom))] right-4 flex h-12 w-12 items-center justify-center rounded-full transition hover:brightness-110 sm:right-6 sm:h-14 sm:w-14 md:right-8 md:h-16 md:w-16 lg:bottom-[40px] lg:right-[clamp(30px,8%,51px)] lg:h-[clamp(48px,4.5vw,64px)] lg:w-[clamp(48px,4.5vw,64px)]"
                        aria-label="Projet suivant"
                        style={{ background: 'rgb(0, 51, 0)', opacity: activeProjectIndex === projectsCarouselData.length - 1 ? 0.3 : 1 }}
                        onClick={() => navigateProject('next')}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M7 4L13 10L7 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* ===== FIN PROJECTS SECTION ===== */}

            <section
              className="relative w-screen overflow-hidden bg-[#fff] py-12 md:pt-[94.3px] md:pb-[80px] lg:pt-[94.3px] lg:pb-[100px]"
              style={{
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
              }}
            >
              <div className="absolute inset-0 bg-[#fff]" />

              <div className="relative z-[20] w-full">
                <div className="mx-auto w-full max-w-none px-0">
                  <div className="flex w-full flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8 xl:px-[52px]">
                    <div className="flex max-w-[774px] flex-col gap-6 md:gap-[36px]">
                      <h2
                        className="font-[EB_Garamond] font-semibold tracking-[-0.03em] text-[#003300]"
                        style={{
                          fontSize: 'clamp(34px, 5.5vw, 83.0753px)',
                          lineHeight: 'clamp(36px, 4.6vw, 68px)',
                        }}
                      >
                        Analyse Institutionnelle &amp; Réglementaire
                      </h2>

                      <p
                        className="max-w-[774px] font-[Geist] font-medium text-[#003300]"
                        style={{ fontSize: 'clamp(13px, 2vw, 16px)', lineHeight: 'clamp(17px, 2.5vw, 19px)', opacity: 0.8 }}
                      >
                        Vous êtes un organisme public, une institution privée, un investisseur ou un bailleur de fonds ?
                        RNJ Advisory vous accompagne dans l’analyse approfondie des environnements institutionnels,
                        juridiques et réglementaires afin de sécuriser vos décisions stratégiques.
                      </p>
                    </div>

                    <Link
                      href="/contact"
                      className="contact-btn inline-flex shrink-0 items-center justify-center rounded-full bg-[#003300] font-[Geist] font-semibold text-[#BBCB2E]"
                      style={{
                        width: '200px',
                        height: '59.85px',
                        fontSize: '20px',
                        lineHeight: '25px',
                      }}
                    >
                      contact
                    </Link>
                  </div>

                  {/* Outer wrapper: relative, no overflow-hidden so nav buttons are not clipped */}
                  <div
                    ref={institutionalCarouselSectionRef}
                    className="relative mt-10 md:mt-14 lg:mt-16 xl:mt-20"
                    onMouseEnter={() => setIsInstitutionalCarouselPaused(true)}
                    onMouseLeave={() => setIsInstitutionalCarouselPaused(false)}
                    onTouchStart={() => setIsInstitutionalCarouselPaused(true)}
                    onTouchMove={() => setIsInstitutionalCarouselPaused(true)}
                    onTouchEnd={() => setIsInstitutionalCarouselPaused(false)}
                  >
                    {/* Padding lives on this non-scrolling wrapper (not on the scroll
                        container itself) so the scroll container's own content-box
                        width exactly equals its visible clientWidth — needed for the
                        `calc((100% - gap)/2)` card-width math below to land on clean
                        pair boundaries instead of leaking a padding-sized sliver of
                        the next card. */}
                    <div className="relative z-[20] w-full px-4 sm:px-6 lg:px-8 xl:px-[52px]">
                      <div
                        ref={institutionalCarouselRef}
                        className="relative z-10 flex w-full snap-x snap-mandatory flex-nowrap gap-4 overflow-x-auto py-0 touch-pan-x overscroll-x-contain scroll-smooth md:gap-[18px] xl:gap-[18px] [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                        onScroll={(e) => handleInstitutionalCarouselScroll(e.currentTarget)}
                      >
                        {[...institutionalCarouselCards, ...institutionalCarouselCards].map((card, index) => (
                          <article
                            key={`${card.title}-${index}`}
                            data-institutional-card
                            className="relative h-[380px] w-[94vw] shrink-0 snap-start overflow-hidden rounded-[16px] sm:h-[420px] sm:w-[86vw] sm:rounded-[20px] md:h-[473.78px] md:w-[calc((100%-18px)/2)]"
                          >
                            <Image
                              src={card.image}
                              alt={card.title}
                              fill
                              className="object-cover"
                              unoptimized
                              style={card.mirror ? { transform: 'scaleX(-1)' } : undefined}
                            />
                            {/* Bottom color band (Rectangle 821) — exact Figma spec: solid color, 188.04/473.78 = 39.7% height, hard edge.
                                Text lives inside this same box, vertically centered, so the gap above and below it stays equal
                                regardless of how many lines the description wraps to. */}
                            <div
                              className="absolute inset-x-0 bottom-0 flex flex-col justify-center gap-[12px] px-[24px] md:gap-[14px] md:px-[40px]"
                              style={{ height: '39.7%', background: card.bandBg }}
                            >
                              <h3
                                className="font-[Geist] font-semibold"
                                style={{
                                  fontSize: 'clamp(22px, 2.15vw, 31.112px)',
                                  lineHeight: 'clamp(28px, 2.8vw, 40px)',
                                  textTransform: 'capitalize',
                                  maxWidth: '460px',
                                  color: card.textColor,
                                }}
                              >
                                {card.title}
                              </h3>
                              <p
                                className="font-[Geist] font-medium"
                                style={{
                                  fontSize: '13px',
                                  lineHeight: '17px',
                                  textTransform: 'capitalize',
                                  opacity: 0.8,
                                  maxWidth: '584.17px',
                                  color: card.textColor,
                                }}
                              >
                                {card.description}
                              </p>
                            </div>
                          </article>
                      ))}

                      {/* Pagination dots */}
                      <div className="relative z-[25] mx-auto mt-6 flex w-full items-center justify-center gap-[10px] sm:gap-3">
                        {institutionalCarouselCards.map((_, dotIndex) => (
                          <button
                            key={`dot-${dotIndex}`}
                            type="button"
                            aria-label={`Aller au slide ${dotIndex + 1}`}
                            onClick={() => {
                              const carousel = institutionalCarouselRef.current;
                              if (!carousel) return;
                              const firstCard = carousel.querySelector('[data-institutional-card]') as HTMLElement | null;
                              if (!firstCard) return;
                              const styles = getComputedStyle(carousel);
                              const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
                              const cardWidth = firstCard.getBoundingClientRect().width;
                              const step = cardWidth + gap;
                              const cardsPerView = window.innerWidth >= 768 ? 2 : 1;
                              const pairIndex = Math.floor(dotIndex / cardsPerView);
                              carousel.scrollTo({ left: step * cardsPerView * pairIndex, behavior: 'smooth' });
                            }}
                            className="rounded-full transition-all duration-300"
                            style={{
                              width: activeInstitutionalSlide === dotIndex ? '32px' : '10px',
                              height: '10px',
                              backgroundColor: activeInstitutionalSlide === dotIndex ? '#003300' : 'rgba(0,51,0,0.25)',
                            }}
                          />
                        ))}
                      </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            <section
              className="relative w-screen overflow-hidden bg-[#003300] pb-4 pt-10 sm:pt-12 md:pt-16 lg:pb-0 lg:pt-20"
              style={{
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
              }}
            >
              <div className="mx-auto w-full">
                <div
                  className="mx-auto mt-10 grid w-full max-w-[1299.66px] grid-cols-1 gap-4 px-4 sm:mt-12 sm:gap-5 md:mt-16 md:grid-cols-3 lg:mt-20 xl:mt-[131px] xl:gap-[19px]"
                  style={{ filter: 'drop-shadow(0px 4px 47.1px rgba(0, 0, 0, 0.09))' }}
                >
                  <article
                    className="relative flex h-full w-full min-h-[360px] flex-col overflow-hidden rounded-[20px] bg-[#D9D9D9] transition-all duration-500 md:min-h-[420px] md:rounded-[30px] lg:min-h-[450px] xl:rounded-[34.8794px]"
                    style={{
                      border:
                        esgActiveCardIndex === 0 ? '2px solid #003300' : '2px solid transparent',
                      transform: esgActiveCardIndex === 0 ? 'translateY(-8px)' : 'translateY(0)',
                      boxShadow:
                        esgActiveCardIndex === 0
                          ? '0px 12px 36px rgba(0, 51, 0, 0.22)'
                          : '0px 4px 22.4px rgba(0, 0, 0, 0.19)',
                    }}
                  >
                    <div className="relative h-[210px] w-full sm:h-[230px] md:h-[220px] lg:h-[240px] xl:h-[285px]">
                      <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672111/rnj/jakub-zerdzicki-yknibjv0rby-unsplash-1-1b22cd9c.webp"
                        alt="ESG et financements"
                        fill
                        className="object-cover object-top"
                       loading="lazy"/>
                    </div>

                    <div className="flex flex-1 flex-col bg-[#CCD862] px-5 py-5 sm:px-6 md:px-[33.11px] md:pt-[15px]">
                      <h3
                        className="font-[EB_Garamond] font-semibold text-[#003300] text-[24px] leading-[24px] sm:text-[26px] sm:leading-[25px] lg:text-[28px] lg:leading-[27px] xl:text-[31.3914px] xl:leading-[28px]"
                      >
                        ESG, conformité et financements durables
                      </h3>
                      <p
                        className="mt-3 max-w-full font-[Geist] text-[#003300] text-[13.9517px] leading-[16px] opacity-70 sm:max-w-[280px]"
                      >
                        Structuration ESG, accès aux financements et feuille de route opérationnelle.
                      </p>
                    </div>
                  </article>

                  <article
                    className="relative flex h-full w-full min-h-[360px] flex-col items-center justify-center rounded-[20px] bg-[#BBCB2E] px-5 py-7 text-center transition-all duration-500 md:min-h-[420px] md:rounded-[30px] md:px-5 lg:min-h-[450px] lg:px-6 xl:rounded-[34.8794px] xl:px-8"
                    style={{
                      border:
                        esgActiveCardIndex === 1 ? '2px solid #003300' : '2px solid transparent',
                      transform: esgActiveCardIndex === 1 ? 'translateY(-8px)' : 'translateY(0)',
                      boxShadow:
                        esgActiveCardIndex === 1
                          ? '0px 12px 36px rgba(0, 51, 0, 0.22)'
                          : '0px 4px 22.4px rgba(0, 0, 0, 0.19)',
                    }}
                  >
                    <div className="mb-6 flex flex-col items-center gap-4 md:mb-7 md:gap-5 xl:mb-[48.83px] xl:gap-[26.16px]">
                    
          

                      <h3
                        className="max-w-[334.84px] font-[EB_Garamond] font-semibold text-[#003300] text-[24px] leading-[26px] sm:text-[26px] sm:leading-[28px] lg:text-[30px] lg:leading-[31px] xl:text-[35.8975px] xl:leading-[36px]"
                      >
                        Durabilité et ESG (Environnemental, Social, Gouvernance)
                      </h3>

                      <p
                        className="max-w-[299.96px] font-[Geist] text-[#003300] text-[13.9517px] leading-[17px] opacity-70"
                      >
                        RNJ Advisory intègre les enjeux ESG au cœur de votre stratégie pour une performance durable, mesurable et conforme.
                      </p>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex h-[50px] items-center justify-center rounded-full bg-[#003300] px-6 font-[Geist] font-semibold text-white transition-all duration-500 sm:h-[52px] sm:px-8 xl:h-[56.29px] xl:px-[37px]"
                      style={{
                        fontSize: '14.6036px',
                        lineHeight: '23px',
                        transform: esgActiveCardIndex === 1 ? 'scale(1.03)' : 'scale(1)',
                        boxShadow:
                          esgActiveCardIndex === 1
                            ? '0px 8px 28px rgba(0, 51, 0, 0.25)'
                            : 'none',
                      }}
                    >
                      En savoir plus
                    </Link>
                  </article>

                  <article
                    className="relative flex h-full w-full min-h-[360px] flex-col overflow-hidden rounded-[20px] bg-[#D9D9D9] transition-all duration-500 md:min-h-[420px] md:rounded-[30px] lg:min-h-[450px] xl:rounded-[34.8794px]"
                    style={{
                      border:
                        esgActiveCardIndex === 2 ? '2px solid #003300' : '2px solid transparent',
                      transform: esgActiveCardIndex === 2 ? 'translateY(-8px)' : 'translateY(0)',
                      boxShadow:
                        esgActiveCardIndex === 2
                          ? '0px 12px 36px rgba(0, 51, 0, 0.22)'
                          : '0px 4px 22.4px rgba(0, 0, 0, 0.19)',
                    }}
                  >
                    <div className="relative h-[210px] w-full sm:h-[230px] md:h-[220px] lg:h-[240px] xl:h-[300px]">
                      <Image src="/optimized/wind-turbines-compressed.svg"
                        alt="Diagnostic ESG et conformité"
                        fill
                        className="object-cover object-top"
                       loading="lazy"/>
                    </div>

                    <div className="flex flex-1 flex-col bg-[#EEF2CA] px-5 py-5 sm:px-6 md:px-[33px] md:pt-[15px]">
                      <h3
                        className="font-[EB_Garamond] font-semibold text-[#003300] text-[24px] leading-[24px] sm:text-[26px] sm:leading-[25px] lg:text-[28px] lg:leading-[27px] xl:text-[31.3914px] xl:leading-[28px]"
                      >
                        Diagnostic ESG &amp; conformité
                      </h3>
                      <p className="mt-3 max-w-full font-[Geist] text-[#003300] text-[13.9517px] leading-[16px] opacity-70 sm:max-w-[280px]">
                        Pour savoir où vous en êtes, prioriser les actions et rester conforme.
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            <section
              className="relative w-screen bg-[#003300] pb-4 pt-0"
              style={{
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
              }}
            >
              <div
                className="mx-auto flex w-full max-w-[1449px] flex-col items-center rounded-[36px] bg-[#003300] px-5 py-12 sm:px-8 md:px-10 md:py-16 lg:rounded-[80px] lg:px-[48px] lg:py-[75px] xl:min-h-[1312px] xl:rounded-[120px] xl:pb-[75px] xl:pl-[55px] xl:pr-[48px] xl:pt-[91px] xl:gap-[80px]"
                style={{ gap: 'clamp(48px, 5vw, 80px)' }}
              >
                {/* Header Section */}
                <div className="flex w-full max-w-[876px] flex-col items-center text-center">
                  <h2 
                    className="mb-4 font-[EB_Garamond] font-medium text-white md:mb-6"
                    style={{
                      fontSize: 'clamp(34px, 4.9vw, 61.9901px)',
                      lineHeight: 'clamp(44px, 6.3vw, 91px)',
                    }}
                  >
                    Un plus grand Impact
                  </h2>
                  <p 
                    className="font-[Geist] font-medium text-white"
                    style={{ 
                      maxWidth: '876px',
                      fontSize: 'clamp(16px, 2vw, 23.6774px)',
                      lineHeight: 'clamp(22px, 2.05vw, 24px)',
                      opacity: 0.5 
                    }}
                  >
                    RNJ Advisory intervient auprès d&apos;organisations dans différents environnements économiques, apportant expertise stratégique et impact mesurable au-delà des frontières.
                  </p>
                </div>

                {/* World Map Container */}
                <div
                  ref={mapFrameRef}
                  className="map-fade-in map-impact-map-frame relative w-full max-w-[1346px] overflow-visible"
                  onMouseMove={(event) => {
                    const nearest = resolveNearestImpactCountry(event.clientX, event.clientY, mapFrameRef.current);
                    setActiveImpactCountry(nearest ? nearest.id : null);
                  }}
                  onMouseLeave={() => setActiveImpactCountry(null)}
                  onClick={(event) => {
                    // Don't toggle: a tap/click is always preceded by its own mousemove/hover,
                    // which may have already set this same country active — toggling here would
                    // immediately close what the hover just opened.
                    const nearest = resolveNearestImpactCountry(event.clientX, event.clientY, mapFrameRef.current);
                    setActiveImpactCountry(nearest ? nearest.id : null);
                  }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-[28px] md:rounded-[40px]">
                    <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676562/rnj/maps-10375837.png"
                      alt="World Map"
                      fill
                      className="object-contain"
                     loading="lazy"/>
                  </div>

                  <div
                    ref={impactPinsFrameRef}
                    className="absolute z-40"
                    style={{ left: '37.74%', top: '21.70%', width: '14.75%', height: '39.40%' }}
                  >
                    {impactCountries.map((country, index) => {
                      const isActive = activeImpactCountry === country.id;

                      return (
                        <div
                          key={country.id}
                          className={`map-pin-button group absolute cursor-pointer appearance-none border-0 bg-transparent p-0 outline-none${isActive ? ' is-active' : ''}`}
                          style={{
                            ...country.pinStyle,
                            touchAction: 'manipulation',
                            minWidth: '16px',
                            minHeight: '16px',
                          }}
                          aria-label={`Show ${country.name} details`}
                          aria-expanded={isActive}
                          onClick={(event) => {
                            // Resolve via nearest-neighbor (same as the outer frame), not this
                            // pin's own id: these tiny hitboxes sit right next to each other
                            // (e.g. France/Italy/Tunisia/Belgium), so a tap that's slightly off
                            // could land inside the WRONG neighboring pin's box. Using the click's
                            // real coordinates keeps every click path consistent and accurate.
                            // Also don't toggle: a click is always preceded by its own hover
                            // (mousemove/tap), which may have already made this active — toggling
                            // here would immediately close what hover just opened.
                            event.stopPropagation();
                            const nearest = resolveNearestImpactCountry(event.clientX, event.clientY, mapFrameRef.current);
                            setActiveImpactCountry(nearest ? nearest.id : country.id);
                          }}
                        >
                          <span
                            className="map-pin-visual"
                            style={{ '--pin-delay': `${index * 80}ms`, display: 'none' } as React.CSSProperties}
                            aria-hidden
                          >
                            <svg
                              viewBox="0 0 59 93"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ width: '100%', height: '100%', display: 'block' }}
                            >
                              <g filter={`url(#pin-shadow-${country.id})`}>
                                <path d="M27.7654 77.8165C28.0298 78.4118 28.6228 78.7973 29.2742 78.7973C29.9256 78.7973 30.5186 78.4118 30.783 77.8165L32.2542 39.0098H26.2957L27.7668 77.8165H27.7654Z" fill="#BDBDBD"/>
                                <path d="M29.2735 44.9122C39.3446 44.9122 47.5088 36.7479 47.5088 26.6768C47.5088 16.6057 39.3446 8.44141 29.2735 8.44141C19.2023 8.44141 11.0381 16.6057 11.0381 26.6768C11.0381 36.7479 19.2023 44.9122 29.2735 44.9122Z" fill="#E94625"/>
                                <path d="M28.332 42.4911C27.5543 42.4911 26.9243 41.8611 26.9243 41.0835C26.9243 40.3058 27.5543 39.6758 28.332 39.6758C36.0187 39.6758 42.272 33.4225 42.272 25.7358C42.272 24.9581 42.902 24.3281 43.6797 24.3281C44.4573 24.3281 45.0873 24.9581 45.0873 25.7358C45.0873 30.2114 43.3444 34.4188 40.1797 37.5842C37.015 40.7489 32.8068 42.4919 28.3312 42.4919L28.332 42.4911Z" fill="white"/>
                              </g>
                              <defs>
                                <filter id={`pin-shadow-${country.id}`} x="0" y="0" width="59" height="93" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                  <feOffset dy="2.59721"/>
                                  <feGaussianBlur stdDeviation="5.51907"/>
                                  <feComposite in2="hardAlpha" operator="out"/>
                                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.41 0"/>
                                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                                </filter>
                              </defs>
                            </svg>
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {activeImpactCountryData && (
                    <div
                      className="map-country-card-shell absolute z-30 w-[min(88vw,389px)] max-w-[389px]"
                      style={getImpactPopupVars(activeImpactCountryData)}
                      onMouseEnter={() => setActiveImpactCountry(activeImpactCountryData.id)}
                      onMouseMove={(event) => event.stopPropagation()}
                      onMouseLeave={() => setActiveImpactCountry(null)}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div
                        className="map-country-card pointer-events-auto w-full px-4 py-4 sm:px-7 sm:py-6 md:px-8 md:py-[35px]"
                        style={{
                          background: '#EEF2CA',
                          borderRadius: '0 45px 45px 45px',
                        }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="flex flex-col items-start gap-2 sm:gap-5 md:gap-[26px]">
                          <div className="flex w-full items-start justify-end">
                            <button
                              type="button"
                              className="flex h-6 w-6 items-center justify-center text-[#003300]/50 hover:text-[#003300] lg:hidden"
                              onClick={() => setActiveImpactCountry(null)}
                              aria-label="Fermer"
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M1 1l12 12M13 1L1 13" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex flex-col items-start gap-2 sm:gap-5 md:gap-[26px]">
                            <div className="flex items-center gap-3 sm:gap-6 md:gap-[45px]">
                              <div
                                className="relative shrink-0 overflow-hidden"
                                style={{
                                  width: `${Math.round(activeImpactCountryData.miniMapWidth * 0.6)}px`,
                                  height: `${Math.round(activeImpactCountryData.miniMapHeight * 0.6)}px`,
                                }}
                              >
                                <Image
                                  src={countryShapeSrc[activeImpactCountryData.code] ?? activeImpactCountryData.mapSrc}
                                  alt={activeImpactCountryData.name}
                                  fill
                                  className="object-contain p-1"
                                  unoptimized
                                />
                              </div>

                              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:gap-3 md:gap-[13px]">
                                <span className="font-[Geist] text-[14px] font-normal leading-[20px] capitalize text-[#003300] sm:text-[16px]">
                                  {activeImpactCountryData.projects}
                                </span>

                                <h3 className="font-[Geist] text-[24px] font-bold leading-[28px] capitalize text-[#003300] sm:text-[32px] sm:leading-[32px]">
                                  {activeImpactCountryData.name}
                                </h3>

                                <div className="flex flex-wrap gap-[7px]">
                                  {activeImpactCountryData.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="inline-flex h-[24px] items-center justify-center rounded-[105px] bg-[#003300] px-[16px] text-[10px] font-normal capitalize text-white sm:h-[33px] sm:px-[20px] sm:text-[12px]"
                                      style={{ fontFamily: 'Geist' }}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                <span className="font-[Geist] text-[10px] font-medium leading-[15px] capitalize text-[#003300] opacity-50 sm:text-[12px]">
                                  {activeImpactCountryData.years}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Buttons and Copyright Section */}
                <div className="flex w-full max-w-[471.55px] flex-col items-center gap-7 md:gap-[60px]">
                  {/* Buttons Row */}
                  <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-stretch sm:gap-[10.5px]">
                    {/* About Button */}
                    <Link
                      href="/a-propos"
                      className="flex h-[62px] w-full items-center justify-center rounded-[9.4521px] border-2 border-[#F7FCFF] transition-colors hover:bg-white hover:text-[#003300] active:scale-95 active:bg-white active:text-[#003300] sm:h-[71.42px] sm:w-[155.43px]"
                    >
                      <span
                        className="font-[Geist] font-semibold text-white"
                        style={{ fontSize: 'clamp(16px, 1.8vw, 21.3092px)' }}
                      >
                        À propos
                      </span>
                    </Link>
                    
                    {/* Request a Consultation Button */}
                    <Link
                      href="/contact"
                      className="flex h-[62px] w-full items-center justify-center rounded-[9.4521px] bg-[#BBCB2E] px-4 transition-colors hover:bg-[#a8b829] active:scale-95 active:bg-[#9aa824] sm:h-[70.31px] sm:w-[305.62px]"
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }, 150);
                      }}
                    >
                      <span
                        className="whitespace-nowrap font-[Geist] font-semibold"
                        style={{
                          fontSize: 'clamp(15px, 1.8vw, 21.3092px)',
                          color: '#003300'
                        }}
                      >
                        <span className="hidden sm:inline">Demander une consultation</span>
                        <span className="sm:hidden">Consultation</span>
                      </span>
                    </Link>
                  </div>
                  
                  
                </div>
              </div>
            </section>

            {/* Bento Grid Section (Group 386) */}
            <section
              className="relative w-screen bg-[#003300] py-6 sm:py-8"
              style={{
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
              }}
            >
              <div className="mx-auto my-2 w-full max-w-[1393px] px-3 sm:my-3 sm:px-4 md:px-5 lg:px-6">
                <div
                  className="grid w-full grid-cols-2 gap-4 sm:gap-4 md:gap-[19px] md:grid-cols-2 xl:grid-cols-[334px_334px_minmax(0,1fr)]"
                  style={{ filter: 'drop-shadow(2px 2px 24.5px rgba(0,0,0,0.21))' }}
                >
                {/* Column 1: BECI + Pills — side by side on mobile, stacked on md+ */}
                <div className="col-span-2 grid grid-cols-2 gap-4 sm:gap-4 md:col-span-1 md:flex md:flex-col md:gap-[23px]">
                  {/* BECI card */}
                  <div className="bento-card bento-d1 relative h-[180px] w-full overflow-hidden rounded-[14px] bg-[#bbcb2e] sm:h-[220px] sm:rounded-[16px] md:h-[300px] md:rounded-[20px] lg:h-[334px]">
                    <div className="absolute left-1/2 top-1/2 flex h-[155px] w-[min(145px,calc(100%-20px))] -translate-x-1/2 -translate-y-1/2 flex-col items-start rounded-[18px] bg-white px-[10px] pt-[12px] shadow-[0_0_43px_-5px_rgba(255,255,255,0.33)] sm:h-[180px] sm:w-[min(170px,calc(100%-28px))] sm:rounded-[22px] sm:px-[13px] sm:pt-[16px] md:h-[230px] md:w-[min(208px,calc(100%-40px))] md:rounded-[30px] md:px-[18px] md:pt-[27px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/optimized/beci-2-1.svg" alt="BECI" loading="lazy" className="h-[34px] w-[30px] object-contain sm:h-[42px] sm:w-[37px] md:h-[65px] md:w-[57px]" />
                      <p className="mt-[10px] w-full font-[Geist] text-[12px] font-semibold leading-[14px] text-[#003300] sm:mt-[13px] sm:text-[14px] sm:leading-[16px] md:mt-[27px] md:text-[20px] md:leading-[22px]">
                        RNJ Advisory membre de BECI
                      </p>
                      <p className="mt-[4px] font-[Geist] text-[9px] font-medium leading-[12px] text-[#003300] md:text-[11px] md:leading-[15px]">
                        RNJ Advisory membre de BECI
                      </p>
                    </div>
                  </div>

                  {/* Pills card */}
                  <div className="bento-card bento-d2 relative flex min-h-[180px] w-full flex-col items-center justify-center gap-1.5 overflow-hidden rounded-[14px] bg-white px-2 py-3 sm:min-h-[220px] sm:gap-2 sm:rounded-[16px] sm:px-3 md:min-h-[300px] md:gap-3 md:rounded-[20px] md:px-5 lg:min-h-[334px]">
                    <div className="flex w-full max-w-[min(240px,calc(100%-8px))] items-center gap-[3px]">
                      <div className="flex h-[36px] flex-1 items-center justify-center rounded-full border-2 border-[#406640] sm:h-[40px] md:h-[50px] lg:h-[55.74px]">
                        <span className="font-[Geist] text-[11px] font-medium text-[#406640] sm:text-[13px] md:text-[17px] lg:text-[20px]">Conformité</span>
                      </div>
                      <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border-2 border-[#BBCB2E] sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px] lg:h-[55.74px] lg:w-[55.74px]">
                        <span className="text-[#BBCB2E] text-[12px]">→</span>
                      </div>
                    </div>
                    <div className="flex w-full max-w-[min(240px,calc(100%-8px))] items-center gap-[3px]">
                      <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border-2 border-[#406640] sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px] lg:h-[55.74px] lg:w-[55.74px]">
                        <span className="text-[#406640] text-[12px]">←</span>
                      </div>
                      <div className="flex h-[36px] flex-1 items-center justify-center rounded-full bg-[#406640] sm:h-[40px] md:h-[50px] lg:h-[55.74px]">
                        <span className="font-[Geist] text-[11px] font-medium text-[#DDE597] sm:text-[13px] md:text-[17px] lg:text-[20px]">Décision</span>
                      </div>
                    </div>
                    <div className="flex w-full max-w-[min(240px,calc(100%-8px))] items-center gap-[3px]">
                      <div className="flex h-[36px] flex-1 items-center justify-center rounded-full border-2 border-[#406640] sm:h-[40px] md:h-[50px] lg:h-[55.74px]">
                        <span className="font-[Geist] text-[11px] font-medium text-[#406640] sm:text-[13px] md:text-[17px] lg:text-[20px]">Analyse</span>
                      </div>
                      <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full border-2 border-[#BBCB2E] sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px] lg:h-[55.74px] lg:w-[55.74px]">
                        <span className="text-[#BBCB2E] text-[12px]">→</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Tall photo card — full width on mobile */}
                <div className="bento-card bento-d3 relative order-last col-span-2 w-full overflow-hidden rounded-[16px] bg-[#6F6F6F] sm:order-none sm:col-span-1 sm:rounded-[18px] md:rounded-[20px]">
                  <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779671241/rnj/optimized/group-352-3-8e109b3c.svg"
                    alt=""
                    fill
                    unoptimized
                    loading="lazy"
                    className="object-contain"/>
                </div>

                {/* Column 3: responsive sub-grid — 2-col on mobile */}
                <div className="col-span-2 grid grid-cols-2 gap-4 sm:gap-3 md:col-span-2 md:gap-4 md:gap-x-[19px] md:gap-y-4 lg:gap-[23px] xl:col-span-1">
                  {/* Yoga blurred */}
                  <div className="bento-card bento-d4 relative h-[180px] w-full overflow-hidden rounded-[14px] sm:h-[220px] sm:rounded-[16px] md:h-[300px] md:rounded-[20px] lg:h-[334px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779671250/rnj/optimized/group-363-1-a0d0a075.svg" alt="" loading="lazy" className="h-full w-full object-cover" />
                  </div>

                  {/* Belgique card */}
                  <div className="bento-card bento-d5 relative h-[180px] w-full overflow-hidden rounded-[14px] bg-white sm:h-[220px] sm:rounded-[16px] md:h-[300px] md:rounded-[20px] lg:h-[334px]">
                    <div
                      className="mt-[8px] flex h-[36px] w-full items-center px-1.5 transition-all duration-500 sm:mt-[18px] sm:h-[58px] sm:px-3 md:mt-[30px] md:h-[74px] md:px-[23px]"
                      style={{ background: `linear-gradient(90deg, #DDE597 ${belgiumSteps[belgiumStep].gradientWidth}, rgba(123,127,84,0.17) 100%)` }}
                    >
                      <div className="flex w-full origin-left scale-[0.55] items-center justify-between gap-3 sm:scale-100 sm:justify-start sm:gap-[29px]">
                        {belgiumSteps[belgiumStep].circles.map((circle, index) => (
                          <div
                            key={index}
                            className="relative flex items-center justify-center rounded-full bg-[#BBCB2E] transition-all duration-500"
                            style={{
                              width: circle.size,
                              height: circle.size,
                              opacity: circle.opacity,
                            }}
                          >
                            {circle.number && (
                              <span className="font-[EB_Garamond] leading-none text-[#003300]" style={{ fontSize: circle.size === '56px' ? '26px' : circle.size === '28px' ? '18px' : '12px' }}>
                                {circle.number}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="px-2 pt-1.5 sm:px-3 sm:pt-2 md:px-[23px] md:pt-[34px]">
                      <h3 className="w-full font-[Geist] text-[13px] font-medium leading-[1.05] text-[#003300] transition-all duration-500 sm:text-[17px] md:text-[26px] md:leading-[24px] lg:text-[36px] lg:leading-[32px]">
                        {belgiumSteps[belgiumStep].title}
                      </h3>
                      <p className="mt-0.5 w-full font-[Geist] text-[10px] font-medium leading-[1.25] text-[#003300]/60 transition-all duration-500 sm:mt-1 sm:text-[11px] md:mt-3 md:text-[15px] md:leading-[16px] lg:text-[16px]">
                        {belgiumSteps[belgiumStep].description}
                      </p>
                    </div>
                  </div>

                  {/* Shifting + Contact stacked */}
                  <div className="flex flex-col gap-2 sm:gap-3 md:gap-[23px]">
                    <div className="bento-card bento-d6 relative min-h-[130px] w-full overflow-hidden rounded-[14px] bg-white p-3 sm:min-h-[160px] sm:rounded-[16px] sm:p-4 md:min-h-[220px] md:rounded-[20px] md:p-6">
                      <div className="flex items-start justify-between gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676710/rnj/group-558-46fa6f2f.png"
                          alt="Shifting Academy"
                          className="h-[20px] w-[76px] object-contain sm:h-[24px] sm:w-[90px] md:h-[31px] md:w-[118px]"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676711/rnj/group-349031-1-46313aad.png"
                          alt=""
                          aria-hidden="true"
                          className="h-[24px] w-[56px] object-contain sm:h-[28px] sm:w-[68px] md:h-[38px] md:w-[90px]"
                        />
                      </div>

                      <p className="mt-2 max-w-[300px] font-[Geist] text-[12px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#003300] sm:mt-3 sm:text-[14px] md:mt-5 md:text-[20px] lg:mt-6 lg:text-[24px] lg:leading-[25px]">
                        RNJ Advisory est certifiée Shifting Academy
                      </p>

                      <div className="mt-2 flex items-center gap-[5px] sm:mt-3 md:mt-5 sm:mt-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676711/rnj/e-sdg-print-07-1-af43b2fc.png" alt="SDG 7" loading="lazy" className="h-[24px] w-[24px] sm:h-[28px] sm:w-[28px] md:h-[36px] md:w-[36px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779676712/rnj/e-sdg-print-08-1-53b17059.png" alt="SDG 8" loading="lazy" className="h-[24px] w-[24px] sm:h-[28px] sm:w-[28px] md:h-[36px] md:w-[36px]" />
                      </div>
                    </div>
                    <Link href="/contact" className="bento-card bento-d7 relative flex h-[48px] w-full items-center justify-center gap-[5px] rounded-[14px] bg-[#406640] px-2 transition-colors hover:bg-[#4a754a] sm:h-[58px] sm:rounded-[16px] sm:px-4 md:h-[91px] md:rounded-[20px] md:px-8">
                      <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white sm:h-[38px] sm:w-[38px] md:h-[44px] md:w-[45px]">
                        <span className="text-[#003300] text-[13px]">→</span>
                      </div>
                      <div className="flex h-[32px] min-w-[80px] items-center justify-center rounded-full bg-white px-3 sm:h-[38px] sm:min-w-[96px] md:h-[43px] md:min-w-[115px] md:px-4">
                        <span className="font-[Geist] text-[13px] font-semibold text-[#003300] sm:text-[14px] md:text-[16px]">Contact</span>
                      </div>
                    </Link>
                  </div>

                  {/* Concentric circles card */}
                  <div className="bento-card bento-d8 relative h-[180px] w-full overflow-hidden rounded-[14px] bg-[#BBCB2E] sm:h-[220px] sm:rounded-[16px] md:h-[300px] md:rounded-[20px] lg:h-[334px]">
                    <div
                      className="absolute inset-0 rounded-[20px]"
                      style={{ background: 'radial-gradient(50% 61.83% at 50% 50%, #DDE597 60.08%, rgba(123,127,84,0) 100%)' }}
                    />
                    <span className="ring-pulse pointer-events-none absolute left-1/2 top-1/2 h-[150px] w-[150px] rounded-full border-[2px] border-white/80 sm:h-[220px] sm:w-[220px] sm:border-[3px] md:h-[300px] md:w-[300px] lg:h-[378px] lg:w-[378px] lg:border-[4px]" />
                    <span className="ring-pulse ring-pulse-delay-1 pointer-events-none absolute left-1/2 top-1/2 h-[105px] w-[105px] rounded-full border-[2px] border-white/80 sm:h-[155px] sm:w-[155px] sm:border-[3px] md:h-[210px] md:w-[210px] lg:h-[270px] lg:w-[270px] lg:border-[4px]" />
                    <span className="ring-pulse ring-pulse-delay-2 pointer-events-none absolute left-1/2 top-1/2 h-[62px] w-[62px] rounded-full border-[2px] border-white sm:h-[90px] sm:w-[90px] sm:border-[3px] md:h-[124px] md:w-[124px] lg:h-[152px] lg:w-[152px] lg:border-[4px]" />
                    <div className="absolute left-1/2 top-1/2 flex h-[36px] w-[36px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#003300] sm:h-[52px] sm:w-[52px] md:h-[72px] md:w-[72px] lg:h-[84px] lg:w-[84px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779677102/rnj/group-559-aaf6f0b3.png" alt="" loading="lazy" className="h-[26px] w-[26px] sm:h-[30px] sm:w-[30px] md:h-[36px] md:w-[36px]" />
                    </div>
                    <div className="float-icon absolute flex h-[24px] w-[24px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DDE597] sm:h-[38px] sm:w-[38px] md:h-[51px] md:w-[51px]" style={{ left: '17%', top: '14%', animationDelay: '0s' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779677103/rnj/vector-2-8beb62fa.png" alt="" loading="lazy" className="h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] md:h-[22px] md:w-[22px]" />
                    </div>
                    <div className="float-icon absolute flex h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DDE597] sm:h-[40px] sm:w-[40px] md:h-[57px] md:w-[57px]" style={{ left: '74%', top: '20%', animationDelay: '0.4s' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779677104/rnj/group-2-8d410a01.png" alt="" loading="lazy" className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] md:h-[24px] md:w-[24px]" />
                    </div>
                    <div className="float-icon absolute flex h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DDE597] sm:h-[40px] sm:w-[40px] md:h-[57px] md:w-[57px]" style={{ left: '73%', top: '66%', animationDelay: '0.8s' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779677105/rnj/group-3-ab3adbb8.png" alt="" loading="lazy" className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] md:h-[24px] md:w-[24px]" />
                    </div>
                    <div className="float-icon absolute flex h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DDE597] sm:h-[40px] sm:w-[40px] md:h-[57px] md:w-[57px]" style={{ left: '15%', top: '70%', animationDelay: '1.2s' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779677105/rnj/group-4-c8bc5566.png" alt="" loading="lazy" className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] md:h-[24px] md:w-[24px]" />
                    </div>
                    <div className="float-icon absolute flex h-[26px] w-[26px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DDE597] sm:h-[40px] sm:w-[40px] md:h-[57px] md:w-[57px]" style={{ left: '51%', top: '89%', animationDelay: '1.6s' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779678009/rnj/layer-1-3-08f03874.png" alt="" loading="lazy" className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] md:h-[24px] md:w-[24px]" />
                    </div>
                  </div>
                </div>
              </div>
              </div>

              {/* Copyright */}
              <p className="mt-[16px] text-center font-[Geist] text-[12px] font-medium leading-[18px] text-[#003300] opacity-50 sm:mt-[20px] sm:text-[13.5px] sm:leading-[19px] md:text-[15.4px] md:leading-[21px]">
                © 2026 RNJ Advisory. Tous droits réservés.
              </p>
            </section>

            {/* ===== PROJETS RÉCENTS Section ===== */}
            <section
              className="relative w-screen bg-[#003300] pb-16 pt-16 sm:pb-20 sm:pt-20 md:pb-24 md:pt-24"
              style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
            >
              {/* Header */}
              <div className="mx-auto mb-10 max-w-[1272px] px-4 text-center sm:mb-12 sm:px-6 md:mb-[120px] lg:px-8">
                <h2
                  className="font-[EB_Garamond] font-medium capitalize text-white"
                  style={{ fontSize: 'clamp(40px, 4.5vw, 64px)', lineHeight: '103%' }}
                >
                  nos projets récents
                </h2>
                <p
                  className="mx-auto mt-5 max-w-[600px] font-[Geist] font-normal text-white"
                  style={{ fontSize: '16px', lineHeight: '130%', opacity: 0.5 }}
                >
                  Découvrez une sélection de missions récentes illustrant notre expertise en conseil juridique,
                  réglementaire et stratégique au service de projets à fort impact.
                </p>
              </div>

              {/* Cards row — center card raised 82px above side cards */}
              <div className="mx-auto flex max-w-[1272px] flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-end lg:px-8">
                {/* Left card — cream #F5FAC7 */}
                <article
                  className="relative w-full flex-1 overflow-hidden rounded-[15px]"
                  style={{
                    height: 'clamp(420px, 44vw, 596px)',
                    background: '#C1CB82',
                    filter: 'drop-shadow(0px 2px 26.1px rgba(0,0,0,0.15))',
                    opacity: 0.8,
                  }}
                >
                  {/* Inner image block */}
                  <div
                    className="absolute overflow-hidden rounded-[15px]"
                    style={{ inset: '21px 27px 44% 27px' }}
                  >
                    <Image
                      src="/optimized/group-348987-2.webp"
                      alt="Des stratégies qui créent de l'impact"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  {/* Text */}
                  <div className="absolute bottom-[28px] left-[28px] right-[28px]">
                    <h3
                      className="font-[Geist] font-medium text-[#003300]"
                      style={{ fontSize: '24px', lineHeight: '31px' }}
                    >
                      Des stratégies qui créent de l&apos;impact.
                    </h3>
                    <p
                      className="mt-[15px] font-[Geist] font-normal text-[#003300]"
                      style={{ fontSize: '15px', lineHeight: '20px', letterSpacing: '0.02em', opacity: 0.6 }}
                    >
                      Des solutions juridiques et réglementaires conçues pour accompagner les décisions qui façonnent l&apos;avenir.
                    </p>
                  </div>
                </article>

                {/* Center card — dark #1E1E1E, taller & elevated */}
                <article
                  className="relative w-full flex-1 overflow-hidden rounded-[19px] md:-mt-[82px]"
                  style={{
                    height: 'clamp(480px, 56vw, 760px)',
                    background: '#1E1E1E',
                    filter: 'drop-shadow(0px 1px 170.5px rgba(0,0,0,0.33))',
                  }}
                >
                  <Image
                    src={`/optimized/wind-turbine-against-clear-blue-sky-on-sunny-day-2026-03-25-01-46-08-utc%201.png`}
                    alt="Le droit au service de la transformation"
                    fill
                    className="object-cover"
                    unoptimized
                    style={{ transform: 'rotate(2.38deg)', transformOrigin: 'center center' }}
                  />
                  <div className="absolute inset-0 p-[49px]">
                    <h3
                      className="max-w-[316px] font-[Geist] font-medium text-[#BBCB2E]"
                      style={{ fontSize: '30px', lineHeight: '40px' }}
                    >
                      Le droit au service de la transformation.
                    </h3>
                    <p
                      className="mt-[25px] max-w-[278px] font-[Geist] font-normal text-[#BBCB2E]"
                      style={{ fontSize: '20px', lineHeight: '25px', letterSpacing: '0.02em' }}
                    >
                      Nous aidons les organisations à évoluer dans un environnement réglementaire complexe avec confiance.
                    </p>
                  </div>
                </article>

                {/* Right card — #BBCB2E, power lines, Figma-centered layout */}
                <article
                  className="relative w-full flex-1 overflow-hidden rounded-[15px]"
                  style={{
                    height: 'clamp(420px, 44vw, 596px)',
                    background: '#BBCB2E',
                    filter: 'drop-shadow(0px 2px 26.1px rgba(0,0,0,0.15))',
                    opacity: 0.8,
                  }}
                >
                  <Image
                    src="/optimized/power-lines-against-a-dramatic-orange-sky-2026-03-09-23-50-51-utc%201%20(1).png"
                    alt="Accélérer la transition énergétique"
                    fill
                    className="object-cover"
                    unoptimized
                    style={{ mixBlendMode: 'multiply' }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center text-center px-[44px]" style={{ paddingTop: '58px' }}>
                    {/* Icon */}
                    <Image
                      src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672853/rnj/layer-4-955dc651.png"
                      alt="RNJ"
                      width={42}
                      height={48}
                      unoptimized
                    />
                    {/* Title — 18px below icon */}
                    <h3
                      className="mt-[18px] w-full text-center font-[Geist] font-bold text-[#003300]"
                      style={{ fontSize: '32px', lineHeight: '36px', letterSpacing: '-0.02em' }}
                    >
                      Accélérer la transition énergétique.
                    </h3>
                    {/* Description — 16px below title */}
                    <p
                      className="mt-[16px] w-full text-center font-[Geist] font-normal text-[#003300]"
                      style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0.02em' }}
                    >
                      Des cadres réglementaires solides pour soutenir les infrastructures, les marchés et l&apos;innovation énergétique.
                    </p>
                  </div>
                </article>
              </div>
            </section>

            {/* Études & Analyse Réglementaire Section (hidden) */}
            {false && (
            <section className="relative w-full py-16 md:py-20 lg:py-24 bg-[#F7FCFF] overflow-hidden">
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
                  {/* Left Content */}
                  <div className="flex-1 order-2 lg:order-1">
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-3 h-3 bg-[#003300] rounded-full"></div>
                      <h3 
                        className="font-[Geist] font-bold text-[#003300]"
                        style={{ fontSize: 'clamp(20px, 3vw, 28px)', lineHeight: 'clamp(22px, 3.2vw, 30px)' }}
                      >
                        Études & Analyse Réglementaire
                      </h3>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6 md:space-y-8">
                      <h2 
                        className="font-[EB_Garamond] font-semibold text-[#003300]"
                        style={{ fontSize: 'clamp(36px, 5vw, 83px)', lineHeight: 'clamp(32px, 4.5vw, 68px)', letterSpacing: '-0.03em' }}
                      >
                        Analyse Institutionnelle & Réglementaire
                      </h2>
                      
                      <p 
                        className="font-[Geist] font-medium text-[#003300] max-w-[100%] lg:max-w-[820px]"
                        style={{ 
                          fontSize: 'clamp(16px, 2.5vw, 21px)', 
                          lineHeight: 'clamp(18px, 2.8vw, 23px)',
                          opacity: 0.8 
                        }}
                      >
                        Vous êtes un organisme public, une institution privée,
                        un investisseur ou un bailleur de fonds ? RNJ Advisory
                        vous accompagne dans l&apos;analyse approfondie des
                        environnements institutionnels, juridiques et
                        réglementaires afin de sécuriser vos décisions
                        stratégiques.
                      </p>

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        <button
                          className="border-2 border-[#003300] rounded-full px-8 md:px-12 py-3 md:py-4 font-[Geist] font-semibold text-[#003300] hover:bg-[#003300] hover:text-[#F7FCFF] transition-colors active:scale-95"
                          style={{ fontSize: 'clamp(18px, 2.5vw, 25px)' }}
                          onTouchStart={(e) => {
                            e.currentTarget.style.transform = 'scale(0.95)';
                            setTimeout(() => {
                              e.currentTarget.style.transform = 'scale(1)';
                            }, 150);
                          }}
                        >
                          En savoir plus
                        </button>
                        
                        <button
                          className="bg-[#003300] rounded-full px-6 md:px-8 py-3 md:py-4 font-[Geist] font-semibold text-[#F7FCFF] hover:bg-[#002200] transition-colors active:scale-95"
                          style={{ fontSize: 'clamp(18px, 2.5vw, 25px)' }}
                          onTouchStart={(e) => {
                            e.currentTarget.style.transform = 'scale(0.95)';
                            setTimeout(() => {
                              e.currentTarget.style.transform = 'scale(1)';
                            }, 150);
                          }}
                        >
                          Demander une analyse
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="flex-1 order-1 lg:order-2 flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[364px] md:max-w-[400px] lg:max-w-[500px] h-[400px] md:h-[500px] lg:h-[580px]">
                      <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779674333/rnj/light-bulb-1-1-aa32136c.png"
                        alt="Light bulb - Analyse Réglementaire"
                        fill
                        className="object-contain"
                       loading="lazy"/>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            )}

            <section
              ref={faqSectionRef}
              className="relative w-screen bg-[#003300] py-8"
              style={{
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
              }}
            >
              <div
                className={`mx-3 w-auto max-w-[1146px] rounded-[18px] bg-white px-3 pb-8 pt-10 sm:mx-4 sm:rounded-[22px] sm:px-4 sm:pb-10 sm:pt-12 md:mx-auto md:w-full md:rounded-[25px] md:px-[18px] md:pb-[61px] md:pt-[107px] ${faqPanelMinHeightClass}`}
                style={{
                  boxShadow: '2.01px 4.02px 33.68px rgba(0, 0, 0, 0.12)',
                }}
              >
                <div
                  className={`mx-auto flex w-full max-w-full flex-col items-center gap-10 sm:gap-[81px] ${faqContentMaxWidthClass}`}
                >
                  <div className="flex max-w-[724px] flex-col items-center gap-5 text-center sm:gap-[45px]">
                    <h2
                      className="w-full font-[EB_Garamond] font-normal text-[#003300]"
                      style={{ fontSize: 'clamp(34px, 8vw, 61.04px)', lineHeight: 'clamp(38px, 8vw, 56px)' }}
                    >
                      Questions fréquentes
                    </h2>

                    <p
                      className="w-full font-[Geist] font-normal text-[#003300]"
                      style={{ fontSize: 'clamp(14px, 3.2vw, 16px)', lineHeight: 'clamp(22px, 4.8vw, 25px)' }}
                    >
                      Retrouvez ici les réponses aux interrogations les plus
                      courantes concernant nos services, notre méthodologie et
                      notre accompagnement stratégique.
                    </p>
                  </div>

                  <div className={`flex w-full max-w-full flex-col gap-[10px] ${faqRowsMaxWidthClass}`}>
                    {faqItems.map((item, index) => {
                      const isHovered = !isMobileFaqViewport && hoveredFaqIndex === index;
                      const isExpanded = expandedFaqIndex === index;
                      const isEmphasized = isExpanded || isHovered;
                      const inactiveOpacity = isMobileFaqViewport ? 1 : 0.5;
                      const answerHeight = faqAnswerHeights[index] ?? 0;
                      const isVisible = faqShowAll || index < 4;

                      return (
                        <div
                          key={item.question}
                          style={{
                            overflow: isVisible ? 'visible' : 'hidden',
                            maxHeight: isVisible ? 'none' : '0px',
                            opacity: isVisible ? 1 : 0,
                            marginBottom: isVisible ? undefined : '-10px',
                            transition: 'max-height 0.4s ease, opacity 0.35s ease, margin-bottom 0.4s ease',
                          }}
                        >
                          <div
                            role="button"
                            tabIndex={0}
                            aria-expanded={isExpanded}
                            className={`flex w-full cursor-pointer flex-col rounded-[22px] bg-[#BBCB2E] ${
                              isExpanded
                                ? 'min-h-[147px] items-start justify-start gap-[15px] px-[18px] pb-[24px] pt-[22px] md:px-[57px] md:pb-[37px] md:pt-[32px]'
                                : 'min-h-[102px] items-center justify-center gap-[10px] px-[18px] pb-[24px] pt-[24px] md:px-[57px] md:pb-[37px] md:pt-[39px]'
                            }`}
                            style={{
                              opacity: isEmphasized ? 1 : inactiveOpacity,
                              transform: isEmphasized ? 'translateY(-1px)' : 'translateY(0)',
                              boxShadow: isEmphasized ? '0 10px 24px rgba(0, 51, 0, 0.12)' : '0 0 0 rgba(0, 0, 0, 0)',
                            }}
                            onMouseEnter={() => setHoveredFaqIndex(index)}
                            onMouseLeave={() => setHoveredFaqIndex(null)}
                            onFocus={() => setHoveredFaqIndex(index)}
                            onBlur={() => setHoveredFaqIndex(null)}
                            onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                setExpandedFaqIndex(isExpanded ? null : index);
                              }
                            }}
                          >
                            <div className={`flex w-full max-w-full items-center justify-between gap-4 ${faqRowInnerMaxWidthClass}`}>
                              <span
                                className={`min-w-0 pr-3 text-left font-[Geist] text-[#003300] ${isExpanded ? 'font-semibold' : 'font-normal'}`}
                                style={{ fontSize: 'clamp(15px, 3.6vw, 20px)', lineHeight: 'clamp(22px, 4.8vw, 25px)' }}
                              >
                                {item.question}
                              </span>

                              <span
                                className={`relative shrink-0 w-[22px] ${isExpanded ? 'h-[22px]' : 'h-[11px]'}`}
                              >
                                <Image
                                  src={isExpanded
                                    ? '/optimized/Group 67 (1).svg'
                                    : '/optimized/Vector (28).svg'}
                                  alt={isExpanded ? 'Réduire' : 'Développer'}
                                  fill
                                  className="object-contain"
                                />
                              </span>
                            </div>

                            <div
                              className="w-full overflow-hidden transition-[max-height,opacity,margin-top] duration-300 ease-out"
                              style={{
                                maxHeight: isExpanded ? `${answerHeight + 8}px` : '0px',
                                opacity: isExpanded ? 1 : 0,
                                marginTop: isExpanded ? '2px' : '0px',
                              }}
                            >
                              <p
                                ref={(node) => {
                                  faqAnswerRefs.current[index] = node;
                                }}
                                className={`overflow-hidden font-[Geist] font-medium text-black/50 ${faqRowInnerMaxWidthClass}`}
                                style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: 'clamp(18px, 4.2vw, 19px)' }}
                              >
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  </div>
                </div>
              </div>

              <div
                className="flex flex-col items-center gap-3 sm:gap-[14px]"
                style={{ marginTop: '40px' }}
              >
                {faqItems.length > 4 && (
                  <button
                    onClick={() => {
                      if (faqShowAll) {
                        setFaqShowAll(false);
                        setExpandedFaqIndex(null);
                      } else {
                        setFaqShowAll(true);
                      }
                    }}
                    className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#FFFFFF] transition-all duration-300 hover:scale-110 sm:h-[78px] sm:w-[78px]"
                    style={{ boxShadow: '2.01055px 4.02111px 33.6768px rgba(0, 0, 0, 0.12)' }}
                    aria-label={faqShowAll ? 'Voir moins' : 'Voir plus de questions'}
                  >
                    <span
                      className="font-[Geist] text-[28px] font-light text-[#003300] transition-transform duration-300 sm:text-[32px]"
                      style={{ transform: faqShowAll ? 'rotate(45deg)' : 'rotate(0deg)', display: 'block', lineHeight: 1 }}
                    >
                      +
                    </span>
                  </button>
                )}
              </div>
            </section>
          </div>
        </section>

        {/* Footer Section */}
        <LandingFooter />
      </div>
    </main>
  );
}
