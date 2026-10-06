import type { Metadata } from 'next';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import ConseilJuridiqueClient from './ConseilJuridiqueClient';
import { alternatesFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Conseil juridique et réglementaire à Bruxelles',
  description:
    "Conseil juridique et réglementaire à Bruxelles : droit des affaires, conformité RGPD et ESG, contrats, gouvernance et PPP pour entreprises, PME et institutions.",
  keywords: [
    'conseil juridique Bruxelles',
    'avocat conseil Ixelles',
    'droit des affaires Belgique',
    'conformité réglementaire Belgique',
    'RGPD conformité Bruxelles',
    'RGPD Belgique entreprise',
    'ESG conseil Belgique',
    'CSRD Belgique reporting',
    'droit des contrats Belgique',
    'gouvernance entreprise Belgique',
    'partenariat public privé Belgique',
    'PPP Belgique conseil',
    'due diligence juridique Belgique',
    'audit conformité Bruxelles',
    'cabinet conseil juridique Avenue Louise',
    'RNJ Advisory Bruxelles',
  ],
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  other: {
    'geo.region': 'BE-BRU',
    'geo.placename': 'Bruxelles, Ixelles',
    'geo.position': '50.8225;4.3625',
    'ICBM': '50.8225, 4.3625',
  },
  alternates: alternatesFor('/services/conseil-juridique'),
  category: 'Legal services',
  openGraph: {
    images: ['/opengraph-image.png'],
    title: 'Conseil juridique et réglementaire à Bruxelles | RNJ Advisory',
    description:
      "Sécurisez vos décisions avec un accompagnement juridique, réglementaire et stratégique : RGPD, ESG, contrats, gouvernance.",
    url: 'https://rnj-advisory.be/services/conseil-juridique',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conseil juridique et réglementaire | RNJ Advisory Bruxelles',
    description:
      'Droit des affaires, conformité RGPD/ESG, contrats et gouvernance pour entreprises et institutions en Belgique.',
    images: ['/opengraph-image.png'],
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
      <ServiceStructuredData
        serviceName="Conseil juridique et réglementaire à Bruxelles"
        serviceDescription="Conseil juridique et réglementaire pour entreprises en Belgique : droit des affaires, conformité RGPD et ESG, contrats, gouvernance et partenariats public-privé."
        serviceUrl="https://rnj-advisory.be/services/conseil-juridique"
        serviceType="LegalService"
      />
      <ConseilJuridiqueClient />
    </>
  );
}
