import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Analyse Institutionnelle | RNJ Advisory',
  description: 'Analyse institutionnelle.',
};

export default function AnalyseInstitutionnellePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7FCFF]">
      <Navbar />
      <div className="flex-grow" />
      <Footer />
    </div>
  );
}
