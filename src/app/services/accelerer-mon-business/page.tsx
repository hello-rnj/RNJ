import type { Metadata } from 'next';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import ServiceStructuredData from '@/components/ServiceStructuredData';
import AccelererMonBusinessClient from './AccelererMonBusinessClient';
import { alternatesFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Accélérer mon business et recruter',
  description:
    "Accélérez votre croissance en Belgique : développement stratégique, expansion internationale, recrutement de talents hors UE et partenariats. Accompagnement PME, ASBL et entreprises.",
  keywords: [
    'accélérer business Belgique',
    'développement stratégique PME Bruxelles',
    'expansion internationale Belgique',
    'recrutement international Belgique',
    'recrutement hors UE Belgique',
    'permis unique Belgique procédure',
    'permis travail Belgique étranger',
    'croissance PME Bruxelles',
    'ASBL croissance Belgique',
    'partenariat stratégique Belgique',
    'conseil croissance entreprise Bruxelles',
    'scale-up Belgique',
    'accompagnement PME Ixelles',
    'talent acquisition Belgique',
    'carte bleue européenne Belgique',
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
  alternates: alternatesFor('/services/accelerer-mon-business'),
  category: 'Business consulting',
  openGraph: {
    images: ['/opengraph-image.png'],
    title: 'Accélérer mon business et recruter | RNJ Advisory Bruxelles',
    description:
      "Développement stratégique, expansion internationale et recrutement de talents hors UE pour PME et ASBL en Belgique.",
    url: 'https://rnj-advisory.be/services/accelerer-mon-business',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accélérer mon business et recruter | RNJ Advisory',
    description:
      'Croissance, expansion internationale et recrutement hors UE pour entreprises en Belgique.',
    images: ['/opengraph-image.png'],
  },
};

export default function AccelererMonBusinessPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          {
            name: 'Accélérer mon business & Recruter',
            item: 'https://rnj-advisory.be/services/accelerer-mon-business',
          },
        ]}
      />
      <ServiceStructuredData
        serviceName="Accélérer mon business et recruter en Belgique"
        serviceDescription="Développement stratégique, expansion internationale et recrutement de talents hors UE pour PME, ASBL et entreprises en Belgique. Permis unique et carte bleue européenne."
        serviceUrl="https://rnj-advisory.be/services/accelerer-mon-business"
        serviceType="ProfessionalService"
      />
      <AccelererMonBusinessClient />
    </>
  );
}
