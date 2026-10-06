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
  'RGPD et transferts de données vers la Tunisie : cadre légal et bonnes pratiques';
const SEO_TITLE = 'RGPD et transferts de données vers la Tunisie';

export const metadata: Metadata = {
  title: SEO_TITLE,
  description:
    "Guide complet sur les transferts de données personnelles entre l'UE et la Tunisie : cadre RGPD, clauses contractuelles types, analyse d'impact et bonnes pratiques pour les entreprises belges et tunisiennes.",
  keywords: [
    'RGPD Tunisie',
    'transfert données personnelles Tunisie',
    'clauses contractuelles types',
    'protection données Belgique Tunisie',
    'conformité RGPD Bruxelles',
    'données personnelles pays tiers',
    'loi organique 2004-63 Tunisie',
  ],
  alternates: alternatesFor('/blogs/rgpd-transferts-donnees-tunisie'),
  openGraph: {
    images: ['/optimized/rgpd-tunisie-cover.webp'],
    title: TITLE,
    description:
      "Cadre juridique des transferts de données personnelles UE-Tunisie : RGPD, clauses contractuelles types et recommandations pour sécuriser vos flux de données.",
    url: 'https://rnj-advisory.be/blogs/rgpd-transferts-donnees-tunisie',
    type: 'article',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
};

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

export default function RgpdTunisiePage() {
  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>
      <ArticleStructuredData slug="rgpd-transferts-donnees-tunisie" />

      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Blog', item: 'https://rnj-advisory.be/blogs' },
          { name: TITLE, item: 'https://rnj-advisory.be/blogs/rgpd-transferts-donnees-tunisie' },
        ]}
      />

      <Navbar glass />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[52vw] max-h-[680px] min-h-[320px] w-full">
          <Image
            src="/optimized/rgpd-tunisie-cover.webp"
            alt="Illustration RGPD et transferts de données vers la Tunisie"
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
                Conformité RGPD
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
                RGPD et transferts de données vers la Tunisie&nbsp;: cadre légal et bonnes pratiques
              </h1>
              <p className="mt-4 text-white/70" style={{ fontWeight: 500, fontSize: 'clamp(13px, 1.2vw, 17px)' }}>
                1 septembre 2026 — par RNJ Advisory
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE ──────────────────────────────────────────────────── */}
      <article className="mx-auto w-full max-w-[860px] px-6 py-14 sm:px-8 lg:py-20">

        <SectionTitle>Introduction</SectionTitle>
        <Paragraph>
          Les échanges commerciaux entre la Belgique et la Tunisie sont en pleine croissance. De plus en plus
          d&apos;entreprises belges collaborent avec des partenaires tunisiens dans les domaines du développement
          informatique, du support client, de la comptabilité ou encore de l&apos;ingénierie. Ces collaborations
          impliquent nécessairement des transferts de données personnelles vers la Tunisie, un pays considéré
          comme «&nbsp;pays tiers&nbsp;» au sens du Règlement général sur la protection des données (RGPD).
        </Paragraph>
        <Paragraph>
          Or, la Tunisie ne bénéficie pas d&apos;une décision d&apos;adéquation de la Commission européenne.
          Chaque transfert de données personnelles vers ce pays doit donc être encadré par des garanties
          appropriées, sous peine de sanctions pouvant atteindre 20 millions d&apos;euros ou 4&nbsp;% du chiffre
          d&apos;affaires mondial.
        </Paragraph>

        <SectionTitle>1. Le cadre juridique européen&nbsp;: le RGPD</SectionTitle>

        <SubTitle>Principes applicables aux transferts hors UE</SubTitle>
        <Paragraph>
          Le chapitre V du RGPD (articles 44 à 49) encadre strictement les transferts de données personnelles
          vers des pays tiers. Trois mécanismes principaux permettent de légitimer un transfert&nbsp;:
        </Paragraph>
        <ol
          className="mb-5 ml-5 list-decimal text-[#003300]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          <li className="mb-3">
            <strong>Décision d&apos;adéquation</strong> (art. 45) — la Commission européenne reconnaît que le
            pays tiers assure un niveau de protection adéquat. Ce n&apos;est pas le cas de la Tunisie.
          </li>
          <li className="mb-3">
            <strong>Garanties appropriées</strong> (art. 46) — clauses contractuelles types (CCT), règles
            d&apos;entreprise contraignantes (BCR), codes de conduite approuvés ou certifications.
          </li>
          <li>
            <strong>Dérogations</strong> (art. 49) — consentement explicite, exécution d&apos;un contrat,
            intérêt public, etc. Ces dérogations sont d&apos;interprétation stricte et ne peuvent servir de
            base régulière.
          </li>
        </ol>

        <SubTitle>L&apos;arrêt Schrems II et ses conséquences</SubTitle>
        <Paragraph>
          Depuis l&apos;arrêt <em>Schrems II</em> (CJUE, 16 juillet 2020, C-311/18), les entreprises doivent
          réaliser une <strong>analyse d&apos;impact du transfert</strong> (Transfer Impact Assessment — TIA)
          pour vérifier que le cadre juridique du pays de destination n&apos;empêche pas le destinataire de
          respecter ses obligations contractuelles. Cette exigence s&apos;applique pleinement aux transferts
          vers la Tunisie.
        </Paragraph>

        <SectionTitle>2. Le cadre juridique tunisien&nbsp;: la loi organique n°&nbsp;2004-63</SectionTitle>
        <Paragraph>
          La Tunisie a été l&apos;un des premiers pays africains à se doter d&apos;une législation sur la
          protection des données personnelles avec la <strong>loi organique n°&nbsp;2004-63 du 27 juillet
          2004</strong> relative à la protection des données à caractère personnel.
        </Paragraph>

        <SubTitle>Principes fondamentaux</SubTitle>
        <Paragraph>
          La loi tunisienne consacre des principes proches du RGPD&nbsp;: finalité, proportionnalité,
          consentement, droit d&apos;accès, de rectification et de suppression. Elle a instauré
          l&apos;<strong>Instance Nationale de Protection des Données Personnelles (INPDP)</strong>, autorité
          indépendante chargée du contrôle de la conformité.
        </Paragraph>

        <SubTitle>Limites et différences avec le RGPD</SubTitle>
        <Paragraph>
          Malgré ces similitudes, des écarts significatifs subsistent&nbsp;:
        </Paragraph>
        <ul
          className="mb-5 ml-5 list-disc text-[#003300]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          <li className="mb-3">
            L&apos;INPDP dispose de pouvoirs de sanction limités comparés aux autorités européennes.
          </li>
          <li className="mb-3">
            La loi ne prévoit pas de mécanisme de notification obligatoire en cas de violation de données dans
            un délai de 72 heures.
          </li>
          <li className="mb-3">
            L&apos;absence de décision d&apos;adéquation reflète le constat de la Commission européenne que le
            niveau de protection tunisien n&apos;est pas «&nbsp;essentiellement équivalent&nbsp;» à celui de
            l&apos;UE.
          </li>
          <li>
            Un projet de réforme est en discussion pour aligner davantage la législation tunisienne sur les
            standards européens.
          </li>
        </ul>

        <SectionTitle>3. Les clauses contractuelles types (CCT)&nbsp;: outil privilégié</SectionTitle>
        <Paragraph>
          En l&apos;absence de décision d&apos;adéquation, les <strong>clauses contractuelles types</strong>
          adoptées par la Commission européenne (Décision d&apos;exécution 2021/914) constituent le mécanisme
          le plus utilisé pour encadrer les transferts vers la Tunisie.
        </Paragraph>

        <SubTitle>Les quatre modules des CCT</SubTitle>
        <div className="mb-6 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
          <table
            className="w-full min-w-[560px] border-collapse text-left text-[#003300]"
            style={{ fontSize: 'clamp(14px, 1.15vw, 16px)', lineHeight: '1.6em' }}
          >
            <thead>
              <tr style={{ background: 'rgba(187,203,46,0.35)' }}>
                <th className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.2)' }}>Module</th>
                <th className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.2)' }}>Relation</th>
                <th className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.2)' }}>Cas d&apos;usage courant</th>
              </tr>
            </thead>
            <tbody style={{ opacity: 0.85 }}>
              <tr>
                <td className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>Module 1</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>Responsable → Responsable</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>Filiale tunisienne d&apos;un groupe belge</td>
              </tr>
              <tr>
                <td className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>Module 2</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>Responsable → Sous-traitant</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>Externalisation IT en Tunisie</td>
              </tr>
              <tr>
                <td className="border-b px-4 py-3 font-semibold" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>Module 3</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>Sous-traitant → Sous-traitant</td>
                <td className="border-b px-4 py-3" style={{ borderColor: 'rgba(0,51,0,0.12)' }}>Chaîne de sous-traitance multi-pays</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Module 4</td>
                <td className="px-4 py-3">Sous-traitant → Responsable</td>
                <td className="px-4 py-3">Prestataire tunisien transmettant à son client UE</td>
              </tr>
            </tbody>
          </table>
        </div>

        <SubTitle>Mesures supplémentaires recommandées</SubTitle>
        <Paragraph>
          Les CCT seules ne suffisent pas toujours. Le Comité européen de la protection des données (EDPB)
          recommande d&apos;ajouter des mesures supplémentaires&nbsp;:
        </Paragraph>
        <ul
          className="mb-5 ml-5 list-disc text-[#003300]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          <li className="mb-3">
            <strong>Chiffrement de bout en bout</strong> des données en transit et au repos.
          </li>
          <li className="mb-3">
            <strong>Pseudonymisation</strong> pour limiter l&apos;impact d&apos;un accès non autorisé.
          </li>
          <li className="mb-3">
            <strong>Contrôle d&apos;accès strict</strong> — accès limité aux seules personnes nécessaires.
          </li>
          <li>
            <strong>Audit régulier</strong> du sous-traitant tunisien pour vérifier le respect des CCT.
          </li>
        </ul>

        <SectionTitle>4. Analyse d&apos;impact du transfert (TIA)&nbsp;: méthodologie</SectionTitle>
        <Paragraph>
          Pour chaque transfert vers la Tunisie, l&apos;entreprise exportatrice doit documenter&nbsp;:
        </Paragraph>
        <ol
          className="mb-5 ml-5 list-decimal text-[#003300]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          <li className="mb-3">
            <strong>La nature des données transférées</strong> — catégories, volume, sensibilité.
          </li>
          <li className="mb-3">
            <strong>Le cadre juridique tunisien applicable</strong> — loi 2004-63, pouvoirs de l&apos;INPDP,
            législation sur l&apos;accès des autorités publiques aux données.
          </li>
          <li className="mb-3">
            <strong>L&apos;évaluation du risque résiduel</strong> — après application des CCT et des mesures
            supplémentaires, le niveau de protection est-il «&nbsp;essentiellement équivalent&nbsp;»&nbsp;?
          </li>
          <li>
            <strong>La décision documentée</strong> — maintien, suspension ou renforcement des garanties.
          </li>
        </ol>

        <SectionTitle>5. Bonnes pratiques pour les entreprises belges et tunisiennes</SectionTitle>

        <SubTitle>Pour les entreprises belges (exportatrices)</SubTitle>
        <ul
          className="mb-5 ml-5 list-disc text-[#003300]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          <li className="mb-3">
            Cartographier systématiquement les flux de données vers la Tunisie.
          </li>
          <li className="mb-3">
            Intégrer les CCT dans tous les contrats avec des prestataires tunisiens.
          </li>
          <li className="mb-3">
            Réaliser et documenter une TIA avant tout nouveau transfert.
          </li>
          <li className="mb-3">
            Former les équipes internes aux obligations de conformité RGPD.
          </li>
          <li>
            Prévoir des clauses d&apos;audit dans les contrats de sous-traitance.
          </li>
        </ul>

        <SubTitle>Pour les entreprises tunisiennes (importatrices)</SubTitle>
        <ul
          className="mb-5 ml-5 list-disc text-[#003300]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          <li className="mb-3">
            Se conformer à la loi organique 2004-63 et enregistrer les traitements auprès de l&apos;INPDP.
          </li>
          <li className="mb-3">
            Mettre en place une politique de sécurité des données alignée sur les standards ISO 27001.
          </li>
          <li className="mb-3">
            Désigner un point de contact «&nbsp;protection des données&nbsp;» pour faciliter les audits européens.
          </li>
          <li>
            Anticiper la réforme législative en cours en adoptant dès maintenant les standards RGPD.
          </li>
        </ul>

        <SectionTitle>Conclusion</SectionTitle>
        <Paragraph>
          Les transferts de données personnelles entre la Belgique et la Tunisie sont juridiquement possibles, à
          condition de mettre en œuvre des garanties appropriées. Les clauses contractuelles types, complétées par
          des mesures techniques et organisationnelles, constituent le socle de cette conformité.
        </Paragraph>
        <Paragraph>
          L&apos;évolution attendue du cadre législatif tunisien pourrait, à terme, rapprocher les deux systèmes
          et faciliter les échanges. En attendant, chaque entreprise doit structurer ses transferts avec rigueur
          pour protéger les droits des personnes concernées et éviter les sanctions.
        </Paragraph>

        <p
          className={`${ebGaramond.className} mt-12 border-t pt-8 text-[#003300]`}
          style={{ borderColor: 'rgba(0,51,0,0.2)', fontWeight: 500, fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: '1.4em' }}
        >
          RNJ Advisory accompagne les entreprises belges et tunisiennes dans la mise en conformité RGPD de
          leurs transferts de données internationaux.{' '}
          <Link href="/contact" className="underline underline-offset-4" style={{ color: '#BBCB2E' }}>
            Contactez-nous
          </Link>{' '}
          pour un cadrage personnalisé.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact?subject=RGPD+transferts+Tunisie"
            className="flex h-[46px] items-center justify-center rounded-full px-7 font-semibold"
            style={{ background: '#BBCB2E', color: '#003300', fontSize: '14px' }}
          >
            Demander un cadrage RGPD
          </Link>
          <Link
            href="/services/conseil-juridique"
            className="flex h-[46px] items-center justify-center rounded-full border px-7 font-semibold"
            style={{ borderColor: '#003300', color: '#003300', fontSize: '14px' }}
          >
            Nos services juridiques
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
