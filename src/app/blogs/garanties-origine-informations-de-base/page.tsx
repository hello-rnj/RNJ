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

const TITLE = "Informations de base sur les garanties d'origine (GO)";
/* Titre court pour l'onglet et Google, qui tronque au-dela d'environ
   60 caracteres. Le titre complet reste le h1 et le titre Open Graph. */
const SEO_TITLE = "Les garanties d'origine (GO) expliquées";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description:
    "Définition, cadre légal en Tunisie et dans l'Union européenne (RED II, directive 2012/27/UE), fonctions, effet juridique et régime de commercialisation des garanties d'origine.",
  alternates: { canonical: '/blogs/garanties-origine-informations-de-base' },
  openGraph: {
    images: ['/optimized/images-header-articles-1084-x-585-px-19.jpg'],
    title: TITLE,
    description:
      "La garantie d'origine, preuve légale qu'une quantité d'électricité a été produite à partir de sources renouvelables : cadre juridique et fonctionnement.",
    url: 'https://rnj-advisory.be/blogs/garanties-origine-informations-de-base',
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

export default function GarantiesOriginePage() {
  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>
      <ArticleStructuredData slug="garanties-origine-informations-de-base" />

      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Blogs', item: 'https://rnj-advisory.be/blogs' },
          { name: TITLE, item: 'https://rnj-advisory.be/blogs/garanties-origine-informations-de-base' },
        ]}
      />

      <Navbar glass />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[52vw] max-h-[680px] min-h-[320px] w-full">
          <Image
            src="/optimized/images-header-articles-1084-x-585-px-19.jpg"
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
                Informations de base sur les garanties d&apos;origine (GO)
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
        <SectionTitle>1. Les garanties d&apos;origine (GO)</SectionTitle>

        <SubTitle>Définition</SubTitle>
        <Paragraph>
          La garantie d&apos;origine est un instrument électronique et négociable, conférant la preuve légale et
          incontestable qu&apos;une quantité déterminée d&apos;électricité a été produite exclusivement à partir de
          sources d&apos;énergies renouvelables, conformément aux dispositions réglementaires applicables.
        </Paragraph>
        <Paragraph>
          Le mécanisme des garanties d&apos;origine peut être étendu au gaz produit à partir de sources renouvelables,
          sous réserve de l&apos;établissement d&apos;un cadre normatif spécifique.
        </Paragraph>

        <SectionTitle>2. Cadre légal</SectionTitle>

        <SubTitle>En Tunisie</SubTitle>
        <Paragraph>
          À ce jour, le dispositif des garanties d&apos;origine ne bénéficie pas d&apos;un cadre législatif ou
          réglementaire explicite régissant son institution, son fonctionnement et sa reconnaissance juridique.
        </Paragraph>

        <SubTitle>En Union européenne</SubTitle>
        <Paragraph>
          Le régime des garanties d&apos;origine (GO) est un mécanisme clé du marché européen de l&apos;énergie,
          essentiel pour assurer la traçabilité de l&apos;électricité produite à partir de sources renouvelables et de
          la cogénération à haut rendement.
        </Paragraph>
        <Paragraph>
          Le socle juridique actuel des garanties d&apos;origine est principalement établi par le droit de l&apos;Union
          européenne.
        </Paragraph>

        <SubTitle>La directive (UE) 2018/2001 (RED II)</SubTitle>
        <Paragraph>
          Cette directive confère aux garanties d&apos;origine le rôle de preuve unique pour attester de la part ou de
          la quantité d&apos;énergie produite à partir de sources renouvelables (éolien, solaire, hydraulique, biomasse,
          etc.) pour un producteur donné.
        </Paragraph>
        <Paragraph>
          La RED II harmonise les règles relatives à l&apos;émission, au transfert et à l&apos;annulation des GO,
          garantissant ainsi leur reconnaissance mutuelle et leur fiabilité sur l&apos;ensemble du marché intérieur.
        </Paragraph>

        <SubTitle>La directive 2012/27/UE (efficacité énergétique)</SubTitle>
        <Paragraph>
          Historiquement, cette directive a joué un rôle important en étendant le concept de la garantie d&apos;origine
          à l&apos;électricité issue de la cogénération à haut rendement. Ce régime visait à promouvoir
          l&apos;efficacité énergétique en certifiant que l&apos;électricité était produite simultanément à la chaleur
          utile (vapeur, eau chaude, etc.), avec une performance supérieure aux productions séparées.
        </Paragraph>
        <Paragraph>
          Bien que la RED II se concentre sur les renouvelables, l&apos;intégration des GO de cogénération dans le
          système a posé les bases d&apos;un mécanisme de traçabilité énergétique plus large.
        </Paragraph>

        <SectionTitle>3. Fonction et objectifs des garanties d&apos;origine</SectionTitle>
        <Paragraph>Les garanties d&apos;origine remplissent plusieurs fonctions essentielles&nbsp;:</Paragraph>
        <ul
          className="mb-5 ml-5 list-disc text-[#003300]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          <li className="mb-3">
            <strong>Transparence pour le consommateur</strong> — elles permettent aux fournisseurs d&apos;énergie de
            prouver à leurs clients la part et l&apos;origine de l&apos;énergie qu&apos;ils achètent, notamment
            lorsqu&apos;ils proposent des offres «&nbsp;vertes&nbsp;» ou basées sur la cogénération. Cela facilite le
            choix éclairé des consommateurs et contribue à lutter contre le <em>greenwashing</em>.
          </li>
          <li className="mb-3">
            <strong>Soutien indirect au développement des ENR</strong> — bien qu&apos;elles ne soient pas un mécanisme
            de subvention directe (comme les tarifs d&apos;achat), la vente des GO constitue une source de revenus
            additionnelle pour les producteurs d&apos;énergie renouvelable et de cogénération à haut rendement.
          </li>
          <li>
            <strong>Comptabilisation nationale</strong> — elles sont utilisées par les États membres pour le suivi et le
            rapport de la quantité d&apos;énergie renouvelable consommée, afin de se conformer aux objectifs fixés par
            l&apos;Union européenne en matière de part d&apos;énergies renouvelables dans leur mix énergétique final
            brut.
          </li>
        </ul>

        <SectionTitle>4. Objet et effet juridique</SectionTitle>
        <Paragraph>
          L&apos;objet principal des GO est d&apos;assurer la traçabilité de l&apos;électricité renouvelable. Elles
          constituent un mécanisme permettant la surveillance du flux d&apos;électricité sur le marché, depuis
          l&apos;entité de production jusqu&apos;au consommateur final, garantissant l&apos;absence de double
          comptabilisation.
        </Paragraph>
        <Paragraph>
          Elles confèrent au détenteur le droit de prouver au consommateur final que la quantité d&apos;électricité
          correspondante a été produite à partir de sources d&apos;énergie renouvelable.
        </Paragraph>

        <SectionTitle>5. Régime de commercialisation des garanties d&apos;origine</SectionTitle>
        <Paragraph>
          Les GO sont des actifs immatériels négociables. Elles peuvent faire l&apos;objet de cession, de gré à gré ou
          via des plateformes d&apos;échange.
        </Paragraph>
        <Paragraph>
          Un fournisseur d&apos;électricité peut, par engagement contractuel exprès inclus dans ses conditions générales
          ou particulières de vente, garantir à son abonné que la consommation d&apos;électricité qui lui est facturée
          est couverte à due concurrence par un volume équivalent de garanties d&apos;origine annulées en son nom.
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
