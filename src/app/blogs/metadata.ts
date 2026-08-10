import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog juridique et stratégique',
  description:
    'Analyses et insights RNJ Advisory sur la conformité réglementaire, le droit des affaires, l’ESG, la stratégie et les marchés en Belgique et à l’international.',
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    images: ['/opengraph-image.png'],
    title: 'Blog RNJ Advisory | Juridique, conformité et stratégie',
    description:
      'Découvrez nos publications sur les enjeux juridiques, réglementaires, ESG et stratégiques.',
    url: 'https://rnj-advisory.be/blogs',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog RNJ Advisory',
    description:
      'Publications sur la conformité, l’analyse institutionnelle, l’ESG et la stratégie.',
  },
};
