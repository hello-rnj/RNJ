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

const TITLE = 'Analyse comparative des performances touristiques en 2025 (Maroc, Égypte, Tunisie)';
/* Titre court pour l'onglet et Google, qui tronque au-dela d'environ
   60 caracteres. Le titre complet reste le h1 et le titre Open Graph. */
const SEO_TITLE = "Tourisme 2025 : Maroc, Égypte, Tunisie";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description:
    "Maroc, Égypte et Tunisie en 2025 : nombre de touristes, recettes et dépense moyenne par visiteur. Une lecture comparée des dynamiques de marché en Afrique du Nord.",
  alternates: alternatesFor('/blogs/performances-touristiques-2025-maroc-egypte-tunisie'),
  openGraph: {
    images: ['/optimized/tourisme-2025-cover.webp'],
    title: TITLE,
    description:
      "Analyse comparée des performances touristiques 2025 du Maroc, de l'Égypte et de la Tunisie : volumes, recettes et création de valeur par touriste.",
    url: 'https://rnj-advisory.be/blogs/performances-touristiques-2025-maroc-egypte-tunisie',
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

function Bullets({ children }: { children: React.ReactNode }) {
  return (
    <ul
      className="mb-5 ml-5 list-disc text-[#003300]"
      style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
    >
      {children}
    </ul>
  );
}

export default function PerformancesTouristiquesPage() {
  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>
      <ArticleStructuredData slug="performances-touristiques-2025-maroc-egypte-tunisie" />

      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Blogs', item: 'https://rnj-advisory.be/blogs' },
          {
            name: TITLE,
            item: 'https://rnj-advisory.be/blogs/performances-touristiques-2025-maroc-egypte-tunisie',
          },
        ]}
      />

      <Navbar glass />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[52vw] max-h-[680px] min-h-[320px] w-full">
          <Image
            src="/optimized/tourisme-2025-cover.webp"
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
                Marchés
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
                Analyse comparative des performances touristiques en 2025 (Maroc, Égypte, Tunisie)
              </h1>
              <p className="mt-4 text-white/70" style={{ fontWeight: 500, fontSize: 'clamp(13px, 1.2vw, 17px)' }}>
                12 février 2026 — par RNJ Advisory
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE ──────────────────────────────────────────────────── */}
      <article className="mx-auto w-full max-w-[860px] px-6 py-14 sm:px-8 lg:py-20">
        <Paragraph>
          L&apos;année 2025 a été marquée par des performances touristiques significatives dans la région d&apos;Afrique
          du Nord, avec des chiffres clés pour le Maroc, l&apos;Égypte et la Tunisie révélant des dynamiques de marché
          contrastées.
        </Paragraph>
        <Paragraph>
          L&apos;analyse de ces données permet de mieux comprendre les forces et les faiblesses de chaque destination en
          termes d&apos;attractivité et de capacité à générer des revenus.
        </Paragraph>

        <SectionTitle>1. Maroc&nbsp;: un marché en forte croissance et une dépense moyenne solide</SectionTitle>
        <Paragraph>
          Le Maroc s&apos;est positionné comme le leader en termes de volume de visiteurs et de recettes globales dans
          le Maghreb pour l&apos;année 2025.
        </Paragraph>
        <Bullets>
          <li className="mb-2">
            <strong>Nombre de touristes accueillis</strong> — le Maroc a accueilli 19,8 millions de touristes, un
            chiffre qui témoigne de l&apos;efficacité de sa stratégie de promotion globale et de la diversification de
            son offre (culture, balnéaire, désert, montagne).
          </li>
          <li className="mb-2">
            <strong>Recettes touristiques</strong> — les dépenses totales générées par ces visiteurs se sont élevées à
            14,7 milliards de dollars. Ce montant substantiel souligne l&apos;importance du secteur dans
            l&apos;économie du pays.
          </li>
          <li>
            <strong>Dépense moyenne par touriste</strong> — estimée à 742 dollars. Cette valeur, bien
            qu&apos;inférieure à celle de l&apos;Égypte, indique une bonne capacité à retenir le touriste avec une offre
            de services de qualité (hôtels, restauration, activités culturelles et de loisirs). Ce chiffre est
            révélateur d&apos;un séjour de durée respectable ou d&apos;une propension à l&apos;achat d&apos;expériences
            sur place.
          </li>
        </Bullets>

        <SectionTitle>2. Égypte&nbsp;: le champion de la valeur ajoutée</SectionTitle>
        <Paragraph>
          L&apos;Égypte, avec son patrimoine pharaonique exceptionnel et ses destinations de plongée mondialement
          reconnues, a excellé dans sa capacité à maximiser les revenus par visiteur.
        </Paragraph>
        <Bullets>
          <li className="mb-2">
            <strong>Nombre de touristes accueillis</strong> — l&apos;Égypte a enregistré l&apos;arrivée de 19 millions
            de visiteurs, un volume très proche de celui du Maroc, confirmant son statut de poids lourd du tourisme
            régional.
          </li>
          <li className="mb-2">
            <strong>Recettes touristiques</strong> — le pays a généré 17,8 milliards de dollars de recettes, surpassant
            le Maroc malgré un nombre légèrement inférieur de touristes.
          </li>
          <li>
            <strong>Dépense moyenne par touriste</strong> — elle atteint le niveau le plus élevé de la région, estimée
            à 936 dollars. Cet indicateur fort suggère que l&apos;Égypte attire une clientèle soit plus haut de gamme,
            soit encline à des séjours plus longs, ou encore achetant des forfaits et des excursions plus onéreux,
            capitalisant sur la valeur perçue de ses sites historiques.
          </li>
        </Bullets>

        <SectionTitle>3. Tunisie&nbsp;: un potentiel de croissance à maximiser</SectionTitle>
        <Paragraph>
          La Tunisie, bien que restant une destination populaire, affiche des chiffres qui révèlent un besoin
          d&apos;amélioration en matière de génération de revenus par touriste.
        </Paragraph>
        <Bullets>
          <li className="mb-2">
            <strong>Nombre de touristes accueillis</strong> — la Tunisie a accueilli 11 millions de touristes, un
            chiffre significatif mais inférieur à ses deux voisins.
          </li>
          <li className="mb-2">
            <strong>Recettes touristiques</strong> — les recettes totales s&apos;élèvent à seulement 2,6 milliards de
            dollars. Ce faible montant par rapport au volume de visiteurs est le point d&apos;analyse le plus critique.
          </li>
          <li>
            <strong>Dépense moyenne par touriste</strong> — la plus faible des trois pays, estimée à 236 dollars. Ce
            faible niveau est probablement dû à une prédominance du tourisme de masse (formules hôtelières
            «&nbsp;tout inclus&nbsp;» à bas prix) et à une faible incitation à la consommation hors des établissements
            hôteliers, indiquant un potentiel inexploité pour le développement du tourisme d&apos;expériences et de
            l&apos;artisanat local.
          </li>
        </Bullets>

        <SectionTitle>Synthèse et enjeux</SectionTitle>
        <Paragraph>Le tableau de l&apos;année 2025 met en lumière les stratégies distinctes des pays&nbsp;:</Paragraph>

        {/* Le tableau defile horizontalement sur mobile plutot que de deborder
            de la page : quatre colonnes ne tiennent pas sous 640px. */}
        <div className="mb-6 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
          <table
            className="w-full min-w-[520px] border-collapse text-left text-[#003300]"
            style={{ fontSize: 'clamp(14px, 1.15vw, 16px)', lineHeight: '1.6em' }}
          >
            <thead>
              <tr style={{ background: 'rgba(187,203,46,0.35)' }}>
                <th className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.2)' }}>
                  Pays
                </th>
                <th className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.2)' }}>
                  Touristes (millions)
                </th>
                <th className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.2)' }}>
                  Recettes (milliards USD)
                </th>
                <th className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.2)' }}>
                  Dépense moyenne (USD)
                </th>
              </tr>
            </thead>
            <tbody style={{ opacity: 0.85 }}>
              <tr>
                <td className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>
                  Maroc
                </td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>19,8</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>14,7</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>742</td>
              </tr>
              <tr>
                <td className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>
                  Égypte
                </td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>19,0</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>17,8</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>936</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Tunisie</td>
                <td className="px-4 py-3">11,0</td>
                <td className="px-4 py-3">2,6</td>
                <td className="px-4 py-3">236</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Paragraph>
          L&apos;Égypte excelle dans la création de valeur et l&apos;attraction de touristes à forte contribution
          économique.
        </Paragraph>
        <Paragraph>
          Le Maroc parvient à combiner un volume élevé de visiteurs avec une bonne rentabilité par personne.
        </Paragraph>
        <Paragraph>
          La Tunisie détient un volume de visiteurs important mais doit impérativement se concentrer sur des stratégies
          visant à augmenter significativement la dépense moyenne de ses touristes pour maximiser l&apos;impact
          économique de son secteur touristique.
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

      <PillarBridge pillar="international" />

      <FooterWithCta />
    </main>
  );
}
