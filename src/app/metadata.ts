import { Metadata } from 'next';
import { homeSeoKeywords } from '@/lib/home-seo';

export const metadata: Metadata = {
  title: 'Cabinet de conseil stratégique à Bruxelles | Conformité réglementaire, ESG et analyse institutionnelle',
  description:
    "RNJ Advisory accompagne entrepreneurs, PME, ASBL, investisseurs et institutions à Bruxelles, en Belgique, en Tunisie et en Europe sur la conformité réglementaire, le RGPD, l'ESG, les appels à projets, la structuration juridique et l'analyse institutionnelle.",
  keywords: homeSeoKeywords,
  alternates: {
    canonical: '/',
  },
  category: 'Business consulting',
  openGraph: {
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
    title: 'RNJ Advisory | Conseil stratégique, conformité réglementaire et ESG à Bruxelles',
    description:
      "Cabinet de conseil stratégique à Bruxelles pour la conformité réglementaire, l'analyse institutionnelle, le RGPD, l'ESG et les appels à projets.",
    url: 'https://rnj-advisory.be',
    images: [
      {
        url: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776389845/rnj/og-home-f960652e.jpg',
        width: 1200,
        height: 630,
        alt: 'RNJ Advisory - Conseil stratégique et conformité réglementaire à Bruxelles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RNJ Advisory | Conseil stratégique, RGPD, ESG et conformité',
    description:
      "Accompagnement stratégique et réglementaire pour entrepreneurs, PME, investisseurs et institutions entre Bruxelles, la Belgique et la Tunisie.",
    images: ['https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776389846/rnj/twitter-home-0741522b.jpg'],
  },
};
