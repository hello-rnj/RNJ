import Link from 'next/link';
import { EB_Garamond, Geist } from 'next/font/google';

const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['600', '700'], display: 'swap' });
const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });

/* Fiches projets rendues cote serveur.
   La carte interactive porte deja 91 references, mais leur texte vit dans des
   popups : il n'apparait pas dans le HTML initial et ne compte donc ni pour le
   ratio texte/code ni pour l'indexation. Ces trois etudes de cas remettent du
   contenu indexable dans la page, sous la carte avec laquelle elles vivent
   desormais sur une seule URL, /expertises.

   Les faits proviennent des missions reellement listees dans les donnees de la
   carte : aucun chiffre de resultat n'est invente, la rubrique « Resultats »
   n'enonce que les livrables effectivement produits. */
type CaseStudy = {
  id: string;
  title: string;
  client: string;
  place: string;
  year: string;
  expertise: string;
  /** Omis quand l'expertise citee est celle de la page hote. */
  expertiseHref?: string;
  contexte: string;
  mission: string;
  resultats: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'elmed-cadre-reglementaire',
    title: 'Cadre réglementaire du projet Elmed et création d’une autorité de régulation',
    client: 'Ministère de l’Industrie, des Mines et des Énergies renouvelables (Tunisie) / EBRD',
    place: 'Tunisie',
    year: '2025',
    expertise: 'Analyse institutionnelle et réglementaire',
    contexte:
      "Le projet Elmed relie les réseaux électriques tunisien et italien et ouvre la voie à l’export d’électricité renouvelable vers le marché européen. Une interconnexion de cette ampleur suppose un cadre réglementaire capable d’encadrer l’accès au réseau, les conditions d’export et la surveillance du marché — trois éléments que le droit tunisien de l’électricité ne couvrait pas encore de manière complète, en l’absence d’autorité de régulation sectorielle pleinement opérationnelle.",
    mission:
      "RNJ Advisory a conduit l’étude juridique destinée à mettre en place un cadre réglementaire propice à la promotion du projet et à l’installation d’une autorité de régulation. Le travail a couvert l’analyse du cadre réglementaire tunisien applicable au secteur de l’électricité, et plus particulièrement aux énergies renouvelables, l’actualisation des textes relatifs à la création de l’autorité de régulation, puis l’identification des adaptations contractuelles nécessaires à l’export d’électricité via la ligne Elmed.",
    resultats:
      "La mission a débouché sur des propositions de modifications du cadre légal en vigueur, des textes réglementaires actualisés pour la création de l’autorité de régulation, et un cadre contractuel d’export documenté à l’intention du ministère et de la BERD. Une mission de cette nature suppose d’articuler droit de l’énergie, droit administratif et pratique des bailleurs multilatéraux, sur un dossier où le calendrier réglementaire conditionne directement le calendrier d’investissement.",
  },
  {
    id: 'certificats-garanties-origine',
    title: 'Certificats d’attribut d’énergie et garanties d’origine',
    client: 'Ministère de l’Industrie, des Mines et des Énergies renouvelables / EBRD',
    place: 'Tunisie',
    year: '2025',
    expertise: 'Conseil juridique et réglementaire',
    expertiseHref: '/services/conseil-juridique',
    contexte:
      "Les garanties d’origine permettent de tracer l’électricité renouvelable et de la valoriser auprès d’acheteurs soumis à des obligations de reporting environnemental. Pour les industriels exportateurs, elles deviennent un enjeu commercial direct : les mécanismes européens, à commencer par le MACF, demandent une preuve documentée du contenu carbone. Encore faut-il qu’un cadre national organise l’émission, le transfert et l’annulation de ces certificats.",
    mission:
      "RNJ Advisory a réalisé l’étude juridique de mise en place d’un cadre réglementaire applicable à l’émission des certificats d’attribut d’énergie et des garanties d’origine pour l’électricité d’origine renouvelable. La mission a comporté l’analyse du cadre réglementaire tunisien existant, l’identification des parties prenantes et la définition précise du rôle de chacune, puis la proposition d’un cadre institutionnel adapté à l’émission de certificats verts.",
    resultats:
      "Les textes réglementaires requis pour la mise en œuvre du dispositif ont été préparés, accompagnés d’un schéma institutionnel attribuant à chaque acteur — administration, gestionnaire de réseau, producteurs — un rôle défini dans la chaîne d’émission et de contrôle des certificats. Pour les producteurs comme pour les industriels exportateurs, ce cadre conditionne la valorisation commerciale de l’électricité renouvelable et la traçabilité que leurs clients européens sont désormais tenus de documenter.",
  },
  {
    id: 'mecanisme-garantie-paiement',
    title: 'Mécanisme de garantie de paiement pour les producteurs privés d’électricité',
    client: 'KfW, pour le compte de la STEG',
    place: 'Tunisie',
    year: '2021',
    expertise: 'Structuration juridique et financement de projets',
    expertiseHref: '/services/conseil-juridique',
    contexte:
      "Le risque de contrepartie de l’acheteur public est l’un des principaux freins au financement des projets renouvelables : sans garantie de paiement, les producteurs privés et leurs prêteurs peinent à boucler un plan de financement, quel que soit le régime — autorisation ou concession. La mise en place d’un mécanisme de garantie adossé à des comptes séquestres suppose de vérifier que le droit national en permet la constitution et la gestion.",
    mission:
      "RNJ Advisory est intervenu comme conseil de la KfW pour la mise en place d’un mécanisme de financement destiné à servir de garantie de paiement des producteurs privés d’électricité renouvelable. La mission a porté sur l’étude du cadre réglementaire tunisien applicable à la constitution et à la gestion des comptes séquestres, puis sur la revue de la structure contractuelle habituellement retenue pour ce type de transaction.",
    resultats:
      "La structure contractuelle a été revue et modifiée pour tenir compte des contraintes de droit local identifiées, offrant au bailleur et à l’acheteur public une architecture de garantie exploitable dans les régimes d’autorisation comme de concession. La mission illustre un principe constant de nos interventions : une garantie n’a de valeur que si le droit national en autorise réellement la constitution, la gestion et l’exécution.",
  },
] as const;

export default function ProjetsEditorial() {
  return (
    <section
      id="etudes-de-cas"
      className="w-full scroll-mt-28 bg-[#F7FCFF] px-6 py-16 sm:px-10 md:py-20 lg:px-[84px]"
    >
      <div className="mx-auto max-w-[980px]">
        <h2
          className={`${ebGaramond.className} mb-6 text-[#003300]`}
          style={{ fontWeight: 600, fontSize: 'clamp(28px, 3.4vw, 40px)', lineHeight: '1.12em' }}
        >
          Études de cas : comment nous sécurisons les projets d’infrastructure et d’énergie
        </h2>

        <p
          className={`${geist.className} mb-4 text-[#003300]`}
          style={{ fontWeight: 400, fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          RNJ Advisory intervient depuis plus de trente ans auprès de ministères, d’agences
          publiques, de bailleurs de fonds internationaux et d’industriels sur des projets
          d’énergie, d’infrastructure et de développement économique en Belgique, en Europe,
          en Tunisie et en Afrique. Nos missions portent sur le cadre réglementaire, la
          structuration contractuelle et l’analyse institutionnelle : trois leviers qui
          déterminent la faisabilité réelle d’un projet, bien avant sa mise en œuvre technique.
        </p>

        <p
          className={`${geist.className} mb-12 text-[#003300]`}
          style={{ fontWeight: 400, fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
        >
          La carte ci-dessus recense l’ensemble de nos références par pays. Les trois missions
          détaillées ci-dessous illustrent notre méthode de travail, du cadrage initial à la
          remise des livrables.
        </p>

        <div className="flex flex-col gap-12">
          {CASE_STUDIES.map((study) => (
            <article key={study.id} id={study.id} className="scroll-mt-28">
              <h3
                className={`${ebGaramond.className} mb-3 text-[#003300]`}
                style={{ fontWeight: 600, fontSize: 'clamp(21px, 2.3vw, 28px)', lineHeight: '1.2em' }}
              >
                {study.title}
              </h3>

              <dl
                className={`${geist.className} mb-5 flex flex-wrap gap-x-6 gap-y-1 text-[#003300]`}
                style={{ fontSize: '14px', lineHeight: '1.6em', opacity: 0.7 }}
              >
                <div className="flex gap-2">
                  <dt className="font-semibold">Client</dt>
                  <dd>{study.client}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold">Pays</dt>
                  <dd>{study.place}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold">Année</dt>
                  <dd>{study.year}</dd>
                </div>
              </dl>

              {(
                [
                  ['Contexte', study.contexte],
                  ['Mission', study.mission],
                  ['Résultats', study.resultats],
                ] as const
              ).map(([label, body]) => (
                <p
                  key={label}
                  className={`${geist.className} mb-4 text-[#003300]`}
                  style={{ fontWeight: 400, fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: '1.7em', opacity: 0.85 }}
                >
                  <strong className="font-semibold" style={{ opacity: 1 }}>
                    {label} —{' '}
                  </strong>
                  {body}
                </p>
              ))}

              <p
                className={`${geist.className} text-[#003300]`}
                style={{ fontSize: '15px', lineHeight: '1.7em', opacity: 0.85 }}
              >
                Expertise mobilisée :{' '}
                {/* Sans `expertiseHref`, l'expertise citee est celle de la page
                    hote elle-meme : on affiche le libelle sans lien. */}
                {study.expertiseHref ? (
                  <Link
                    href={study.expertiseHref}
                    className="underline underline-offset-4"
                    style={{ color: '#6E7C00' }}
                  >
                    {study.expertise}
                  </Link>
                ) : (
                  <span style={{ color: '#6E7C00' }}>{study.expertise}</span>
                )}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 border-t border-[#003300]/15 pt-10">
          <h3
            className={`${ebGaramond.className} mb-4 text-[#003300]`}
            style={{ fontWeight: 600, fontSize: 'clamp(21px, 2.3vw, 28px)', lineHeight: '1.2em' }}
          >
            Un projet à structurer ?
          </h3>

          <p
            className={`${geist.className} mb-7 text-[#003300]`}
            style={{ fontWeight: 400, fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
          >
            Que vous prépariez un investissement, un partenariat public-privé ou l’entrée sur un
            nouveau marché, la première étape reste la même : comprendre le cadre institutionnel
            et réglementaire qui s’y applique. Découvrez notre{' '}
            <Link href="/services/conseil-juridique" className="underline underline-offset-4" style={{ color: '#6E7C00' }}>
              accompagnement juridique
            </Link>{' '}
            et nos solutions pour{' '}
            <Link href="/services/accelerer-mon-business" className="underline underline-offset-4" style={{ color: '#6E7C00' }}>
              accélérer votre croissance
            </Link>
            .
          </p>

          <Link
            href="/contact?subject=Projets"
            className={`${geist.className} inline-flex h-[46px] items-center justify-center rounded-full px-7`}
            style={{ background: '#BBCB2E', color: '#003300', fontSize: '14px', fontWeight: 600 }}
          >
            Discuter de votre projet
          </Link>
        </div>
      </div>
    </section>
  );
}
