'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EB_Garamond, Geist } from 'next/font/google';
import Navbar from '@/components/Navbar';
import LandingFooter from '@/components/LandingFooter';

const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });
const geist      = Geist({ subsets: ['latin'], weight: ['500', '700'], display: 'swap' });

/* Figma canvas: 1512 × 1081 px */
const W = 1512;
const H = 1081;
/* The badges/text only occupy the top ~920px of the 1081px Figma frame —
   the rest is empty canvas. Sizing the section off H left a huge blank
   gradient gap at the bottom once scale grows past 1, so the section
   height is based on the actual content bottom instead. */
const CONTENT_H = 865;

const BADGES = [
  { label: '✓ BCE',                   bg: '#003300', color: '#BBCB2E', left: 1219, top: 193, w: 332, h: 138, r: '0.36deg'   },
  { label: '✓ TVA',                   bg: '#406640', color: '#F7FCFF', left: 1232, top: 285, w: 309, h: 138, r: '9.17deg'   },
  { label: '✓ ONSS',                  bg: '#BBCB2E', color: '#003300', left: 1226, top: 435, w: 346, h: 138, r: '0.16deg'   },
  { label: '✓ Carte professionnelle', bg: '#DDE597', color: '#406640', left:  824, top: 582, w: 731, h: 138, r: '-0.68deg'  },
  { label: '✓ Business Plan',         bg: '#003300', color: '#BBCB2E', left: 1054, top: 645, w: 532, h: 138, r: '-13.95deg' },
];

const visionSteps = [
  { title: 'Établir des bases solides', desc: "La création d'une entreprise va bien au-delà de simples démarches administratives. Chez RNJ Advisory, nous vous accompagnons pas à pas pour définir une structure claire, sécurisée et pérenne, parfaitement adaptée à vos ambitions. Nous tenons en considération vos priorités en ce qui concerne les droits sociaux et vous orientons vers les structures d'accompagnement de la Région compétente.", featured: false },
  { title: 'Concevoir un plan financier sur mesure', desc: "Chaque projet entrepreneurial est singulier. Nous construisons avec vous un plan financier fiable et adapté à vos objectifs, afin de renforcer votre crédibilité auprès des banques, des partenaires et des administrations.", featured: true },
  { title: 'Statuts & dossier administratif', desc: "Nos experts rédigent des statuts personnalisés, parfaitement adaptés à votre activité et conformes à la réglementation belge en vigueur. Un dossier administratif complet adapté à votre situation sera préparé et adressé à l'administration compétente.", featured: false },
];

const parcoursCards = [
  { title: 'Entrepreneur en Belgique', caption: 'Créer une activité solide dès le premier jour.', icon: '/optimized/BE.png', iconW: 150, iconH: 99 },
  { title: 'Entrepreneur international', caption: 'Vous installer en Belgique en toute sécurité.', icon: '/optimized/Group%20(9).png', iconW: 160, iconH: 160 },
  { title: 'PME en croissance', caption: 'Structurer votre développement.', icon: '/optimized/Layer%201%20(18).png', iconW: 170, iconH: 137 },
];

// Flags are images rather than emoji: Windows ships no flag glyphs at all, so
// 🇧🇪/🇪🇺 fell back to an empty box or bare letters there.
const situations = [
  { title: 'Je réside en Belgique', link: 'Créer mon entreprise', flag: '/optimized/be-flag.svg', flagAlt: 'Drapeau de la Belgique' },
  { title: 'Je suis citoyen européen', link: 'Entreprendre en Belgique', flag: '/optimized/eu-flag.svg', flagAlt: "Drapeau de l'Union européenne" },
  { title: 'Je viens hors Union Européenne', link: 'Carte professionnelle', flag: null, flagAlt: '' },
];

/* Figma shows steps 2-4 as their base color at group-opacity 0.4 — but
   composited against a light canvas, not this section's dark green
   background, so a plain CSS `opacity` here would render far too green/dark
   (blends with #003300 behind it). Colors below are pre-flattened
   (base × 0.4 + white × 0.6) to match the pale, desaturated Figma look. */
const journeySteps = [
  { title: "L'idée", caption: 'Tout commence ici.', bg: '#003300', color: '#FFFFFF', captionColor: '#FFFFFF', captionOpacity: 0.6, arrowBg: '#BBCB2E', w: 501.7, h: 292.23, left: 35.18, top: 116.83, titleSize: 71.0367, titleLH: 95, captionSize: 17.7592, captionLH: 12, arrowSize: 70.07, arrowLeft: 395.75, arrowTop: 154.42, arrowFontSize: 26 },
  { title: "L'analyse", caption: 'Évaluons votre projet.', bg: '#F1F5D5', color: '#99AD99', captionColor: '#C2CEC2', captionOpacity: 1, arrowBg: '#E4EAAB', w: 452, h: 263.28, left: 31.69, top: 104.72, titleSize: 64, titleLH: 86, captionSize: 16, captionLH: 11, arrowSize: 33.83, arrowLeft: 383.2, arrowTop: 175.22, arrowFontSize: 13 },
  { title: 'Le plan', caption: 'Construisons votre stratégie.', bg: '#C0C3A5', color: '#99AD99', captionColor: '#C2CEC2', captionOpacity: 1, arrowBg: '#E4EAAB', w: 452, h: 263.28, left: 31.69, top: 104.06, titleSize: 64, titleLH: 86, captionSize: 16, captionLH: 11, arrowSize: 33.83, arrowLeft: 383.2, arrowTop: 175.22, arrowFontSize: 13 },
  { title: 'Le statut', caption: 'Le statut', bg: '#406640', color: '#B3C2B3', captionColor: '#B3C2B3', captionOpacity: 0.6, arrowBg: '#8FA88F', w: 452, h: 263.28, left: 31.69, top: 104.06, titleSize: 64, titleLH: 86, captionSize: 16, captionLH: 11, arrowSize: 33.83, arrowLeft: 383.2, arrowTop: 175.22, arrowFontSize: 13 },
];

export default function CreationEntrepriseClient() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const onResize = () => setScale(window.innerWidth / W);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <main className={geist.className}>

      {/* ── NAVBAR — floats above everything (absolute, 0-height wrapper) ── */}
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Navbar />
      </div>

      {/* ── DESKTOP HERO (≥ 768 px) — exact Figma scaling ─────────────── */}
      <section
        className="hidden md:block"
        style={{
          position: 'relative',
          background: 'linear-gradient(108deg, #C4D660 0%, #D9E887 12%, #EBF2B2 32%, #F2F8CC 52%, #F7FCEE 68%, #F7FCFF 85%)',
          overflow: 'hidden',
          height: `${CONTENT_H * scale}px`,
        }}
      >
        {/* 1512 × 1081 Figma frame (Mac Pro 14 reference).
            Scales down proportionally on narrower viewports and stays
            centered (not pinned left) on viewports wider than 1512px. */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: `${H}px`,
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          {/* Group 1 — exact Figma CSS */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              width: '3158.43px',
              height: '2871.09px',
              left: '-712px',
              top: '-1649px',
              transform: 'rotate(-153deg)',
              pointerEvents: 'none',
            }}
          >
            <Image src="/optimized/Group%201.png" alt="" fill style={{ objectFit: 'contain' }} unoptimized />
          </div>

          {/* Badges — rendered individually from Figma coords.
              (The flattened Group 349156.png export is cropped at its own
              canvas edge — ONSS/Carte Professionnelle/Business Plan text is
              missing from the source file — so we can't use it as-is.) */}
          {BADGES.map((b) => (
            <div
              key={b.label}
              className={ebGaramond.className}
              style={{
                position: 'absolute',
                left: `${b.left}px`,
                top: `${b.top}px`,
                width: `${b.w}px`,
                height: `${b.h}px`,
                background: b.bg,
                color: b.color,
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '18px',
                paddingLeft: '32px',
                fontSize: '52px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                boxShadow: '0px 14px 28px rgba(0,20,0,0.32), 0px 4px 10px rgba(0,20,0,0.22)',
                transform: `rotate(${b.r})`,
              }}
            >
              <span style={{ fontSize: '44px' }}>✓</span>
              {b.label.replace('✓ ', '')}
            </div>
          ))}

          {/* Text content — Figma: left=calc(50%−1026/2−139), top=277 */}
          <div
            style={{
              position: 'absolute',
              left: 'calc(50% - 513px - 139px)',
              top: '277px',
              width: '1026px',
              display: 'flex',
              flexDirection: 'column',
              gap: '66px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '29px' }}>
              <h1
                className={ebGaramond.className}
                style={{
                  fontWeight: 400,
                  fontSize: '96px',
                  lineHeight: '94px',
                  letterSpacing: '-0.02em',
                  textTransform: 'capitalize',
                  color: '#003300',
                  width: '1096px',
                  margin: 0,
                }}
              >
                Lancez votre entreprise en Belgique en toute sérénité.
              </h1>
              <p
                style={{
                  fontWeight: 500,
                  fontSize: '20px',
                  lineHeight: '26px',
                  letterSpacing: '-0.02em',
                  textTransform: 'capitalize',
                  color: '#003300',
                  opacity: 0.6,
                  width: '810px',
                  margin: 0,
                }}
              >
                Un accompagnement complet pour créer votre entreprise, obtenir les autorisations nécessaires et gérer toutes vos obligations administratives.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <Link
                href="/contact"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '236px', height: '74px',
                  background: '#F5FAC7', borderRadius: '117.764px',
                  fontWeight: 700, fontSize: '16.7349px', letterSpacing: '-0.02em',
                  color: '#003300', opacity: 0.6, textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                Diagnostic gratuit
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '263px', height: '74px',
                  background: '#003300', borderRadius: '117.764px',
                  boxShadow: '0px 0px 26.8px rgba(187,203,46,0.57)',
                  fontWeight: 700, fontSize: '16.7349px', letterSpacing: '-0.02em',
                  color: '#BBCB2E', textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                Commencer mon projet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE HERO (< 768 px) ────────────────────────────────────────── */}
      <section
        className="block overflow-hidden bg-[#F7FCFF] md:hidden"
        style={{ paddingTop: '100px', paddingBottom: '48px', position: 'relative' }}
      >
        {/* Same rotated Group 1 swirl as desktop, kept visually consistent
            across devices. The desktop version uses Figma's exact px box,
            but that box is landscape-shaped (wide/short) — on a narrow,
            content-tall mobile section it would only cover a sliver at the
            top, so here it's sized to always fill the section (like
            background-size: cover) while keeping the same rotation. */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '220%',
              height: '220%',
              transform: 'translate(-50%, -50%) rotate(-153deg)',
            }}
          >
            <Image src="/optimized/Group%201.png" alt="" fill style={{ objectFit: 'cover' }} unoptimized />
          </div>
        </div>
        <div className="relative z-10 px-6">
          <h1 className={`${ebGaramond.className} mb-4 text-[#003300]`}
            style={{ fontSize: '44px', lineHeight: '46px', letterSpacing: '-0.02em', fontWeight: 400 }}>
            Lancez votre entreprise en Belgique en toute sérénité.
          </h1>
          <p className="mb-8 text-[15px] leading-relaxed text-[#003300]/60">
            Un accompagnement complet pour créer votre entreprise, obtenir les autorisations nécessaires et gérer toutes vos obligations administratives.
          </p>
          <div className="mb-8 flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <span key={b.label} className={ebGaramond.className}
                style={{ background: b.bg, color: b.color, borderRadius: '14px', padding: '8px 18px', fontSize: '22px', fontWeight: 500 }}>
                {b.label}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/contact"
              className="flex items-center justify-center rounded-full py-4 text-center font-bold"
              style={{ background: '#F5FAC7', color: '#003300', fontSize: '15px' }}>
              Diagnostic gratuit
            </Link>
            <Link href="/contact"
              className="flex items-center justify-center rounded-full py-4 text-center font-bold"
              style={{ background: '#003300', color: '#BBCB2E', fontSize: '15px', boxShadow: '0px 0px 20px rgba(187,203,46,0.5)' }}>
              Commencer mon projet
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        /* Figma gives these as section-space offsets (177 / -294 / -764), one
           per variant. The stack now lives inside the 733px window that starts
           at y=37, so each value is shifted up by 37 to stay in the window's
           coordinate space. Each stop centres one card in the window. */
        @keyframes situationCycle {
          0%, 8%    { transform: translateY(140px); }
          25%, 33%  { transform: translateY(-331px); }
          50%, 58%  { transform: translateY(-801px); }
          75%, 100% { transform: translateY(140px); }
        }
        @keyframes journeyCycle {
          0%, 8%   { transform: translateX(0px); }
          25%, 33% { transform: translateX(-146.15px); }
          50%, 58% { transform: translateX(-194.13px); }
          75%, 83% { transform: translateX(-388.84px); }
          100%     { transform: translateX(0px); }
        }
      `}</style>

      {/* ── QUELLE EST VOTRE SITUATION ? — exact Figma px, same scaled-frame
             technique as the hero (Group 349157 / Rectangle 643: 1512×808,
             originally at page-top 1059 → 0 here). ──────────────────────── */}
      <section
        className="hidden md:block"
        style={{ position: 'relative', background: '#F7FCFF', overflow: 'hidden', height: `${808 * scale}px` }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: '808px',
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          {/* Frame 349154 */}
          <div style={{ position: 'absolute', left: '60px', top: '181px', width: '756.97px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <span className={geist.className} style={{ fontWeight: 700, fontSize: '23.8077px', lineHeight: '25px', color: '#003300' }}>
              Choisissez votre situation
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '34px', width: '756.97px' }}>
              <h2 className={ebGaramond.className}
                style={{ fontWeight: 700, fontSize: '96px', lineHeight: '100px', textTransform: 'capitalize', color: '#003300', width: '735px', margin: 0 }}>
                Quelle est votre situation ?
              </h2>
              <p className={geist.className} style={{ fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: '#003300', opacity: 0.5, width: '756.97px', margin: 0 }}>
                RNJ Advisory s&apos;associe à des organisations visionnaires pour résoudre des défis critiques, optimiser leurs opérations et créer une valeur durable dans un environnement mondial en constante évolution.
              </p>
            </div>
          </div>

          {/* Mask group / Rectangle 642 — the fixed window the stack travels
              behind (Figma: left 982, top 37, 470x733), carrying Rectangle
              642's own gradient stops as the top/bottom fade.
              The fade belongs here rather than on the stack: a mask set on the
              moving element travels with it, so the same card stayed lit while
              the whole column slid up and down, and the rest spilled outside
              the window instead of being cropped by it. */}
          <div
            style={{
              position: 'absolute',
              left: '982px',
              top: '37px',
              width: '470px',
              height: '733px',
              overflow: 'hidden',
              WebkitMaskImage: 'linear-gradient(180deg, transparent 5.57%, #000 21.94%, #000 77.95%, transparent 92.25%)',
              maskImage: 'linear-gradient(180deg, transparent 5.57%, #000 21.94%, #000 77.95%, transparent 92.25%)',
            }}
          >
            {/* Frame 349155 — the 3-card stack. Each keyframe parks one card in
                the middle of the window above, matching the three Figma
                variants of this section. */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '470px',
                height: '1394px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                animation: 'situationCycle 12s ease-in-out infinite',
              }}
            >
            {situations.map((s) => (
              <Link
                key={s.title}
                href="/contact"
                style={{ position: 'relative', width: '470px', height: '454px', flexShrink: 0, background: '#DDE597', borderRadius: '83px', display: 'block' }}
              >
                <div style={{ position: 'absolute', left: '40px', top: '75px', width: '390px', display: 'flex', flexDirection: 'column', gap: '154px' }}>
                  <span className={ebGaramond.className}
                    style={{ fontWeight: 500, fontSize: '48px', lineHeight: '63px', textTransform: 'capitalize', color: '#003300' }}>
                    {s.title}
                    {s.flag && (
                      <Image
                        src={s.flag}
                        alt={s.flagAlt}
                        width={69}
                        height={46}
                        style={{ display: 'inline-block', width: '69px', height: '46px', marginLeft: '14px', verticalAlign: '-6px', borderRadius: '5px' }}
                      />
                    )}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '11px', opacity: 0.4 }}>
                    <span className={geist.className}
                      style={{ fontWeight: 600, fontSize: '20px', lineHeight: '126.09%', letterSpacing: '-0.02em', textDecoration: 'underline', color: '#003300', whiteSpace: 'nowrap' }}>
                      {s.link}
                    </span>
                    <span
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '15px', height: '15px', border: '2.30769px solid #003300', borderRadius: '2.30769px', color: '#003300', fontSize: '11px', lineHeight: 1 }}
                    >
                      ↗
                    </span>
                  </span>
                </div>
              </Link>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUELLE EST VOTRE SITUATION ? — mobile ───────────────────────────── */}
      <section className="block bg-[#F7FCFF] px-6 py-16 md:hidden">
        <p className={geist.className} style={{ color: '#003300', fontWeight: 700, fontSize: '18px', marginBottom: '12px' }}>
          Choisissez votre situation
        </p>
        <h2 className={`${ebGaramond.className} mb-4 text-[#003300]`} style={{ fontSize: '36px', lineHeight: '1.1em', fontWeight: 700, textTransform: 'capitalize' }}>
          Quelle est votre situation ?
        </h2>
        <p className="mb-8 text-[15px] leading-relaxed text-[#003300]/50">
          RNJ Advisory s&apos;associe à des organisations visionnaires pour résoudre des défis critiques, optimiser leurs opérations et créer une valeur durable dans un environnement mondial en constante évolution.
        </p>
        <div className="flex flex-col gap-4">
          {situations.map((s) => (
            <Link key={s.title} href="/contact" className="flex flex-col gap-6 rounded-[40px] px-8 py-9" style={{ background: '#DDE597' }}>
              <span className={ebGaramond.className} style={{ fontSize: '28px', lineHeight: '1.2em', fontWeight: 500, textTransform: 'capitalize', color: '#003300' }}>
                {s.title}
                {s.flag && (
                  <Image
                    src={s.flag}
                    alt={s.flagAlt}
                    width={42}
                    height={28}
                    style={{ display: 'inline-block', width: '42px', height: '28px', marginLeft: '10px', verticalAlign: '-4px', borderRadius: '4px' }}
                  />
                )}
              </span>
              <span className="flex items-center gap-3" style={{ opacity: 0.4 }}>
                <span style={{ color: '#003300', fontWeight: 600, fontSize: '16px', textDecoration: 'underline' }}>{s.link}</span>
                <span className="flex items-center justify-center" style={{ width: '18px', height: '18px', border: '2px solid #003300', borderRadius: '4px', color: '#003300', fontSize: '11px' }}>↗</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── UN ACCOMPAGNEMENT À CHAQUE ÉTAPE — exact Figma px (Frame 349328:
             1512×845, page-top 1867 → 0 here). Desktop only; filmstrip is
             1899.7px wide, wider than the 1512 section, so the last card
             deliberately peeks off the right edge (matches Figma). ────── */}
      <section
        className="hidden md:block"
        style={{ position: 'relative', background: '#003300', overflow: 'hidden', height: `${845 * scale}px` }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: '845px',
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          {/* Frame 349155 — header */}
          <div style={{ position: 'absolute', left: 'calc(50% - 378.485px)', top: '109.5px', width: '756.97px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
            <span className={geist.className} style={{ fontWeight: 700, fontSize: '23.8077px', lineHeight: '25px', textAlign: 'center', color: '#BBCB2E' }}>
              Choisissez votre situation
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '34px' }}>
              <h2 className={ebGaramond.className}
                style={{ fontWeight: 500, fontSize: '96px', lineHeight: '86px', textAlign: 'center', textTransform: 'capitalize', color: '#BBCB2E', width: '849.81px', margin: 0 }}>
                Un accompagnement à chaque étape
              </h2>
              <p className={geist.className} style={{ fontWeight: 400, fontSize: '16px', lineHeight: '24px', textAlign: 'center', color: '#BBCB2E', opacity: 0.5, width: '756.97px', margin: 0 }}>
                Créer mon entreprise et lancer mon activité.
              </p>
            </div>
          </div>

          {/* Frame 349326 — filmstrip */}
          <div style={{ position: 'relative', left: 0, top: '552.71px', width: '1899.7px', height: '292.23px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '14px', animation: 'journeyCycle 12s ease-in-out infinite' }}>
            {journeySteps.map((s) => (
              <div key={s.title} style={{ position: 'relative', flexShrink: 0, width: `${s.w}px`, height: `${s.h}px`, background: s.bg }}>
                <div style={{ position: 'absolute', left: `${s.left}px`, top: `${s.top}px`, display: 'flex', flexDirection: 'column' }}>
                  <span className={ebGaramond.className} style={{ fontWeight: 500, fontSize: `${s.titleSize}px`, lineHeight: `${s.titleLH}px`, textTransform: 'capitalize', color: s.color, whiteSpace: 'nowrap' }}>
                    {s.title}
                  </span>
                  <span className={geist.className} style={{ fontWeight: 500, fontSize: `${s.captionSize}px`, lineHeight: `${s.captionLH}px`, textTransform: 'capitalize', color: s.captionColor, opacity: s.captionOpacity, whiteSpace: 'nowrap' }}>
                    {s.caption}
                  </span>
                </div>
                {/* connector arrow — nested inside its own card; bg color is
                    pre-flattened per card to match Figma's pale look. */}
                <div
                  style={{
                    position: 'absolute', left: `${s.arrowLeft}px`, top: `${s.arrowTop}px`,
                    width: `${s.arrowSize}px`, height: `${s.arrowSize}px`, borderRadius: '50%',
                    background: s.arrowBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#003300', fontSize: `${s.arrowFontSize}px`,
                  }}
                >
                  ↗
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 190px Figma gap before the stats bento grid, desktop only */}
      <div className="hidden md:block" style={{ height: `${190 * scale}px` }} />

      {/* ── UN ACCOMPAGNEMENT À CHAQUE ÉTAPE — mobile ───────────────────────── */}
      <section className="block px-6 py-16 md:hidden" style={{ background: '#003300' }}>
        <p className={geist.className} style={{ color: '#BBCB2E', fontWeight: 700, fontSize: '18px', marginBottom: '12px', textAlign: 'center' }}>
          Choisissez votre situation
        </p>
        <h2 className={`${ebGaramond.className} mb-4`} style={{ fontSize: '36px', lineHeight: '1.1em', fontWeight: 500, textTransform: 'capitalize', color: '#BBCB2E', textAlign: 'center' }}>
          Un accompagnement à chaque étape
        </h2>
        <p className="mb-8 text-center text-[15px] leading-relaxed" style={{ color: '#BBCB2E', opacity: 0.5 }}>
          Créer mon entreprise et lancer mon activité.
        </p>
        <div className="flex flex-col gap-4">
          {journeySteps.map((s) => (
            <div key={s.title} className="flex flex-col gap-2 rounded-[24px] px-7 py-8" style={{ background: s.bg }}>
              <span className={ebGaramond.className} style={{ fontSize: '32px', lineHeight: '1.2em', fontWeight: 500, textTransform: 'capitalize', color: s.color }}>
                {s.title}
              </span>
              <span className={geist.className} style={{ fontSize: '14px', color: s.captionColor, opacity: s.captionOpacity }}>
                {s.caption}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS BENTO GRID — exact Figma px (page-top 2910 → 0 here). ──── */}
      <section className="hidden md:block" style={{ position: 'relative', overflow: 'hidden', height: `${860 * scale}px` }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: '860px',
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          {/* Frame 349155 — header */}
          <div style={{ position: 'absolute', left: 'calc(50% - 756.97px/2 - 317.51px)', top: '0px', width: '756.97px', display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <h2 className={ebGaramond.className}
              style={{ fontWeight: 500, fontSize: '64px', lineHeight: '86px', textTransform: 'capitalize', color: '#003300', width: '577px', margin: 0 }}>
              Pourquoi choisir RNJ
            </h2>
            <p className={geist.className} style={{ fontWeight: 400, fontSize: '16px', lineHeight: '22px', letterSpacing: '1px', color: '#003300', opacity: 0.5, width: '799.07px', margin: 0 }}>
              Créer une entreprise implique de nombreuses démarches administratives, juridiques et sociales. Notre rôle est de vous accompagner à chaque étape afin que vous puissiez vous concentrer sur votre projet.
            </p>
          </div>

          {/* Tile 1 — 30+ / Années d'expertise */}
          <div style={{ position: 'absolute', left: '60px', top: '228.84px', width: '453.83px', height: '289.13px', background: '#BBCB2E', borderRadius: '18px' }}>
            <span className={ebGaramond.className} style={{ position: 'absolute', left: '33.73px', top: '40.32px', fontWeight: 500, fontSize: '76.5947px', lineHeight: '103px', color: '#F5FAC7' }}>30+</span>
            <span className={geist.className} style={{ position: 'absolute', left: '32px', top: '144.56px', width: '194px', fontWeight: 500, fontSize: '24px', lineHeight: '30px', color: '#F5FAC7' }}>Années d&apos;expertise</span>
            <div style={{ position: 'absolute', left: '12.95px', top: '230.61px', width: '427.94px', borderTop: '2px solid #DDE597', opacity: 0.5 }} />
          </div>

          {/* Tile 2 — 360° / Accompagnement de A à Z */}
          <div style={{ position: 'absolute', left: '528.17px', top: '228.84px', width: '453.83px', height: '289.13px', background: '#F5FAC7', borderRadius: '18px' }}>
            <span className={ebGaramond.className} style={{ position: 'absolute', left: '34.77px', top: '40.32px', fontWeight: 500, fontSize: '76.5947px', lineHeight: '103px', color: '#003300' }}>360°</span>
            <span className={geist.className} style={{ position: 'absolute', left: '33.04px', top: '144.56px', width: '237px', fontWeight: 500, fontSize: '24px', lineHeight: '30px', color: '#003300', opacity: 0.6 }}>Accompagnement de A à Z</span>
            <div style={{ position: 'absolute', left: '12.78px', top: '230.61px', width: '427.94px', borderTop: '2px solid #DDE597', opacity: 0.5 }} />
          </div>

          {/* Tile 3 — image (Group 349333) */}
          <div style={{ position: 'absolute', left: '1000px', top: '228.84px', width: '452px', height: '608.08px', borderRadius: '18px', overflow: 'hidden' }}>
            <Image src="/optimized/Group%20349333.png" alt="Associée RNJ Advisory" fill style={{ objectFit: 'cover' }} unoptimized />
          </div>

          {/* Tile 4 — 1 / Interlocuteur unique */}
          <div style={{ position: 'absolute', left: '60px', top: '547.79px', width: '253.11px', height: '289.13px', background: '#F5FAC7', borderRadius: '18px' }}>
            <span className={ebGaramond.className} style={{ position: 'absolute', left: '33.73px', top: '40.37px', fontWeight: 500, fontSize: '76.5947px', lineHeight: '103px', color: '#003300' }}>1</span>
            <span className={geist.className} style={{ position: 'absolute', left: '32px', top: '144.61px', width: '167px', fontWeight: 400, fontSize: '24px', lineHeight: '25px', color: '#003300', opacity: 0.6 }}>Interlocuteur unique</span>
            <div style={{ position: 'absolute', left: '12.95px', top: '230.66px', width: '228.13px', borderTop: '2px solid #DDE597', opacity: 0.5 }} />
          </div>

          {/* Tile 5 — BCE • TVA • ONSS / Toutes vos démarches réunies */}
          <div style={{ position: 'absolute', left: '329.15px', top: '547.79px', width: '380.2px', height: '289.13px', background: '#F5FAC7', borderRadius: '18px' }}>
            <span className={ebGaramond.className} style={{ position: 'absolute', left: '33.58px', top: '48.05px', fontWeight: 500, fontSize: '36px', lineHeight: '26px', color: '#003300' }}>BCE • TVA • ONSS</span>
            <span className={geist.className} style={{ position: 'absolute', left: '31.85px', top: '92.29px', width: '266px', fontWeight: 400, fontSize: '20px', lineHeight: '22px', color: '#003300', opacity: 0.6 }}>Toutes vos démarches réunies</span>
            <div style={{ position: 'absolute', left: '10.15px', top: '194.61px', width: '361.57px', height: '81.45px', background: '#BBCB2E', opacity: 0.6, borderRadius: '13px' }}>
              <span className={geist.className} style={{ position: 'absolute', left: '119.79px', top: '34.22px', fontWeight: 500, fontSize: '17.7592px', lineHeight: '12px', textTransform: 'capitalize', color: '#003300' }}>
                commence ici.
              </span>
            </div>
          </div>

          {/* Tile 6 — Une vision à long terme */}
          <div style={{ position: 'absolute', left: '725.46px', top: '547.79px', width: '253.11px', height: '289.13px', background: '#003300', borderRadius: '18px' }}>
            <span className={ebGaramond.className} style={{ position: 'absolute', left: '31.19px', top: '34.29px', width: '187px', fontWeight: 500, fontSize: '36px', lineHeight: '30px', color: '#BBCB2E' }}>Une vision à long terme</span>
            <span className={geist.className} style={{ position: 'absolute', left: '29.46px', top: '119.61px', width: '188px', fontWeight: 400, fontSize: '20px', lineHeight: '22px', color: '#BBCB2E', opacity: 0.6 }}>
              Nous vous accompagnons bien après la création de votre entreprise.
            </span>
            <div style={{ position: 'absolute', left: '12.49px', top: '230.66px', width: '228.13px', borderTop: '2px solid #DDE597', opacity: 0.5 }} />
          </div>
        </div>
      </section>

      {/* ── STATS BENTO GRID — mobile ────────────────────────────────────── */}
      <section className="block bg-[#F7FCFF] px-6 py-16 md:hidden">
        <h2 className={`${ebGaramond.className} mb-3 text-[#003300]`} style={{ fontSize: '32px', lineHeight: '1.15em', fontWeight: 500, textTransform: 'capitalize' }}>
          Pourquoi choisir RNJ
        </h2>
        <p className="mb-8 text-[15px] leading-relaxed text-[#003300]/50">
          Créer une entreprise implique de nombreuses démarches administratives, juridiques et sociales. Notre rôle est de vous accompagner à chaque étape afin que vous puissiez vous concentrer sur votre projet.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 flex flex-col gap-1 rounded-[18px] p-6" style={{ background: '#BBCB2E' }}>
            <span className={ebGaramond.className} style={{ fontSize: '48px', fontWeight: 500, color: '#F5FAC7' }}>30+</span>
            <span className={geist.className} style={{ fontSize: '18px', fontWeight: 500, color: '#F5FAC7' }}>Années d&apos;expertise</span>
          </div>
          <div className="flex flex-col gap-1 rounded-[18px] p-6" style={{ background: '#F5FAC7' }}>
            <span className={ebGaramond.className} style={{ fontSize: '48px', fontWeight: 500, color: '#003300' }}>1</span>
            <span className={geist.className} style={{ fontSize: '16px', color: '#003300', opacity: 0.6 }}>Interlocuteur unique</span>
          </div>
          <div className="flex flex-col gap-1 rounded-[18px] p-6" style={{ background: '#F5FAC7' }}>
            <span className={ebGaramond.className} style={{ fontSize: '32px', fontWeight: 500, color: '#003300' }}>360°</span>
            <span className={geist.className} style={{ fontSize: '16px', color: '#003300', opacity: 0.6 }}>Accompagnement de A à Z</span>
          </div>
          <div className="col-span-2 flex flex-col gap-1 rounded-[18px] p-6" style={{ background: '#F5FAC7' }}>
            <span className={ebGaramond.className} style={{ fontSize: '28px', fontWeight: 500, color: '#003300' }}>BCE • TVA • ONSS</span>
            <span className={geist.className} style={{ fontSize: '16px', color: '#003300', opacity: 0.6 }}>Toutes vos démarches réunies</span>
          </div>
          <div className="col-span-2 flex flex-col gap-1 rounded-[18px] p-6" style={{ background: '#003300' }}>
            <span className={ebGaramond.className} style={{ fontSize: '28px', fontWeight: 500, color: '#BBCB2E' }}>Une vision à long terme</span>
            <span className={geist.className} style={{ fontSize: '15px', color: '#BBCB2E', opacity: 0.6 }}>
              Nous vous accompagnons bien après la création de votre entreprise.
            </span>
          </div>
          <div className="relative col-span-2 overflow-hidden rounded-[18px]" style={{ height: '320px' }}>
            <Image src="/optimized/Group%20349333.png" alt="Associée RNJ Advisory" fill style={{ objectFit: 'cover' }} unoptimized />
          </div>
        </div>
      </section>

      {/* 167px Figma gap before the "Votre réussite commence ici." section */}
      <div className="hidden md:block" style={{ height: `${167 * scale}px` }} />

      {/* ── VOTRE RÉUSSITE COMMENCE ICI — exact Figma px (Group 56: 1518×815,
             page-top 3914.42 → 0 here). The left photo collage (3 layered
             images under a mask) is replaced by the single pre-composited
             export supplied for it. ─────────────────────────────────────── */}
      <section className="hidden md:block" style={{ position: 'relative', overflow: 'hidden', height: `${815.12 * scale}px` }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: '815.12px',
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          {/* Rectangle 17 — right green panel */}
          <div style={{ position: 'absolute', left: '756px', top: '0.12px', width: '759px', height: '815px', background: '#BBCB2E', boxShadow: '2.01px 4.02px 28.45px rgba(0,0,0,0.17)' }} />

          {/* Photo (Mask group 29 — pre-composited) */}
          <div style={{ position: 'absolute', left: '-3px', top: '0px', width: '759px', height: '815px', overflow: 'hidden' }}>
            <Image src="/optimized/Mask%20group%20(29).png" alt="Associé RNJ Advisory" fill style={{ objectFit: 'cover' }} unoptimized />
          </div>

          {/* Frame 38 — text content */}
          <div style={{ position: 'absolute', left: '848px', top: '72.58px', width: '554px', display: 'flex', flexDirection: 'column', gap: '36.19px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '9.38px', height: '9.38px', borderRadius: '50%', background: '#003300', display: 'inline-block' }} />
              <span className={geist.className} style={{ fontWeight: 600, fontSize: '20.1055px', lineHeight: '24px', color: '#003300' }}>Entrepreneuriat</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '45.24px', width: '593.11px' }}>
              <h2 className={ebGaramond.className}
                style={{ fontWeight: 400, fontSize: '128px', lineHeight: '106px', textTransform: 'capitalize', color: '#003300', margin: 0 }}>
                Votre réussite commence ici.
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '25.13px' }}>
                <span className={geist.className}
                  style={{ display: 'inline-block', background: '#F5FAC7', padding: '3.2px 13.17px', fontWeight: 600, fontSize: '20px', lineHeight: '28px', color: '#003300', opacity: 0.7, width: 'fit-content' }}>
                  Plus qu&apos;un prestataire, un véritable partenaire.
                </span>

                <div style={{ display: 'flex', flexDirection: 'row', gap: '9.85px' }}>
                  <Link href="/a-propos" className={geist.className}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '22.66px 34px', background: '#CCD862', borderRadius: '65.67px', fontWeight: 600, fontSize: '16.0844px', lineHeight: '20px', color: '#003300', whiteSpace: 'nowrap' }}>
                    About
                  </Link>
                  <Link href="/contact" className={geist.className}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '22.66px 24px', background: '#F5FAC7', borderRadius: '112.575px', fontWeight: 600, fontSize: '16.0844px', lineHeight: '20px', color: '#003300', whiteSpace: 'nowrap' }}>
                    Planifier un entretien confidentiel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VOTRE RÉUSSITE COMMENCE ICI — mobile ─────────────────────────────── */}
      <section className="block md:hidden">
        <div className="relative w-full" style={{ height: '360px' }}>
          <Image src="/optimized/Mask%20group%20(29).png" alt="Associé RNJ Advisory" fill style={{ objectFit: 'cover' }} unoptimized />
        </div>
        <div className="px-6 py-12" style={{ background: '#BBCB2E' }}>
          <div className="mb-6 flex items-center gap-2">
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#003300', display: 'inline-block' }} />
            <span className={geist.className} style={{ fontWeight: 600, fontSize: '15px', color: '#003300' }}>Entrepreneuriat</span>
          </div>
          <h2 className={`${ebGaramond.className} mb-6 text-[#003300]`} style={{ fontSize: '44px', lineHeight: '0.95em', fontWeight: 400, textTransform: 'capitalize' }}>
            Votre réussite commence ici.
          </h2>
          <span className={geist.className}
            style={{ display: 'inline-block', background: '#F5FAC7', padding: '6px 12px', fontWeight: 600, fontSize: '15px', color: '#003300', opacity: 0.7, marginBottom: '28px' }}>
            Plus qu&apos;un prestataire, un véritable partenaire.
          </span>
          <div className="flex flex-col gap-3">
            <Link href="/a-propos"
              className="flex items-center justify-center rounded-full py-4 text-center font-semibold" style={{ background: '#CCD862', color: '#003300', fontSize: '15px' }}>
              About
            </Link>
            <Link href="/contact"
              className="flex items-center justify-center rounded-full py-4 text-center font-semibold" style={{ background: '#F5FAC7', color: '#003300', fontSize: '15px' }}>
              Planifier un entretien confidentiel
            </Link>
          </div>
        </div>
      </section>

      {/* ~139px Figma gap before "Comment ça fonctionne ?" */}
      <div className="hidden md:block" style={{ height: `${139 * scale}px` }} />

      {/* ── COMMENT ÇA FONCTIONNE ? — exact Figma px (Frame 368: 1399.35×858.27,
             page-top 4869 → 0 here). Background photo collage (3 layered
             images under a mask) replaced by the single pre-composited
             export supplied for it (Group 349040.png). ───────────────────── */}
      <section className="hidden md:block" style={{ position: 'relative', overflow: 'hidden', height: `${858.27 * scale}px` }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: '858.27px',
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          {/* Frame 368 */}
          <div style={{ position: 'absolute', left: '55.99px', top: '0px', width: '1399.35px', height: '858.27px' }}>
            <Image src="/optimized/Group%20349040.png" alt="" fill style={{ objectFit: 'cover' }} unoptimized />

            {/* tag */}
            <span style={{ position: 'absolute', left: '68.36px', top: '70.61px', width: '9.07px', height: '9.18px', borderRadius: '50%', background: '#FFFFFF' }} />
            <span className={geist.className} style={{ position: 'absolute', left: '87.4px', top: '63.27px', fontWeight: 700, fontSize: '21.474px', lineHeight: '23px', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
              Entrepreneuriat
            </span>

            {/* contact pill */}
            <Link href="/contact" className={geist.className}
              style={{ position: 'absolute', left: '1186.82px', top: '53.17px', width: '144.17px', height: '43.14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#BBCB2E', borderRadius: '181.347px', fontWeight: 600, fontSize: '21.474px', lineHeight: '18px', color: '#003300' }}>
              contact
            </Link>

            {/* text block */}
            <div style={{ position: 'absolute', left: '68.59px', top: '496.96px', width: '718.13px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 className={ebGaramond.className}
                style={{ fontWeight: 400, fontSize: '128px', lineHeight: '101px', textTransform: 'capitalize', color: '#FFFFFF', margin: 0 }}>
                Comment ça fonctionne ?
              </h2>
              <p className={geist.className} style={{ fontWeight: 600, fontSize: '14.5078px', lineHeight: '16px', color: '#FFFFFF', opacity: 0.49, width: '428.89px', margin: 0 }}>
                Nous analysons votre environnement institutionnel et réglementaire afin de sécuriser vos décisions et garantir la conformité de vos projets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA FONCTIONNE ? — mobile ─────────────────────────────────── */}
      <section className="relative block overflow-hidden md:hidden" style={{ minHeight: '520px' }}>
        <Image src="/optimized/Group%20349040.png" alt="" fill style={{ objectFit: 'cover' }} unoptimized />
        <div className="relative z-10 flex flex-col justify-between px-6 py-12" style={{ minHeight: '520px' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFFFFF', display: 'inline-block' }} />
              <span className={geist.className} style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF' }}>Entrepreneuriat</span>
            </div>
            <Link href="/contact" className={geist.className}
              style={{ padding: '10px 20px', background: '#BBCB2E', borderRadius: '181px', fontWeight: 600, fontSize: '14px', color: '#003300' }}>
              contact
            </Link>
          </div>
          <div>
            <h2 className={`${ebGaramond.className} mb-4 text-white`} style={{ fontSize: '40px', lineHeight: '0.95em', fontWeight: 400, textTransform: 'capitalize' }}>
              Comment ça fonctionne ?
            </h2>
            <p className={geist.className} style={{ fontWeight: 600, fontSize: '14px', lineHeight: '20px', color: '#FFFFFF', opacity: 0.6 }}>
              Nous analysons votre environnement institutionnel et réglementaire afin de sécuriser vos décisions et garantir la conformité de vos projets.
            </p>
          </div>
        </div>
      </section>

      {/* 84px Figma gap before "Choisissez votre parcours" */}
      <div className="hidden md:block" style={{ height: `${84 * scale}px` }} />

      {/* ── CHOISISSEZ VOTRE PARCOURS — exact Figma px (Frame 349330 header +
             Frame 349329 cards, page-top 5811.91 → 0 here). The dozens of
             tiny nested vector paths per card icon are replaced by the
             single pre-composited export supplied for each (BE.png,
             Group (9).png, Layer 1 (18).png). ─────────────────────────── */}
      <section className="hidden md:block bg-[#F7FCFF]" style={{ position: 'relative', overflow: 'hidden', height: `${820 * scale}px` }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: '820px',
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          {/* Frame 349330 — header */}
          <div style={{ position: 'absolute', left: 'calc(50% - 756.97px/2 - 317.51px)', top: '0px', width: '756.97px', display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <h2 className={ebGaramond.className}
              style={{ fontWeight: 500, fontSize: '64px', lineHeight: '86px', textTransform: 'capitalize', color: '#003300', width: '646px', margin: 0 }}>
              Choisissez votre parcours
            </h2>
            <p className={geist.className} style={{ fontWeight: 400, fontSize: '16px', lineHeight: '22px', letterSpacing: '1px', color: '#003300', opacity: 0.5, width: '799.07px', margin: 0 }}>
              Créer une entreprise implique de nombreuses démarches administratives, juridiques et sociales. Notre rôle est de vous accompagner à chaque étape afin que vous puissiez vous concentrer sur votre projet.
            </p>
          </div>

          {/* Frame 349329 — cards */}
          <div style={{ position: 'absolute', left: '60px', top: '231.09px', width: '1389px', height: '555.9px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
            {parcoursCards.map((c) => (
              <div key={c.title} style={{ position: 'relative', flexShrink: 0, width: '449.61px', height: '555.9px', background: '#BBCB2E', borderRadius: '7px' }}>
                <div style={{ position: 'absolute', left: '50%', top: '90px', transform: 'translateX(-50%)', width: `${c.iconW}px`, height: `${c.iconH}px` }}>
                  <Image src={c.icon} alt="" fill style={{ objectFit: 'contain' }} unoptimized />
                </div>
                <div style={{ position: 'absolute', left: '45.32px', top: '295.73px', width: '358.98px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '34px' }}>
                  <span className={ebGaramond.className}
                    style={{ fontWeight: 500, fontSize: '64px', lineHeight: '54px', textAlign: 'center', textTransform: 'capitalize', color: '#003300' }}>
                    {c.title}
                  </span>
                  <span className={geist.className}
                    style={{ fontWeight: 500, fontSize: '20px', lineHeight: '22px', textAlign: 'center', textTransform: 'capitalize', color: '#003300' }}>
                    {c.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHOISISSEZ VOTRE PARCOURS — mobile ───────────────────────────────── */}
      <section className="block bg-[#F7FCFF] px-6 py-16 md:hidden">
        <h2 className={`${ebGaramond.className} mb-3 text-[#003300]`} style={{ fontSize: '32px', lineHeight: '1.15em', fontWeight: 500, textTransform: 'capitalize' }}>
          Choisissez votre parcours
        </h2>
        <p className="mb-8 text-[15px] leading-relaxed text-[#003300]/50">
          Créer une entreprise implique de nombreuses démarches administratives, juridiques et sociales. Notre rôle est de vous accompagner à chaque étape afin que vous puissiez vous concentrer sur votre projet.
        </p>
        <div className="flex flex-col gap-4">
          {parcoursCards.map((c) => (
            <div key={c.title} className="flex flex-col items-center gap-4 rounded-[20px] px-6 py-10 text-center" style={{ background: '#BBCB2E' }}>
              <div className="relative" style={{ width: `${c.iconW * 0.7}px`, height: `${c.iconH * 0.7}px` }}>
                <Image src={c.icon} alt="" fill style={{ objectFit: 'contain' }} unoptimized />
              </div>
              <span className={ebGaramond.className} style={{ fontSize: '32px', lineHeight: '1.1em', fontWeight: 500, textTransform: 'capitalize', color: '#003300' }}>
                {c.title}
              </span>
              <span className={geist.className} style={{ fontSize: '16px', fontWeight: 500, textTransform: 'capitalize', color: '#003300' }}>
                {c.caption}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VOTRE PROJET COMMENCE ICI + DE LA VISION À LA RÉALITÉ — exact
             Figma px, same scaled-frame technique as every other desktop
             section (Frame 349334, page-top 6741 → 0 here), so it scales
             for every viewport instead of staying pinned at Mac Pro 14
             literal px. The photo mask (2 layered photos) is replaced by
             the single pre-composited export supplied for it
             (Mask group (30).png). Carousel arrows/dots are
             static/decorative — no drag/swipe behavior implemented. ───── */}
      <section className="hidden md:block bg-[#F7FCFF]" style={{ position: 'relative', overflow: 'hidden', height: `${2134 * scale}px` }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: '2134px',
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          <div style={{ position: 'absolute', left: '70px', top: '0px', width: '1392px', borderTop: '4px solid rgba(0,51,0,0.1)' }} />

          {/* Testimonial / CTA block */}
          <div className="relative flex-shrink-0" style={{ position: 'absolute', left: '705px', top: '140px', width: '687px', height: '687px', filter: 'drop-shadow(4px 0px 38.8px rgba(0,0,0,0.19))' }}>
            <Image src="/optimized/Mask%20group%20(30).png" alt="Cliente RNJ Advisory" fill style={{ objectFit: 'contain' }} unoptimized />
          </div>
          <h2 className={ebGaramond.className}
            style={{ position: 'absolute', left: '70px', top: '208px', width: '640px', fontWeight: 500, fontSize: '96px', lineHeight: '92px', color: '#003300', margin: 0 }}>
            Votre projet d&apos;entreprise commence ici
          </h2>
          <p className={geist.className}
            style={{ position: 'absolute', left: '70px', top: '521px', width: '557px', fontWeight: 500, fontSize: '20px', lineHeight: '25px', color: '#003300', opacity: 0.75, margin: 0 }}>
            Chez RNJ Advisory, nous accompagnons les entrepreneurs à chaque étape de la création de leur entreprise. Notre approche combine expertise juridique, compréhension des démarches administratives et conseils stratégiques afin de structurer votre projet et sécuriser votre lancement.
          </p>
          <Link href="/contact" className={geist.className}
            style={{ position: 'absolute', left: '70px', top: '695px', width: '221px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#BBCB2E', borderRadius: '110px', fontWeight: 500, fontSize: '20px', lineHeight: '25px', color: '#003300' }}>
            Contactez-nous
          </Link>

          <div style={{ position: 'absolute', left: '70px', top: '967px', width: '1392px', borderTop: '4px solid rgba(0,51,0,0.1)' }} />

          {/* Vision → réalité, 4 steps */}
          <h2 className={geist.className}
            style={{ position: 'absolute', left: 'calc(50% - 621px/2 - 380.5px)', top: '1107px', width: '621px', fontWeight: 500, fontSize: '64px', lineHeight: '73px', letterSpacing: '-0.02em', textTransform: 'capitalize', color: '#003300', textAlign: 'center', margin: 0 }}>
            De la vision à la Réalité en 4 étapes
          </h2>

          {/* Left card — Établir des bases solides (static, exact Figma position) */}
          <div style={{ position: 'absolute', left: 'calc(50% - 453px/2 - 387.5px)', top: '1426px', width: '453px', height: '583px', background: '#DDE597', borderRadius: '60.21px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', padding: '0 34px', boxSizing: 'border-box' }}>
            <h3 className={ebGaramond.className}
              style={{ width: '385.71px', maxWidth: '100%', fontWeight: 500, fontSize: '52px', lineHeight: '52px', letterSpacing: '-0.02em', textTransform: 'capitalize', color: '#003300', textAlign: 'center', margin: 0 }}>
              {visionSteps[0].title}
            </h3>
            <p className={geist.className}
              style={{ width: '385.71px', maxWidth: '100%', fontWeight: 500, fontSize: '16.41px', lineHeight: '19px', letterSpacing: '-0.02em', textTransform: 'capitalize', color: '#003300', opacity: 0.7, textAlign: 'center', margin: 0 }}>
              {visionSteps[0].desc}
            </p>
          </div>

          {/* Center card (featured) — Concevoir un plan financier sur mesure */}
          <div style={{ position: 'absolute', left: 'calc(50% - 552px/2 + 6px)', top: '1394px', width: '552px', height: '647px', background: '#DDE597', borderRadius: '73.36px', filter: 'drop-shadow(0px 2px 66.2px rgba(0,0,0,0.53))', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px', padding: '0 40px', boxSizing: 'border-box' }}>
            <h3 className={ebGaramond.className}
              style={{ width: '470px', maxWidth: '100%', fontWeight: 500, fontSize: '52px', lineHeight: '52px', letterSpacing: '-0.02em', textTransform: 'capitalize', color: '#003300', textAlign: 'center', margin: 0 }}>
              {visionSteps[1].title}
            </h3>
            <p className={geist.className}
              style={{ width: '470px', maxWidth: '100%', fontWeight: 500, fontSize: '20px', lineHeight: '23px', letterSpacing: '-0.02em', textTransform: 'capitalize', color: '#003300', opacity: 0.7, textAlign: 'center', margin: 0 }}>
              {visionSteps[1].desc}
            </p>
          </div>

          {/* Right card — Statuts & dossier administratif */}
          <div style={{ position: 'absolute', left: 'calc(50% - 453px/2 + 398.5px)', top: '1426px', width: '453px', height: '583px', background: '#DDE597', borderRadius: '60.21px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', padding: '0 34px', boxSizing: 'border-box' }}>
            <h3 className={ebGaramond.className}
              style={{ width: '385.71px', maxWidth: '100%', fontWeight: 500, fontSize: '52px', lineHeight: '52px', letterSpacing: '-0.02em', textTransform: 'capitalize', color: '#003300', textAlign: 'center', margin: 0 }}>
              {visionSteps[2].title}
            </h3>
            <p className={geist.className}
              style={{ width: '385.71px', maxWidth: '100%', fontWeight: 500, fontSize: '16.41px', lineHeight: '19px', letterSpacing: '-0.02em', textTransform: 'capitalize', color: '#003300', opacity: 0.7, textAlign: 'center', margin: 0 }}>
              {visionSteps[2].desc}
            </p>
          </div>

          {/* pagination dots — decorative, matches Figma (second dot active) */}
          <div style={{ position: 'absolute', left: 'calc(50% - 79.36px/2 + 6.32px)', top: '2090.25px', display: 'flex', alignItems: 'center', gap: '8.29px' }}>
            <span style={{ width: '12.33px', height: '12.33px', borderRadius: '50%', background: 'rgba(0,51,0,0.5)', display: 'inline-block' }} />
            <span style={{ width: '17.53px', height: '17.53px', borderRadius: '50%', background: '#003300', display: 'inline-block' }} />
            <span style={{ width: '12.33px', height: '12.33px', borderRadius: '50%', background: 'rgba(0,51,0,0.5)', display: 'inline-block' }} />
            <span style={{ width: '12.33px', height: '12.33px', borderRadius: '50%', background: 'rgba(0,51,0,0.5)', display: 'inline-block' }} />
          </div>

          {/* prev/next arrows — decorative, matches Figma */}
          <div style={{ position: 'absolute', left: '1396px', top: '1669px', width: '98px', height: '98px' }}>
            <Image src="/optimized/Group%20444.png" alt="" fill unoptimized />
          </div>
          <div style={{ position: 'absolute', left: '29px', top: '1669px', width: '98px', height: '98px' }}>
            <Image src="/optimized/Group%20445.png" alt="" fill unoptimized />
          </div>
        </div>
      </section>

      {/* ── VOTRE PROJET COMMENCE ICI + 4 ÉTAPES — mobile ────────────────────── */}
      <section className="block bg-[#F7FCFF] px-6 py-16 md:hidden">
        <div className="mb-12" style={{ borderTop: '2px solid rgba(0,51,0,0.1)' }} />
        <div className="relative mb-8 w-full overflow-hidden rounded-[24px]" style={{ height: '320px' }}>
          <Image src="/optimized/Mask%20group%20(30).png" alt="Cliente RNJ Advisory" fill style={{ objectFit: 'cover' }} unoptimized />
        </div>
        <h2 className={`${ebGaramond.className} mb-4 text-[#003300]`} style={{ fontSize: '38px', lineHeight: '1.05em', fontWeight: 500 }}>
          Votre projet d&apos;entreprise commence ici
        </h2>
        <p className="mb-6 text-[15px] leading-relaxed text-[#003300]/75">
          Chez RNJ Advisory, nous accompagnons les entrepreneurs à chaque étape de la création de leur entreprise. Notre approche combine expertise juridique, compréhension des démarches administratives et conseils stratégiques afin de structurer votre projet et sécuriser votre lancement.
        </p>
        <Link href="/contact" className="mb-16 inline-flex items-center justify-center rounded-full px-8 py-4 font-medium" style={{ background: '#BBCB2E', color: '#003300' }}>
          Contactez-nous
        </Link>

        <div className="mb-10" style={{ borderTop: '2px solid rgba(0,51,0,0.1)' }} />
        <h2 className={`${ebGaramond.className} mb-8 text-center text-[#003300]`} style={{ fontSize: '32px', lineHeight: '1.15em', fontWeight: 500, textTransform: 'capitalize' }}>
          De la vision à la réalité en 4 étapes
        </h2>
        <div className="flex flex-col gap-4">
          {visionSteps.map((s) => (
            <div key={s.title} className="flex flex-col gap-3 rounded-[28px] px-7 py-9 text-center" style={{ background: '#DDE597' }}>
              <h3 className={ebGaramond.className} style={{ fontSize: '26px', lineHeight: '1.1em', fontWeight: 500, color: '#003300' }}>{s.title}</h3>
              <p className="text-[14px] leading-relaxed" style={{ color: '#003300', opacity: 0.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
