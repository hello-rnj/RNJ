'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { EB_Garamond, Geist } from 'next/font/google';
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
    flags?: string[];
    image: string;
    tone: string;
  }>;
};

const IMG_WINDMILL  = 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779671380/rnj/optimized/windmill-bg-9a2625d0.webp';
const IMG_CRANES    = 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779671315/rnj/optimized/cranes-bg-2b71b295.webp';
const IMG_SENSOR    = 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779671364/rnj/optimized/sensor-bg-280a37b8.webp';
const IMG_RECHARGE       = '/optimized/electric-car-chargers-at-a-gas-station-with-a-par-2026-03-16-05-14-33-utc.jpg';
const IMG_PHOTOVOLTAIQUE = '/optimized/des%20Centrales%20photovolta%C3%AFques%20en%20auto%20production%20mutualis%C3%A9e.jpg';
const IMG_AUTOPRODUCTION = '/optimized/Projet%20autoproduction%20.jpg';
const IMG_HAMMAM         = '/optimized/Strat%C3%A9gie%20d%E2%80%99%C3%89cologie%20Industrielle%20%E2%80%93%20Hammam%20Zriba2.jpg';
const IMG_RENFORCEMENT   = '/optimized/signing-documents-at-a-business-meeting-2026-01-08-22-34-20-utc.JPG';
const IMG_CERTIFICATS    = '/optimized/wind-turbines-on-green-hill-under-blue-sky-2026-03-20-03-27-07-utc.jpg';
const IMG_POLES_TECH     = '/optimized/aerial-view-of-the-famous-wind-turbine-farm-in-nev-2026-03-18-07-47-41-utc.jpg';
const IMG_AGRI_VOLTAISME = '/optimized/desert-farm-near-al-ain-in-the-uae-2026-03-18-17-42-49-utc.jpg';
const IMG_AGRI_FARM      = '/optimized/industrial-farm-with-many-long-and-low-sized-grain-2026-01-07-07-22-31-utc.jpeg';
const IMG_PPA_TYPE       = '/optimized/construction-engineers-discussing-plans-near-excav-2026-03-24-04-04-23-utc.jpg';
const IMG_LOI_AUTORITE   = '/optimized/view-on-high-voltage-distribution-substation-of-fa-2026-03-26-04-47-07-utc.jpg';
const IMG_CADRAGE_JUR    = '/optimized/professional-at-desk-writing-in-notebook-2026-01-08-02-36-26-utc.jpg';
const IMG_ECO_DELTA      = '/optimized/aerial-view-of-large-sustainable-electrical-power-2026-03-17-06-40-55-utc.jpg';
const IMG_EFFICACITE     = '/optimized/area-with-the-installation-of-solar-panels-2026-03-18-09-51-21-utc.jpg';
const IMG_CODE_ENR       = '/optimized/wind-turbines-in-a-field-in-palm-springs-californ-2026-03-09-02-59-23-utc.jpg';
const IMG_REFORME_FONC   = '/optimized/scenic-view-of-lush-greenery-with-a-line-of-tall-2026-03-18-06-50-55-utc.jpg';
const IMG_FINANCEMENT    = '/optimized/beautiful-view-of-wind-turbines-on-a-wind-farm-alo-2026-03-18-16-04-10-utc.jpg';
const IMG_EPC_OM         = '/optimized/solar-technicians-discussing-maintenance-wearing-s-2026-03-18-05-42-57-utc.jpg';
const IMG_LOCATION_FONC  = '/optimized/beautiful-view-of-a-farmland-with-wind-turbines-on-2026-03-18-13-24-47-utc.jpg';
const IMG_ORGANE_REG     = '/optimized/close-up-of-hands-signing-official-documents-2026-03-18-16-04-42-utc.jpg';
const IMG_SEREE          = '/optimized/aerial-view-from-an-old-copper-mine-2026-01-08-00-23-09-utc.jpg';
const IMG_VOLTALIA       = '/optimized/solar-panels-with-historic-building-2026-03-18-11-04-44-utc.jpg';
const IMG_SMART_ENERGIE  = '/optimized/aerial-view-of-a-solar-farm-2026-03-18-06-57-51-utc.jpg';
const IMG_SOLAIRE_DESERT = '/optimized/solar-power-plant-in-a-deserted-area-2026-03-18-09-30-58-utc.jpg';
const IMG_PPA_TYPES      = '/optimized/row-of-wind-turbines-along-the-coast-of-bonaire-in-2026-03-18-12-19-17-utc.jpeg';
const IMG_EOLIEN_RESEAU  = '/optimized/wind-turbines-on-a-brown-field-near-mountains-2026-03-18-09-41-51-utc.jpg';
const IMG_EOLIEN_AUTO    = '/optimized/field-with-white-wind-generators-and-brick-buildin-2026-03-18-09-46-55-utc.jpg';
const IMG_BIZERTE        = '/optimized/Centrale-solaire-photovoltaique-Metbasta-Kairouan.jpg';
const IMG_MUTUAL_ZONES   = '/optimized/wide-angle-shot-of-the-nuclear-plants-of-a-city-ne-2026-03-18-09-47-01-utc.jpeg';
const IMG_MUTUAL_THERM   = '/optimized/pipes-and-structures-at-industrial-production-plan-2026-03-18-16-05-36-utc.jpg';
const IMG_ONAS           = '/optimized/ONAS.jpg';
const IMG_DECHETS_CSR    = '/optimized/c0580827-b18e-4d50-becb-5b02502ff350.png';
const IMG_NABEUL_VERTE   = '/optimized/20250115_162518-1536x865.jpg';
const IMG_PPP_EAU        = '/optimized/GAUFF_Engineering_Kompetenzen_Wasser_Header.jpg';
const IMG_HANNIBAL       = '/optimized/content_hydrogen01.jpg';
const IMG_STRAT_H2       = '/optimized/Usines-GCT-Gabes.jpg';
const IMG_CORRIDOR_TN    = '/optimized/hyf.jpg';
const IMG_STEG           = '/optimized/STEG.jpg';
const IMG_LEASING        = '/optimized/leasing-voiture-scaled.jpeg';
const IMG_COMMISSION_F   = '/optimized/images.jpg';
const IMG_HUB_DESIGN     = '/optimized/hub-design-nabeul.jpg';
const IMG_PORT_SBS       = '/optimized/port-plaisance-sidi-Bousaid-Appel-doffres.jpg';
const IMG_HYDROCARBURES  = '/optimized/oils5.jpg';
const IMG_ETAP_BG        = '/optimized/images%20(1).jpg';
const IMG_ENI_PERENCO    = '/optimized/images%20(2).jpg';
const IMG_BAGUEL         = '/optimized/energie-180526-2.jpg';
const IMG_PORT_RADE      = '/optimized/image001-15.png';
const IMG_LOGISTIQUE     = '/optimized/La-Logistique-Internationale-en-Tunisie-_-Un-Secteur-en-Pleine-Expansion.webp';
const IMG_FERROVIAIRE    = '/optimized/oncf-train-e1535819548871-900x600.jpg';
const IMG_PORT_GFH       = '/optimized/5d8e432af30f6.jpg';
const IMG_EPC_POSTES     = '/optimized/images%20(3).jpg';
const IMG_EPC_LIGNES     = '/optimized/images%20(4).jpg';
const IMG_TRANSFO        = '/optimized/transformateur-2.jpg';
const IMG_CENTRALE_450   = '/optimized/images%20(5).jpg';
const IMG_POMPAGE        = '/optimized/Immagine13.jpg';
const IMG_DESSALEMENT    = '/optimized/eaid.jpg';
const IMG_SNCFT_VOIES    = '/optimized/images%20(6).jpg';
const IMG_CIMENTERIE     = '/optimized/cimentOmKelil-ciment-Tunisie.jpg';
const IMG_SNCFT_LOCO     = '/optimized/sncft_locomotive_1480276453.jpg';
const IMG_MAURITANIE     = '/optimized/68b8575674724328019906.jpeg';
const IMG_SENEGAL        = '/optimized/transition-energetique-afrique1-1170x570.jpg';
const IMG_GUINEE         = '/optimized/DSC04537.jpg';
const IMG_BURKINA        = '/optimized/place_des_cineastes_ouaga.jpg';
const IMG_BENIN_ENR      = '/optimized/Energie-Renouvelable-1.jpg';
const IMG_BENIN_SONEB    = '/optimized/096580127520001657117147.jpg';
const IMG_NIGER          = '/optimized/768ffc12ce5898bd767efaf25a7b9638.jpg';
const IMG_CONGO          = '/optimized/thumbs_b_c_2483eeb694635f08af61b04412f44a43.jpg';


const countryPins: CountryPin[] = [
  {
    id: 'tn', name: 'Tunisie', flag: '🇹🇳', cx: 1119.99, cy: 293.61, tailY: 349.56,
    projects: [
      {
        client: 'Ministère de l\'Industrie, des mines et des énergies renouvelables (Tunisie) / EBRD',
        sector: 'Cadre réglementaire pour le projet Elmed',
        description: "Étude juridique pour la mise en place d'un cadre réglementaire propice pour la promotion du projet Elmed et la mise en place d'une autorité de régulation. Analyse du cadre réglementaire Tunisien applicable au secteur de l'électricité et plus particulièrement le secteur des énergies renouvelables. Actualisation des textes réglementaires relatifs à la création de l'autorité de régulation. Assistance à la mise en place d'un cadre réglementaire et contractuel propice pour l'export de l'électricité via la ligne Elmed. Proposition des modifications réglementaires au cadre légal actuel.",
        pays: 'Tunisie — 2025',
        image: IMG_WINDMILL,
        tone: '#DDE597',
      },
      {
        client: 'Ministère de l\'Industrie, des mines et des énergies renouvelables / EBRD',
        sector: 'Certificats d\'Attribut d\'Énergie et les Garanties d\'origine',
        description: "Étude juridique pour la mise en place d'un cadre réglementaire applicable à l'émission des certificats d'Attribut d'Énergie et des Garanties d'origine pour l'électricité produite à partir des énergies renouvelables. Analyse du cadre réglementaire Tunisien. Identification des parties prenantes et précision des rôles à jouer par lesdites parties. Proposition d'un cadre institutionnel propice pour l'émission des certificats verts et garanties d'origine. Préparation des textes réglementaires requis pour la mise en place du Projet.",
        pays: 'Tunisie — 2025',
        image: IMG_CERTIFICATS,
        tone: '#B5E0EC',
      },
      {
        client: 'ANME / Pôles Technologiques',
        sector: 'Cadre réglementaire pour la participation des Pôles Technologiques aux projets ENR',
        description: "Étude de faisabilité juridique se rapportant aux modalités et conditions de participation des pôles technologique aux projets de production d'électricité à partir des énergies renouvelables en Tunisie. Analyse du cadre réglementaire régissant les Pôles Technologiques. Identification des contraintes réglementaires liées au cadre réglementaire en vigueur. Proposition de solutions contractuelles pour la mise en œuvre des projets ENR, sous le régime de l'auto-production. Clarification au cadre réglementaire se rapportant à la mutualisation des infrastructures. Proposition d'améliorations réglementaires pour plus d'ouverture du cadre actuel aux initiatives des opérateurs économiques.",
        pays: 'Tunisie — 2025',
        image: IMG_POLES_TECH,
        tone: '#BBCB2E',
      },
      {
        client: 'Agence Foncière Industrielle',
        sector: 'Réalisation des Centrales photovoltaïques en auto production mutualisée',
        description: "Réalisation d'une étude de faisabilité juridique et procédurale d'un projet d'implantation de centrales photovoltaïques (au sol) d'autoproduction mutualisées au profit des industriels sur un site déporté propriété de l'Agence Foncière Industrielle. Analyser la faisabilité juridique et procédurale du projet. Identification des barrières et recommandations. Analyse du volet foncier (la vocation des terrains, sa mise en possession, son affectation, etc.). Analyse de l'aptitude juridique de l'AFI à réserver des emplacements spécifiques dans un lotissement industriel pour l'implantation des équipements nécessaires pour la production des énergies renouvelables à partir de l'énergie solaire photovoltaïque PV.",
        pays: 'Tunisie — 2025',
        image: IMG_PHOTOVOLTAIQUE,
        tone: '#DDE597',
      },
      {
        client: 'Ministère de l\'Énergie',
        sector: 'Renforcement des capacités des pouvoirs régionaux en matière des énergies renouvelables',
        description: "Conseil juridique dans le cadre de la réalisation d'une mission de formation et d'élaboration d'un plan d'action pour le projet Renforcement des capacités des pouvoirs régionaux en relation avec la mise en place des projets de production d'électricité à partir des énergies renouvelables. Animation de huit Ateliers de sensibilisation et de formation dans les régions de Nabeul, Médenine, Gabes, Tataouine, Tozeur, kasserine, Sidi Bouzid et Sfax au profit des représentants des collectivités locales, les directions régionales des différents ministères, des gouvernorats et la société civile. Etat des lieux et recensement des recommandation des parties prenantes. Préparation d'une feuille de route et un plan d'action pour la mise en application des recommandations des différents ateliers de sensibilisation.",
        pays: 'Tunisie — 2024',
        image: IMG_RENFORCEMENT,
        tone: '#B5E0EC',
      },
      {
        client: 'ANME',
        sector: 'Cadre réglementaire pour les infrastructures de recharge électrique - (Mobilité électrique)',
        description: "Conseil juridique dans le cadre Développement d'un cadre réglementaire, normatif et tarifaire des infrastructures de recharge des véhicules électriques en Tunisie. Animation d'un atelier de sensibilisation avec les différentes parties prenantes. Mettre en place un plan d'action pour les procédures à réaliser. Préparation d'une feuille de route pour le projet avec les parties prenantes. Préparation d'un projet de cahier des charges pour l'exercice de l'activité de recharge électrique des voitures. Préparation d'un projet d'arrêté d'approbation du Cahier des Charges réglementant l'activité recharge des voitures électriques. Élaboration d'une feuille de route pour la mise en place du projet.",
        pays: 'Tunisie — 2024',
        image: IMG_RECHARGE,
        tone: '#BBCB2E',
      },
      {
        client: 'ANME - GIZ',
        sector: 'Développement de la filière de l\'Agri voltaïsme',
        description: "Conseil juridique dans le cadre de la réalisation d'une étude relative à l'analyse stratégique sur les applications agri voltaïques en Tunisie et la proposition d'un cadre réglementaire approprié avec le contexte Tunisien. Identification des parties prenantes pour la mise en place du projet. Mettre en place d'un plan d'action. Élaboration d'une feuille de route pour la mise en place du projet.",
        pays: 'Tunisie — 2024',
        image: IMG_AGRI_VOLTAISME,
        tone: '#DDE597',
      },
      {
        client: 'AGRIMED',
        sector: 'Projet autoproduction AGRIMED (10 MW)',
        description: "Conseil juridique de AGRIMED dans le cadre de la mise en place de la documentation contractuelle se rapportant à la réalisation d'un projet de production d'électricité à partir des énergies renouvelables dans le cadre du régime de l'auto-production. Préparation du projet de contrat EPC et ses annexes. Préparation du projet de Contrat O&M est se annexes. Préparation d'un projet de Power Purchase Agreement (PPA) – Projet 10 MW.",
        pays: 'Tunisie — 2024',
        image: IMG_AGRI_FARM,
        tone: '#B5E0EC',
      },
      {
        client: 'ANME',
        sector: 'Revue du cadre juridique – 4 centrales d\'autoproduction Mutualisée',
        description: "Assistance juridique de l'ANME dans le cadre de la revue du contexte juridique applicable à l'implémentation d'un projet de production d'électricité à partir des énergies renouvelables (solaire) et ce par la mise en place de quatre centrales d'autoproduction électriques déportées à partir de l'énergie solaire au profit de l'APIA, APII, AFI et l'ANME. Analyse du cadre réglementaire. Identification des contraintes. Elaboration d'un manuel de procédure. Établissement d'une feuille de route.",
        pays: 'Tunisie — 2023',
        image: IMG_AGRI_FARM,
        tone: '#BBCB2E',
      },
      {
        client: 'Ministère de l\'Énergie',
        sector: 'Amélioration des termes et conditions du PPA type applicable au projets autorisation',
        description: "Assistance juridique pour le compte du Ministère chargé de l'énergie pour l'amélioration des dispositions contractuelles du Power Purchase Agreement (PPA) applicables régime de production d'électricité à partir des énergies renouvelables sous le régime de l'autorisation afin de permettre la bancabilité des projets. Réunion avec les différentes parties prenantes et recensement de leurs avis. Identification des contraintes signalées par les développeurs et les bailleurs de fonds. Réunions avec les responsables du ministère en charge de l'énergie et la STEG. Proposition d'un draft d'un nouveau PPA applicable aux projets de production d'électricité soit le régime de l'autorisation.",
        pays: 'Tunisie — 2023',
        image: IMG_PPA_TYPE,
        tone: '#B5E0EC',
      },
      {
        client: 'Ministère de l\'énergie',
        sector: 'Rédaction du PPA Corporate type applicable aux projets autoproduction',
        description: "Assistance juridique du Ministère chargé de l'énergie pour la préparation et la rédaction du PPA Corporate applicable aux projets de production d'électricité à partir des énergies renouvelables relatifs aux projets d'auto-production. Réunion avec les différentes parties prenantes et recensement de leurs avis. Identification des contraintes signalées par les développeurs des projets autoconsommation et les bailleurs de fonds. Réunions avec les responsables du ministère en charge de l'énergie et la STEG. Proposition d'un draft d'un nouveau PPA Corporate applicable aux projets de production d'électricité soit le régime de l'autoproduction.",
        pays: 'Tunisie — 2023',
        image: IMG_WINDMILL,
        tone: '#DDE597',
      },
      {
        client: 'Ministère de l\'énergie',
        sector: 'Projet de loi pour l\'Autorité de Régulation du secteur électrique',
        description: "Assistance juridique du Ministère chargé de l'énergie en relation avec la préparation du projet d'une loi organique relative à la création de l'Autorité de Régulation du secteur de l'électricité. Réunion avec les parties prenantes et recueil de leurs avis. Drafting d'un projet de loi de création de l'autorité de régulation. Fixation de l'organisation interne de l'autorité de régulation et les différentes structures administratives. Identification des mécanismes de gestion, de délibération, de pris de décision et des recours. Fixation des prérogatives et des attributions de l'autorité de régulation.",
        pays: 'Tunisie — 2023',
        image: IMG_LOI_AUTORITE,
        tone: '#B5E0EC',
      },
      {
        client: 'DEMCO',
        sector: 'Cadrage juridique projets Auto production',
        description: "Assistance juridique du groupe DEMCO en relation avec le cadrage juridique de ses projets énergétiques en Tunisie et la mise en place des solutions en relation avec le développement du photovoltaïque en Tunisie – SUNREF – Assistance technique des projets PV. Proposition d'un cadre contractuel pour l'implémentation d'un projet photovoltaïque pour bénéficier de l'empreinte carbone.",
        pays: 'Tunisie — 2022',
        image: IMG_CADRAGE_JUR,
        tone: '#BBCB2E',
      },
      {
        client: 'Eco Delta',
        sector: 'Accompagnement Eco Delta dans la réalisation d\'un projets solaire de 10 MW',
        description: "Conseiller du promoteur Eco Delta titulaire d'un accord de principe pour la production d'électricité (10Mw Solaire) dans le cadre du régime de l'autorisation. Constitution de la société Centrale Solaire de Medenine. Préparation statuts. Procès-verbaux constitutifs de la SPV. Régularisation du volet foncier en relation avec le terrain affecté au projet. Etablissement du contrat de location. Obtention des autorisations requises pour le projet.",
        pays: 'Tunisie — 2022',
        image: IMG_ECO_DELTA,
        tone: '#DDE597',
      },
      {
        client: 'KFW',
        sector: 'Mécanisme de financement des projets énergétiques - Garantie de paiement',
        description: "Conseiller de KFW en relation avec la mise en place d'un mécanisme de financement pour le compte de la STEG à utiliser comme garantie de paiement des producteurs privés d'électricité à partir des énergies renouvelables dans le cadre des régimes des autorisations ou des concessions. Etude du cadre réglementaire tunisien en relation avec la mise en place et la gestion des comptes séquestres. Revue et modification de la structure contractuelle adoptée pour ce type de transaction.",
        pays: 'Tunisie — 2021',
        image: IMG_SENSOR,
        tone: '#B5E0EC',
      },
      {
        client: 'Dahlia',
        sector: 'Projet autoproduction Dahlia Group',
        description: "Conseiller de la société Dahlia Group en relation avec la mise en place de la documentation requise pour la mise en place d'un projet d'autoproduction d'électricité à partir des énergies renouvelables. Identification des autorisations préalables. Identification des parties prenantes. Préparation d'un contrat de fourniture de service énergétique.",
        pays: 'Tunisie — 2021',
        image: IMG_AUTOPRODUCTION,
        tone: '#BBCB2E',
      },
      {
        client: 'RTI (Efficacité énergétique – Transition énergétique)',
        sector: 'Étude stratégique efficacité énergétique',
        description: "Conseiller de RTI organisation non gouvernementale dans le cadre de la préparation d'une étude stratégique et d'accompagnement technique de la Tunisie dans le cadre du domaine de l'efficacité énergétique et des énergies renouvelables et la transition énergétique. – Projet USAID.",
        pays: 'Tunisie — 2021',
        image: IMG_EFFICACITE,
        tone: '#DDE597',
      },
      {
        client: 'Ministère de l\'énergie',
        sector: 'Etablissement d\'un Nouveau code des énergies renouvelables',
        description: "Conseiller du Ministère chargé de l'énergie et PNUD dans le cadre de la préparation d'un nouveau code pour les énergies renouvelables en Tunisie permettant la réalisation de la transition énergétique dans le pays. Animation de plusieurs ateliers de concertation avec les parties prenantes. Réalisation de sondage et de recensement d'avis des différents interlocuteurs privés et publics. Etablissement d'un plan d'action et d'une feuille de route pour l'adoption du nouveau code des énergies renouvelables. Préparation d'un projet de code des énergies renouvelables.",
        pays: 'Tunisie — 2021',
        image: IMG_CODE_ENR,
        tone: '#B5E0EC',
      },
      {
        client: 'GIZ',
        sector: 'Réforme foncière pour les projets ENR – Préparation d\'un guide foncier',
        description: "Conseiller juridique de la GIZ et le Ministère chargé de l'énergie dans le cadre de la mise en place d'une étude institutionnelle portant sur une réforme législative du volet foncier applicable aux projets de production d'électricité à partir des énergies renouvelables et la proposition d'un projet de loi. Animation de plusieurs ateliers de concertation avec les parties prenantes. Identification des différentes parties prenantes en relation avec les aspects fonciers. Etablissement d'une feuille de route pour le projet. Établissement d'un guide pratique se rapportant aux différentes autorisations foncières requises pour les projets de production d'électricité à partir des énergies renouvelables.",
        pays: 'Tunisie — 2020',
        image: IMG_REFORME_FONC,
        tone: '#BBCB2E',
      },
      {
        client: 'AFD – BAD – EBRD',
        sector: 'Financement des concessions ENR (500 MW)',
        description: "Conseiller des bailleurs de fonds (AFD – BAD – EBRD) en relation avec la mise en place des financements des projets de production d'électricité à partir des énergies renouvelables réalisés par la Tunisie dans le cadre des concessions (500 MW). Analyse des conditions d'entrée en vigueur des concessions. Vérification de la réalisation des conditions suspensives de l'entrée en vigueur. Etablissement d'avis juridiques sur la validité du processus d'entrée en vigueur des concessions. Accompagnement de la finalisation du bouclage financier des projets. Revue et commentaires des accords directes avec les bailleurs de fonds.",
        pays: 'Tunisie — 2020',
        image: IMG_FINANCEMENT,
        tone: '#DDE597',
      },
      {
        client: 'GIZ',
        sector: 'Modèles de contrats EPC et O&M – Projets Energies Renouvelables',
        description: "Conseiller juridique de la GIZ dans le cadre de mise en place des modèles de contrats EPC et contrats O&M pour le compte des opérateurs titulaires d'autorisations dans le cadre des projets d'énergies renouvelables en Tunisie. Animation d'atelier de restitution de livrable avec les différentes parties prenantes. Préparation d'un draft de contrat EPC modèle pour la construction clés en main d'une centrale photovoltaïque en Tunisie. Préparation d'un draft de contrat O&M pour l'exploitation d'une centrale photovoltaïque en Tunisie. Animation d'ateliers de formation des parties prenantes.",
        pays: 'Tunisie — 2019',
        image: IMG_EPC_OM,
        tone: '#B5E0EC',
      },
      {
        client: 'GIZ',
        sector: 'Modèle de contrat de location foncière – Projets Energies Renouvelables',
        description: "Conseiller juridique de la GIZ dans le cadre de la préparation d'un modèle de contrat type pour la sécurisation foncière des terrains privés utilisés dans le cadre de la réalisation de projets de production d'électricité à partir des énergies renouvelables. Animation d'un atelier de formation avec les différentes parties prenantes. Etablissement d'un modèle de contrat de promesse de location pour un terrain dédié à un projet de réalisation d'une centrale électrique. Etablissement d'un projet de contrat de location d'un terrain privé affecté pour la construction d'une centrale solaire photovoltaïque. Animation d'un atelier de validation du livrable final.",
        pays: 'Tunisie — 2019',
        image: IMG_LOCATION_FONC,
        tone: '#BBCB2E',
      },
      {
        client: 'ANME - PNUD',
        sector: 'Étude pour la mise en place d\'un organe de régulation',
        description: "Conseiller juridique de l'Agence Nationale pour la maîtrise de l'énergie (ANME) dans le cadre de la réalisation d'une étude juridico-technique pour la mise en place d'un organe de régulation pour le secteur de l'électricité. Définition des prérogatives de l'autorité de régulation. Fixation de l'organisation administrative de l'autorité de régulation. Détermination des ressources de fonctionnement de l'autorité de régulation. Fixation du champ d'intervention de l'autorité de régulation.",
        pays: 'Tunisie — 2019',
        image: IMG_ORGANE_REG,
        tone: '#DDE597',
      },
      {
        client: 'ETAP',
        sector: 'Projet SEREE (ETAP/ENI) – Projet Energie renouvelable 10 MW',
        description: "Conseiller juridique de la SPV « SEREE » constituée par l'Entreprise Tunisienne des Activités Pétrolières « ETAP » et « ENI » pour la réalisation d'une centrale solaire de 10 MW sous le régime de l'autorisation – Project Financing. Analyse du cadre légal applicable aux projet ENR sous le régime de l'autorisation. Etablissement de la liste des autorisations requises pour la réalisation du projet. Commentaire sur le projet de PPA retenu pour le projet. Création de la société du projet. Assistance à la réalisation de l'Augmentation du capital de la société du projet pour le financement du projet.",
        pays: 'Tunisie — 2019',
        image: IMG_SEREE,
        tone: '#B5E0EC',
      },
      {
        client: 'Voltalia',
        sector: 'Projet Voltalia – Concession solaire de 100 MW',
        description: "Conseiller de Voltalia dans la cadre de la réalisation d'un projet de production d'électricité (100 MW) sous le régime de la concession en vue de la vente exclusive de l'énergie produite à la STEG Project Financing. Etablissement d'un rapport sur le cadre réglementaire applicable aux projet ENR en Tunisie. Identification des contraintes légales pour la mise en place d'un projet suivant la technique de l'offre spontanée. Audit du volet foncier relatif au terrain choisi pour la réalisation du projet. Identification de l'ensemble des autorisations requises pour le projet concession.",
        pays: 'Tunisie — 2019',
        image: IMG_VOLTALIA,
        tone: '#BBCB2E',
      },
      {
        client: 'SMART',
        sector: 'Projet Smart Energie / Tozzi Green – 10 MW autorisation',
        description: "Conseiller juridique du Consortium Smart Energie et Tozzi Green pour la réalisation d'une centrale solaire de 10 MW sous le régime de l'autorisation – Project Financing. Création de la SPV. Sécurisation foncière et revue de la documentation relative à la location du terrain. Identification de l'ensemble des autorisations requises pour le projet autorisation. Analyse et revue de la documentation de financement du projet. Pacte d'actionnaires avec partenaires.",
        pays: 'Tunisie — 2018',
        image: IMG_SMART_ENERGIE,
        tone: '#DDE597',
      },
      {
        client: 'AGRIMED',
        sector: 'Projet Agrimed / AE 3000 – Centrale solaire de 10 MW - Régime autorisation',
        description: "Conseiller juridique du Consortium Agrimed – AE 3000 pour la réalisation d'une centrale solaire de 10 MW sous le régime de l'autorisation – Project Financing. Revue documents d'appel d'offres. Préparation des documents de l'offre. Revue contrats avec partenaires (accord de groupement, accord de sous traitance). Etablissement d'un rapport sur les autorisations requises pour le projet. Analyse critiques des dispositions du PPA et identification des risques de la non bancabilité du PPA.",
        pays: 'Tunisie — 2018',
        image: IMG_SOLAIRE_DESERT,
        tone: '#B5E0EC',
      },
      {
        client: 'Agence Nationale pour la Maîtrise de l\'énergie',
        sector: 'Projet Elaboration des PPA types pour les projets énergies renouvelable',
        description: "Conseiller de l'Agence Nationale pour la Maîtrise de l'Energie dans le cadre de la préparation des projets types du Power Purchase Agreement (PPA) applicables aux projets de production d'électricité à partir des énergies renouvelables.",
        pays: 'Tunisie — 2016',
        image: IMG_PPA_TYPES,
        tone: '#BBCB2E',
      },
      {
        client: 'ANME - GIZ',
        sector: 'Étude réglementaire pour le développement des projets ENR',
        description: "Conseiller juridique de la GIZ et L'Agence Nationale pour la Maîtrise de l'Energie pour la réalisation d'une étude déterminant le cadre réglementaire propice pour le développement des énergies renouvelables en Tunisie. L'étude a porté sur : les régime à adopter pour la production d'électricité à partir des énergies renouvelables, le cadre incitatif à accorder à la nouvelle filière, l'identification des parties prenantes impliquées dans la réalisation des projets ENR.",
        pays: 'Tunisie — 2016',
        image: IMG_WINDMILL,
        tone: '#DDE597',
      },
      {
        client: 'ANME',
        sector: 'Étude juridique pour le développement des projets éoliens connecté au réseau',
        description: "Conseiller de l'Agence Nationale pour la Maîtrise de l'Énergie dans le cadre de la validation de l'étude relative au développement par le secteur privé de l'électricité éolienne connectée au réseau. Animation atelier de restitution du Livrable final. Préparation rapport incluant les recommandations des différentes parties prenantes.",
        pays: 'Tunisie — 2016',
        image: IMG_EOLIEN_RESEAU,
        tone: '#B5E0EC',
      },
      {
        client: 'Renegi+D',
        sector: 'Développement d\'un Projet éolien sous le régime de l\'autoproduction',
        description: "Conseiller de la société espagnole Renegi+D dans le cadre de la réalisation d'un projet de production d'électricité à partir d'un parc éolien en vue de sa vente pour les grands consommateurs (projet d'auto production). Etude du cadre réglementaire applicable aux projet ENR éolien. Analyse du volet foncier se rapportant aux projets éoliens. Identification des différentes autorisations et parties prenantes impliquées dans le cadre de la délivrance des autorisations administratives. Identification des contraintes légales se rapportant au développement de l'activité éolienne. Établissement d'un rapport final incluant une feuille de route pour l'implémentation du projet.",
        pays: 'Tunisie — 2015‑2016',
        image: IMG_EOLIEN_AUTO,
        tone: '#BBCB2E',
      },
      {
        client: 'UPC',
        sector: 'Projet autoproduction – Cimenterie de Gabès (60 MW)',
        description: "Conseiller de UPC dans le cadre de la réalisation d'un projet d'auto production pour le compte de la Cimenterie de Gabes (projet d'auto production d'une puissance de 60 MW). Etude du cadre réglementaire applicable aux projet ENR sous le régime de l'auto production. Identification des contraintes réglementaire à la mise en place des projet auto production. Proposition de montage contractuel pour la mise en place des projets autoproduction. Préparation d'un projet de contrat de service énergétique applicable aux auto consommateurs. Établir une feuille de route pour la réalisation du projet.",
        pays: 'Tunisie — 2014',
        image: IMG_AUTOPRODUCTION,
        tone: '#DDE597',
      },
      {
        client: 'ENEL',
        sector: 'Projet éolien pour dessalement de l\'eau de mer',
        description: "Conseiller de ENEL pour l'élaboration d'une étude relative au développement d'un projet de production au moyen d'une centrale éolienne pour l'alimentation d'une station de dessalement dans la région de Kebili au sud de la Tunisie. Etablissement d'un rapport sur l'état des lieux et les contraintes légales à la réalisation du projet. Identification des différentes autorisations administratives requises pour le projet. Identification des parties prenantes impliquées dans le projet. Établissement d'une feuille de route pour le projet.",
        pays: 'Tunisie — 2011',
        image: IMG_EOLIEN_AUTO,
        tone: '#B5E0EC',
      },
      {
        client: 'Groupement Taqa et Mitsui (Production d\'électricité)',
        sector: 'Projet centrale Bizerte (450 MW) en IPP - régime Concession',
        description: "Conseiller Juridique du Groupement Taqa Mitsui en relation avec la réalisation de la centrale de Bizerte (450MW) en mode IPP y compris/ La revue du dossier d'appel d'offres lancé par la STEG. La revue de la convention de concession de production d'électricité. La revue du contrat de cession d'électricité. La revue des accords directs à signer avec les bailleurs de fonds.",
        pays: 'Tunisie — 2009',
        image: IMG_BIZERTE,
        tone: '#BBCB2E',
      },
      {
        client: 'Ministère de l\'Industrie des mines et de l\'énergie',
        sector: 'Mise en place d\'une Stratégie d\'écologie industrielle – Zone Industrielle de Hammam Zriba',
        description: "Mise en place d'une stratégie d'écologie industrielle et territoriale dans la zone industrielle de Hammam Zriba. Instauration d'une stratégie et d'un plan d'action de symbiose industrielle dans la zone industrielle de Hammam Zriba. Identification et analyse de la réglementation environnementale industrielle et économique applicable à la symbiose industrielle (gestion des déchets, utilisation des ressources, transfert de matière première et d'énergie). Elaboration des conventions de mutualisation des flux, des contrats fixant les droits et obligations des parties prenantes impliquées dans la symbiose. Mettre en place d'un modèle de gouvernance facilitant la coordination et la gestion des interactions entre les parties prenantes. Identifier les vulnérabilités juridiques associées à la mise en œuvre du projet (aspects fiscaux, sécurité environnementale, conformité réglementaire).",
        pays: 'Tunisie — 2025',
        image: IMG_HAMMAM,
        tone: '#DDE597',
      },
      {
        client: 'Agence Foncière Industrielle',
        sector: 'Mise ne place d\'un cadre réglementaire pour la Mutualisation des utilités thermiques dans les zones industrielles',
        description: "Réalisation d'une étude de faisabilité juridique et procédurale pour le compte de l'AFI d'un projet portant sur la mutualisation des installations de production et de distribution des utilités thermiques (Chaud Froids et Vapeur) à l'intérieur des zones industrielles. Analyser du cadre réglementaire et identification des obstacles. Identification des barrières réglementaires et recommandations de modification de textes législatifs. Préparation d'une feuille de route pour la mise en place du projet. Animation d'ateliers de sensibilisation avec les membres des zones industrielles. Analyse de l'aptitude juridique de l'Agence Foncière Industrielle à réserver des emplacements spécifiques dans un lotissement industriel pour l'implantation des équipements de production des utilités thermiques.",
        pays: 'Tunisie — 2025',
        image: IMG_MUTUAL_ZONES,
        tone: '#B5E0EC',
      },
      {
        client: 'ANME',
        sector: 'Mutualisation des utilités thermiques',
        description: "Conseil juridique dans le cadre de la réalisation d'une étude sur le cadre réglementaire pour la mutualisation des utilités thermiques dans les zones industrielles. L'étude a été menée sur demande de l'ANME, en coordination avec le programme SUNREF; et a permis de réfléchir au cadre réglementaire le plus adéquat pour produire, distribuer et commercialiser des utilités thermiques dans des zones industrielles avec la mise en place d'un cahier des charges dédié.",
        pays: 'Tunisie — 2022',
        image: IMG_MUTUAL_THERM,
        tone: '#BBCB2E',
      },
      {
        client: 'ONAS – Projet Assainissement',
        sector: 'Suivi concession assainissement – ONAS / SUEZ / EDP',
        description: "Conseil Juridique de l'Office National de l'Assainissement (ONAS) dans le cadre du suivi de l'exécution du contrat de concession des ouvrages d'assainissement conclu avec SUEZ et EDP, en relation avec une mission d'audit initiée par la Banque Mondiale. Préparation rapport d'audit portant sur les deux concessions. Atelier de validation avec le client.",
        pays: 'Tunisie — 2025',
        image: IMG_ONAS,
        tone: '#DDE597',
      },
      {
        client: 'Ministère de l\'Environnement – Valorisation des déchet – Economie circulaire',
        sector: 'Cadre réglementaire valorisation des déchets – CSR',
        description: "Conseiller juridique du Ministère chargé de l'environnement pour la mise en place d'un nouveau cadre réglementaire applicable à la valorisation des déchets et la fabrication d'un combustible alternatif de substitution. Préparation d'un projet d'arrêtés fixant les conditions de production, de transport et de commercialisation du Combustile solide de récupération (CSR).",
        pays: 'Tunisie — 2024',
        image: IMG_DECHETS_CSR,
        tone: '#B5E0EC',
      },
      {
        client: 'Ministère de l\'Environnement',
        sector: 'Projet \"Valorisation des déchets pour la fabrication d\'un Combustible solide de récupération\"',
        description: "Conseiller juridique du Ministère chargé de l'environnement pour la mise en place d'un nouveau cadre réglementaire applicable à la valorisation des déchets et la fabrication d'un combustible alternatif de substitution. Audit du cadre réglementaire et identification des problématiques et insuffisances. Identification des parties prenantes. Préparation d'un projet d'arrêtés fixant les conditions de production, de transport et de commercialisation du Combustible solide de récupération (CSR).",
        pays: 'Tunisie — 2024',
        image: IMG_CRANES,
        tone: '#BBCB2E',
      },
      {
        client: 'Institut Italien de Coopération',
        sector: 'Projet \"Nabeul Ville Verte\" – Institut Italien de Coopération',
        description: "Conseiller juridique de l'institut Italien de coopération dans le cadre de la réalisation d'une étude de faisabilité juridique pour la réalisation d'un projet de valorisation des déchets dans le Gouvernorat de Nabeul. – Projet «Nabeul Ville Verte ».",
        pays: 'Tunisie — 2023',
        image: IMG_NABEUL_VERTE,
        tone: '#DDE597',
      },
      {
        client: 'Water 4life',
        sector: 'Étude stratégique du cadre des PPPs applicable au secteur de l\'eau',
        description: "Conseiller du bureau Water4life dans le cadre de l'élaboration d'une étude stratégique pour le secteur des PPP en Tunisie en relation avec le secteur de l'eau. Diagnostic du cadre réglementaire et identification des aspects d'amélioration. Identification des parties prenantes en relation avec la mise en place des projets hydrauliques.",
        pays: 'Tunisie — 2021',
        image: IMG_PPP_EAU,
        tone: '#B5E0EC',
      },
      {
        client: '7 Seas',
        sector: 'Projet Hannibal (hydrogène vert)',
        description: "Conseiller juridique du Groupe Italien 7 Seas pour l'obtention d'une concession dans le cadre de la réalisation du Projet Hannibal au sud de la Tunisie pour la production de l'hydrogène vert et son exportation sur le marché européen. Étude du cadre réglementaire en relation avec le volet foncier pour la sécurisation foncière des terrains dans la région de Tataouine pour le projet.",
        pays: 'Tunisie — 2024',
        image: IMG_HANNIBAL,
        tone: '#BBCB2E',
      },
      {
        client: 'Ministère de l\'énergie',
        sector: 'Elaboration de la Stratégie Nationale en matière d\'Hydrogène vert',
        description: "Participation à la mise en place de la stratégie nationale pour le développement de l'hydrogène vert et de ses dérivés en Tunisie. Examen du cadre réglementaire et institutionnel. Identification des contraintes et limites. Proposition des améliorations réglementaires. Établissement d'une feuille de route pour la mise en place de la nouvelle filière.",
        pays: 'Tunisie — 2023',
        image: IMG_STRAT_H2,
        tone: '#DDE597',
      },
      {
        client: 'SNAM',
        sector: 'Projet Corridor Tunisia – (hydrogène vert)',
        description: "Conseiller de la SNAM dans le cadre du projet Corridor Tunisia et ce par la réalisation d'une étude intitulée Green Hydrogen Production Study. Audit du cadre réglementaire Tunisien en relation avec la production et le transport de l'hydrogène vert. Identification des autorités gouvernementales impliquées dans le processus de mise en place du projet. Audit de la documentation contractuelle régissant le transport du gaz naturel et son adéquation avec le transport de l'hydrogène vert. Audit des accord internationaux conclus en relation avec l'utilisation du gazoduc Trans maghrébin pour le transport de l'hydrogène vert.",
        pays: 'Tunisie — 2021',
        image: IMG_CORRIDOR_TN,
        tone: '#B5E0EC',
      },
      {
        client: 'Ministère de l\'énergie',
        sector: 'Contrat de performance STEG / Ministère de l\'énergie',
        description: "Conseiller juridique du ministère de l'énergie et de la STEG dans le cadre de la mise en place d'un contrat de performance avec le ministère chargé de l'énergie. Identification des faiblesses de l'entreprise et les actions à entreprendre. Rédaction d'un contrat de performance entre STEG et le ministère de l'énergie. Identification des actions à entreprendre par chacune des parties signataires. Animation d'ateliers de concertations avec les parties prenantes. Préparation d'une feuille de route pour la mise en place des réformes suggérées.",
        pays: 'Tunisie — 2023',
        image: IMG_STEG,
        tone: '#BBCB2E',
      },
      {
        client: 'CPC',
        sector: 'Transfert d\'actifs Concessionnaire - Règles applicables à l\'expiration de la concession',
        description: "Conseiller de Carthage Power Company titulaire de la première concession privée de Production d'Électricité lors de la mise en place de la procédure de transfert des actifs suite à la fin de validité de la Concession de Rades II. Etablissement des documents de transfert de l'activité à la STEG. Audit des contrats O&M objet du transfert. Liquidation de la société suite à l'arrêt de l'activité.",
        pays: 'Tunisie — 2021',
        image: IMG_LEASING,
        tone: '#DDE597',
      },
      {
        client: 'Ministère de l\'énergie',
        sector: 'Création de la Commission foncière spécialisée des projets ENR',
        description: "Conseiller du ministère de l'Énergie dans le cadre de la préparation d'un projet de décret se rapportant à la création de la Commission foncière spécialisée du traitement des demandes d'utilisation des terrains publics dans le cadre de la réalisation de projet de production d'électricité à partir des énergies renouvelables. Réunions avec les représentants du ministère. Identification des prérogatives de la commission. Examen du champ d'intervention de la commission. Préparation du projet de décret de création de la Commission foncière spécialisée du traitement des demandes d'utilisation des terrains publics.",
        pays: 'Tunisie — 2021',
        image: IMG_COMMISSION_F,
        tone: '#B5E0EC',
      },
      {
        client: 'Ministère du Tourisme et de l\'artisanat',
        sector: 'Restructuration de la gestion des Hub Design en mode Partenariat Public Privé',
        description: "Conseiller juridique de l'Office National de l'Artisanat en relation avec la réalisation d'une étude de faisabilité pour la réalisation d'une étude juridique pour proposer un nouveau mode de gestion des Hub Design dans le cadre d'une gestion mixte publique – Privé. Etude de portant sur l'analyse du mode de gestion public actuel des Hubs Design. Proposition d'un nouveau montage contractuel et institutionnel pour la gestion des hubs Design. Restructuration de la gestion actuelle et proposition d'un organigramme de la nouvelle structure de gestion des Hubs Design. Préparation du statut portant les modalités d'organisation et de fonctionnement de la nouvelle structure de gestion de l'activité publique.",
        pays: 'Tunisie — 2023',
        image: IMG_HUB_DESIGN,
        tone: '#BBCB2E',
      },
      {
        client: 'Ministère du Tourisme',
        sector: 'Restructuration de la gestion publique du port de plaisance Sidi Bou Saïd',
        description: "Conseiller du Ministère du Tourisme et de l'Artisanat pour la réalisation d'une étude juridique portant sur la restructuration de la gestion publique du port de plaisance de sidi bou said. Proposition d'une gestion du Port suivant la technique du partenariat Public privé. Préparation des documents de sélection d'un concessionnaire pour la gestion du port de plaisance de Sidi Bou Saïd. Préparation des documents de la transaction : Le dossier de pré qualification, Le dossier d'appel d'offres restreint, La Convention de Concession et son Cahier des Charges.",
        pays: 'Tunisie — 2020',
        image: IMG_PORT_SBS,
        tone: '#DDE597',
      },
      {
        client: 'Entreprise Tunisienne d\'Activités Pétrolières',
        sector: 'Expiration de la validité des concessions hydrocarbures',
        description: "Mission : Etude juridique sur le régime applicable à l'expiration de la durée de validité de la concession d'exploitation d'hydrocarbure. Prestations effectuées : Analyse du cadre réglementaire applicable en cas d'expiration de la période de validité d'une convention d'exploitation d'hydrocarbure. Analyse des possibilités quant au renouvellement de la durée de la concession, de la reprise de la concession par ETAP ou l'octroi de la concession à un autre opérateur suivant la technique de l'appel à la concurrence.",
        pays: 'Tunisie — 2018',
        image: IMG_HYDROCARBURES,
        tone: '#B5E0EC',
      },
      {
        client: 'Joint‑Venture ETAP – British Gaz',
        sector: 'Joint‑venture ETAP / British Gaz',
        description: "Mission : Mise en place de la structure de la jointe venture entre ETAP et British Gaz en application de la convention d'association.",
        pays: 'Tunisie — 2016',
        image: IMG_ETAP_BG,
        tone: '#BBCB2E',
      },
      {
        client: 'Perenco',
        sector: 'Acquisition des actifs ENI – Perenco',
        description: "Mission : Projet d'acquisition par Perenco des actifs d'hydrocarbure de ENI en Tunisie. Prestations effectuées : Audit juridique des droits de ENI dans les concessions d'hydrocarbure en Tunisie. Legal opinion sur les modalités d'acquisition des intérêts de ENI par Perenco. Etudes des aspects environnementaux liés à la transaction. Identification de la procédure de transfert des intérêts et les autorisations requises.",
        pays: 'Tunisie — 2014',
        image: IMG_ENI_PERENCO,
        tone: '#DDE597',
      },
      {
        client: 'Perenco',
        sector: 'Renouvellement concessions Baguel et El Franig – Perenco',
        description: "Mission : Assistance juridique de la société Perenco Tunisia dans le cadre de l'extension de la validité des Concessions Baguel et El Franig. Prestations effectuées : Etablissement d'un rapport sur le cadre réglementaire applicable au régime de renouvellement des Concessions en Tunisie. Rédaction des projets d'avenants de la Concession Baguel et la Concession El Franig. Négociation des projets d'avenant avec l'Entreprise Tunisienne des Activités Pétrolières (ETAP). Préparation de l'exposé des motifs pour le projet de loi portant sur l'approbation des deux avenants.",
        pays: 'Tunisie — 2014',
        image: IMG_BAGUEL,
        tone: '#B5E0EC',
      },
      {
        client: 'Société Tunisienne d\'acconage et de manutention (STAM)',
        sector: 'Projet : Concession terre‑pleins port de Rade – Société Tunisienne d\'Acconage et de Manutention',
        description: "Conseiller juridique de la STAM dans le cadre de la réalisation d'une étude juridique pour la proposition d'un montage institutionnel, contractuel et financier pour l'exploitation des terre-pleins attenants aux quais 6, 7, 8 et 9 sous forme de concession dans le cadre de l'extension du port de RADE. Proposition d'une feuille de route avec les options contractuelles de mise en place du projet.",
        pays: 'Tunisie — 2023',
        image: IMG_PORT_RADE,
        tone: '#BBCB2E',
      },
      {
        client: 'Ministère du Transport',
        sector: 'Projet : Organisation de l\'activité logistique – Port Sec – Transport – Logistique',
        description: "Conseiller du Ministère du Transport et de la logistique dans le cadre de la réalisation d'une étude institutionnelle pour l'organisation de l'activité logistique. Proposition d'un cadre réglementaire et institutionnel pour mettre en place les mécanismes de gestion du secteur via la création d'une entité PPP qui sera chargée de la gestion des zones logistiques. Audit du cadre réglementaire mis en place et identification des contraintes. Identification des institutions intervenantes dans le cadre de l'activité. Proposition d'un texte réglementaire régissant l'activité logistique suivant la technique du partenariat public privé.",
        pays: 'Tunisie — 2020',
        image: IMG_LOGISTIQUE,
        tone: '#DDE597',
      },
      {
        client: 'Union du Maghreb Arabe – Transport ferroviaire',
        sector: 'Projet : Réhabilitation ligne ferroviaire maghrébine – UMA',
        description: "Conseiller de l'organisation de l'Union du Maghreb Arabe dans le cadre de la réalisation d'une étude de faisabilité technique et juridique pour la réhabilitation de la ligne ferroviaire Maghrébine. Audit de l'état des lieux et identification des règles à adapter pour faciliter la restauration de l'activité. Identification des organismes impliqués dans le processus. Mise en place d'une cellule de gestion du projet. Proposition des adaptations réglementaires pour le redémarrage de l'activité.",
        pays: 'Tunisie — 2018',
        image: IMG_FERROVIAIRE,
        tone: '#B5E0EC',
      },
      {
        client: 'GFH (Projet PPP)',
        sector: 'Projet Port Financier – GFH',
        description: "Conseiller du Groupe GFH dans le cadre du développement du projet du Port Financier dans la région de Raoud – Nord de la Tunisie. Développement du projet dans le cadre d'une Convention d'investissement signée avec l'Etat et fixant les droits et obligations du promoteur immobilier en relation avec la zone. Création de la société du projet et établissement des différents contrats de partenariat avec les investisseurs.",
        pays: 'Tunisie — 2017‑2018',
        image: IMG_PORT_GFH,
        tone: '#BBCB2E',
      },
      {
        client: 'EFACEC',
        sector: 'Contrat EPC – Construction des Postes de Transformations Électriques',
        description: "Conseiller juridique du Groupe EFACEC dans le cadre de la réalisation d'un marché public avec STEG pour la construction et l'extension de postes de transformation. Contrat EPC. Négociation des termes et conditions du Marché conclu avec la STEG et les avenants. Négociation des contrats de sous traitance avec les partenaires locaux.",
        pays: 'Tunisie — 2022',
        image: IMG_EPC_POSTES,
        tone: '#DDE597',
      },
      {
        client: 'El Seweedy Electric',
        sector: 'Contrat EPC - Construction des Lignes de transport haute tension',
        description: "Conseiller juridique du Groupe Egyptien El Seweedy Electric titulaire d'un marché avec la STEG pour la réalisation des lignes de transport d'électricité haute tension. Contrat EPC. Négociation du marché à conclure avec la STEG. Création de la branche en Tunisie. Etablissement des contrats avec les sous traitant et partenaires locaux.",
        pays: 'Tunisie — 2022',
        image: IMG_EPC_LIGNES,
        tone: '#B5E0EC',
      },
      {
        client: 'Groupe Kalpataro',
        sector: 'Construction des Postes de transformation électriques',
        description: "Conseiller du Groupe Kalpataro, titulaire d'un marché avec la STEG pour la réalisation des Postes de Transformation. Contrat EPC. Négociation des contrat avec les sous traitant locaux. Consultation juridique diverses en relation avec la réglementation applicable aux marchés publics.",
        pays: 'Tunisie — 2021',
        image: IMG_TRANSFO,
        tone: '#BBCB2E',
      },
      {
        client: 'GAMA',
        sector: 'Construction d\'une Centrale électrique 450 MW',
        description: "Conseiller juridique de GAMA POWER SYSTEM dans le cadre de la réalisation d'une centrale électrique pour le compte de la STEG d'une puissance de 450 MW – EPC – Project. Analyse des documents du marché à conclure avec STEG. Analyse du cadre réglementaire applicable à la production d'électricité en Tunisie. Établissement de notes juridiques au sujet du cadre réglementaire applicable au secteur de l'électricité en Tunisie.",
        pays: 'Tunisie — 2017‑2018',
        image: IMG_CENTRALE_450,
        tone: '#DDE597',
      },
      {
        client: 'Passavanti',
        sector: 'Réhabilitation stations de pompage - Assainissement',
        description: "Conseiller juridique de la société Passavanti en relation avec la réalisation de la réhabilitation des équipements des stations de pompages pour le compte de l'office national de l'assainissement. Contrat EPC.",
        pays: 'Tunisie — 2016',
        image: IMG_POMPAGE,
        tone: '#B5E0EC',
      },
      {
        client: 'INIMA AQUALIA',
        sector: 'Construction d\'une Station de dessalement d\'eau de mer à Djerba',
        description: "Conseiller juridique du consortium INIMA AQUALIA en relation avec l'exécution du marché public avec la SONEDE pour la réalisation de la station de dessalement de Djerba. Contrat EPC. Consultation juridique diverses en relation avec le droit des marchés publics. Assistance dans la rédaction des contrats de sous traitance avec les sous traitant et partenaires locaux.",
        pays: 'Tunisie — 2015',
        image: IMG_DESSALEMENT,
        tone: '#BBCB2E',
      },
      {
        client: 'EFACEC',
        sector: 'Modernisation voies ferrées – Projet SNCFT',
        description: "Conseiller juridique de la société EFACEC dans le cadre l'exécution du marché public conclu avec la SNCFT pour la réalisation des travaux de construction et modernisation des voies ferrées. Contrat EPC. Assistance en relation avec le droit des marchés publics. Etablissement d'avenant au marché initial. Consultation juridique diverses en relation avec l'exécution du marché.",
        pays: 'Tunisie — 2014',
        image: IMG_SNCFT_VOIES,
        tone: '#DDE597',
      },
      {
        client: 'ABB France',
        sector: 'Modernisation cimenterie de Oum El Kelil',
        description: "Conseiller juridique de ABB France dans le cadre de la négociation du contrat de modernisation de la cimenterie d'Oum El Kelil avec la société. Préparation du dossier d'avenant à déposer auprès de la Haute Commission des marchés publics. Etablissement d'avenant au marché initial. Rédaction de la documentation à soumettre à la commission supérieure des marchés publics. Représentation de la société auprès de l'instance supérieure des marchés publics.",
        pays: 'Tunisie — 2013',
        image: IMG_CIMENTERIE,
        tone: '#B5E0EC',
      },
      {
        client: 'Bombardier',
        sector: 'Acquisition matériels roulants – Projet ferroviaire - SNCFT',
        description: "Conseiller juridique de Bombardier dans le cadre de l'appel d'offres lancé par la société Tunisienne des chemins de fer SNCFT pour l'acquisition de matériels roulants. Contrat EPC.",
        pays: 'Tunisie — 2013',
        image: IMG_SNCFT_LOCO,
        tone: '#BBCB2E',
      },
    ],
  },
  {
    id: 'mr', name: 'Mauritanie', flag: '🇲🇷', cx: 859.84, cy: 524.76, tailY: 580.72,
    projects: [{
      client: 'Ministère',
      sector: 'Gouvernance & Réglementation',
      description: "Analyse institutionnelle et appui à la structuration du cadre réglementaire pour les investissements dans le secteur des ressources naturelles en Mauritanie.",
      pays: 'Mauritanie — 2024',
      image: IMG_MAURITANIE,
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
      image: IMG_SENEGAL,
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
      image: IMG_GUINEE,
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
      image: IMG_BURKINA,
      tone: '#839705',
    }],
  },
  {
    id: 'bj', name: 'Bénin', flag: '🇧🇯', cx: 969.02, cy: 656.12, tailY: 712.07,
    projects: [
      {
        client: 'SOBEE',
        sector: 'Audit juridique projet ENR – Bénin',
        description: "Réalisation d'un audit juridique des documents relatifs à la réalisation d'un projet de production d'électricité à partir des énergies renouvelables au Bénin sous le régime de la Concession (Convention de Concession – PPA et Accord de Raccordement). Préparation d'un rapport juridique mettant l'accent sur les points de faiblesse en relation avec la conclusion de la transaction.",
        pays: 'Bénin — 2023',
        image: IMG_BENIN_ENR,
        tone: '#BBCB2E',
      },
      {
        client: 'SONEDE International',
        sector: 'Projet Gestion de l\'eau potable en zone rurale',
        description: "Conseiller de SONEDE International dans le cadre de la gestion d'un projet de distribution d'eaux potables dans les zones rurales sous le régime d'un contrat d'affermage. Assistance à la finalisation du Contrat d'affermage. Mise en place de mécanisme de financement du Projet. Création de la société de projet suivant le droit Béninois.",
        pays: 'Bénin — 2021',
        image: IMG_SENSOR,
        tone: '#B5E0EC',
      },
      {
        client: 'SONEB – Banque Mondiale',
        sector: 'Projet : restructuration SONEB - Réforme secteur hydraulique – Contrat d\'affermage',
        description: "Conseiller de la SONEB dans le cadre de la réforme du secteur hydraulique. La scission de l'activité hydraulique en deux activités publiques et privées et la mise en place d'une société de gestion du patrimoine (publique) et d'une société d'exploitation (privée). Préparation du dossier d'appel d'offres de pré qualification, du dossier d'appel d'offres restreint et des projets des documents de la transaction : Contrat de concession, contrat d'affermage et contrat de performance.",
        pays: 'Bénin — 2018',
        image: IMG_BENIN_SONEB,
        tone: '#DDE597',
      },
    ],
  },
  {
    id: 'ne', name: 'Niger', flag: '🇳🇪', cx: 1129.38, cy: 581.06, tailY: 637.01,
    projects: [{
      client: 'Bailleur de Fonds',
      sector: 'Analyse Institutionnelle',
      description: "Mission d'analyse institutionnelle pour un bailleur de fonds international, couvrant l'évaluation des cadres légaux et réglementaires dans le secteur des ressources au Niger.",
      pays: 'Niger — 2024',
      image: IMG_NIGER,
      tone: '#DDE597',
    }],
  },
  {
    id: 'cd', name: 'Congo RDC', flag: '🇨🇩', cx: 1338.24, cy: 907.07, tailY: 920.00,
    projects: [{
      client: 'Groupe Industriel',
      sector: 'Ressources Naturelles',
      description: "Accompagnement d'un groupe industriel dans l'analyse du cadre légal minier et des enjeux de gouvernance en République Démocratique du Congo.",
      pays: 'Congo RDC — 2025',
      image: IMG_CONGO,
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
    src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779679638/rnj/group-483-89ee6676.png',
    year: '2026',
    title: 'Workshop BeCentral : digitalisation durable',
    description: 'Retour sur un échange autour des enjeux de la digitalisation responsable.',
  },
  {
    src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779679639/rnj/group-482-365877a7.png',
    year: '2024',
    title: "Informations de base sur les garanties d'origine (GO).",
    description: "Principes et fonctionnement des garanties d'origine dans le marché de l'énergie.",
  },
  {
    src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779679639/rnj/group-484-04b278f7.png',
    year: '2025',
    title: 'Accélération de la transition énergétique en Tunisie',
    description: 'Focus sur les initiatives et leviers pour accélérer la transition énergétique.',
  },
  {
    src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779679640/rnj/group-481-8071b8c8.png',
    year: '2025',
    title: 'CSR en Tunisie : cadre réglementaire',
    description: "Analyse du cadre juridique et des enjeux liés à l'utilisation du CSR en Tunisie.",
  },
] as const;

export default function AnalyseInstitutionnelleClient() {
  const [activePin, setActivePin] = useState<string | null>(null);
  const [hoverPin, setHoverPin] = useState<string | null>(null);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const [isMobile, setIsMobile] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const activeCountry = countryPins.find((p) => p.id === activePin) ?? null;
  const activeProject = activeCountry ? (activeCountry.projects[activeProjectIdx] ?? activeCountry.projects[0]) : null;

  const CARD_THEMES = [
    { bg: '#DDE597', text: '#003300', logoFilter: 'brightness(0) invert(0.25) sepia(1) hue-rotate(80deg) saturate(10) brightness(0.37)',  btnBg: '#003300', btnText: '#DDE597' },
    { bg: '#C2D0D3', text: '#0E434F', logoFilter: 'brightness(0) invert(0.25) sepia(1) hue-rotate(155deg) saturate(10) brightness(0.35)', btnBg: '#0E434F', btnText: '#C2D0D3' },
    { bg: '#0E434F', text: '#E0E5C0', logoFilter: 'brightness(0) invert(1)',                                                               btnBg: '#E0E5C0', btnText: '#0E434F' },
  ] as const;
  const cardTheme = CARD_THEMES[activeProjectIdx % 3];

  const canGoPrev = !!activeCountry && activeProjectIdx > 0;
  const canGoNext = !!activeCountry && activeProjectIdx < activeCountry.projects.length - 1;

  useEffect(() => {
    const srcs = [...new Set(countryPins.flatMap((p) => p.projects.map((proj) => proj.image)))];
    srcs.forEach((src) => { const img = new window.Image(); img.src = src; });
  }, []);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handler = () => setIsMobile(mq.matches);
    handler();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = () => setIsPhone(mq.matches);
    handler();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
    mq.addListener(handler);
    return () => mq.removeListener(handler);
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
    else { setActivePin(id); setActiveProjectIdx(0); }
  }
  const closePanel = useCallback(() => {
    setActivePin(null);
    setActiveProjectIdx(0);
  }, []);
  const goToPrevProject = useCallback(() => {
    if (!activeCountry || !canGoPrev) return;
    setActiveProjectIdx((idx) => Math.max(0, idx - 1));
  }, [activeCountry, canGoPrev]);
  const goToNextProject = useCallback(() => {
    if (!activeCountry || !canGoNext) return;
    setActiveProjectIdx((idx) => Math.min(activeCountry.projects.length - 1, idx + 1));
  }, [activeCountry, canGoNext]);
  function onPanelTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
  }
  function onPanelTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (!isMobile || !activeCountry || activeCountry.projects.length <= 1) return;
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;
    if (startX == null) return;
    const endX = event.changedTouches[0]?.clientX;
    if (typeof endX !== 'number') return;
    const deltaX = endX - startX;
    if (Math.abs(deltaX) < 56) return;
    if (deltaX < 0) goToNextProject();
    else goToPrevProject();
  }

  useEffect(() => {
    if (!activeCountry) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePanel();
        return;
      }
      if (event.key === 'ArrowLeft') {
        goToPrevProject();
      } else if (event.key === 'ArrowRight') {
        goToNextProject();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCountry, closePanel, goToNextProject, goToPrevProject]);

  return (
    <main className="min-h-screen bg-[#F7FCFF]">
      {/* Compact centered navbar — responsive across all breakpoints */}
      <nav className="absolute left-1/2 top-3 z-50 -translate-x-1/2 flex flex-row items-center gap-1.5 sm:top-5 sm:gap-2 md:top-[30px] md:gap-[8px] lg:top-[47px] lg:gap-[10px]">
        {/* Logo icon */}
        <Image
          src="https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779672853/rnj/layer-4-955dc651.png"
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

      <section className="relative isolate w-full overflow-hidden bg-[#0E434F] min-h-screen min-h-[100svh] sm:min-h-[640px] md:min-h-[1120px] lg:h-[1180px] lg:min-h-[1180px]">
        {/* Single SVG: map background + interactive pins in one coordinate space */}
        <div
          className="absolute overflow-hidden"
          style={{ inset: 0, transform: isPhone ? 'none' : 'scale(1.05)' }}
        >
          <svg
            viewBox={isPhone ? '560 80 920 960' : '0 0 1440 1024'}
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            {/* Map background — always at full 1440×1024 coords */}
            <image
              href="/optimized/map-africa.svg"
              x="0" y="0" width="1440" height="1024"
              preserveAspectRatio="xMidYMid slice"
            />
            <defs>
              <filter id="pin-shadow" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="4" stdDeviation="9" floodColor="rgba(0,0,0,0.28)" floodOpacity="1"/>
              </filter>
            </defs>

            {countryPins.map((pin) => {
              const count = pin.projects.length;
              const isActive = pin.id === activePin;
              const isHighlighted = isActive || pin.id === hoverPin;
              // Smaller badge for geographically small countries
              const isSmallCountry = ['tn', 'sn', 'gn', 'bj', 'bf'].includes(pin.id);
              const r = isSmallCountry ? 19 : 25;
              const fs = count >= 100 ? (isSmallCountry ? 9 : 12) : count >= 10 ? (isSmallCountry ? 11 : 15) : (isSmallCountry ? 15 : 20);
              return (
                <g
                  key={pin.id}
                  className="map-pin-svg-hit"
                  filter="url(#pin-shadow)"
                  style={{ cursor: 'pointer', touchAction: 'manipulation' }}
                  onClick={() => openPin(pin.id)}
                  onMouseEnter={() => setHoverPin(pin.id)}
                  onMouseLeave={() => setHoverPin(null)}
                  onTouchStart={() => setHoverPin(pin.id)}
                  onTouchEnd={() => setTimeout(() => setHoverPin(null), 250)}
                >
                  <circle
                    cx={pin.cx}
                    cy={pin.tailY}
                    r={r}
                    fill={isHighlighted ? '#C1CB82' : '#F5FAC7'}
                    style={{ transition: 'fill 180ms ease' }}
                  />
                  <text
                    x={pin.cx}
                    y={pin.tailY}
                    textAnchor="middle"
                    dy="0.35em"
                    fill={isHighlighted ? '#F5FAC7' : '#839705'}
                    fontSize={fs}
                    fontWeight="700"
                    pointerEvents="none"
                    style={{ userSelect: 'none', fontFamily: 'Geist, sans-serif', transition: 'fill 180ms ease' }}
                  >
                    {count}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── Mobile/tablet hero layout: title top, button bottom, map visible middle ── */}
        <div className="pointer-events-none relative z-10 mx-auto flex h-screen h-[100svh] w-full flex-col px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[72px] sm:h-[640px] sm:px-6 sm:pb-[calc(3rem+env(safe-area-inset-bottom))] sm:pt-[80px] md:h-[1120px] md:px-12 md:pb-[calc(4rem+env(safe-area-inset-bottom))] md:pt-[100px] lg:hidden">
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
        {/* Centered card overlay — Figma design */}
        {hasMounted && activeCountry && createPortal(
          <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {/* click-away backdrop */}
            <div className="pointer-events-auto absolute inset-0" onClick={closePanel} style={{ touchAction: 'pan-x' }} />

            {/* Blurred project image — slides in from right (Figma panelSlideIn) */}
            <div
              key={`bg-${activeProjectIdx}`}
              className="absolute inset-0 overflow-hidden"
              style={{ background: '#D9D9D9', animation: 'panelSlideIn 550ms cubic-bezier(0.22,1,0.36,1) both' }}
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProject!.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{ filter: 'blur(15px)', transform: 'scale(1.06)' }}
              />
            </div>

            {/* Left arrow — bottom on mobile, mid-left on desktop */}
            <button
              type="button"
              onClick={goToPrevProject}
              disabled={!canGoPrev}
              className="pointer-events-auto absolute z-20 transition hover:scale-105 active:scale-95 bottom-6 left-4 sm:bottom-auto sm:top-1/2 sm:left-5 sm:-translate-y-1/2 lg:left-8"
              aria-label="Projet précédent"
              style={{ animation: 'fadeIn 300ms ease 300ms both', opacity: canGoPrev ? 0.6 : 0.2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/optimized/Group 349149.jpg" alt="" width={72} height={72} className="block w-[44px] h-[44px] sm:w-[64px] sm:h-[64px] lg:w-[72px] lg:h-[72px] rounded-full overflow-hidden" />
            </button>

            {/* Right arrow — bottom on mobile, mid-right on desktop */}
            <button
              type="button"
              onClick={goToNextProject}
              disabled={!canGoNext}
              className="pointer-events-auto absolute z-20 transition hover:scale-105 active:scale-95 bottom-6 right-4 sm:bottom-auto sm:top-1/2 sm:right-5 sm:-translate-y-1/2 lg:right-8"
              aria-label="Projet suivant"
              style={{ animation: 'fadeIn 300ms ease 300ms both', opacity: canGoNext ? 0.6 : 0.2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/optimized/Group 349150.jpg" alt="" width={72} height={72} className="block w-[44px] h-[44px] sm:w-[64px] sm:h-[64px] lg:w-[72px] lg:h-[72px] rounded-full overflow-hidden" />
            </button>

            {/* Close button — top right */}
            <button
              type="button"
              onClick={closePanel}
              className="pointer-events-auto absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition hover:bg-white/35 sm:right-5 sm:top-5"
              aria-label="Fermer"
              style={{ animation: 'fadeIn 400ms ease both' }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M14 2L2 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Card — centered on mobile, right-aligned on desktop */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center pt-4 pb-28 px-4 sm:pb-4 sm:justify-end sm:pl-[56px] sm:pr-[80px] md:pl-[30%] md:pr-[100px] lg:pl-[34%] lg:pr-[130px]">
              <div
                key={activeProjectIdx}
                className="pointer-events-auto relative w-full max-w-[560px] overflow-y-auto rounded-[24px] px-4 py-5 shadow-[0_24px_64px_rgba(0,0,0,0.38)] sm:px-7 sm:py-7 lg:max-w-[680px]"
                style={{
                  background: cardTheme.bg,
                  maxHeight: 'calc(100svh - 132px)',
                  animation: 'cardIn 480ms cubic-bezier(0.22,1,0.36,1) 220ms both',
                }}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={onPanelTouchStart}
                onTouchEnd={onPanelTouchEnd}
              >
                {/* RNJ ADVISORY logo + counter */}
                <div className="mb-3 sm:mb-4 flex flex-col items-center gap-[6px]">
                  <div className="relative flex w-full items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/optimized/Layer 1 (9).png" alt="RNJ Advisory" className="h-[24px] w-auto sm:h-[28px]" style={{ filter: cardTheme.logoFilter }} />
                    <p className={`${geist.className} absolute right-0 text-[11px] font-semibold tabular-nums`} style={{ color: cardTheme.text, opacity: 0.45 }}>
                      {activeProjectIdx + 1} / {activeCountry.projects.length}
                    </p>
                  </div>
                  <div className="h-px w-full" style={{ background: `${cardTheme.text}28` }} />
                </div>

                {/* Project image */}
                <div className="mb-3 sm:mb-4 overflow-hidden rounded-[12px]" style={{ aspectRatio: '16/9' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeProject!.image}
                    alt={activeProject!.sector}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Client */}
                <p
                  className={`${geist.className} mb-1 sm:mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em]`}
                  style={{ color: cardTheme.text }}
                >
                  Client : {activeProject!.client}
                </p>

                {/* Title */}
                <h3
                  className={`${ebGaramond.className} mb-2 sm:mb-3 font-extrabold leading-[1.06] tracking-[-0.01em]`}
                  style={{ color: cardTheme.text, fontSize: 'clamp(17px, 3.5vw, 30px)' }}
                >
                  {activeProject!.sector}
                </h3>

                {/* Description */}
                <p
                  className={`${geist.className} mb-4 text-[12px] font-medium leading-[1.6] sm:text-[13px]`}
                  style={{
                    color: cardTheme.text,
                    opacity: 0.65,
                    display: '-webkit-box',
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {activeProject!.description}
                </p>

                {/* Pays + flag */}
                <div className="mb-3 sm:mb-5 flex flex-col gap-1.5">
                  <p
                    className={`${geist.className} text-[10px] font-bold uppercase tracking-[0.12em]`}
                    style={{ color: cardTheme.text, opacity: 0.4 }}
                  >
                    Pays : {activeProject!.pays}
                  </p>
                  <div className="flex items-center gap-2">
                  {(activeProject!.flags ?? [activeCountry.id]).map((code) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={code}
                      src={`https://flagcdn.com/32x24/${code.toLowerCase()}.png`}
                      alt={code}
                      width={32}
                      height={24}
                      className="rounded-[2px] shadow-sm"
                    />
                  ))}
                </div>
                </div>

                {/* CTA */}
                <div className="flex justify-end">
                  <Link
                    href="/contact"
                    onClick={closePanel}
                    className={`${geist.className} inline-flex items-center gap-[6px] rounded-full px-5 py-[10px] text-[12px] font-semibold shadow-sm transition hover:opacity-90`}
                    style={{ background: cardTheme.btnBg, color: cardTheme.btnText }}
                  >
                    More Like This
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d="M3.75 9H14.25M14.25 9L10.5 5.25M14.25 9L10.5 12.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        , document.body)}
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
          <Image src="/optimized/mask-group-6.webp"
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
                src="/optimized/Frame 487.svg"
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
