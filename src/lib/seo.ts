import type { Metadata } from 'next';

export const SITE_URL = 'https://rnj-advisory.be';

/* Le site n'existe qu'en francais. Les hreflang sont donc auto-referents :
   chaque page se declare comme la version FR pour la Belgique, la France et la
   Tunisie — les trois marches cibles — plus un `x-default`. C'est valide et
   c'est ce que Google attend d'un site monolingue multi-marches.

   Ce qu'il ne faut PAS faire : declarer `en` ou `ar` tant que les traductions
   n'existent pas. Un hreflang qui pointe vers une URL absente (ou vers une page
   dans une autre langue que celle annoncee) est ignore par Google au mieux, et
   invalide toute la grappe hreflang au pire. */
const MARKET_LOCALES = ['fr-BE', 'fr-FR', 'fr-TN', 'fr'] as const;

function absolute(path: string): string {
  if (path === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Hreflang auto-referents pour une page donnee.
 *
 * Le bug corrige ici : les alternates etaient definis une seule fois en
 * constante et pointaient vers la racine du site, si bien que chaque article de
 * blog declarait la page d'accueil comme sa version fr-BE / fr-FR / fr-TN.
 */
export function hreflangFor(path: string): Record<string, string> {
  const url = absolute(path);
  const languages: Record<string, string> = { 'x-default': url };
  for (const locale of MARKET_LOCALES) {
    languages[locale] = url;
  }
  return languages;
}

/**
 * Bloc `alternates` complet (canonical + hreflang) pour les metadata Next.
 *
 * A utiliser sur CHAQUE page : Next remplace `alternates` en entier quand une
 * page en definit un, donc une page qui ne declare que son canonical perd les
 * hreflang herites du layout racine.
 */
export function alternatesFor(path: string): Metadata['alternates'] {
  return {
    canonical: path,
    languages: hreflangFor(path),
  };
}
