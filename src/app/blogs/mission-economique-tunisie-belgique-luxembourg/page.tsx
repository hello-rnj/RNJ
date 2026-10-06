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
  'Retour sur la mission économique Tunisie – Belgique – Luxembourg : RNJ Advisory au cœur des échanges';
/* Titre court pour l'onglet et Google, qui tronque au-dela d'environ
   60 caracteres. Le titre complet reste le h1 et le titre Open Graph. */
const SEO_TITLE = "Mission économique Tunisie–Belgique";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description:
    "Les 12 et 13 novembre 2025, une délégation d'hommes d'affaires tunisiens a été accueillie à Bruxelles puis au Luxembourg pour une mission économique organisée sous l'égide de la CCTBL.",
  alternates: alternatesFor('/blogs/mission-economique-tunisie-belgique-luxembourg'),
  openGraph: {
    images: ['/optimized/73d63901-1e1d-4ddd-861d-6e617b9465a2.jpeg'],
    title: TITLE,
    description:
      "Mission économique Tunisie – Belgique – Luxembourg des 12 et 13 novembre 2025, organisée sous l'égide de la Chambre de Commerce Tuniso-Belgo-Luxembourgeoise.",
    url: 'https://rnj-advisory.be/blogs/mission-economique-tunisie-belgique-luxembourg',
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

export default function MissionEconomiquePage() {
  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>
      <ArticleStructuredData slug="mission-economique-tunisie-belgique-luxembourg" />

      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Blogs', item: 'https://rnj-advisory.be/blogs' },
          { name: TITLE, item: 'https://rnj-advisory.be/blogs/mission-economique-tunisie-belgique-luxembourg' },
        ]}
      />

      <Navbar glass />

      {/* ── HERO ─────────────────────────────────────────────────────────
          L'image fournie fait 1512x1016 (ratio 1.49). On la laisse en
          object-cover sur une hauteur qui suit la largeur d'ecran, pour
          qu'elle ne soit jamais agrandie au-dela de sa taille native. */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[52vw] max-h-[680px] min-h-[320px] w-full">
          <Image
            src="/optimized/pexels-mike-jones-9052296%202.png"
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
                Mission économique
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
                Retour sur la mission économique Tunisie – Belgique – Luxembourg : RNJ Advisory au cœur des échanges
              </h1>
              <p className="mt-4 text-white/70" style={{ fontWeight: 500, fontSize: 'clamp(13px, 1.2vw, 17px)' }}>
                12 et 13 novembre 2025 — Bruxelles &amp; Luxembourg
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE ──────────────────────────────────────────────────── */}
      <article className="mx-auto w-full max-w-[860px] px-6 py-14 sm:px-8 lg:py-20">
        <Paragraph>
          Les 12 et 13 novembre 2025, une délégation d&apos;hommes d&apos;affaires tunisiens a été accueillie à
          Bruxelles puis au Luxembourg pour une mission économique d&apos;envergure, organisée sous l&apos;égide de la
          Chambre de Commerce Tuniso-Belgo-Luxembourgeoise (CCTBL).
        </Paragraph>
        <Paragraph>
          Placée sous le slogan «&nbsp;L&apos;Europe ouvre ses portes&nbsp;», cette initiative visait à explorer de
          nouvelles opportunités d&apos;investissement pour la Tunisie et à tirer pleinement parti de l&apos;accord de
          partenariat avec l&apos;Union européenne. C&apos;est dans ce cadre que RNJ Advisory, membre actif de la CCTBL,
          a été mandaté pour organiser une journée B2B exclusive à la BECI (Brussels Enterprises Commerce &amp;
          Industry) le 12 novembre 2025.
        </Paragraph>

        <SectionTitle>Un pont économique entre les deux rives de la Méditerranée</SectionTitle>
        <Paragraph>
          La CCTBL, association sans but lucratif fondée en 1984, a pour mission de promouvoir les relations
          commerciales et les échanges économiques entre la Tunisie d&apos;une part, et la Belgique et le Luxembourg
          d&apos;autre part. Cette mission économique s&apos;est inscrite dans la continuité de cet engagement, avec un
          objectif clair&nbsp;: renforcer les relations économiques bilatérales dans des secteurs clés tels que les
          technologies de l&apos;information, les services financiers et comptables, le textile, l&apos;agroalimentaire
          et l&apos;industrie pharmaceutique.
        </Paragraph>
        <Paragraph>
          À l&apos;époque, les chiffres du commerce extérieur soulignaient déjà l&apos;importance de cette dynamique. La
          mission a permis d&apos;inverser certaines tendances et de créer de nouvelles passerelles commerciales,
          notamment avec le Luxembourg, dont les échanges avec la Tunisie restaient encore marginaux.
        </Paragraph>

        <SectionTitle>Le déroulé de la mission</SectionTitle>

        <h3
          className={`${geist.className} mb-3 mt-8 text-[#003300]`}
          style={{ fontWeight: 700, fontSize: 'clamp(17px, 1.6vw, 21px)', lineHeight: '1.3em' }}
        >
          Jour 1 – Bruxelles, à la BECI
        </h3>
        <Paragraph>
          Le 12 novembre 2025, une journée B2B exclusive a été organisée à la BECI, la Chambre de Commerce et
          d&apos;Industrie de Bruxelles. Forte de plus de 300 ans d&apos;existence, BECI représente et défend les
          intérêts de plus de 35 000 entreprises bruxelloises. Ce cadre prestigieux a offert un écrin idéal pour des
          rencontres professionnelles de haut niveau.
        </Paragraph>
        <Paragraph>Au programme de cette journée&nbsp;:</Paragraph>
        <ul className="mb-5 ml-5 list-disc text-[#003300]" style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}>
          <li>
            Rencontres B2B avec des entreprises belges dans les secteurs suivants&nbsp;:
            <ul className="ml-5 mt-1 list-[circle]">
              <li>IT &amp; digitalisation</li>
              <li>Industrie &amp; énergie</li>
              <li>Services &amp; conseil</li>
              <li>Agroalimentaire &amp; export</li>
            </ul>
          </li>
        </ul>
        <Paragraph>
          L&apos;objectif a été de créer des ponts concrets entre entrepreneurs, investisseurs et institutions des deux
          rives, et les retours des participants ont été unanimes quant à la qualité des échanges.
        </Paragraph>

        <h3
          className={`${geist.className} mb-3 mt-8 text-[#003300]`}
          style={{ fontWeight: 700, fontSize: 'clamp(17px, 1.6vw, 21px)', lineHeight: '1.3em' }}
        >
          Jour 2 – Luxembourg, en collaboration avec la Chambre de Commerce Arabe et Luxembourgeoise
        </h3>
        <Paragraph>
          Le lendemain, la délégation a poursuivi sa mission au Luxembourg, en partenariat avec la Chambre de Commerce
          Arabe et Luxembourgeoise (ABLCC). Forte de plus de 45 ans d&apos;expérience dans la promotion des échanges
          commerciaux et économiques entre le monde arabe, la Belgique et le Luxembourg, l&apos;ABLCC a mis son réseau
          et sa connaissance approfondie des réalités économiques locales au service de la délégation.
        </Paragraph>
        <Paragraph>
          Cette seconde journée a permis d&apos;explorer les spécificités du marché luxembourgeois, hub financier et
          technologique de premier plan en Europe, et d&apos;identifier de nouveaux leviers de croissance pour les
          entreprises tunisiennes.
        </Paragraph>

        <SectionTitle>Pourquoi cette mission a-t-elle marqué les esprits&nbsp;?</SectionTitle>
        <Paragraph>
          Que vous soyez dirigeant, exportateur, investisseur ou porteur de projet, cette mission a démontré toute la
          valeur des rencontres physiques et du réseautage de qualité. Elle a offert une opportunité unique de&nbsp;:
        </Paragraph>
        <ul className="mb-5 ml-5 list-disc text-[#003300]" style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}>
          <li>Rencontrer des entreprises et des investisseurs belges et luxembourgeois dans des secteurs porteurs&nbsp;;</li>
          <li>Explorer de nouveaux débouchés commerciaux et des opportunités de partenariat durable&nbsp;;</li>
          <li>
            Bénéficier d&apos;un accompagnement sur mesure de la part de RNJ Advisory, cabinet expert en stratégie,
            droit des affaires et accompagnement entrepreneurial.
          </li>
        </ul>
        <Paragraph>
          RNJ Advisory, fort de son expérience dans l&apos;accompagnement des entrepreneurs et des PME en Belgique, en
          Tunisie et à l&apos;international, a mis son expertise au service de cette mission pour transformer la
          complexité en clarté et les contraintes en leviers de croissance.
        </Paragraph>
        <Paragraph>
          La mission économique des 12 et 13 novembre 2025 à Bruxelles et Luxembourg a représenté une chance
          exceptionnelle de tisser des liens durables entre les écosystèmes entrepreneuriaux tunisien, belge et
          luxembourgeois. Dans un contexte où les échanges commerciaux entre la Tunisie et l&apos;Europe méritent
          d&apos;être constamment dynamisés, cette initiative a incarné une vision stratégique de coopération économique
          gagnant-gagnant.
        </Paragraph>
        <Paragraph>
          RNJ Advisory est fier d&apos;avoir été au cœur de ce rapprochement et continue d&apos;accompagner les
          entrepreneurs dans leur développement international, fort de l&apos;expérience acquise lors de ces rencontres.
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
