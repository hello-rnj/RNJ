'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';

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
    projects: '45 Project',
    mapSrc: '/tn-map.svg',
    summary: 'Strategic & Regulatory Advisory',
    description: "RNJ Advisory accompagne des institutions, investisseurs et entrepreneurs en Tunisie dans des projets a forte dimension reglementaire et strategique. Nos interventions couvrent l'analyse institutionnelle, la structuration juridique, la conformite reglementaire ainsi que l'integration des criteres ESG, afin de securiser les projets et garantir leur viabilite a long terme.",
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
    name: 'Moritania',
    years: '2024-2026',
    focusYear: '2026',
    projects: '02 Project',
    mapSrc: '/MR.svg',
    summary: 'Strategic & Regulatory Advisory',
    description: "En Moritania, RNJ Advisory accompagne les acteurs publics et prives sur la structuration institutionnelle, le cadrage juridique et les modeles de gouvernance de projet. Nous aidons a aligner les initiatives d'investissement avec les exigences reglementaires et les objectifs de performance durable.",
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
    projects: '14 Project',
    mapSrc: '/SN.svg',
    summary: 'Strategic & Regulatory Advisory',
    description: "Au Senegal, nous intervenons sur des dossiers a forte valeur strategique: diagnostics institutionnels, analyse des risques reglementaires et assistance a la mise en conformite. Notre objectif est de rendre les projets plus bancables, plus robustes et plus rapides a deployer.",
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
    name: 'Ghana',
    years: '2024-2026',
    focusYear: '2026',
    projects: '05 Project',
    mapSrc: '/GN.svg',
    summary: 'Strategic & Regulatory Advisory',
    description: "Pour les missions au Ghana, RNJ Advisory appuie la conception de cadres d'operation conformes, l'organisation des parties prenantes et l'integration des standards ESG. Nous facilitons la traduction de la strategie en execution operationnelle mesurable.",
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
    name: 'Borkina Faco',
    years: '2024-2026',
    focusYear: '2026',
    projects: '02 Project',
    mapSrc: '/BF.svg',
    summary: 'Strategic & Regulatory Advisory',
    description: "Au Burkina Faso, nous accompagnons la structuration de projets complexes avec un angle legal, institutionnel et de soutenabilite. Nos recommandations couvrent la gouvernance, la conformite et la feuille de route de mise en oeuvre.",
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
    name: 'Negeria',
    years: '2024-2026',
    focusYear: '2026',
    projects: '12 Project',
    mapSrc: '/NE.svg',
    summary: 'Strategic & Regulatory Advisory',
    description: "Au Niger, RNJ Advisory intervient sur la securisation des programmes d'investissement et des partenariats. Nous realisons les analyses juridiques, reglementaires et institutionnelles necessaires pour fiabiliser la decision et reduire les risques d'execution.",
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
    projects: '11 Project',
    mapSrc: '/BJ.svg',
    summary: 'Strategic & Regulatory Advisory',
    description: "Sur les projets en Benin, nous accompagnons la structuration des cadres de gouvernance, la clarte des responsabilites institutionnelles et l'alignement des dispositifs juridiques. L'objectif est de garantir la coherence entre strategie, execution et impact.",
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
    name: 'Congo democratic',
    years: '2024-2026',
    focusYear: '2026',
    projects: '12 Project',
    mapSrc: '/CD.svg',
    summary: 'Strategic & Regulatory Advisory',
    description: "En Republique democratique du Congo, RNJ Advisory soutient les acteurs institutionnels et investisseurs dans la conception de projets durables et conformes. Nos interventions portent sur l'analyse reglementaire, les montages juridiques et les mecanismes de suivi de performance.",
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
    title: 'Choix du statut juridique adapte',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333872/rnj/mask-group-12-bfc180ab.svg',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
  {
    title: 'Faisabilite & plan financier',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333873/rnj/vector-19-81ce45a8.svg',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 140.59,
  },
  {
    title: 'Demarches administratives',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333875/rnj/vector-18-18cc905b.svg',
    iconWidth: 65.55,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
  {
    title: 'Conformite reglementaire',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333876/rnj/mask-group-11-4a32da53.svg',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
];

const servicesFocusCards = [
  {
    title: 'Créer mon entreprise',
    description: "J'ai une idée, je veux me lancer.",
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333878/rnj/mask-group-3-2ece0ef0.svg',
    iconWidth: 67.41,
    iconHeight: 67.41,
  },
  {
    title: 'Consulter un conseil juridique',
    description: "J'ai un projet complexe à sécuriser.",
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333879/rnj/mask-group-4-f2eb00c6.svg',
    iconWidth: 77.59,
    iconHeight: 79.26,
  },
  {
    title: 'Accélérer mon business / Recruter',
    description: "Je veux développer ou recruter à l'international.",
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333881/rnj/mask-group-5-c793fd9f.svg',
    iconWidth: 77,
    iconHeight: 77,
  },
];

const strategicTrustCards = [
  {
    title: 'Cadre européen',
    description: 'Accès aux institutions et aux cadres réglementaires européens.',
  },
  {
    title: 'Expertise locale',
    description: 'Une connaissance approfondie du marché et des acteurs à Bruxelles.',
  },
  {
    title: 'Conseil stratégique',
    description: 'Des solutions juridiques et stratégiques adaptées à vos enjeux.',
  },
];

const institutionalCarouselCards = [
  {
    title: 'Analyse Institutionnelle & Réglementaire',
    description:
      'Études sectorielles (énergie, numérique, santé, environnement), analyses d’impact réglementaire et recommandations alignées avec les législations belges, tunisiennes et européennes.',
    image: '/group527.svg',
    panelBg: '#406640',
    titleColor: '#BFCCBF',
    descriptionColor: '#BFCCBF',
    buttonBg: '#BFCCBF',
    buttonTextColor: '#003300',
    panelFirst: true,
  },
  {
    title: 'Structuration Juridique & Gouvernance',
    description:
      'Choix de la forme juridique (Belgique, Tunisie, international), création, transformation et mise en conformité des sociétés, pactes d’associés, conventions de partenariat et transmission (M&A).',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776335423/rnj/optimized/multinational-company-headquarters-office-with-a-b-2026-01-08-02-30-05-utc-1-bb7b9def.webp',
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
      'Rédaction, revue et négociation de contrats (clients, fournisseurs, partenaires), contrats de prestation, sous-traitance, licences, confidentialité. Réduire les risques et sécuriser la relation commerciale à chaque étape clé.',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776335424/rnj/optimized/business-meeting-2026-01-08-00-07-57-utc-3-971f8e8a.webp',
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
      'Structuration juridique de projets PPP et concessions, appui aux entreprises, collectivités et institutions. Projets liés à l’énergie, aux infrastructures et à l’intérêt général.',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333964/rnj/pexels-henri-mathieu-8348468-1-9eb7df36.svg',
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
      'Audit juridique et compliance, protection des données (RGPD), mise en conformité opérationnelle. Accompagnement sur les appels à projets : analyse d’éligibilité, cadrage juridique, rédaction et sécurisation contractuelle.',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776335425/rnj/optimized/modern-coworking-space-with-comfortable-chairs-and-2026-01-09-00-01-33-utc-2-fc092aaa.webp',
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
      'Surveillance active des évolutions législatives et réglementaires en Belgique, Europe et Tunisie. Alertes sur les impacts potentiels et accompagnement dans l’anticipation des changements.',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333970/rnj/that-makes-it-official-cropped-shot-of-two-uniden-2026-01-09-09-21-38-utc-1-72edb5b8.svg',
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
      "Proximit\u00E9, \u00E9coute active et respect de votre rythme : chez RNJ Advisory, nous mettons l'humain au c\u0153ur de chaque projet. Nous intervenons en fran\u00E7ais, anglais et arabe.",
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
      'Nous nous engageons \u00E0 vous offrir un service professionnel, rapide et s\u00E9curis\u00E9. Nos outils sont con\u00E7us pour r\u00E9duire les temps morts, fluidifier les d\u00E9marches administratives et optimiser vos r\u00E9sultats.',
    titleWidth: '259px',
    boxLeft: '29.35%',
    boxRight: '50.56%',
  },
  {
    title: 'M\u00E9thodologie et durabilit\u00E9',
    description:
      "Notre cadre d'accompagnement structur\u00E9 permet de clarifier les priorit\u00E9s, de construire une base solide, et de d\u00E9ployer votre activit\u00E9 avec agilit\u00E9, automatisation et vision long terme.",
    titleWidth: '259px',
    boxLeft: '50.56%',
    boxRight: '29.35%',
  },
  {
    title: 'Ancrage local et ouverture internationale',
    description:
      'Bas\u00E9s \u00E0 Bruxelles et \u00E0 Tunis, nous accompagnons les porteurs de projet install\u00E9s en Belgique, les entrepreneurs hors UE, les institutions souhaitant structurer ou \u00E9tendre leur impact.',
    titleWidth: '285px',
    boxLeft: '71.78%',
    boxRight: '8.13%',
  },
  {
    title: 'Partenariats strat\u00E9giques avec des acteurs reconnus',
    description:
      "Nous collaborons avec un r\u00E9seau solide d'acteurs publics, priv\u00E9s et associatifs, en Belgique comme en Tunisie.",
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
    description: 'Approche humaine et multilingue.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333975/rnj/layer-1-14-44306fc4.svg',
    iconWidth: 58.33,
    iconHeight: 61.14,
  },
  {
    title: 'Expertise juridique & stratégique',
    description:
      'Expertise en droit public, énergie, stratégie et transformation.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333977/rnj/group-11-5aa17a22.svg',
    iconWidth: 60.38,
    iconHeight: 61.08,
  },
  {
    title: 'Performances & fiabilité',
    description: 'Service rapide, sécurisé et optimisé pour vos performances.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333979/rnj/layer-1-17-4a7f8924.svg',
    iconWidth: 54.62,
    iconHeight: 41.8,
  },
  {
    title: 'Méthodologie et durabilité',
    description: 'Un cadre structuré pour une croissance agile et durable.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333981/rnj/layer-1-16-56e67520.svg',
    iconWidth: 51.95,
    iconHeight: 60.34,
  },
  {
    title: 'Ancrage local et ouverture internationale',
    description: 'Bruxelles & Tunis : un accompagnement local et international.',
    hideIcon: false,
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333983/rnj/layer-1-15-b835edfe.svg',
    iconWidth: 59.77,
    iconHeight: 59.77,
  },
  {
    title: 'Partenariats stratégiques avec des acteurs reconnus',
    description: 'Un réseau de partenaires en Belgique et en Tunisie.',
    hideIcon: true,
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333984/rnj/layer-4-955dc651.svg',
    iconWidth: 83.23,
    iconHeight: 59,
  },
] as const;

const faqItems = [
  {
    question: "À qui s'adressent les services de RNJ Advisory ?",
    answer:
      "Les services de RNJ Advisory s’adressent aux entrepreneurs, PME, ASBL, investisseurs, bailleurs de fonds, institutions publiques et acteurs privés souhaitant structurer, sécuriser ou développer leurs projets dans un cadre clair, conforme et durable.",
  },
  {
    question: 'Dans quels pays intervenez-vous ?',
    answer:
      "RNJ Advisory intervient principalement en Belgique, en Europe, dans la région MENA et en Afrique subsaharienne. Nous accompagnons des projets à dimension locale, transfrontalière ou internationale, selon les enjeux réglementaires, institutionnels et stratégiques de chaque mission.",
  },
  {
    question: 'Quels types de projets accompagnez-vous ?',
    answer:
      "Nous accompagnons des projets de création d’entreprise, de structuration d’activité, de conformité réglementaire, d’études institutionnelles, de développement stratégique, d’accompagnement juridique, de durabilité, ainsi que des projets liés à l’implantation en Belgique et aux partenariats internationaux.",
  },
  {
    question: "Comment se déroule une mission d'analyse réglementaire ?",
    answer:
      "Chaque mission débute par une phase de cadrage afin de comprendre vos objectifs, votre secteur et votre contexte d’intervention. Nous analysons ensuite le cadre juridique et institutionnel applicable, identifions les risques, obligations et opportunités, puis formulons des recommandations structurées, concrètes et directement exploitables.",
  },
  {
    question: 'Avec quels types d’organisations intervenez-vous ?',
    answer:
      "Nous intervenons auprès d’entrepreneurs, de PME, d’ASBL, d’entreprises en croissance, d’institutions publiques, d’organisations privées, d’investisseurs et de bailleurs de fonds. Notre accompagnement s’adapte à la taille de la structure, à son niveau de maturité et à la nature du projet.",
  },
  {
    question: 'Intervenez-vous à l’international ?',
    answer:
      "Oui. Nous intervenons principalement en Europe, dans la région MENA et en Afrique subsaharienne, notamment dans le cadre d’études institutionnelles, de réformes réglementaires, de mise en place de projets, de conseils juridiques, d’accompagnement de porteurs de projet hors UE et d’engagement de personnel hors UE.",
  },
  {
    question: 'Comment débute une mission ?',
    answer:
      "Chaque mission commence par un échange de cadrage destiné à clarifier vos besoins, vos priorités et le contexte du projet. À l’issue de cette étape, nous définissons le périmètre d’intervention, la méthodologie, les livrables attendus et le calendrier de réalisation.",
  },
  {
    question: 'Confidentialité et sécurité des données ?',
    answer:
      "La confidentialité fait partie intégrante de notre méthode de travail. Les informations, documents et échanges confiés à RNJ Advisory sont traités avec la plus grande discrétion, dans un cadre sécurisé et professionnel, conformément aux exigences applicables en matière de confidentialité et de protection des données.",
  },
  {
    question: 'Délais d’exécution ?',
    answer:
      "Les délais d’exécution varient selon la nature, la complexité et le niveau d’urgence du projet. Après la phase de cadrage, nous partageons un calendrier clair avec des étapes définies afin d’assurer une exécution rigoureuse, transparente et adaptée à vos impératifs.",
  },
];

const whyChooseGridCards = [
  {
    title: 'Expertise juridique & stratégique',
    description:
      "Notre accompagnement repose sur la rigueur d’un pool d'experts spécialisé en droit public, énergie, stratégie entrepreneuriale, gestion de projet et transformation opérationnelle et digitale.",
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333977/rnj/group-11-5aa17a22.svg',
    iconWidth: 97,
    iconHeight: 97,
    titleWidth: '270px',
    descriptionWidth: '344px',
  },
  {
    title: 'Performances & fiabilité',
    description:
      'Nous nous engageons à vous offrir un service professionnel, rapide et sécurisé. Nos outils sont conçus pour réduire les temps morts, fluidifier les démarches administratives et optimiser vos résultats.',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333979/rnj/layer-1-17-4a7f8924.svg',
    iconWidth: 82,
    iconHeight: 64,
    titleWidth: '178px',
    descriptionWidth: '344px',
  },
  {
    title: 'Méthodologie et durabilité',
    description:
      'Notre cadre d’accompagnement structuré permet de clarifier les priorités, de construire une base solide, et de déployer votre activité avec agilité, automatisation et vision long terme.',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333986/rnj/layer-1-18-c437361a.svg',
    iconWidth: 86,
    iconHeight: 78,
    titleWidth: '270px',
    descriptionWidth: '368px',
  },
  {
    title: 'Accompagnement humain, multilingue & engagé',
    description:
      'Proximité, écoute active et respect de votre rythme : chez RNJ Advisory, nous mettons l’humain au cœur de chaque projet. Nous intervenons en français, anglais et arabe.',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333975/rnj/layer-1-14-44306fc4.svg',
    iconWidth: 55,
    iconHeight: 87,
    titleWidth: '326px',
    descriptionWidth: '376px',
  },
  {
    title: 'Ancrage local et ouverture internationale',
    description:
      'Basés à Bruxelles et à Tunis, nous accompagnons les porteurs de projet installés en Belgique, les entrepreneurs hors UE, les institutions souhaitant structurer ou étendre leur impact.',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333983/rnj/layer-1-15-b835edfe.svg',
    iconWidth: 52,
    iconHeight: 75,
    titleWidth: '310px',
    descriptionWidth: '344px',
  },
  {
    title: 'Partenariats stratégiques avec des acteurs reconnus',
    description:
      'Nous collaborons avec un réseau solide d’acteurs publics, privés et associatifs, en Belgique comme en Tunisie.',
    icon: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333981/rnj/layer-1-16-56e67520.svg',
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
              <button
                type="button"
                className="flex h-[68px] w-full items-center justify-center rounded-[82.6547px] border-[2.48019px] border-[#003300] px-8 text-center font-[Geist] font-semibold text-[#003300] text-[clamp(18px,2vw,25.1616px)] leading-[25px] transition-colors hover:bg-[#003300] hover:text-[#F7FCFF] sm:h-[84.49px] sm:w-auto sm:px-[60px] lg:h-[72px] lg:min-w-[210px] lg:px-10 lg:text-[20px] lg:leading-[22px] 2xl:h-[84.49px] 2xl:w-[254.77px] 2xl:min-w-0 2xl:px-0 2xl:text-[25.1616px] 2xl:leading-[25px]"
                style={{ touchAction: 'manipulation' }}
              >
                En savoir plus
              </button>

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
    title: 'Entrepreneurs Hors Union Européenne Installation en Belgique',
    description:
      "Vous êtes ressortissant hors Union européenne et souhaitez développer votre activité en Belgique ? RNJ Advisory vous accompagne à chaque étape de votre installation afin de sécuriser votre projet sur les plans juridique, stratégique et administratif.",
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
      "Vous êtes indépendant ou envisagez de lancer votre activité ? RNJ Advisory vous accompagne dès la phase de conception afin de structurer votre projet sur des bases juridiques solides et économiquement viables. Notre objectif : transformer votre idée en une activité conforme, crédible et prête à se développer durablement.",
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
      "Vous dirigez une PME ou une ASBL en phase de développement ? Votre croissance nécessite une structuration solide et une gestion conforme aux exigences réglementaires ? RNJ Advisory vous accompagne afin de professionnaliser votre organisation, sécuriser vos opérations et soutenir une expansion maîtrisée.",
    bg: '#C1CB82',
    imageBg: '#D9D9D9',
    imageClassName: 'xl:object-cover xl:object-center xl:scale-[1.06]',
    textColor: '#003300',
    buttonOutlineColor: '#003300',
    buttonFilledBg: '#003300',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776335426/rnj/optimized/group-541-2-59ca9193.webp',
  },
];

function EntrepreneuriatTabsSection({ onOpenBooking }: { onOpenBooking: () => void }) {
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
      className="w-full bg-white pb-10 pt-12 sm:pt-16 md:pb-14 md:pt-20 lg:pt-24 xl:pt-32"
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
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="inline-flex h-[51.19px] w-full items-center justify-center rounded-full px-6 font-[Geist] font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto sm:min-w-[195px] sm:px-[28px]"
                    style={{
                      backgroundColor: active.buttonFilledBg,
                      fontSize: '15.52px',
                      lineHeight: '16px',
                    }}
                  >
                    Prendre rendez-vous
                  </button>
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
  const [esgActiveCardIndex, setEsgActiveCardIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [hoveredScrollCardIndex, setHoveredScrollCardIndex] = useState<number | null>(null);
  const [hoveredFaqIndex, setHoveredFaqIndex] = useState<number | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [servicesFocusStage, setServicesFocusStage] = useState(0);
  const [isInstitutionalCarouselPaused, setIsInstitutionalCarouselPaused] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const institutionalCarouselRef = useRef<HTMLDivElement | null>(null);
  const activeImpactCountryData = impactCountries.find((country) => country.id === activeImpactCountry) ?? null;

  useEffect(() => {
    const interval = setInterval(() => {
      setServicesFocusStage((current) => (current + 1) % servicesFocusAnimationStates.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEsgActiveCardIndex((current) => (current + 1) % 3);
    }, 1700);

    return () => clearInterval(interval);
  }, []);

  const servicesFocusActiveCount = servicesFocusAnimationStates[servicesFocusStage].activeCount;
  const servicesFocusLineFill = servicesFocusAnimationStates[servicesFocusStage].lineFill;

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const carousel = institutionalCarouselRef.current;
      if (carousel) {
        const deltaSeconds = (now - last) / 1000;
        if (!isInstitutionalCarouselPaused) {
          const loopWidth = carousel.scrollWidth / 2;
          carousel.scrollLeft += 45 * deltaSeconds;

          if (loopWidth > 0 && carousel.scrollLeft >= loopWidth) {
            carousel.scrollLeft -= loopWidth;
          }
        }
      }

      last = now;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInstitutionalCarouselPaused]);

  const scrollInstitutionalCarousel = (direction: 'left' | 'right') => {
    const carousel = institutionalCarouselRef.current;
    if (!carousel) return;

    const firstCard = carousel.querySelector('[data-institutional-card]') as HTMLElement | null;
    const styles = getComputedStyle(carousel);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const cardWidth = firstCard?.getBoundingClientRect().width ?? carousel.clientWidth * 0.9;
    const offset = (cardWidth + gap) * (direction === 'right' ? 1 : -1);
    carousel.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <>
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7FCFF] to-white">
      <Navbar />

      <div className="relative w-full">
        <div className="relative w-full overflow-hidden pb-8 sm:pb-10 md:pb-12 xl:pb-14 min-h-[760px] sm:min-h-[820px] md:min-h-[900px] lg:min-h-[940px] xl:min-h-[983px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776335426/rnj/optimized/bg-1-d0c5568b.webp')",
            }}
          />

          <div
            className="absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[814px] px-4 md:px-0 top-[112px] sm:top-[128px] md:top-[150px] lg:top-[200px] xl:left-[calc(50%-814px/2-199px)] xl:translate-x-0 xl:top-[260px] xl:w-[814px] xl:max-w-none"
          >
            <div className="flex flex-col items-center gap-6 md:gap-10 xl:items-start xl:gap-[59px]">
              <div className="flex flex-col items-center gap-4 md:gap-[31px] xl:items-start xl:gap-[35px]">
                <h1
                  className="text-center xl:text-left font-[EB_Garamond] text-white font-normal leading-[1.1] md:leading-[1] xl:leading-[57px] xl:w-[715.21px]"
                  style={{ fontSize: 'clamp(22px, 5.5vw, 68.6467px)' }}
                >
                  <span className="block whitespace-nowrap">Conseil stratégique pour</span>
                  <span className="block whitespace-nowrap">une performance durable</span>
                </h1>

                <p
                  className="-mt-5 md:-mt-3 xl:-mt-2 text-center xl:text-left font-[Geist] text-white/70 text-[14px] md:text-[16px] font-normal leading-[1.4] md:leading-[20px] max-w-[90%] md:max-w-[814px] xl:w-[618px]"
                >
                  RNJ Advisory s&apos;associe à des organisations visionnaires pour
                  résoudre des défis critiques, optimiser leurs opérations et créer
                  une valeur durable dans un environnement mondial en constante
                  évolution.
                </p>
              </div>

              <div className="relative -mt-1 md:-mt-2 flex flex-col md:flex-row items-center xl:items-start justify-center xl:justify-start gap-3 md:gap-[7.1px] xl:gap-[6.37px] w-full xl:w-[473px] xl:h-[63px]">
                <button
                  className="flex h-[50px] md:h-[60px] xl:h-[63px] w-[229px] md:w-[229px] xl:w-[229px] items-center justify-center rounded-full bg-[#EEF2CA] transition hover:opacity-90"
                  style={{ boxShadow: '2.10047px 4.20093px 22.6px rgba(0, 0, 0, 0.44)' }}
                >
                  <span
                    className="whitespace-nowrap text-center font-[Geist] font-semibold text-[#003300]/50 text-[14px] leading-[16px]"
                  >
                    Découvrir nos services
                  </span>
                </button>

                <button
                  className="flex h-[50px] md:h-[60px] xl:h-[62px] w-[250px] md:w-[250px] xl:w-[228px] items-center gap-2 md:gap-[16px] xl:gap-[18.85px] rounded-full bg-[#BBCB2E] px-3 md:px-[6px] shadow-lg transition hover:opacity-90"
                  style={{
                    boxShadow: '2.10047px 4.20093px 22.6px rgba(0, 0, 0, 0.44)',
                  }}
                >
                  <div className="relative h-[40px] w-[40px] md:h-[46px] md:w-[46px] xl:h-[46px] xl:w-[46px] flex-shrink-0">
                    <div
                      className="absolute h-full w-full rounded-full bg-white left-1 top-0.5"
                    />
                    <div
                      className="absolute flex h-full w-full items-center justify-center left-1 top-0.5"
                    >
                      <Image
                        src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333995/rnj/vector-17-f73f224f.svg"
                        alt="Arrow icon"
                        width={18}
                        height={18}
                        className="md:w-[22px] md:h-[22px]"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                  </div>

                  <span
                    className="-ml-1 whitespace-nowrap text-center font-[Geist] text-[#003300] text-[14px] leading-[16px] font-bold tracking-[-0.02em]"
                  >
                    Contacter un conseiller
                  </span>
                </button>
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
                className="w-[85%] shrink-0 snap-center bg-[rgba(0,0,0,0.004)] shadow-[0px_5px_31.8px_rgba(0,0,0,0.27)] md:w-auto md:shrink md:snap-none md:h-[var(--desktop-h)]"
                style={{ borderRadius: 'clamp(20px, 3.5vw, 50px)', padding: 'clamp(8px, 1vw, 14px)' }}
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
                      src="/group527.svg"
                      alt="Quand la durabilité rencontre la stratégie"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="flex flex-1 flex-col" style={{ width: 'clamp(100px, 23vw, 336px)', gap: 'clamp(4px, 0.9vw, 13px)' }}>
                    <h3 className="font-[Geist] font-medium text-white" style={{ fontSize: 'clamp(15px, 2.25vw, 32px)', lineHeight: 'clamp(17px, 2.4vw, 34px)' }}>
                      Quand la durabilité rencontre la stratégie
                    </h3>
                    <p className="font-[Geist] font-medium text-white/60" style={{ fontSize: 'clamp(11px, 1.15vw, 16px)', lineHeight: 'clamp(14px, 1.4vw, 20px)' }}>
                      Une approche qui transforme les exigences environnementales en leviers de croissance et d&apos;innovation.
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
                className="flex w-[85%] shrink-0 snap-center flex-col items-center justify-center bg-[rgba(0,0,0,0.004)] shadow-[0px_5px_31.8px_rgba(0,0,0,0.27)] md:w-auto md:shrink md:snap-none md:h-[var(--desktop-h)]"
                style={{ borderRadius: 'clamp(18px, 3.5vw, 50px)', padding: 'clamp(14px, 2.5vw, 45px) clamp(14px, 3vw, 48px)' }}
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
                className="flex w-[85%] shrink-0 snap-center flex-col justify-center bg-[rgba(0,0,0,0.004)] shadow-[0px_5px_31.8px_rgba(0,0,0,0.27)] md:w-auto md:shrink md:snap-none md:h-[var(--desktop-h)]"
                style={{ borderRadius: 'clamp(18px, 3.5vw, 50px)', padding: 'clamp(14px, 2vw, 40px) clamp(16px, 2.5vw, 40px)' }}
              >
                <div className="flex max-w-[336px] flex-col" style={{ gap: 'clamp(4px, 0.9vw, 13px)' }}>
                  <h3 className="font-[Geist] font-medium text-white" style={{ fontSize: 'clamp(15px, 2.25vw, 32px)', lineHeight: 'clamp(17px, 2.4vw, 34px)' }}>
                    Une approche claire et structurée
                  </h3>
                  <p className="font-[Geist] font-medium text-white/60" style={{ fontSize: 'clamp(11px, 1.15vw, 16px)', lineHeight: 'clamp(14px, 1.4vw, 20px)' }}>
                    Nous transformons la complexité réglementaire en décisions lisibles et opérationnelles.
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

              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="inline-flex h-[46px] items-center justify-center rounded-[150px] bg-[#BBCB2E] px-7 font-[Geist] text-[16px] font-bold leading-[1.05] text-[#003300] sm:h-[54px] sm:px-9 sm:text-[20px] lg:h-[58px] lg:px-[43px] lg:text-[23.6828px] lg:leading-[25px]"
              >
                Contact
              </button>
            </div>

            <div className="flex w-full max-w-[1395px] flex-col items-center gap-6 text-center sm:gap-8 lg:gap-[48px]">
              <h2 className="font-[EB_Garamond] text-[48px] font-bold leading-[0.84] text-[#003300] sm:text-[64px] lg:text-[96px] xl:text-[128px] xl:leading-[94px]">
                Nos Services
              </h2>

              <p className="max-w-[753px] font-[Geist] text-[14px] font-normal leading-[1.35] text-[#003300]/50 sm:text-[16px] md:text-[18px] lg:text-[20px] lg:leading-[24px]">
                RNJ Advisory s&apos;associe à des organisations visionnaires pour
                résoudre des défis critiques, optimiser leurs opérations et créer
                une valeur durable dans un environnement mondial en constante
                évolution.
              </p>
            </div>

            <div className="flex w-full max-w-[1065.41px] flex-col items-center gap-6 lg:gap-[9px]">
              <div className="relative h-[42px] w-full max-w-[768px] sm:h-[46px]">
                <div className="absolute left-[20px] right-[20px] top-1/2 h-[14px] -translate-y-1/2 rounded-full bg-[#DDE597] sm:left-[24.5px] sm:right-[24.5px] sm:h-[17px]">
                  <div
                    className="h-full rounded-full bg-[#BBCB2E] transition-all duration-500 ease-out"
                    style={{ width: `${servicesFocusLineFill}%` }}
                  />
                </div>

                {[1, 2, 3].map((step, index) => {
                  const isStepActive = servicesFocusStage >= step;
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
          <div
            className="absolute inset-0 hidden 2xl:block"
            style={{
              background:
                'linear-gradient(180deg, rgba(100,115,89,0.04) 0%, rgba(100,115,89,0) 44%, rgba(100,115,89,0.22) 68%, rgba(100,115,89,0.7) 100%)',
            }}
          />

          <div className="relative z-[1] mx-auto flex w-full max-w-[1580px] flex-col px-4 sm:px-6 md:px-8 lg:px-8 xl:px-[70px]">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between xl:gap-[72px]">
              <div className="flex w-full max-w-[779px] flex-col gap-8 lg:gap-10 xl:gap-[66px]">
                <div className="relative h-[30px] w-[225px]">
                  <Image
                    src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334004/rnj/group-1-23b4740e.svg"
                    alt="RNJ Advisory"
                    fill
                    className="object-contain object-left"
                  />
                </div>

                <div className="flex flex-col gap-7 lg:gap-9 xl:gap-[43.92px]">
                  <h2 className="font-[EB_Garamond] text-[34px] font-semibold italic leading-[0.9] tracking-[-0.03em] text-white sm:text-[44px] md:text-[52px] lg:text-[58px] xl:text-[62.7408px] xl:leading-[54px]">
                    Concrétisez vos idées avec un cabinet de conseils juridiques
                    &amp; stratégiques à Bruxelles
                  </h2>

                  <p className="max-w-[567px] font-[Geist] text-[14px] font-medium leading-[1.2] text-white/70 sm:text-[15px] md:text-[16px] md:leading-[17px]">
                    Basé à Bruxelles, au cœur des institutions européennes, nous
                    allions une expertise juridique pointue et une vision
                    stratégique pour accompagner vos projets, de la conception à
                    la réalisation.
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-[9.15px] lg:justify-start">
                  <Link
                    href="/about"
                    className="inline-flex h-[56px] items-center justify-center rounded-[8.23702px] border border-white px-8 font-[Geist] text-[16px] font-semibold leading-[19px] text-white sm:h-[62px] sm:min-w-[135.45px] sm:px-4 sm:text-[18.5699px]"
                  >
                    À propos
                  </Link>

                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(true)}
                    className="inline-flex h-[56px] items-center justify-center rounded-[8.23702px] bg-white px-8 font-[Geist] text-[16px] font-semibold leading-[19px] text-[#181818] sm:h-[61.1px] sm:min-w-[260px] sm:px-4 sm:text-[18.5699px] md:min-w-[311px]"
                  >
                    Demander une consultation
                  </button>
                </div>
              </div>

              <div className="relative mx-auto h-[390px] w-full max-w-[360px] sm:h-[470px] sm:max-w-[430px] md:h-[527px] md:max-w-[462.21px] xl:mx-0 xl:mt-[14px]">
                <Image
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334006/rnj/mask-group-6-f1b1cc88.svg"
                  alt="Partenaires en réunion"
                  fill
                  sizes="(max-width: 768px) 360px, (max-width: 1024px) 430px, 462px"
                  className="object-contain object-center"
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

        <section className="mt-8 w-full bg-[#F7FCFF] py-10 sm:mt-10 sm:py-12 md:mt-12 md:py-14 lg:mt-14 lg:py-16 xl:mt-16">
          <div className="mx-auto w-full max-w-[1395px] px-4 sm:px-6 md:px-8 xl:px-0">
            <div className="h-0 w-full border-b-2 border-[#003300]/10" />
          </div>

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
                  <h2 className="font-[EB_Garamond] text-[38px] font-semibold leading-[0.9] tracking-[-0.03em] text-[#003300] sm:text-[48px] md:text-[62px] lg:text-[72px] lg:leading-[60px] xl:text-[83.0753px] xl:leading-[68px]">
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
                    href="/about"
                    className="inline-flex h-[68px] w-full items-center justify-center rounded-[82.6547px] border-[2.48019px] border-[#003300] px-8 font-[Geist] text-[18px] font-semibold leading-[25px] text-[#003300] sm:h-[84.49px] sm:w-auto sm:min-w-[250px] sm:px-10 xl:text-[25.1616px]"
                  >
                    En savoir plus
                  </Link>

                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(true)}
                    className="inline-flex h-[68px] w-full items-center justify-center rounded-[141.694px] bg-[#003300] px-6 font-[Geist] text-[18px] font-semibold leading-[25px] text-[#F7FCFF] sm:h-[83.04px] sm:w-auto sm:min-w-[340px] sm:px-8 xl:text-[25.1616px]"
                  >
                    Demander une analyse
                  </button>
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] xl:w-[477px] xl:max-w-none">
              <div className="relative h-[390px] w-full sm:h-[500px] md:h-[560px] xl:h-[566.12px]">
                <Image
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776335427/rnj/optimized/frame-559-7811d1b0.webp"
                  alt="Illustration Analyse Réglementaire"
                  fill
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 460px, 477px"
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="h-12 lg:h-16 xl:h-20" />

          <div className="mx-auto mt-10 flex w-full max-w-[1392px] flex-col items-center gap-5 px-4 pb-8 text-center sm:px-6 md:px-8 lg:mt-16 lg:gap-[20px] lg:px-0 lg:pb-[46px] xl:mt-20">
            <div className="relative h-[93.48px] w-[58.69px]">
              <Image
                src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334015/rnj/layer-1-2-1d375d74.svg"
                alt="Light bulb icon"
                fill
                sizes="58.69px"
                className="object-contain"
              />
            </div>

            <h3
              className="max-w-[1006.97px] font-[EB_Garamond] text-[#003300] text-[34px] font-medium leading-[1.02] sm:text-[40px] md:text-[44px] lg:text-[48px] lg:leading-[49px]"
              style={{ transform: 'rotate(0.1deg)' }}
            >
              Des solutions adaptées à chaque étape
            </h3>

            <p
              className="max-w-[1215.08px] font-[Geist] text-[14px] font-medium leading-[17px] text-[#003300]/50 lg:text-[16px]"
              style={{ transform: 'rotate(0.1deg)' }}
            >
              Un accompagnement structuré pour sécuriser vos projets et soutenir
              votre croissance.
            </p>
          </div>
        </section>

        <section className="w-full bg-[#F7FCFF] pb-10 pt-6 md:pb-12 md:pt-8 lg:pb-16 lg:pt-10">
          <div className="mx-auto grid w-full max-w-[1157px] grid-cols-1 gap-4 px-4 md:px-6 lg:grid-cols-2 lg:gap-5 lg:px-8 xl:gap-[19px] xl:px-0">
            <article className="relative overflow-hidden rounded-[25px] md:rounded-[35px] min-h-[560px] sm:min-h-[620px] md:min-h-[760px] lg:min-h-[816px]">
              <Image
                src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334018/rnj/mask-group-16-f5d02d69.svg"
                alt="Interconnexion électrique Tunisie-Italie"
                fill
                className="object-cover"
                unoptimized
              />

              <div className="relative z-[1] flex min-h-full flex-col items-center px-4 py-6 sm:py-8 md:px-6 md:pb-10 md:pt-12 lg:px-0 lg:pb-[58px] lg:pt-[77px]">
                <div className="flex w-full max-w-[505px] flex-col items-center gap-[17px]">
                  <div className="flex w-full flex-col items-center gap-2 md:gap-[8px]">
                    <div
                      className="relative h-[430px] w-full overflow-hidden rounded-[18px] text-white sm:h-[500px] md:h-[533px]"
                      style={{
                        background: 'rgba(255, 255, 255, 0.14)',
                        boxShadow: '2px 4px 22.3px rgba(0, 0, 0, 0.6)',
                      }}
                    >
                      <div className="px-5 pb-[86px] pt-6 sm:px-8 sm:pb-[96px] sm:pt-8 md:px-[41px] md:pb-[104px] md:pt-[45px]">
                        <div className="relative mb-7 h-[20px] w-[84px] md:mb-9 md:h-[44px] md:w-[111px]">
                          <Image
                            src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334020/rnj/image-2-2c9f497b.svg"
                            alt="RNJ Advisory"
                            fill
                            className="object-contain object-left"
                          />
                        </div>

                        <h3 className="mb-6 max-w-[381px] font-[Geist] text-[28px] font-normal leading-[0.98] text-white sm:text-[32px] md:mb-8 md:text-[44px] md:leading-[44px] xl:text-[61.04px] xl:leading-[60px]">
                          Interconnexion électrique Tunisie-Italie
                        </h3>

                        <div className="relative max-h-[176px] overflow-hidden sm:max-h-[184px] md:max-h-[190px]">
                          <p className="max-w-[439px] font-[Geist] text-[13px] font-normal leading-[1.14] text-white md:text-[16px] md:leading-[18px]">
                            <span className="block">
                              Étude juridique et institutionnelle pour la mise en
                              place d’un cadre réglementaire propice à
                              l’interconnexion électrique entre la Tunisie et
                              l’Italie, ainsi que la création d’une autorité de
                              régulation du secteur électrique en Tunisie.
                            </span>
                            <span className="block h-3 md:h-4" aria-hidden="true" />
                            <span className="block">Nos interventions :</span>
                            <span className="block">• Analyse du cadre réglementaire tunisien applicable au secteur de l’électricité et aux énergies renouvelables</span>
                            <span className="block">• Actualisation des textes réglementaires relatifs à la création de l’autorité de régulation du secteur électrique</span>
                            <span className="block">• Assistance à la mise en place d’un cadre réglementaire et contractuel propice à l’exportation d’électricité via ELMED</span>
                          </p>

                          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(71,71,71,0.96)] via-[rgba(71,71,71,0.72)] to-transparent md:h-20" />
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 flex h-[76px] items-center justify-center rounded-b-[18px] bg-[rgba(0,0,0,0.10)] shadow-[2px_4px_22.3px_rgba(0,0,0,0.6)] md:rounded-b-[18px]">
                        <button
                          type="button"
                          className="inline-flex h-[48px] w-[102px] items-center justify-center rounded-[120px] bg-white px-0 font-[Geist] text-[11px] font-bold leading-[14px] text-black"
                          onClick={() => setShowStrategicPopup(true)}
                        >
                          Read more...
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="h-[11.73px] w-[11.73px] rounded-full bg-[#ECECEC]" />
                      <span className="h-[10.16px] w-[10.16px] rounded-full bg-white/30" />
                      <span className="h-[10.16px] w-[10.16px] rounded-full bg-white/30" />
                    </div>
                  </div>

                  <div className="mt-2 flex min-h-[100px] w-full max-w-[317px] flex-col items-center gap-[26px] md:mt-3">
                    <button
                      type="button"
                      onClick={() => setBookingModalOpen(true)}
                      className="flex h-[53px] w-[225px] max-w-full items-center justify-center rounded-[18px] bg-white px-[34px] py-[18px] font-[Geist] text-[16px] font-bold leading-[16px] text-black"
                    >
                      Sécuriser mon projet
                    </button>

                    <p className="w-full max-w-[317px] text-center font-[Geist] font-medium text-[15.3706px] leading-[21px] text-white/50">
                      &copy; 2026 RNJ Advisory. Tous droits réservés.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[25px] md:rounded-[35px]">
              <div className="relative h-[680px] w-full sm:h-[740px] md:h-[760px] lg:h-[816px]">
                <Image
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334022/rnj/mask-group-17-57db8ebe.svg"
                  alt="Decision strategique"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-between p-4 text-white md:p-6 lg:p-8">
                <div>
                  <div className="mb-4 flex items-center gap-[7px] md:mb-6">
                    <span className="h-[8px] w-[8px] rounded-full bg-white" />
                    <span
                      className="font-[Geist] font-bold text-white"
                      style={{ fontSize: '16.8333px', lineHeight: '18px' }}
                    >
                      Conseil Stratégique
                    </span>
                  </div>

                  <div
                    className="relative mx-auto mt-4 w-full max-w-[368px] overflow-hidden rounded-[18px] text-white md:mt-[34px] md:max-w-[392px]"
                    style={{
                      background: 'rgba(255, 255, 255, 0.14)',
                      boxShadow: '2px 4px 22.3px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    <div className="px-4 pb-[86px] pt-4 md:px-5 md:pb-[96px] md:pt-5">
                      <div className="relative mb-5 h-[170px] w-full overflow-hidden rounded-[13px] bg-[#F7FCFF] md:mb-6 md:h-[250px]">
                        <Image
                          src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776335427/rnj/optimized/group-65-16f18ed1.webp"
                          alt="Graphique de performance"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <h3 className="mb-4 font-[EB_Garamond] text-[24px] font-normal leading-[1.02] text-white md:text-[31.25px] md:leading-[31px]">
                        Des projets accompagnés sécurisés dès la phase de
                        structuration
                      </h3>

                      <p className="font-[Geist] text-[14px] font-normal leading-[1.25] text-white/60 md:text-[16px] md:leading-[16px]">
                        Nous analysons, structurons et sécurisons vos projets
                        dans des environnements réglementaires complexes.
                      </p>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-[72px] rounded-b-[18px] bg-[rgba(0,0,0,0.10)] shadow-[2px_4px_22.3px_rgba(0,0,0,0.6)] md:h-[76px]" />
                  </div>
                </div>

                <div className="pt-6 md:pt-8">
                  <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-[10px] lg:justify-start">
                    <button
                      type="button"
                      className="inline-flex h-[52px] w-full items-center justify-center rounded-full border-2 border-white px-6 text-center font-[Geist] text-[15px] font-medium leading-[16px] text-white sm:w-auto sm:min-w-[190px] sm:px-8 md:h-[53px] md:min-w-[220px] md:px-10 md:text-[16px] lg:min-w-0 lg:px-[53px]"
                      style={{ touchAction: 'manipulation' }}
                      onClick={() => setShowCertificatesPopup(true)}
                    >
                      En savoir plus
                    </button>

                    <button
                      type="button"
                      onClick={() => setBookingModalOpen(true)}
                      className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-white px-6 text-center font-[Geist] text-[15px] font-bold leading-[16px] text-black sm:w-auto sm:min-w-[210px] sm:px-8 md:h-[53px] md:min-w-[235px] md:px-8 md:text-[16px] lg:min-w-0 lg:px-[34px]"
                      style={{ touchAction: 'manipulation' }}
                    >
                      Sécuriser mon projet
                    </button>
                  </div>

                  <p className="mt-4 max-w-[420px] font-[Geist] text-[14px] font-normal leading-[1.25] text-white/60 md:mt-5 md:text-[16px] md:leading-[16px]">
                    Une expertise indépendante au service de décisions
                    stratégiques sécurisées.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Section Indépendants & porteurs de projet */}
        <section className="w-full bg-[#F7FCFF] py-12 md:py-24">
          <div className="mx-auto flex w-full max-w-[1157px] flex-col items-center gap- px-4 md:px-6 lg:px-8 xl:px-0">
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
                    className="rounded-full bg-[#BBCB2E] px-6 md:px-[43px] py-3 md:py-4 font-[Geist] font-bold text-[#003300] text-[16px] md:text-[24px]"
                  >
                    Contact
                  </button>
                </div>

                <div className="flex flex-col items-center gap-6 md:gap-[41px] text-center">
                  <h2 className="max-w-[95%] sm:max-w-[90%] md:max-w-[824px] font-[EB_Garamond] font-extrabold text-[#003300] text-[32px] sm:text-[44px] md:text-[70px] lg:text-[100px] leading-[1.05] md:leading-[0.9]">
                    Indépendants &amp; porteurs de projet
                  </h2>

                  <p className="max-w-[95%] sm:max-w-[92%] md:max-w-[998px] font-[Geist] font-medium text-[#003300] text-[14px] sm:text-[16px] md:text-[20px] lg:text-[24px] leading-[1.5] md:leading-[1.4] opacity-50">
                    Vous êtes indépendant ou envisagez de lancer votre activité ?
                    Vous souhaitez structurer votre projet sur des bases solides,
                    sécurisées et durables ? RNJ Advisory vous accompagne dans la
                    transformation de votre idée en une activité juridiquement
                    conforme, économiquement viable et prête à se développer.
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
          </div>
        </section>

        <section className="hidden w-full bg-[#F7FCFF] py-10 md:block md:py-12 lg:py-14">
          <div className="mx-auto w-full px-0">
            <div className="mb-8 flex flex-col gap-3 px-4 md:mb-10 md:px-6 lg:px-8">
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

            <div className="relative overflow-hidden py-6 md:py-8 2xl:h-[512px]">
              <div className="relative z-[1] hidden h-full overflow-hidden 2xl:block">
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
                          className="flex h-[304px] w-[308.02px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-[10px] px-5 text-center transition-all duration-300"
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
                              style={{ width: `${card.iconWidth}px`, height: `${card.iconHeight}px` }}
                            >
                              <Image
                                src={card.icon}
                                alt={card.title}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}

                          <h3 className="mb-4 max-w-[303px] font-[EB_Garamond] text-[32px] font-bold leading-[27px] text-[#003300]">
                            {card.title}
                          </h3>

                          <p className="max-w-[262px] font-[Geist] text-[16px] font-medium leading-[16px] text-[#003300]/50">
                            {card.description}
                          </p>
                        </article>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-8 w-full max-w-[1680px] px-0">
              <p
                className="max-w-[892px] px-4 font-[Geist] text-[15px] font-semibold leading-[17px] text-[#003300]/50 md:px-6 md:text-[16px] md:leading-[18px] lg:px-8"
              >
                Choisir RNJ Advisory, c&apos;est bénéficier d&apos;une approche
                structurée, indépendante et orientée résultats. Nous combinons
                analyse juridique, compréhension institutionnelle et vision
                stratégique afin de vous aider à anticiper les risques, assurer
                la conformité de vos projets et prendre des décisions éclairées.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#F7FCFF] pb-10 pt-2 md:pb-12 md:pt-4 lg:pb-14">
          <div className="mx-auto w-full max-w-[1680px] px-0">
            <div className="relative min-h-[620px] overflow-hidden bg-[#003300] md:min-h-[680px] lg:h-[760px]">
              <Image
                src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334026/rnj/group-349040-b40f156d.svg"
                alt=""
                fill
                className="object-cover object-center"
                unoptimized
                priority={false}
              />

              <div className="absolute inset-0 bg-[#003300]/40" />

              <div className="relative z-[1] mx-auto flex h-full w-full max-w-[1392px] flex-col justify-between px-4 py-8 md:px-6 md:py-12 lg:px-[20px] lg:py-[80px]">
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

                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(true)}
                    className="inline-flex h-[38px] w-fit shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[#BBCB2E] px-[14px] font-[Geist] font-semibold text-[#003300] transition-colors hover:bg-[#D4E175] sm:h-[50px] sm:px-[32px] lg:translate-x-[10px] lg:px-[38px]"
                    style={{ fontSize: 'clamp(12px, 2.5vw, 22.5px)', lineHeight: 1 }}
                  >
                    Contact
                  </button>
                </div>

                <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
                  <div className="flex max-w-[920px] flex-col gap-10">
                    <p
                      className="max-w-[520px] font-[Geist] font-semibold text-white/50"
                      style={{ fontSize: 'clamp(13px, 2.5vw, 16px)', lineHeight: 1.25 }}
                    >
                      Nous analysons votre environnement institutionnel et
                      réglementaire afin de sécuriser vos décisions et garantir
                      la conformité de vos projets.
                    </p>

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
                  </div>

                  <div className="w-fit self-start lg:ml-auto lg:self-end lg:translate-x-[10px]">
                    <p
                      className="mb-4 text-right font-[Geist] font-normal text-[#7C9780]"
                      style={{ fontSize: 'clamp(14px, 2.5vw, 23px)', lineHeight: 1.1 }}
                    >
                      RNJ Advisory
                    </p>

                    <div className="relative h-[160px] w-[160px] overflow-hidden rounded-[16px] border-2 border-[#BBCB2E] sm:h-[210px] sm:w-[210px] sm:rounded-[20px] md:h-[240px] md:w-[240px] md:rounded-[24px] lg:h-[280px] lg:w-[280px] lg:rounded-[28px]">
                      <Image
                        src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333996/rnj/openai-jake-stangel-1-c442a239.svg"
                        alt="Portrait entrepreneuriat"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <EntrepreneuriatTabsSection onOpenBooking={() => setBookingModalOpen(true)} />

            {showStrategicPopup && (
              <div
                className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 px-4 py-6"
                onClick={() => setShowStrategicPopup(false)}
              >
                <div
                  className="relative flex max-h-[90vh] w-full max-w-[1323px] flex-col overflow-hidden rounded-[32px] bg-black/35 shadow-[0px_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-[16px] md:rounded-[60px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    aria-label="Fermer"
                    className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10 hover:text-white md:right-7 md:top-7"
                    onClick={() => setShowStrategicPopup(false)}
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

                      <p className="font-[Geist] font-normal text-white text-[16px] leading-[1.18] sm:text-[18px] md:text-[24px] md:leading-[1.12] lg:text-[32px]">
                        <span className="block">
                          Étude juridique et institutionnelle pour la mise en place
                          d’un cadre réglementaire propice à l’interconnexion
                          électrique entre la Tunisie et l’Italie, ainsi que la
                          création d’une autorité de régulation du secteur
                          électrique en Tunisie.
                        </span>
                        <span className="block h-4 md:h-5 lg:h-6" aria-hidden="true" />
                        <span className="block">Nos interventions :</span>
                        <span className="block">• Analyse du cadre réglementaire tunisien applicable au secteur de l’électricité et aux énergies renouvelables</span>
                        <span className="block">• Actualisation des textes réglementaires relatifs à la création de l’autorité de régulation du secteur électrique</span>
                        <span className="block">• Assistance à la mise en place d’un cadre réglementaire et contractuel propice à l’exportation d’électricité via ELMED</span>
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col items-start gap-4 md:mt-10">
                      <button
                        type="button"
                        onClick={() => { setShowStrategicPopup(false); setBookingModalOpen(true); }}
                        className="inline-flex h-[68px] items-center justify-center rounded-full bg-white px-10 font-[Geist] text-[20px] font-medium text-black transition hover:opacity-90 md:h-[97px] md:px-[72px] md:text-[24px]"
                      >
                        Contact
                      </button>
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
                      <button
                        type="button"
                        onClick={() => { setShowCertificatesPopup(false); setBookingModalOpen(true); }}
                        className="inline-flex h-[68px] items-center justify-center rounded-full bg-white px-10 font-[Geist] text-[20px] font-medium text-black transition hover:opacity-90 md:h-[97px] md:px-[72px] md:text-[24px]"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <article
              className="grid w-full max-w-[1392px] grid-cols-1 gap-[24px] rounded-[20px] bg-[#F7FCFF] p-[12px] md:gap-[30px] md:rounded-[40px] md:p-[15px] 2xl:h-[811px] 2xl:grid-cols-[672px_minmax(0,1fr)]"
              style={{ boxShadow: '2px 4px 28.3px rgba(0, 0, 0, 0.17)' }}
            >
              <div className="relative order-2 min-h-[320px] overflow-hidden rounded-[18px] md:min-h-[520px] md:rounded-[25px] 2xl:order-1 2xl:h-[781px]">
                <Image
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334031/rnj/mask-group-18-c3bd04c7.svg"
                  alt="Accélération PME et ASBL"
                  fill
                  className="object-cover object-center"
                />
              </div>

              <div className="order-1 flex flex-col px-4 py-6 md:px-6 md:py-9 2xl:order-2 2xl:px-0 2xl:py-[56px]">
                <div className="flex h-full w-full flex-col gap-8 2xl:gap-[36px]">
                  <div className="flex items-center gap-2.5">
                    <span className="h-[8px] w-[8px] rounded-full bg-[#003300] md:h-[9.33px] md:w-[9.33px]" />
                    <span
                      className="font-[Geist] font-semibold text-[#003300]"
                      style={{ fontSize: '20px', lineHeight: '24px' }}
                    >
                      Entrepreneuriat
                    </span>
                  </div>

                  <div className="flex h-full flex-col justify-between gap-10 2xl:gap-[126px]">
                    <div className="flex flex-col gap-8 2xl:max-w-[637px] 2xl:gap-[45px]">
                      <h3
                        className="max-w-[590px] font-[EB_Garamond] font-semibold text-[#003300]"
                        style={{
                          fontSize: 'clamp(34px, 5vw, 64px)',
                          lineHeight: 'clamp(36px, 4.8vw, 56px)',
                          textTransform: 'capitalize',
                        }}
                      >
                        Accélération PME &amp; ASBL Recrutement International &amp; Croissance
                      </h3>

                      <div className="flex max-w-[435px] flex-col gap-[25px]">
                        {/* Each question on its own line with a green highlight that ends at the text length */}
                        <div className="flex flex-col gap-[6px] md:gap-[7.26px]">
                          <span
                            className="w-fit max-w-full whitespace-nowrap font-[Geist] font-semibold text-[#003300]"
                            style={{
                              fontSize: 'clamp(11px, 2.3vw, 16px)',
                              lineHeight: 'clamp(20px, 4vw, 28px)',
                              opacity: 0.85,
                              backgroundImage: 'linear-gradient(transparent 55%, #BBCB2E 55%, #BBCB2E 92%, transparent 92%)',
                              paddingLeft: '4px',
                              paddingRight: '4px',
                            }}
                          >
                            Vous êtes une PME ou une Asbl en croissance ?
                          </span>
                          <span
                            className="w-fit max-w-full whitespace-nowrap font-[Geist] font-semibold text-[#003300]"
                            style={{
                              fontSize: 'clamp(11px, 2.3vw, 16px)',
                              lineHeight: 'clamp(20px, 4vw, 28px)',
                              opacity: 0.85,
                              backgroundImage: 'linear-gradient(transparent 55%, #BBCB2E 55%, #BBCB2E 92%, transparent 92%)',
                              paddingLeft: '4px',
                              paddingRight: '4px',
                            }}
                          >
                            Vous souhaitez recruter des talents hors UE ?
                          </span>
                        </div>

                        <p
                          className="max-w-[424px] pl-[11px] font-[Geist] font-medium text-[#003300]"
                          style={{ fontSize: 'clamp(13px, 2.2vw, 16px)', lineHeight: 'clamp(17px, 2.8vw, 19px)', opacity: 0.7 }}
                        >
                          Nous sécurisons vos recrutements internationaux pour vous concentrer sur votre développement.
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-[9.8px] 2xl:max-w-[483.85px]">
                      <button
                        type="button"
                        className="h-[56px] w-full rounded-full border border-[#003300] px-8 font-[Geist] font-semibold text-[#003300] transition-colors hover:bg-[#003300] hover:text-[#F7FCFF] sm:w-auto md:h-[66.65px] md:border-[1.96016px] md:px-[44px]"
                        style={{ fontSize: '16px', lineHeight: '20px' }}
                      >
                        About
                      </button>

                      <button
                        type="button"
                        className="h-[56px] w-full rounded-full bg-[#003300] px-6 font-[Geist] font-semibold text-[#F7FCFF] transition-colors hover:bg-[#002200] sm:w-auto md:h-[65.08px] md:min-w-[329px] md:px-[9.8008px]"
                        style={{ fontSize: '16px', lineHeight: '20px' }}
                      >
                        Planifier un entretien confidentiel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <section className="relative w-screen overflow-hidden bg-[#BBCB2E] py-12 md:py-16 lg:py-[84px]">
              <div className="absolute inset-0">
                <Image
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334036/rnj/group-349051-d2f123fc.svg"
                  alt=""
                  fill
                  className="object-cover object-center"
                  aria-hidden="true"
                />
              </div>

              <div className="relative left-1/2 w-screen -translate-x-1/2">
                <div className="mx-auto w-full max-w-none px-0">
                  <div className="mx-auto flex w-full max-w-[774px] flex-col items-center gap-5 px-4 text-center sm:gap-6 sm:px-6 md:gap-[41.6px] md:px-0">
                    <h2
                      className="max-w-[773.41px] font-[EB_Garamond] font-semibold tracking-[-0.03em] text-white"
                      style={{
                        fontSize: 'clamp(26px, 6vw, 83.0753px)',
                        lineHeight: 'clamp(28px, 5.5vw, 68px)',
                      }}
                    >
                      <span className="block sm:whitespace-nowrap">Analyse Institutionnelle</span>
                      <span className="block">&amp; Réglementaire</span>
                    </h2>

                    <p
                      className="max-w-[774px] font-[Geist] font-medium text-white"
                      style={{ fontSize: 'clamp(13px, 2vw, 16px)', lineHeight: 'clamp(17px, 2.5vw, 19px)', opacity: 0.8 }}
                    >
                      Vous êtes un organisme public, une institution privée, un investisseur ou un bailleur de fonds ?
                      RNJ Advisory vous accompagne dans l’analyse approfondie des environnements institutionnels,
                      juridiques et réglementaires afin de sécuriser vos décisions stratégiques.
                    </p>

                    <button
                      type="button"
                      onClick={() => setBookingModalOpen(true)}
                      className="inline-flex items-center justify-center rounded-full bg-[#BBCB2E] font-[Geist] font-semibold text-[#003300] shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
                      style={{
                        height: 'clamp(44px, 7vw, 59.85px)',
                        paddingLeft: 'clamp(20px, 3.5vw, 32px)',
                        paddingRight: 'clamp(20px, 3.5vw, 32px)',
                        fontSize: 'clamp(16px, 3.5vw, 29.7896px)',
                        lineHeight: 1,
                      }}
                    >
                      Contact
                    </button>
                  </div>

                  <div className="mt-12 md:mt-[90px]">
                    <div
                      className="relative rounded-[26px] bg-black/[0.004] shadow-[0px_2px_44.2px_rgba(0,0,0,0.17)]"
                      onMouseEnter={() => setIsInstitutionalCarouselPaused(true)}
                      onMouseLeave={() => setIsInstitutionalCarouselPaused(false)}
                      onTouchStart={() => setIsInstitutionalCarouselPaused(true)}
                      onTouchEnd={() => setIsInstitutionalCarouselPaused(false)}
                    >
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-[9.5%] bg-gradient-to-r from-[#F9FFC4]/70 to-transparent md:block" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[9.5%] bg-gradient-to-l from-[#F9FFC4]/70 to-transparent md:block" />

                    <button
                      type="button"
                      aria-label="Précédent"
                      onClick={() => scrollInstitutionalCarousel('left')}
                      className="absolute left-[1.2%] top-1/2 z-20 hidden h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(187,203,46,0.28)] text-[#003300] opacity-60 transition-opacity hover:opacity-85 md:inline-flex"
                    >
                      <span className="text-[24px] leading-none">‹</span>
                    </button>

                    <button
                      type="button"
                      aria-label="Suivant"
                      onClick={() => scrollInstitutionalCarousel('right')}
                      className="absolute right-[1.2%] top-1/2 z-20 hidden h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(187,203,46,0.28)] text-[#003300] opacity-60 transition-opacity hover:opacity-85 md:inline-flex"
                    >
                      <span className="text-[24px] leading-none">›</span>
                    </button>

                    <div
                      ref={institutionalCarouselRef}
                      className="flex flex-nowrap gap-5 overflow-x-auto overflow-y-hidden px-3 py-3 md:gap-[21.98px] md:px-4 md:py-5 touch-pan-x [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                    >
                      {[...institutionalCarouselCards, ...institutionalCarouselCards].map((card, index) => (
                        <article
                          key={`${card.title}-${index}`}
                          data-institutional-card
                          className="flex w-[92vw] shrink-0 flex-col gap-3 md:h-[427.36px] md:w-[1076.68px] md:flex-row md:gap-[21.99px]"
                        >
                          {card.panelFirst ? (
                            <>
                              <div
                                className="flex justify-center rounded-[28px] px-6 py-6 md:h-[427.36px] md:w-[370.67px] md:rounded-[91.5803px_91.5771px_91.5771px_0px] md:px-[36.88px] md:py-[73.05px]"
                                style={{ backgroundColor: card.panelBg }}
                              >
                                <div className="flex h-full w-full max-w-[275.15px] flex-col justify-between">
                                  <div className="flex flex-col gap-[14.18px]">
                                    <h3
                                      className="font-[Geist] font-semibold"
                                      style={{
                                        fontSize: '24px',
                                        lineHeight: '31px',
                                        textTransform: 'capitalize',
                                        color: card.titleColor,
                                      }}
                                    >
                                      {card.title}
                                    </h3>

                                    <p
                                      className="max-w-[265.39px] font-[Geist] font-medium"
                                      style={{
                                        fontSize: '15px',
                                        lineHeight: '20px',
                                        textTransform: 'capitalize',
                                        color: card.descriptionColor,
                                      }}
                                    >
                                      {card.description}
                                    </p>
                                  </div>

                                  <button
                                    type="button"
                                    className="inline-flex h-[29.08px] w-[180.83px] items-center justify-center rounded-[6.58028px] font-[Geist] font-medium"
                                    style={{
                                      backgroundColor: card.buttonBg,
                                      color: card.buttonTextColor,
                                      fontSize: '11.8445px',
                                      lineHeight: '15px',
                                    }}
                                  >
                                    Demander une consultation
                                  </button>
                                </div>
                              </div>

                              <div className="relative h-[260px] overflow-hidden rounded-[28px] md:h-[427.36px] md:w-[684.02px] md:rounded-[91.5771px_0px_91.5803px_91.5771px]">
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
                              <div className="relative h-[260px] overflow-hidden rounded-[28px] md:h-[427.36px] md:w-[684.02px] md:rounded-[91.5803px_91.5803px_0px_91.5771px]">
                                <Image
                                  src={card.image}
                                  alt={card.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              <div
                                className="flex justify-center rounded-[28px] px-6 py-6 md:h-[427.36px] md:w-[370.67px] md:rounded-[91.5803px_91.5771px_91.5771px_0px] md:px-[36.88px] md:py-[73.05px]"
                                style={{ backgroundColor: card.panelBg }}
                              >
                                <div className="flex h-full w-full max-w-[275.15px] flex-col justify-between">
                                  <div className="flex flex-col gap-[14.18px]">
                                    <h3
                                      className="font-[Geist] font-semibold"
                                      style={{
                                        fontSize: '24px',
                                        lineHeight: '31px',
                                        textTransform: 'capitalize',
                                        color: card.titleColor,
                                      }}
                                    >
                                      {card.title}
                                    </h3>

                                    <p
                                      className="max-w-[265.39px] font-[Geist] font-medium"
                                      style={{
                                        fontSize: '15px',
                                        lineHeight: '20px',
                                        textTransform: 'capitalize',
                                        color: card.descriptionColor,
                                      }}
                                    >
                                      {card.description}
                                    </p>
                                  </div>

                                  <button
                                    type="button"
                                    className="inline-flex h-[29.08px] w-[180.83px] items-center justify-center rounded-[6.58028px] font-[Geist] font-medium"
                                    style={{
                                      backgroundColor: card.buttonBg,
                                      color: card.buttonTextColor,
                                      fontSize: '11.8445px',
                                      lineHeight: '15px',
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
                    </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center md:mt-10">
                    <div className="relative h-[46px] w-[186px] md:h-[57.57px] md:w-[233px]">
                      <Image
                        src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                        alt="RNJ Advisory"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative -mt-6 w-full bg-[#003300] py-10 md:-mt-[62px] md:py-14">
              <div className="mx-auto w-full max-w-[1540px] px-4">
                <div
                  className="mx-auto grid w-full max-w-[1299.66px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-4 xl:gap-[19px]"
                  style={{ filter: 'drop-shadow(0px 4px 47.1px rgba(0, 0, 0, 0.09))' }}
                >
                  <article
                    className="relative flex min-h-[390px] flex-col overflow-hidden rounded-[28px] bg-[#D9D9D9] transition-all duration-500 md:min-h-[420px] md:rounded-[30px] lg:min-h-[450px] xl:h-[473.49px] xl:rounded-[34.8794px]"
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
                    <div className="relative h-[220px] w-full sm:h-[240px] md:h-[200px] lg:h-[240px] xl:h-[285px]">
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
                        ESG &amp; financements / accompagnement sur mesure
                      </h3>
                      <p
                        className="mt-3 max-w-[247.64px] font-[Geist] text-[#003300] text-[13.9517px] leading-[16px] opacity-70"
                      >
                        ESG &amp; financements / accompagnement sur mesure
                      </p>
                    </div>
                  </article>

                  <article
                    className="relative flex min-h-[390px] flex-col items-center justify-center rounded-[28px] bg-[#F9FFC4] px-5 py-7 text-center transition-all duration-500 md:min-h-[420px] md:rounded-[30px] md:px-5 lg:min-h-[450px] lg:px-6 xl:h-[473.49px] xl:rounded-[34.8794px] xl:px-8"
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
                      <span
                        className="font-[Geist] font-bold text-[#BBCB2E] text-[8.97436px] leading-[14px]"
                      >
                        [ Analyse Institutionnelle &amp; Réglementaire ]
                      </span>

                      <h3
                        className="max-w-[334.84px] font-[EB_Garamond] font-semibold text-[#003300] text-[24px] leading-[26px] sm:text-[26px] sm:leading-[28px] lg:text-[30px] lg:leading-[31px] xl:text-[35.8975px] xl:leading-[36px]"
                      >
                        Durabilité et ESG (Environnemental, Social et Gouvernance)
                      </h3>

                      <p
                        className="max-w-[299.96px] font-[Geist] text-[#003300] text-[13.9517px] leading-[17px] opacity-70"
                      >
                        RNJ Advisory intègre les enjeux ESG au cœur de votre stratégie pour une performance durable et conforme.
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
                    className="relative flex min-h-[390px] flex-col overflow-hidden rounded-[28px] bg-[#D9D9D9] transition-all duration-500 md:min-h-[420px] md:rounded-[30px] lg:min-h-[450px] xl:h-[473.49px] xl:rounded-[34.8794px]"
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
                    <div className="relative h-[220px] w-full sm:h-[240px] md:h-[200px] lg:h-[240px] xl:h-[300px]">
                      <Image
                        src="/WhatsApp%20Image%202026-04-19%20at%2012.52.25%20PM%201.svg"
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
                      <p
                        className="mt-3 max-w-[247.64px] font-[Geist] text-[#003300] text-[13.9517px] leading-[16px] opacity-70"
                      >
                        Pour savoir où vous en êtes et ce qui est attendu de vous.
                      </p>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            <div className="flex w-full flex-col items-center gap-10 bg-[#003300] md:gap-16">
              <section className="hidden w-full 2xl:max-w-none">
              <div className="2xl:hidden">
                <div className="mb-10 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span className="h-[10px] w-[10px] rounded-full bg-[#003300]" />
                    <span
                      className="font-[Geist] font-bold text-[#003300]"
                      style={{ fontSize: '23.6828px', lineHeight: '25px' }}
                    >
                      Pourquoi choisir RNJ Advisory ?
                    </span>
                  </div>

                  <p
                    className="font-[Geist] font-bold text-[#003300]"
                    style={{ fontSize: '20px', lineHeight: '18px', opacity: 0.65 }}
                  >
                    Une expertise rigoureuse au service de vos décisions
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-[16.16px] md:grid-cols-2">
                  {whyChooseStripCards.map((card, index) => (
                    <article
                      key={card.title}
                      className="rounded-[24px] px-6 py-8 text-center cursor-pointer transition-all duration-300 touch-active:scale-95"
                      style={{
                        boxShadow:
                          hoveredCardIndex === index
                            ? '0px 8px 26px rgba(0, 0, 0, 0.18)'
                            : '0px 4px 22.4px rgba(0, 0, 0, 0.19)',
                        background:
                          hoveredCardIndex === index
                            ? whyChooseCardActiveBackground
                            : whyChooseCardGradients[index % whyChooseCardGradients.length],
                        border:
                          hoveredCardIndex === index
                            ? `2px solid ${whyChooseCardActiveBorder}`
                            : '2px solid #003300',
                        transform:
                          hoveredCardIndex === index ? 'translateY(-2px)' : 'translateY(0)',
                      }}
                      onMouseEnter={() => setHoveredCardIndex(index)}
                      onMouseLeave={() => setHoveredCardIndex(null)}
                      onTouchStart={(e) => {
                        setHoveredCardIndex(index);
                        setTimeout(() => {
                          setHoveredCardIndex(null);
                        }, 220);
                      }}
                    >
                      <h3
                        className="mx-auto mb-5 font-[EB_Garamond] font-bold transition-colors duration-300"
                        style={{
                          width: card.titleWidth,
                          maxWidth: card.titleWidth,
                          fontSize: '32px',
                          lineHeight: '27px',
                          color: hoveredCardIndex === index ? '#003300' : '#F7FCFF',
                        }}
                      >
                        {card.title}
                      </h3>

                      <p
                        className="mx-auto max-w-[262.42px] font-[Geist] font-normal transition-colors duration-300"
                        style={{
                          fontSize: '14px',
                          lineHeight: '16px',
                          color: hoveredCardIndex === index ? '#003300' : '#F7FCFF',
                        }}
                      >
                        {card.description}
                      </p>
                    </article>
                  ))}
                </div>

                <p
                  className="mt-8 font-[Geist] font-semibold text-[#003300]"
                  style={{ fontSize: '16px', lineHeight: '18px', opacity: 0.5 }}
                >
                  Choisir RNJ Advisory, c&apos;est bénéficier d&apos;une approche
                  structurée, indépendante et orientée résultats. Nous combinons
                  analyse juridique, compréhension institutionnelle et vision
                  stratégique afin de vous aider à anticiper les risques, assurer
                  la conformité de vos projets et prendre des décisions éclairées.
                </p>
              </div>

              <div
                className="relative hidden 2xl:block overflow-hidden"
                style={{
                  width: '100vw',
                  height: '512px',
                  marginLeft: 'calc(50% - 50vw)',
                  marginRight: 'calc(50% - 50vw)',
                }}
              >
                <div
                  className="absolute left-0 right-0"
                  style={{
                    top: '11.52%',
                    bottom: '10.55%',
                  }}
                />

                <div
                  className="absolute flex flex-col items-start gap-3"
                  style={{ left: '3.97%', top: 0 }}
                >
                  <div className="flex items-center gap-[11px]">
                    <span className="h-[10px] w-[10px] rounded-full bg-[#003300]" />
                    <span
                      className="font-[Geist] font-bold text-[#003300]"
                      style={{ fontSize: '23.6828px', lineHeight: '25px' }}
                    >
                      Pourquoi choisir RNJ Advisory ?
                    </span>
                  </div>

                  <p
                    className="font-[Geist] font-bold text-[#003300]"
                    style={{ fontSize: '20px', lineHeight: '18px', opacity: 0.65 }}
                  >
                    {'Une expertise rigoureuse au service de vos d\u00E9cisions'}
                  </p>
                </div>

                <div 
                  className="absolute flex gap-4"
                  style={{
                    left: '0%',
                    top: '20.9%',
                    bottom: '19.73%',
                    width: 'fit-content',
                    animation: 'scroll 20s linear infinite',
                    willChange: 'transform',
                  }}
                >
                  {[...whyChooseStripCards, ...whyChooseStripCards].map((card, index) => (
                    <article
                      key={`${card.title}-${index}`}
                      className="flex-shrink-0 overflow-hidden rounded-[10px] text-center cursor-pointer transition-all duration-300"
                      style={{
                        width: '303px',
                        height: '100%',
                        boxShadow:
                          hoveredScrollCardIndex === index
                            ? '0px 8px 26px rgba(0, 0, 0, 0.18)'
                            : '0px 4px 22.4px rgba(0, 0, 0, 0.19)',
                        marginRight: '20px',
                        background:
                          hoveredScrollCardIndex === index
                            ? whyChooseCardActiveBackground
                            : whyChooseCardGradients[
                                (index % whyChooseStripCards.length) % whyChooseCardGradients.length
                              ],
                        border:
                          hoveredScrollCardIndex === index
                            ? `2px solid ${whyChooseCardActiveBorder}`
                            : '2px solid #003300',
                        touchAction: 'manipulation',
                        transform:
                          hoveredScrollCardIndex === index ? 'translateY(-2px)' : 'translateY(0)',
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
                      <div className="flex h-full w-[303px] flex-col items-center justify-center gap-5 p-6">
                        <h3
                          className={`font-[Geist] leading-none text-[#003300] transition-opacity duration-300 ${
                                    hoveredScrollCardIndex === index ? 'text-[18px] opacity-100' : 'pointer-events-none opacity-0'
                                  }`}
                          style={{
                            width: card.titleWidth,
                            maxWidth: card.titleWidth,
                            fontSize: '32px',
                            lineHeight: '27px',
                            color:
                              hoveredScrollCardIndex === index ? '#003300' : '#F7FCFF',
                          }}
                        >
                          {card.title}
                        </h3>

                        <p
                          className="w-[262.42px] font-[Geist] font-normal transition-colors duration-300"
                          style={{
                            fontSize: '14px',
                            lineHeight: '16px',
                            color:
                              hoveredScrollCardIndex === index ? '#003300' : '#F7FCFF',
                          }}
                        >
                          {card.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                <p
                  className="absolute font-[Geist] font-semibold text-[#003300]"
                  style={{
                    left: '3.97%',
                    top: '89.45%',
                    width: '892px',
                    maxWidth: '58.22vw',
                    fontSize: '16px',
                    lineHeight: '18px',
                    opacity: 0.5
                  }}
                >
                  Choisir RNJ Advisory, c&apos;est bénéficier d&apos;une approche structurée, indépendante et orientée résultats. Nous combinons analyse juridique, compréhension institutionnelle et vision stratégique afin de vous aider à anticiper les risques, assurer la conformité de vos projets et prendre des décisions éclairées.
                </p>
              </div>
            </section>

            {false && (
              <>
            {/* Business Services Section - Position CorrigÃ©e */}
            <section 
              className="w-full py-16 md:py-24"
              style={{ 
                backgroundColor: '#F7FCFF',
                maxWidth: '1393px',
                margin: '0 auto',
                position: 'relative'
              }}
            >
              {/* Frame 355 - Main Container */}
              <div 
                className="relative mx-auto"
                style={{
                  width: '100%',
                  maxWidth: '1393px',
                  height: '691px',
                  filter: 'drop-shadow(2px 2px 24.5px rgba(0, 0, 0, 0.21))'
                }}
              >
                {/* Frame 353 - Left Column */}
                <div 
                  style={{
                    position: 'absolute',
                    width: '334px',
                    height: '691px',
                    left: '0px',
                    top: '0px',
                    zIndex: 2
                  }}
                >
                  {/* Rectangle 420 - Dark Background */}
                  <div 
                    style={{
                      position: 'absolute',
                      width: '334px',
                      height: '334px',
                      left: '0px',
                      top: '0px',
                      backgroundColor: '#003300',
                      borderRadius: '20px'
                    }}
                  />
                  
                  {/* Rectangle 421 - White Card */}
                  <div 
                    style={{
                      position: 'absolute',
                      width: '208px',
                      height: '230px',
                      left: '63px',
                      top: '52px',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0px 0px 43px -5px rgba(255, 255, 255, 0.33)',
                      borderRadius: '30px'
                    }}
                  />
                  
                  {/* Frame 385 - Four Dots */}
                  <div 
                    style={{
                      position: 'absolute',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: '138px',
                      height: '30px',
                      left: '75px',
                      top: '90px',
                      gap: '6px'
                    }}
                  >
                    {[1, 2, 3, 4].map((dot) => (
                      <div 
                        key={dot}
                        style={{
                          position: 'relative',
                          width: '30px',
                          height: '30px'
                        }}
                      >
                        <div 
                          style={{
                            position: 'absolute',
                            width: '30px',
                            height: '30px',
                            left: '0px',
                            top: '0px',
                            backgroundColor: '#BBCB2E',
                            borderRadius: '50%'
                          }}
                        />
                        <div 
                          style={{
                            position: 'absolute',
                            width: '14px',
                            height: '14px',
                            left: '8px',
                            top: '8px',
                            backgroundColor: '#003300',
                            borderRadius: '50%'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Title */}
                  <h3 
                    style={{
                      position: 'absolute',
                      fontFamily: 'Geist',
                      fontWeight: '500',
                      color: '#003300',
                      width: '176px',
                      height: '108px',
                      left: '75px',
                      top: '144px',
                      fontSize: '27.6078px',
                      lineHeight: '27px'
                    }}
                  >
                    Expertise stratÃ©gique au service de vos projets
                  </h3>
                  
                  {/* Service Steps Container */}
                  <div 
                    style={{
                      position: 'absolute',
                      width: '334px',
                      height: '334px',
                      left: '0px',
                      top: '357px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px'
                    }}
                  />
                  
                  {/* Service Steps */}
                  <div 
                    style={{
                      position: 'absolute',
                      width: '272px',
                      height: '167.21px',
                      left: '31px',
                      top: '440.39px'
                    }}
                  >
                    {/* ConformitÃ© */}
                    <div 
                      style={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '218.49px',
                        height: '55.74px',
                        left: '0px',
                        top: '0px'
                      }}
                    >
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '162.75px',
                          height: '55.74px',
                          border: '2px solid #E2E2E2',
                          borderRadius: '111.475px',
                          padding: '13px 29px'
                        }}
                      >
                        <span 
                          style={{
                            fontFamily: 'Geist',
                            fontWeight: '500',
                            fontSize: '20px',
                            lineHeight: '29px',
                            color: '#E2E2E2'
                          }}
                        >
                          ConformitÃ©
                        </span>
                      </div>
                      <div 
                        style={{
                          position: 'absolute',
                          width: '55.74px',
                          height: '55.74px',
                          right: '0px',
                          top: '0px',
                          border: '2px solid #E2E2E2',
                          borderRadius: '111.475px'
                        }}
                      >
                        <div 
                          style={{
                            position: 'absolute',
                            width: '26px',
                            height: '26px',
                            left: '14.61px',
                            top: '14.61px',
                            border: '2px solid #E2E2E2',
                            borderRadius: '50%'
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* DÃ©cision */}
                    <div 
                      style={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        width: '218.49px',
                        height: '55.74px',
                        left: '53.51px',
                        top: '55.74px'
                      }}
                    >
                      <div 
                        style={{
                          position: 'absolute',
                          width: '55.74px',
                          height: '55.74px',
                          left: '0px',
                          top: '0px',
                          border: '2px solid #E2E2E2',
                          borderRadius: '111.475px',
                          transform: 'rotate(-180deg)'
                        }}
                      >
                        <div 
                          style={{
                            position: 'absolute',
                            width: '26px',
                            height: '26px',
                            left: '14.49px',
                            top: '14.87px',
                            border: '2px solid #E2E2E2',
                            borderRadius: '50%'
                          }}
                        />
                      </div>
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '162.75px',
                          height: '55.74px',
                          left: '55.74px',
                          top: '0px',
                          backgroundColor: '#BBCB2E',
                          borderRadius: '111.475px',
                          padding: '13px 29px'
                        }}
                      >
                        <span 
                          style={{
                            fontFamily: 'Geist',
                            fontWeight: '500',
                            fontSize: '20px',
                            lineHeight: '29px',
                            color: '#003300'
                          }}
                        >
                          DÃ©cision
                        </span>
                      </div>
                    </div>
                    
                    {/* Analyse */}
                    <div 
                      style={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '235.21px',
                        height: '55.74px',
                        left: '11.15px',
                        top: '111.48px'
                      }}
                    >
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '179.48px',
                          height: '55.74px',
                          left: '0px',
                          top: '0px',
                          border: '2px solid #E2E2E2',
                          borderRadius: '111.475px',
                          padding: '13px 52px 13px 53px'
                        }}
                      >
                        <span 
                          style={{
                            fontFamily: 'Geist',
                            fontWeight: '500',
                            fontSize: '20px',
                            lineHeight: '29px',
                            color: '#E2E2E2'
                          }}
                        >
                          Analyse
                        </span>
                      </div>
                      <div 
                        style={{
                          position: 'absolute',
                          width: '55.74px',
                          height: '55.74px',
                          right: '0px',
                          top: '0px',
                          border: '2px solid #E2E2E2',
                          borderRadius: '111.475px'
                        }}
                      >
                        <div 
                          style={{
                            position: 'absolute',
                            width: '26px',
                            height: '26px',
                            left: '15.13px',
                            top: '15.13px',
                            border: '2px solid #E2E2E2',
                            borderRadius: '50%'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Background Business Image */}
                <div 
                  style={{
                    position: 'absolute',
                    width: '518px',
                    height: '691px',
                    left: '291px',
                    top: '0px',
                    overflow: 'hidden',
                    zIndex: 0
                  }}
                >
                  <Image
                    src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334040/rnj/businessfotografie-bewerbungsfotos-berlin-kopf-kragen-1-f0daffa4.svg"
                    alt="Business professionals"
                    fill
                    sizes="518px"
                    className="object-cover"
                  />
                </div>
                
                {/* Frame 354 - Grid Layout */}
                <div 
                  style={{
                    position: 'absolute',
                    width: '687px',
                    height: '691px',
                    left: '687px',
                    top: '0px',
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                    alignContent: 'flex-start',
                    padding: '0px',
                    gap: '23px 19px',
                    zIndex: 2
                  }}
                >
                  {/* Group 363 - Image Card 1 */}
                  <div 
                    style={{
                      position: 'relative',
                      width: '334px',
                      height: '334px',
                      overflow: 'hidden',
                      borderRadius: '20px'
                    }}
                  >
                    <div 
                      style={{
                        position: 'absolute',
                        width: '334px',
                        height: '334px',
                        left: '0px',
                        top: '0px',
                        backgroundColor: '#6F6F6F',
                        borderRadius: '20px'
                      }}
                    />
                    <Image
                      src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334042/rnj/group-363-02f81f30.svg"
                      alt="Business success"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Group 354 - Business Development Card */}
                  <div 
                    style={{
                      position: 'relative',
                      width: '334px',
                      height: '334px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Gradient Header */}
                    <div 
                      style={{
                        position: 'absolute',
                        width: '334px',
                        height: '74px',
                        left: '0px',
                        top: '30px',
                        background: 'linear-gradient(90deg, #DDE597 0%, rgba(123, 127, 84, 0.17) 100%)'
                      }}
                    />
                    
                    {/* Header Content */}
                    <div 
                      style={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        width: '289px',
                        height: '60px',
                        left: '23px',
                        top: '7px',
                        gap: '29px'
                      }}
                    >
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '60px',
                          height: '60px',
                          backgroundColor: '#BBCB2E',
                          borderRadius: '50%'
                        }}
                      >
                        <span 
                          style={{
                            fontFamily: 'EB Garamond',
                            fontWeight: '400',
                            fontSize: '29.12px',
                            lineHeight: '29px',
                            color: '#003300'
                          }}
                        >
                          01
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div 
                            key={i}
                            style={{
                              backgroundColor: '#BBCB2E',
                              borderRadius: '50%',
                              width: '14px',
                              height: '14px'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <h3 
                      style={{
                        position: 'absolute',
                        fontFamily: 'Geist',
                        fontWeight: '500',
                        color: '#003300',
                        width: '263px',
                        height: '96px',
                        left: '23px',
                        top: '108px',
                        fontSize: '36px',
                        lineHeight: '32px'
                      }}
                    >
                      dÃ©velopper votre activitÃ© en Belgique
                    </h3>
                    
                    <p 
                      style={{
                        position: 'absolute',
                        fontFamily: 'Geist',
                        fontWeight: '500',
                        color: '#003300',
                        width: '263px',
                        height: '32px',
                        left: '23px',
                        top: '226px',
                        fontSize: '16px',
                        lineHeight: '16px',
                        opacity: 0.6
                      }}
                    >
                      complÃ©tez les Ã©tapes et dÃ©marrez votre Entrepreneuriat en Belgique
                    </p>
                  </div>
                  
                  {/* Group 355 - Partners Card */}
                  <div 
                    style={{
                      position: 'relative',
                      width: '334px',
                      height: '334px',
                      overflow: 'hidden',
                      borderRadius: '20px'
                    }}
                  >
                    {/* Card Background */}
                    <div 
                      style={{
                        position: 'absolute',
                        width: '334px',
                        height: '220px',
                        left: '0px',
                        top: '0px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '20px'
                      }}
                    />
                    
                    {/* Partners Header */}
                    <div 
                      style={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '30px',
                        height: '30.11px',
                        left: '28px',
                        top: '18.04px'
                      }}
                    >
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '30px',
                          height: '30px',
                          backgroundColor: '#839705',
                          borderRadius: '15px'
                        }}
                      >
                        <span 
                          style={{
                            fontFamily: 'Geist',
                            fontWeight: '500',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            lineHeight: '10px'
                          }}
                        >
                          P
                        </span>
                      </div>
                      <span 
                        style={{
                          fontFamily: 'Geist',
                          fontWeight: '500',
                          fontSize: '11px',
                          lineHeight: '10px',
                          color: '#839705'
                        }}
                      >
                        partenaires
                      </span>
                    </div>
                    
                    {/* Partners Count */}
                    <span 
                      style={{
                        position: 'absolute',
                        fontFamily: 'Geist',
                        fontWeight: '400',
                        color: '#003300',
                        width: '152px',
                        height: '60px',
                        left: '28px',
                        top: '61px',
                        fontSize: '64px',
                        lineHeight: '60px'
                      }}
                    >
                      500+
                    </span>
                    
                    {/* Partners Title */}
                    <h3 
                      style={{
                        position: 'absolute',
                        fontFamily: 'Geist',
                        fontWeight: '600',
                        color: '#003300',
                        width: '256px',
                        height: '19px',
                        left: '28px',
                        top: '145px',
                        fontSize: '24px',
                        lineHeight: '19px',
                        letterSpacing: '-0.05em'
                      }}
                    >
                      Partenaires de référence
                    </h3>
                    
                    {/* Partners Description */}
                    <p 
                      style={{
                        position: 'absolute',
                        fontFamily: 'Geist',
                        fontWeight: '500',
                        color: '#003300',
                        width: '233px',
                        height: '19px',
                        left: '28px',
                        top: '169px',
                        fontSize: '16px',
                        lineHeight: '19px',
                        letterSpacing: '-0.05em',
                        opacity: 0.5
                      }}
                    >
                      Un réseau solide pour vos projets
                    </p>
                    
                    {/* Contact Button */}
                    <button 
                      style={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '334px',
                        height: '91px',
                        left: '0px',
                        top: '220px',
                        backgroundColor: '#003300',
                        borderRadius: '20px',
                        padding: '24px 32px',
                        gap: '10px'
                      }}
                    >
                      <div 
                        style={{
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '45px',
                          height: '44px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '50%'
                        }}
                      >
                        <Image
                          src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333995/rnj/vector-17-f73f224f.svg"
                          alt="Arrow icon"
                          width={18}
                          height={18}
                        />
                      </div>
                      <span 
                        style={{
                          fontFamily: 'Geist',
                          fontWeight: '600',
                          width: 'auto',
                          height: '30px',
                          fontSize: '16px',
                          lineHeight: '29px',
                          color: '#003300',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '100px',
                          padding: '7px 18px 6px'
                        }}
                      >
                        Contact
                      </span>
                    </button>
                  </div>
                  
                  {/* Group 353 - Image Card 2 */}
                  <div 
                    style={{
                      position: 'relative',
                      width: '334px',
                      height: '334px',
                      backgroundColor: '#BBCB2E',
                      borderRadius: '20px',
                      overflow: 'hidden'
                    }}
                  >
                    <Image
                      src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334045/rnj/group-353-8693f0d7.svg"
                      alt="Professional profiles"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              {/* Copyright */}
              <p 
                className="mt-10 text-center font-[Geist] font-medium text-[#003300]"
                style={{
                  fontSize: '15.3706px',
                  lineHeight: '21px',
                  textTransform: 'capitalize',
                  opacity: 0.5
                }}
              >
                &copy; 2026 RNJ Advisory. Tous droits réservés.
              </p>
              </section>
              </>
            )}
            </div>
            <section className="relative mx-auto my-0 w-full bg-[#003300] max-w-none px-0">
              <div className="mx-auto w-full max-w-[1449px] px-4 sm:px-5 md:px-6 xl:px-0">
              <div
                className="flex w-full flex-col items-center rounded-[36px] bg-[#003300] px-5 py-12 sm:px-8 md:px-10 md:py-16 lg:rounded-[80px] lg:px-[48px] lg:py-[75px] xl:h-[1312px] xl:rounded-[120px] xl:pt-[91px] xl:pb-[75px] xl:pl-[55px] xl:pr-[48px] xl:gap-[80px]"
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
                      src="/maps.svg"
                      alt="World Map"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="pointer-events-none absolute z-[14]" style={{ left: '37.74%', top: '21.70%', width: '14.75%', height: '39.40%' }} aria-hidden>
                    <Image src="/pins.svg" alt="" fill className="object-contain" />
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
                    <button
                      className="flex h-[62px] w-full items-center justify-center rounded-[9.4521px] border-2 border-[#F7FCFF] transition-colors hover:bg-white hover:text-[#003300] active:scale-95 active:bg-white active:text-[#003300] sm:h-[71.42px] sm:w-[155.43px]"
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }, 150);
                      }}
                    >
                      <span 
                        className="font-[Geist] font-semibold text-white"
                        style={{ fontSize: 'clamp(16px, 1.8vw, 21.3092px)' }}
                      >
                        About
                      </span>
                    </button>
                    
                    {/* Request a Consultation Button */}
                    <button
                      className="flex h-[62px] w-full items-center justify-center rounded-[9.4521px] bg-[#BBCB2E] px-4 transition-colors hover:bg-[#a8b829] active:scale-95 active:bg-[#9aa824] sm:h-[70.31px] sm:w-[305.62px]"
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }, 150);
                      }}
                    >
                      <span 
                        className="font-[Geist] font-semibold"
                        style={{ 
                          fontSize: 'clamp(15px, 1.8vw, 21.3092px)',
                          color: '#003300' 
                        }}
                      >
                        <span className="hidden sm:inline">Request a Consultation</span>
                        <span className="sm:hidden">Consultation</span>
                      </span>
                    </button>
                  </div>
                  
                  {/* Copyright Text */}
                  <div 
                    className="font-[Geist] font-medium text-white text-center"
                    style={{ 
                      fontSize: 'clamp(13px, 1.7vw, 21.4956px)',
                      lineHeight: 'clamp(16px, 1.8vw, 22px)',
                      opacity: 0.5 
                    }}
                  >
                    © 2026 RNJ Advisory. Tous droits réservés.
                  </div>
                </div>
              </div>
              </div>
            </section>

            {/* Bento Grid Section (Group 386) */}
            <section className="relative mx-auto my-0 w-full max-w-[1393px] px-4 sm:px-5 md:px-6">
              <div
                className="grid w-full grid-cols-1 gap-[19px] md:grid-cols-2 xl:grid-cols-[334px_334px_minmax(0,1fr)]"
                style={{ filter: 'drop-shadow(2px 2px 24.5px rgba(0,0,0,0.21))' }}
              >
                {/* Column 1: BECI + Pills */}
                <div className="flex flex-col gap-[23px]">
                  {/* BECI card */}
                  <div className="bento-card bento-d1 relative h-[334px] w-full overflow-hidden rounded-[20px] bg-[#003300]">
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
                  <div className="bento-card bento-d2 relative flex h-[334px] w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-[20px] bg-white px-3 sm:px-5">
                    <div className="flex w-full max-w-[272px] items-center gap-[4px]">
                      <div className="flex h-[55.74px] flex-1 items-center justify-center rounded-full border-2 border-[#BBCB2E]">
                        <span className="font-[Geist] text-[18px] font-medium text-[#BBCB2E] sm:text-[20px]">Conformité</span>
                      </div>
                      <div className="flex h-[55.74px] w-[55.74px] shrink-0 items-center justify-center rounded-full border-2 border-[#BBCB2E]">
                        <span className="text-[#BBCB2E]">→</span>
                      </div>
                    </div>
                    <div className="flex w-full max-w-[272px] items-center gap-[4px]">
                      <div className="flex h-[55.74px] w-[55.74px] shrink-0 items-center justify-center rounded-full border-2 border-[#BBCB2E]">
                        <span className="text-[#BBCB2E]">←</span>
                      </div>
                      <div className="flex h-[55.74px] flex-1 items-center justify-center rounded-full bg-[#BBCB2E]">
                        <span className="font-[Geist] text-[18px] font-medium text-[#003300] sm:text-[20px]">Décision</span>
                      </div>
                    </div>
                    <div className="flex w-full max-w-[272px] items-center gap-[4px]">
                      <div className="flex h-[55.74px] flex-1 items-center justify-center rounded-full border-2 border-[#BBCB2E]">
                        <span className="font-[Geist] text-[18px] font-medium text-[#BBCB2E] sm:text-[20px]">Analyse</span>
                      </div>
                      <div className="flex h-[55.74px] w-[55.74px] shrink-0 items-center justify-center rounded-full border-2 border-[#BBCB2E]">
                        <span className="text-[#BBCB2E]">→</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Tall photo card */}
                <div className="bento-card bento-d3 relative h-[420px] w-full overflow-hidden rounded-[20px] bg-[#6F6F6F] sm:h-[520px] md:h-[691px]">
                  <Image
                    src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334058/rnj/group-352-32f4e599.svg"
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
                  <div className="bento-card bento-d4 relative h-[334px] w-full overflow-hidden rounded-[20px] bg-[#6F6F6F]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334042/rnj/group-363-02f81f30.svg" alt="" className="h-full w-full object-cover" />
                  </div>

                  {/* Belgique card */}
                  <div className="bento-card bento-d5 relative h-[334px] w-full overflow-hidden rounded-[20px] bg-white">
                    <div
                      className="mt-[30px] flex h-[74px] w-full items-center px-4 sm:px-[23px]"
                      style={{ background: 'linear-gradient(90deg, #DDE597 0%, rgba(123,127,84,0.17) 100%)' }}
                    >
                      <div className="flex w-full items-center justify-between gap-3 sm:justify-start sm:gap-[29px]">
                        <div className="relative flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#BBCB2E] sm:h-[60px] sm:w-[60px]">
                          <span className="font-[EB_Garamond] text-[26px] leading-none text-[#003300] sm:text-[29.12px]">01</span>
                        </div>
                        <div className="flex items-center gap-[6px] sm:gap-[8px]">
                          <span className="block h-[20px] w-[20px] rounded-full bg-[#BBCB2E] sm:h-[28px] sm:w-[28px]" />
                          <span className="block h-[12px] w-[12px] rounded-full bg-[#BBCB2E] sm:h-[14px] sm:w-[14px]" />
                          <span className="block h-[12px] w-[12px] rounded-full bg-[#BBCB2E] sm:h-[14px] sm:w-[14px]" />
                          <span className="block h-[12px] w-[12px] rounded-full bg-[#BBCB2E] sm:h-[14px] sm:w-[14px]" />
                          <span className="block h-[12px] w-[12px] rounded-full bg-[#BBCB2E] sm:h-[14px] sm:w-[14px]" />
                        </div>
                      </div>
                    </div>
                    <div className="px-[23px] pt-[34px]">
                      <h3 className="w-full font-[Geist] text-[30px] font-medium leading-[30px] text-[#003300] sm:text-[36px] sm:leading-[32px]">
                        développer votre activité en Belgique
                      </h3>
                      <p className="mt-3 w-full font-[Geist] text-[15px] font-medium leading-[16px] text-[#003300]/60 sm:text-[16px]">
                        complétez les étapes et démarrez votre Entrepreneuriat en belgique
                      </p>
                    </div>
                  </div>

                  {/* Shifting + Contact stacked */}
                  <div className="flex flex-col gap-[23px]">
                    <div className="bento-card bento-d6 relative h-[220px] w-full overflow-hidden rounded-[20px] bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334060/rnj/group-558-46fa6f2f.svg"
                        alt="Shifting Academy"
                        className="absolute left-[29px] top-[35px] h-[31px] w-[118px] object-contain"
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/Group%20349031%20(1).svg"
                        alt=""
                        aria-hidden="true"
                        className="absolute right-[29px] top-[31px] h-[38px] w-[90px] object-contain"
                      />
                      <p className="absolute left-[29px] top-[88px] w-[276px] font-[Geist] text-[22px] font-semibold leading-[24px] tracking-[-0.05em] text-[#003300] sm:text-[24px] sm:leading-[25px]">
                        RNJ Advisory est certifiée Shifting Academy
                      </p>
                      <div className="absolute left-[29px] top-[153px] flex items-center gap-[6px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334061/rnj/e-sdg-print-07-1-af43b2fc.svg" alt="SDG 7" className="h-[36px] w-[36px]" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334064/rnj/e-sdg-print-08-1-53b17059.svg" alt="SDG 8" className="h-[36px] w-[36px]" />
                      </div>
                    </div>
                    <div className="bento-card bento-d7 relative flex h-[91px] w-full items-center justify-center gap-[6px] rounded-[20px] bg-[#003300] px-4 sm:px-8">
                      <div className="flex h-[44px] w-[45px] items-center justify-center rounded-full bg-white">
                        <span className="text-[#003300]">→</span>
                      </div>
                      <div className="flex h-[43px] min-w-[115px] items-center justify-center rounded-full bg-white px-4">
                        <span className="font-[Geist] text-[16px] font-semibold text-[#003300]">contact us</span>
                      </div>
                    </div>
                  </div>

                  {/* Concentric circles card */}
                  <div className="bento-card bento-d8 relative h-[334px] w-full overflow-hidden rounded-[20px] bg-[#BBCB2E]">
                    <div
                      className="absolute inset-0 rounded-[20px]"
                      style={{ background: 'radial-gradient(50% 61.83% at 50% 50%, #DDE597 60.08%, rgba(123,127,84,0) 100%)' }}
                    />
                    <span className="ring-pulse pointer-events-none absolute left-1/2 top-1/2 h-[378px] w-[378px] rounded-full border-[4px] border-white/80" />
                    <span className="ring-pulse ring-pulse-delay-1 pointer-events-none absolute left-1/2 top-1/2 h-[270px] w-[270px] rounded-full border-[4px] border-white/80" />
                    <span className="ring-pulse ring-pulse-delay-2 pointer-events-none absolute left-1/2 top-1/2 h-[152px] w-[152px] rounded-full border-[4px] border-white" />
                    <div className="absolute left-1/2 top-1/2 flex h-[84px] w-[84px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#003300]">
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

            <div className="flex w-full max-w-[994px] flex-col items-center gap-[56px]">
              <div
                className="w-full rounded-[25px] bg-white px-[18px] pb-[61px] pt-[107px]"
                style={{ boxShadow: '2px 4px 33.5px rgba(0, 0, 0, 0.12)' }}
              >
                <div className="mx-auto flex w-full max-w-[922px] flex-col items-center gap-10 sm:gap-[81px]">
                  <div className="flex max-w-[721px] flex-col items-center gap-5 text-center sm:gap-[45px]">
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

                  <div className="flex w-full flex-col gap-[10px]">
                    {faqItems.map((item, index) => (
                      <div
                        key={item.question}
                        className="flex w-full cursor-pointer flex-col rounded-[18px] transition-all duration-300 sm:rounded-[22px]"
                        style={{
                          backgroundColor: '#BBCB2E',
                          opacity: hoveredFaqIndex === index || expandedFaqIndex === index ? 1 : 0.5,
                          minHeight: expandedFaqIndex === index ? '160px' : '88px',
                          padding: expandedFaqIndex === index ? '22px 18px 24px 18px' : '26px 18px',
                          gap: expandedFaqIndex === index ? '15px' : '10px',
                          alignItems: expandedFaqIndex === index ? 'flex-start' : 'center',
                          justifyContent: expandedFaqIndex === index ? 'flex-start' : 'center',
                        }}
                        onMouseEnter={() => setHoveredFaqIndex(index)}
                        onMouseLeave={() => setHoveredFaqIndex(null)}
                        onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                      >
                        <div className="flex w-full items-center justify-between gap-4">
                          <span
                            className="pr-3 text-left font-[Geist] font-normal text-[#003300] sm:text-center"
                            style={{ fontSize: 'clamp(15px, 3.6vw, 20px)', lineHeight: 'clamp(22px, 4.8vw, 25px)' }}
                          >
                            {item.question}
                          </span>

                          <span 
                            className="relative shrink-0 transition-transform duration-300"
                            style={{ 
                              width: '22px', 
                              height: '11px',
                            }}
                          >
                            <Image
                              src={expandedFaqIndex === index ? 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334075/rnj/group-67-4180bee4.svg' : 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334077/rnj/vector-20-25c3631c.svg'}
                              alt={expandedFaqIndex === index ? 'Réduire' : 'Développer'}
                              fill
                              className="object-contain"
                              style={{ opacity: 0.5 }}
                            />
                          </span>
                        </div>
                        
                        {/* Answer content - shown when expanded */}
                        {expandedFaqIndex === index && (
                          <p
                            className="max-w-full font-[Geist] font-normal text-[#003300]"
                            style={{ fontSize: 'clamp(14px, 3.2vw, 16px)', lineHeight: 'clamp(20px, 4.2vw, 22px)', marginTop: '4px' }}
                          >
                            {item.answer}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 sm:gap-[14px]">
                <div
                  className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-white sm:h-[78px] sm:w-[78px]"
                  style={{ boxShadow: '2px 4px 33.5px rgba(0, 0, 0, 0.12)' }}
                >
                  <div className="relative h-[22px] w-[22px] sm:h-[26px] sm:w-[26px]">
                    <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333875/rnj/vector-18-18cc905b.svg" alt="Question icon" fill className="object-contain" />
                  </div>
                </div>

                <p
                  className="font-[Geist] font-medium text-[#003300]"
                  style={{ fontSize: 'clamp(14px, 3vw, 15px)', lineHeight: '17px', opacity: 0.2 }}
                >
                  Une question ?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <Footer />
      </main>

    <BookingModal open={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </>
  );
}
