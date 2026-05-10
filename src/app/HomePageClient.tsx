'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import LandingFooter from '@/components/LandingFooter';

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

const partnerAssetLogos = [
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333855/rnj/asset-14-1-cda0f5e7.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333857/rnj/asset-15-1-7f0249bf.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333858/rnj/asset-16-1-41dc72e6.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333859/rnj/asset-17-1-5077f95f.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333861/rnj/asset-21-1-6ad9b68e.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333863/rnj/asset-22-1-ac5775de.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333864/rnj/asset-23-1-9c5664dc.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333866/rnj/asset-24-1-1c05ea09.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333867/rnj/asset-26-1-3d6250e2.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333869/rnj/asset-27-1-8679f4ab.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333870/rnj/asset-28-1-d6d25061.svg',
] as const;

type ImpactCountryId = 'tn' | 'mr' | 'sn' | 'gn' | 'bf' | 'ne' | 'bj' | 'cd';

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
      left: '48.92%',
      top: '-0.19%',
      width: '18.39%',
      height: '27.88%',
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
      left: '12.65%',
      top: '26.55%',
      width: '18.39%',
      height: '27.88%',
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
      left: '4.06%',
      top: '34.91%',
      width: '18.39%',
      height: '27.88%',
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
      left: '11.74%',
      top: '42.91%',
      width: '18.39%',
      height: '27.88%',
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
      left: '28.48%',
      top: '39.64%',
      width: '18.39%',
      height: '27.88%',
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
      left: '50.39%',
      top: '29.82%',
      width: '18.39%',
      height: '27.88%',
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
      left: '36.18%',
      top: '44.36%',
      width: '18.39%',
      height: '27.88%',
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
      left: '77.36%',
      top: '66.18%',
      width: '18.39%',
      height: '27.88%',
    },
  },
] as const;

const entrepreneurshipCards = [
  {
    title: 'Choix du statut juridique adapté',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333872/rnj/mask-group-12-bfc180ab.svg',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
  {
    title: 'Faisabilité & plan financier',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333873/rnj/vector-19-81ce45a8.svg',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 140.59,
  },
  {
    title: 'Démarches administratives',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333875/rnj/vector-18-18cc905b.svg',
    iconWidth: 65.55,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
  {
    title: 'Conformité réglementaire',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333876/rnj/mask-group-11-4a32da53.svg',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
];

const servicesFocusCards = [
  {
    title: 'Créer mon entreprise en Belgique',
    description: "Je lance mon activité avec un cadre juridique clair.",
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333878/rnj/mask-group-3-2ece0ef0.svg',
    iconWidth: 67.41,
    iconHeight: 67.41,
  },
  {
    title: 'Obtenir un conseil juridique',
    description: "Je sécurise un projet complexe ou réglementé.",
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333879/rnj/mask-group-4-f2eb00c6.svg',
    iconWidth: 77.59,
    iconHeight: 79.26,
  },
  {
    title: 'Accélérer ma croissance  Recruter hors UE',
    description: "Je développe mon organisation et je recrute à l'international.",
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333881/rnj/mask-group-5-c793fd9f.svg',
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
    image: '/optimized/Group 348987 (1).svg',
    panelBg: '#406640',
    titleColor: '#BFCCBF',
    descriptionColor: '#BFCCBF',
    buttonBg: '#BFCCBF',
    buttonTextColor: '#003300',
    panelFirst: false,
  },
  {
    title: 'Structuration Juridique & Gouvernance',
    description:
      'Choix de la forme juridique (Belgique, Tunisie, international), création et transformation de sociétés, gouvernance, pactes d’associés, conventions de partenariat et opérations de transmission (M&A).',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778101215/rnj/optimized/mask-group-40-37d12ade.webp',
    panelBg: '#BFCCBF',
    titleColor: '#003300',
    descriptionColor: 'rgba(0, 51, 0, 0.6)',
    buttonBg: '#003300',
    buttonTextColor: '#FFFFFF',
    panelFirst: false,
  },
  {
    title: 'Droit Des Contrats & Sécurité Commerciale',
    description:
      'Rédaction, revue et négociation de contrats (clients, fournisseurs, partenaires), sous-traitance, licences et confidentialité. Nous réduisons les risques et sécurisons la relation commerciale à chaque étape clé.',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778065554/rnj/optimized/image-droit-des-contrats-securite-commerciale-1.svg',
    panelBg: '#A2B144',
    titleColor: '#003300',
    descriptionColor: 'rgba(0, 51, 0, 0.6)',
    buttonBg: '#003300',
    buttonTextColor: '#FFFFFF',
    panelFirst: false,
  },
  {
    title: 'Partenariats Public-Privé & Concessions',
    description:
      'Structuration juridique de projets PPP et concessions, appui aux entreprises, collectivités et institutions. Interventions sur l’énergie, les infrastructures et les projets d’intérêt général.',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778101216/rnj/optimized/partenariats-public-priv-concessions-image-c255db89.webp',
    panelBg: '#E0E5C0',
    titleColor: '#003300',
    descriptionColor: 'rgba(0, 51, 0, 0.6)',
    buttonBg: '#003300',
    buttonTextColor: '#FFFFFF',
    panelFirst: false,
  },
  {
    title: 'ESG, Conformité & Appels À Projets',
    description:
      'Audit juridique et compliance, protection des données (RGPD), mise en conformité opérationnelle. Accompagnement sur les appels à projets : éligibilité, cadrage juridique, rédaction et sécurisation contractuelle.',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376883/rnj/optimized/esg-conformit-appels-projets-b1d37fff.webp',
    panelBg: '#DDE597',
    titleColor: '#003300',
    descriptionColor: '#003300',
    buttonBg: '#003300',
    buttonTextColor: '#FFFFFF',
    panelFirst: false,
  },
  {
    title: 'Veille Juridique & Anticipation Réglementaire',
    description:
      'Surveillance active des évolutions législatives et réglementaires en Belgique, en Europe et en Tunisie. Alertes ciblées sur les impacts potentiels et accompagnement dans l’anticipation des changements.',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376884/rnj/optimized/mask-group-36-61b10456.webp',
    panelBg: '#CCD862',
    titleColor: '#003300',
    descriptionColor: 'rgba(0, 51, 0, 0.6)',
    buttonBg: '#003300',
    buttonTextColor: '#FFFFFF',
    panelFirst: false,
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
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376826/rnj/users-f9417797.svg',
    iconWidth: 58.33,
    iconHeight: 61.14,
  },
  {
    title: 'Expertise juridique & stratégique',
    description:
      'Expertise en droit public, énergie, stratégie et transformation.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376827/rnj/law-ec037074.svg',
    iconWidth: 60.38,
    iconHeight: 61.08,
  },
  {
    title: 'Performances & fiabilité',
    description: 'Un service rapide, sécurisé et orienté résultats.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376829/rnj/check-mark-89a3c66e.svg',
    iconWidth: 54.62,
    iconHeight: 41.8,
  },
  {
    title: 'Méthodologie et durabilité',
    description: 'Un cadre structuré pour une croissance agile et durable.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376831/rnj/methologie-648e7fd2.svg',
    iconWidth: 51.95,
    iconHeight: 60.34,
  },
  {
    title: 'Ancrage local et ouverture internationale',
    description: 'Bruxelles et Tunis : un accompagnement local et international.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376833/rnj/earth-c9fdae9d.svg',
    iconWidth: 59.77,
    iconHeight: 59.77,
  },
  {
    title: 'Partenariats stratégiques avec des acteurs reconnus',
    description: 'Un réseau de partenaires actifs en Belgique et en Tunisie.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376835/rnj/handshake-387c4c1d.svg',
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
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376827/rnj/law-ec037074.svg',
    iconWidth: 97,
    iconHeight: 97,
    titleWidth: '270px',
    descriptionWidth: '344px',
  },
  {
    title: 'Performances & fiabilité',
    description:
      'Nous nous engageons à vous offrir un service professionnel, rapide et sécurisé. Nos outils réduisent les temps morts, fluidifient les démarches administratives et optimisent vos résultats.',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376829/rnj/check-mark-89a3c66e.svg',
    iconWidth: 82,
    iconHeight: 64,
    titleWidth: '178px',
    descriptionWidth: '344px',
  },
  {
    title: 'Méthodologie et durabilité',
    description:
      "Notre cadre d'accompagnement structuré permet de clarifier les priorités, de construire une base solide et de déployer votre activité avec agilité et vision long terme.",
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376831/rnj/methologie-648e7fd2.svg',
    iconWidth: 86,
    iconHeight: 78,
    titleWidth: '270px',
    descriptionWidth: '368px',
  },
  {
    title: 'Accompagnement humain, multilingue & engagé',
    description:
      "Proximité, écoute active et respect de votre rythme : chez RNJ Advisory, nous mettons l'humain au cœur de chaque projet. Nous intervenons en français, anglais et arabe.",
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376826/rnj/users-f9417797.svg',
    iconWidth: 55,
    iconHeight: 87,
    titleWidth: '326px',
    descriptionWidth: '376px',
  },
  {
    title: 'Ancrage local et ouverture internationale',
    description:
      'Basés à Bruxelles et à Tunis, nous accompagnons les porteurs de projet installés en Belgique, les entrepreneurs hors UE et les institutions souhaitant structurer ou étendre leur impact.',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376833/rnj/earth-c9fdae9d.svg',
    iconWidth: 52,
    iconHeight: 75,
    titleWidth: '310px',
    descriptionWidth: '344px',
  },
  {
    title: 'Partenariats stratégiques avec des acteurs reconnus',
    description:
      "Nous collaborons avec un réseau solide d'acteurs publics, privés et associatifs, en Belgique comme en Tunisie.",
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376835/rnj/handshake-387c4c1d.svg',
    iconWidth: 77,
    iconHeight: 72,
    titleWidth: '330px',
    descriptionWidth: '344px',
  },
];


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
            <Image
              src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333987/rnj/light-bulb-1-1-aa32136c.svg"
              alt="Ampoule - Analyse réglementaire"
              fill
              sizes="(min-width: 1536px) 364.57px, (min-width: 1280px) 360px, (min-width: 1024px) 340px, (min-width: 768px) 320px, (min-width: 640px) 280px, 220px"
              className="object-contain translate-y-2 md:translate-y-3 2xl:translate-y-4"
            />
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
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333990/rnj/group-541-2a130507.svg',
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
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776335425/rnj/optimized/group-541-1-5b55b5e0.webp',
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
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776335426/rnj/optimized/group-541-2-59ca9193.webp',
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
  const activeImageSrc = active?.image ?? 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333990/rnj/group-541-2a130507.svg';

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
      className="w-full bg-[#eff1ce] pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full">
        <div className="relative w-full overflow-hidden">
          <div
            className="relative h-[54px] w-full sm:h-[58px] md:h-[61px]"
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
                      className="whitespace-nowrap px-2 font-[Geist] text-[14px] font-semibold leading-[12px] transition-opacity duration-500 sm:text-[16px] sm:leading-[13px] md:text-[20px] md:leading-[14px]"
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

          <div key={active.key} className="tab-fade flex flex-col xl:min-h-[835px] xl:flex-row">
            <div
              className="flex w-full flex-col px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 xl:w-1/2 xl:px-[60px] xl:py-[89px] transition-colors duration-500"
              style={{ backgroundColor: active.bg }}
            >
              <div className="flex items-center gap-[8px]">
                <span
                  className="inline-block h-[7.28px] w-[7.28px] rounded-full"
                  style={{ backgroundColor: active.textColor }}
                />
                <span
                  className="font-[Geist] text-[15px] font-bold leading-[16px] sm:text-[16px] sm:leading-[17px] md:text-[17.25px] md:leading-[18px]"
                  style={{
                    color: active.textColor,
                  }}
                >
                  {active.tag}
                </span>
              </div>

              <div className="mt-10 flex flex-col gap-10 sm:mt-12 md:mt-16 md:gap-14 xl:mt-[89px] xl:gap-[200px]">
                <div className="flex max-w-[595px] flex-col gap-[30px]">
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
                    className="max-w-[572px] font-[Geist] font-medium"
                    style={{
                      fontSize: '16px',
                      lineHeight: '17px',
                      color: active.textColor,
                      opacity: 0.7,
                    }}
                  >
                    {active.description}
                  </p>
                </div>

                <div className="flex w-full flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-start sm:gap-[7.65px]">
                  <Link
                    href="/services"
                    className="inline-flex h-[52px] w-full items-center justify-center rounded-full px-6 font-[Geist] font-semibold transition-opacity hover:opacity-80 sm:w-auto sm:min-w-[170px] sm:px-[24px]"
                    style={{
                      border: `1.53px solid ${active.buttonOutlineColor}`,
                      color: active.textColor,
                      fontSize: '15.52px',
                      lineHeight: '16px',
                    }}
                  >
                    En savoir plus
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-[51.19px] w-full items-center justify-center rounded-full px-6 font-[Geist] font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto sm:min-w-[195px] sm:px-[28px]"
                    style={{
                      backgroundColor: active.buttonFilledBg,
                      fontSize: '15.52px',
                      lineHeight: '16px',
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
                  className={`block w-full h-auto [aspect-ratio:759/835] xl:absolute xl:inset-0 xl:h-full xl:w-full xl:object-contain xl:object-right-top xl:[aspect-ratio:auto] ${active.imageClassName ?? ''}`}
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
  const [servicesFocusStage, setServicesFocusStage] = useState(0);
  const [belgiumStep, setBelgiumStep] = useState(0);
  const [isInstitutionalCarouselPaused, setIsInstitutionalCarouselPaused] = useState(false);
  const [activeInstitutionalSlide, setActiveInstitutionalSlide] = useState(0);
  const institutionalCarouselRef = useRef<HTMLDivElement | null>(null);
  const interconnectionCardTouchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interconnectionPopupOpenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isLightBulbAnimated, setIsLightBulbAnimated] = useState(false);
  const lightBulbSectionRef = useRef<HTMLDivElement | null>(null);
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
    return () => {
      if (interconnectionCardTouchTimeoutRef.current) {
        clearTimeout(interconnectionCardTouchTimeoutRef.current);
      }
      if (interconnectionPopupOpenTimeoutRef.current) {
        clearTimeout(interconnectionPopupOpenTimeoutRef.current);
      }
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

  const servicesFocusActiveCount = servicesFocusAnimationStates[servicesFocusStage].activeCount;
  const servicesFocusLineFill = servicesFocusAnimationStates[servicesFocusStage].lineFill;
  const isInterconnectionReadMoreOpenState =
    isInterconnectionCardActive || isInterconnectionReadMoreOpening;

  function triggerInterconnectionCardTouchFeedback() {
    if (interconnectionCardTouchTimeoutRef.current) {
      clearTimeout(interconnectionCardTouchTimeoutRef.current);
    }

    setIsInterconnectionCardActive(true);
    interconnectionCardTouchTimeoutRef.current = setTimeout(() => {
      setIsInterconnectionCardActive(false);
      interconnectionCardTouchTimeoutRef.current = null;
    }, 850);
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

  function closeStrategicPopup() {
    setShowStrategicPopup(false);
    setIsInterconnectionReadMoreOpening(false);
    setIsInterconnectionCardActive(false);
  }

  function scrollInstitutionalCarousel(direction: 'left' | 'right') {
    const carousel = institutionalCarouselRef.current;
    if (!carousel) return;

    const firstCard = carousel.querySelector('[data-institutional-card]') as HTMLElement | null;
    const styles = getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? carousel.clientWidth * 0.9;
    const offset = (cardWidth + gap) * (direction === 'right' ? 1 : -1);
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
    if (isInstitutionalCarouselPaused) return;
    if (window.innerWidth < 1024) return;

    const interval = setInterval(() => {
      const carousel = institutionalCarouselRef.current;
      if (!carousel) return;

      const loopWidth = carousel.scrollWidth / 2;
      if (loopWidth > 0 && carousel.scrollLeft >= loopWidth) {
        carousel.scrollLeft -= loopWidth;
      }

      scrollInstitutionalCarousel('right');
    }, 3500);

    return () => clearInterval(interval);
  }, [isInstitutionalCarouselPaused]);

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

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7FCFF] to-white">
      <Navbar />

      <div className="relative w-full">
        <div className="relative w-full overflow-hidden pb-8 sm:pb-10 md:pb-12 xl:pb-14 min-h-[760px] sm:min-h-[820px] md:min-h-[900px] lg:min-h-[940px] xl:min-h-[983px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-no-repeat bg-cover"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376885/rnj/optimized/wind-energy-wind-power-sustainable-renewable-en-2026-03-18-04-35-53-utc-1-84fe3c19.webp')",
              backgroundPosition: 'center right',
            }}
          />

          <div
            className="absolute left-1/2 top-[104px] w-full max-w-[814px] -translate-x-1/2 px-4 sm:top-[122px] sm:px-6 md:top-[146px] md:px-8 lg:top-[190px] lg:px-10 xl:top-[232px] xl:px-0"
          >
            <div className="flex flex-col items-center gap-6 md:gap-10 xl:items-start xl:gap-[59px]">
              <div className="flex w-full flex-col items-center gap-4 md:gap-[24px] xl:items-start xl:gap-[32px]">
                <h1
                  className="about-hero-title eb_garamond_e16653e1-module__s6IC3q__className w-full max-w-[744px] text-center font-medium leading-[0.95] text-[#003300] text-[clamp(34px,9.5vw,64px)] xl:text-left"
                  style={{  color: '#003300' }}
                >
                  <span className="block">Conseil stratégique pour</span>
                  <span className="block">une performance durable</span>
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

          <div className="relative z-[1] mx-auto mt-[520px] w-full max-w-[1421px] px-4 sm:mt-[560px] sm:px-6 md:mt-[640px] lg:mt-[680px] xl:mt-[670px] xl:px-0">
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
                  boxShadow: '0px 4.31034px 27.4138px rgba(0, 0, 0, 0.5)',
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
                    <Image
                      src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310333/rnj/group-527-v2-03944abc.svg"
                      alt="Quand la durabilité rencontre la stratégie"
                      fill
                      className="object-cover"
                      unoptimized
                    />
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
                  boxShadow: '0px 4.31034px 27.4138px rgba(0, 0, 0, 0.5)',
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
                    { src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333996/rnj/openai-jake-stangel-1-c442a239.svg', alt: 'Customer 1', left: '0' },
                    { src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333999/rnj/businesswoman-explaining-esg-strategy-during-meeti-2026-01-08-08-14-47-utc-1-a731531a.svg', alt: 'Customer 2', left: 'clamp(28px, 3.7vw, 53px)' },
                    { src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333970/rnj/that-makes-it-official-cropped-shot-of-two-uniden-2026-01-09-09-21-38-utc-1-72edb5b8.svg', alt: 'Customer 3', left: 'clamp(56px, 7.5vw, 106px)' },
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
                  boxShadow: '0px 4.31034px 27.4138px rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div className="flex max-w-[336px] flex-col" style={{ gap: 'clamp(4px, 0.9vw, 13px)' }}>
                    <h3 className="font-[Geist] font-medium text-white" style={{ fontSize: 'clamp(15px, 2.25vw, 32px)', lineHeight: 'clamp(17px, 2.4vw, 34px)' }}>
                      Une méthode claire, du cadrage au déploiement
                    </h3>
                    <p className="font-[Geist] font-medium text-white/60" style={{ fontSize: 'clamp(11px, 1.15vw, 16px)', lineHeight: 'clamp(14px, 1.4vw, 20px)' }}>
                      Nous transformons la complexité réglementaire en plan d&apos;action concret.
                    </p>
                </div>
              </article>
            </div>
          </div>

        </div>

        <div className="relative z-[2] w-full bg-[#BBCB2E] py-3 sm:py-3 md:py-4">
          <div className="w-full px-0">
            <div className="relative min-h-[54px] overflow-hidden sm:min-h-[58px] md:min-h-[66px] lg:min-h-[74px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[clamp(24px,6vw,80px)] bg-gradient-to-r from-[#BBCB2E] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[clamp(24px,6vw,80px)] bg-gradient-to-l from-[#BBCB2E] to-transparent" />

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="flex w-max items-center gap-[clamp(24px,4.5vw,73px)]"
                  style={{
                    animation: 'scroll 26s linear infinite',
                    willChange: 'transform',
                  }}
                >
                  {[...partnerAssetLogos, ...partnerAssetLogos].map((logo, index) => (
                    <div
                      key={`partner-asset-logo-${index}-${logo}`}
                      className="relative h-[clamp(30px,4.6vw,52px)] w-[clamp(108px,15vw,190px)] shrink-0"
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
        </div>

        <div className="relative w-full overflow-hidden bg-[#F7FCFF] py-10 sm:py-12 md:py-14 lg:min-h-[782px] lg:py-16">
          <div className="relative z-[2] mx-auto flex w-full max-w-[1395px] flex-col items-center gap-8 px-4 sm:gap-10 md:gap-12 lg:gap-[60px]">
            <div className="flex min-h-[58px] w-full max-w-[1391.5px] flex-wrap items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <span className="h-[10px] w-[10px] rounded-full bg-[#003300]" />
                <span className="font-[Geist] text-[16px] font-bold leading-[1.05] text-[#003300] sm:text-[20px] lg:text-[23.6828px] lg:leading-[25px]">
                  Services
                </span>
              </div>

              <Link
                href="/contact"
                className="contact-btn inline-flex h-[46px] items-center justify-center rounded-[150px] bg-[#BBCB2E] px-7 font-[Geist] text-[16px] font-bold leading-[1.05] text-[#003300] sm:h-[54px] sm:px-9 sm:text-[20px] lg:h-[58px] lg:px-[43px] lg:text-[23.6828px] lg:leading-[25px]"
              >
                Contact
              </Link>
            </div>

            <div className="flex w-full max-w-[1395px] flex-col items-center gap-6 text-center sm:gap-8 lg:gap-[48px]">
              <h2 className="font-[EB_Garamond] text-[40px] font-bold leading-[0.9] text-[#003300] sm:text-[52px] lg:text-[76px] xl:text-[100px] xl:leading-[80px]">
                Nos Services
              </h2>

              <p className="max-w-[753px] font-[Geist] text-[14px] font-normal leading-[1.35] text-[#003300]/50 sm:text-[16px] md:text-[18px] lg:text-[20px] lg:leading-[24px]">
                Nous accompagnons les organisations qui veulent décider plus vite,
                rester conformes et déployer leurs projets avec impact, en
                Belgique et à l&apos;international.
              </p>
            </div>

            <div className="flex w-full max-w-[1065.41px] flex-col items-center gap-6 lg:gap-[9px]">
              <div className="relative h-[42px] w-full max-w-[768px] rounded-full bg-transparent sm:h-[46px]">
                <div className="absolute left-[20px] right-[20px] top-1/2 h-[14px] -translate-y-1/2 rounded-full bg-[#D9D9D9] sm:left-[24.5px] sm:right-[24.5px] sm:h-[17px]">
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
                      className={`absolute top-0 flex h-[42px] w-[42px] items-center justify-center rounded-full transition-colors duration-500 sm:h-[46px] sm:w-[46px] ${positionClass} ${
                        isStepActive ? 'bg-[#BBCB2E]' : 'bg-[#D9D9D9]'
                      }`}
                    >
                      <span
                        className={`font-[Geist] text-[18px] font-medium leading-[18px] text-[#003300] transition-opacity duration-500 sm:text-[22.2147px] sm:leading-[22px] ${
                          isStepActive ? 'opacity-100' : 'opacity-40'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex w-full flex-nowrap items-stretch gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 xl:gap-[14.7px]">
                {servicesFocusCards.map((card, index) => {
                  const isCardActive = servicesFocusActiveCount > index;

                  return (
                    <article
                      key={card.title}
                      className={`relative isolate flex h-[328px] w-[min(84vw,346px)] shrink-0 flex-col items-center px-[24px] pt-[48px] transition-all duration-500 ease-out sm:w-[min(62vw,346px)] sm:px-[30.1322px] sm:pt-[57.9046px] md:w-[min(48vw,346px)] lg:w-[345px] ${
                        isCardActive
                          ? 'opacity-100 [filter:drop-shadow(0px_4px_23.1px_rgba(0,0,0,0.08))]'
                          : 'opacity-30'
                      }`}
                    >
                      <div className="pointer-events-none absolute left-0 top-[33px] h-[262px] w-full rounded-[38.6311px] bg-[#DDE597]" />

                      <div className="relative z-[1] flex w-[284.88px] max-w-full flex-col items-center gap-[35.54px]">
                        <Image
                          src={card.icon}
                          alt={card.title}
                          width={card.iconWidth}
                          height={card.iconHeight}
                          className="h-auto w-auto"
                        />

                        <div className="flex w-full flex-col items-center gap-[13.13px]">
                          <h3 className="w-full text-center font-[Geist] text-[22.2147px] font-extrabold leading-[22px] text-[#003300]">
                            {card.title}
                          </h3>

                          <p className="w-full text-center font-[Geist] text-[17.41px] font-medium leading-[18px] text-[#003300]/50">
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
                  <Image
                    src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334004/rnj/group-1-23b4740e.svg"
                    alt="RNJ Advisory"
                    fill
                    className="object-contain object-center lg:object-left"
                  />
                </div>

                <div className="flex w-full max-w-[779px] flex-col gap-7 lg:gap-9 xl:gap-[43.92px]">
                  <h2 className="w-full font-[EB_Garamond] text-[clamp(30px,8.8vw,62.7408px)] font-semibold italic leading-[0.92] tracking-[-0.03em] text-white lg:leading-[0.9] xl:leading-[54px]">
                    Concrétisez vos ambitions avec un cabinet de conseil juridique
                    et stratégique à Bruxelles
                  </h2>

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

              <div className="relative mx-auto h-[220px] w-full max-w-[320px] sm:h-[300px] sm:max-w-[380px] md:h-[360px] md:max-w-[430px] lg:h-[420px] lg:max-w-[464.65px] xl:mx-0 xl:ml-auto xl:h-[529.93px] xl:w-full xl:max-w-[464.65px] hidden sm:block">
                <img
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777410416/rnj/mask-group-39-06a5eb07.svg"
                  alt="Partenaires en réunion"
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
                <Image
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310340/rnj/group-349075-a2bbf73f.svg"
                  alt="Light bulb lines"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <Image
                src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334015/rnj/layer-1-2-1d375d74.svg"
                alt="Light bulb icon"
                fill
                sizes="120px"
                className="object-contain"
              />
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
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777410436/rnj/optimized/frame-559.webp"
                  alt="Illustration Analyse Réglementaire"
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
                src="/optimized/Group 349040.svg"
                alt=""
                fill
                className="object-cover object-center"
                unoptimized
                priority={false}
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
                    <p
                      className="mb-4 text-center font-[Geist] font-normal text-[#7C9780] lg:text-right"
                      style={{ fontSize: 'clamp(14px, 2.5vw, 23px)', lineHeight: 1.1 }}
                    >
                      RNJ Advisory
                    </p>

                    <div className="relative mx-auto h-[300px] w-[100%] overflow-hidden rounded-[16px] border-2 border-[#BBCB2E] sm:h-[190px] sm:w-[190px] sm:rounded-[20px] md:h-[230px] md:w-[230px] md:rounded-[24px] lg:mx-0 lg:h-[280px] lg:w-[280px] lg:rounded-[28px]">
                      <Image
                        src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333996/rnj/openai-jake-stangel-1-c442a239.svg"
                        alt="Portrait entrepreneuriat"
                        fill
                        className="object-cover"
                        style={{ objectPosition: 'right' }}
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EntrepreneuriatTabsSection />

        <section
              className="w-full bg-[#F7FCFF] py-32 md:py-44"
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

            {/* Section Articles Interconnexion et Certificats */}
            <article
              className="relative my-16 w-screen max-w-none overflow-hidden bg-[#003300] md:my-20"
              style={{
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
                boxShadow: '2px 4px 28.3px rgba(0, 0, 0, 0.17)',
              }}
            >
              <div className="grid w-full max-w-none grid-cols-2 xl:grid-cols-[minmax(0px)_minmax(50%)]"
              style={{
                justifyContent: 'space-between',
                height: '90vh',
              }}
              >
                <div className="relative order-2 min-h-[260px] w-full overflow-hidden sm:min-h-[340px] md:min-h-[460px] lg:min-h-[560px] xl:order-1 xl:min-h-[780px]" style={{ width: '100%' }}>
                  <Image
                    src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778051869/rnj/optimized/mask-group-44-3cbc4b7d.svg"
                    alt="Accélération PME et ASBL"
                    fill
                    className="object-contain object-center xl:object-cover xl:object-left"
                  />
                </div>

                <div className="order-1 flex flex-col px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 xl:order-2 xl:px-10 xl:py-12 2xl:px-[60px] 2xl:py-[56px]">
                  <div className="flex h-full w-full flex-col gap-7 sm:gap-8 xl:gap-10">
                    <div className="flex items-center gap-2.5">
                      <span className="h-[8px] w-[8px] rounded-full bg-[#BFCCBF] md:h-[9.33px] md:w-[9.33px]" />
                      <span className="font-[Geist] text-[16px] font-semibold leading-[1.2] text-[#BFCCBF] sm:text-[18px] md:text-[20px]">
                        Entrepreneuriat
                      </span>
                    </div>

                    <div className="flex h-full flex-col justify-between gap-8 lg:gap-10 xl:gap-[72px]">
                      <div className="flex flex-col gap-6 sm:gap-8 xl:max-w-[637px] xl:gap-[45px]">
                        <h3 className="max-w-[800px] font-[EB_Garamond] text-[34px] font-semibold capitalize leading-[0.95] text-[#BFCCBF] sm:text-[42px] md:text-[52px] md:leading-[0.94] xl:text-[64px] xl:leading-[56px]">
                          <span>accélération PME &<br />
                          ASBL recrutement <br />
                           international &<br />
                           croissance</span>
                        </h3>

                        <div className="flex flex-col gap-4 max-w-[424px]">
                          <p className="font-[Geist] text-[13px] font-medium leading-[1.35] text-[#BFCCBF]/80 sm:text-[14px] md:text-[16px] md:leading-[1.2]">
                            Vous êtes une PME ou une ASBL en croissance ?
                          </p>
                          <p className="font-[Geist] text-[13px] font-medium leading-[1.35] text-[#BFCCBF]/80 sm:text-[14px] md:text-[16px] md:leading-[1.2]">
                            Vous souhaitez recruter des talents hors UE ?
                          </p>
                          <p className="font-[Geist] text-[13px] font-medium leading-[1.35] text-[#BFCCBF]/80 sm:text-[14px] md:text-[16px] md:leading-[1.2]">
                            Nous sécurisons vos recrutements internationaux pour vous permettre de vous concentrer sur votre développement.
                          </p>
                        </div>
                      </div>

                      <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-[9.8px] xl:max-w-[560px]">
                        <Link
                          href="/contact"
                          className="h-[56px] w-full whitespace-nowrap rounded-full border border-[#BFCCBF] px-8 font-[Geist] text-[16px] font-semibold leading-[20px] text-[#BFCCBF] transition-colors hover:bg-[#BFCCBF] hover:text-[#003300] sm:w-auto sm:min-w-[170px] md:h-[62px] md:border-[1.6px] md:px-[34px]"
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >                    
                          À propos
                        </Link>
                        <Link
                          href="/contact"
                          className="h-[56px] w-full rounded-full bg-[#BBCB2E] px-6 font-[Geist] text-[16px] font-semibold leading-[20px] text-[#003300] transition-colors hover:bg-[#D4E175] sm:w-auto sm:min-w-[260px] md:h-[62px] md:min-w-[329px]"
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          Planifier un entretien confidentiel
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Section Pourquoi choisir RNJ Advisory */}
            <section
              className="relative my-6 w-screen max-w-none bg-[#F7FCFF] py-10 md:my-8 md:py-12 lg:py-14"
              style={{
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
              }}
            >
              <div className="w-full px-4">
                <div className="mb-[3.02px] flex flex-col gap-3 pl-12 md:mb-[3.02px] md:pl-16 lg:pl-20">
                  <div className="flex items-center gap-3">
                    <span className="h-[10px] w-[10px] rounded-full bg-[#003300]" />
                    <span className="font-[Geist] text-[18px] font-bold leading-[1.05] text-[#003300] sm:text-[20px] md:text-[22px] lg:text-[23.6828px] lg:leading-[25px]">
                      Pourquoi choisir RNJ Advisory ?
                    </span>
                  </div>

                  <p className="font-[Geist] text-[16px] font-bold leading-[1.15] text-[#003300]/65 sm:text-[18px] md:text-[19px] lg:text-[20px] lg:leading-[18px]">
                    Une expertise rigoureuse au service de vos décisions
                  </p>
                </div>

                <div className="relative h-[390px] overflow-hidden py-6 sm:h-[450px] md:py-8 lg:h-[512px]">
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
                              className="flex h-[250px] w-[260px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-[10px] px-4 text-center transition-all duration-300 sm:h-[280px] sm:w-[290px] sm:px-5 lg:h-[304px] lg:w-[308.02px]"
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
                                  className="relative mb-5"
                                  style={{
                                    width: `${Math.max(38, card.iconWidth * 0.78)}px`,
                                    height: `${Math.max(38, card.iconHeight * 0.78)}px`,
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

                              <h3 className="mb-3 max-w-[303px] font-[EB_Garamond] text-[27px] font-bold leading-[1.02] text-[#003300] sm:mb-4 sm:text-[30px] sm:leading-[24px] lg:text-[32px] lg:leading-[27px]">
                                {card.title}
                              </h3>

                              <p className="max-w-[262px] font-[Geist] text-[14px] font-medium leading-[1.1] text-[#003300]/50 sm:text-[15px] lg:text-[16px] lg:leading-[16px]">
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
                      <Image
                        src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                        alt="RNJ Advisory"
                        fill
                        className="object-contain object-left"
                      />
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
                      <Image
                        src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                        alt="RNJ Advisory"
                        fill
                        className="object-contain object-left"
                      />
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

            <section className="w-full bg-[#F7FCFF] pb-10 pt-6 md:pb-12 md:pt-8 lg:pb-16 lg:pt-10">
              <div className="mx-auto grid w-full max-w-[1157px] grid-cols-1 gap-4 px-4 sm:px-5 md:px-6 lg:grid-cols-2 lg:gap-5 lg:px-8 xl:gap-[19px] xl:px-0">
                <article className="relative min-h-[540px] overflow-hidden rounded-[25px] sm:min-h-[620px] md:min-h-[760px] md:rounded-[35px] lg:min-h-[816px]">
                  <Image
                    src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334018/rnj/mask-group-16-f5d02d69.svg"
                    alt="Interconnexion électrique Tunisie-Italie"
                    fill
                    className="object-cover"
                    unoptimized
                  />

                  <div className="relative z-[1] flex min-h-full flex-col items-center px-4 py-6 sm:px-5 sm:py-8 md:px-6 md:pb-10 md:pt-12 lg:px-8 lg:pb-[58px] lg:pt-[64px]">
                    <div className="flex w-full max-w-[505px] flex-col items-center gap-[17px]">
                      <div className="flex w-full flex-col items-center gap-2 md:gap-[8px]">
                        <div
                          className="relative h-[clamp(360px,78vw,533px)] w-full cursor-pointer select-none overflow-hidden rounded-[18px] text-white transition-[transform,box-shadow,background-color,border-color] duration-500 ease-out"
                          onMouseEnter={() => setIsInterconnectionCardActive(true)}
                          onMouseLeave={() => setIsInterconnectionCardActive(false)}
                          onTouchStart={triggerInterconnectionCardTouchFeedback}
                          style={{
                            width: '100%',
                            maxWidth: '505px',
                            height: 'clamp(360px,78vw,533px)',
                            background: isInterconnectionReadMoreOpenState
                              ? 'rgba(255, 255, 255, 0.22)'
                              : 'rgba(255, 255, 255, 0.14)',
                            boxShadow: isInterconnectionReadMoreOpenState
                              ? '0px 16px 40px rgba(0, 0, 0, 0.52)'
                              : '2px 4px 22.3px rgba(0, 0, 0, 0.6)',
                            border: isInterconnectionReadMoreOpenState
                              ? '1px solid rgba(255, 255, 255, 0.36)'
                              : '1px solid transparent',
                            transform: isInterconnectionReadMoreOpenState
                              ? 'translateY(-4px) scale(1.006)'
                              : 'translateY(0) scale(1)',
                          }}
                        >
                          <div
                            className="pointer-events-none absolute inset-0 rounded-[18px] transition-opacity duration-500"
                            style={{
                              background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.42) 100%)',
                              opacity: isInterconnectionReadMoreOpenState ? 0.55 : 0.22,
                            }}
                          />

                          <div
                            className="pointer-events-none absolute inset-0 rounded-[18px]"
                            style={{
                              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 65.38%)',
                              opacity: isInterconnectionReadMoreOpenState ? 0.3 : 0.15,
                            }}
                          />

                          <div
                            className="relative z-[1] transition-opacity duration-500"
                            style={{
                              opacity: isInterconnectionReadMoreOpening ? 0.7 : 1,
                              padding: '45px 41px 0 41px',
                            }}
                          >
                            <div className="relative mb-[20px] h-[36px] w-[92px]">
                              <Image
                                src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334020/rnj/image-2-2c9f497b.svg"
                                alt="RNJ Advisory"
                                fill
                                className="object-contain object-left"
                              />
                            </div>

                            <div
                              className="flex flex-col gap-[16px]"
                              style={{
                                width: '380px',
                                maxWidth: '100%',
                              }}
                            >
                              <h3
                                className="font-[Geist] font-normal text-white"
                                style={{
                                  width: '380px',
                                  maxWidth: '100%',
                                  height: '70px',
                                  fontSize: 'clamp(24px, 4.5vw, 32px)',
                                  lineHeight: 'clamp(23px, 4.5vw, 34px)',
                                }}
                              >
                                Interconnexion électrique Tunisie-Italie
                              </h3>

                              <div className="relative max-h-[228px] overflow-hidden">
                                <p
                                  className="font-[Geist] font-normal text-white"
                                  style={{
                                    width: '380px',
                                    maxWidth: '100%',
                                    fontSize: 'clamp(11px, 2.5vw, 14px)',
                                    lineHeight: 'clamp(13px, 2.5vw, 16px)',
                                  }}
                                >
                                  <span className="block">
                                    Étude juridique et institutionnelle pour la mise en
                                    place d&apos;un cadre réglementaire propice à
                                    l&apos;interconnexion électrique entre la Tunisie et
                                    l&apos;Italie, ainsi que la création d&apos;une autorité de
                                    régulation du secteur électrique en Tunisie.
                                  </span>
                                  <span className="block h-2 md:h-3" aria-hidden="true" />
                                  <span className="block font-semibold">Nos interventions :</span>
                                  <span className="block">• Analyse du cadre réglementaire tunisien</span>
                                  <span className="block">• Actualisation des textes réglementaires</span>
                                  <span className="block">• Assistance à la mise en place cadre réglementaire</span>
                                </p>

                                <div
                                  className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(0,0,0,0.96)] via-[rgba(0,0,0,0.72)] to-transparent transition-all duration-500 ${isInterconnectionReadMoreOpening ? 'h-28 md:h-36' : isInterconnectionReadMoreOpenState ? 'h-24 md:h-28' : 'h-16 md:h-20'}`}
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            className={`absolute flex justify-center transition-all duration-500 ${
                              isInterconnectionReadMoreOpening
                                ? 'inset-0 h-full items-start rounded-[18px] pt-[75px]'
                                : 'items-end'
                            }`}
                            style={{
                              width: '505px',
                              height: isInterconnectionReadMoreOpening ? '100%' : '143px',
                              top: isInterconnectionReadMoreOpening ? '0' : '390px',
                              left: 'calc(50% - 505px/2)',
                              background: isInterconnectionReadMoreOpening
                                ? 'rgba(0, 0, 0, 0.20)'
                                : 'rgba(0, 0, 0, 0.10)',
                              backdropFilter: 'blur(8px)',
                              WebkitBackdropFilter: 'blur(8px)',
                              boxShadow: '2px 4px 22.3px rgba(0, 0, 0, 0.6)',
                              borderRadius: isInterconnectionReadMoreOpening ? '18px' : '0 0 18px 18px',
                            }}
                          >
                            <div
                              className={`flex w-[102px] flex-col items-center justify-end transition-all duration-500 ${isInterconnectionReadMoreOpening ? 'h-[95px] pb-0' : 'h-full pb-[16px] md:pb-[20px]'}`}
                              style={{
                                gap: isInterconnectionReadMoreOpening ? '19px' : isInterconnectionReadMoreOpenState ? '25px' : '10px',
                                opacity: isInterconnectionReadMoreOpenState || isInterconnectionReadMoreOpening ? 1 : 0.74,
                                transform: isInterconnectionReadMoreOpenState ? 'translateY(-1px) scale(1.02)' : 'translateY(0) scale(1)',
                              }}
                            >
                              <div
                                className="relative h-[22px] w-[22px] transition-all duration-500"
                                style={{
                                  opacity: isInterconnectionReadMoreOpenState || isInterconnectionReadMoreOpening ? 1 : 0.35,
                                  transform: isInterconnectionReadMoreOpenState || isInterconnectionReadMoreOpening ? 'translateY(0)' : 'translateY(8px)',
                                }}
                              >
                                <Image
                                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334075/rnj/group-67-4180bee4.svg"
                                  alt=""
                                  fill
                                  aria-hidden="true"
                                  className="object-contain"
                                />
                              </div>

                              <button
                                type="button"
                                className="inline-flex h-[48px] w-[114px] items-center justify-center rounded-[120px] bg-white px-0 font-[Geist] text-[11px] font-bold leading-[14px] text-black transition-all duration-500"
                                onClick={openStrategicPopupWithTouchAnimation}
                                onTouchStart={triggerInterconnectionCardTouchFeedback}
                              >
                                En savoir plus...
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                        <div className="flex items-center gap-2">
                          <span className="h-[8px] w-[8px] rounded-full bg-[#ECECEC]" />
                          <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
                          <span className="h-[7px] w-[7px] rounded-full bg-white/30" />
                        </div>

                      <div className="mt-1 flex min-h-[80px] w-full max-w-[280px] flex-col items-center gap-[20px]">
                        <a
                          href="/contact"
                          className="flex h-[45px] w-[200px] max-w-full items-center justify-center rounded-[14px] bg-white px-[24px] py-[14px] font-[Geist] text-[14px] font-bold leading-[18px] text-black whitespace-nowrap"
                        >
                          Sécuriser mon projet
                        </a>

                        <p className="w-full max-w-[280px] text-center font-[Geist] font-medium text-[12px] leading-[16px] text-white/50">
                          &copy; 2026 RNJ Advisory. Tous droits réservés.
                        </p>
                      </div>
                  </div>
                </article>

                <article className="relative min-h-[540px] overflow-hidden rounded-[25px] sm:min-h-[620px] md:min-h-[760px] md:rounded-[35px] lg:min-h-[816px]">
                  <Image
                    src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334022/rnj/mask-group-17-57db8ebe.svg"
                    alt="Decision strategique"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
                  <div className="relative z-[1] flex min-h-full flex-col items-center px-4 py-6 text-white sm:px-5 sm:py-8 md:px-6 md:pb-10 md:pt-12 lg:px-8 lg:pb-[58px] lg:pt-[64px]">
                    <div className="flex w-full max-w-[505px] flex-col items-center gap-[14px] sm:gap-[16px]">
                      <div className="flex w-full items-center gap-[8px]">
                        <span className="h-[8px] w-[8px] rounded-full bg-white" />
                        <span className="font-[Geist] text-[14px] font-bold leading-[1.1] text-white sm:text-[15px] md:text-[16.8333px] md:leading-[18px]">
                          Conseil Stratégique
                        </span>
                      </div>

                      <div
                        className="w-full overflow-hidden rounded-[18px] text-white"
                        style={{
                          background: 'rgba(255, 255, 255, 0.14)',
                          boxShadow: '2px 4px 22.3px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        <div className="flex h-full w-full flex-col px-4 pb-6 pt-4 sm:px-5 sm:pb-7 sm:pt-5 md:px-[21px] md:pb-[26px] md:pt-4">
                          <div className="mx-auto flex w-full max-w-[463px] flex-col items-start gap-6 sm:gap-7 md:gap-[34px]">
                            <div className="relative h-[220px] w-full max-w-[463px] sm:h-[280px] md:h-[349px]">
                              <div className="absolute inset-0 rounded-[13px] bg-[#F7FCFF]" />
                              <Image
                                src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776335427/rnj/optimized/group-65-16f18ed1.webp"
                                alt="Graphique de performance"
                                fill
                                className="rounded-[13px] object-cover"
                              />
                            </div>

                            <div className="flex w-full max-w-[439px] flex-col items-start gap-[10px] md:gap-[13px]">
                              <h3 className="font-[EB_Garamond] text-[24px] font-normal leading-[1.05] text-white sm:text-[28px] md:text-[31.25px] md:leading-[31px]">
                                Certificats d&apos;Attributs Énergétiques
                              </h3>
                              <p className="font-[Geist] text-[13px] font-normal leading-[1.3] text-white/60 sm:text-[14px] md:text-[16px] md:leading-[16px]">
                                RNJ Advisory a contribué à la première phase de
                                l&apos;étude sur la conceptualisation des EAC en
                                Tunisie, avec un atelier organisé à Tunis auprès du
                                Ministère de l&apos;Énergie et des Mines et des
                                parties prenantes.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 flex h-auto w-full max-w-[375px] flex-wrap items-center gap-[10px] sm:h-[53px] sm:flex-nowrap">
                        <button
                          type="button"
                          className="flex h-[53px] w-full items-center justify-center rounded-full border-2 border-[#F7FCFF] px-[26px] py-[19px] font-[Geist] text-[16px] font-medium leading-[16px] text-white whitespace-nowrap transition-all duration-300 hover:bg-[#F7FCFF] hover:text-black sm:w-[140px] sm:px-[53px]"
                          style={{ touchAction: 'manipulation' }}
                          onClick={() => setShowCertificatesPopup(true)}
                        >
                          En savoir plus
                        </button>

                        <a
                          href="/contact"
                          className="flex h-[53px] w-full items-center justify-center rounded-full bg-white px-[28px] py-[19px] font-[Geist] text-[16px] font-bold leading-[16px] text-black whitespace-nowrap sm:w-[225px] sm:px-[34px]"
                          style={{ touchAction: 'manipulation' }}
                        >
                          Sécuriser mon projet
                        </a>
                      </div>

                      <div className="mt-2 w-full max-w-[420px] font-[Geist] text-[14px] font-normal leading-[1.3] text-white/60 sm:text-[15px] md:mt-[24px] md:text-[16px] md:leading-[16px]">
                        Une expertise indépendante au service de décisions
                        stratégiques sécurisées.
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </section>

            <section
              className="relative w-screen overflow-hidden bg-[#fff] py-12 md:py-[94.3px] lg:py-[94.3px]"
              style={{
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
              }}
            >
              <div className="absolute inset-0 bg-[#fff]" />

              <div className="absolute inset-0 block opacity-60 sm:opacity-70 md:opacity-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778052436/rnj/optimized/beautiful-forest-against-the-green-field-at-sunset-2026-03-18-07-47-34-utc-0151df33.jpg"
                  alt=""
                  aria-hidden="true"
                  style={{ position: 'absolute', height: '100%', width: '100%', left: 0, top: 0, right: 0, bottom: 0, objectFit: 'cover', objectPosition: 'center 80%', color: 'transparent' }}
                />
              </div>

              {/* White shadow overlay at top */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 z-[9] h-[320px] sm:h-[420px] md:h-[520px]"
                style={{  
                  background:
                    'linear-gradient(180deg, rgba(255, 255, 255, 1) -5%, rgba(255, 255, 255, 0.58) 28%, rgba(255, 255, 255, 0.28) 52%, rgba(255, 255, 255, 0.08) 72%, rgba(255, 255, 255, 0) 100%)',
                  filter: 'blur(0.4px)',
                }}
              />

              <div className="relative z-[20] w-full">
                <div className="mx-auto w-full max-w-none px-0">
                  <div className="mx-auto mt-16 flex w-full max-w-[776px] flex-col items-center gap-5 px-4 text-center sm:mt-20 sm:gap-6 sm:px-6 md:mt-24 md:gap-[41.6px] md:px-0 lg:mt-28 xl:mt-32">
                    <h2
                      className="w-full max-w-[813px] font-[EB_Garamond] font-semibold tracking-[-0.03em] text-[#003300]"
                      style={{
                        fontSize: 'clamp(26px, 6vw, 83.0753px)',
                        lineHeight: 'clamp(28px, 5.5vw, 68px)',
                      }}
                    >
                      <span className="block">Analyse Institutionnelle &amp; Réglementaire</span>
                    
                    </h2>

                    <p
                      className="max-w-[774px] font-[Geist] font-medium text-[#003300]"
                      style={{ fontSize: 'clamp(13px, 2vw, 16px)', lineHeight: 'clamp(17px, 2.5vw, 19px)', opacity: 0.8 }}
                    >
                      Vous êtes un organisme public, une institution privée, un investisseur ou un bailleur de fonds ?
                      RNJ Advisory vous accompagne dans l’analyse approfondie des environnements institutionnels,
                      juridiques et réglementaires afin de sécuriser vos décisions stratégiques.
                    </p>

                    <Link
                      href="/contact"
                      className="contact-btn inline-flex items-center justify-center rounded-full bg-[#BBCB2E] font-[Geist] font-semibold text-[#003300] shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
                      style={{
                        height: 'clamp(44px, 7vw, 59.85px)',
                        minWidth: 'clamp(140px, 20vw, 195px)',
                        padding: '0 clamp(20px, 3vw, 40px)',
                        fontSize: 'clamp(14px, 2vw, 18px)',
                        lineHeight: 1,
                      }}
                    >
                      Contact
                    </Link>
                  </div>

                  <div
                    className="relative mt-14 md:mt-20 lg:mt-24 xl:mt-28 pb-[4%]"
                    onMouseEnter={() => setIsInstitutionalCarouselPaused(true)}
                    onMouseLeave={() => setIsInstitutionalCarouselPaused(false)}
                    onTouchStart={() => setIsInstitutionalCarouselPaused(true)}
                    onTouchMove={() => setIsInstitutionalCarouselPaused(true)}
                    onTouchEnd={() => setIsInstitutionalCarouselPaused(false)}
                  >
                    <div className="institutional-mobile-shadow pointer-events-none absolute inset-y-0 left-0 right-0 z-[10] md:hidden" />

                    <div
                      className="pointer-events-none absolute inset-y-0 left-0 right-0 z-[10] hidden md:block"
                      style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        boxShadow: '0px 2.01px 44.43px rgba(0, 0, 0, 0.17)',
                      }}
                    />

                    <div
                      className="absolute bottom-0 left-0 top-0 z-[30] hidden xl:block"
                      style={{
                        width: 'max(170px, calc((100vw - 1395.73px) / 2 + 170px))',
                      }}
                    >
                      <div className="group/nav relative h-full w-full">
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/nav:opacity-100"
                          style={{
                            background: 'linear-gradient(90deg, #F9FFC4 0%, rgba(187, 203, 46, 0) 100%)',
                          }}
                        />
                        <button
                          type="button"
                          aria-label="Précédent"
                          onClick={() => scrollInstitutionalCarousel('left')}
                          className="absolute left-6 top-1/2 inline-flex h-[98px] w-[98px] -translate-y-1/2 items-center justify-center opacity-0 transition-opacity duration-300 group-hover/nav:opacity-100 hover:opacity-100"
                        >
                          <Image
                            src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778051878/rnj/optimized/group-444-left-68489dda.svg"
                            alt="Précédent"
                            width={98}
                            height={98}
                            className="h-full w-full"
                            unoptimized
                          />
                        </button>
                      </div>
                    </div>

                    <div
                      className="absolute bottom-0 right-0 top-0 z-[30] hidden xl:block"
                      style={{
                        width: 'max(170px, calc((100vw - 1395.73px) / 2 + 170px))',
                      }}
                    >
                      <div className="group/nav relative h-full w-full">
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/nav:opacity-100"
                          style={{
                            background: 'linear-gradient(270deg, #F9FFC4 0%, rgba(187, 203, 46, 0) 100%)',
                          }}
                        />
                        <button
                          type="button"
                          aria-label="Suivant"
                          onClick={() => scrollInstitutionalCarousel('right')}
                          className="absolute right-6 top-1/2 inline-flex h-[98px] w-[98px] -translate-y-1/2 items-center justify-center opacity-0 transition-opacity duration-300 group-hover/nav:opacity-100 hover:opacity-100"
                        >
                          <Image
                            src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778051879/rnj/optimized/group-444-70554d8f.svg"
                            alt="Suivant"
                            width={98}
                            height={98}
                            className="h-full w-full"
                            unoptimized
                          />
                        </button>
                      </div>
                    </div>

                    <div className="relative z-[20]">
                      <div
                        ref={institutionalCarouselRef}
                        className="relative z-10 mx-auto flex w-full max-w-[1500px] snap-x snap-mandatory flex-nowrap gap-4 overflow-x-auto overflow-y-hidden px-3 py-3 touch-pan-x overscroll-x-contain scroll-smooth sm:px-4 md:gap-5 md:px-6 md:py-4 lg:px-8 xl:gap-[10px] xl:px-[52px] [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                        onScroll={(e) => handleInstitutionalCarouselScroll(e.currentTarget)}
                      >
                        {[...institutionalCarouselCards, ...institutionalCarouselCards].map((card, index) => (
                          <article
                            key={`${card.title}-${index}`}
                            data-institutional-card
                            className="flex w-[94vw] max-w-[1395.73px] shrink-0 snap-start flex-col gap-3 sm:w-[90vw] md:w-[min(94vw,1300px)] md:flex-row md:items-stretch md:gap-5 xl:h-[554px] xl:w-[1395.73px] xl:gap-[28.5px]"
                          >
                          {card.panelFirst ? (
                            <>
                              <div
                                className="flex justify-center rounded-[24px] px-5 py-6 sm:px-6 md:min-h-[554px] md:w-[clamp(320px,36vw,480.51px)] md:flex-none md:rounded-[118.718px_118.714px_118.714px_0px] md:px-[28px] md:py-[56px] lg:px-[32px] lg:py-[70px] xl:w-[480.51px] xl:px-[47px] xl:py-[95px]"
                                style={{ backgroundColor: card.panelBg }}
                              >
                                <div className="flex h-full w-full max-w-none flex-col justify-between md:max-w-[356.49px]">
                                  <div className="flex flex-col gap-[14.18px]">
                                    <h3
                                      className="font-[Geist] font-semibold"
                                      style={{
                                        fontSize: 'clamp(24px, 2.15vw, 31.112px)',
                                        lineHeight: 'clamp(31px, 2.8vw, 40px)',
                                        textTransform: 'capitalize',
                                        color: card.titleColor,
                                      }}
                                    >
                                      {card.title}
                                    </h3>

                                    <p
                                      className="max-w-full font-[Geist] font-medium md:max-w-[265.39px]"
                                      style={{
                                        fontSize: 'clamp(15px, 1.35vw, 19.445px)',
                                        lineHeight: 'clamp(20px, 1.75vw, 25px)',
                                        textTransform: 'capitalize',
                                        color: card.descriptionColor,
                                      }}
                                    >
                                      {card.description}
                                    </p>
                                  </div>

                                  <button
                                    type="button"
                                    className="inline-flex h-[52px] w-full items-center justify-center rounded-[8px] font-[Geist] font-medium sm:h-[56px] md:h-[64px]"
                                    style={{
                                      backgroundColor: card.buttonBg,
                                      color: card.buttonTextColor,
                                      fontSize: 'clamp(14px, 1.4vw, 18px)',
                                      lineHeight: 'clamp(18px, 1.6vw, 22px)',
                                    }}
                                  >
                                    Demander une consultation
                                  </button>
                                </div>
                              </div>

                              <div className="relative h-[240px] overflow-hidden rounded-[22px] md:h-[554px] md:min-w-0 md:flex-1 md:rounded-none xl:w-[886.72px]">
                                <Image
                                  src={card.image}
                                  alt={card.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="relative h-[240px] overflow-hidden rounded-[22px] md:h-[554px] md:min-w-0 md:flex-1 md:rounded-none xl:w-[886.72px]">
                                <Image
                                  src={card.image}
                                  alt={card.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              <div
                                className="flex justify-center rounded-[24px] px-5 py-6 sm:px-6 md:min-h-[554px] md:w-[clamp(320px,36vw,480.51px)] md:flex-none md:rounded-[118.718px_118.714px_118.714px_0px] md:px-[28px] md:py-[56px] lg:px-[32px] lg:py-[70px] xl:w-[480.51px] xl:px-[47px] xl:py-[95px]"
                                style={{ backgroundColor: card.panelBg }}
                              >
                                <div className="flex h-full w-full max-w-none flex-col justify-between md:max-w-[356.49px]">
                                  <div className="flex flex-col gap-[14.18px]">
                                    <h3
                                      className="font-[Geist] font-semibold"
                                      style={{
                                        fontSize: 'clamp(24px, 2.15vw, 31.112px)',
                                        lineHeight: 'clamp(31px, 2.8vw, 40px)',
                                        textTransform: 'capitalize',
                                        color: card.titleColor,
                                      }}
                                    >
                                      {card.title}
                                    </h3>

                                    <p
                                      className="max-w-full font-[Geist] font-medium md:max-w-[265.39px]"
                                      style={{
                                        fontSize: 'clamp(15px, 1.35vw, 19.445px)',
                                        lineHeight: 'clamp(20px, 1.75vw, 25px)',
                                        textTransform: 'capitalize',
                                        color: card.descriptionColor,
                                      }}
                                    >
                                      {card.description}
                                    </p>
                                  </div>

                                  <button
                                    type="button"
                                    className="inline-flex h-[52px] w-full items-center justify-center rounded-[8px] font-[Geist] font-medium sm:h-[56px] md:h-[64px]"
                                    style={{
                                      backgroundColor: card.buttonBg,
                                      color: card.buttonTextColor,
                                      fontSize: 'clamp(14px, 1.4vw, 18px)',
                                      lineHeight: 'clamp(18px, 1.6vw, 22px)',
                                    }}
                                  >
                                    Demander une consultation
                                  </button>
                                </div>
                              </div>
                            </>
                          )}
                        </article>
                      ))}

                      {/* Pagination dots */}
                      <div className="relative z-[25] mx-auto mt-6 flex w-full items-center justify-center gap-3 sm:gap-4 md:gap-5">
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
                              carousel.scrollTo({ left: step * dotIndex, behavior: 'smooth' });
                            }}
                            className={`h-[10px] w-[10px] rounded-full border-2 transition-all duration-300 sm:h-[12px] sm:w-[12px] md:h-[14px] md:w-[14px] ${
                              activeInstitutionalSlide === dotIndex
                                ? 'scale-125 border-[#003300] bg-[#003300]'
                                : 'scale-100 border-[#003300]/40 bg-transparent hover:border-[#003300]/70'
                            }`}
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
              className="relative -mt-8 w-screen overflow-hidden bg-[#003300] pb-4 pt-10 sm:-mt-10 sm:pt-12 md:-mt-14 md:pt-16 lg:-mt-[120px] lg:pb-0 lg:pt-20"
              style={{
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
              }}
            >
              <div className="mx-auto w-full px-4">
                <div
                  className="mx-auto mt-10 grid w-full max-w-[1299.66px] grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:mt-16 md:grid-cols-2 lg:mt-20 xl:mt-[131px] xl:grid-cols-3 xl:gap-[19px]"
                  style={{ filter: 'drop-shadow(0px 4px 47.1px rgba(0, 0, 0, 0.09))' }}
                >
                  <article
                    className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[24px] bg-[#D9D9D9] transition-all duration-500 sm:min-h-[390px] md:min-h-[420px] md:rounded-[30px] lg:min-h-[450px] xl:rounded-[34.8794px]"
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
                      <Image
                        src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334038/rnj/jakub-zerdzicki-yknibjv0rby-unsplash-1-1b22cd9c.svg"
                        alt="ESG et financements"
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="flex flex-1 flex-col bg-[#A2B144] px-5 py-5 sm:px-6 md:px-[33.11px] md:pt-[15px]">
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
                    className="relative flex h-full min-h-[360px] flex-col items-center justify-center rounded-[24px] bg-[#F9FFC4] px-5 py-7 text-center transition-all duration-500 sm:min-h-[390px] md:min-h-[420px] md:rounded-[30px] md:px-5 lg:min-h-[450px] lg:px-6 xl:rounded-[34.8794px] xl:px-8"
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
                      href="/services"
                      className="inline-flex h-[50px] items-center justify-center rounded-full bg-[#BBCB2E] px-6 font-[Geist] font-semibold text-[#003300] transition-all duration-500 sm:h-[52px] sm:px-8 xl:h-[56.29px] xl:px-[37px]"
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
                    className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[24px] bg-[#D9D9D9] transition-all duration-500 sm:min-h-[390px] md:col-span-2 md:min-h-[420px] md:rounded-[30px] lg:min-h-[450px] xl:col-span-1 xl:rounded-[34.8794px]"
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
                      <Image
                        src="/optimized/wind-turbines-on-golden-green-field-in-summer-aer-2026-03-24-13-00-37-utc 1.svg"
                        alt="Diagnostic ESG et conformité"
                        fill
                        className="object-cover object-top"
                      />
                    </div>

                    <div className="flex flex-1 flex-col bg-[#CCD862] px-5 py-5 sm:px-6 md:px-[33px] md:pt-[15px]">
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
                  className="map-fade-in map-impact-map-frame relative w-full max-w-[1346px] overflow-visible xl:h-[640.52px]"
                  style={{ height: 'clamp(260px, 46vw, 640.52px)' }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-[28px] md:rounded-[40px]">
                    <Image
                      src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132753/rnj/maps-10375837.svg"
                      alt="World Map"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="pointer-events-none absolute z-[14]" style={{ left: '37.74%', top: '21.70%', width: '14.75%', height: '39.40%' }} aria-hidden>
                    <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310349/rnj/pins-951a2bbe.svg" alt="" fill className="object-contain" />
                  </div>

                  <div className="absolute z-20" style={{ left: '37.74%', top: '21.70%', width: '14.75%', height: '39.40%' }}>
                    {impactCountries.map((country) => {
                      const isActive = activeImpactCountry === country.id;

                      return (
                        <div
                          key={country.id}
                          className="map-pin-button group absolute cursor-pointer appearance-none border-0 bg-transparent p-0 outline-none"
                          style={{
                            ...country.pinStyle,
                            touchAction: 'manipulation',
                            minWidth: '30px',
                            minHeight: '30px',
                          }}
                          aria-label={`Show ${country.name} details`}
                          aria-expanded={isActive}
                          onMouseEnter={() => setActiveImpactCountry(country.id)}
                          onMouseLeave={() => setActiveImpactCountry(null)}
                        >
                        </div>
                      );
                    })}
                  </div>

                  {activeImpactCountryData && (
                    <div
                      className="map-country-card-shell absolute z-30 w-[min(88vw,389px)] max-w-[389px]"
                      style={getImpactPopupVars(activeImpactCountryData)}
                      onMouseEnter={() => setActiveImpactCountry(activeImpactCountryData.id)}
                      onMouseLeave={() => setActiveImpactCountry(null)}
                    >
                      <div
                        className="map-country-card pointer-events-auto w-full px-5 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-[14px] sm:px-7 sm:py-6 md:px-8 md:py-[35px]"
                        style={{
                          background: 'rgba(0, 0, 0, 0.32)',
                          borderRadius: '0 45px 45px 45px',
                        }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <div className="flex flex-col items-start gap-3 sm:gap-5 md:gap-[26px]">
                          <div className="flex flex-col items-start gap-3 sm:gap-5 md:gap-[30px]">
                            <span className="font-[Geist] text-[13px] font-medium leading-[22px] text-white opacity-50">
                              {activeImpactCountryData.years}
                            </span>

                            <div className="flex items-start gap-3 sm:gap-4 md:gap-[29px]">
                              <div
                                className="relative shrink-0 overflow-hidden bg-[#BBCB2E]"
                                style={{
                                  width: `${activeImpactCountryData.miniMapWidth}px`,
                                  height: `${activeImpactCountryData.miniMapHeight}px`,
                                  border: activeImpactCountryData.miniMapBorder,
                                }}
                              >
                                <Image
                                  src={activeImpactCountryData.mapSrc}
                                  alt={activeImpactCountryData.name}
                                  fill
                                  className="object-contain p-1.5 md:p-2"
                                />
                              </div>

                              <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2 md:gap-[5px]">
                                <div className="flex flex-col items-start gap-0.5 sm:gap-1 md:gap-[15px]">
                                  <h3 className="font-[Geist] text-[20px] font-normal leading-[32px] text-white">
                                    {activeImpactCountryData.name}
                                  </h3>
                                  <p className="font-[Geist] text-[32px] font-bold leading-[32px] text-white">
                                    {activeImpactCountryData.projects}
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-[5px]">
                                  {activeImpactCountryData.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="inline-flex h-[22px] items-center justify-center rounded-[70px] bg-white px-[18px] text-[10px] font-normal capitalize text-[#003300] opacity-60"
                                      style={{ fontFamily: 'Geist' }}
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
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
              <div className="mx-auto my-2 w-full max-w-[1393px] px-3 sm:my-3 sm:px-5 md:px-6">
                <div
                  className="grid w-full grid-cols-1 gap-4 sm:gap-[19px] md:grid-cols-2 xl:grid-cols-[334px_334px_minmax(0,1fr)]"
                  style={{ filter: 'drop-shadow(2px 2px 24.5px rgba(0,0,0,0.21))' }}
                >
                {/* Column 1: BECI + Pills */}
                <div className="flex flex-col gap-[23px]">
                  {/* BECI card */}
                  <div className="bento-card bento-d1 relative h-[300px] w-full overflow-hidden rounded-[20px] bg-[#bbcb2e] sm:h-[334px]">
                    <div className="absolute left-1/2 top-1/2 flex h-[230px] w-[min(208px,calc(100%-40px))] -translate-x-1/2 -translate-y-1/2 flex-col items-start rounded-[30px] bg-white px-[18px] pt-[27px] shadow-[0_0_43px_-5px_rgba(255,255,255,0.33)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334055/rnj/beci-2-1-241bb936.svg" alt="BECI" className="h-[65px] w-[57px] object-contain" />
                      <p className="mt-[27px] w-full font-[Geist] text-[20px] font-semibold leading-[22px] text-[#003300]">
                        RNJ Advisory membre de BECI
                      </p>
                      <p className="mt-[7px] font-[Geist] text-[11px] font-medium leading-[15px] text-[#003300]">
                        RNJ Advisory membre de BECI
                      </p>
                    </div>
                  </div>

                  {/* Pills card */}
                  <div className="bento-card bento-d2 relative flex min-h-[300px] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[20px] bg-white px-3 py-4 sm:min-h-[334px] sm:px-5">
                    <div className="flex w-full max-w-[272px] items-center gap-[4px]">
                      <div className="flex h-[55.74px] flex-1 items-center justify-center rounded-full border-2 border-[#406640]">
                        <span className="font-[Geist] text-[18px] font-medium text-[#406640] sm:text-[20px]">Conformité</span>
                      </div>
                      <div className="flex h-[55.74px] w-[55.74px] shrink-0 items-center justify-center rounded-full border-2 border-[#BBCB2E]">
                        <span className="text-[#BBCB2E]">→</span>
                      </div>
                    </div>
                    <div className="flex w-full max-w-[272px] items-center gap-[4px]">
                      <div className="flex h-[55.74px] w-[55.74px] shrink-0 items-center justify-center rounded-full border-2 border-[#406640]">
                        <span className="text-[#406640]">←</span>
                      </div>
                      <div className="flex h-[55.74px] flex-1 items-center justify-center rounded-full bg-[#406640]">
                        <span className="font-[Geist] text-[18px] font-medium text-[#DDE597] sm:text-[20px]">Décision</span>
                      </div>
                    </div>
                    <div className="flex w-full max-w-[272px] items-center gap-[4px]">
                      <div className="flex h-[55.74px] flex-1 items-center justify-center rounded-full border-2 border-[#406640]">
                        <span className="font-[Geist] text-[18px] font-medium text-[#406640] sm:text-[20px]">Analyse</span>
                      </div>
                      <div className="flex h-[55.74px] w-[55.74px] shrink-0 items-center justify-center rounded-full border-2 border-[#BBCB2E]">
                        <span className="text-[#BBCB2E]">→</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Tall photo card */}
                <div className="bento-card bento-d3 relative h-[340px] w-full overflow-hidden rounded-[20px] bg-[#6F6F6F] sm:h-[460px] md:h-[620px] lg:h-[691px]">
                  <Image
                    src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778051883/rnj/optimized/group-352-3-8e109b3c.svg"
                    alt=""
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 334px, 100vw"
                    className="object-cover object-center"
                  />
                </div>

                {/* Column 3: responsive sub-grid */}
                <div className="grid grid-cols-1 gap-[23px] sm:grid-cols-2 sm:gap-x-[19px] sm:gap-y-[23px] md:col-span-2 xl:col-span-1">
                  {/* Yoga blurred */}
                  <div className="bento-card bento-d4 relative h-[300px] w-full overflow-hidden rounded-[20px] sm:h-[334px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778051889/rnj/optimized/group-363-1-a0d0a075.svg" alt="" className="h-full w-full object-cover" />
                  </div>

                  {/* Belgique card */}
                  <div className="bento-card bento-d5 relative h-[300px] w-full overflow-hidden rounded-[20px] bg-white sm:h-[334px]">
                    <div
                      className="mt-[30px] flex h-[74px] w-full items-center px-4 sm:px-[23px] transition-all duration-500"
                      style={{ background: `linear-gradient(90deg, #DDE597 ${belgiumSteps[belgiumStep].gradientWidth}, rgba(123,127,84,0.17) 100%)` }}
                    >
                      <div className="flex w-full items-center justify-between gap-3 sm:justify-start sm:gap-[29px]">
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
                    <div className="px-4 pt-5 sm:px-[23px] sm:pt-[34px]">
                      <h3 className="w-full font-[Geist] text-[24px] font-medium leading-[1.05] text-[#003300] sm:text-[36px] sm:leading-[32px] transition-all duration-500">
                        {belgiumSteps[belgiumStep].title}
                      </h3>
                      <p className="mt-2 w-full font-[Geist] text-[14px] font-medium leading-[1.2] text-[#003300]/60 sm:mt-3 sm:text-[16px] sm:leading-[16px] transition-all duration-500">
                        {belgiumSteps[belgiumStep].description}
                      </p>
                    </div>
                  </div>

                  {/* Shifting + Contact stacked */}
                  <div className="flex flex-col gap-[23px]">
                    <div className="bento-card bento-d6 relative min-h-[220px] w-full overflow-hidden rounded-[20px] bg-white p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334060/rnj/group-558-46fa6f2f.svg"
                          alt="Shifting Academy"
                          className="h-[28px] w-[106px] object-contain sm:h-[31px] sm:w-[118px]"
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776389405/rnj/group-349031-1-46313aad.svg"
                          alt=""
                          aria-hidden="true"
                          className="h-[34px] w-[80px] object-contain sm:h-[38px] sm:w-[90px]"
                        />
                      </div>

                      <p className="mt-5 max-w-[300px] font-[Geist] text-[20px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#003300] sm:mt-6 sm:text-[24px] sm:leading-[25px]">
                        RNJ Advisory est certifiée Shifting Academy
                      </p>

                      <div className="mt-5 flex items-center gap-[6px] sm:mt-6">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334061/rnj/e-sdg-print-07-1-af43b2fc.svg" alt="SDG 7" className="h-[34px] w-[34px] sm:h-[36px] sm:w-[36px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334064/rnj/e-sdg-print-08-1-53b17059.svg" alt="SDG 8" className="h-[34px] w-[34px] sm:h-[36px] sm:w-[36px]" />
                      </div>
                    </div>
                    <Link href="/contact" className="bento-card bento-d7 relative flex h-[91px] w-full items-center justify-center gap-[6px] rounded-[20px] bg-[#406640] px-4 sm:px-8 transition-colors hover:bg-[#4a754a]">
                      <div className="flex h-[44px] w-[45px] items-center justify-center rounded-full bg-white">
                        <span className="text-[#003300]">→</span>
                      </div>
                      <div className="flex h-[43px] min-w-[115px] items-center justify-center rounded-full bg-white px-4">
                        <span className="font-[Geist] text-[16px] font-semibold text-[#003300]">Contact</span>
                      </div>
                    </Link>
                  </div>

                  {/* Concentric circles card */}
                  <div className="bento-card bento-d8 relative h-[300px] w-full overflow-hidden rounded-[20px] bg-[#BBCB2E] sm:h-[334px]">
                    <div
                      className="absolute inset-0 rounded-[20px]"
                      style={{ background: 'radial-gradient(50% 61.83% at 50% 50%, #DDE597 60.08%, rgba(123,127,84,0) 100%)' }}
                    />
                    <span className="ring-pulse pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] rounded-full border-[4px] border-white/80 sm:h-[378px] sm:w-[378px]" />
                    <span className="ring-pulse ring-pulse-delay-1 pointer-events-none absolute left-1/2 top-1/2 h-[230px] w-[230px] rounded-full border-[4px] border-white/80 sm:h-[270px] sm:w-[270px]" />
                    <span className="ring-pulse ring-pulse-delay-2 pointer-events-none absolute left-1/2 top-1/2 h-[132px] w-[132px] rounded-full border-[4px] border-white sm:h-[152px] sm:w-[152px]" />
                    <div className="absolute left-1/2 top-1/2 flex h-[74px] w-[74px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#003300] sm:h-[84px] sm:w-[84px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334065/rnj/group-559-aaf6f0b3.svg" alt="" className="h-[36px] w-[36px]" />
                    </div>
                    <div className="float-icon absolute flex h-[51px] w-[51px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DDE597]" style={{ left: '17%', top: '14%', animationDelay: '0s' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334067/rnj/vector-2-8beb62fa.svg" alt="" className="h-[22px] w-[22px]" />
                    </div>
                    <div className="float-icon absolute flex h-[57px] w-[57px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DDE597]" style={{ left: '74%', top: '20%', animationDelay: '0.4s' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334069/rnj/group-2-8d410a01.svg" alt="" className="h-[24px] w-[24px]" />
                    </div>
                    <div className="float-icon absolute flex h-[57px] w-[57px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DDE597]" style={{ left: '73%', top: '66%', animationDelay: '0.8s' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334070/rnj/group-3-ab3adbb8.svg" alt="" className="h-[24px] w-[24px]" />
                    </div>
                    <div className="float-icon absolute flex h-[57px] w-[57px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DDE597]" style={{ left: '15%', top: '70%', animationDelay: '1.2s' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334072/rnj/group-4-c8bc5566.svg" alt="" className="h-[24px] w-[24px]" />
                    </div>
                    <div className="float-icon absolute flex h-[57px] w-[57px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#DDE597]" style={{ left: '51%', top: '89%', animationDelay: '1.6s' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334073/rnj/layer-1-3-08f03874.svg" alt="" className="h-[24px] w-[24px]" />
                    </div>
                  </div>
                </div>
              </div>
              </div>

              {/* Copyright */}
              <p className="mt-[20px] text-center font-[Geist] text-[15.4px] font-medium leading-[21px] text-[#003300] opacity-50">
                © 2026 RNJ Advisory. Tous droits réservés.
              </p>
            </section>

            {/* Ã‰tudes & Analyse RÃ©glementaire Section */}
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
                      <Image
                        src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333987/rnj/light-bulb-1-1-aa32136c.svg"
                        alt="Light bulb - Analyse Réglementaire"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            )}

            <section
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

                      return (
                        <div
                          key={item.question}
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
                              className={`relative h-[11px] w-[22px] shrink-0 ${isExpanded ? 'rotate-180 scale-[1.03]' : 'rotate-0 scale-100'}`}
                            >
                              <Image
                                src={isEmphasized
                                  ? 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334075/rnj/group-67-4180bee4.svg'
                                  : 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334077/rnj/vector-20-25c3631c.svg'}
                                alt={isExpanded ? 'Réduire' : 'Développer'}
                                fill
                                className="object-contain"
                                style={{ opacity: 0.5 }}
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
                      );
                    })}
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col items-center gap-3 sm:gap-[14px]"
                style={{ marginTop: '40px' }}
              >
                <div
                  className={`flex items-center justify-center rounded-full bg-white transition-all duration-[400ms] ${
                    faqLayoutState === 'default'
                      ? 'h-[64px] w-[64px] sm:h-[78px] sm:w-[78px]'
                      : 'h-[78px] w-[78px] border-[4px] border-[#BBCB2E] sm:h-[90px] sm:w-[90px]'
                  }`}
                  style={{ boxShadow: '2px 4px 33.5px rgba(0, 0, 0, 0.12)' }}
                >
                  <div className={`relative transition-all duration-[400ms] ${faqLayoutState === 'default' ? 'h-[22px] w-[22px] sm:h-[26px] sm:w-[26px]' : 'h-[26px] w-[26px] sm:h-[30px] sm:w-[30px]'}`}>
                    <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333875/rnj/vector-18-18cc905b.svg" alt="Question icon" fill className="object-contain" />
                  </div>
                </div>

                <p
                  className="font-[Geist] font-medium text-[#003300]"
                  style={{ fontSize: 'clamp(14px, 3vw, 15px)', lineHeight: '17px', opacity: faqLayoutState === 'default' ? 0.2 : 1, transition: 'opacity 360ms ease' }}
                >
                  Une question ?
                </p>
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
