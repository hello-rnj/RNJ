import { MetadataRoute } from 'next';

/* Ressources de rendu : Googlebot doit pouvoir charger les bundles JS/CSS et
   les images optimisees, sinon il indexe une page vide. `Disallow: /_next/`
   bloquait tout le repertoire de build — c'est ce qui faisait remonter des
   centaines de « ressources bloquees » dans les audits. La regle Allow plus
   specifique l'emporte chez Google (correspondance la plus longue), on garde
   donc le Disallow general pour les internals (RSC, manifestes) tout en
   ouvrant explicitement ce qui sert au rendu. */
const RENDER_ASSETS = ['/_next/static/', '/_next/image', '/optimized/'];

const CRAWLABLE = {
  allow: ['/', ...RENDER_ASSETS],
  disallow: ['/api/', '/admin/', '/_next/'],
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        ...CRAWLABLE,
      },
      {
        userAgent: 'Bingbot',
        ...CRAWLABLE,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/optimized/', '/_next/image', '/opengraph-image.png'],
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        disallow: '/',
      },
      {
        userAgent: '*',
        ...CRAWLABLE,
        /* Le crawl-delay reste sur le groupe generique : il ralentit les
           robots secondaires sans penaliser Google ni Bing, qui l'ignorent. */
        crawlDelay: 2,
      },
    ],
    sitemap: 'https://rnj-advisory.be/sitemap.xml',
    host: 'https://rnj-advisory.be',
  };
}
