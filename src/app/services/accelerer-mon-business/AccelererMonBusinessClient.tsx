'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EB_Garamond, Geist } from 'next/font/google';
import Navbar from '@/components/Navbar';
import LandingFooter from '@/components/LandingFooter';

const geist = Geist({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });
const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });

/* Figma canvas: 1512 wide */
const W = 1512;
const HERO_H = 1004;
// 4-card row ends at 1025.49, then the same 171px gap the removed heading used
// to sit in, the 72px CTA, and 171px of bottom padding.
const SOLUTIONS_H = 1439.52;
const APPROACH_H = 505.29;
const RECRUIT_H = 1197.26;

const MESH_IMG = '/optimized/abstract-wireframe-mesh-on-a-black-background-2026-03-20-00-22-35-utc%201.webp';
const RECRUIT_IMG = '/optimized/business-professionals-waiting-in-line-for-a-meeti-2026-01-08-05-33-14-utc%201.webp';

const HERO_IMG = '/optimized/beautiful-architecture-office-business-building-wi-2026-03-09-05-47-32-utc%201.webp';

const SOLUTION_CARDS = [
  {
    title: 'Développement stratégique',
    desc: 'Construire une vision claire et un plan de croissance durable.',
    bg: '#A2B144',
    color: '#F5FAC7',
    iconBg: '#EEF2CA',
    icon: '/optimized/Développement%20stratégique.png',
    iconW: 42,
    iconH: 40,
  },
  {
    title: 'Expansion internationale',
    desc: 'Accompagner votre implantation sur de nouveaux marchés.',
    bg: '#EEF2CA',
    color: '#406640',
    iconBg: '#406640',
    icon: '/optimized/Expansion%20internationale.png',
    iconW: 41,
    iconH: 41,
  },
  {
    title: 'Recrutement de talents',
    desc: 'Attirer les profils qui soutiendront votre développement.',
    bg: '#CCD862',
    color: '#406640',
    iconBg: '#EEF2CA',
    icon: '/optimized/Recrutement%20de%20talentss.png',
    iconW: 41,
    iconH: 42,
  },
  {
    title: 'Partenariats stratégiques',
    desc: 'Créer des collaborations génératrices de valeur.',
    bg: '#406640',
    color: '#F5FAC7',
    iconBg: '#EEF2CA',
    icon: '/optimized/Partenariats%20stratégiques.png',
    iconW: 55,
    iconH: 39,
  },
];

const RECRUIT_CARDS = [
  { title: 'Recrutement international', desc: 'Identifiez les profils adaptés à vos besoins.', icon: '/optimized/Recrutement%20international.png', iconW: 75, iconH: 77 },
  { title: 'Sélection des talents', desc: 'Trouvez les compétences qui feront la différence.', icon: '/optimized/Sélection%20des%20talents.png', iconW: 72, iconH: 77 },
  { title: 'Permis unique et autorisation de travail', desc: 'Sécurisez chaque étape du recrutement.', icon: '/optimized/Accompagnement%20juridique.png', iconW: 79, iconH: 79 },
  { title: 'Intégration des talents', desc: "Facilitez l'arrivée et l'intégration de vos collaborateurs.", icon: '/optimized/Intégration%20des%20talents.png', iconW: 111, iconH: 79 },
];

const FAQ_ITEMS = [
  {
    question: "Qu'est-ce que le permis unique ?",
    answer:
      "Le permis unique est le document qui autorise un ressortissant hors Union européenne à la fois à séjourner et à travailler en Belgique. Il regroupe en une seule procédure l'autorisation de travail et le titre de séjour, conformément à la directive européenne 2011/98/UE.",
  },
  {
    question: 'Qui doit introduire la demande de permis unique ?',
    answer:
      "C'est l'employeur belge qui initie la demande auprès de l'administration régionale compétente (Wallonie, Flandre, Bruxelles ou Communauté germanophone), et non le travailleur lui-même. RNJ Advisory prépare et introduit le dossier pour le compte de votre entreprise.",
  },
  {
    question: 'Quelles conditions faut-il remplir ?',
    answer:
      "L'employeur doit justifier d'un contrat de travail, respecter les seuils de rémunération applicables et, sauf exemption (métiers en pénurie, profils hautement qualifiés, carte bleue européenne), démontrer l'absence de candidat disponible sur le marché de l'emploi belge ou européen.",
  },
  {
    question: 'Combien de temps dure la procédure ?',
    answer:
      "Le délai de traitement varie selon la région et la complexité du dossier, généralement entre 4 et 12 semaines. Un dossier complet et bien préparé dès le départ permet de limiter les risques de retard ou de refus.",
  },
  {
    question: 'Le permis unique est-il renouvelable ?',
    answer:
      "Oui. Sa durée de validité est en principe alignée sur celle du contrat de travail, dans la limite de 3 ans, et il peut être renouvelé tant que la relation de travail se poursuit et que les conditions restent remplies.",
  },
];

function ChevronDown() {
  return (
    <svg width="22" height="11" viewBox="0 0 22 11" fill="none" style={{ opacity: 0.5, flexShrink: 0 }}>
      <path d="M1.5 1.5 11 9.5l9.5-8" stroke="#003300" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AccelererMonBusinessClient() {
  const [scale, setScale] = useState(1);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    const onResize = () => setScale(window.innerWidth / W);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>

      {/* ── NAVBAR ── */}
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Navbar glass />
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO (Frame 349359)
          ══════════════════════════════════════════════════════════════ */}

      {/* Desktop */}
      <section
        className="hidden md:block"
        style={{ position: 'relative', overflow: 'hidden', height: `${HERO_H * scale}px`, background: '#003300' }}
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
          <Image
            src={HERO_IMG}
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center', transform: 'scaleX(-1)' }}
            priority
            unoptimized
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(100deg, rgba(0,38,0,0.88) 0%, rgba(0,38,0,0.62) 42%, rgba(0,38,0,0.28) 72%, rgba(0,38,0,0.15) 100%)',
            }}
          />

          {/* Giant "50+" stat, right side */}
          <div style={{ position: 'absolute', left: '962.8px', top: '420px', width: '505px', opacity: 0.75 }}>
            <span
              style={{
                display: 'block',
                fontWeight: 500,
                fontSize: '263.288px',
                lineHeight: '117%',
                letterSpacing: '0.02em',
                color: '#406640',
              }}
            >
              50+
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5.84px', marginTop: '30px' }}>
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  height: '44.53px', padding: '0 20px',
                  background: '#839705', borderRadius: '29.9693px',
                  fontWeight: 500, fontSize: '19.5718px', lineHeight: '117%',
                  color: '#F5FAC7', opacity: 0.7, whiteSpace: 'nowrap',
                }}
              >
                Entreprises
              </span>
              <span
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  height: '44.15px', padding: '0 20px',
                  background: '#BFCCBF', borderRadius: '29.7176px',
                  fontWeight: 500, fontSize: '19.4074px', lineHeight: '117%',
                  color: '#003300', opacity: 0.7, whiteSpace: 'nowrap',
                }}
              >
                accompagnées
              </span>
            </div>
          </div>

          {/* Logo + title + description + CTA */}
          <div
            style={{
              position: 'absolute',
              left: '108.17px',
              top: '244.39px',
              width: '749.3px',
              display: 'flex',
              flexDirection: 'column',
              gap: '53px',
            }}
          >
            <Image
              src="/optimized/minimal horizontal logo white 1.png"
              alt="RNJ Advisory"
              width={204}
              height={50}
              style={{ width: '204px', height: 'auto' }}
              unoptimized
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
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
                Accélérer mon business.
              </h1>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '53px', width: '562.24px' }}>
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

                <Link
                  href="/contact"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '293.55px', height: '82.24px',
                    background: '#BBCB2E', borderRadius: '44px',
                    fontWeight: 600, fontSize: '20px',
                    color: '#003300', textDecoration: 'none', whiteSpace: 'nowrap',
                  }}
                >
                  Parlons de votre projet
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom-left caption */}
          <p
            style={{
              position: 'absolute',
              left: '112.46px',
              top: '888.79px',
              width: '377.67px',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '117%',
              letterSpacing: '0.02em',
              color: '#FFFFFF',
              opacity: 0.6,
              margin: 0,
            }}
          >
            Chaque ambition mérite une stratégie adaptée. Nous accompagnons votre développement avec une expertise
            qui allie vision, structuration et accompagnement durable.
          </p>
        </div>
      </section>

      {/* Mobile */}
      <section className="relative block overflow-hidden md:hidden" style={{ background: '#003300' }}>
        <Image src={HERO_IMG} alt="" fill style={{ objectFit: 'cover', transform: 'scaleX(-1)' }} priority unoptimized />
        <div aria-hidden className="absolute inset-0" style={{ background: 'rgba(0,38,0,0.78)' }} />
        <div className="relative z-10 px-6" style={{ paddingTop: '130px', paddingBottom: '56px' }}>
          <Image
            src="/optimized/minimal horizontal logo white 1.png"
            alt="RNJ Advisory"
            width={160}
            height={40}
            style={{ width: '150px', height: 'auto', marginBottom: '26px' }}
            unoptimized
          />
          <h1 className="mb-5 text-white" style={{ fontSize: '38px', lineHeight: '1.02em', letterSpacing: '-0.02em', fontWeight: 400 }}>
            Accélérer mon business.
          </h1>
          <p className="mb-8 text-[15px] leading-relaxed text-white/90">
            RNJ Advisory accompagne les entreprises, les institutions et les organisations dans leurs enjeux
            juridiques, réglementaires et stratégiques avec une approche fondée sur l&apos;expertise et la confiance.
          </p>
          <Link href="/contact" className="mb-10 flex items-center justify-center rounded-full py-4 font-semibold"
            style={{ background: '#BBCB2E', color: '#003300', fontSize: '16px' }}>
            Parlons de votre projet
          </Link>

          <div className="flex items-end gap-3">
            <span style={{ fontWeight: 500, fontSize: '64px', lineHeight: '100%', color: '#8FB88F' }}>50+</span>
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center justify-center rounded-full px-4 py-2" style={{ background: '#839705', fontWeight: 500, fontSize: '13px', color: '#F5FAC7' }}>
                Entreprises
              </span>
              <span className="inline-flex items-center justify-center rounded-full px-4 py-2" style={{ background: '#BFCCBF', fontWeight: 500, fontSize: '13px', color: '#003300' }}>
                accompagnées
              </span>
            </div>
          </div>

          <p className="mt-8 text-[12px] leading-relaxed text-white/60">
            Chaque ambition mérite une stratégie adaptée. Nous accompagnons votre développement avec une expertise
            qui allie vision, structuration et accompagnement durable.
          </p>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — SOLUTIONS (badge + heading, 4-card row,
          3 photo cards, CTA) — Frame 349365 / 349377 / Group 349405-408
          ══════════════════════════════════════════════════════════════ */}

      {/* Desktop */}
      <section
        className="hidden md:block"
        style={{ position: 'relative', background: '#F7FCFF', overflow: 'hidden', height: `${SOLUTIONS_H * scale}px` }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: `${SOLUTIONS_H}px`,
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          {/* Badge + heading + paragraph */}
          <div style={{ position: 'absolute', left: '60px', top: '156px', display: 'flex', flexDirection: 'column', gap: '73px', maxWidth: '946.93px' }}>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                height: '43.48px', padding: '0 21px',
                border: '2px solid #003300', borderRadius: '27px',
                fontWeight: 500, fontSize: '19.332px', letterSpacing: '-0.02em',
                color: '#003300', whiteSpace: 'nowrap', width: 'fit-content',
              }}
            >
              HOW CAN WE HELP YOUR BUSINESS
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '27px' }}>
              <h2
                style={{
                  fontWeight: 500,
                  fontSize: '48px',
                  lineHeight: '108%',
                  letterSpacing: '-0.02em',
                  color: '#003300',
                  width: '946.93px',
                  margin: 0,
                }}
              >
                Des solutions pour accompagner chaque étape de votre développement.
              </h2>
              <p
                style={{
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '108%',
                  letterSpacing: '-0.02em',
                  color: '#003300',
                  opacity: 0.7,
                  width: '946.93px',
                  margin: 0,
                }}
              >
                Chaque entreprise évolue à son propre rythme. RNJ Advisory vous accompagne dans votre développement
                en apportant une expertise stratégique, juridique et opérationnelle pour structurer votre croissance
                et saisir de nouvelles opportunités.
              </p>
            </div>
          </div>

          {/* 4-card row */}
          <div style={{ position: 'absolute', left: '60px', top: '570.08px', width: '1394px', height: '455.41px', display: 'flex', gap: '18px' }}>
            {SOLUTION_CARDS.map((c) => (
              <div key={c.title} style={{ position: 'relative', width: '335px', height: '455.41px', background: c.bg, flexShrink: 0 }}>
                <div
                  aria-hidden
                  style={{
                    position: 'absolute', left: '11.87px', top: '11.94px',
                    width: '76.67px', height: '76.67px', background: c.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Image src={c.icon} alt="" width={c.iconW} height={c.iconH} unoptimized />
                </div>
                <div style={{ position: 'absolute', left: '24.26px', top: '243.92px', width: '260.22px', display: 'flex', flexDirection: 'column', gap: '23px' }}>
                  <h3 style={{ fontWeight: 500, fontSize: '36px', lineHeight: '99%', letterSpacing: '-0.02em', color: c.color, margin: 0 }}>
                    {c.title}
                  </h3>
                  <p style={{ fontWeight: 500, fontSize: '16px', lineHeight: '118%', letterSpacing: '0.02em', color: c.color, opacity: 0.7, margin: 0 }}>
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            style={{
              position: 'absolute', left: '50%', top: '1196.52px', transform: 'translateX(-50%)',
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

      {/* Mobile */}
      <section className="block bg-[#F7FCFF] px-6 py-14 md:hidden">
        <span
          className="mb-8 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-center"
          style={{ border: '2px solid #003300', fontWeight: 500, fontSize: '13px', letterSpacing: '-0.02em', color: '#003300' }}
        >
          HOW CAN WE HELP YOUR BUSINESS
        </span>
        <h2 className="mb-4" style={{ fontWeight: 500, fontSize: '30px', lineHeight: '110%', letterSpacing: '-0.02em', color: '#003300' }}>
          Des solutions pour accompagner chaque étape de votre développement.
        </h2>
        <p className="mb-10" style={{ fontWeight: 400, fontSize: '15px', lineHeight: '140%', color: '#003300', opacity: 0.7 }}>
          Chaque entreprise évolue à son propre rythme. RNJ Advisory vous accompagne dans votre développement en
          apportant une expertise stratégique, juridique et opérationnelle pour structurer votre croissance et
          saisir de nouvelles opportunités.
        </p>

        <div className="mb-10 flex flex-col gap-4">
          {SOLUTION_CARDS.map((c) => (
            <div key={c.title} className="flex flex-col gap-4 rounded-[16px] p-6" style={{ background: c.bg }}>
              <div aria-hidden className="flex items-center justify-center" style={{ width: '52px', height: '52px', background: c.iconBg }}>
                <Image src={c.icon} alt="" width={c.iconW} height={c.iconH} unoptimized />
              </div>
              <h3 style={{ fontWeight: 500, fontSize: '24px', lineHeight: '105%', letterSpacing: '-0.02em', color: c.color, margin: 0 }}>{c.title}</h3>
              <p style={{ fontWeight: 500, fontSize: '14px', lineHeight: '130%', color: c.color, opacity: 0.7, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/contact"
            className="flex items-center justify-center rounded-full px-10 py-5"
            style={{ background: '#BBCB2E', fontWeight: 500, fontSize: '17px', color: '#003300', textDecoration: 'none' }}
          >
            Consulter un expert
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — NOTRE APPROCHE (Rectangle 856 + Frame 349378)
          ══════════════════════════════════════════════════════════════ */}

      {/* Desktop */}
      <section
        className="hidden md:block"
        style={{ position: 'relative', background: '#BBCB2E', overflow: 'hidden', height: `${APPROACH_H * scale}px` }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: `${APPROACH_H}px`,
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              width: '160%',
              height: '160%',
              left: '-10%',
              top: '-30%',
              transform: 'rotate(-29.64deg)',
              mixBlendMode: 'plus-lighter',
              opacity: 0.35,
              pointerEvents: 'none',
            }}
          >
            <Image src={MESH_IMG} alt="" fill style={{ objectFit: 'cover' }} unoptimized />
          </div>

          <span
            style={{
              position: 'absolute', left: '60px', top: '42.84px',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: '48.6px', padding: '0 20px',
              background: '#F5FAC7', borderRadius: '30.0077px',
              fontWeight: 500, fontSize: '20.0051px', letterSpacing: '0.04em',
              color: '#003300', opacity: 0.45, whiteSpace: 'nowrap',
            }}
          >
            NOTRE APPROCHE
          </span>

          <div style={{ position: 'absolute', left: '60px', top: '151.84px', width: '1040px', display: 'flex', flexDirection: 'column', gap: '13px' }}>
            <h2
              style={{
                fontWeight: 500,
                fontSize: '128px',
                lineHeight: '108%',
                letterSpacing: '-0.06em',
                color: '#003300',
                margin: 0,
              }}
            >
              Think. Grow. Lead.
            </h2>
            <p
              style={{
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '108%',
                letterSpacing: '0.04em',
                color: '#003300',
                opacity: 0.7,
                margin: 0,
              }}
            >
              Chez RNJ Advisory, nous croyons qu&apos;une croissance durable repose sur une stratégie claire, les bons
              talents et une vision à long terme. Nous accompagnons les entreprises à chaque étape de leur
              développement pour transformer leurs ambitions en résultats concrets.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="relative block overflow-hidden px-6 py-14 md:hidden" style={{ background: '#BBCB2E' }}>
        <span
          className="mb-8 inline-flex items-center justify-center rounded-full px-5 py-2.5"
          style={{ background: '#F5FAC7', fontWeight: 500, fontSize: '13px', letterSpacing: '0.04em', color: '#003300', opacity: 0.6 }}
        >
          NOTRE APPROCHE
        </span>
        <h2 className="mb-4" style={{ fontWeight: 500, fontSize: '42px', lineHeight: '100%', letterSpacing: '-0.03em', color: '#003300' }}>
          Think. Grow. Lead.
        </h2>
        <p style={{ fontWeight: 400, fontSize: '15px', lineHeight: '140%', color: '#003300', opacity: 0.7 }}>
          Chez RNJ Advisory, nous croyons qu&apos;une croissance durable repose sur une stratégie claire, les bons
          talents et une vision à long terme. Nous accompagnons les entreprises à chaque étape de leur développement
          pour transformer leurs ambitions en résultats concrets.
        </p>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — RECRUTEZ LES MEILLEURS TALENTS (photo band)
          ══════════════════════════════════════════════════════════════ */}

      {/* Desktop */}
      <section
        className="hidden md:block"
        style={{ position: 'relative', overflow: 'hidden', height: `${RECRUIT_H * scale}px` }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: `${RECRUIT_H}px`,
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          <Image src={RECRUIT_IMG} alt="" fill style={{ objectFit: 'cover' }} unoptimized />

          <div
            style={{
              position: 'absolute', left: '215.25px', top: '84.81px', width: '1081.5px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '43px',
            }}
          >
            <h2
              className={ebGaramond.className}
              style={{
                fontWeight: 500,
                fontSize: '56px',
                lineHeight: '105%',
                textAlign: 'center',
                letterSpacing: '0.02em',
                textTransform: 'capitalize',
                color: '#003300',
                margin: 0,
              }}
            >
              Choississez vos talents internationaux, nous nous chargeons de la procédure
            </h2>
            <p
              style={{
                fontWeight: 400,
                fontSize: '20px',
                lineHeight: '117%',
                textAlign: 'center',
                letterSpacing: '0.04em',
                color: '#003300',
                margin: 0,
              }}
            >
              Le recrutement international représente une véritable opportunité de croissance. RNJ Advisory vous
              accompagne dans l&apos;identification, le recrutement et l&apos;intégration de talents étrangers, tout en
              veillant au respect des exigences administratives et réglementaires.
            </p>
          </div>

          <Link
            href="/contact"
            style={{
              position: 'absolute', left: 'calc(50% - 474.37px/2)', top: '999.36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '474.37px', height: '89.5px',
              background: '#F5FAC7', borderRadius: '55.7239px',
              fontWeight: 500, fontSize: '31.8422px', lineHeight: '78%',
              textAlign: 'center', letterSpacing: '-0.01em', textTransform: 'capitalize',
              color: '#406640', textDecoration: 'none',
            }}
          >
            Trouver les bons talents
          </Link>
        </div>
      </section>

      {/* Mobile */}
      <section className="relative block overflow-hidden px-6 py-16 md:hidden" style={{ minHeight: '420px' }}>
        <div className="relative block md:hidden">
          <Image src={RECRUIT_IMG} alt="" fill style={{ objectFit: 'cover' }} unoptimized />
        </div>
        <div className="relative z-10 mx-auto max-w-[500px] text-center md:hidden">
          <h2 className={ebGaramond.className} style={{ fontWeight: 500, fontSize: '26px', lineHeight: '110%', letterSpacing: '0.01em', color: '#003300', textTransform: 'capitalize' }}>
            Choississez vos talents internationaux, nous nous chargeons de la procédure
          </h2>
          <p className="mt-5" style={{ fontWeight: 400, fontSize: '15px', lineHeight: '140%', color: '#003300' }}>
            Le recrutement international représente une véritable opportunité de croissance. RNJ Advisory vous
            accompagne dans l&apos;identification, le recrutement et l&apos;intégration de talents étrangers, tout en
            veillant au respect des exigences administratives et réglementaires.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full px-8 py-4"
            style={{ background: '#F5FAC7', fontWeight: 500, fontSize: '18px', letterSpacing: '-0.01em', textTransform: 'capitalize', color: '#406640', textDecoration: 'none' }}
          >
            Trouver les bons talents
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — WHAT WE DO (4 icon cards)
          ══════════════════════════════════════════════════════════════ */}

      {/* Desktop */}
      <section className="hidden md:block bg-[#F7FCFF]" style={{ position: 'relative', overflow: 'hidden', height: `${590 * scale}px` }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: `${W}px`,
            height: '590px',
            transformOrigin: 'top center',
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          <h2
            style={{
              position: 'absolute', left: '60px', top: '90px', width: '340px',
              fontWeight: 500, fontSize: '48px', lineHeight: '78%', letterSpacing: '-0.01em', color: '#003300', margin: 0,
            }}
          >
            What we do
          </h2>
          <p
            style={{
              position: 'absolute', left: '60px', top: '148.45px', width: '427.12px',
              fontWeight: 500, fontSize: '16px', lineHeight: '128%', letterSpacing: '-0.01em', color: 'rgba(0,51,0,0.6)', margin: 0,
            }}
          >
            Nous vous accompagnons à chaque étape du recrutement et des démarches administratives.
          </p>

          <div style={{ position: 'absolute', left: '60px', top: '245.47px', width: '1394px', height: '335px', display: 'flex', gap: '18px' }}>
            {RECRUIT_CARDS.map((c) => (
              <div key={c.title} style={{ position: 'relative', width: '335px', height: '335px', background: '#F5FAC7', borderRadius: '50px', flexShrink: 0 }}>
                <div
                  style={{
                    position: 'absolute', left: '50%', top: '69.16px', transform: 'translateX(-50%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <Image src={c.icon} alt="" width={c.iconW} height={c.iconH} unoptimized />
                </div>
                <span
                  style={{
                    position: 'absolute', left: '50%', top: '185.47px', transform: 'translateX(-50%)', width: '253px',
                    textAlign: 'center', fontWeight: 500, fontSize: '20px', lineHeight: '121%', letterSpacing: '-0.01em', color: '#003300',
                  }}
                >
                  {c.title}
                </span>
                <span
                  style={{
                    position: 'absolute', left: '50%', top: '222.27px', transform: 'translateX(-50%)', width: '236px',
                    textAlign: 'center', fontWeight: 400, fontSize: '16px', lineHeight: '128%', letterSpacing: '-0.01em', color: '#406640',
                  }}
                >
                  {c.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="block bg-[#F7FCFF] px-6 py-14 md:hidden">
        <h2 style={{ fontWeight: 500, fontSize: '32px', lineHeight: '90%', letterSpacing: '-0.01em', color: '#003300' }}>
          What we do
        </h2>
        <p className="mt-4 mb-10" style={{ fontWeight: 500, fontSize: '15px', lineHeight: '140%', letterSpacing: '-0.01em', color: 'rgba(0,51,0,0.6)' }}>
          Nous vous accompagnons à chaque étape du recrutement et des démarches administratives.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {RECRUIT_CARDS.map((c) => (
            <div key={c.title} className="flex flex-col items-center gap-4 rounded-[32px] px-6 py-10 text-center" style={{ background: '#F5FAC7' }}>
              <Image src={c.icon} alt="" width={c.iconW} height={c.iconH} unoptimized />
              <span style={{ fontWeight: 500, fontSize: '19px', lineHeight: '121%', letterSpacing: '-0.01em', color: '#003300' }}>{c.title}</span>
              <span style={{ fontWeight: 400, fontSize: '14px', lineHeight: '128%', letterSpacing: '-0.01em', color: '#406640' }}>{c.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — FAQ (Frame 75)
          ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F7FCFF] px-4 pb-16 sm:px-6 md:pb-20 lg:pb-24" style={{ paddingTop: `${170 * scale}px` }}>
        <div
          className="mx-auto flex w-full max-w-[1146px] flex-col items-center bg-white px-5 py-10 sm:px-9 sm:py-14 md:py-16"
          style={{ borderRadius: '25px', boxShadow: '2px 4px 34px rgba(0,0,0,0.12)' }}
        >
          <div className="mb-10 flex w-full max-w-[725px] flex-col items-center gap-6 text-center md:mb-16">
            <h2 className={ebGaramond.className} style={{ fontWeight: 400, fontSize: 'clamp(32px, 4.5vw, 61.3621px)', color: '#003300' }}>
              Questions fréquentes
            </h2>
            <p style={{ fontWeight: 400, fontSize: '16px', lineHeight: '158%', color: '#003300' }}>
              Retrouvez ici les réponses aux interrogations les plus courantes concernant nos services, notre
              méthodologie et notre accompagnement stratégique.
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
