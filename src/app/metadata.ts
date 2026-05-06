import { Metadata } from 'next';
import { homeSeoKeywords } from '@/lib/home-seo';

export const metadata: Metadata = {
  title: 'Conseil juridique et stratégique à Bruxelles | Conformité réglementaire, ESG et analyse institutionnelle',
  description:
    "RNJ Advisory accompagne entrepreneurs, PME, ASBL, investisseurs et institutions à Bruxelles, en Belgique, en Tunisie et en Europe sur la conformité réglementaire, le RGPD, l'ESG, la structuration juridique, le recrutement international et l'analyse institutionnelle.",
  keywords: homeSeoKeywords,
  alternates: {
    canonical: '/',
  },
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
        url: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776389845/rnj/og-home-f960652e.jpg',
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
    images: ['https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776389846/rnj/twitter-home-0741522b.jpg'],
  },
  other: {
    'geo.region': 'BE-BRU',
    'geo.placename': 'Bruxelles',
    ICBM: '50.8266, 4.3675',
  },
};
