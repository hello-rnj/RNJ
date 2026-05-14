import type { Metadata } from 'next';
import AnalyseInstitutionnelleClient from '../services/analyse-institutionnelle/AnalyseInstitutionnelleClient';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projets et réalisations | RNJ Advisory',
  description:
    'Explorez les projets et réalisations de RNJ Advisory en analyse institutionnelle, conformité réglementaire, énergie, gouvernance et structuration stratégique.',
  alternates: {
    canonical: '/projets',
  },
  openGraph: {
    title: 'Projets et réalisations | RNJ Advisory',
    description:
      'Références RNJ Advisory en conseil juridique, réglementaire et stratégique en Belgique, en Europe et en Afrique.',
    url: 'https://rnj-advisory.be/projets',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
};

export default function ProjetsPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Projets', item: 'https://rnj-advisory.be/projets' },
        ]}
      />
      <AnalyseInstitutionnelleClient />
    </>
  );
}
