import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { EB_Garamond, Geist } from 'next/font/google';
import Navbar from '@/components/Navbar';
import FooterWithCta from '@/components/FooterWithCta';
import PillarBridge from '@/components/PillarBridge';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import ArticleStructuredData from '@/components/ArticleStructuredData';
import { alternatesFor } from '@/lib/seo';

const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });
const geist = Geist({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });

const TITLE = 'Retour sur notre participation au workshop « Sustainable Digitalization » à BeCentral';
/* Titre court pour l'onglet et Google, qui tronque au-dela d'environ
   60 caracteres. Le titre complet reste le h1 et le titre Open Graph. */
const SEO_TITLE = "Workshop « Sustainable Digitalization »";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description:
    "Retour sur le workshop « Sustainable Digitalization » du 29 août 2025 à BeCentral, Bruxelles : comment conjuguer performance, inclusion et responsabilité dans la transformation numérique.",
  alternates: alternatesFor('/blogs/workshop-sustainable-digitalization-becentral'),
  openGraph: {
    images: ['/optimized/workshop-sustainable-digitalization-cover.webp'],
    title: TITLE,
    description:
      "Une digitalisation durable au cœur des échanges : retour d'expérience sur le workshop organisé salle Paul Otlet, à BeCentral.",
    url: 'https://rnj-advisory.be/blogs/workshop-sustainable-digitalization-becentral',
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

export default function WorkshopSustainableDigitalizationPage() {
  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>
      <ArticleStructuredData slug="workshop-sustainable-digitalization-becentral" />

      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Blogs', item: 'https://rnj-advisory.be/blogs' },
          { name: TITLE, item: 'https://rnj-advisory.be/blogs/workshop-sustainable-digitalization-becentral' },
        ]}
      />

      <Navbar glass />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[52vw] max-h-[680px] min-h-[320px] w-full">
          <Image
            src="/optimized/workshop-sustainable-digitalization-cover.webp"
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
                Digitalisation durable
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
                Retour sur notre participation au workshop «&nbsp;Sustainable Digitalization&nbsp;» à BeCentral
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
        {/* Chapeau : mis en avant par rapport au corps de texte, comme l'accroche
            que reprend la liste des articles et les partages sur les reseaux. */}
        <p
          className="mb-8 border-l-4 pl-5 text-[#003300]"
          style={{
            borderColor: '#BBCB2E',
            fontWeight: 500,
            fontSize: 'clamp(16px, 1.45vw, 20px)',
            lineHeight: '1.6em',
          }}
        >
          Une digitalisation durable au cœur des échanges.
        </p>

        <Paragraph>
          Le vendredi 29 août 2025, j&apos;ai eu l&apos;occasion de participer au workshop
          «&nbsp;Sustainable Digitalization&nbsp;» organisé à BeCentral, Cantersteen 10-12 à Bruxelles.
          L&apos;événement s&apos;est tenu au 4<sup>e</sup> étage, dans la salle Paul Otlet, un lieu emblématique situé
          juste au-dessus de la gare Centrale, véritable carrefour de l&apos;innovation digitale en Belgique.
        </Paragraph>

        <SectionTitle>Un rendez-vous autour de la digitalisation durable</SectionTitle>
        <Paragraph>
          Pendant plus de deux heures, de 14h à 16h30, les discussions ont porté sur un sujet crucial pour l&apos;avenir
          des entreprises et des organisations&nbsp;: comment envisager une digitalisation durable qui conjugue
          performance, inclusion et responsabilité&nbsp;?
        </Paragraph>
        <Paragraph>
          Être participante à ce workshop m&apos;a permis de découvrir des approches nouvelles, de partager des
          expériences et de réfléchir avec d&apos;autres professionnels aux opportunités qu&apos;offre une
          transformation numérique responsable.
        </Paragraph>

        <SectionTitle>Ce que je retiens de cette expérience</SectionTitle>
        <Paragraph>Trois points m&apos;ont particulièrement marquée&nbsp;:</Paragraph>
        <ul
          className="mb-5 ml-5 list-disc text-[#003300]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          <li className="mb-2">
            La digitalisation ne doit pas se réduire à l&apos;adoption d&apos;outils&nbsp;: elle doit s&apos;inscrire
            dans une vision globale et durable.
          </li>
          <li className="mb-2">
            L&apos;humain reste au cœur de cette transformation. Les compétences, la formation et l&apos;accompagnement
            sont essentiels.
          </li>
          <li>
            La durabilité numérique implique aussi de penser sobriété, optimisation des ressources et impact
            environnemental.
          </li>
        </ul>

        <SectionTitle>Une étape dans un parcours plus large</SectionTitle>
        <Paragraph>
          Ce workshop a été une véritable source d&apos;inspiration et de réflexion. Il ne s&apos;agit pas d&apos;un
          point final, mais d&apos;une étape dans un mouvement plus large&nbsp;: celui d&apos;un numérique plus sobre,
          inclusif et durable.
        </Paragraph>
        <Paragraph>
          En tant que participante, je repars enrichie d&apos;idées et d&apos;outils que je compte intégrer dans mes
          propres projets.
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

      <PillarBridge pillar="belgique" />

      <FooterWithCta />
    </main>
  );
}
