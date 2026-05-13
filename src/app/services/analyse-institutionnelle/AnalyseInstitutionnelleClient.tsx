'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EB_Garamond, Geist } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  display: 'swap',
});


type CountryPin = {
  id: string;
  name: string;
  flag: string;
  cx: number;
  cy: number;
  tailY: number;
  projects: Array<{
    client: string;
    sector: string;
    description: string;
    pays: string;
    image: string;
    tone: string;
  }>;
};

const IMG_WINDMILL  = 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778667552/rnj/optimized/windmill-bg-9a2625d0.webp';
const IMG_CRANES    = 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778667553/rnj/optimized/cranes-bg-2b71b295.webp';
const IMG_SENSOR    = 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778667554/rnj/optimized/sensor-bg-280a37b8.webp';

const countryPins: CountryPin[] = [
  {
    id: 'tn', name: 'Tunisie', flag: '🇹🇳', cx: 1119.99, cy: 293.61, tailY: 349.56,
    projects: [{
      client: 'ONAS',
      sector: "Secteur de l'Assainissement",
      description: "Conseil Juridique de l'Office National de l'Assainissement (ONAS) dans le cadre du suivi de l'exécution du contrat de concession des ouvrages d'assainissement conclu avec SUEZ et EDP, en relation avec une mission d'audit initiée par la Banque Mondiale.",
      pays: 'Tunisie — 2025',
      image: IMG_WINDMILL,
      tone: '#DDE597',
    }],
  },
  {
    id: 'mr', name: 'Mauritanie', flag: '🇲🇷', cx: 859.84, cy: 524.76, tailY: 580.72,
    projects: [{
      client: 'Ministère',
      sector: 'Gouvernance & Réglementation',
      description: "Analyse institutionnelle et appui à la structuration du cadre réglementaire pour les investissements dans le secteur des ressources naturelles en Mauritanie.",
      pays: 'Mauritanie — 2024',
      image: IMG_WINDMILL,
      tone: '#839705',
    }],
  },
  {
    id: 'sn', name: 'Sénégal', flag: '🇸🇳', cx: 791.61, cy: 618.59, tailY: 674.54,
    projects: [{
      client: 'Investisseur Privé',
      sector: 'Énergie & Transition',
      description: "Accompagnement d'un investisseur dans l'analyse des opportunités et contraintes réglementaires dans le secteur énergétique sénégalais, en lien avec les objectifs de transition énergétique.",
      pays: 'Sénégal — 2024',
      image: IMG_CRANES,
      tone: '#BBCB2E',
    }],
  },
  {
    id: 'gn', name: 'Guinée', flag: '🇬🇳', cx: 853.87, cy: 689.38, tailY: 745.34,
    projects: [{
      client: 'Partenaire Institutionnel',
      sector: 'Conformité & ESG',
      description: "Mission d'analyse des cadres institutionnels et de conformité ESG pour sécuriser les projets d'investissement en République de Guinée.",
      pays: 'Guinée — 2024',
      image: IMG_WINDMILL,
      tone: '#DDE597',
    }],
  },
  {
    id: 'bf', name: 'Burkina Faso', flag: '🇧🇫', cx: 1028.73, cy: 701.32, tailY: 757.27,
    projects: [{
      client: 'Institution Publique',
      sector: 'Stratégie & Juridique',
      description: "Conseil stratégique et juridique pour l'analyse du cadre institutionnel et des risques réglementaires liés aux projets d'infrastructure au Burkina Faso.",
      pays: 'Burkina Faso — 2025',
      image: IMG_CRANES,
      tone: '#839705',
    }],
  },
  {
    id: 'bj', name: 'Bénin', flag: '🇧🇯', cx: 969.02, cy: 656.12, tailY: 712.07,
    projects: [{
      client: 'Entreprise Internationale',
      sector: 'Marchés & Conformité',
      description: "Analyse des conditions d'entrée sur le marché béninois et structuration juridique pour un opérateur international souhaitant développer ses activités en Afrique de l'Ouest.",
      pays: 'Bénin — 2025',
      image: IMG_CRANES,
      tone: '#BBCB2E',
    }],
  },
  {
    id: 'ne', name: 'Niger', flag: '🇳🇪', cx: 1129.38, cy: 581.06, tailY: 637.01,
    projects: [{
      client: 'Bailleur de Fonds',
      sector: 'Analyse Institutionnelle',
      description: "Mission d'analyse institutionnelle pour un bailleur de fonds international, couvrant l'évaluation des cadres légaux et réglementaires dans le secteur des ressources au Niger.",
      pays: 'Niger — 2024',
      image: IMG_WINDMILL,
      tone: '#DDE597',
    }],
  },
  {
    id: 'cd', name: 'Congo RDC', flag: '🇨🇩', cx: 1338.24, cy: 907.07, tailY: 963.03,
    projects: [{
      client: 'Groupe Industriel',
      sector: 'Ressources Naturelles',
      description: "Accompagnement d'un groupe industriel dans l'analyse du cadre légal minier et des enjeux de gouvernance en République Démocratique du Congo.",
      pays: 'Congo RDC — 2025',
      image: IMG_SENSOR,
      tone: '#B5E0EC',
    }],
  },
];

const relatedCategories = [
  { label: 'Juridique', widthClass: 'w-[131px]', active: false },
  { label: 'Strategie', widthClass: 'w-[134px]', active: false },
  { label: 'Marches', widthClass: 'w-[124px]', active: false },
  { label: 'Insights', widthClass: 'w-[117px]', active: false },
  { label: 'All', widthClass: 'w-[90px]', active: true },
] as const;

const relatedCards = [
  {
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1777410422/rnj/group-483-89ee6676.svg',
    year: '2026',
    title: 'Workshop BeCentral : digitalisation durable',
    description: 'Retour sur un échange autour des enjeux de la digitalisation responsable.',
  },
  {
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1777410425/rnj/group-482-365877a7.svg',
    year: '2024',
    title: "Informations de base sur les garanties d'origine (GO).",
    description: "Principes et fonctionnement des garanties d'origine dans le marché de l'énergie.",
  },
  {
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1777410428/rnj/group-484-04b278f7.svg',
    year: '2025',
    title: 'Accélération de la transition énergétique en Tunisie',
    description: 'Focus sur les initiatives et leviers pour accélérer la transition énergétique.',
  },
  {
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1777410430/rnj/group-481-8071b8c8.svg',
    year: '2025',
    title: 'CSR en Tunisie : cadre réglementaire',
    description: "Analyse du cadre juridique et des enjeux liés à l'utilisation du CSR en Tunisie.",
  },
] as const;

export default function AnalyseInstitutionnelleClient() {
  const [activePin, setActivePin] = useState<string | null>(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [bgImgReady, setBgImgReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeCountry = countryPins.find((p) => p.id === activePin) ?? null;
  const activeProject = activeCountry ? (activeCountry.projects[activeProjectIdx] ?? activeCountry.projects[0]) : null;
  const panelTextColor = activeProject?.tone === '#B5E0EC' ? '#0E434F' : '#003300';

  useEffect(() => {
    const srcs = [...new Set(countryPins.flatMap((p) => p.projects.map((proj) => proj.image)))];
    srcs.forEach((src) => { const img = new window.Image(); img.src = src; });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);


  useEffect(() => {
    if (activePin) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [activePin]);

  function openPin(id: string) {
    if (activePin === id) { setActivePin(null); }
    else { setActivePin(id); setActiveProjectIdx(0); setBgImgReady(false); }
  }
  function closePanel() { setActivePin(null); setActiveProjectIdx(0); setBgImgReady(false); }

  return (
    <main className="min-h-screen bg-[#F7FCFF]">
      {/* Compact centered navbar — responsive across all breakpoints */}
      <nav className="absolute left-1/2 top-3 z-50 -translate-x-1/2 flex flex-row items-center gap-1.5 sm:top-5 sm:gap-2 md:top-[30px] md:gap-[8px] lg:top-[47px] lg:gap-[10px]">
        {/* Logo icon */}
        <Image
          src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776333984/rnj/layer-4-955dc651.svg"
          alt="RNJ"
          width={35}
          height={40}
          className="h-[28px] w-[24px] flex-none sm:h-[32px] sm:w-[28px] md:h-[36px] md:w-[31px] lg:h-[40px] lg:w-[35px]"
          priority
        />

        {/* Search pill — hidden on small screens */}
        <div
          className="hidden sm:flex h-[42px] w-[200px] flex-none flex-row items-center gap-[12px] rounded-[12px] pl-[14px] md:h-[48px] md:w-[250px] md:rounded-[13px] md:pl-[16px] lg:h-[56px] lg:w-[307px] lg:rounded-[15px] lg:pl-[19px] lg:gap-[15px]"
          style={{ background: '#002600' }}
        >
          <svg width="18" height="20" viewBox="0 0 22 24" fill="none" className="flex-none">
            <circle cx="9" cy="10" r="7.5" stroke="white" strokeWidth="2"/>
            <path d="M14.5 16L20 21.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className={`${geist.className} text-[12px] font-semibold leading-[17px] text-white md:text-[13px] lg:text-[14px]`} style={{ opacity: 0.42 }}>
            Search...
          </span>
        </div>

        {/* 3 icon buttons */}
        <div className="flex flex-row items-center gap-1 sm:gap-1.5 lg:gap-[5px]">
          <Link
            href="/"
            className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[10px] sm:h-[42px] sm:w-[42px] sm:rounded-[12px] md:h-[48px] md:w-[48px] lg:h-[56px] lg:w-[56px] lg:rounded-[15px]"
            style={{ background: '#002600' }}
            aria-label="Retour"
          >
            <svg width="8" height="15" viewBox="0 0 10 18" fill="none">
              <path d="M9 1L1 9L9 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <Link
            href="/a-propos"
            className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[10px] sm:h-[42px] sm:w-[42px] sm:rounded-[12px] md:h-[48px] md:w-[48px] lg:h-[56px] lg:w-[56px] lg:rounded-[15px]"
            style={{ background: '#002600' }}
            aria-label="À propos"
          >
            <svg width="22" height="24" viewBox="0 0 27 29" fill="none">
              <path d="M9 7.5C9 9.71 7.21 11.5 5 11.5C2.79 11.5 1 9.71 1 7.5C1 5.29 2.79 3.5 5 3.5C7.21 3.5 9 5.29 9 7.5Z" stroke="white" strokeWidth="2.81"/>
              <path d="M1 21.5C1 18.19 2.79 15.5 5 15.5" stroke="white" strokeWidth="2.81" strokeLinecap="round"/>
              <path d="M18 12.5C18 14.71 16.21 16.5 14 16.5C11.79 16.5 10 14.71 10 12.5C10 10.29 11.79 8.5 14 8.5C16.21 8.5 18 10.29 18 12.5Z" stroke="white" strokeWidth="2.81"/>
              <path d="M7 25.5C7 22.19 10.13 19.5 14 19.5C17.87 19.5 21 22.19 21 25.5" stroke="white" strokeWidth="2.81" strokeLinecap="round"/>
            </svg>
          </Link>

          <Link
            href="/contact"
            className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[10px] sm:h-[42px] sm:w-[42px] sm:rounded-[12px] md:h-[48px] md:w-[48px] lg:h-[56px] lg:w-[56px] lg:rounded-[15px]"
            style={{ background: '#002600' }}
            aria-label="Contact"
          >
            <svg width="22" height="16" viewBox="0 0 27 20" fill="none">
              <rect x="1.41" y="1.41" width="24.18" height="17.18" rx="2" stroke="white" strokeWidth="2.8125"/>
              <path d="M1.41 5L13.5 12L25.59 5" stroke="white" strokeWidth="2.8125" strokeLinecap="round"/>
            </svg>
          </Link>
        </div>
      </nav>

      <section className="relative isolate w-full overflow-hidden bg-[#0E434F] min-h-[100svh] sm:min-h-[640px] md:min-h-[900px] lg:h-[1048px] lg:min-h-[1048px]">
        {/* Single SVG: map background + interactive pins in one coordinate space */}
        <div
          className="absolute overflow-hidden"
          style={{ inset: 0, transform: isMobile ? 'none' : 'scale(1.05)' }}
        >
          <svg
            viewBox={isMobile ? '560 80 920 960' : '0 0 1440 1024'}
            preserveAspectRatio={isMobile ? 'xMidYMid meet' : 'xMidYMid slice'}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            {/* Map background — always at full 1440×1024 coords */}
            <image
              href="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778667556/rnj/optimized/map-3-no-pins-72bd5ddf.svg"
              x="0" y="0" width="1440" height="1024"
              preserveAspectRatio="xMidYMid slice"
            />
            <defs>
              {(['tn','ne','cd','bf','bj','gn','sn','mr'] as const).map((id) => (
                <filter key={id} id={`phf-${id}`} x="-40%" y="-20%" width="180%" height="160%" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="4.19"/>
                  <feGaussianBlur stdDeviation="8.9"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.41 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="shadow"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="shadow" result="shape"/>
                </filter>
              ))}
            </defs>

            {/* Tunisia  — tail bottom y≈349.56, circle top y≈274.03 */}
            <g className="map-pin-svg-hit" filter="url(#phf-tn)" style={{ transformOrigin: '1119.99px 349.56px', cursor: 'pointer', touchAction: 'manipulation' }} onClick={() => openPin('tn')}>
              <path d="M1118.37 348.51C1118.66 349.149 1119.29 349.563 1119.99 349.563C1120.69 349.563 1121.33 349.149 1121.61 348.51L1123.19 306.849H1116.8Z" fill="#BDBDBD"/>
              <circle cx="1119.99" cy="293.612" r="19.578" fill="#E94625"/>
              <path d="M1118.98 310.589C1118.15 310.589 1117.47 309.912 1117.47 309.077C1117.47 308.243 1118.15 307.566 1118.98 307.566C1127.23 307.566 1133.95 300.853 1133.95 292.601C1133.95 291.766 1134.62 291.09 1135.46 291.09C1136.29 291.09 1136.97 291.766 1136.97 292.601C1136.97 297.406 1135.1 301.923 1131.7 305.321C1128.3 308.718 1123.79 310.589 1118.98 310.589Z" fill="white"/>
            </g>
            {/* Niger    — tail bottom y≈637.01, circle top y≈561.48 */}
            <g className="map-pin-svg-hit" filter="url(#phf-ne)" style={{ transformOrigin: '1129.38px 637.01px', cursor: 'pointer', touchAction: 'manipulation' }} onClick={() => openPin('ne')}>
              <path d="M1127.76 635.958C1128.04 636.597 1128.68 637.011 1129.38 637.011C1130.08 637.011 1130.71 636.597 1131 635.958L1132.58 594.297H1126.18Z" fill="#BDBDBD"/>
              <circle cx="1129.38" cy="581.058" r="19.578" fill="#E94625"/>
              <path d="M1128.36 598.034C1127.53 598.034 1126.85 597.358 1126.85 596.523C1126.85 595.688 1127.53 595.012 1128.36 595.012C1136.62 595.012 1143.33 588.299 1143.33 580.047C1143.33 579.212 1144.01 578.536 1144.84 578.536C1145.68 578.536 1146.35 579.212 1146.35 580.047C1146.35 584.852 1144.48 589.369 1141.08 592.767C1137.69 596.164 1133.17 598.035 1128.36 598.034Z" fill="white"/>
            </g>
            {/* Congo RDC — tail bottom y≈963.03 */}
            <g className="map-pin-svg-hit" filter="url(#phf-cd)" style={{ transformOrigin: '1338.24px 963.03px', cursor: 'pointer', touchAction: 'manipulation' }} onClick={() => openPin('cd')}>
              <path d="M1336.62 961.973C1336.91 962.612 1337.55 963.026 1338.24 963.026C1338.94 963.026 1339.58 962.612 1339.86 961.973L1341.44 920.312H1335.05Z" fill="#BDBDBD"/>
              <circle cx="1338.24" cy="907.071" r="19.578" fill="#E94625"/>
              <path d="M1337.23 924.05C1336.4 924.05 1335.72 923.374 1335.72 922.539C1335.72 921.704 1336.4 921.027 1337.23 921.027C1345.49 921.027 1352.2 914.314 1352.2 906.062C1352.2 905.227 1352.87 904.551 1353.71 904.551C1354.54 904.551 1355.22 905.227 1355.22 906.062C1355.22 910.867 1353.35 915.384 1349.95 918.782C1346.55 922.179 1342.04 924.051 1337.23 924.05Z" fill="white"/>
            </g>
            {/* Burkina  — tail bottom y≈757.27 */}
            <g className="map-pin-svg-hit" filter="url(#phf-bf)" style={{ transformOrigin: '1028.73px 757.27px', cursor: 'pointer', touchAction: 'manipulation' }} onClick={() => openPin('bf')}>
              <path d="M1027.11 756.221C1027.39 756.86 1028.03 757.274 1028.73 757.274C1029.43 757.274 1030.06 756.86 1030.35 756.221L1031.93 714.56H1025.53Z" fill="#BDBDBD"/>
              <circle cx="1028.73" cy="701.323" r="19.578" fill="#E94625"/>
              <path d="M1027.72 718.3C1026.88 718.3 1026.21 717.623 1026.21 716.788C1026.21 715.954 1026.88 715.277 1027.72 715.277C1035.97 715.277 1042.68 708.564 1042.68 700.312C1042.68 699.477 1043.36 698.801 1044.19 698.801C1045.03 698.801 1045.7 699.477 1045.7 700.312C1045.7 705.117 1043.83 709.634 1040.44 713.032C1037.04 716.429 1032.52 718.3 1027.72 718.3Z" fill="white"/>
            </g>
            {/* Bénin    — tail bottom y≈712.07 */}
            <g className="map-pin-svg-hit" filter="url(#phf-bj)" style={{ transformOrigin: '969.021px 712.07px', cursor: 'pointer', touchAction: 'manipulation' }} onClick={() => openPin('bj')}>
              <path d="M967.402 711.019C967.685 711.658 968.322 712.072 969.021 712.072C969.721 712.072 970.357 711.658 970.641 711.019L972.22 669.358H965.824Z" fill="#BDBDBD"/>
              <circle cx="969.021" cy="656.117" r="19.578" fill="#E94625"/>
              <path d="M968.01 673.096C967.175 673.096 966.499 672.419 966.499 671.584C966.499 670.75 967.175 670.073 968.01 670.073C976.262 670.073 982.975 663.36 982.975 655.108C982.975 654.273 983.651 653.597 984.486 653.597C985.321 653.597 985.997 654.273 985.997 655.108C985.997 659.913 984.126 664.43 980.729 667.828C977.331 671.225 972.814 673.096 968.009 673.096Z" fill="white"/>
            </g>
            {/* Guinée   — tail bottom y≈745.34 */}
            <g className="map-pin-svg-hit" filter="url(#phf-gn)" style={{ transformOrigin: '853.872px 745.34px', cursor: 'pointer', touchAction: 'manipulation' }} onClick={() => openPin('gn')}>
              <path d="M852.253 744.284C852.537 744.923 853.174 745.337 853.873 745.337C854.572 745.337 855.209 744.923 855.493 744.284L857.072 702.623H850.675Z" fill="#BDBDBD"/>
              <circle cx="853.872" cy="689.382" r="19.578" fill="#E94625"/>
              <path d="M852.861 706.36C852.026 706.36 851.35 705.684 851.35 704.849C851.35 704.014 852.026 703.338 852.861 703.338C861.113 703.338 867.826 696.625 867.826 688.373C867.826 687.538 868.503 686.862 869.338 686.862C870.172 686.862 870.849 687.538 870.849 688.373C870.849 693.178 868.978 697.695 865.58 701.093C862.183 704.49 857.665 706.361 852.86 706.361Z" fill="white"/>
            </g>
            {/* Sénégal  — tail bottom y≈674.54 */}
            <g className="map-pin-svg-hit" filter="url(#phf-sn)" style={{ transformOrigin: '791.607px 674.54px', cursor: 'pointer', touchAction: 'manipulation' }} onClick={() => openPin('sn')}>
              <path d="M789.988 673.486C790.272 674.125 790.908 674.539 791.607 674.539C792.307 674.539 792.943 674.125 793.227 673.486L794.807 631.826H788.41Z" fill="#BDBDBD"/>
              <circle cx="791.607" cy="618.585" r="19.578" fill="#E94625"/>
              <path d="M790.596 635.563C789.761 635.563 789.085 634.887 789.085 634.052C789.085 633.217 789.761 632.541 790.596 632.541C798.848 632.541 805.561 625.828 805.561 617.576C805.561 616.741 806.237 616.064 807.072 616.064C807.907 616.064 808.583 616.741 808.583 617.576C808.583 622.38 806.712 626.897 803.315 630.295C799.917 633.693 795.4 635.564 790.595 635.563Z" fill="white"/>
            </g>
            {/* Mauritanie — tail bottom y≈580.72 */}
            <g className="map-pin-svg-hit" filter="url(#phf-mr)" style={{ transformOrigin: '859.842px 580.72px', cursor: 'pointer', touchAction: 'manipulation' }} onClick={() => openPin('mr')}>
              <path d="M858.224 579.664C858.507 580.303 859.144 580.717 859.843 580.717C860.543 580.717 861.179 580.303 861.463 579.664L863.043 538.003H856.646Z" fill="#BDBDBD"/>
              <circle cx="859.842" cy="524.764" r="19.578" fill="#E94625"/>
              <path d="M858.832 541.741C857.997 541.741 857.321 541.064 857.321 540.229C857.321 539.395 857.997 538.718 858.832 538.718C867.084 538.718 873.797 532.005 873.797 523.753C873.797 522.918 874.473 522.242 875.308 522.242C876.143 522.242 876.819 522.918 876.819 523.753C876.819 528.558 874.948 533.075 871.551 536.473C868.154 539.87 863.636 541.741 858.831 541.741Z" fill="white"/>
            </g>
          </svg>
        </div>

        {/* ── Mobile/tablet hero layout: title top, button bottom, map visible middle ── */}
        <div className="pointer-events-none relative z-10 mx-auto flex h-[100svh] w-full flex-col px-5 pb-8 pt-[72px] sm:h-[640px] sm:px-6 sm:pb-12 sm:pt-[80px] md:h-[900px] md:px-12 md:pb-16 md:pt-[100px] lg:hidden">
          {/* Top block: region selector + title */}
          <div className="flex flex-col gap-3 md:gap-6">
            <div className={`${geist.className} inline-flex items-center gap-2 md:gap-3 text-[#9CD5E6]`}>
              <span className="text-[13px] font-semibold leading-none md:text-[18px]">&lt;</span>
              <div className="flex flex-col items-center gap-1 md:gap-2 leading-none">
                <span className="text-[8px] font-semibold uppercase text-white/30 md:text-[12px]">Asie</span>
                <span className="text-[13px] font-semibold uppercase text-white md:text-[18px]">Afrique</span>
                <span className="text-[8px] font-semibold uppercase text-white/30 md:text-[12px]">Europe</span>
              </div>
              <span className="text-[13px] font-semibold leading-none md:text-[18px]">&gt;</span>
            </div>
            <h1 className={`${ebGaramond.className} text-[clamp(36px,10vw,72px)] font-bold leading-[0.95] tracking-[-0.04em] text-white md:text-[clamp(56px,8vw,80px)]`}>
              Nos projets
            </h1>
            <p className={`${geist.className} hidden md:block max-w-[560px] text-[15px] font-semibold leading-[1.5] text-white/50`}>
              RNJ Advisory accompagne les entreprises, institutions et investisseurs dans l&rsquo;analyse des cadres institutionnels et réglementaires.
            </p>
          </div>

          {/* Bottom block: tagline + button pinned to bottom */}
          <div className="mt-auto flex flex-col gap-3 md:gap-5">
            <div className="inline-block max-w-full bg-[#DDE597] px-2 py-1 md:px-4 md:py-2">
              <p className={`${geist.className} text-[8px] font-black uppercase leading-tight tracking-[0.03em] text-[#0E434F] md:text-[11px]`}>
                Comprendre les environnements publics pour sécuriser vos décisions stratégiques
              </p>
            </div>
            <Link
              href="/contact?mode=message&subject=Analyse%20institutionnelle"
              className={`${geist.className} pointer-events-auto inline-flex h-[48px] w-auto items-center justify-between gap-2 self-start rounded-[105px] bg-[#839705] pl-5 pr-[3px] text-[14px] font-extrabold text-[#E7E7E7] shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition hover:brightness-105 md:h-[60px] md:pl-8 md:text-[16px]`}
            >
              <span>Contact us</span>
              <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#DDE597] md:h-[52px] md:w-[52px]">
                <span className="inline-block h-[12px] w-[12px] border-r-[2px] border-t-[2px] border-[#839705] rotate-45 translate-x-[-2px] md:h-[16px] md:w-[16px]" />
              </span>
            </Link>
          </div>
        </div>

        {/* ── Desktop hero layout ── */}
        <div className="pointer-events-none relative z-10 hidden w-full lg:block lg:h-full lg:min-h-[1048px] lg:max-w-[1544px] lg:px-0">
          <div className="lg:absolute lg:left-[5.69%] lg:right-[39.79%] lg:top-[21.58%] lg:max-w-[min(765px,54vw)] lg:flex lg:flex-col lg:items-start lg:gap-[clamp(20px,2.62vw,37px)]">
            <div className={`${geist.className} inline-flex items-center gap-[clamp(6px,0.71vw,10px)] text-[#9CD5E6]`}>
              <span className="text-[clamp(14px,1.42vw,20px)] font-semibold leading-none">&lt;</span>
              <div className="flex flex-col items-center gap-[clamp(8px,1.13vw,16px)] leading-none">
                <span className="text-[clamp(11px,1.06vw,15px)] font-semibold uppercase text-white/30">Asie</span>
                <span className="text-[clamp(14px,1.42vw,20px)] font-semibold uppercase text-white">Afrique</span>
                <span className="text-[clamp(11px,1.06vw,15px)] font-semibold uppercase text-white/30">Europe</span>
              </div>
              <span className="text-[clamp(14px,1.42vw,20px)] font-semibold leading-none">&gt;</span>
            </div>
            <h1 className={`${ebGaramond.className} mt-[clamp(20px,2.62vw,38px)] w-full text-[clamp(60px,6.81vw,98px)] font-bold leading-[0.95] tracking-[-0.04em] text-white`}>
              Nos projets
            </h1>
            <div className="mt-[clamp(20px,2.62vw,38px)] flex w-full flex-col gap-[clamp(18px,2.29vw,33px)]">
              <div className="inline-block w-full max-w-[min(700px,50vw)] bg-[#DDE597] px-[clamp(8px,0.99vw,14px)] py-[clamp(4px,0.5vw,7px)]">
                <p className={`${geist.className} text-[clamp(9px,0.9vw,13px)] font-black uppercase leading-tight tracking-[0.03em] text-[#0E434F]`}>
                  Comprendre les environnements publics pour sécuriser vos décisions stratégiques
                </p>
              </div>
              <p className={`${geist.className} w-full max-w-[min(785px,56vw)] text-[clamp(13px,1.14vw,16px)] font-semibold leading-[1.4] text-white/50`}>
                RNJ Advisory accompagne les entreprises, institutions et investisseurs dans l&rsquo;analyse des cadres
                institutionnels et r&eacute;glementaires. Nos &eacute;tudes permettent de s&eacute;curiser les projets, d&rsquo;assurer
                leur conformit&eacute; et d&rsquo;orienter les d&eacute;cisions dans des environnements complexes.
              </p>
              <Link
                href="/contact?mode=message&subject=Analyse%20institutionnelle"
                className={`${geist.className} pointer-events-auto inline-flex h-[clamp(48px,4.41vw,64px)] w-[clamp(170px,15.56vw,224px)] items-center justify-between rounded-[89.6px] bg-[#839705] pl-[clamp(24px,2.85vw,41px)] pr-[clamp(3px,0.31vw,4px)] text-[clamp(13px,1.2vw,17px)] font-extrabold leading-[1.1] text-[#E7E7E7] shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition hover:brightness-105`}
              >
                <span>Contact us</span>
                <span className="flex aspect-square h-[clamp(40px,3.79vw,55px)] items-center justify-center rounded-full bg-[#DDE597]">
                  <span className="inline-block h-[clamp(12px,1.32vw,19px)] w-[clamp(12px,1.32vw,19px)] border-r-[2px] border-t-[2px] border-[#839705] rotate-45 translate-x-[-2px]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* Country detail — full-width active state slides in as ONE unit (Figma Group 531) */}
        {activeCountry && (
          <div className="pointer-events-none fixed inset-0 z-[9999]">
            {/* click-away backdrop */}
            <div className="pointer-events-auto absolute inset-0" onClick={closePanel} />

            {/* Clip container */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* Blurred background — mobile: fadeIn, desktop: slideInRight */}
              <img
                src={activeProject!.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
                onLoad={() => setBgImgReady(true)}
                style={{ transform: 'scale(1.08)', transformOrigin: 'center', filter: 'blur(9px)', animation: isMobile ? 'fadeIn 500ms ease both' : 'slideInRight 750ms cubic-bezier(0.22,1,0.36,1) both' }}
              />

              {/* Panel — mobile: bottom-sheet, desktop: right panel */}
              <div
                className="pointer-events-auto absolute bottom-0 left-0 right-0 top-[25%] overflow-hidden rounded-t-[24px] md:top-[20%] lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:h-full lg:w-[min(633px,44vw)] lg:rounded-none"
                style={{ background: activeProject!.tone, animation: bgImgReady ? `${isMobile ? 'slideInUp' : 'slideInRight'} 550ms cubic-bezier(0.22,1,0.36,1) ${isMobile ? '80ms' : '80ms'} both` : 'none', opacity: bgImgReady ? undefined : 0 }}
                onClick={(e) => e.stopPropagation()}
              >
              {/* Close button */}
              <button
                type="button"
                onClick={closePanel}
                className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/10 transition hover:bg-black/20 sm:right-4 sm:top-4"
                style={{ color: panelTextColor }}
                aria-label="Fermer"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {/* ── Mobile/tablet layout (bottom-sheet) ── */}
              <div className="flex h-full flex-col lg:hidden">
                {/* Drag handle */}
                <div className="flex flex-shrink-0 justify-center pt-2.5 pb-2">
                  <div className="h-[4px] w-[40px] rounded-full bg-black/20" />
                </div>
                {/* Project image */}
                <div className="relative mx-4 mb-3 flex-shrink-0 overflow-hidden rounded-[10px] bg-black/10 sm:mx-6 md:mx-8" style={{ height: 'clamp(120px, 22vw, 240px)' }}>
                  <img src={activeProject!.image} alt={activeProject!.sector} className="h-full w-full object-cover" style={{ animation: 'panelImageIn 500ms cubic-bezier(0.22,1,0.36,1) 200ms both' }} />
                </div>
                {/* Scrollable content */}
                <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 pb-4 sm:gap-3 sm:px-6 sm:pb-5 md:gap-4 md:px-8 md:pb-6">
                  <p className={`${geist.className} text-[10px] font-medium tracking-[-0.02em] sm:text-[11px] md:text-[13px]`} style={{ color: panelTextColor, opacity: 0.5 }}>
                    Project {activeProjectIdx + 1}/{activeCountry.projects.length}
                  </p>
                  <p className={`${geist.className} text-[11px] font-medium uppercase leading-tight tracking-[-0.02em] sm:text-[12px] md:text-[14px]`} style={{ color: panelTextColor }}>
                    Client : {activeProject!.client}
                  </p>
                  <h3 className={`${ebGaramond.className} text-[clamp(22px,6vw,36px)] font-extrabold leading-[1.05] tracking-[-0.02em] md:text-[clamp(30px,4vw,44px)]`} style={{ color: panelTextColor }}>
                    {activeProject!.sector}
                  </h3>
                  <p className={`${geist.className} text-[12px] font-medium leading-[1.45] tracking-[-0.02em] sm:text-[13px] md:text-[15px]`} style={{ color: panelTextColor, opacity: 0.6 }}>
                    {activeProject!.description}
                  </p>
                  <p className={`${geist.className} text-[11px] font-medium uppercase leading-tight tracking-[-0.02em] md:text-[13px]`} style={{ color: panelTextColor, opacity: 0.35 }}>
                    Pays : {activeProject!.pays}
                  </p>
                </div>
                {/* Nav button — bottom right */}
                {activeCountry.projects.length > 1 && (
                  <div className="flex flex-shrink-0 justify-end px-4 pb-4 sm:px-8 sm:pb-5 md:px-10 md:pb-6">
                    <button
                      type="button"
                      onClick={() => setActiveProjectIdx((i) => (i + 1) % activeCountry.projects.length)}
                      className="flex h-12 w-12 items-center justify-center rounded-full transition hover:brightness-110 sm:h-14 sm:w-14 md:h-16 md:w-16"
                      style={{ background: panelTextColor === '#0E434F' ? '#0E434F' : '#003300' }}
                      aria-label="Projet suivant"
                    >
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M7 4L13 10L7 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* ── Desktop layout: flex-based responsive ── */}
              <div className="relative hidden h-full w-full lg:flex lg:flex-col">
                {/* Image */}
                <div
                  className="mx-[clamp(30px,8%,51px)] mt-[clamp(50px,7.5%,79px)] flex-shrink-0 overflow-hidden bg-[#D9D9D9]"
                  style={{ height: 'clamp(160px,23%,245px)' }}
                >
                  <img
                    src={activeProject!.image}
                    alt={activeProject!.sector}
                    className="h-full w-full object-cover"
                    style={{ animation: 'panelImageIn 500ms cubic-bezier(0.22,1,0.36,1) 200ms both' }}
                  />
                </div>

                {/* Project counter */}
                <p
                  className={`${geist.className} mt-3 px-[clamp(30px,8%,51px)] text-[clamp(10px,1.1vw,12px)] font-medium tracking-[-0.02em]`}
                  style={{ color: panelTextColor, opacity: 0.5 }}
                >
                  Project {activeProjectIdx + 1}/{activeCountry.projects.length}
                </p>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-[clamp(30px,8%,51px)] pb-[100px] pt-[clamp(16px,3%,32px)]">
                  <div className="flex flex-col gap-[clamp(24px,4%,51px)]">
                    <div className="flex flex-col gap-[clamp(12px,2%,20px)]">
                      <div className="flex flex-col gap-[clamp(12px,2%,20px)]">
                        <p
                          className={`${geist.className} text-[clamp(10px,1.1vw,12px)] font-medium uppercase leading-tight tracking-[-0.02em]`}
                          style={{ color: panelTextColor }}
                        >
                          Client : {activeProject!.client}
                        </p>
                        <h3
                          className={`${ebGaramond.className} text-[clamp(28px,3.5vw,41px)] font-extrabold leading-[1.05] tracking-[-0.02em]`}
                          style={{ color: panelTextColor }}
                        >
                          {activeProject!.sector}
                        </h3>
                        <p
                          className={`${geist.className} text-[clamp(12px,1.14vw,16px)] font-medium leading-[1.5] tracking-[-0.02em]`}
                          style={{ color: panelTextColor, opacity: 0.6 }}
                        >
                          {activeProject!.description}
                        </p>
                      </div>
                      <p
                        className={`${geist.className} text-[clamp(10px,1.1vw,12px)] font-medium uppercase leading-tight tracking-[-0.02em]`}
                        style={{ color: panelTextColor, opacity: 0.35 }}
                      >
                        Pays : {activeProject!.pays}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nav circle — bottom-right */}
                <button
                  type="button"
                  onClick={() => setActiveProjectIdx((i) => (i + 1) % activeCountry.projects.length)}
                  className="absolute bottom-[40px] right-[clamp(30px,8%,51px)] flex h-[clamp(48px,4.5vw,64px)] w-[clamp(48px,4.5vw,64px)] items-center justify-center rounded-full transition hover:brightness-110"
                  style={{ background: panelTextColor === '#0E434F' ? '#0E434F' : '#003300', opacity: activeCountry.projects.length > 1 ? 1 : 0.3 }}
                  aria-label="Projet suivant"
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
      </section>

      <section
        id="contenu-associe"
        className="relative z-[60] w-full scroll-mt-28 bg-white py-10 sm:py-12 md:py-16 lg:min-h-[681px] lg:py-[86px]"
      >
        <div className="mx-auto w-full max-w-[2163px] px-5 sm:px-6 md:px-10 lg:px-[60px]">
          <div className="mx-auto flex w-full max-w-[2043px] flex-col gap-6 sm:gap-8 lg:gap-[44px]">
            <div className="flex flex-col gap-5 sm:gap-7 lg:h-[52px] lg:flex-row lg:items-center lg:justify-between lg:gap-[301px]">
              <h2 className={`${geist.className} text-[24px] font-medium leading-[1] text-black/80 sm:text-[32px] md:text-[40px]`}>
                Contenu associ&eacute;
              </h2>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:h-[52px] lg:gap-4">
                {relatedCategories.map((category) => (
                  <button
                    key={category.label}
                    type="button"
                    className={`${geist.className} inline-flex h-[40px] items-center justify-center rounded-[160px] px-5 text-[14px] leading-[23px] transition sm:h-[46px] sm:px-6 sm:text-[16px] md:h-[52px] md:text-[20px] lg:${category.widthClass} ${
                      category.active
                        ? 'bg-[#BBCB2E] font-bold text-[#003300]/70'
                        : 'bg-[rgba(187,203,46,0.2)] font-medium text-[#003300]/50'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-3 sm:gap-4 lg:gap-[20.24px]">
                {relatedCards.map((card) => {
                  const imageOnlyDesktopWidth =
                    card.title === 'CSR en Tunisie : cadre réglementaire' ? 'lg:w-[391.6px]' : 'lg:w-[392.61px]';

                  return (
                    <div
                      key={card.title}
                      className={`relative h-[280px] w-[250px] shrink-0 sm:h-[340px] sm:w-[300px] md:h-[400px] md:w-[350px] lg:h-[447.25px] ${imageOnlyDesktopWidth}`}
                    >
                      <Image
                        src={card.src}
                        alt={card.title}
                        fill
                        sizes="(max-width: 640px) 250px, (max-width: 768px) 300px, (max-width: 1024px) 350px, 392px"
                        className="object-cover"
                      />
                    </div>
                  );
                })}

                <div className="h-[280px] w-[250px] shrink-0 rounded-[16px] bg-[#D9D9D9] sm:h-[340px] sm:w-[300px] sm:rounded-[18px] md:h-[400px] md:w-[350px] lg:h-[447.25px] lg:w-[392.61px] lg:rounded-[20.2377px]" />
              </div>
            </div>

            <div className="flex items-center gap-[15px]">
              <button
                type="button"
                aria-label="Precedent"
                className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#F1F5D5] sm:h-[40px] sm:w-[40px] md:h-[44px] md:w-[44px]"
              >
                <span className="inline-block h-[10px] w-[10px] border-b-[2.5px] border-l-[2.5px] border-[#003300] rotate-45 sm:h-[12px] sm:w-[12px] sm:border-b-[3px] sm:border-l-[3px]" />
              </button>
              <button
                type="button"
                aria-label="Suivant"
                className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#BBCB2E] sm:h-[40px] sm:w-[40px] md:h-[44px] md:w-[44px]"
              >
                <span className="inline-block h-[10px] w-[10px] border-b-[2.5px] border-l-[2.5px] border-[#003300] -rotate-[135deg] sm:h-[12px] sm:w-[12px] sm:border-b-[3px] sm:border-l-[3px]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778667552/rnj/optimized/mask-group-6-e75a83b2.png"
            alt=""
            fill
            className="object-cover object-bottom"
            sizes="100vw"
           loading="lazy"/>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
        </div>

        {/* Frame 490 — CTA area */}
        <div className="relative z-[1] flex flex-col items-center gap-10 px-5 pb-16 pt-10 sm:gap-16 sm:px-6 sm:pb-20 sm:pt-14 md:gap-20 md:pb-24 md:pt-16 lg:gap-[118px] lg:pb-[200px] lg:pt-20">
          {/* Line 13 — separator */}
          <div className="h-0 w-full max-w-[1392px] border-t-2 border-black/20" />

          {/* Frame 489 — content row */}
          <div className="flex w-full max-w-[1345px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:gap-[162px]">
            {/* Group 480 — text block */}
            <div className="flex max-w-[1067px] flex-col gap-0">
              <span className={`${geist.className} text-[20px] font-medium leading-[34px] tracking-[-0.04em] text-[#003300] sm:text-[24px] md:text-[32px]`}>
                Conseil strat&eacute;gique
              </span>

              <h2 className={`${ebGaramond.className} mt-8 text-[32px] font-medium leading-[1.05] tracking-[-0.04em] text-[#003300] sm:mt-12 sm:text-[44px] md:mt-[80px] md:text-[60px] lg:mt-[120px] lg:text-[96px] lg:leading-[97px]`}>
                Quel est le r&ocirc;le du conseil juridique dans vos d&eacute;cisions strat&eacute;giques&nbsp;?
              </h2>

              <p className={`${geist.className} mt-6 max-w-[611px] text-[14px] font-medium leading-[1.4] text-[#003300]/70 sm:mt-8 sm:text-[16px] md:mt-[51px] md:text-[20px] md:leading-[23px]`}>
                Dans un environnement r&eacute;glementaire complexe, le conseil juridique devient un levier cl&eacute; pour s&eacute;curiser, structurer et orienter les d&eacute;cisions &agrave; fort impact.
              </p>
            </div>

            {/* Frame 487 — arrow button */}
            <button type="button" className="shrink-0 self-start sm:self-end">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334107/rnj/frame-487-5f9f4c30.svg"
                alt="Voir plus"
                className="h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] lg:h-[116px] lg:w-[116px]"
              />
            </button>
          </div>
        </div>

        <div className="relative z-[1]">
          <Footer showTopRow={false} />
        </div>
      </div>
    </main>
  );
}
