import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Services | RNJ Advisory',
  description: 'Services RNJ Advisory.',
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7FCFF]">
      <Navbar />
      <div className="flex-grow" />
      <Footer />
    </div>
  );
}
