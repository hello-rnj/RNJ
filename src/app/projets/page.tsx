import type { Metadata } from 'next';
import AnalyseInstitutionnelleClient from '../services/analyse-institutionnelle/AnalyseInstitutionnelleClient';

export const metadata: Metadata = {
  title: 'Projets | RNJ Advisory',
  description: 'Nos projets d\'analyse institutionnelle et réglementaire.',
};

export default function ProjetsPage() {
  return <AnalyseInstitutionnelleClient />;
}
