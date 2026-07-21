'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Geist, EB_Garamond } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });
const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });

const SERVICE_CARDS = [
  {
    title: "Création d'entreprise",
    description:
      "Immatriculation BCE, TVA, ONSS, carte professionnelle et business plan. Un accompagnement complet pour lancer votre activité en Belgique en toute sérénité.",
    image: '/optimized/beautiful-architecture-office-business-building-wi-2026-03-09-05-47-32-utc%201.webp',
    bandBg: '#003300',
    titleColor: '#BBCB2E',
    descColor: 'rgba(255,255,255,0.75)',
    btnBg: '#BBCB2E',
    btnColor: '#003300',
    href: '/services/creation-entreprise',
  },
  {
    title: 'Accompagnement juridique',
    description:
      "Analyse institutionnelle, structuration juridique, droit des contrats, conformité réglementaire et partenariats public-privé. Expertise complète pour sécuriser vos décisions.",
    image: '/optimized/business-meeting-with-professionals-in-dark-room-2026-03-25-04-38-25-utc%201.webp',
    bandBg: '#BBCB2E',
    titleColor: '#003300',
    descColor: 'rgba(0,51,0,0.7)',
    btnBg: '#003300',
    btnColor: '#BBCB2E',
    href: '/services/conseil-juridique',
  },
  {
    title: 'Accélérer mon business',
    description:
      "Développement stratégique, expansion internationale, recrutement de talents. Structurez votre croissance avec des experts qui comprennent vos marchés.",
    image: '/optimized/business-professionals-waiting-in-line-for-a-meeti-2026-01-08-05-33-14-utc%201.webp',
    bandBg: '#406640',
    titleColor: '#FFFFFF',
    descColor: 'rgba(255,255,255,0.75)',
    btnBg: '#BBCB2E',
    btnColor: '#003300',
    href: '/services/accelerer-mon-business',
  },
];

export default function ServicesPageClient() {
  return (
    <main className={geist.className} style={{ background: '#F7FCFF', minHeight: '100vh' }}>
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Navbar />
      </div>

      {/* Hero */}
      <section className="mx-auto w-full max-w-[1500px] px-4 pb-12 pt-32 sm:px-6 sm:pt-36 md:px-8 md:pt-40 lg:px-12 lg:pt-44 xl:px-[52px]">
        <div className="mb-8 flex flex-col items-start gap-3 sm:mb-10 md:mb-12 md:gap-4">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.08em]"
            style={{ background: '#BBCB2E', color: '#003300' }}
          >
            RNJ Advisory
          </span>
          <h1
            className={`${ebGaramond.className} max-w-[720px] font-semibold leading-tight text-[#003300]`}
            style={{ fontSize: 'clamp(36px, 5.5vw, 72px)', lineHeight: 'clamp(42px, 6vw, 84px)' }}
          >
            Nos Services
          </h1>
          <p
            className="max-w-[620px] font-medium text-[#003300]"
            style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 'clamp(22px, 2vw, 26px)', opacity: 0.6 }}
          >
            RNJ Advisory vous accompagne à chaque étape de votre projet — création, structuration juridique
            ou développement stratégique en Belgique et à l&apos;international.
          </p>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
          {SERVICE_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative block overflow-hidden rounded-[20px] transition-transform duration-300 hover:scale-[1.02] focus:outline-none sm:rounded-[24px]"
              style={{ height: 'clamp(420px, 48vw, 600px)' }}
            >
              {/* Background image */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />

              {/* Bottom color band */}
              <div
                className="absolute inset-x-0 bottom-0 flex flex-col justify-center gap-3 px-6 md:px-8 lg:px-9"
                style={{ height: '42%', background: card.bandBg }}
              >
                <h2
                  className="font-semibold"
                  style={{
                    fontSize: 'clamp(20px, 2vw, 28px)',
                    lineHeight: 'clamp(26px, 2.5vw, 36px)',
                    color: card.titleColor,
                  }}
                >
                  {card.title}
                </h2>
                <p
                  className="font-medium"
                  style={{
                    fontSize: 'clamp(12px, 1vw, 14px)',
                    lineHeight: '1.5',
                    color: card.descColor,
                  }}
                >
                  {card.description}
                </p>
                <span
                  className="mt-1 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2 text-[13px] font-semibold transition-opacity group-hover:opacity-90"
                  style={{ background: card.btnBg, color: card.btnColor }}
                >
                  Découvrir
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
