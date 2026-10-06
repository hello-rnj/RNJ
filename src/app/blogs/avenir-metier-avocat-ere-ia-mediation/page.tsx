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

const TITLE = "L'avenir du métier d'avocat à l'ère de l'IA : défis et perspectives pour la médiation";
/* Titre court pour l'onglet et Google, qui tronque au-dela d'environ
   60 caracteres. Le titre complet reste le h1 et le titre Open Graph. */
const SEO_TITLE = "L'avocat à l'ère de l'IA et la médiation";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description:
    "Comment l'intelligence artificielle, la LegalTech et la justice prédictive transforment le métier d'avocat. Défis éthiques, confidentialité, innovation et rôle renforcé de la médiation à l'ère numérique.",
  alternates: alternatesFor('/blogs/avenir-metier-avocat-ere-ia-mediation'),
  openGraph: {
    images: ['/optimized/avenir-metier-avocat-ia-cover.webp'],
    title: TITLE,
    description:
      "Retour sur le colloque organisé par Cherchi & Devos et RNJ Advisory, accueilli par BECI : IA juridique, LegalTech, justice prédictive et médiation hybride.",
    url: 'https://rnj-advisory.be/blogs/avenir-metier-avocat-ere-ia-mediation',
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

export default function AvenirMetierAvocatPage() {
  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>
      <ArticleStructuredData slug="avenir-metier-avocat-ere-ia-mediation" />

      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Blogs', item: 'https://rnj-advisory.be/blogs' },
          { name: TITLE, item: 'https://rnj-advisory.be/blogs/avenir-metier-avocat-ere-ia-mediation' },
        ]}
      />

      <Navbar glass />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[52vw] max-h-[680px] min-h-[320px] w-full">
          <Image
            src="/optimized/avenir-metier-avocat-ia-cover.webp"
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
                Innovation juridique
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
                L&apos;avenir du métier d&apos;avocat à l&apos;ère de l&apos;IA&nbsp;: défis et perspectives pour la
                médiation
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
          Découvrez comment l&apos;intelligence artificielle, la LegalTech et la justice prédictive transforment le
          métier d&apos;avocat. Défis éthiques, confidentialité, innovation et rôle renforcé de la médiation à
          l&apos;ère numérique.
        </p>

        <Paragraph>
          Le 25 septembre, un colloque majeur intitulé «&nbsp;L&apos;avenir du métier d&apos;avocat à l&apos;ère de
          l&apos;IA – Défis et perspectives&nbsp;» a été organisé par Cherchi &amp; Devos &amp; RNJ Advisory et
          accueilli par BECI. Cette rencontre a réuni avocats et médiateurs belges et italiens pour débattre d&apos;un
          enjeu crucial&nbsp;: l&apos;impact de l&apos;intelligence artificielle juridique, de la LegalTech et de la
          justice prédictive sur la profession, ainsi que la place croissante de la médiation hybride comme outil
          stratégique dans ce nouvel écosystème.
        </Paragraph>

        <SectionTitle>Un métier en pleine mutation</SectionTitle>
        <Paragraph>
          Lors de mon intervention, j&apos;ai démontré que l&apos;intelligence artificielle juridique et la LegalTech
          transforment déjà profondément la pratique du droit. Les exemples sont concrets&nbsp;:
        </Paragraph>
        <Bullets>
          <li className="mb-2">Recherche juridique automatisée accélérée par des systèmes intelligents.</li>
          <li className="mb-2">
            Rédaction de contrats standardisés générée en quelques secondes grâce à l&apos;IA.
          </li>
          <li>
            Justice prédictive déjà expérimentée dans plusieurs pays, permettant d&apos;anticiper les décisions
            judiciaires.
          </li>
        </Bullets>
        <Paragraph>
          Ces avancées marquent une véritable révolution des métiers juridiques, obligeant les avocats à repenser leur
          rôle au-delà des tâches purement techniques.
        </Paragraph>

        <SectionTitle>De la menace à l&apos;opportunité</SectionTitle>
        <Paragraph>
          Ces évolutions soulèvent une question centrale&nbsp;: quelle est la véritable valeur ajoutée de l&apos;avocat
          si les tâches techniques peuvent être prises en charge par l&apos;IA&nbsp;?
        </Paragraph>
        <Paragraph>
          Loin d&apos;être une menace, l&apos;intelligence artificielle constitue une opportunité unique de redéfinir le
          rôle de l&apos;avocat. Celui-ci devient un <strong>avocat augmenté</strong>, qui délègue les tâches
          répétitives à l&apos;IA pour se recentrer sur ce qui fait la force de la profession&nbsp;:
        </Paragraph>
        <Bullets>
          <li className="mb-2">La stratégie juridique personnalisée&nbsp;;</li>
          <li className="mb-2">La créativité dans la défense des dossiers&nbsp;;</li>
          <li>La relation humaine et la confiance avec les clients.</li>
        </Bullets>
        <Paragraph>
          En somme, l&apos;IA permet de réaffirmer la dimension humaine et stratégique du métier, au lieu de
          l&apos;affaiblir.
        </Paragraph>

        <SectionTitle>Les défis et les perspectives</SectionTitle>
        <Paragraph>
          À l&apos;ère de la LegalTech et de l&apos;IA conversationnelle, trois défis majeurs se dessinent pour les
          avocats&nbsp;:
        </Paragraph>
        <ol
          className="mb-5 ml-5 list-decimal text-[#003300]"
          style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          <li className="mb-3">
            <strong>Éthique et gouvernance de l&apos;IA</strong> — il est essentiel de garantir la transparence
            algorithmique et de lutter contre les biais afin d&apos;éviter toute discrimination dans les décisions
            assistées par l&apos;IA.
          </li>
          <li className="mb-3">
            <strong>Confidentialité et protection des données</strong> — dans un monde numérique où circulent
            d&apos;énormes volumes de données sensibles, la sécurité juridique et le respect du RGPD sont plus que
            jamais prioritaires.
          </li>
          <li>
            <strong>Humanité et relation de confiance</strong> — même face aux systèmes juridiques intelligents et à
            l&apos;IA agentique, la relation avocat-client repose sur l&apos;écoute, la compréhension et la confiance –
            des valeurs que la technologie ne peut pas remplacer.
          </li>
        </ol>
        <Paragraph>
          En parallèle, émerge la figure de l&apos;<strong>avocat augmenté</strong>&nbsp;: un professionnel qui
          s&apos;appuie sur l&apos;IA pour automatiser les tâches techniques, mais qui concentre son énergie sur
          l&apos;accompagnement stratégique, l&apos;innovation juridique et la créativité dans la résolution de
          conflits.
        </Paragraph>

        <SectionTitle>La médiation, un espace valorisé</SectionTitle>
        <Paragraph>C&apos;est précisément dans ce contexte que la médiation prend une valeur renforcée.</Paragraph>
        <Paragraph>
          Un conflit n&apos;est jamais seulement une affaire de droit&nbsp;: il est aussi traversé par des émotions, des
          incompréhensions et une communication rompue.
        </Paragraph>
        <Paragraph>
          L&apos;IA peut contribuer à la préparation des dossiers ou soutenir certaines étapes grâce aux plateformes
          d&apos;<em>online dispute resolution</em> (ODR), mais elle ne remplacera jamais&nbsp;:
        </Paragraph>
        <Bullets>
          <li className="mb-2">l&apos;écoute active&nbsp;;</li>
          <li className="mb-2">l&apos;empathie&nbsp;;</li>
          <li>la création d&apos;un climat de confiance qu&apos;apporte un médiateur humain.</li>
        </Bullets>
        <Paragraph>
          Dans cette logique, la <strong>médiation hybride</strong> (présentiel + outils numériques) devient un levier
          d&apos;avenir. Elle incarne la réaffirmation du rôle humain au sein d&apos;une profession juridique
          transformée, où l&apos;innovation technologique vient compléter mais jamais remplacer l&apos;intervention
          humaine.
        </Paragraph>

        <SectionTitle>Conclusion</SectionTitle>
        <Paragraph>
          Cet événement a montré que l&apos;intelligence artificielle juridique et la LegalTech ne doivent pas être vues
          comme des menaces, mais comme des catalyseurs d&apos;innovation. Elles ouvrent la voie à une transformation
          profonde de la profession, dans laquelle l&apos;avocat devient un acteur stratégique et humain, soutenu par
          des outils puissants.
        </Paragraph>
        <Paragraph>
          Chez RNJ Advisory, nous sommes convaincus que l&apos;avenir du métier d&apos;avocat repose sur une alliance
          entre innovation technologique et humanité. La médiation illustre parfaitement ce nouveau modèle&nbsp;: un
          processus centré sur la confiance et la relation humaine, enrichi mais jamais remplacé par les outils
          numériques.
        </Paragraph>

        <p
          className="mt-8 text-[#003300]"
          style={{ fontWeight: 500, fontSize: 'clamp(13px, 1.15vw, 15px)', lineHeight: '1.9em', opacity: 0.55 }}
        >
          #IntelligenceArtificielle #LegalTech #FutureOfLaw #Médiation #AvocatAugmenté #JusticePrédictive
          #InnovationJuridique #LegalInnovation #ConfianceNumérique #RNJAdvisory #BECI
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
