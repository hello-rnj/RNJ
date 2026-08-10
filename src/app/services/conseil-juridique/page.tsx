import type { Metadata } from 'next';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import ConseilJuridiqueClient from './ConseilJuridiqueClient';

export const metadata: Metadata = {
  title: 'Conseil juridique et réglementaire',
  description:
    "RNJ Advisory accompagne les entreprises, les institutions et les organisations dans leurs enjeux juridiques, réglementaires et stratégiques : droit des affaires, conformité réglementaire, contrats et gouvernance.",
  alternates: {
    canonical: '/services/conseil-juridique',
  },
  openGraph: {
    images: ['/opengraph-image.png'],
    title: 'Conseil juridique | RNJ Advisory',
    description:
      "Sécurisez vos décisions. Accélérez vos projets. Un accompagnement juridique, réglementaire et stratégique fondé sur l'expertise et la confiance.",
    url: 'https://rnj-advisory.be/services/conseil-juridique',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
};

export default function ConseilJuridiquePage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          {
            name: 'Conseil juridique',
            item: 'https://rnj-advisory.be/services/conseil-juridique',
          },
        ]}
      />
      <ConseilJuridiqueClient />
    </>
  );
}
