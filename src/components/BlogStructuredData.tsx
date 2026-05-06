const organizationId = 'https://rnj-advisory.be/#organization';
const websiteId = 'https://rnj-advisory.be/#website';
const blogsPageId = 'https://rnj-advisory.be/blogs#webpage';

const blogPosts = [
  {
    title: 'Workshop BeCentral : digitalisation durable',
    description:
      'Retour sur un échange autour des enjeux de la digitalisation responsable.',
    datePublished: '2025-12-21',
    url: 'https://rnj-advisory.be/blogs#workshop-becentral-digitalisation-durable',
    image:
      'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310353/rnj/blog-0f03cf9e.svg',
  },
  {
    title: "Principes et fonctionnement des garanties d'origine",
    description: "Informations de base sur les garanties d'origine (GO).",
    datePublished: '2025-12-15',
    url: 'https://rnj-advisory.be/blogs#garanties-origine',
    image:
      'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310353/rnj/blog-0f03cf9e.svg',
  },
  {
    title: 'Branding Excellence : Une approche unique',
    description:
      'Comment développer une stratégie de marque distinctive et durable.',
    datePublished: '2025-12-10',
    url: 'https://rnj-advisory.be/blogs#branding-excellence',
    image:
      'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310353/rnj/blog-0f03cf9e.svg',
  },
] as const;

export default function BlogStructuredData() {
  const collectionPageData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': blogsPageId,
    url: 'https://rnj-advisory.be/blogs',
    name: 'Blog juridique et stratégique | RNJ Advisory',
    description:
      'Analyses et insights RNJ Advisory sur la conformité réglementaire, le droit des affaires, l’ESG, la stratégie et les marchés.',
    inLanguage: 'fr-BE',
    isPartOf: {
      '@id': websiteId,
    },
    publisher: {
      '@id': organizationId,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.datePublished,
          dateModified: post.datePublished,
          url: post.url,
          image: post.image,
          author: {
            '@id': organizationId,
          },
          publisher: {
            '@id': organizationId,
          },
          inLanguage: 'fr-BE',
          mainEntityOfPage: post.url,
        },
      })),
    },
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://rnj-advisory.be/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://rnj-advisory.be/blogs',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
