import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';

const BASE_URL = 'https://rnj-advisory.be';

/**
 * Date de derniere revision des pages editoriales. Les articles, eux, portent
 * leur propre date de publication (voir plus bas).
 */
const LAST_MODIFIED = new Date('2026-08-06T00:00:00.000Z');

/**
 * Le sitemap ne declarait que 7 URL sur 20 : les trois pages de services
 * (creation d'entreprise, conseil juridique, accelerer mon business), /a-propos
 * et les neuf articles du blog en etaient absents. Il pointait par ailleurs vers
 * /about, qui repond 308 vers /a-propos — un sitemap ne doit lister que des URL
 * finales, canoniques et repondant 200.
 */
const staticPages = [
  { url: `${BASE_URL}/`, changeFrequency: 'weekly' as const, priority: 1 },
  { url: `${BASE_URL}/services/creation-entreprise`, changeFrequency: 'monthly' as const, priority: 0.9 },
  { url: `${BASE_URL}/services/conseil-juridique`, changeFrequency: 'monthly' as const, priority: 0.9 },
  { url: `${BASE_URL}/services/accelerer-mon-business`, changeFrequency: 'monthly' as const, priority: 0.9 },
  { url: `${BASE_URL}/services/analyse-institutionnelle`, changeFrequency: 'monthly' as const, priority: 0.9 },
  { url: `${BASE_URL}/projets`, changeFrequency: 'monthly' as const, priority: 0.8 },
  { url: `${BASE_URL}/a-propos`, changeFrequency: 'monthly' as const, priority: 0.8 },
  { url: `${BASE_URL}/contact`, changeFrequency: 'monthly' as const, priority: 0.8 },
  { url: `${BASE_URL}/blogs`, changeFrequency: 'weekly' as const, priority: 0.7 },
].map((page) => ({ ...page, lastModified: LAST_MODIFIED }));

export default function sitemap(): MetadataRoute.Sitemap {
  /* Les articles sont derives de la source partagee : un billet ajoute ou
     renomme entre dans le sitemap sans intervention. */
  const articles = blogPosts
    .filter((post) => post.href)
    .map((post) => ({
      url: `${BASE_URL}${post.href}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }));

  return [...staticPages, ...articles];
}
