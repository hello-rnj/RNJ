import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';
import { SITE_URL, hreflangFor } from '@/lib/seo';

const BASE_URL = SITE_URL;

/* Les hreflang etaient une constante partagee pointant vers la racine : chaque
   article de blog declarait donc la page d'accueil comme sa version fr-BE,
   fr-FR et fr-TN. Ils sont desormais calcules par URL, donc auto-referents. */
function alternatesFor(path: string) {
  return { languages: hreflangFor(path) };
}

/**
 * Date de derniere revision des pages editoriales.
 * Mise a jour a chaque deploiement significatif.
 */
const LAST_MODIFIED = new Date('2026-09-01T00:00:00.000Z');

const staticPages = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
  { path: '/services/creation-entreprise', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/services/conseil-juridique', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/services/accelerer-mon-business', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/expertises', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/a-propos', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/blogs', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/politique-de-confidentialite', changeFrequency: 'yearly' as const, priority: 0.3 },
].map(({ path, ...page }) => ({
  ...page,
  url: `${BASE_URL}${path === '/' ? '/' : path}`,
  lastModified: LAST_MODIFIED,
  alternates: alternatesFor(path),
}));

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());

  const articles = blogPosts
    .filter((post): post is typeof post & { href: string } => Boolean(post.href))
    .map((post) => {
      const pubDate = new Date(post.publishedAt);
      const isRecent = pubDate > sixMonthsAgo;
      return {
        url: `${BASE_URL}${post.href}`,
        lastModified: pubDate,
        changeFrequency: (isRecent ? 'monthly' : 'yearly') as 'monthly' | 'yearly',
        priority: isRecent ? 0.7 : 0.5,
        alternates: alternatesFor(post.href),
      };
    });

  return [...staticPages, ...articles];
}
