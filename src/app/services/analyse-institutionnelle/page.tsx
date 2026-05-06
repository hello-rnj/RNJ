import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';

export const metadata: Metadata = {
  title: 'Analyse institutionnelle et réglementaire | RNJ Advisory',
  description:
    'RNJ Advisory accompagne organismes publics, entreprises, investisseurs et bailleurs avec des analyses institutionnelles et réglementaires pour sécuriser les décisions stratégiques.',
  alternates: {
    canonical: '/services/analyse-institutionnelle',
  },
  openGraph: {
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
          { name: 'Services', item: 'https://rnj-advisory.be/services' },
          {
            name: 'Analyse institutionnelle et réglementaire',
            item: 'https://rnj-advisory.be/services/analyse-institutionnelle',
          },
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
