import type { Metadata } from 'next';
import { ReactNode } from 'react';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';

export const metadata: Metadata = {
  title: 'À propos — cabinet de conseil à Bruxelles',
  description:
    'Découvrez RNJ Advisory, cabinet de conseil juridique et stratégique à Bruxelles, accompagnant entreprises, investisseurs et institutions en Belgique et à l’international.',
  alternates: {
    canonical: '/a-propos',
  },
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
