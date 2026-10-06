import { Metadata } from 'next';
import { homeSeoKeywords } from '@/lib/home-seo';
import { alternatesFor } from '@/lib/seo';

export const metadata: Metadata = {
  /* `absolute` court-circuite la template « %s | RNJ Advisory » du layout : la
     marque est deja dans le titre, sans quoi elle apparaissait deux fois. */
  title: { absolute: 'Conseil juridique et stratégique à Bruxelles | RNJ Advisory' },
  description:
    "Cabinet de conseil à Bruxelles : conformité réglementaire, RGPD, ESG et structuration juridique pour entrepreneurs, PME, ASBL et institutions.",
  keywords: homeSeoKeywords,
  alternates: alternatesFor('/'),
  category: 'Business consulting',
  openGraph: {
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
    title: 'RNJ Advisory | Conseil juridique, conformité réglementaire et ESG à Bruxelles',
    description:
      "Cabinet de conseil à Bruxelles pour la conformité réglementaire, l'analyse institutionnelle, le RGPD, l'ESG et la structuration juridique.",
    url: 'https://rnj-advisory.be',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'RNJ Advisory - Conseil juridique et stratégique à Bruxelles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RNJ Advisory | Conseil juridique, RGPD, ESG et conformité',
    description:
      'Accompagnement stratégique et réglementaire pour entrepreneurs, PME, investisseurs et institutions entre Bruxelles, la Belgique et la Tunisie.',
    images: ['/opengraph-image.png'],
  },
  other: {
    'geo.region': 'BE-BRU',
    'geo.placename': 'Bruxelles',
    ICBM: '50.8266, 4.3675',
  },
};
