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

const TITLE =
  "Analyse de l'impact du mécanisme d'ajustement carbone aux frontières (MACF/CBAM) sur les exportations tunisiennes";
/* Titre court pour l'onglet et Google, qui tronque au-dela d'environ
   60 caracteres. Le titre complet reste le h1 et le titre Open Graph. */
const SEO_TITLE = "MACF/CBAM et exportations tunisiennes";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description:
    "Impact du MACF (CBAM) sur les exportations tunisiennes de biens et sur le projet d'exportation d'électricité vers l'Europe via la ligne ELMED : cadre juridique, secteurs concernés et obligations déclaratives.",
  alternates: alternatesFor('/blogs/macf-cbam-exportations-tunisiennes'),
  openGraph: {
    images: ['/optimized/macf-cbam-cover-v2.webp'],
    title: TITLE,
    description:
      "Cadre juridique du Règlement (UE) 2023/956, secteurs tunisiens concernés et enjeux de traçabilité pour l'électricité exportée vers l'Union européenne.",
    url: 'https://rnj-advisory.be/blogs/macf-cbam-exportations-tunisiennes',
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

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className={`${geist.className} mb-3 mt-8 text-[#003300]`}
      style={{ fontWeight: 700, fontSize: 'clamp(17px, 1.6vw, 21px)', lineHeight: '1.3em' }}
    >
      {children}
    </h3>
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

export default function MacfCbamPage() {
  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>
      <ArticleStructuredData slug="macf-cbam-exportations-tunisiennes" />

      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Blogs', item: 'https://rnj-advisory.be/blogs' },
          { name: TITLE, item: 'https://rnj-advisory.be/blogs/macf-cbam-exportations-tunisiennes' },
        ]}
      />

      <Navbar glass />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[52vw] max-h-[680px] min-h-[320px] w-full">
          <Image
            src="/optimized/macf-cbam-cover-v2.webp"
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
                Réglementation
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
                Analyse de l&apos;impact du mécanisme d&apos;ajustement carbone aux frontières (MACF/CBAM) sur les
                exportations tunisiennes
              </h1>
              <p className="mt-4 text-white/70" style={{ fontWeight: 500, fontSize: 'clamp(13px, 1.2vw, 17px)' }}>
                20 février 2026 — par RNJ Advisory
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE ──────────────────────────────────────────────────── */}
      <article className="mx-auto w-full max-w-[860px] px-6 py-14 sm:px-8 lg:py-20">
        <SectionTitle>Pourquoi cette analyse&nbsp;?</SectionTitle>
        <Paragraph>
          Cette réflexion analyse l&apos;impact potentiel du MACF sur la Tunisie, en se concentrant sur ses exportations
          de biens et son projet d&apos;exportation d&apos;électricité vers l&apos;Europe, via la ligne ELMED.
        </Paragraph>

        <SectionTitle>Qu&apos;est-ce que le MACF ou le CBAM&nbsp;?</SectionTitle>
        <Paragraph>
          Le Mécanisme d&apos;Ajustement Carbone aux Frontières (MACF), souvent désigné par son acronyme anglais CBAM
          (Carbon Border Adjustment Mechanism), est un instrument clé de la politique climatique de l&apos;Union
          européenne (UE).
        </Paragraph>
        <Paragraph>
          Son objectif principal est de prévenir la «&nbsp;fuite de carbone&nbsp;», où les entreprises pourraient
          délocaliser leur production vers des pays ayant des normes climatiques moins strictes.
        </Paragraph>

        <SectionTitle>1. Cadre juridique du MACF/CBAM</SectionTitle>
        <Paragraph>
          Le MACF est régi par le Règlement (UE) 2023/956 du Parlement européen et du Conseil du 10 mai 2023.
        </Paragraph>
        <Paragraph>
          Il impose un prix carbone sur les importations de certains produits dans l&apos;UE, correspondant au prix qui
          aurait été payé si ces produits avaient été fabriqués dans l&apos;UE sous le régime du Système d&apos;Échange
          de Quotas d&apos;Émission de l&apos;UE (SEQE/ETS).
        </Paragraph>

        <SubTitle>Base légale</SubTitle>
        <Paragraph>Le mécanisme MACF repose sur plusieurs fondements juridiques&nbsp;:</Paragraph>
        <ol
          className="mb-5 ml-5 list-decimal text-[#003300]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          <li className="mb-3">
            <strong>Droit de l&apos;Organisation Mondiale du Commerce (OMC)</strong> — l&apos;UE avance que le MACF est
            justifié en vertu de l&apos;article XX du GATT (Exceptions générales), notamment l&apos;alinéa (g) relatif à
            la conservation des ressources naturelles épuisables, et qu&apos;il ne constitue pas une discrimination
            arbitraire ou injustifiable.
          </li>
          <li className="mb-3">
            <strong>Principe de non-discrimination</strong> — le MACF applique le même traitement aux produits importés
            qu&apos;aux produits domestiques de l&apos;UE (principe du traitement national).
          </li>
          <li>
            <strong>Transparence et consultation</strong> — l&apos;UE a mis en place des phases de transition et de
            déclaration pour permettre aux pays tiers et aux opérateurs de s&apos;adapter.
          </li>
        </ol>

        <SectionTitle>2. Impact du MACF sur les exportations tunisiennes de biens</SectionTitle>

        <SubTitle>Les secteurs d&apos;exportation tunisiens concernés</SubTitle>
        <Paragraph>Pour la Tunisie, les secteurs directement concernés par le MACF&nbsp;:</Paragraph>

        {/* Le tableau defile horizontalement sur mobile plutot que de deborder
            de la page : trois colonnes de texte ne tiennent pas sous 640px. */}
        <div className="mb-6 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
          <table
            className="w-full min-w-[560px] border-collapse text-left text-[#003300]"
            style={{ fontSize: 'clamp(14px, 1.15vw, 16px)', lineHeight: '1.6em' }}
          >
            <thead>
              <tr style={{ background: 'rgba(187,203,46,0.35)' }}>
                <th className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.2)' }}>
                  Secteur
                </th>
                <th className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.2)' }}>
                  Produits typiquement concernés par le MACF
                </th>
                <th className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.2)' }}>
                  Risque juridique et financier
                </th>
              </tr>
            </thead>
            <tbody style={{ opacity: 0.85 }}>
              <tr>
                <td className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>
                  Sidérurgie / Métallurgie
                </td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>
                  Fer, acier, aluminium, produits transformés
                </td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>
                  Paiement des certificats MACF si les émissions ne sont pas compensées par une tarification carbone
                  locale
                </td>
              </tr>
              <tr>
                <td className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>
                  Engrais
                </td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>
                  Composés azotés
                </td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>
                  Nécessité de vérifier la traçabilité des émissions du processus de production
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Autres produits</td>
                <td className="px-4 py-3">Textile, plastiques (potentiellement ciblés à l&apos;avenir)</td>
                <td className="px-4 py-3">
                  Surveillance des extensions futures du champ d&apos;application du Règlement MACF
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <SubTitle>Conséquences juridiques pour les exportateurs tunisiens</SubTitle>
        <Paragraph>
          Les exportateurs tunisiens devront se conformer à des obligations déclaratives complexes durant la phase
          transitoire.
        </Paragraph>
        <ol
          className="mb-5 ml-5 list-decimal text-[#003300]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          <li className="mb-3">
            <strong>Obligation de déclaration des émissions</strong> — les importateurs européens (ou leurs
            représentants douaniers) sont tenus de déclarer les émissions intrinsèques des biens importés.
            L&apos;exportateur tunisien doit fournir ces données d&apos;émission vérifiées.
          </li>
          <li>
            <strong>Vérification et accréditation</strong> — un cadre juridique pour la vérification des émissions par
            un vérificateur accrédité est nécessaire pour garantir la fiabilité des données.
          </li>
        </ol>

        <SectionTitle>3. Impact du MACF sur l&apos;exportation d&apos;électricité vers l&apos;Europe</SectionTitle>
        <Paragraph>
          Le secteur de l&apos;électricité est explicitement inclus dans le champ d&apos;application du MACF.
        </Paragraph>

        <SubTitle>Cadre juridique de l&apos;exportation d&apos;électricité</SubTitle>
        <Paragraph>
          Les projets d&apos;interconnexion électrique entre la Tunisie et l&apos;Europe, comme le projet ELMED
          (interconnexion Tunisie-Italie), sont soumis aux règles du marché intérieur de l&apos;énergie de l&apos;UE et,
          désormais, au MACF.
        </Paragraph>

        <SubTitle>Aspects juridiques du projet ELMED</SubTitle>
        <Paragraph>
          Le projet ELMED, soutenu par l&apos;UE, vise à transférer de l&apos;électricité renouvelable tunisienne.
        </Paragraph>
        <Paragraph>
          <strong>Preuve de l&apos;origine</strong> — le défi juridique majeur est de garantir que l&apos;électricité
          exportée vers l&apos;UE via ELMED soit traçable comme étant de l&apos;électricité renouvelable à faible
          intensité carbone, afin d&apos;éviter le paiement des certificats MACF. Ceci nécessite des accords juridiques
          précis et des mécanismes de traçabilité robustes.
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
