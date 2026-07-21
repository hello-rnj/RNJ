import type { Metadata } from 'next';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services juridiques et stratégiques | RNJ Advisory',
  description:
    'Découvrez les services RNJ Advisory: création d\'entreprise, accompagnement juridique et accélération business en Belgique et à l\'international.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services | RNJ Advisory',
    description:
      'Des services juridiques et stratégiques pour entrepreneurs, PME, investisseurs et institutions en Belgique et à l\'international.',
    url: 'https://rnj-advisory.be/services',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Services', item: 'https://rnj-advisory.be/services' },
        ]}
      />
      <ServicesPageClient />
    </>
  );
}
