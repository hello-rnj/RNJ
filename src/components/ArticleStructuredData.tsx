import { blogPosts } from '@/data/blogPosts';

const organizationId = 'https://rnj-advisory.be/#organization';
const websiteId = 'https://rnj-advisory.be/#website';

/**
 * Balisage `BlogPosting` des pages d'articles. Les articles ne portaient jusqu'ici
 * qu'un fil d'Ariane : le balisage decrivant l'article lui-meme n'existait que sur
 * la page de liste /blogs, la ou Google l'attend sur la page de l'article.
 *
 * Titre, description, date, categorie et image sont lus depuis la source partagee
 * `blogPosts` : le balisage ne peut donc pas diverger de ce qui est affiche.
 */
export default function ArticleStructuredData({ slug }: { slug: string }) {
  const href = `/blogs/${slug}`;
  const post = blogPosts.find((item) => item.href === href);
  if (!post) return null;

  const url = `https://rnj-advisory.be${href}`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    articleSection: post.category,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: `https://rnj-advisory.be${encodeURI(post.image)}`,
    inLanguage: 'fr-BE',
    author: { '@id': organizationId },
    publisher: { '@id': organizationId },
    isPartOf: { '@id': websiteId },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
