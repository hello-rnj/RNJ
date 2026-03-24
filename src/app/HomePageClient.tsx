'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock3, Leaf, PhoneCall, Plus, ShieldCheck, Users2, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const glowShapes = [
  {
    width: '404.34px',
    height: '423.25px',
    left: '798.7px',
    top: '208.27px',
    background: '#BBCB2E',
    filter: 'blur(160.282px)',
  },
  {
    width: '743.57px',
    height: '572.38px',
    left: '8.93px',
    top: '231.38px',
    background: '#BBCB2E',
    filter: 'blur(160.282px)',
  },
  {
    width: '534.82px',
    height: '411.69px',
    left: '-113.95px',
    top: '9.78px',
    background: '#BBCB2E',
    filter: 'blur(115.285px)',
  },
  {
    width: '881.15px',
    height: '889.55px',
    left: '246.28px',
    top: '-37.48px',
    background: '#F9FFC4',
    filter: 'blur(248.223px)',
  },
  {
    width: '742.52px',
    height: '726.76px',
    left: '246.28px',
    top: '-37.48px',
    background: '#F9FFC4',
    filter: 'blur(248.223px)',
  },
  {
    width: '467.35px',
    height: '457.9px',
    left: '591.81px',
    top: '339.55px',
    background: '#F9FFC4',
    filter: 'blur(248.223px)',
  },
  {
    width: '502.01px',
    height: '437.95px',
    left: '928.93px',
    top: '353.2px',
    background: '#F9FFC4',
    filter: 'blur(248.223px)',
  },
  {
    width: '350.78px',
    height: '350.78px',
    left: '-115px',
    top: '125.3px',
    background: '#BBCB2E',
    filter: 'blur(306.248px)',
  },
  {
    width: '412.74px',
    height: '425.34px',
    left: '-75.09px',
    top: '476.08px',
    background: '#839705',
    filter: 'blur(318.798px)',
  },
  {
    width: '673.2px',
    height: '693.15px',
    left: '813.41px',
    top: '-54.29px',
    background: '#003300',
    filter: 'blur(413.257px)',
  },
  {
    width: '834.94px',
    height: '859.09px',
    left: '848.06px',
    top: '975.99px',
    background: '#F5FFA1',
    filter: 'blur(413.257px)',
  },
  {
    width: '599.68px',
    height: '617.54px',
    left: '-79.29px',
    top: '1224.9px',
    background: '#BBCB2E',
    filter: 'blur(413.257px)',
  },
  {
    width: '673.2px',
    height: '693.15px',
    left: '15.23px',
    top: '582.15px',
    background: '#003300',
    filter: 'blur(413.257px)',
  },
  {
    width: '412.74px',
    height: '425.34px',
    left: '1180.99px',
    top: '126.35px',
    background: '#839705',
    filter: 'blur(318.798px)',
  },
  {
    width: '169.09px',
    height: '174.34px',
    left: '1368.98px',
    top: '208.27px',
    background: '#839705',
    filter: 'blur(158.533px)',
  },
];

const logoStripItems = [
  { src: '/Layer 1 (19).svg', alt: 'Logo 1', width: 139.3, height: 60.91 },
  { src: '/Layer 1 (20).svg', alt: 'Logo 2', width: 159.47, height: 45.05 },
  { src: '/Layer 1 (22).svg', alt: 'Logo 3', width: 153.59, height: 58.45 },
  { src: '/Layer 3 (2).svg', alt: 'Logo 4', width: 108.22, height: 43.43 },
  { src: '/Layer 2 (1).svg', alt: 'Logo 5', width: 102.19, height: 60.91 },
  { src: '/Layer 1 (23).svg', alt: 'Logo 6', width: 207.42, height: 44.38 },
];

const entrepreneurshipCards = [
  {
    title: 'Choix du statut juridique adapte',
    icon: '/Mask group (12).svg',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
  {
    title: 'Faisabilite & plan financier',
    icon: '/Vector (19).svg',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 140.59,
  },
  {
    title: 'Demarches administratives',
    icon: '/Vector (18).svg',
    iconWidth: 65.55,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
  {
    title: 'Conformite reglementaire',
    icon: '/Mask group (11).svg',
    iconWidth: 75.19,
    iconHeight: 75.19,
    titleWidth: 176.02,
  },
];

const serviceCards = [
  {
    title: "Creation d'entreprise Demarches administratives",
    description:
      "RNJ Advisory accompagne les entrepreneurs et PME de l'idee a la creation, en prenant en charge le plan d'affaires, le plan financier, la carte professionnelle, les autorisations et toutes les demarches administratives.",
    icon: '/Mask group (13).svg',
    iconWidth: 141.41,
    iconHeight: 141.41,
  },
  {
    title: 'Conseils juridiques',
    description:
      "Etudes institutionnelles et reglementaires, conformite, et accompagnement de projets d'infrastructure avec expertise en marches publics, PPP, concessions et delegations de service public.",
    icon: '/Mask group (14).svg',
    iconWidth: 92.93,
    iconHeight: 92.93,
  },
  {
    title: 'Accompagnement en durabilite',
    description:
      "Accompagnement pour integrer la durabilite et les criteres ESG dans la strategie, en transformant les exigences reglementaires en leviers de performance et de credibilite.",
    icon: '/Mask group (15).svg',
    iconWidth: 140.4,
    iconHeight: 140.4,
  },
];

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

const strategicFeatureIcons = [Users2, Leaf, ShieldCheck, Clock3];

const whyChooseGridCards = [
  {
    title: 'Expertise juridique & stratégique',
    description:
      "Notre accompagnement repose sur la rigueur d’un pool d'experts spécialisé en droit public, énergie, stratégie entrepreneuriale, gestion de projet et transformation opérationnelle et digitale.",
    icon: '/Group (11).svg',
    iconWidth: 97,
    iconHeight: 97,
    titleWidth: '270px',
    descriptionWidth: '344px',
  },
  {
    title: 'Performances & fiabilité',
    description:
      'Nous nous engageons à vous offrir un service professionnel, rapide et sécurisé. Nos outils sont conçus pour réduire les temps morts, fluidifier les démarches administratives et optimiser vos résultats.',
    icon: '/Layer 1 (17).svg',
    iconWidth: 82,
    iconHeight: 64,
    titleWidth: '178px',
    descriptionWidth: '344px',
  },
  {
    title: 'Méthodologie et durabilité',
    description:
      'Notre cadre d’accompagnement structuré permet de clarifier les priorités, de construire une base solide, et de déployer votre activité avec agilité, automatisation et vision long terme.',
    icon: '/Layer 1 (18).svg',
    iconWidth: 86,
    iconHeight: 78,
    titleWidth: '270px',
    descriptionWidth: '368px',
  },
  {
    title: 'Accompagnement humain, multilingue & engagé',
    description:
      'Proximité, écoute active et respect de votre rythme : chez RNJ Advisory, nous mettons l’humain au cœur de chaque projet. Nous intervenons en français, anglais et arabe.',
    icon: '/Layer 1 (14).svg',
    iconWidth: 55,
    iconHeight: 87,
    titleWidth: '326px',
    descriptionWidth: '376px',
  },
  {
    title: 'Ancrage local et ouverture internationale',
    description:
      'Basés à Bruxelles et à Tunis, nous accompagnons les porteurs de projet installés en Belgique, les entrepreneurs hors UE, les institutions souhaitant structurer ou étendre leur impact.',
    icon: '/Layer 1 (15).svg',
    iconWidth: 52,
    iconHeight: 75,
    titleWidth: '310px',
    descriptionWidth: '344px',
  },
  {
    title: 'Partenariats stratégiques avec des acteurs reconnus',
    description:
      'Nous collaborons avec un réseau solide d’acteurs publics, privés et associatifs, en Belgique comme en Tunisie.',
    icon: '/Layer 1 (16).svg',
    iconWidth: 77,
    iconHeight: 72,
    titleWidth: '330px',
    descriptionWidth: '344px',
  },
];

function BusinessServicesSection() {
  return (
    <section
      className="w-full px-3 py-12 md:px-6 md:py-24"
      style={{
        backgroundColor: '#F7FCFF',
        maxWidth: '1393px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <div className="mx-auto flex w-full max-w-[1393px] flex-col items-center gap-6 md:gap-10">
        <div
          className="flex w-full flex-col items-stretch gap-4 md:gap-[23px] xl:h-[691px] xl:flex-row xl:items-stretch xl:gap-[19px]"
          style={{ filter: 'drop-shadow(2px 2px 24.5px rgba(0, 0, 0, 0.21))' }}
        >
          <div className="flex w-full flex-col items-stretch gap-4 md:gap-[23px] xl:w-[334px] xl:min-w-[334px] xl:items-stretch">
            <div className="mx-auto flex min-h-[250px] w-full max-w-[334px] flex-col items-center justify-center rounded-[20px] bg-[#003300] p-3 sm:hidden">
              <div
                className="flex h-[188px] w-[184px] flex-col rounded-[22px] bg-white px-4 pt-5"
                style={{ boxShadow: '0px 0px 43px -5px rgba(255, 255, 255, 0.33)' }}
              >
                <div className="mb-4 flex items-center gap-[6px]">
                  {strategicFeatureIcons.map((Icon, index) => (
                    <div
                      key={index}
                      className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#BBCB2E]"
                    >
                      <Icon size={11} strokeWidth={2.2} color="#003300" />
                    </div>
                  ))}
                </div>
                <h3 className="font-[Geist] text-[20px] font-medium leading-[20px] text-[#003300]">
                  Expertise stratégique au service de vos projets
                </h3>
              </div>
            </div>

            <div className="hidden h-[334px] w-full max-w-[334px] justify-center sm:flex">
              <div className="relative h-[334px] w-[334px] overflow-hidden rounded-[20px] bg-[#003300]">
              <div
                className="absolute"
                style={{
                  width: '208px',
                  height: '230px',
                  left: '63px',
                  top: '52px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0px 0px 43px -5px rgba(255, 255, 255, 0.33)',
                  borderRadius: '30px',
                }}
              />

              <div className="absolute flex items-center gap-[6px]" style={{ left: '75px', top: '90px' }}>
                {strategicFeatureIcons.map((Icon, index) => (
                  <div
                    key={index}
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#BBCB2E]"
                  >
                    <Icon size={14} strokeWidth={2.2} color="#003300" />
                  </div>
                ))}
              </div>

              <h3
                className="absolute font-[Geist] font-medium text-[#003300]"
                style={{
                  width: '176px',
                  left: '75px',
                  top: '144px',
                  fontSize: '27.6078px',
                  lineHeight: '27px',
                }}
              >
                Expertise stratégique au service de vos projets
              </h3>
              </div>
            </div>

            <div className="mx-auto flex min-h-[250px] w-full max-w-[334px] flex-col items-center justify-center rounded-[20px] bg-white px-4 py-5 sm:hidden">
              <div className="flex w-full max-w-[272px] flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-[46px] w-[164px] items-center justify-center rounded-[111.475px] border-2 border-[#E2E2E2]">
                    <span className="font-[Geist] text-[16px] font-medium leading-[20px] text-[#E2E2E2]">
                      Conformité
                    </span>
                  </div>
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-[#E2E2E2]">
                    <Plus size={20} strokeWidth={1.8} color="#E2E2E2" />
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="relative z-10 flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-white bg-[#BBCB2E]">
                    <Plus size={20} strokeWidth={1.8} color="#F7FCFF" />
                  </div>
                  <div className="-ml-[16px] flex h-[46px] flex-1 items-center justify-center rounded-[111.475px] bg-[#BBCB2E] pl-4">
                    <span className="font-[Geist] text-[16px] font-medium leading-[20px] text-[#003300]">
                      Décision
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex h-[46px] w-[182px] items-center justify-center rounded-[111.475px] border-2 border-[#E2E2E2]">
                    <span className="font-[Geist] text-[16px] font-medium leading-[20px] text-[#E2E2E2]">
                      Analyse
                    </span>
                  </div>
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-[#E2E2E2]">
                    <Plus size={20} strokeWidth={1.8} color="#E2E2E2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden h-[334px] w-full max-w-[334px] justify-center sm:flex">
              <div className="relative h-[334px] w-[334px] overflow-hidden rounded-[20px] bg-white">
              <div
                className="absolute"
                style={{ width: '272px', height: '167.21px', left: '31px', top: '83px' }}
              >
                <div
                  className="absolute flex items-center justify-between"
                  style={{ width: '246px', height: '55.74px', left: '0px', top: '0px' }}
                >
                  <div
                    className="flex items-center justify-center rounded-[111.475px] border-2 border-[#E2E2E2]"
                    style={{ width: '186px', height: '55.74px' }}
                  >
                    <span className="font-[Geist] text-[20px] font-medium leading-[29px] text-[#E2E2E2]">
                      Conformité
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center rounded-full border-2 border-[#E2E2E2]"
                    style={{ width: '55.74px', height: '55.74px' }}
                  >
                    <Plus size={24} strokeWidth={1.8} color="#E2E2E2" />
                  </div>
                </div>

                <div
                  className="absolute flex items-center"
                  style={{ width: '218.49px', height: '55.74px', left: '53.51px', top: '55.74px' }}
                >
                  <div
                    className="absolute left-0 top-0 flex items-center justify-center rounded-full border-2 border-white bg-[#BBCB2E]"
                    style={{ width: '55.74px', height: '55.74px' }}
                  >
                    <Plus size={24} strokeWidth={1.8} color="#F7FCFF" />
                  </div>
                  <div
                    className="ml-[31px] flex items-center justify-center rounded-[111.475px] bg-[#BBCB2E]"
                    style={{ width: '186px', height: '55.74px' }}
                  >
                    <span className="font-[Geist] text-[20px] font-medium leading-[29px] text-[#003300]">
                      Décision
                    </span>
                  </div>
                </div>

                <div
                  className="absolute flex items-center justify-between"
                  style={{ width: '271px', height: '55.74px', left: '11.15px', top: '111.48px' }}
                >
                  <div
                    className="flex items-center justify-center rounded-[111.475px] border-2 border-[#E2E2E2]"
                    style={{ width: '215px', height: '55.74px' }}
                  >
                    <span className="font-[Geist] text-[20px] font-medium leading-[29px] text-[#E2E2E2]">
                      Analyse
                    </span>
                  </div>
                  <div
                    className="flex items-center justify-center rounded-full border-2 border-[#E2E2E2]"
                    style={{ width: '55.74px', height: '55.74px' }}
                  >
                    <Plus size={24} strokeWidth={1.8} color="#E2E2E2" />
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto h-[320px] w-full max-w-[334px] overflow-hidden rounded-[20px] bg-[#eef4e8] sm:h-[500px] md:h-[540px] xl:h-[691px] xl:w-[334px] xl:min-w-[334px]">
            <Image
              src="/Group 352.svg"
              alt="RNJ Advisory team"
              fill
              sizes="(min-width: 1280px) 334px, 100vw"
              className="object-contain object-center p-3 sm:p-0 sm:object-cover"
            />
          </div>

          <div className="grid w-full max-w-[334px] justify-items-stretch gap-x-[19px] gap-y-4 md:max-w-none md:justify-items-center md:gap-y-[23px] md:grid-cols-2 xl:w-[687px] xl:min-w-[687px]">
            <div className="relative mx-auto h-[240px] w-full max-w-[334px] overflow-hidden rounded-[20px] bg-[#eef4e8] sm:h-[334px]">
              <Image
                src="/Group 363.svg"
                alt="Business success"
                fill
                sizes="(min-width: 1280px) 334px, 100vw"
                className="object-contain object-center p-3 sm:p-0 sm:object-cover"
              />
            </div>

            <div className="mx-auto flex min-h-[250px] w-full max-w-[334px] flex-col rounded-[20px] bg-white px-5 py-5 sm:hidden">
              <div
                className="mb-4 h-[62px] w-full rounded-[16px]"
                style={{ background: 'linear-gradient(90deg, #DDE597 0%, rgba(123, 127, 84, 0.17) 100%)' }}
              >
                <div className="flex h-full items-center gap-3 px-4">
                  <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#BBCB2E]">
                    <span className="font-[EB_Garamond] text-[21px] font-normal leading-[21px] text-[#003300]">
                      01
                    </span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div
                        key={dot}
                        className={`rounded-full bg-[#BBCB2E] ${dot === 1 ? 'h-[18px] w-[18px]' : 'h-[9px] w-[9px]'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="mb-4 max-w-[220px] font-[Geist] text-[24px] font-medium leading-[24px] text-[#003300]">
                développer votre activité en Belgique
              </h3>

              <p className="max-w-[230px] font-[Geist] text-[14px] font-medium leading-[17px] text-[#003300] opacity-60">
                complétez les étapes et démarrez votre Entrepreneuriat en Belgique
              </p>
            </div>

            <div className="hidden h-[334px] w-full max-w-[334px] justify-center sm:flex">
              <div className="relative h-[334px] w-[334px] overflow-hidden rounded-[20px] bg-white">
              <div
                className="absolute left-0 top-[30px] h-[74px] w-full"
                style={{
                  background:
                    'linear-gradient(90deg, #DDE597 0%, rgba(123, 127, 84, 0.17) 100%)',
                }}
              />

              <div
                className="absolute flex items-center gap-[29px]"
                style={{ width: '289px', height: '60px', left: '23px', top: '7px' }}
              >
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#BBCB2E]">
                  <span className="font-[EB_Garamond] text-[29.12px] font-normal leading-[29px] text-[#003300]">
                    01
                  </span>
                </div>

                <div className="flex items-center gap-[8px]">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      className={`rounded-full bg-[#BBCB2E] ${dot === 1 ? 'h-[28px] w-[28px]' : 'h-[14px] w-[14px]'}`}
                    />
                  ))}
                </div>
              </div>

              <h3
                className="absolute font-[Geist] font-medium text-[#003300]"
                style={{
                  width: '263px',
                  left: '23px',
                  top: '108px',
                  fontSize: '36px',
                  lineHeight: '32px',
                }}
              >
                développer votre activité en Belgique
              </h3>

              <p
                className="absolute font-[Geist] font-medium text-[#003300]"
                style={{
                  width: '263px',
                  left: '23px',
                  top: '226px',
                  fontSize: '16px',
                  lineHeight: '16px',
                  opacity: 0.6,
                }}
              >
                complétez les étapes et démarrez votre Entrepreneuriat en Belgique
              </p>
              </div>
            </div>

            <div className="mx-auto flex min-h-[266px] w-full max-w-[334px] flex-col rounded-[20px] bg-white sm:hidden">
              <div className="px-5 pt-5">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[15px] bg-[#839705]">
                    <Users2 size={14} strokeWidth={2.2} color="#FFFFFF" />
                  </div>
                  <span className="font-[Geist] text-[11px] font-medium leading-[10px] text-[#839705]">
                    partenaires
                  </span>
                </div>

                <span
                  className="font-[Geist] font-normal text-[#003300]"
                  style={{ fontSize: '44px', lineHeight: '42px', letterSpacing: '-0.05em' }}
                >
                  500+
                </span>

                <h3
                  className="mt-4 font-[Geist] font-semibold text-[#003300]"
                  style={{ fontSize: '20px', lineHeight: '20px', letterSpacing: '-0.05em' }}
                >
                  Partenaires de référence
                </h3>

                <p
                  className="mt-3 max-w-[220px] font-[Geist] font-medium text-[#003300]"
                  style={{ fontSize: '14px', lineHeight: '17px', letterSpacing: '-0.05em', opacity: 0.5 }}
                >
                  Un réseau solide pour vos projets
                </p>
              </div>

              <button
                type="button"
                className="mt-auto flex h-[72px] w-full items-center justify-center gap-[10px] rounded-[20px] bg-[#003300] px-5"
              >
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white">
                  <PhoneCall size={16} strokeWidth={2.2} color="#003300" />
                </div>
                <span className="rounded-[100px] bg-white px-[15px] py-[7px] font-[Geist] text-[14px] font-semibold leading-[20px] text-[#003300]">
                  Nous contacter
                </span>
              </button>
            </div>

            <div className="hidden h-[334px] w-full max-w-[334px] justify-center sm:flex">
              <div className="relative h-[334px] w-[334px] overflow-hidden rounded-[20px]">
              <div className="absolute left-0 top-0 h-[220px] w-full rounded-[20px] bg-white" />

              <div className="absolute left-[28px] top-[18px] flex items-center gap-2">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[15px] bg-[#839705]">
                  <Users2 size={14} strokeWidth={2.2} color="#FFFFFF" />
                </div>
                <span className="font-[Geist] text-[11px] font-medium leading-[10px] text-[#839705]">
                  partenaires
                </span>
              </div>

              <span
                className="absolute left-[28px] top-[61px] font-[Geist] font-normal text-[#003300]"
                style={{ fontSize: '64px', lineHeight: '60px', letterSpacing: '-0.05em' }}
              >
                500+
              </span>

              <h3
                className="absolute left-[28px] top-[145px] font-[Geist] font-semibold text-[#003300]"
                style={{ fontSize: '24px', lineHeight: '19px', letterSpacing: '-0.05em' }}
              >
                Partenaires de référence
              </h3>

              <p
                className="absolute left-[28px] top-[177px] font-[Geist] font-medium text-[#003300]"
                style={{ fontSize: '16px', lineHeight: '19px', letterSpacing: '-0.05em', opacity: 0.5 }}
              >
                Un réseau solide pour vos projets
              </p>

              <button
                type="button"
                className="absolute left-0 top-[243px] flex h-[91px] w-full items-center justify-center gap-[10px] rounded-[20px] bg-[#003300] px-[32px]"
              >
                <div className="flex h-[44px] w-[45px] items-center justify-center rounded-full bg-white">
                  <PhoneCall size={19} strokeWidth={2.2} color="#003300" />
                </div>
                <span className="rounded-[100px] bg-white px-[17px] py-[7px] font-[Geist] text-[16px] font-semibold leading-[29px] text-[#003300]">
                  Nous contacter
                </span>
              </button>
              </div>
            </div>

            <div className="relative mx-auto h-[240px] w-full max-w-[334px] overflow-hidden rounded-[20px] sm:h-[334px]">
              <Image
                src="/Group 353.svg"
                alt="Professional profiles"
                fill
                sizes="(min-width: 1280px) 334px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <p
          className="text-center font-[Geist] font-medium text-[#003300]"
          style={{
            fontSize: '15.3706px',
            lineHeight: '21px',
            textTransform: 'capitalize',
            opacity: 0.5,
          }}
        >
          &copy; 2026 RNJ Advisory. Tous droits réservés.
        </p>
      </div>
    </section>
  );
}

function RegulationAnalysisSection() {
  return (
    <section className="w-full bg-[#F7FCFF] py-16 md:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-[1321px] flex-col items-center justify-between gap-10 px-4 md:px-6 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex w-full max-w-[988px] flex-col items-center gap-[40px] text-center sm:gap-[48px] lg:items-start lg:gap-[88px] lg:text-left">
          <div className="flex items-center gap-3">
            <span className="h-[11.81px] w-[11.81px] rounded-full bg-[#003300]" />
            <h3
              className="font-[Geist] font-bold text-[#003300]"
              style={{ fontSize: 'clamp(20px, 2.2vw, 27.9642px)', lineHeight: '30px' }}
            >
              Études & Analyse Réglementaire
            </h3>
          </div>

          <div className="flex w-full flex-col items-center gap-10 lg:items-start lg:gap-[65px]">
            <div className="flex w-full max-w-[820.21px] flex-col items-center gap-6 sm:gap-8 lg:items-start lg:gap-[41.6px]">
              <h2
                className="font-[EB_Garamond] font-semibold text-[#003300]"
                style={{
                  maxWidth: '773.41px',
                  fontSize: 'clamp(34px, 8vw, 83.0753px)',
                  lineHeight: 'clamp(34px, 7vw, 68px)',
                  letterSpacing: '-0.03em',
                }}
              >
                Analyse Institutionnelle & Réglementaire
              </h2>

              <p
                className="max-w-[820.21px] font-[Geist] font-medium text-[#003300]"
                style={{
                  fontSize: 'clamp(15px, 3vw, 20.9988px)',
                  lineHeight: 'clamp(21px, 3.3vw, 23px)',
                  opacity: 0.8,
                }}
              >
                Vous êtes un organisme public, une institution privée, un investisseur ou un bailleur de fonds ? RNJ Advisory
                vous accompagne dans l’analyse approfondie des environnements institutionnels, juridiques et réglementaires afin
                de sécuriser vos décisions stratégiques.
              </p>
            </div>

            <div className="flex w-full max-w-[634.22px] flex-col gap-4 sm:flex-row sm:items-start sm:justify-center sm:gap-[12.4px] lg:justify-start">
              <button
                type="button"
                className="flex h-[68px] w-full items-center justify-center rounded-[82.6547px] border-[2.48019px] border-[#003300] px-8 font-[Geist] font-semibold text-[#003300] transition-colors hover:bg-[#003300] hover:text-[#F7FCFF] sm:h-[84.49px] sm:w-auto sm:px-[60px] lg:px-[110.369px]"
                style={{ fontSize: 'clamp(18px, 2vw, 25.1616px)', lineHeight: '25px' }}
              >
                En savoir plus
              </button>

              <button
                type="button"
                className="flex h-[68px] w-full items-center justify-center rounded-[141.694px] bg-[#003300] px-6 font-[Geist] font-semibold text-[#F7FCFF] transition-colors hover:bg-[#002200] sm:h-[83.04px] sm:w-auto sm:px-10 lg:px-[44px]"
                style={{ fontSize: 'clamp(18px, 2vw, 25.1616px)', lineHeight: '25px' }}
              >
                Demander une analyse
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[240px] sm:max-w-[300px] md:max-w-[340px] lg:mx-0 lg:max-w-[364.57px]">
          <div className="relative h-[280px] w-full sm:h-[360px] md:h-[460px] lg:h-[580.66px]">
            <Image
              src="/light bulb 1 (1).svg"
              alt="Ampoule - Analyse réglementaire"
              fill
              sizes="(min-width: 1024px) 364px, (min-width: 768px) 340px, (min-width: 640px) 300px, 240px"
              className="object-contain"
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
        <div className="grid w-full justify-items-center gap-[16.16px] md:grid-cols-2 xl:grid-cols-3">
          {whyChooseGridCards.map((card) => (
            <article
              key={card.title}
              className="relative mx-auto flex min-h-[400px] w-full max-w-[429.23px] flex-col items-center overflow-hidden rounded-[32px] bg-[#F7FCFF] px-5 pb-8 pt-9 text-center sm:min-h-[420px] sm:rounded-[40px] sm:px-7 sm:pb-10 sm:pt-10 xl:h-[429.23px] xl:rounded-[70.6962px] xl:px-0 xl:pb-0 xl:pt-0"
              style={{ boxShadow: '0px 4px 15.3px rgba(0, 0, 0, 0.25)' }}
            >
              <div
                className="relative left-auto top-auto mx-auto -translate-x-0 xl:absolute xl:left-1/2 xl:top-[58px] xl:-translate-x-1/2"
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
                className="relative left-auto mt-6 flex w-full max-w-[344px] -translate-x-0 flex-col items-center gap-3 px-1 sm:mt-8 sm:gap-4 xl:absolute xl:left-1/2 xl:top-[196.31px] xl:mt-0 xl:-translate-x-1/2 xl:px-0"
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
                    lineHeight: 'clamp(19px, 4.2vw, 22px)',
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

export default function Home() {
  const [showTunisiaPopup, setShowTunisiaPopup] = useState(false);
  const [showStrategicPopup, setShowStrategicPopup] = useState(false);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [hoveredScrollCardIndex, setHoveredScrollCardIndex] = useState<number | null>(null);
  const [hoveredFaqIndex, setHoveredFaqIndex] = useState<number | null>(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#F7FCFF] to-white">
      <Navbar />

      <div className="relative w-full">
        <div
          className="relative w-full min-h-[900px] sm:min-h-[940px] md:min-h-[900px] lg:min-h-[1009px]"
          style={{ aspectRatio: '1518 / 1009' }}
        >
          <Image
            src="/pexels-jacky-2803806-4532517 1.svg"
            alt="Arrière-plan"
            width={1518}
            height={1009}
            priority
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#0c2517]/10 via-transparent to-[#2a1e14]/55" />

          <div
            className="absolute left-1/2 -translate-x-1/2 w-[90%] md:w-[746px] px-4 md:px-0 top-[120px] md:top-[200px] lg:top-[249px]"
          >
            <div className="flex flex-col items-center gap-6 md:gap-10">
              <div className="flex flex-col items-center gap-4 md:gap-[31px]">
                <h1
                  className="text-center font-[EB_Garamond] text-white text-[32px] md:text-[50px] lg:text-[68px] font-semibold leading-[1.1] md:leading-[0.85]"
                >
                  Conseil stratégique pour une performance durable
                </h1>

                <p
                  className="mt-2 md:mt-8 text-center font-[Geist] text-white text-[14px] md:text-[16px] font-semibold leading-[1.4] max-w-[90%] md:max-w-[814px]"
                >
                  RNJ Advisory s&apos;associe à des organisations visionnaires pour
                  résoudre des défis critiques, optimiser leurs opérations et créer
                  une valeur durable dans un environnement mondial en constante
                  évolution.
                </p>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-[7.1px] w-full">
                <button
                  className="flex h-[50px] md:h-[70px] w-[200px] md:w-[230px] items-center justify-center rounded-full bg-[#F7FCFF] shadow-lg transition hover:opacity-90"
                  style={{ boxShadow: '2.10047px 4.20093px 22.6px rgba(0, 0, 0, 0.44)' }}
                >
                  <span
                    className="text-center font-[Geist] font-semibold text-[#003300] text-[14px] md:text-[16px]"
                  >
                    Découvrir nos services
                  </span>
                </button>

                <button
                  className="flex h-[50px] md:h-[69px] w-[220px] md:w-[285px] items-center gap-3 md:gap-[21px] rounded-full bg-[#BBCB2E] px-2 md:px-[6px] shadow-lg transition hover:opacity-90"
                  style={{
                    boxShadow: '2.10047px 4.20093px 22.6px rgba(0, 0, 0, 0.44)',
                  }}
                >
                  <div className="relative h-[40px] w-[40px] md:h-[56px] md:w-[56px] flex-shrink-0">
                    <div
                      className="absolute h-full w-full rounded-full bg-white left-1 top-0.5"
                    />
                    <div
                      className="absolute flex h-full w-full items-center justify-center left-1 top-0.5"
                    >
                      <Image
                        src="/Vector (17).svg"
                        alt="Arrow icon"
                        width={18}
                        height={18}
                        className="md:w-[22px] md:h-[22px]"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                  </div>

                  <span
                    className="text-center font-[Geist] text-[#003300] text-[14px] md:text-[16px] font-extrabold"
                  >
                    Contacter un conseiller
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-32 sm:bottom-36 lg:bottom-[285px]">
            <div className="mx-auto w-full max-w-[1510px]">
              <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 pr-4 md:gap-5 md:px-6 xl:grid xl:grid-cols-[663px_296px_422px] xl:gap-[19px] xl:overflow-visible xl:px-0 xl:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div
                className="flex min-h-[196px] min-w-[248px] max-w-[248px] snap-start flex-col gap-3 rounded-[26px] border border-white/15 bg-[rgba(0,0,0,0.08)] p-3 text-white shadow-[0px_5px_31.8px_rgba(0,0,0,0.27)] backdrop-blur-[10px] sm:min-h-[236px] sm:min-w-[320px] sm:max-w-[320px] sm:gap-4 sm:rounded-[34px] sm:p-4 md:min-h-[260px] md:min-w-[420px] md:max-w-[420px] md:rounded-[40px] xl:min-w-0 xl:max-w-none xl:w-[663px] xl:flex-col xl:gap-5 xl:rounded-[50px] xl:p-[14px] 2xl:flex-row 2xl:items-center 2xl:gap-8"
              >
                <div className="relative h-[104px] w-full overflow-hidden rounded-[22px] sm:h-[156px] md:h-[210px] xl:h-[256px] md:w-full xl:w-[267px] xl:min-w-[267px] md:rounded-[28px] xl:rounded-[36px]">
                  <Image
                    src="/Group 527.svg"
                    alt="Réunion autour d'un projet durable"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col items-start gap-2 md:max-w-[336px] md:gap-3 xl:gap-[13px]">
                  <h3 className="font-[Geist] text-[19px] font-medium leading-[1.05] text-white sm:text-[24px] md:text-[26px] xl:text-[32px] md:leading-[1.05] xl:leading-[34px]">
                    Quand la durabilité rencontre la stratégie.
                  </h3>

                  <p className="font-[Geist] text-[12px] font-medium leading-[1.3] text-white/60 sm:text-[14px] md:text-[15px] xl:text-[16px] xl:leading-[20px]">
                    Une approche qui transforme les exigences environnementales en
                    leviers de croissance et d’innovation.
                  </p>

                  <Link
                    href="/services"
                    className="font-[Geist] text-[14px] font-medium leading-[18px] text-white underline underline-offset-4 sm:text-[16px] xl:text-[20px] xl:leading-[20px]"
                  >
                    Découvrez nos services
                  </Link>
                </div>
              </div>

              <div
                className="flex min-h-[170px] min-w-[188px] max-w-[188px] snap-start flex-col items-center justify-center rounded-[26px] border border-white/15 bg-[rgba(0,0,0,0.08)] px-5 py-6 text-white shadow-[0px_5px_31.8px_rgba(0,0,0,0.27)] backdrop-blur-[10px] sm:min-h-[220px] sm:min-w-[228px] sm:max-w-[228px] sm:rounded-[34px] sm:px-6 sm:py-7 md:min-h-[250px] md:min-w-[296px] md:max-w-[296px] md:rounded-[40px] md:px-10 md:py-10 xl:min-w-0 xl:max-w-none xl:w-[296px] xl:rounded-[50px] xl:px-[48px] xl:py-[45px]"
              >
                <div className="relative h-[44px] w-[108px] sm:h-[54px] sm:w-[128px] md:h-[70px] md:w-[168px] xl:h-[76px] xl:w-[182px]">
                  <Image
                    src="/Frame 526.svg"
                    alt="Portraits de clients"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="mt-5 flex flex-col items-center sm:mt-6 md:mt-7">
                  <span className="font-[Geist] text-[36px] font-semibold leading-none text-white sm:text-[46px] md:text-[58px] xl:text-[64px] xl:leading-[83px]">
                    10K+
                  </span>
                  <span className="font-[Geist] text-[18px] font-medium leading-[1.05] text-white/70 sm:text-[22px] md:text-[28px] xl:text-[32px] xl:leading-[42px]">
                    Clients
                  </span>
                </div>
              </div>

              <div
                className="flex min-h-[170px] min-w-[224px] max-w-[224px] snap-start flex-col justify-center rounded-[26px] border border-white/15 bg-[rgba(0,0,0,0.08)] px-5 py-6 text-white shadow-[0px_5px_31.8px_rgba(0,0,0,0.27)] backdrop-blur-[10px] sm:min-h-[210px] sm:min-w-[280px] sm:max-w-[280px] sm:rounded-[34px] sm:px-6 sm:py-7 md:min-h-[250px] md:min-w-[360px] md:max-w-[360px] md:rounded-[40px] md:px-10 xl:min-w-0 xl:max-w-none xl:w-[422px] xl:min-h-[284px] xl:rounded-[50px] xl:px-[43px] xl:py-9"
              >
                <div className="flex max-w-[336px] flex-col items-start gap-2 sm:gap-3 md:gap-[13px]">
                  <h3 className="font-[Geist] text-[20px] font-medium leading-[1.05] text-white sm:text-[24px] md:text-[28px] xl:text-[32px] xl:leading-[34px]">
                    Une approche claire et structurée
                  </h3>

                  <p className="font-[Geist] text-[12px] font-medium leading-[1.3] text-white/60 sm:text-[14px] md:text-[15px] xl:text-[16px] xl:leading-[20px]">
                    Nous transformons la complexité réglementaire en décisions
                    lisibles et opérationnelles.
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div className="relative w-full bg-[rgba(0,0,0,0.004)] py-6 md:py-[26.2558px]">
          <div className="mx-auto flex w-full max-w-[1536px] flex-wrap items-center justify-center gap-x-8 gap-y-6 px-4 md:gap-x-12 lg:gap-x-[112.37px]">
            {logoStripItems.map((logo) => (
              <div
                key={logo.src}
                className="relative shrink-0"
                style={{
                  width: `clamp(${Math.max(logo.width * 0.55, 72)}px, 14vw, ${logo.width}px)`,
                  height: `clamp(${Math.max(logo.height * 0.55, 28)}px, 5vw, ${logo.height}px)`,
                }}
              >
                <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full overflow-hidden min-h-[800px] md:min-h-[1200px] lg:min-h-[1609px]">
          <div
            className="absolute left-0 w-full h-full"
            style={{
              background: '#003300',
            }}
          >
            <Image
              src="/Rectangle 4.svg"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          <div
            className="absolute left-1/2 -translate-x-1/2 hidden md:block"
            style={{
              width: '1798px',
              height: '1896.72px',
              top: '-54.29px',
              pointerEvents: 'none',
            }}
          >
            {glowShapes.map((shape, index) => (
              <div
                key={`${shape.left}-${shape.top}-${index}`}
                className="absolute rounded-full"
                style={shape}
              />
            ))}
          </div>

          <div className="relative md:absolute left-0 md:left-1/2 top-0 w-full md:w-[1510px] md:-translate-x-1/2 px-4 md:px-0 py-12 md:py-0">
            <div
              className="flex flex-col items-center gap-6 md:gap-[35.5px] md:absolute md:left-1/2 md:-translate-x-1/2 md:top-[208px]"
            >
              <h2
                className="text-center text-[#003300] font-['EB_Garamond'] text-[36px] md:text-[70px] lg:text-[100px] font-medium leading-[1.1] md:leading-[0.85] max-w-[90%] md:max-w-[964px]"
              >
                Expertise Reconnue. Résultats Prouvés.
              </h2>

              <p
                className="text-center text-[#003300] font-[Geist] text-[14px] md:text-[20px] lg:text-[26px] font-medium leading-[1.3] opacity-70 max-w-[90%] md:max-w-[906px] mt-2 md:mt-[56px]"
              >
                RNJ Advisory s&apos;associe à des organisations visionnaires pour
                résoudre des défis critiques, optimiser leurs opérations et créer
                une valeur durable dans un environnement mondial en constante
                évolution.
              </p>
            </div>

            <div
              className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-[19.21px] mt-12 md:mt-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-[706.81px] w-full px-4 md:px-0"
              style={{
                filter: 'drop-shadow(0px 3.84163px 30.4449px rgba(0, 0, 0, 0.25))',
              }}
            >
              <div
                className="relative flex w-full max-w-[320px] md:max-w-[451px] h-auto md:h-[524px] flex-col items-center justify-center p-8 md:p-[75px_39px] rounded-[30px] bg-white/5"
              >
                <div className="flex flex-col items-center gap-6 md:gap-[46px]">
                  <div className="relative w-[60px] h-[70px] md:w-[88px] md:h-[101px]">
                    <Image
                      src="/Layer 1 (7).svg"
                      alt="Expertise icon"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-3 md:gap-[17px]">
                    <h3 className="text-center font-[Geist] text-white text-[20px] md:text-[29px] font-extrabold">
                      Expertise Certifiée
                    </h3>

                    <p className="text-center font-[Geist] text-white text-[14px] md:text-[20px] font-medium leading-[1.3] opacity-50 max-w-[280px] md:max-w-[372px]">
                      Une maîtrise approfondie des enjeux financiers,
                      réglementaires et ESG pour des décisions
                      sécurisées et conformes.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="relative flex w-full max-w-[320px] md:max-w-[451px] h-auto md:h-[524px] flex-col items-center justify-center p-8 md:p-[75px_39px] rounded-[30px] bg-white/5"
              >
                <div className="flex flex-col items-center gap-6 md:gap-[46px]">
                  <div className="relative w-[70px] h-[70px] md:w-[101px] md:h-[101px]">
                    <Image
                      src="/Mask group (9).svg"
                      alt="Approche icon"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-3 md:gap-[17px]">
                    <h3 className="text-center font-[Geist] text-white text-[20px] md:text-[29px] font-extrabold">
                      Approche Sur-Mesure
                    </h3>

                    <p className="text-center font-[Geist] text-white text-[14px] md:text-[20px] font-medium leading-[1.3] opacity-50 max-w-[280px] md:max-w-[372px]">
                      Des stratégies adaptées à chaque
                      entreprise, orientées performance et résultats
                      mesurables.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="relative flex w-full max-w-[320px] md:max-w-[451px] h-auto md:h-[524px] flex-col items-center justify-center p-8 md:p-[75px_39px] rounded-[30px] bg-white/5"
              >
                <div className="flex flex-col items-center gap-6 md:gap-[46px]">
                  <div className="relative w-[70px] h-[70px] md:w-[101px] md:h-[101px]">
                    <Image
                      src="/Mask group (10).svg"
                      alt="Vision icon"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex flex-col items-center gap-3 md:gap-[17px]">
                    <h3 className="text-center font-[Geist] text-white text-[20px] md:text-[29px] font-extrabold">
                      Vision Durable
                    </h3>

                    <p className="text-center font-[Geist] text-white text-[14px] md:text-[20px] font-medium leading-[1.3] opacity-50 max-w-[280px] md:max-w-[372px]">
                      Une maîtrise approfondie des enjeux financiers,
                      réglementaires et ESG pour des décisions
                      sécurisées et conformes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p
              className="text-white text-center md:text-left font-[Geist] text-[14px] md:text-[20px] font-normal leading-[1.4] opacity-50 mt-8 md:mt-0 md:absolute md:left-[157px] md:top-[1369px] max-w-[90%] md:max-w-[1193px] mx-auto md:mx-0 px-4 md:px-0"
            >
              RNJ Advisory combines certified expertise, tailored strategy, and a
              long-term sustainable vision to deliver secure, high-impact
              decisions. Our approach ensures regulatory compliance, measurable
              performance, and responsible growth aligned with each
              organization&apos;s strategic objectives.
            </p>
          </div>
        </div>

        <section
          className="relative w-full overflow-hidden bg-[#647359] min-h-[640px] sm:min-h-[720px] md:min-h-[800px]"
          style={{ aspectRatio: '1513 / 1009' }}
        >
          <Image
            src="/happy-black-businessman-shaking-hands-with-his-col-2026-01-09-10-34-53-utc 1 (1).svg"
            alt="Business meeting background"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={false}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#647359]/95 via-[#647359]/58 to-transparent md:from-[#647359]/70 md:via-transparent md:to-transparent" />

          <div
            className="absolute inset-x-0 bottom-0 flex w-full flex-col items-start justify-end px-5 pb-6 pt-24 sm:px-6 sm:pb-8 md:left-[64px] md:inset-x-auto md:bottom-auto md:top-[800px] md:w-auto md:px-0 md:pb-0 md:pt-0"
          >
            <div className="flex max-w-[330px] flex-col gap-4 sm:max-w-[420px] md:max-w-[905px] md:gap-6">
              <h2
                className="text-white font-['EB_Garamond'] font-semibold text-[26px] sm:text-[34px] md:text-[50px] lg:text-[70px] leading-[1.05] md:leading-[0.8] tracking-tight"
              >
                Concrétisez vos idées avec un cabinet de conseils
                juridiques &amp; stratégiques à Bruxelles
              </h2>

              <p
                className="max-w-[320px] font-[Geist] text-[14px] font-medium leading-[1.45] text-white/80 sm:max-w-[360px] md:max-w-[615px] md:text-[19px] md:leading-[1.4] md:text-white md:opacity-70"
              >
                RNJ Advisory accompagne des organisations ambitieuses pour relever
                des défis complexes, optimiser leurs opérations et créer une
                valeur durable dans un environnement en constante évolution.
              </p>
            </div>

            <div className="mt-6 flex flex-col items-start gap-4 md:flex-row md:gap-[10.5px]">
              <button
                type="button"
                className="flex min-h-[74px] min-w-[90px] items-center justify-center rounded-[14px] border-2 border-white px-7 py-4 font-[Geist] text-[16px] font-semibold text-white md:min-h-0 md:rounded-[9px] md:px-6 md:text-[21px]"
              >
                À propos
              </button>

              <button
                type="button"
                className="flex min-h-[68px] min-w-[235px] items-center justify-center rounded-[14px] bg-[#BBCB2E] px-7 py-4 font-[Geist] text-[16px] font-semibold text-[#003300] md:min-h-0 md:rounded-[9px] md:px-6 md:text-[21px]"
              >
                Demander une consultation
              </button>
            </div>
          </div>
        </section>

        <section className="w-full bg-[#F7FCFF] py-12 md:py-24">
          <div className="mx-auto flex w-full max-w-[1513px] flex-col items-center gap-12 md:gap-[180px] px-4">
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

                <div className="mx-auto grid w-full max-w-[1120px] grid-cols-2 justify-items-center gap-x-4 gap-y-6 sm:gap-x-6 md:grid-cols-4 md:gap-x-[28px] md:gap-y-8 lg:gap-x-[40px]">
                  {entrepreneurshipCards.map((card) => (
                    <div
                      key={card.title}
                      className="group flex min-h-[188px] h-auto md:h-[281px] w-full max-w-[170px] sm:max-w-[180px] md:max-w-[217px] cursor-pointer flex-col items-center text-center"
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
                        className="relative h-[110px] w-[110px] sm:h-[120px] sm:w-[120px] md:h-[217px] md:w-[217px] rounded-[22px] md:rounded-[40px] border-[3px] md:border-[4px] border-transparent bg-[rgba(187,203,46,0.5)] transition-all duration-300 ease-out group-hover:border-[#D1D98B] group-hover:bg-[#003300] group-active:border-[#D1D98B] group-active:bg-[#003300] touch-active:border-[#D1D98B] touch-active:bg-[#003300]"
                      >
                        <div
                          className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 h-[36px] w-[36px] sm:h-[40px] sm:w-[40px] md:h-[60px] md:w-[60px]"
                        >
                          <Image
                            src={card.icon}
                            alt={card.title}
                            fill
                            className="object-contain transition-all duration-300 ease-out group-hover:[filter:brightness(0)_saturate(100%)_invert(85%)_sepia(20%)_saturate(509%)_hue-rotate(30deg)_brightness(95%)_contrast(88%)] group-active:[filter:brightness(0)_saturate(100%)_invert(85%)_sepia(20%)_saturate(509%)_hue-rotate(30deg)_brightness(95%)_contrast(88%)] touch-active:[filter:brightness(0)_saturate(100%)_invert(85%)_sepia(20%)_saturate(509%)_hue-rotate(30deg)_brightness(95%)_contrast(88%)]"
                          />
                        </div>
                      </div>

                      <p className="mt-3 md:mt-6 max-w-[145px] sm:max-w-[150px] md:max-w-[176px] font-[Geist] font-semibold text-[#003300] text-[13px] sm:text-[14px] md:text-[20px] leading-[1.25]">
                        {card.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative w-full max-w-[1393.44px]">
              <div className="mb-8 md:mb-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                <div className="flex items-center gap-3">
                  <span className="h-[8px] w-[8px] md:h-[10px] md:w-[10px] rounded-full bg-[#003300]" />
                  <span className="font-[Geist] font-bold text-[#003300] text-[16px] md:text-[24px]">
                    Services
                  </span>
                </div>

                <button
                  type="button"
                  className="rounded-full bg-[#BBCB2E] px-6 py-3 font-[Geist] font-semibold text-[#003300] text-[16px] md:text-[24px]"
                >
                  Contact
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-[17px]">
                {serviceCards.map((card) => (
                  <article
                    key={card.title}
                    className="rounded-[25px] md:rounded-[39px] bg-[#F7FCFF] px-6 md:px-8 py-8 md:py-[60px] text-center"
                    style={{ boxShadow: '1.92358px 1.92358px 20.8708px rgba(0, 0, 0, 0.1)' }}
                  >
                    <div
                      className="relative mx-auto mb-6 md:mb-10 w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
                    >
                      <Image
                        src={card.icon}
                        alt={card.title}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <h3 className="mx-auto mb-4 md:mb-6 max-w-[387px] font-[Geist] font-bold text-[#003300] text-[20px] md:text-[29px] leading-[1.2]">
                      {card.title}
                    </h3>

                    <p
                      className="mx-auto max-w-[386px] font-[Geist] font-medium text-[#003300]"
                      style={{ fontSize: '15.295px', lineHeight: '15px' }}
                    >
                      {card.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid w-full max-w-[1157px] grid-cols-1 gap-4 md:gap-[19px] xl:grid-cols-2">
              <article className="relative overflow-hidden rounded-[25px] md:rounded-[35px]">
                <div className="relative h-[500px] md:h-[816px] w-full">
                  <Image
                    src="/Mask group (16).svg"
                    alt="Stratégie et conformité"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 flex flex-col items-center px-4 py-8 md:px-[32px] md:pb-[56px] md:pt-[77px]">
                  <div className="flex w-full max-w-[505px] flex-col items-start gap-5 pt-5 md:gap-[17px] md:pt-0">

                    <div className="flex w-full flex-col items-center gap-4 md:gap-[19px]">
                      <div
                        className="relative w-full overflow-hidden rounded-[18px] text-white md:rounded-[18px]"
                        style={{
                          background: 'rgba(255, 255, 255, 0.14)',
                          boxShadow: '2px 4px 22.3px rgba(0, 0, 0, 0.6)',
                        }}
                      >
                        <div className="px-8 pb-[96px] pt-8 md:px-[41px] md:pb-[104px] md:pt-[45px]">
                          <div className="relative mb-7 h-[20px] w-[84px] md:mb-9 md:h-[44px] md:w-[111px]">
                            <Image
                              src="/image 2.svg"
                              alt="RNJ Advisory"
                              fill
                              className="object-contain object-left"
                            />
                          </div>

                          <h3 className="mb-6 font-[Geist] text-[30px] font-normal leading-[0.98] text-white sm:text-[32px] md:mb-8 md:text-[50px] lg:text-[61px] lg:leading-[60px]">
                            Stratégie &amp; Conformité
                          </h3>

                          <div className="relative max-h-[184px] overflow-hidden md:max-h-[190px]">
                            <p className="font-[Geist] text-[13px] font-normal leading-[1.14] text-white md:text-[16px] md:leading-[18px]">
                              RNJ Advisory est un cabinet de conseil stratégique
                              spécialisé dans l’analyse institutionnelle, la
                              conformité réglementaire et le développement
                              économique durable. Nous accompagnons les acteurs
                              publics, les entreprises privées, les investisseurs
                              et les bailleurs de fonds dans la compréhension
                              d’environnements juridiques et réglementaires
                              complexes, en Europe et en Afrique du Nord. Notre
                              approche repose sur trois piliers : rigueur
                              analytique, vision stratégique et sécurisation des
                              projets. Nous aidons nos clients à anticiper les
                              évolutions légales, structurer leurs activités,
                              maîtriser leurs risques et saisir les opportunités
                              liées aux transitions économiques, énergétiques et
                              réglementaires.
                            </p>

                            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(71,71,71,0.96)] via-[rgba(71,71,71,0.72)] to-transparent md:h-20" />
                          </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex h-[76px] items-center justify-center rounded-b-[18px] bg-[rgba(0,0,0,0.10)] shadow-[2px_4px_22.3px_rgba(0,0,0,0.6)] md:rounded-b-[18px]">
                          <button
                            type="button"
                            className="inline-flex h-[48px] items-center justify-center rounded-full bg-white px-7 font-[Geist] text-[11px] font-bold text-black"
                            onClick={() => setShowStrategicPopup(true)}
                          >
                            Read more...
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="h-[10px] w-[10px] rounded-full bg-[#ECECEC]" />
                        <span className="h-[8px] w-[8px] rounded-full bg-white/30" />
                        <span className="h-[8px] w-[8px] rounded-full bg-white/30" />
                      </div>
                    </div>

                    <div className="flex w-full flex-col items-center gap-4 md:gap-[26px]">
                      <button
                        type="button"
                        className="flex h-[56px] min-w-[196px] items-center justify-center rounded-[18px] bg-white px-[34px] py-[18px] font-[Geist] text-[16px] font-bold text-black"
                        onClick={() => setShowStrategicPopup(true)}
                      >
                        Sécuriser mon projet
                      </button>

                      <p className="text-center font-[Geist] font-medium text-white/50 text-[12px] md:text-[15px]">
                        &copy; 2026 RNJ Advisory. Tous droits réservés.
                      </p>
                    </div>
                  </div>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-[25px] md:rounded-[35px]">
                <div className="relative h-[500px] md:h-[816px] w-full">
                  <Image
                    src="/Mask group (17).svg"
                    alt="Decision strategique"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="absolute inset-0 text-white p-4 md:p-8">
                  <div
                    className="rounded-[14px] md:rounded-[18px] p-4 md:p-6"
                    style={{
                      background: 'rgba(255, 255, 255, 0.14)',
                      boxShadow: '2px 4px 22.3px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    <div className="relative w-full h-[150px] md:h-[250px] mb-4">
                      <Image
                        src="/Group 65.svg"
                        alt="Performance chart"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <h3 className="font-[EB_Garamond] font-normal text-white text-[22px] md:text-[31px] leading-[1.1] mb-3">
                      Des projets accompagnes securises des la phase de
                      structuration
                    </h3>

                    <p className="text-white/60 text-[13px] md:text-[16px] leading-[1.3]">
                      Nous analysons, structurons et securisons vos projets dans
                      des environnements reglementaires complexes.
                    </p>
                  </div>

                  <p className="text-white/60 text-[13px] md:text-[16px] leading-[1.3] mt-4">
                  Une expertise indépendante au service de décisions
                  stratégiques sécurisées.
                  </p>

                  <button
                    type="button"
                    className="absolute flex items-center justify-center rounded-full border-2 border-white font-[Geist] font-medium text-white"
                    style={{
                      left: '32px',
                      top: '605px',
                      width: '114px',
                      height: '53px',
                      fontSize: '16px',
                      lineHeight: '16px',
                    }}
                  >
                    À propos
                  </button>

                  <button
                    type="button"
                    className="absolute flex items-center justify-center rounded-full bg-white font-[Geist] font-bold text-black"
                    style={{
                      left: '156px',
                      top: '605px',
                      width: '225px',
                      height: '53px',
                      fontSize: '16px',
                      lineHeight: '16px',
                    }}
                    onClick={() => setShowStrategicPopup(true)}
                  >
                    Sécuriser mon projet
                  </button>
                </div>
              </article>
            </div>

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
                        src="/minimal horizontal logo white 1.svg"
                        alt="RNJ Advisory"
                        fill
                        className="object-contain object-left"
                      />
                    </div>

                    <div className="max-w-[1139px]">
                      <h2 className="mb-6 font-[Geist] font-normal text-white text-[40px] leading-[0.98] sm:text-[56px] md:mb-8 md:text-[88px] md:leading-[0.98] lg:text-[128px]">
                        Stratégie &amp; Conformité
                      </h2>

                      <p className="font-[Geist] font-normal text-white text-[16px] leading-[1.18] sm:text-[18px] md:text-[24px] md:leading-[1.12] lg:text-[32px]">
                        RNJ Advisory est un cabinet de conseil stratégique spécialisé dans l’analyse institutionnelle, la conformité réglementaire et le développement économique durable. Nous accompagnons les acteurs publics, les entreprises privées, les investisseurs et les bailleurs de fonds dans la compréhension d’environnements juridiques et réglementaires complexes, en Europe et en Afrique du Nord. Notre approche repose sur trois piliers : rigueur analytique, vision stratégique et sécurisation des projets. Nous aidons nos clients à anticiper les évolutions légales, structurer leurs activités, maîtriser leurs risques et saisir les opportunités liées aux transitions économiques, énergétiques et réglementaires. RNJ Advisory intervient notamment sur les enjeux de conformité européenne, la structuration d’activités entrepreneuriales et l’accompagnement stratégique des PME et institutions en croissance. Notre mission : transformer la complexité réglementaire en levier de performance et de compétitivité durable.
                      </p>
                    </div>

                    <div className="mt-8 flex flex-col items-start gap-4 md:mt-10">
                      <Link
                        href="/contact"
                        className="inline-flex h-[68px] items-center justify-center rounded-full bg-white px-10 font-[Geist] text-[20px] font-medium text-black transition hover:opacity-90 md:h-[97px] md:px-[72px] md:text-[24px]"
                        onClick={() => setShowStrategicPopup(false)}
                      >
                        Contact
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <section className="w-full max-w-[1392.5px] px-4 sm:px-6 md:px-8">
              <div className="mb-8 md:mb-[62px] flex w-full flex-col gap-4 md:gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex items-center gap-[8px] md:gap-[11px]">
                  <span className="h-[8px] w-[8px] md:h-[10px] md:w-[10px] rounded-full bg-[#003300]" />
                  <span
                    className="font-[Geist] font-bold text-[#003300]"
                    style={{ fontSize: 'clamp(16px, 2.5vw, 23.6828px)', lineHeight: 'clamp(20px, 2.8vw, 25px)' }}
                  >
                    Fiabilité
                  </span>
                </div>

                <button
                  type="button"
                  className="flex h-[40px] md:h-[47px] w-[140px] md:w-[159px] items-center justify-center rounded-[200px] bg-[#BBCB2E] px-[18px] md:px-[23px] py-[8px] md:py-[10px] font-[Geist] font-semibold text-[#003300] hover:bg-[#a8b829] transition-colors active:scale-95 active:bg-[#9aa824]"
                  style={{ fontSize: 'clamp(16px, 2.5vw, 23.6828px)', lineHeight: 'clamp(16px, 2.2vw, 20px)' }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }, 150);
                  }}
                >
                  Contact
                </button>
              </div>

              <div className="flex w-full flex-col items-start gap-8 md:gap-[62px] xl:flex-row xl:items-center xl:justify-between">
                <div className="max-w-[100%] md:max-w-[792px]">
                  <p
                    className="mb-6 md:mb-8 max-w-[100%] md:max-w-[473px] font-[Geist] font-semibold text-[#003300] text-center md:text-left"
                    style={{ fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 'clamp(16px, 2.4vw, 18px)', opacity: 0.49 }}
                  >
                    Nous analysons votre environnement institutionnel et
                    réglementaire afin de sécuriser vos décisions et garantir la
                    conformité de vos projets.
                  </p>

                  <h2
                    className="font-[EB_Garamond] font-medium text-[#003300] text-center md:text-left"
                    style={{ fontSize: 'clamp(32px, 5vw, 72.215px)', lineHeight: 'clamp(36px, 4.5vw, 57px)' }}
                  >
                    Vous portez un projet. Nous sécurisons son environnement.
                  </h2>
                </div>

                <div className="relative h-[200px] md:h-[280px] lg:h-[322px] w-[180px] md:w-[220px] lg:w-[257px] overflow-hidden rounded-[20px] md:rounded-[28px] mx-auto md:mx-0">
                  <Image src="/Frame 65.svg" alt="2026 insight" fill className="object-cover" />
                </div>
              </div>
            </section>

            <article
              className="grid w-full max-w-[1392px] grid-cols-1 gap-[30px] md:gap-[40px] rounded-[20px] md:rounded-[40px] bg-[#F7FCFF] p-[12px] md:p-[15px] xl:grid-cols-[672px_minmax(0,1fr)]"
              style={{ boxShadow: '2px 4px 28.3px rgba(0, 0, 0, 0.17)' }}
            >
              <div className="relative min-h-[300px] md:min-h-[500px] lg:min-h-[781px] overflow-hidden rounded-[15px] md:rounded-[25px] order-2 xl:order-1">
                <Image
                  src="/Mask group (18).svg"
                  alt="Entrepreneurs hors Union Europeenne"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col items-start gap-[30px] md:gap-[42.12px] px-4 md:px-6 py-6 md:py-10 order-1 xl:order-2">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="h-[6px] w-[6px] md:h-[9.33px] md:w-[9.33px] rounded-full bg-[#003300]" />
                  <span
                    className="font-[Geist] font-semibold text-[#003300]"
                    style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', lineHeight: 'clamp(20px, 2.8vw, 24px)' }}
                  >
                    Entrepreneuriat
                  </span>
                </div>

                <div className="flex flex-col gap-[40px] md:gap-[61px]">
                  <div className="flex flex-col gap-[15px] md:gap-[19px]">
                    <h3
                      className="max-w-[100%] md:max-w-[613px] font-[EB_Garamond] font-semibold text-[#003300] text-center md:text-left"
                      style={{
                        fontSize: 'clamp(28px, 4.5vw, 64px)',
                        lineHeight: 'clamp(32px, 4vw, 51px)',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      Entrepreneurs Hors Union Europeenne<br className="hidden md:block" /> Installation en Belgique
                    </h3>

                    <p
                      className="max-w-[100%] md:max-w-[572px] font-[Geist] font-medium text-[#003300] text-center md:text-left"
                      style={{ 
                        fontSize: 'clamp(14px, 2vw, 16px)', 
                        lineHeight: 'clamp(16px, 2.4vw, 19px)', 
                        opacity: 0.7 
                      }}
                    >
                      Vous êtes ressortissant hors Union européenne et souhaitez
                      développer votre activité en Belgique ? RNJ Advisory vous
                      accompagne à chaque étape de votre installation afin de
                      sécuriser votre projet sur les plans juridique, stratégique
                      et administratif.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-[9.8px] justify-center md:justify-start">
                    <button
                      type="button"
                      className="rounded-full border-[1.5px] md:border-[1.96016px] border-[#003300] px-[60px] md:px-[87px] py-[16px] md:py-[22px] font-[Geist] font-semibold text-[#003300] hover:bg-[#003300] hover:text-[#F7FCFF] transition-colors active:scale-95 active:bg-[#003300] active:text-[#F7FCFF]"
                      style={{ fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 'clamp(16px, 2.2vw, 20px)' }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }, 150);
                      }}
                    >
                      À propos
                    </button>

                    <button
                      type="button"
                      className="rounded-full bg-[#003300] px-[20px] md:px-[26px] py-[16px] md:py-[22px] font-[Geist] font-semibold text-[#F7FCFF] hover:bg-[#002200] transition-colors active:scale-95 active:bg-[#001100]"
                      style={{ fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 'clamp(16px, 2.2vw, 20px)' }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }, 150);
                      }}
                    >
                      <span className="hidden md:inline">Planifier un entretien confidentiel</span>
                      <span className="md:hidden">Entretien</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>

            <div className="flex w-full flex-col items-center gap-10 md:gap-16">
              <section className="w-full max-w-[1533px]">
              <div className="xl:hidden">
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
                        boxShadow: '0px 4px 22.4px rgba(0, 0, 0, 0.19)',
                        backgroundColor: hoveredCardIndex === index ? '#FFFFFF' : '#003300',
                        border: '2px solid #003300',
                      }}
                      onMouseEnter={() => setHoveredCardIndex(index)}
                      onMouseLeave={() => setHoveredCardIndex(null)}
                      onTouchStart={(e) => {
                        setHoveredCardIndex(index);
                        setTimeout(() => {
                          setHoveredCardIndex(null);
                        }, 150);
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
                className="relative hidden xl:block overflow-hidden"
                style={{ width: '1533px', height: '512px' }}
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
                  }}
                >
                  {[...whyChooseStripCards, ...whyChooseStripCards].map((card, index) => (
                    <article
                      key={`${card.title}-${index}`}
                      className="flex-shrink-0 overflow-hidden rounded-[10px] text-center cursor-pointer transition-all duration-300"
                      style={{
                        width: '303px',
                        height: '100%',
                        boxShadow: '0px 4px 22.4px rgba(0, 0, 0, 0.19)',
                        marginRight: '20px',
                        backgroundColor: hoveredScrollCardIndex === index ? '#FFFFFF' : '#003300',
                        border: '2px solid #003300',
                      }}
                      onMouseEnter={() => setHoveredScrollCardIndex(index)}
                      onMouseLeave={() => setHoveredScrollCardIndex(null)}
                    >
                      <div className="flex h-full w-[303px] flex-col items-center justify-center gap-5 p-6">
                        <h3
                          className="font-[EB_Garamond] font-bold transition-colors duration-300"
                          style={{
                            width: card.titleWidth,
                            maxWidth: card.titleWidth,
                            fontSize: '32px',
                            lineHeight: '27px',
                            color: hoveredScrollCardIndex === index ? '#003300' : '#F7FCFF',
                          }}
                        >
                          {card.title}
                        </h3>

                        <p
                          className="w-[262.42px] font-[Geist] font-normal transition-colors duration-300"
                          style={{
                            fontSize: '14px',
                            lineHeight: '16px',
                            color: hoveredScrollCardIndex === index ? '#003300' : '#F7FCFF',
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
                    right: '37.81%',
                    top: '89.45%',
                    fontSize: '16px',
                    lineHeight: '18px',
                    opacity: 0.5
                  }}
                >
                  Choisir RNJ Advisory, c&apos;est bénéficier d&apos;une approche structurée, indépendante et orientée résultats. Nous combinons analyse juridique, compréhension institutionnelle et vision stratégique afin de vous aider à anticiper les risques, assurer la conformité de vos projets et prendre des décisions éclairées.
                </p>
              </div>
            </section>

            <BusinessServicesSection />
            <RegulationAnalysisSection />
            <WhyChooseGridSection />
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
                    src="/Businessfotografie & Bewerbungsfotos Berlin _ KOPF & KRAGEN 1.svg"
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
                      src="/Group 363.svg"
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
                          src="/Vector (17).svg"
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
                      src="/Group 353.svg"
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
            <section className="relative mx-auto my-8 w-full max-w-[1449px] px-4 sm:px-5 md:px-6">
              <div
                className="flex w-full flex-col items-center rounded-[36px] bg-[#003300] px-5 py-12 sm:px-8 md:px-10 md:py-16 lg:rounded-[80px] lg:px-[48px] lg:py-[75px] xl:min-h-[1312px] xl:rounded-[120px] xl:pt-[91px]"
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
                  className="relative w-full max-w-[1346px] overflow-visible xl:h-[640.52px]"
                  style={{ height: 'clamp(260px, 46vw, 640.52px)' }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-[28px] md:rounded-[40px]">
                    <Image
                      src="/world-map.svg"
                      alt="World Map"
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Interactive Tunisia marker */}
                  <div
                    className="absolute z-20"
                    style={{
                      left: '46.6%',
                      top: '36.9%',
                    }}
                  >
                    {showTunisiaPopup && (
                      <div className="absolute left-1/2 top-[calc(100%+12px)] z-30 w-[min(78vw,300px)] -translate-x-1/2 rounded-[24px] bg-[rgba(0,0,0,0.32)] p-3 backdrop-blur-md sm:w-[min(82vw,389px)] sm:rounded-[38px] sm:p-4 md:left-5 md:top-1/2 md:w-[389px] md:-translate-x-0 md:-translate-y-1/2 md:rounded-[45px] md:rounded-bl-none md:px-8 md:py-[35px]">
                        <button
                          onClick={() => setShowTunisiaPopup(false)}
                          className="absolute right-3 top-3 text-white transition hover:text-gray-300 md:right-8 md:top-8"
                        >
                          <span className="block rotate-45 font-[Geist] text-[24px] font-light leading-none sm:text-[30px] md:text-[49px]">+</span>
                        </button>
                        <div className="flex flex-col items-start gap-3 sm:gap-5 md:gap-[26px]">
                          <div className="flex flex-col items-start gap-3 sm:gap-5 md:gap-[30px]">
                            <span className="font-[Geist] text-[12px] font-medium leading-[12px] text-white sm:text-[16px] sm:leading-[16px] md:text-[21.4956px] md:leading-[22px]">
                              2026
                            </span>

                            <div className="flex items-start gap-3 sm:gap-4 md:gap-[29px]">
                              <div className="relative h-[76px] w-[36px] overflow-hidden rounded bg-[#F7FCFF] sm:h-[96px] sm:w-[46px] md:h-[150.19px] md:w-[71.6px]">
                                <Image
                                  src="/TN.svg"
                                  alt="Tunisie"
                                  fill
                                  className="object-contain"
                                />
                              </div>

                              <div className="flex flex-col items-start gap-1.5 sm:gap-2 md:w-[193px] md:gap-[9px]">
                                <div className="flex flex-col items-start gap-0.5 sm:gap-1 md:gap-[3px]">
                                  <h3 className="font-[Geist] text-[18px] font-normal leading-[1] text-white sm:text-[24px] md:text-[31.2663px] md:leading-[32px]">
                                    Tunisie
                                  </h3>
                                  <p className="font-[Geist] text-[18px] font-bold leading-[1] text-white sm:text-[24px] md:text-[31.2663px] md:leading-[32px]">
                                    45 projets
                                  </p>
                                </div>
                                <p className="font-[Geist] text-[11px] font-medium leading-[1.2] text-white/50 sm:text-[14px] md:text-[17.3096px] md:leading-[20px]">
                                  Conseil stratégique &amp; réglementaire
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="h-0 w-full border-t-2 border-white/50" />

                          <div className="flex w-full items-start gap-2 sm:gap-3 md:gap-[10px]">
                            <div className="relative mt-0.5 h-[92px] w-[6px] shrink-0 rounded-[26px] bg-white/40 sm:mt-1 sm:h-[128px] sm:w-[7px] md:h-[257px]">
                              <div className="absolute left-0 top-0 h-[30px] w-full rounded-[26px] bg-[#F7FCFF] sm:h-[44px] md:h-[59px]" />
                            </div>
                            <div className="max-h-[92px] overflow-y-auto pr-1 font-[Geist] text-[11px] font-medium leading-[1.22] text-white/90 sm:max-h-[128px] sm:text-[14px] sm:leading-[1.25] md:max-h-[273px] md:text-[19.3263px] md:leading-[21px]">
                              RNJ Advisory accompagne des institutions, investisseurs et entrepreneurs en Tunisie dans des projets à forte dimension réglementaire et stratégique. Nos interventions couvrent l’analyse institutionnelle, la structuration juridique, la conformité réglementaire ainsi que l’intégration des critères ESG, afin de sécuriser les projets et garantir leur viabilité à long terme.
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer appearance-none border-0 bg-transparent p-0 outline-none"
                      style={{
                        width: 'clamp(22px, 2vw, 30px)',
                        height: 'clamp(28px, 4vw, 42px)',
                        touchAction: 'manipulation',
                      }}
                      aria-label="Afficher les détails de la Tunisie"
                      aria-expanded={showTunisiaPopup}
                      onClick={() => setShowTunisiaPopup((prev) => !prev)}
                    />
                  </div>
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
                        À propos
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
                        <span className="hidden sm:inline">Demander une consultation</span>
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
                        Vous êtes un organisme public, une institution privée, un investisseur ou un bailleur de fonds ? RNJ Advisory vous accompagne dans l'analyse approfondie des environnements institutionnels, juridiques et réglementaires afin de sécuriser vos décisions stratégiques.
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
                        src="/light bulb 1 (1).svg"
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
                              src={expandedFaqIndex === index ? '/Group 67.svg' : '/Vector (20).svg'}
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
                    <Image src="/Vector (18).svg" alt="Question icon" fill className="object-contain" />
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
      </div>
    </main>
  );
}

