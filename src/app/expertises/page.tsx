import type { Metadata } from 'next';
import ExpertisesClient from './ExpertisesClient';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import { alternatesFor } from '@/lib/seo';
import ProjetsEditorial from '@/components/ProjetsEditorial';

/* Page unique issue de la fusion de /projets et de
   /services/analyse-institutionnelle, qui rendaient le meme composant sous deux
   URL. Elle porte le pilier « expertise institutionnelle et grands projets » ;
   /services reste reserve aux prestations operationnelles en Belgique.
   Les deux anciennes URL sont redirigees en 301 depuis next.config.ts. */

export const metadata: Metadata = {
  title: 'Expertises et projets institutionnels',
  description:
    "Analyse institutionnelle et réglementaire, études sectorielles, due diligence et partenariats public-privé. Découvrez nos projets : interconnexion électrique Elmed, garanties d'origine et mécanismes de garantie de paiement en Tunisie, en Europe et en Afrique.",
  keywords: [
    'analyse institutionnelle Belgique',
    'analyse réglementaire Bruxelles',
    'étude sectorielle Tunisie',
    'due diligence réglementaire',
    "analyse d'impact réglementaire",
    'projet ELMED Tunisie Italie',
    'PPP Tunisie cadre juridique',
    'concessions Tunisie',
    'garanties origine électricité renouvelable',
    'MACF CBAM Tunisie',
    'investissement Afrique',
    'cadre institutionnel énergie',
    'références conseil juridique',
    'RNJ Advisory',
  ],
  alternates: alternatesFor('/expertises'),
  category: 'Business consulting',
  openGraph: {
    images: ['/opengraph-image.png'],
    title: 'Expertises et projets institutionnels | RNJ Advisory',
    description:
      "Études sectorielles, due diligence réglementaire et grands projets énergétiques en Belgique, en Tunisie et en Afrique.",
    url: 'https://rnj-advisory.be/expertises',
    type: 'website',
    locale: 'fr_BE',
    siteName: 'RNJ Advisory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expertises et projets institutionnels | RNJ Advisory',
    description:
      'Analyse institutionnelle, due diligence réglementaire et projets énergétiques : Elmed, garanties d’origine, PPP.',
    images: ['/opengraph-image.png'],
  },
};

export default function ExpertisesPage() {
  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: 'Expertises et projets', item: 'https://rnj-advisory.be/expertises' },
        ]}
      />
      <ExpertisesClient editorialSlot={<ProjetsEditorial />} />
    </>
  );
}
