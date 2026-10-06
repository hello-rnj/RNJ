import { Metadata } from 'next';
import { alternatesFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact — cabinet de conseil à Bruxelles',
  description:
    "Contactez RNJ Advisory, cabinet de conseil juridique et stratégique à Bruxelles. Avenue Louise 500, 1050 Ixelles. Premier échange de cadrage gratuit. Tél. : +32 474 03 22 66.",
  keywords: [
    'contact cabinet conseil Bruxelles',
    'rendez-vous conseil juridique Bruxelles',
    'RNJ Advisory contact',
    'Avenue Louise cabinet conseil',
    'consultation juridique Bruxelles',
    'conseil réglementaire rendez-vous',
    'RGPD consultation Belgique',
    'création entreprise Belgique rendez-vous',
    'cabinet conseil Ixelles Bruxelles',
    'premier entretien gratuit conseil',
  ],
  alternates: alternatesFor('/contact'),
  category: 'Business consulting',
  openGraph: {
    title: 'Contactez RNJ Advisory | Cabinet de conseil à Bruxelles',
    description:
      "Prenez rendez-vous avec nos experts : conseil juridique, conformité RGPD/ESG, création d'entreprise et analyse institutionnelle. Premier cadrage gratuit.",
    url: 'https://rnj-advisory.be/contact',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Contactez RNJ Advisory — cabinet de conseil juridique à Bruxelles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contactez RNJ Advisory | Bruxelles',
    description:
      "Conseil juridique, RGPD, ESG, création d'entreprise : premier échange de cadrage gratuit.",
    images: ['/opengraph-image.png'],
  },
};
