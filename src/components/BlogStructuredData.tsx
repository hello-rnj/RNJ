import { blogPosts } from '@/data/blogPosts';

const organizationId = 'https://rnj-advisory.be/#organization';
const websiteId = 'https://rnj-advisory.be/#website';
const blogsPageId = 'https://rnj-advisory.be/blogs#webpage';

/**
 * Les articles sont lus depuis la source partagee plutot que redecrits ici : cette
 * liste etait figee sur trois billets obsoletes (dont un supprime depuis) avec des
 * ancres et des images qui n'existaient plus. Google recevait donc un balisage
 * decrivant un blog different de celui reellement affiche.
 */
const structuredPosts = blogPosts.map((post) => ({
  title: post.title,
  description: post.description,
  datePublished: post.publishedAt,
  url: post.href ? `https://rnj-advisory.be${post.href}` : 'https://rnj-advisory.be/blogs',
  image: `https://rnj-advisory.be${encodeURI(post.image)}`,
}));

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
      itemListElement: structuredPosts.map((post, index) => ({
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
