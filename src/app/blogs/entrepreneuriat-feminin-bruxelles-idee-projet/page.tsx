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

const TITLE = "Entrepreneuriat féminin à Bruxelles : de l'idée au projet concret";
/* Titre court pour l'onglet et Google, qui tronque au-dela d'environ
   60 caracteres. Le titre complet reste le h1 et le titre Open Graph. */
const SEO_TITLE = "Entrepreneuriat féminin à Bruxelles";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description:
    "Deux journées dédiées aux femmes souhaitant transformer une idée en projet d'entreprise à Bruxelles : tester son concept, cibler son public, découvrir les aides et apprendre à pitcher.",
  alternates: alternatesFor('/blogs/entrepreneuriat-feminin-bruxelles-idee-projet'),
  openGraph: {
    images: ['/optimized/entrepreneuriat-feminin-cover.jpeg'],
    title: TITLE,
    description:
      "Une idée, même floue, peut devenir un véritable projet entrepreneurial lorsqu'elle est bien accompagnée. Retour d'expérience sur deux journées à Bruxelles.",
    url: 'https://rnj-advisory.be/blogs/entrepreneuriat-feminin-bruxelles-idee-projet',
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

export default function EntrepreneuriatFemininPage() {
  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>
      <ArticleStructuredData slug="entrepreneuriat-feminin-bruxelles-idee-projet" />

      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Blogs', item: 'https://rnj-advisory.be/blogs' },
          { name: TITLE, item: 'https://rnj-advisory.be/blogs/entrepreneuriat-feminin-bruxelles-idee-projet' },
        ]}
      />

      <Navbar glass />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[52vw] max-h-[680px] min-h-[320px] w-full">
          <Image
            src="/optimized/entrepreneuriat-feminin-cover.jpeg"
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
                Formation
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
                Entrepreneuriat féminin à Bruxelles&nbsp;: de l&apos;idée au projet concret
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
          Les 22 et 23 mars, j&apos;ai eu l&apos;opportunité de participer à deux journées 100&nbsp;% gratuites,
          dédiées aux femmes souhaitant transformer une idée en projet d&apos;entreprise concret à Bruxelles.
        </Paragraph>
        <Paragraph>
          Ces deux jours ont été riches en échanges, en apprentissages et en déclics. Ils rappellent une chose
          essentielle&nbsp;:
        </Paragraph>
        <Bullets>
          <li className="mb-2">
            Il n&apos;est pas nécessaire d&apos;avoir un projet parfaitement ficelé pour se lancer&nbsp;;
          </li>
          <li>
            Une idée, même floue, peut devenir un véritable projet entrepreneurial lorsqu&apos;elle est bien
            accompagnée.
          </li>
        </Bullets>

        <SectionTitle>Entrepreneuriat féminin à Bruxelles&nbsp;: une idée suffit pour commencer</SectionTitle>
        <Paragraph>Beaucoup de femmes pensent qu&apos;il faut&nbsp;:</Paragraph>
        <Bullets>
          <li className="mb-2">un business plan complet&nbsp;;</li>
          <li className="mb-2">un financement déjà sécurisé&nbsp;;</li>
          <li>ou une vision très claire de son offre&nbsp;;</li>
        </Bullets>
        <Paragraph>avant d&apos;oser entreprendre.</Paragraph>
        <Paragraph>En réalité, ces journées ont démontré l&apos;inverse.</Paragraph>
        <Paragraph>
          Une envie, une intuition ou une problématique vécue peuvent être le point de départ d&apos;un projet solide.
        </Paragraph>
        <Paragraph>
          À Bruxelles, l&apos;écosystème entrepreneurial offre de nombreuses opportunités aux femmes entrepreneures, à
          condition d&apos;être bien orientée et bien entourée.
        </Paragraph>

        <SectionTitle>Deux journées pour structurer son projet d&apos;entreprise</SectionTitle>
        <Paragraph>
          Pendant ces deux jours, les participantes ont travaillé concrètement sur leur projet, avec des outils
          pratiques et accessibles.
        </Paragraph>

        <SubTitle>Tester son concept et valider son idée</SubTitle>
        <Paragraph>
          Les participantes ont appris à confronter leur idée à la réalité du terrain, à recueillir les premiers retours
          clients et à ajuster leur proposition de valeur.
        </Paragraph>

        <SubTitle>Identifier son public cible</SubTitle>
        <Paragraph>
          Comprendre à qui l&apos;on s&apos;adresse est une étape clé. Ces journées ont permis de mieux cerner son
          public, ses besoins réels et les solutions à apporter.
        </Paragraph>

        <SubTitle>Découvrir les aides et programmes à Bruxelles</SubTitle>
        <Paragraph>
          Un panorama clair des organismes et dispositifs dédiés à l&apos;entrepreneuriat féminin à Bruxelles a été
          présenté, facilitant l&apos;accès à l&apos;information et aux bons interlocuteurs.
        </Paragraph>

        <SubTitle>Apprendre à pitcher et financer son projet</SubTitle>
        <Paragraph>
          Les participantes ont travaillé leur pitch entrepreneurial, gagné en clarté et en confiance, tout en
          découvrant les différentes options de financement disponibles à Bruxelles.
        </Paragraph>

        <SectionTitle>Pourquoi l&apos;accompagnement est clé pour les femmes entrepreneures</SectionTitle>
        <Paragraph>Entreprendre peut parfois être synonyme de solitude, surtout au début.</Paragraph>
        <Paragraph>Ces deux journées ont mis en lumière l&apos;importance&nbsp;:</Paragraph>
        <Bullets>
          <li className="mb-2">d&apos;un cadre structurant&nbsp;;</li>
          <li className="mb-2">d&apos;un accompagnement humain et bienveillant&nbsp;;</li>
          <li>et de la force du collectif.</li>
        </Bullets>
        <Paragraph>Être accompagnée permet de&nbsp;:</Paragraph>
        <Bullets>
          <li className="mb-2">gagner du temps&nbsp;;</li>
          <li className="mb-2">éviter certaines erreurs&nbsp;;</li>
          <li className="mb-2">prendre du recul&nbsp;;</li>
          <li>et surtout… oser croire en son potentiel.</li>
        </Bullets>

        <SectionTitle>Mon retour d&apos;expérience</SectionTitle>
        <Paragraph>
          Ce que je retiens de ces deux journées, c&apos;est la richesse des échanges et la diversité des profils.
        </Paragraph>
        <Paragraph>
          Des femmes aux parcours différents, mais avec un point commun&nbsp;: l&apos;envie de créer un projet qui a du
          sens.
        </Paragraph>
        <Paragraph>
          Ces initiatives sont essentielles pour rendre l&apos;entrepreneuriat féminin à Bruxelles plus accessible, plus
          humain et plus concret.
        </Paragraph>
        <Paragraph>
          C&apos;est aussi cette vision que je porte à travers RNJ Advisory&nbsp;: accompagner les femmes entrepreneures
          dans la structuration, la création et le développement de leur activité, avec clarté et méthode.
        </Paragraph>

        <SectionTitle>Et si votre idée devenait votre projet&nbsp;?</SectionTitle>
        <Paragraph>Ces deux journées ne sont pas une finalité, mais un véritable point de départ.</Paragraph>
        <Paragraph>Un premier pas vers l&apos;action, la structuration et l&apos;autonomie entrepreneuriale.</Paragraph>
        <p
          className="mb-5 border-l-4 pl-5 text-[#003300]"
          style={{
            borderColor: '#BBCB2E',
            fontWeight: 600,
            fontSize: 'clamp(16px, 1.45vw, 20px)',
            lineHeight: '1.6em',
          }}
        >
          Une idée + un accompagnement adapté = un projet possible.
        </p>
        <Paragraph>
          Si vous portez une idée, même embryonnaire, elle mérite d&apos;être explorée et structurée.
        </Paragraph>

        <SectionTitle>Besoin d&apos;un accompagnement pour votre projet&nbsp;?</SectionTitle>
        <Paragraph>Chez RNJ Advisory, j&apos;accompagne les femmes entrepreneures à Bruxelles dans&nbsp;:</Paragraph>
        <Bullets>
          <li className="mb-2">la clarification de leur idée&nbsp;;</li>
          <li className="mb-2">la structuration de leur projet&nbsp;;</li>
          <li className="mb-2">le passage à l&apos;action&nbsp;;</li>
          <li>et le développement d&apos;une activité viable et alignée.</li>
        </Bullets>
        <Paragraph>Vous avez une idée et souhaitez la transformer en projet concret&nbsp;?</Paragraph>
        <Paragraph>Contactez-moi pour un premier échange et avançons ensemble.</Paragraph>

        <p
          className="mt-8 text-[#003300]"
          style={{ fontWeight: 500, fontSize: 'clamp(13px, 1.15vw, 15px)', lineHeight: '1.9em', opacity: 0.55 }}
        >
          #EntrepreneuriatFémininBruxelles #CréerSonEntrepriseÀBruxelles #FemmesEntrepreneures
          #AccompagnementEntrepreneurial #ProjetDEntrepriseFemmes #PitchEntrepreneurial #FinancementBruxelles
        </p>

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
