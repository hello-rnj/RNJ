/**
 * Source unique des articles du blog. Partagee entre la liste `/blogs` et la
 * section « Contenu associé » de `/projets`, pour qu'un article ajoute ou
 * renomme apparaisse au meme titre aux deux endroits.
 */
export type BlogPost = {
  id: number;
  title: string;
  description: string;
  /** Libelle affiche, en francais abrege : « 13 nov. 2025 ». */
  date: string;
  /** Date ISO, uniquement pour le tri : les libelles ne se trient pas. */
  publishedAt: string;
  category: string;
  image: string;
  href?: string;
  views: string;
  likes: string;
  comments: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 0,
    title: 'Retour sur la mission économique Tunisie – Belgique – Luxembourg',
    description: "RNJ Advisory au cœur des échanges, les 12 et 13 novembre 2025 à Bruxelles et au Luxembourg.",
    date: '13 nov. 2025',
    publishedAt: '2025-11-13',
    category: 'Mission économique',
    image: '/optimized/73d63901-1e1d-4ddd-861d-6e617b9465a2.jpeg',
    href: '/blogs/mission-economique-tunisie-belgique-luxembourg',
    views: '13k',
    likes: '13k',
    comments: '13k',
  },
  {
    id: 1,
    title: 'Retour sur notre participation au workshop « Sustainable Digitalization » à BeCentral',
    description: 'Une digitalisation durable au cœur des échanges : retour sur le workshop du 29 août 2025 à Bruxelles.',
    date: '21 déc. 2025',
    publishedAt: '2025-12-21',
    category: 'Digitalisation durable',
    image: '/optimized/workshop-sustainable-digitalization-cover.webp',
    href: '/blogs/workshop-sustainable-digitalization-becentral',
    views: '13k',
    likes: '13k',
    comments: '13k',
  },
  {
    id: 6,
    title: "L'avenir du métier d'avocat à l'ère de l'IA : défis et perspectives pour la médiation",
    description:
      "Comment l'IA juridique, la LegalTech et la justice prédictive transforment la profession, et pourquoi la médiation en sort renforcée.",
    date: '21 déc. 2025',
    publishedAt: '2025-12-21',
    category: 'Innovation juridique',
    image: '/optimized/avenir-metier-avocat-ia-cover.webp',
    href: '/blogs/avenir-metier-avocat-ere-ia-mediation',
    views: '13k',
    likes: '13k',
    comments: '13k',
  },
  {
    id: 7,
    title:
      "La Belgique réitère son engagement aux côtés de la Tunisie pour se positionner en tant que hub régional de l'énergie verte",
    description:
      "Petit-déjeuner débat sur la stratégie de développement de l'hydrogène vert et de ses dérivés en Tunisie.",
    date: '21 déc. 2025',
    publishedAt: '2025-12-21',
    category: 'Énergie',
    image: '/optimized/belgique-tunisie-energie-verte-cover.webp',
    href: '/blogs/belgique-tunisie-hub-regional-energie-verte',
    views: '13k',
    likes: '13k',
    comments: '13k',
  },
  {
    id: 9,
    title: "Entrepreneuriat féminin à Bruxelles : de l'idée au projet concret",
    description:
      "Deux journées pour transformer une idée en projet d'entreprise : tester son concept, cibler son public, pitcher et financer.",
    date: '21 déc. 2025',
    publishedAt: '2025-12-21',
    category: 'Formation',
    image: '/optimized/entrepreneuriat-feminin-cover.jpeg',
    href: '/blogs/entrepreneuriat-feminin-bruxelles-idee-projet',
    views: '13k',
    likes: '13k',
    comments: '13k',
  },
  {
    id: 8,
    title: 'Webinaire : Agrivoltaïsme — cadre réglementaire, défis & opportunités',
    description:
      "Zones agricoles éligibles, régimes de production et limites de l'autoproduction : ce que permet aujourd'hui le droit tunisien.",
    date: '21 déc. 2025',
    publishedAt: '2025-12-21',
    category: 'Webinaire',
    image: '/optimized/agrivoltaisme-cover.jpg',
    href: '/blogs/webinaire-agrivoltaisme-cadre-reglementaire',
    views: '13k',
    likes: '13k',
    comments: '13k',
  },
  {
    id: 2,
    title: 'Informations de base sur les garanties d\'origine (GO)',
    description:
      "Définition, cadre légal en Tunisie et dans l'Union européenne, fonctions et régime de commercialisation.",
    date: '12 févr. 2026',
    publishedAt: '2026-02-12',
    category: 'Énergie',
    image: '/optimized/images-header-articles-1084-x-585-px-19.jpg',
    href: '/blogs/garanties-origine-informations-de-base',
    views: '13k',
    likes: '13k',
    comments: '13k',
  },
  {
    id: 4,
    title:
      "Analyse de l'impact du mécanisme d'ajustement carbone aux frontières (MACF/CBAM) sur les exportations tunisiennes",
    description:
      "Impact du MACF sur les exportations tunisiennes de biens et sur le projet d'exportation d'électricité vers l'Europe via la ligne ELMED.",
    date: '20 févr. 2026',
    publishedAt: '2026-02-20',
    category: 'Réglementation',
    image: '/optimized/macf-cbam-cover-v2.webp',
    href: '/blogs/macf-cbam-exportations-tunisiennes',
    views: '13k',
    likes: '13k',
    comments: '13k',
  },
  {
    id: 5,
    title: 'Analyse comparative des performances touristiques en 2025 (Maroc, Égypte, Tunisie)',
    description:
      'Volumes, recettes et dépense moyenne par visiteur : trois stratégies contrastées en Afrique du Nord.',
    date: '12 févr. 2026',
    publishedAt: '2026-02-12',
    category: 'Marchés',
    image: '/optimized/tourisme-2025-cover.webp',
    href: '/blogs/performances-touristiques-2025-maroc-egypte-tunisie',
    views: '13k',
    likes: '13k',
    comments: '13k',
  },
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

/** Categories reellement utilisees, triees en francais, suivies de « Tous ». */
export const blogFilters = [
  ...Array.from(new Set(blogPosts.map((post) => post.category))).sort((a, b) => a.localeCompare(b, 'fr')),
  'Tous',
];
