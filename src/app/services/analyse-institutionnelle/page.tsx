import { Metadata } from 'next';
import AnalyseInstitutionnelleClient from './AnalyseInstitutionnelleClient';

export const metadata: Metadata = {
  title: 'Analyse institutionnelle | RNJ Advisory',
  description:
    "Découvrez notre service d'analyse institutionnelle pour comprendre les dynamiques politiques, économiques et réglementaires de vos marchés cibles.",
};

export default function AnalyseInstitutionnellePage() {
  return <AnalyseInstitutionnelleClient />;
}
