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

const TITLE = 'Webinaire : Agrivoltaïsme — cadre réglementaire, défis & opportunités';
/* Titre court pour l'onglet et Google, qui tronque au-dela d'environ
   60 caracteres. Le titre complet reste le h1 et le titre Open Graph. */
const SEO_TITLE = "Agrivoltaïsme : cadre réglementaire tunisien";

export const metadata: Metadata = {
  title: SEO_TITLE,
  description:
    "Agrivoltaïsme en Tunisie : classification des terres agricoles, zones éligibles, régimes de production de la loi n°2015-12, limites de l'autoproduction et recommandations réglementaires.",
  alternates: { canonical: '/blogs/webinaire-agrivoltaisme-cadre-reglementaire' },
  openGraph: {
    images: ['/optimized/agrivoltaisme-cover.jpg'],
    title: TITLE,
    description:
      "Concilier sécurité alimentaire et transition énergétique : analyse du cadre juridique applicable aux projets agrivoltaïques en Tunisie.",
    url: 'https://rnj-advisory.be/blogs/webinaire-agrivoltaisme-cadre-reglementaire',
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

export default function WebinaireAgrivoltaismePage() {
  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>
      <ArticleStructuredData slug="webinaire-agrivoltaisme-cadre-reglementaire" />

      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Blogs', item: 'https://rnj-advisory.be/blogs' },
          { name: TITLE, item: 'https://rnj-advisory.be/blogs/webinaire-agrivoltaisme-cadre-reglementaire' },
        ]}
      />

      <Navbar glass />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[52vw] max-h-[680px] min-h-[320px] w-full">
          <Image
            src="/optimized/agrivoltaisme-cover.jpg"
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
                Webinaire
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
                Agrivoltaïsme&nbsp;: cadre réglementaire, défis &amp; opportunités
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
        {/* Le webinaire est integre plutot que simplement lie : c'est le contenu
            principal de la publication. Ratio 16/9 pour qu'il reste responsive. */}
        <div
          className="mb-10 w-full overflow-hidden rounded-[16px]"
          style={{ aspectRatio: '16 / 9', background: 'rgba(0,51,0,0.08)' }}
        >
          <iframe
            src="https://www.youtube-nocookie.com/embed/sGo6hUVNyDQ"
            title={TITLE}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="h-full w-full border-0"
          />
        </div>

        <SectionTitle>Introduction&nbsp;: pourquoi l&apos;agrivoltaïsme devient stratégique en Tunisie</SectionTitle>
        <Paragraph>
          Face à la pression climatique, à la raréfaction de l&apos;eau et à la hausse des coûts énergétiques, la
          Tunisie explore des solutions hybrides conciliant sécurité alimentaire et transition énergétique.
          L&apos;agrivoltaïsme (AgriPV), qui combine activité agricole et production d&apos;électricité solaire sur une
          même parcelle, s&apos;impose comme une solution d&apos;avenir, à condition de respecter un cadre réglementaire
          strict.
        </Paragraph>

        <SectionTitle>1. Organisation foncière et catégories de terres agricoles en Tunisie</SectionTitle>
        <Paragraph>
          En Tunisie, le principe général est que toute terre est présumée appartenir au domaine public de l&apos;État,
          sauf celles reconnues comme propriété privée. Le législateur a instauré une classification précise des
          terrains agricoles, chacun étant soumis à un régime juridique spécifique.
        </Paragraph>
        <SubTitle>Typologie des terres agricoles</SubTitle>
        <Bullets>
          <li className="mb-2">Zones d&apos;interdiction</li>
          <li className="mb-2">Zones de sauvegarde</li>
          <li>Autres zones agricoles</li>
        </Bullets>
        <Paragraph>
          Cette classification conditionne directement la faisabilité juridique des projets agrivoltaïques.
        </Paragraph>

        <SectionTitle>2. Terres collectives&nbsp;: un frein structurel aux projets agrivoltaïques</SectionTitle>
        <Paragraph>
          Les terres collectives, principalement situées dans le sud de la Tunisie, appartiennent à des groupements de
          populations (Arouches) et sont régies par plusieurs textes législatifs et réglementaires.
        </Paragraph>
        <SubTitle>Contraintes majeures</SubTitle>
        <Bullets>
          <li className="mb-2">Gel juridique de la situation des terres collectives depuis août 2021&nbsp;;</li>
          <li className="mb-2">Litiges fréquents liés à la délimitation des terrains&nbsp;;</li>
          <li>Dysfonctionnements dans la désignation des conseils de gestion.</li>
        </Bullets>
        <Paragraph>
          En pratique, ces contraintes rendent aujourd&apos;hui les terres collectives peu adaptées au développement de
          projets agrivoltaïques structurés.
        </Paragraph>

        <SectionTitle>3. Zones agricoles éligibles à l&apos;agrivoltaïsme</SectionTitle>

        <SubTitle>Zones d&apos;interdiction</SubTitle>
        <Paragraph>
          Ces zones comprennent notamment les périmètres publics irrigués et les terres forestières relevant du domaine
          de l&apos;État. Elles sont soumises à un régime juridique très contraignant visant à préserver leur vocation
          agricole.
        </Paragraph>
        <Paragraph>
          La réalisation de projets agrivoltaïques y est interdite, à l&apos;exception des installations photovoltaïques
          sur les toitures des bâtiments.
        </Paragraph>

        <SubTitle>Zones de sauvegarde</SubTitle>
        <Paragraph>
          Les zones de sauvegarde regroupent des terres agricoles dont la vocation est protégée en raison de leur
          importance pour la production nationale. Depuis le décret-loi 2022-68, les projets de production
          d&apos;électricité à partir des énergies renouvelables peuvent y être réalisés sans procédure de changement
          d&apos;affectation des terres.
        </Paragraph>
        <Paragraph>
          Un avis préalable de non-objection du ministère en charge de l&apos;Agriculture reste toutefois obligatoire.
        </Paragraph>

        <SubTitle>Autres zones agricoles</SubTitle>
        <Paragraph>
          Cette catégorie englobe l&apos;ensemble des terres agricoles ne relevant ni des zones d&apos;interdiction ni
          des zones de sauvegarde. Les projets agrivoltaïques y sont autorisés, également sans changement
          d&apos;affectation, sous réserve de l&apos;obtention d&apos;un avis préalable des autorités compétentes.
        </Paragraph>

        <SectionTitle>
          4. Cadre réglementaire des énergies renouvelables applicable à l&apos;agrivoltaïsme
        </SectionTitle>
        <Paragraph>
          Le cadre juridique des énergies renouvelables en Tunisie repose principalement sur la loi n°2015-12, qui vise
          à encourager les investissements publics et privés dans la production d&apos;électricité verte.
        </Paragraph>
        <Paragraph>Cette loi prévoit trois régimes de production&nbsp;:</Paragraph>
        <Bullets>
          <li className="mb-2">La concession ou l&apos;autorisation pour le marché local&nbsp;;</li>
          <li className="mb-2">L&apos;autoproduction&nbsp;;</li>
          <li>L&apos;exportation.</li>
        </Bullets>
        <Paragraph>
          Le régime de l&apos;autoproduction est celui qui se rapproche le plus des projets agrivoltaïques.
        </Paragraph>

        <SectionTitle>5. L&apos;autoproduction&nbsp;: avantages et limites pour l&apos;AgriPV</SectionTitle>

        <SubTitle>Autoproduction en basse tension</SubTitle>
        <Paragraph>
          Les agriculteurs raccordés en basse tension peuvent vendre leurs excédents d&apos;électricité à la STEG selon
          le mécanisme du <em>net metering</em>. Toutefois, ces excédents ne sont pas facturés et la puissance installée
          ne peut pas dépasser la puissance souscrite auprès de la STEG, ce qui limite fortement l&apos;intérêt
          économique du dispositif.
        </Paragraph>

        <SubTitle>Autoproduction en moyenne et haute tension</SubTitle>
        <Paragraph>
          Dans ce cas, la vente d&apos;excédents est autorisée uniquement dans la limite de 30&nbsp;% de la production
          annuelle, à un tarif relativement faible. Les producteurs bénéficient du droit de transport de
          l&apos;électricité via le réseau de la STEG, mais la rentabilité reste limitée pour les exploitations
          agricoles.
        </Paragraph>

        <SubTitle>Société de projet (SPV)</SubTitle>
        <Paragraph>
          Le cadre réglementaire permet la création de sociétés de projet associant agriculteurs et développeurs ENR.
          Cependant, l&apos;exigence d&apos;une puissance souscrite minimale élevée rend ce modèle peu adapté à la
          majorité des agriculteurs.
        </Paragraph>

        <SectionTitle>6. Rentabilité économique&nbsp;: un enjeu non résolu</SectionTitle>
        <Paragraph>
          Dans sa configuration actuelle, le régime de l&apos;autoproduction ne permet pas de générer des revenus
          complémentaires significatifs pour les agriculteurs. Les plafonds de vente, les tarifs d&apos;achat faibles et
          l&apos;impossibilité de facturer certains excédents constituent des freins majeurs au déploiement massif de
          l&apos;agrivoltaïsme.
        </Paragraph>

        <SectionTitle>7. Recommandations pour favoriser le développement de l&apos;agrivoltaïsme</SectionTitle>
        <Paragraph>
          Pour faire de l&apos;agrivoltaïsme un véritable levier de développement agricole et énergétique, plusieurs
          évolutions réglementaires sont recommandées&nbsp;:
        </Paragraph>
        <Bullets>
          <li className="mb-2">Autoriser la facturation des excédents d&apos;électricité en basse tension&nbsp;;</li>
          <li className="mb-2">
            Supprimer le lien entre puissance installée et puissance souscrite pour les agriculteurs&nbsp;;
          </li>
          <li className="mb-2">Relever le plafond de vente des excédents en moyenne tension&nbsp;;</li>
          <li className="mb-2">Réviser à la hausse le tarif d&apos;achat du kWh&nbsp;;</li>
          <li>Réserver certains projets de petite et moyenne puissance aux agriculteurs.</li>
        </Bullets>

        <SectionTitle>Conclusion</SectionTitle>
        <Paragraph>
          L&apos;agrivoltaïsme en Tunisie est juridiquement possible dans les zones de sauvegarde et les autres zones
          agricoles, mais reste encadré par des règles qui limitent encore son impact économique. Une adaptation ciblée
          du cadre réglementaire permettrait de transformer cette solution en un outil stratégique au service de la
          transition énergétique et de la résilience agricole.
        </Paragraph>
        <Paragraph>
          RNJ Advisory accompagne les porteurs de projets, investisseurs et agriculteurs dans l&apos;analyse
          réglementaire, la structuration juridique et la sécurisation des projets agrivoltaïques en Tunisie.
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
