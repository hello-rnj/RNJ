import type { Metadata } from 'next';
import AnalyseInstitutionnelleClient from './AnalyseInstitutionnelleClient';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';

export const metadata: Metadata = {
  title: 'Analyse institutionnelle et réglementaire',
  description:
    'RNJ Advisory accompagne organismes publics, entreprises, investisseurs et bailleurs avec des analyses institutionnelles et réglementaires pour sécuriser les décisions stratégiques.',
  alternates: {
    canonical: '/services/analyse-institutionnelle',
  },
  openGraph: {
    images: ['/opengraph-image.png'],
    title: 'Analyse institutionnelle et réglementaire | RNJ Advisory',
    description:
      'Études sectorielles, analyse d’impact réglementaire et recommandations juridiques pour des décisions sécurisées.',
    url: 'https://rnj-advisory.be/services/analyse-institutionnelle',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
};

export default function AnalyseInstitutionnellePage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          {
            name: 'Analyse institutionnelle et réglementaire',
            item: 'https://rnj-advisory.be/services/analyse-institutionnelle',
          },
        ]}
      />
      <AnalyseInstitutionnelleClient />
    </>
  );
}
