import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';

export const metadata: Metadata = {
  title: 'Services juridiques et stratégiques | RNJ Advisory',
  description:
    'Découvrez les services RNJ Advisory: analyse institutionnelle, structuration juridique, conformité réglementaire, RGPD, ESG, partenariats public-privé et veille réglementaire.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services | RNJ Advisory',
    description:
      'Des services juridiques et stratégiques pour entrepreneurs, PME, investisseurs et institutions en Belgique et à l’international.',
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
      <div className="flex min-h-screen flex-col bg-[#F7FCFF]">
        <Navbar />
        <div className="flex-grow" />
        <Footer />
      </div>
    </>
  );
}
