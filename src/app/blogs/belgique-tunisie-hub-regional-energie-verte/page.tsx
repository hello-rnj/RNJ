import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { EB_Garamond, Geist } from 'next/font/google';
import Navbar from '@/components/Navbar';
import FooterWithCta from '@/components/FooterWithCta';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import ArticleStructuredData from '@/components/ArticleStructuredData';

const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });
const geist = Geist({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });

const TITLE =
  "La Belgique réitère son engagement aux côtés de la Tunisie pour se positionner en tant que hub régional de l'énergie verte";
/* Titre court pour l'onglet et Google, qui tronque au-dela d'environ
   60 caracteres. Le titre complet reste le h1 et le titre Open Graph. */
const SEO_TITLE = "Belgique–Tunisie : hub de l'énergie verte";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description:
    "Petit-déjeuner débat sur la stratégie de développement de l'hydrogène vert et de ses dérivés en Tunisie et ses impacts sur les échanges avec l'Union européenne, organisé par la CCTBL et le Conseil de Gouvernance Économique Belgo-Tunisien.",
  alternates: { canonical: '/blogs/belgique-tunisie-hub-regional-energie-verte' },
  openGraph: {
    images: ['/optimized/belgique-tunisie-energie-verte-cover.webp'],
    title: TITLE,
    description:
      "La transition énergétique et l'hydrogène vert comme axe stratégique de coopération entre la Belgique et la Tunisie.",
    url: 'https://rnj-advisory.be/blogs/belgique-tunisie-hub-regional-energie-verte',
    type: 'article',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
};

/* Titre de section : EB Garamond 500, comme les h2 du reste du site. */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className={`${ebGaramond.className} mt-12 mb-5 text-[#003300]`}
      style={{ fontWeight: 500, fontSize: 'clamp(26px, 3.2vw, 36px)', lineHeight: '1.15em' }}
    >
      {children}
    </h2>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-5 text-[#003300]"
      style={{ fontWeight: 400, fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
    >
      {children}
    </p>
  );
}

export default function BelgiqueTunisieEnergieVertePage() {
  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>
      <ArticleStructuredData slug="belgique-tunisie-hub-regional-energie-verte" />

      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Blogs', item: 'https://rnj-advisory.be/blogs' },
          { name: TITLE, item: 'https://rnj-advisory.be/blogs/belgique-tunisie-hub-regional-energie-verte' },
        ]}
      />

      <Navbar glass />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[52vw] max-h-[680px] min-h-[320px] w-full">
          <Image
            src="/optimized/belgique-tunisie-energie-verte-cover.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,51,0,0.15) 0%, rgba(0,51,0,0.78) 100%)' }} />

          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:px-10 lg:px-[84px] lg:pb-[64px]">
            <div className="mx-auto max-w-[1272px]">
              <span
                className="mb-4 inline-block rounded-full px-4 py-1.5"
                style={{ background: '#BBCB2E', color: '#003300', fontWeight: 700, fontSize: '13px' }}
              >
                Énergie
              </span>
              <h1
                className={ebGaramond.className}
                style={{
                  fontWeight: 500,
                  fontSize: 'clamp(28px, 4.4vw, 60px)',
                  lineHeight: '1.06em',
                  color: '#FFFFFF',
                  maxWidth: '1000px',
                  margin: 0,
                }}
              >
                La Belgique réitère son engagement aux côtés de la Tunisie pour se positionner en tant que hub régional
                de l&apos;énergie verte
              </h1>
              <p className="mt-4 text-white/70" style={{ fontWeight: 500, fontSize: 'clamp(13px, 1.2vw, 17px)' }}>
                21 décembre 2025 — par RNJ Advisory, Nahla Aschi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE ──────────────────────────────────────────────────── */}
      <article className="mx-auto w-full max-w-[860px] px-6 py-14 sm:px-8 lg:py-20">
        <Paragraph>
          La transition énergétique et le développement de l&apos;énergie verte constituent aujourd&apos;hui un axe
          stratégique majeur de coopération entre la Belgique et la Tunisie.
        </Paragraph>

        <Paragraph>
          RNJ Advisory, membre de la Chambre de Commerce Tuniso-Belgo-Luxembourgeoise, a participé à un petit-déjeuner
          débat sur le thème&nbsp;: «&nbsp;Stratégie pour le développement de l&apos;hydrogène vert et de ses dérivés en
          Tunisie&nbsp;: impacts sur les échanges avec l&apos;Union européenne&nbsp;». Il a été organisé par la Chambre
          de Commerce Tuniso-Belgo-Luxembourgeoise et le Conseil de Gouvernance Économique Belgo-Tunisien, le mercredi
          11 décembre 2024, à l&apos;Hôtel Novotel Lac 2.
        </Paragraph>

        <SectionTitle>Vidéo&nbsp;: interview de Ramzi Jelalia, Partner RNJ Advisory</SectionTitle>
        {/* Liens sortants : `noopener noreferrer` est indispensable avec
            target="_blank", la page ouverte pouvant sinon manipuler l'onglet
            d'origine via window.opener. */}
        <Paragraph>
          <a
            href="https://www.facebook.com/watch/?v=561432086666969"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
            style={{ color: '#003300', fontWeight: 600 }}
          >
            Voir l&apos;interview sur Facebook
          </a>
        </Paragraph>

        <p
          className={`${ebGaramond.className} mt-12 border-t pt-8 text-[#003300]`}
          style={{ borderColor: 'rgba(0,51,0,0.2)', fontWeight: 500, fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: '1.4em' }}
        >
          RNJ Advisory – De Bruxelles à Tunis, accompagner votre vision avec rigueur, vision et humanité.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="flex h-[46px] items-center justify-center rounded-full px-7 font-semibold"
            style={{ background: '#BBCB2E', color: '#003300', fontSize: '14px' }}
          >
            Contact
          </Link>
          <Link
            href="/blogs"
            className="flex h-[46px] items-center justify-center rounded-full border px-7 font-semibold"
            style={{ borderColor: '#003300', color: '#003300', fontSize: '14px' }}
          >
            Tous les articles
          </Link>
        </div>
      </article>

      <FooterWithCta />
    </main>
  );
}
