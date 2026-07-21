import type { Metadata } from 'next';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import CreationEntrepriseClient from './CreationEntrepriseClient';

export const metadata: Metadata = {
  title: "Création d'entreprise en Belgique | RNJ Advisory",
  description:
    "RNJ Advisory vous accompagne dans la création de votre entreprise en Belgique : immatriculation BCE, TVA, ONSS, carte professionnelle et business plan. Un accompagnement complet pour lancer votre activité en toute sérénité.",
  alternates: {
    canonical: '/services/creation-entreprise',
  },
  openGraph: {
    title: "Création d'entreprise en Belgique | RNJ Advisory",
    description:
      "Accompagnement complet pour créer votre entreprise en Belgique : BCE, TVA, ONSS, autorisations et obligations administratives.",
    url: 'https://rnj-advisory.be/services/creation-entreprise',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
};

export default function CreationEntreprisePage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Services', item: 'https://rnj-advisory.be/services' },
          {
            name: "Création d'entreprise",
            item: 'https://rnj-advisory.be/services/creation-entreprise',
          },
        ]}
      />
      <CreationEntrepriseClient />
    </>
  );
}
