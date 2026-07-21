import type { Metadata } from 'next';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import AccelererMonBusinessClient from './AccelererMonBusinessClient';

export const metadata: Metadata = {
  title: 'Accélérer mon business & Recruter | RNJ Advisory',
  description:
    "RNJ Advisory accompagne les entreprises dans leur développement stratégique : expansion internationale, recrutement de talents et partenariats stratégiques.",
  alternates: {
    canonical: '/services/accelerer-mon-business',
  },
  openGraph: {
    title: 'Accélérer mon business & Recruter | RNJ Advisory',
    description:
      "Chaque ambition mérite une stratégie adaptée. Nous accompagnons votre développement avec une expertise qui allie vision, structuration et accompagnement durable.",
    url: 'https://rnj-advisory.be/services/accelerer-mon-business',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
};

export default function AccelererMonBusinessPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Services', item: 'https://rnj-advisory.be/services' },
          {
            name: 'Accélérer mon business & Recruter',
            item: 'https://rnj-advisory.be/services/accelerer-mon-business',
          },
        ]}
      />
      <AccelererMonBusinessClient />
    </>
  );
}
