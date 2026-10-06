import type { Metadata } from 'next';
import { ReactNode } from 'react';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import { alternatesFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'À propos — cabinet de conseil à Bruxelles',
  description:
    'Découvrez RNJ Advisory, cabinet de conseil juridique et stratégique à Bruxelles. Plus de 30 ans d’expertise au service des entreprises, investisseurs et institutions en Belgique, en Tunisie et à l’international.',
  keywords: [
    'cabinet conseil Bruxelles',
    'RNJ Advisory',
    'conseil juridique Belgique',
    'conseil stratégique Bruxelles',
    'expertise réglementaire',
    'accompagnement entreprises Belgique',
    'investisseurs Tunisie Europe',
    'Avenue Louise Bruxelles cabinet',
  ],
  alternates: alternatesFor('/a-propos'),
  category: 'Business consulting',
  openGraph: {
    images: ['/opengraph-image.png'],
    title: 'À propos de RNJ Advisory | Conseil juridique et stratégique',
    description:
      'RNJ Advisory accompagne entreprises, investisseurs et institutions dans leurs décisions juridiques, réglementaires et stratégiques.',
    url: 'https://rnj-advisory.be/a-propos',
    type: 'website',
    siteName: 'RNJ Advisory',
    locale: 'fr_BE',
  },
  twitter: {
    title: 'À propos de RNJ Advisory',
    description:
      'Cabinet de conseil juridique et stratégique à Bruxelles, actif en Belgique, en Europe et en Afrique.',
  },
};

export default function AProposLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'À propos', item: 'https://rnj-advisory.be/a-propos' },
        ]}
      />
      {children}
    </>
  );
}
