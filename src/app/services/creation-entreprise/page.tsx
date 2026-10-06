import type { Metadata } from 'next';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import CreationEntrepriseClient from './CreationEntrepriseClient';
import { alternatesFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: "Création d'entreprise en Belgique",
  description:
    "Créez votre entreprise en Belgique avec RNJ Advisory : immatriculation BCE, TVA, ONSS, carte professionnelle et business plan. Accompagnement de A à Z pour résidents et non-résidents.",
  keywords: [
    'création entreprise Belgique',
    'créer société Bruxelles',
    'créer entreprise Ixelles',
    'immatriculation BCE Bruxelles',
    'carte professionnelle Belgique',
    'entrepreneur hors UE Belgique',
    'business plan Belgique',
    'TVA ONSS inscription Belgique',
    'société Belgique non-résident',
    'SRL création Bruxelles',
    'SPRL Belgique',
    'guichet entreprise Bruxelles',
    'ouvrir société Belgique étranger',
    'création ASBL Belgique',
    'accompagnement création entreprise Bruxelles',
    'RNJ Advisory Avenue Louise',
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
  alternates: alternatesFor('/services/creation-entreprise'),
  category: 'Business consulting',
  openGraph: {
    images: ['/opengraph-image.png'],
    title: "Création d'entreprise en Belgique | RNJ Advisory Bruxelles",
    description:
      "Accompagnement complet pour créer votre entreprise en Belgique : BCE, TVA, ONSS, carte professionnelle, business plan et statuts.",
    url: 'https://rnj-advisory.be/services/creation-entreprise',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Création d'entreprise en Belgique | RNJ Advisory",
    description:
      "Immatriculation BCE, TVA, ONSS, carte professionnelle : accompagnement complet pour créer votre société en Belgique.",
    images: ['/opengraph-image.png'],
  },
};

export default function CreationEntreprisePage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          {
            name: "Création d'entreprise",
            item: 'https://rnj-advisory.be/services/creation-entreprise',
          },
        ]}
      />
      <ServiceStructuredData
        serviceName="Création d'entreprise en Belgique"
        serviceDescription="Accompagnement complet pour créer votre entreprise en Belgique : immatriculation BCE, TVA, ONSS, carte professionnelle, business plan et statuts. Service pour résidents et non-résidents."
        serviceUrl="https://rnj-advisory.be/services/creation-entreprise"
        serviceType="ProfessionalService"
      />
      <CreationEntrepriseClient />
    </>
  );
}
