'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EB_Garamond, Geist } from 'next/font/google';
import Navbar from '@/components/Navbar';


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

const relatedCategories = [
  { label: 'Juridique', widthClass: 'w-[131px]', active: false },
  { label: 'Strategie', widthClass: 'w-[134px]', active: false },
  { label: 'Marches', widthClass: 'w-[124px]', active: false },
  { label: 'Insights', widthClass: 'w-[117px]', active: false },
  { label: 'All', widthClass: 'w-[90px]', active: true },
] as const;

const relatedCards = [
  {
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777410422/rnj/group-483-89ee6676.svg',
    year: '2026',
    title: 'Workshop BeCentral : digitalisation durable',
    description: 'Retour sur un échange autour des enjeux de la digitalisation responsable.',
  },
  {
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777410425/rnj/group-482-365877a7.svg',
    year: '2024',
    title: "Informations de base sur les garanties d'origine (GO).",
    description: "Principes et fonctionnement des garanties d'origine dans le marché de l'énergie.",
  },
  {
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777410428/rnj/group-484-04b278f7.svg',
    year: '2025',
    title: 'Accélération de la transition énergétique en Tunisie',
    description: 'Focus sur les initiatives et leviers pour accélérer la transition énergétique.',
  },
  {
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777410430/rnj/group-481-8071b8c8.svg',
    year: '2025',
    title: 'CSR en Tunisie : cadre réglementaire',
    description: "Analyse du cadre juridique et des enjeux liés à l'utilisation du CSR en Tunisie.",
  },
] as const;

export default function AnalyseInstitutionnelleClient() {
  return (
    <main className="min-h-screen bg-[#F7FCFF]">
      <Navbar />

      <section className="relative isolate w-full overflow-hidden bg-[#0E434F] min-h-[480px] sm:min-h-[560px] md:min-h-[700px] lg:h-[1048px] lg:min-h-[1048px]">
        <div
          className="absolute overflow-hidden"
          style={{ inset: 0, transform: 'scale(1.15) translateX(5%)' }}
        >
          <img
            src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132780/rnj/map-3-380cf512.svg"
            alt=""
            aria-hidden="true"
            className="h-full w-full"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="pointer-events-none relative z-10 mx-auto min-h-[480px] w-full max-w-[1544px] px-5 pb-12 pt-28 sm:min-h-[560px] sm:px-6 sm:pt-32 md:min-h-[700px] md:px-10 md:pt-36 lg:h-[1048px] lg:min-h-[1048px] lg:max-w-[1544px] lg:px-0 lg:pb-0 lg:pt-0">
          <div className="flex w-full flex-col justify-center lg:absolute lg:left-[5.69%] lg:right-[39.79%] lg:top-[21.58%] lg:max-w-[765.06px] lg:items-start lg:gap-[37.79px]">
            <div className={`${geist.className} inline-flex items-center gap-2 text-[#9CD5E6] sm:gap-3 lg:gap-[10.21px]`}>
              <span className="text-[14px] font-semibold leading-none sm:text-[16px] md:text-[20px] lg:text-[20.43px] lg:leading-[17px]">&lt;</span>
              <div className="flex flex-col items-center gap-1.5 leading-none sm:gap-2 lg:gap-[16.34px]">
                <span className="text-[9px] font-semibold uppercase text-white/30 sm:text-[10px] md:text-[12px] lg:text-[15.32px] lg:leading-[17px]">
                  Asie
                </span>
                <span className="text-[14px] font-semibold uppercase text-white sm:text-[16px] md:text-[20px] lg:text-[20.43px] lg:leading-[17px]">
                  Afrique
                </span>
                <span className="text-[9px] font-semibold uppercase text-white/30 sm:text-[10px] md:text-[12px] lg:text-[15.32px] lg:leading-[17px]">
                  Europe
                </span>
              </div>
              <span className="text-[14px] font-semibold leading-none sm:text-[16px] md:text-[20px] lg:text-[20.43px] lg:leading-[17px]">&gt;</span>
            </div>

            <h1
              className={`${ebGaramond.className} mt-4 text-[clamp(28px,7vw,98px)] font-bold leading-[0.95] tracking-[-0.04em] text-white sm:mt-6 md:mt-8 lg:mt-[37.79px] lg:w-[634.32px] lg:text-[98.06px] lg:leading-[93px]`}
            >
              Nos projet
            </h1>

            <div className="mt-4 flex flex-col items-start gap-3 sm:mt-5 sm:gap-4 md:mt-7 md:gap-[18.39px] lg:mt-[37.79px] lg:w-[765.06px] lg:max-w-none lg:gap-[33px]">
              <div className="inline-block max-w-full bg-[#DDE597] px-2 py-1 sm:px-2.5 lg:h-[30.64px] lg:w-[699.69px] lg:px-[14.3px] lg:py-[7.15px]">
                <p
                  className={`${geist.className} whitespace-normal text-[8px] font-black uppercase leading-tight tracking-[0.03em] text-[#0E434F] sm:text-[9px] sm:whitespace-nowrap md:text-[11px] lg:text-[12.96px] lg:leading-[15px]`}
                >
                  Comprendre les environnements publics pour s&eacute;curiser vos d&eacute;cisions strat&eacute;giques
                </p>
              </div>

              <p
                className={`${geist.className} max-w-full text-[11px] font-semibold leading-[1.3] text-white/50 sm:text-[12px] md:text-[14px] lg:w-[785.49px] lg:max-w-none lg:text-[16.34px] lg:leading-[17px]`}
              >
                RNJ Advisory accompagne les entreprises, institutions et investisseurs dans l&rsquo;analyse des cadres
                institutionnels et r&eacute;glementaires. Nos &eacute;tudes permettent de s&eacute;curiser les projets, d&rsquo;assurer
                leur conformit&eacute; et d&rsquo;orienter les d&eacute;cisions dans des environnements complexes.
              </p>

              <Link
                href="/contact?mode=message&subject=Analyse%20institutionnelle"
                className={`${geist.className} pointer-events-auto mt-3 inline-flex h-[44px] items-center justify-between gap-2 rounded-[105px] bg-[#839705] pl-5 pr-[3px] text-[13px] font-extrabold text-[#E7E7E7] shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition hover:brightness-105 sm:mt-4 sm:h-[52px] sm:gap-3 sm:pl-6 sm:pr-[4px] sm:text-[15px] md:mt-6 md:h-[64px] md:gap-4 md:pl-7 md:pr-[5px] md:text-[18px] lg:mt-0 lg:h-[63.47px] lg:w-[224px] lg:rounded-[89.6px] lg:pl-[41.07px] lg:pr-[4.48px] lg:text-[17.24px] lg:leading-[19px]`}
              >
                <span>Contact us</span>
                <span className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#DDE597] sm:h-[44px] sm:w-[44px] md:h-[56px] md:w-[56px] lg:h-[54.51px] lg:w-[54.51px]">
                  <span className="inline-block h-[12px] w-[12px] border-r-[2px] border-t-[2px] border-[#839705] rotate-45 translate-x-[-2px] sm:h-[14px] sm:w-[14px] sm:border-r-[2.5px] sm:border-t-[2.5px] md:h-[18px] md:w-[18px] md:border-r-[3px] md:border-t-[3px] lg:h-[19.05px] lg:w-[19.05px] lg:border-r-[2.74px] lg:border-t-[2.74px]" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contenu-associe"
        className="relative z-[60] w-full scroll-mt-28 bg-white py-10 sm:py-12 md:py-16 lg:min-h-[681px] lg:py-[86px]"
      >
        <div className="mx-auto w-full max-w-[2163px] px-5 sm:px-6 md:px-10 lg:px-[60px]">
          <div className="mx-auto flex w-full max-w-[2043px] flex-col gap-6 sm:gap-8 lg:gap-[44px]">
            <div className="flex flex-col gap-5 sm:gap-7 lg:h-[52px] lg:flex-row lg:items-center lg:justify-between lg:gap-[301px]">
              <h2 className={`${geist.className} text-[24px] font-medium leading-[1] text-black/80 sm:text-[32px] md:text-[40px]`}>
                contenu associ&eacute;
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

      {/* Team section */}
      {/* Cityscape background + CTA + Footer card — all on mask-group-2 */}
      <footer className="relative w-full overflow-hidden">
        {/* Background layers from Figma: cityscape + Rectangle 490 gradient */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 h-[1765.79px] w-[1580px] -translate-x-1/2 bottom-[-82.96px]">
            <Image
              src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132776/rnj/beautiful-architecture-building-exterior-cityscape-2026-01-05-01-06-47-utc-2-8e38423b.svg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute left-1/2 h-[1676px] w-[1513px] -translate-x-1/2 bottom-[-122px]"
            style={{
              background: 'linear-gradient(180deg, rgba(217, 217, 217, 0) 17.92%, #737373 74.61%)',
            }}
          />
        </div>

        {/* All overlaid content */}
        <div className="relative z-10 flex flex-col">
          {/* Frame 490 — CTA area (top portion) */}
          <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-6 sm:py-14 md:py-16 lg:py-20">
            <div className="flex w-full max-w-[1392px] flex-col items-center gap-10 sm:gap-16 md:gap-20 lg:gap-[118px]">
              {/* Line 13 — separator */}
              <div className="h-0 w-full border-t-2 border-black/20" />

              {/* Frame 489 — content row */}
              <div className="flex w-full max-w-[1345px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:gap-[162px]">
                {/* Group 480 — text block */}
                <div className="flex max-w-[1067px] flex-col gap-0">
                  <span className={`${geist.className} text-[20px] font-medium leading-[34px] tracking-[-0.04em] text-[#003300] sm:text-[24px] md:text-[32px]`}>
                    Conseil strat&eacute;gique
                  </span>

                  <h2
                    className={`${ebGaramond.className} mt-8 text-[32px] font-medium leading-[1.05] tracking-[-0.04em] text-[#003300] sm:mt-12 sm:text-[44px] md:mt-[80px] md:text-[60px] lg:mt-[120px] lg:text-[96px] lg:leading-[97px]`}
                  >
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
                    src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334107/rnj/frame-487-5f9f4c30.svg"
                    alt="Voir plus"
                    className="h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] lg:h-[116px] lg:w-[116px]"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Frame 348 — Footer glassmorphic card (bottom portion) */}
          <div className="w-full px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-0 lg:py-[40px]">
            <div className="mx-auto w-full max-w-[1462px]">
              <div className="w-full rounded-[16px] bg-[rgba(0,0,0,0.17)] px-4 py-8 shadow-[2px_4px_39.6px_rgba(0,0,0,0.69)] backdrop-blur-[10px] sm:rounded-[20px] sm:px-6 sm:py-10 md:rounded-[30px] md:px-9 md:py-[86px] lg:px-[35px]">
                {/* Top row: logo + columns */}
                <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
                  {/* Logo + description */}
                  <div className="flex max-w-[352px] flex-col gap-[30px]">
                    <Image
                      src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                      alt="Logo RNJ Advisory"
                      width={233}
                      height={58}
                      className="h-auto w-[180px] sm:w-[233px]"
                    />
                    <p className={`${geist.className} text-[14px] font-medium leading-[16px] text-white/50 sm:text-[16px]`}>
                      Cabinet de conseil strat&eacute;gique et r&eacute;glementaire accompagnant acteurs publics, entreprises priv&eacute;es et investisseurs dans la s&eacute;curisation de leurs projets et la ma&icirc;trise des environnements institutionnels complexes.
                    </p>
                  </div>

                  {/* Columns */}
                  <div className="grid w-full max-w-[916px] grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {/* Cabinet */}
                    <div className="flex flex-col gap-[24px] sm:gap-[32px] md:gap-[40px]">
                      <span className={`${geist.className} text-[16px] font-semibold leading-[16px] text-white sm:text-[18px] md:text-[20px]`}>Cabinet</span>
                      <div className="flex flex-col gap-[17px]">
                        {['Accueil', 'À propos', 'Notre approche', "Zones d'intervention"].map((item) => (
                          <button key={item} type="button" className="flex items-center gap-[14px] text-left transition-opacity hover:opacity-100">
                            <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-white" />
                            <span className={`${geist.className} text-[13px] font-medium leading-[16px] text-white/80 sm:text-[14px] md:text-[16px]`}>{item}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Expertise */}
                    <div className="flex flex-col gap-[24px] sm:gap-[32px] md:gap-[40px]">
                      <span className={`${geist.className} text-[16px] font-semibold leading-[16px] text-white sm:text-[18px] md:text-[20px]`}>Expertise</span>
                      <div className="flex flex-col gap-[17px]">
                        {['Conseil stratégique', 'Analyse institutionnelle', 'Conformité réglementaire', 'Transition énergétique', "Structuration d'entreprise"].map((item) => (
                          <button key={item} type="button" className="flex items-center gap-[14px] text-left transition-opacity hover:opacity-100">
                            <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-white" />
                            <span className={`${geist.className} text-[13px] font-medium leading-[16px] text-white/80 sm:text-[14px] md:text-[16px]`}>{item}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Publications */}
                    <div className="flex flex-col gap-[24px] sm:gap-[32px] md:gap-[40px]">
                      <span className={`${geist.className} text-[16px] font-semibold leading-[16px] text-white sm:text-[18px] md:text-[20px]`}>Publications</span>
                      <div className="flex flex-col gap-[17px]">
                        {['Articles', 'Analyses', 'PME & ASBL', 'Études sectorielles'].map((item) => (
                          <button key={item} type="button" className="flex items-center gap-[14px] text-left transition-opacity hover:opacity-100">
                            <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-white" />
                            <span className={`${geist.className} text-[13px] font-medium leading-[16px] text-white/80 sm:text-[14px] md:text-[16px]`}>{item}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Frame 346 — bottom row: social icons | phone + email | copyright */}
                <div className="mt-10 flex flex-col items-center gap-6 w-full sm:flex-row sm:items-center sm:justify-between sm:gap-[20px] md:gap-[60px] lg:mt-[40px] lg:gap-[215px]">
                  {/* Group 334 — social icons */}
                  <div className="flex flex-row items-center gap-[20px]">
                    {[
                      { name: 'Instagram', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334109/rnj/mask-group-23-1ce30be9.svg' },
                      { name: 'LinkedIn', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334110/rnj/mask-group-24-fd4f223e.svg' },
                      { name: 'Telegram', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334111/rnj/mask-group-25-516d2f88.svg' },
                      { name: 'Twitter', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334113/rnj/mask-group-26-a7a619cb.svg' },
                      { name: 'Facebook', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334115/rnj/mask-group-27-5870749d.svg' },
                    ].map((social) => (
                      <div key={social.name} className="relative h-[29.2px] w-[29.2px] overflow-hidden rounded-full">
                        <Image src={social.src} alt={social.name} fill className="object-contain" />
                      </div>
                    ))}
                  </div>

                  {/* Frame 345 — contact + copyright row */}
                  <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-[20px] md:gap-[78px] lg:gap-[142px] w-full">
                    {/* Frame 336 — phone + email */}
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-[20px] md:gap-[78px]">
                      {/* Frame 201 — phone */}
                      <div className="flex flex-row items-center gap-[20px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310359/rnj/layer-1-27-a0d86191.svg" alt="" className="h-[22px] w-[21.92px] shrink-0" />
                        <span className={`${geist.className} text-[13px] font-medium leading-[21px] tracking-[0.05em] text-white sm:text-[15.37px] whitespace-nowrap`}>
                          +32 474 03 22 66
                        </span>
                      </div>
                      {/* Frame 202 — email */}
                      <div className="flex flex-row items-center gap-[20px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310361/rnj/layer-1-26-33e2a54e.svg" alt="" className="h-[15.47px] w-[22px] shrink-0" />
                        <span className={`${geist.className} text-[13px] font-medium leading-[21px] tracking-[0.05em] text-white sm:text-[15.37px]`}>
                          info@rnj-advisory.be
                        </span>
                      </div>
                    </div>
                    {/* Copyright */}
                    <span className={`${geist.className} text-[12px] font-medium leading-[21px] text-white/50 sm:text-[15.37px] whitespace-nowrap`}>
                      &copy; 2026 RNJ Advisory. Tous droits r&eacute;serv&eacute;s.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
