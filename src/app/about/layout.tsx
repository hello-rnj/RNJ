import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'about',
  description:
    'Découvrez RNJ Advisory, cabinet de conseil stratégique et réglementaire accompagnant entreprises, investisseurs et institutions en Belgique et à l\'international.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'about | RNJ Advisory',
    description:
      'RNJ Advisory accompagne entreprises, investisseurs et institutions dans leurs décisions juridiques, réglementaires et stratégiques.',
    url: 'https://rnj-advisory.be/about',
    type: 'website',
    siteName: 'RNJ Advisory',
    locale: 'fr_FR',
  },
};

export default function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
