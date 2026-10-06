'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Geist } from 'next/font/google';
import Navbar from '@/components/Navbar';
import LandingFooter from '@/components/LandingFooter';
import RelatedContent from '@/components/RelatedContent';

const geist = Geist({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });

/* Figma canvas: 1512 wide */
const W = 1512;
const HERO_H = 1004;
const CONSEIL_H = 819;
const SERVICES_H = 1551;
const RESULTS_H = 795;
const CARDS_H = 963;

const HERO_IMG = '/optimized/business-meeting-with-professionals-in-dark-room-2026-03-25-04-38-25-utc%201.webp';
const OFFICE_IMG = '/optimized/adults-sitting-at-a-table-in-a-office-2026-03-25-04-09-47-utc%201.webp';
const CARD_IMG = '/optimized/corporate-office-managers-having-job-interview-wit-2026-06-16-02-43-36-utc%201.webp';
const BUILDING_IMG = '/optimized/abstract-modern-building-against-the-blue-sky-in-s-2026-03-18-06-44-39-utc%201.webp';
const PYLON_IMG = '/optimized/pylon-power-electricity-tower-crossing-river-water-2026-03-26-03-29-42-utc%201.webp';

const STATS = [
  { value: '30+', label: "Années d'expertise" },
  { value: '150+', label: 'Missions réalisées' },
  { value: '30+', label: 'Institutions' },
];

// One pre-composited photo per row, matched to the Figma layer names
// (a-woman-and-two-men-sitting-in-armchairs / scales-of-justice /
// close-up-of-coworkers-shaking-hands / business-professionals-meeting).
// Each export already carries the 3.25deg tilt, the 18px rounded corners and
// the drop shadow, sitting inside a transparent margin — so none of those are
// re-applied in CSS below, or they would double up.
const EXPERTISES = [
  { title: 'Droit des affaires', desc: 'Sécuriser les décisions stratégiques de votre entreprise.', img: '/optimized/Group%20349379.png' },
  { title: 'Conformité réglementaire', desc: 'Anticiper les évolutions réglementaires et limiter les risques.', img: '/optimized/Group%20349379%20(1).png' },
  { title: 'Contrats & Négociation', desc: 'Structurer des relations contractuelles solides.', img: '/optimized/Group%20349379%20(3).png' },
  { title: 'Gouvernance & Institutions', desc: 'Accompagner les acteurs publics et privés.', img: '/optimized/Group%20349379%20(4).png' },
];

const FAQ_ITEMS = [
  {
    question: 'Quelle est la différence entre une consultation et une étude juridique ?',
    answer:
      "Une consultation répond à une question précise en quelques échanges. Une étude juridique est un document écrit, opposable, que vous pouvez produire devant un conseil d'administration, un financeur, un assureur ou une administration — réservée aux points de droit dont la réponse n'est pas évidente.",
  },
  {
    question: 'En quoi consiste une revue contractuelle ?',
    answer:
      "Nous relisons vos contrats avant qu'ils ne vous engagent, en nous concentrant sur les clauses qui décident de l'issue d'un différend : limitation de responsabilité, résiliation, propriété intellectuelle, droit applicable et juridiction compétente. Vous recevez un document annoté et une hiérarchisation des points à négocier.",
  },
  {
    question: 'Accompagnez-vous la mise en conformité RGPD et ESG ?',
    answer:
      "Oui. Nous intervenons sur la conformité réglementaire au sens large — RGPD, ESG, CSRD — en identifiant les obligations qui s'appliquent réellement à votre activité et en les traduisant en plan d'action concret, avec ses échéances.",
  },
  {
    question: 'Intervenez-vous sur les partenariats public-privé ?',
    answer:
      "Oui, nous accompagnons entreprises, collectivités et institutions sur le montage juridique des projets PPP et concessions, la répartition des risques entre partenaires et la sécurisation des documents contractuels.",
  },
  {
    question: 'Dans quels pays intervenez-vous ?',
    answer:
      'Basés Avenue Louise à Bruxelles, nous accompagnons des clients en Belgique, en Europe, en Tunisie et en Afrique.',
  },
];

/* Chunky north-east arrow from Figma (Rectangle 839 + Line 11) */
function ArrowIcon({ color, size = 38 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 38" fill="none" aria-hidden>
      <rect x="10.5" y="3.5" width="24" height="24" stroke={color} strokeWidth="7" rx="2.5" />
      <line x1="3" y1="35" x2="30" y2="8" stroke={color} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="22" height="11" viewBox="0 0 22 11" fill="none" style={{ opacity: 0.5, flexShrink: 0 }}>
      <path d="M1.5 1.5 11 9.5l9.5-8" stroke="#003300" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ConseilJuridiqueClient() {
  const [scale, setScale] = useState(1);
  const [openIndex, setOpenIndex] = useState(0); // Droit des affaires open by default
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  // Le Figma (Frame 349366) donne deux variantes du paragraphe : Default,
  // texte a top -2.4 avec fondu en bas, et Variant2, texte a top -154.5 avec
  // fondu en haut. C'est un defilement lent du texte dans sa fenetre.
  const [conseilScrolled, setConseilScrolled] = useState(false);

  useEffect(() => {
    const onResize = () => setScale(window.innerWidth / W);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setConseilScrolled((v) => !v), 5000);
    return () => clearInterval(id);
  }, []);

  /* Accordeon mobile des expertises : le panneau ouvert fait ~380px (titre +
     texte + photo de 210px) contre ~90px replie. Ouvrir un element deplace
     donc de ~300px tout ce qui le suit, et celui qu'on vient d'ouvrir sort de
     l'ecran -- on tape un titre et on ne voit pas ce qui s'ouvre. On ramene
     donc l'element ouvert dans le champ.
     Le drapeau evite de scroller au chargement (openIndex vaut 0 des le
     depart), et le test de largeur evite de declencher ca sur la version
     desktop, qui partage le meme openIndex et bascule a 1024px. */
  const expertiseItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expertiseOpenedByUser = useRef(false);

  useEffect(() => {
    if (!expertiseOpenedByUser.current) return;
    if (window.matchMedia('(min-width: 1024px)').matches) return;
    expertiseItemRefs.current[openIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [openIndex]);

  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>

      {/* ── NAVBAR — floats above everything ── */}
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Navbar glass />
      </div>

      {/* ── DESKTOP HERO (≥ 768 px) — Figma frame 1512×1004 ─────────────── */}
      <section
        className="hidden md:block"
        style={{ position: 'relative', overflow: 'hidden', height: `${HERO_H * scale}px`, background: '#1E1E1E' }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: `${HERO_H}px`,
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          {/* Background photo + left darkening so the text stays readable */}
          <Image
            src={HERO_IMG}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            unoptimized
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0.15) 75%, rgba(0,0,0,0.05) 100%)',
            }}
          />

          {/* Frame 349362 — content */}
          <div
            style={{
              position: 'absolute',
              left: '108.17px',
              top: '313.42px',
              width: '749.3px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '36px',
            }}
          >
            <h1
              style={{
                fontWeight: 400,
                fontSize: '64px',
                lineHeight: '95%',
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                width: '749.3px',
                margin: 0,
              }}
            >
              Sécurisez vos décisions. Accélérez vos projets.
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '53px', width: '507.87px' }}>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: '15px',
                  lineHeight: '117%',
                  letterSpacing: '0.02em',
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                RNJ Advisory accompagne les entreprises, les institutions et les organisations dans leurs enjeux
                juridiques, réglementaires et stratégiques avec une approche fondée sur l&apos;expertise et la confiance.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link
                  href="/contact"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '225.4px', height: '60.59px',
                    background: '#F5FAC7', borderRadius: '44px',
                    fontWeight: 500, fontSize: '15px',
                    color: '#003300', textDecoration: 'none', whiteSpace: 'nowrap',
                  }}
                >
                  Comment peut-on vous aider ?
                </Link>
                <Link
                  href="/contact"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '193.43px', height: '60.59px',
                    background: '#BBCB2E', borderRadius: '44px',
                    fontWeight: 500, fontSize: '15px',
                    color: '#003300', textDecoration: 'none', whiteSpace: 'nowrap',
                  }}
                >
                  Consulter un expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE HERO (< 768 px) ──────────────────────────────────────── */}
      <section className="relative block overflow-hidden md:hidden" style={{ background: '#1E1E1E' }}>
        <Image src={HERO_IMG} alt="" fill style={{ objectFit: 'cover' }} priority unoptimized />
        <div aria-hidden className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)' }} />
        <div className="relative z-10 px-6" style={{ paddingTop: '130px', paddingBottom: '64px' }}>
          <Image
            src="/optimized/minimal horizontal logo white 1.png"
            alt="RNJ Advisory"
            width={160}
            height={40}
            style={{ width: '160px', height: 'auto', marginBottom: '28px' }}
            unoptimized
          />
          <h1 className="mb-5 text-white" style={{ fontSize: '38px', lineHeight: '1.02em', letterSpacing: '-0.02em', fontWeight: 400 }}>
            Sécurisez vos décisions. Accélérez vos projets.
          </h1>
          <p className="mb-8 text-[15px] leading-relaxed text-white/90">
            RNJ Advisory accompagne les entreprises, les institutions et les organisations dans leurs enjeux
            juridiques, réglementaires et stratégiques avec une approche fondée sur l&apos;expertise et la confiance.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/contact" className="flex items-center justify-center rounded-full py-4 font-medium"
              style={{ background: '#F5FAC7', color: '#003300', fontSize: '15px' }}>
              Comment peut-on vous aider ?
            </Link>
            <Link href="/contact" className="flex items-center justify-center rounded-full py-4 font-medium"
              style={{ background: '#BBCB2E', color: '#003300', fontSize: '15px' }}>
              Consulter un expert
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONSEIL JURIDIQUE — desktop (Frame 349366, page-top 1160 → 156) ── */}
      <section
        className="hidden md:block"
        style={{ position: 'relative', background: '#F7FCFF', overflow: 'hidden', height: `${CONSEIL_H * scale}px` }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: `${CONSEIL_H}px`,
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          <div style={{ position: 'absolute', left: '109px', top: '156px', display: 'flex', alignItems: 'flex-end', gap: '122px' }}>
            {/* Left column: badge + photo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '84px', width: '532px' }}>
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: '227.46px', height: '43.48px',
                  border: '2px solid #003300', borderRadius: '27px',
                  fontWeight: 500, fontSize: '19.332px', letterSpacing: '-0.02em',
                  color: '#003300', whiteSpace: 'nowrap',
                }}
              >
                CONSEIL JURIDIQUE
              </span>
              <div style={{ position: 'relative', width: '532px', height: '323.71px', borderRadius: '10px', overflow: 'hidden' }}>
                <Image src={OFFICE_IMG} alt="Réunion de conseil juridique" fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
            </div>

            {/* Right column: big statement + stats */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '645px', height: '451px' }}>
              {/* Group 349372 / Mask group — fenetre de 645x336.29 dans
                  laquelle le paragraphe (669.7x430) defile : top -2.4 en
                  Default, -154.5 en Variant2, soit 152.1px de course.
                  Les deux fondus du Figma sont rendus par deux calques de
                  degrade dont on anime l'OPACITE, et non par un mask-image
                  anime : une transition entre deux gradients de mask n'est
                  pas interpolee par les navigateurs, elle sauterait d'un
                  etat a l'autre. Le fond de la section etant un aplat
                  (#F7FCFF), un calque de degrade donne exactement le meme
                  rendu qu'un masque. */}
              <div style={{ position: 'relative', width: '645px', height: '336.29px', overflow: 'hidden' }}>
                <p
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: `${conseilScrolled ? -154.5 : -2.4}px`,
                    fontWeight: 400,
                    fontSize: '40px',
                    lineHeight: '108%',
                    letterSpacing: '-0.02em',
                    color: '#1E1E1E',
                    width: '669.7px',
                    margin: 0,
                    transition: 'top 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  Nous accompagnons les entreprises, les institutions et les organisations dans leurs enjeux juridiques,
                  réglementaires et stratégiques. De l&apos;analyse des risques à la mise en conformité, nous apportons des
                  solutions sur mesure qui sécurisent vos projets, facilitent vos décisions et soutiennent votre
                  développement à long terme.
                </p>
                {/* Fondu bas (Default) : opaque de 38.24% a 88.87% */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'linear-gradient(180deg, rgba(247,252,255,0) 38.24%, #F7FCFF 88.87%)',
                    opacity: conseilScrolled ? 0 : 1,
                    transition: 'opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
                {/* Fondu haut (Variant2) : opaque jusqu'a 5.68%, nul a 78.93% */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'linear-gradient(180deg, #F7FCFF 5.68%, rgba(247,252,255,0) 78.93%)',
                    opacity: conseilScrolled ? 1 : 0,
                    transition: 'opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '31px', height: '115.08px' }}>
                {STATS.map((s) => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '31px' }}>
                    <span aria-hidden style={{ width: '1px', height: '109.54px', background: '#1E1E1E' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 400, fontSize: '83.8139px', lineHeight: '108%', letterSpacing: '-0.02em', color: '#000000', whiteSpace: 'nowrap' }}>
                        {s.value}
                      </span>
                      <span style={{ fontWeight: 300, fontSize: '18.4206px', lineHeight: '108%', letterSpacing: '-0.02em', color: '#000000', opacity: 0.5, whiteSpace: 'nowrap' }}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                ))}
                <span aria-hidden style={{ width: '1px', height: '109.54px', background: '#1E1E1E' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONSEIL JURIDIQUE — mobile ──────────────────────────────────── */}
      <section className="block bg-[#F7FCFF] px-6 py-14 md:hidden">
        <span
          className="mb-8 inline-flex items-center justify-center rounded-full px-6 py-2.5"
          style={{ border: '2px solid #003300', fontWeight: 500, fontSize: '16px', letterSpacing: '-0.02em', color: '#003300' }}
        >
          CONSEIL JURIDIQUE
        </span>
        <p className="mb-8" style={{ fontSize: '24px', lineHeight: '1.15em', letterSpacing: '-0.02em', color: '#1E1E1E' }}>
          Nous accompagnons les entreprises, les institutions et les organisations dans leurs enjeux juridiques,
          réglementaires et stratégiques. De l&apos;analyse des risques à la mise en conformité, nous apportons des
          solutions sur mesure qui sécurisent vos projets, facilitent vos décisions et soutiennent votre développement
          à long terme.
        </p>
        <div className="relative mb-10 overflow-hidden rounded-[10px]" style={{ height: '220px' }}>
          <Image src={OFFICE_IMG} alt="Réunion de conseil juridique" fill style={{ objectFit: 'cover' }} unoptimized />
        </div>
        <div className="flex items-start justify-between gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col" style={{ borderLeft: '1px solid #1E1E1E', paddingLeft: '12px' }}>
              <span style={{ fontWeight: 400, fontSize: '34px', lineHeight: '108%', letterSpacing: '-0.02em', color: '#000' }}>{s.value}</span>
              <span style={{ fontWeight: 300, fontSize: '13px', color: '#000', opacity: 0.5 }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── DES EXPERTISES — desktop (Rectangle 836: #DDE597, page 1823 → 0) ── */}
      <section
        className="hidden lg:block"
        style={{ position: 'relative', background: '#DDE597', overflow: 'hidden', height: `${SERVICES_H * scale}px` }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: `${SERVICES_H}px`,
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          {/* Header */}
          <span
            style={{
              position: 'absolute', left: '50%', top: '86px', transform: 'translateX(-50%)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '127.52px', height: '43.48px',
              border: '2px solid #003300', borderRadius: '27px',
              fontWeight: 500, fontSize: '19.332px', letterSpacing: '-0.02em', color: '#003300',
            }}
          >
            Services
          </span>
          <h2
            style={{
              position: 'absolute', left: '50%', top: '195px', transform: 'translateX(-50%)',
              width: '864.98px', margin: 0,
              fontWeight: 500, fontSize: '64px', lineHeight: '112%',
              textAlign: 'center', letterSpacing: '-0.02em', color: '#003300',
            }}
          >
            Des expertises au service de vos ambitions
          </h2>
          <p
            style={{
              position: 'absolute', left: '50%', top: '393px', transform: 'translateX(-50%)',
              width: '888.2px', margin: 0,
              fontWeight: 500, fontSize: '13px', lineHeight: '131%',
              textAlign: 'center', letterSpacing: '0.02em', color: '#003300', opacity: 0.8,
            }}
          >
            Chaque projet présente des enjeux uniques. Nos domaines d&apos;expertise vous apportent un accompagnement
            juridique, réglementaire et stratégique adapté à vos besoins, pour sécuriser vos décisions et favoriser une
            croissance durable.
          </p>

          {/* Figma animates the photo between two states as a row opens: in the
              closed variant it sits at opacity 0, rotated -13.01deg and scaled
              right down (its 46x28 box against the open 475x293 one, ~0.1), and
              in the open variant it lands at full size, opacity 1, rotate
              3.25deg. Only transform/opacity are animated — the drop-shadow is
              left static since animating a filter costs a repaint per frame and
              the difference is imperceptible over half a second. */}
          <style>{`
            /* The artwork already carries Figma's final 3.25deg tilt, so these
               angles are relative to it: -16.26deg lands the card at the
               closed variant's -13.01deg, and 0deg leaves it at 3.25deg. */
            @keyframes expertisePhotoIn {
              from { opacity: 0; transform: rotate(-16.26deg) scale(0.1); }
              to   { opacity: 1; transform: rotate(0deg) scale(1); }
            }
            @keyframes expertisePhotoInMobile {
              from { opacity: 0; transform: scale(0.94); }
              to   { opacity: 1; transform: scale(1); }
            }
            @media (prefers-reduced-motion: reduce) {
              @keyframes expertisePhotoIn { from { opacity: 1; } to { opacity: 1; } }
              @keyframes expertisePhotoInMobile { from { opacity: 1; } to { opacity: 1; } }
            }
          `}</style>

          {/* Expertise accordion */}
          <div style={{ position: 'absolute', left: '88.28px', top: '559px', width: '1335.43px', display: 'flex', flexDirection: 'column' }}>
            {EXPERTISES.map((e, i) =>
              openIndex === i ? (
                /* Expanded dark card (Group 349374) */
                <div key={e.title} style={{ position: 'relative', margin: '49px 0', width: '1335.43px', height: '178.85px' }}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    style={{
                      position: 'absolute', inset: 0,
                      background: '#003300', borderRadius: '35px', border: 'none',
                      cursor: 'default', textAlign: 'left', padding: 0,
                    }}
                  >
                    <span style={{ position: 'absolute', left: '51px', top: '47px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <span className={geist.className} style={{ fontWeight: 500, fontSize: '36px', lineHeight: '131%', letterSpacing: '0.02em', color: '#DDE597', whiteSpace: 'nowrap' }}>
                        {e.title}
                      </span>
                      <span className={geist.className} style={{ fontWeight: 500, fontSize: '20px', lineHeight: '131%', letterSpacing: '0.02em', color: '#DDE597', opacity: 0.7, whiteSpace: 'nowrap' }}>
                        {e.desc}
                      </span>
                    </span>
                    <span style={{ position: 'absolute', left: '1246px', top: '70px' }}>
                      <ArrowIcon color="#DDE597" />
                    </span>
                  </button>
                  {/* Tilted photo card (Group 349379). Box is sized so the
                      card baked into the export lands at Figma's 475x293: it
                      fills 487/634 of the artwork's width, the rest being the
                      transparent shadow margin. Positioned to keep that card's
                      centre where the old CSS-rotated box put it. */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: '637px',
                      top: '-152px',
                      width: '639px',
                      height: '466px',
                      pointerEvents: 'none',
                      transformOrigin: 'center',
                      animation: 'expertisePhotoIn 520ms cubic-bezier(0.22, 1, 0.36, 1) both',
                    }}
                  >
                    <Image src={e.img} alt="" fill style={{ objectFit: 'contain' }} unoptimized />
                  </div>
                </div>
              ) : (
                /* Closed row (Group 349373) */
                <button
                  key={e.title}
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  style={{
                    position: 'relative',
                    width: '1315px',
                    margin: '0 0 0 20.53px',
                    padding: '24px 0 49px 0',
                    background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                    borderBottom: '2px solid rgba(0,51,0,0.5)',
                  }}
                >
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <span className={geist.className} style={{ fontWeight: 500, fontSize: '36px', lineHeight: '131%', letterSpacing: '0.02em', color: '#003300' }}>
                      {e.title}
                    </span>
                    <span className={geist.className} style={{ fontWeight: 500, fontSize: '20px', lineHeight: '131%', letterSpacing: '0.02em', color: '#003300', opacity: 0.7 }}>
                      {e.desc}
                    </span>
                  </span>
                  <span style={{ position: 'absolute', right: '18px', top: '36px' }}>
                    <ArrowIcon color="#003300" />
                  </span>
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── DES EXPERTISES — mobile ─────────────────────────────────────── */}
      <section className="block px-6 py-16 lg:hidden" style={{ background: '#DDE597' }}>
        <div className="mb-8 flex justify-center">
          <span
            className="inline-flex items-center justify-center rounded-full px-6 py-2.5"
            style={{ border: '2px solid #003300', fontWeight: 500, fontSize: '16px', color: '#003300' }}
          >
            Services
          </span>
        </div>
        <h2 className="mb-4 text-center" style={{ fontWeight: 500, fontSize: '34px', lineHeight: '112%', letterSpacing: '-0.02em', color: '#003300' }}>
          Des expertises au service de vos ambitions
        </h2>
        <p className="mb-10 text-center" style={{ fontWeight: 500, fontSize: '13px', lineHeight: '131%', letterSpacing: '0.02em', color: '#003300', opacity: 0.8 }}>
          Chaque projet présente des enjeux uniques. Nos domaines d&apos;expertise vous apportent un accompagnement
          juridique, réglementaire et stratégique adapté à vos besoins, pour sécuriser vos décisions et favoriser une
          croissance durable.
        </p>
        <div className="flex flex-col gap-6">
          {/* Chaque element est enveloppe dans un div stable : le noeud interne
              change (bouton replie <-> carte ouverte), une ref posee dessus
              serait perdue au moment ou on en a besoin pour scroller. */}
          {EXPERTISES.map((e, i) => (
            <div key={e.title} ref={(node) => { expertiseItemRefs.current[i] = node; }}>
            {openIndex === i ? (
              <div className="rounded-[24px] px-6 py-7" style={{ background: '#003300' }}>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <span style={{ fontWeight: 500, fontSize: '22px', lineHeight: '131%', color: '#DDE597' }}>{e.title}</span>
                  <ArrowIcon color="#DDE597" size={24} />
                </div>
                <p style={{ fontWeight: 500, fontSize: '15px', lineHeight: '131%', color: '#DDE597', opacity: 0.7, margin: 0 }}>
                  {e.desc}
                </p>
                {/* contain, and no rounding/clipping: the corners and shadow
                    are part of the export, and cover would crop into them. */}
                <div
                  className="relative mt-4"
                  style={{ height: '210px', animation: 'expertisePhotoInMobile 420ms cubic-bezier(0.22, 1, 0.36, 1) both' }}
                >
                  <Image src={e.img} alt="" fill style={{ objectFit: 'contain' }} unoptimized />
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => { expertiseOpenedByUser.current = true; setOpenIndex(i); }}
                className="flex w-full items-start justify-between gap-4 pb-6 text-left"
                style={{ background: 'none', border: 'none', borderBottom: '2px solid rgba(0,51,0,0.5)', cursor: 'pointer', padding: 0, paddingBottom: '24px' }}
              >
                <span className="flex flex-col gap-2">
                  <span style={{ fontWeight: 500, fontSize: '22px', lineHeight: '131%', color: '#003300' }}>{e.title}</span>
                  <span style={{ fontWeight: 500, fontSize: '15px', lineHeight: '131%', color: '#003300', opacity: 0.7 }}>{e.desc}</span>
                </span>
                <ArrowIcon color="#003300" size={24} />
              </button>
            )}
            </div>
          ))}
        </div>
      </section>

      {/* ── DES RÉSULTATS — desktop (Group 349382, page 3374 → 0) ───────── */}
      <section
        className="hidden md:block"
        style={{ position: 'relative', background: '#1E1E1E', overflow: 'hidden', height: `${RESULTS_H * scale}px` }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: `${RESULTS_H}px`,
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          <Image src={CARD_IMG} alt="" fill style={{ objectFit: 'cover' }} unoptimized />
          {/* Layer 1 — bottom darkening so the caption stays readable */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.72) 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '79.3px',
              top: '616.68px',
              width: '734.72px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <h2 style={{ fontWeight: 500, fontSize: '48px', lineHeight: '131%', letterSpacing: '-0.06em', color: '#FFFFFF', margin: 0 }}>
              Des résultats portés par l&apos;expertise.
            </h2>
            <p style={{ fontWeight: 500, fontSize: '24px', lineHeight: '104%', letterSpacing: '-0.06em', color: '#FFFFFF', opacity: 0.53, margin: 0 }}>
              Découvrez comment RNJ Advisory accompagne les entreprises et les institutions dans leurs projets à fort
              impact.
            </p>
          </div>
        </div>
      </section>

      {/* ── DES RÉSULTATS — mobile ──────────────────────────────────────── */}
      <section className="relative block overflow-hidden md:hidden" style={{ background: '#1E1E1E', height: '420px' }}>
        <Image src={CARD_IMG} alt="" fill style={{ objectFit: 'cover' }} unoptimized />
        <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,0.75) 100%)' }} />
        <div className="absolute bottom-8 left-6 right-6 z-10">
          <h2 className="mb-2 text-white" style={{ fontWeight: 500, fontSize: '28px', lineHeight: '120%', letterSpacing: '-0.04em' }}>
            Des résultats portés par l&apos;expertise.
          </h2>
          <p className="text-white" style={{ fontWeight: 500, fontSize: '16px', lineHeight: '110%', letterSpacing: '-0.04em', opacity: 0.53 }}>
            Découvrez comment RNJ Advisory accompagne les entreprises et les institutions dans leurs projets à fort
            impact.
          </p>
        </div>
      </section>

      {/* ── THINK. BEYOND. — desktop (Frame 349373, page 4169 → 0) ──────── */}
      <section
        className="hidden md:block"
        style={{ position: 'relative', background: '#1E1E1E', overflow: 'hidden', height: `${CARDS_H * scale}px` }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: `${CARDS_H}px`,
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          {/* Card 1 — building photo (mirrored) + quote (Group 349384) */}
          <div style={{ position: 'absolute', left: '109px', top: '224.39px', width: '423px', height: '457.22px', overflow: 'hidden', background: '#D9D9D9' }}>
            <Image src={BUILDING_IMG} alt="" fill style={{ objectFit: 'cover', transform: 'scaleX(-1)' }} unoptimized />
            <p
              style={{
                position: 'absolute', left: '42.77px', top: '181.11px', width: '307.98px',
                fontWeight: 500, fontSize: '24px', lineHeight: '105.97%', color: '#FFFFFF', margin: 0,
              }}
            >
              Chaque décision juridique est une opportunité de construire avec confiance.
            </p>
            <span
              style={{
                position: 'absolute', left: '42.77px', top: '380.34px',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '127.68px', height: '36.03px',
                background: 'rgba(30, 30, 30, 0.5)', borderRadius: '70px',
                fontWeight: 500, fontSize: '16px', color: 'rgba(255,255,255,0.7)',
              }}
            >
              intéressée
            </span>
          </div>

          {/* Card 2 — white "Penser. Au-delà." tagline (Group 349385) */}
          <div style={{ position: 'absolute', left: '544.56px', top: '224.39px', width: '423px', height: '457.22px', background: '#FFFFFF' }}>
            <span style={{ position: 'absolute', left: '36.87px', top: '36.19px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Image
                src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672853/rnj/layer-4-955dc651.png"
                alt=""
                width={22}
                height={24}
                style={{ width: '22px', height: 'auto' }}
                unoptimized
              />
              <Image
                src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672854/rnj/group-73892e5a.png"
                alt="RNJ Advisory"
                width={84}
                height={22}
                style={{ width: '84px', height: 'auto' }}
                unoptimized
              />
            </span>
            <div style={{ position: 'absolute', left: '36.5px', top: '184.79px', width: '350px', textAlign: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '38px', lineHeight: '105.97%', color: '#003300' }}>Penser. Au-delà.</span>
            </div>
            <span
              style={{
                position: 'absolute', left: '36.5px', top: '231.43px', width: '350px',
                fontWeight: 600, fontSize: '38.4393px', lineHeight: '105.97%', textAlign: 'center', color: '#003300',
              }}
            >
              Des solutions qui durent.
            </span>
            <p
              style={{
                position: 'absolute', left: '36.44px', top: '362.37px', width: '342.56px',
                fontWeight: 400, fontSize: '15px', lineHeight: '119%', color: '#003300', margin: 0,
              }}
            >
              Une expertise juridique et stratégique au service des projets qui façonnent les territoires, les
              entreprises et les institutions.
            </p>
          </div>

          {/* Card 3 — pylon photo (Group 349386) */}
          <div style={{ position: 'absolute', left: '980.12px', top: '224.39px', width: '423px', height: '457.22px', overflow: 'hidden', background: '#D9D9D9' }}>
            <Image src={PYLON_IMG} alt="" fill style={{ objectFit: 'cover' }} unoptimized />
            <span
              style={{
                position: 'absolute', left: '50%', top: '214.11px', transform: 'translateX(-50%)', width: '267px',
                fontWeight: 700, fontSize: '24px', lineHeight: '119%', textAlign: 'center', letterSpacing: '-0.03em',
                color: '#1E1E1E',
              }}
            >
              Décider avec confiance.
            </span>
            <span
              style={{
                position: 'absolute', left: '50%', top: '380.37px', transform: 'translateX(-50%)', width: '342.56px',
                fontWeight: 400, fontSize: '15px', lineHeight: '119%', textAlign: 'center', color: '#1E1E1E',
              }}
            >
              Là où la réglementation devient un moteur de développement durable.
            </span>
          </div>

          {/* CTA — Consulter un expert (Group 349383) */}
          <Link
            href="/contact"
            style={{
              position: 'absolute', left: '50%', top: '748.89px', transform: 'translateX(-50%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '252.03px', height: '72px',
              background: '#BBCB2E', borderRadius: '57.3292px',
              fontWeight: 500, fontSize: '19.544px', color: '#003300',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}
          >
            Consulter un expert
          </Link>
        </div>
      </section>

      {/* ── THINK. BEYOND. — mobile ─────────────────────────────────────── */}
      <section className="block px-6 py-14 md:hidden" style={{ background: '#1E1E1E' }}>
        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden" style={{ height: '360px' }}>
            <Image src={BUILDING_IMG} alt="" fill style={{ objectFit: 'cover', transform: 'scaleX(-1)' }} unoptimized />
            <p className="absolute left-6 top-1/3 text-white" style={{ width: '260px', fontWeight: 500, fontSize: '20px', lineHeight: '106%', margin: 0 }}>
              Chaque décision juridique est une opportunité de construire avec confiance.
            </p>
            <span
              className="absolute left-6 bottom-6 inline-flex items-center justify-center rounded-full px-6 py-2"
              style={{ background: 'rgba(30, 30, 30, 0.5)', fontWeight: 500, fontSize: '15px', color: 'rgba(255,255,255,0.7)' }}
            >
              intéressée
            </span>
          </div>

          <div className="relative bg-white p-7" style={{ height: '360px' }}>
            <span className="flex items-center gap-1.5">
              <Image
                src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672853/rnj/layer-4-955dc651.png"
                alt="" width={20} height={22} style={{ width: '20px', height: 'auto' }} unoptimized />
              <Image
                src="https://res.cloudinary.com/dvyyce3ki/image/upload/v1779672854/rnj/group-73892e5a.png"
                alt="RNJ Advisory" width={78} height={20} style={{ width: '78px', height: 'auto' }} unoptimized />
            </span>
            <div className="absolute left-7 right-7" style={{ top: '38%' }}>
              <div className="flex justify-between">
                <span style={{ fontWeight: 600, fontSize: '30px', color: '#003300' }}>Penser.</span>
                <span style={{ fontWeight: 600, fontSize: '30px', color: '#003300' }}>Au-delà.</span>
              </div>
              <div className="text-right" style={{ fontWeight: 600, fontSize: '30px', lineHeight: '106%', color: '#003300' }}>
                Des solutions qui durent.
              </div>
            </div>
            <p className="absolute bottom-7 left-7 right-7" style={{ fontWeight: 400, fontSize: '14px', lineHeight: '119%', color: '#003300', margin: 0 }}>
              Une expertise juridique et stratégique au service des projets qui façonnent les territoires, les
              entreprises et les institutions.
            </p>
          </div>

          <div className="relative overflow-hidden" style={{ height: '360px' }}>
            <Image src={PYLON_IMG} alt="" fill style={{ objectFit: 'cover' }} unoptimized />
            <span className="absolute left-1/2 -translate-x-1/2 text-center" style={{ top: '42%', width: '240px', fontWeight: 700, fontSize: '20px', lineHeight: '119%', letterSpacing: '-0.03em', color: '#1E1E1E' }}>
              Décider avec confiance.
            </span>
            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center" style={{ width: '280px', fontWeight: 400, fontSize: '14px', lineHeight: '119%', color: '#1E1E1E' }}>
              Là où la réglementation devient un moteur de développement durable.
            </span>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className="flex items-center justify-center rounded-full px-10 py-5"
            style={{ background: '#BBCB2E', fontWeight: 500, fontSize: '17px', color: '#003300', textDecoration: 'none' }}
          >
            Consulter un expert
          </Link>
        </div>
      </section>

      <RelatedContent />

      {/* ══════════════════════════════════════════════════════════════════
          FAQ
          ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F7FCFF] px-4 pb-16 sm:px-6 md:pb-20 lg:pb-24" style={{ paddingTop: `${170 * scale}px` }}>
        <div
          className="mx-auto flex w-full max-w-[1146px] flex-col items-center bg-white px-5 py-10 sm:px-9 sm:py-14 md:py-16"
          style={{ borderRadius: '25px', boxShadow: '2px 4px 34px rgba(0,0,0,0.12)' }}
        >
          <div className="mb-10 flex w-full max-w-[725px] flex-col items-center gap-6 text-center md:mb-16">
            <h2 className={geist.className} style={{ fontWeight: 600, fontSize: 'clamp(28px, 4vw, 40px)', color: '#003300', margin: 0 }}>
              Questions fréquentes
            </h2>
            <p style={{ fontWeight: 400, fontSize: '16px', lineHeight: '158%', color: '#003300' }}>
              Retrouvez ici les réponses aux interrogations les plus courantes concernant notre accompagnement
              juridique et réglementaire.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2.5">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={item.question} style={{ background: 'rgba(187, 203, 46, 0.5)', borderRadius: '22px', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="flex w-full flex-col items-center justify-center gap-2.5 px-6 py-8 text-left sm:flex-row sm:justify-between sm:px-10"
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <span className="text-center sm:text-left" style={{ fontWeight: 400, fontSize: '20.1055px', lineHeight: '125%', color: '#003300' }}>
                      {item.question}
                    </span>
                    <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 250ms ease' }}>
                      <ChevronDown />
                    </span>
                  </button>
                  {isOpen && (
                    <p
                      className="px-6 pb-8 text-center sm:px-10 sm:text-left"
                      style={{ fontWeight: 400, fontSize: '15px', lineHeight: '145%', color: '#003300', opacity: 0.75, margin: 0 }}
                    >
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
