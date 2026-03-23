import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Accueil - Cabinet de Conseil Stratégique et Réglementaire",
  description: "RNJ Advisory : Cabinet de conseil stratégique spécialisé dans l'analyse institutionnelle, la conformité réglementaire et le développement économique. Accompagnement personnalisé pour acteurs publics, entreprises privées et investisseurs en Tunisie, Europe et Afrique du Nord.",
  keywords: [
    "conseil stratégique Tunisie",
    "conformité réglementaire",
    "analyse institutionnelle",
    "développement économique durable",
    "acteurs publics",
    "entreprises privées", 
    "investisseurs",
    "entrepreneuriat",
    "structuration d'entreprise",
    "conformité réglementaire",
    "transition énergétique"
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "RNJ Advisory - Cabinet de Conseil Stratégique",
    description: "Expert en conseil stratégique et réglementaire pour sécuriser vos projets et maîtriser les environnements institutionnels complexes.",
    url: 'https://rnj-advisory.be',
    images: [
      {
        url: '/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'RNJ Advisory - Cabinet de Conseil Stratégique',
      },
    ],
  },
  twitter: {
    title: "RNJ Advisory - Cabinet de Conseil Stratégique",
    description: "Expert en conseil stratégique et réglementaire pour acteurs publics, entreprises et investisseurs.",
    images: ['/twitter-home.jpg'],
  },
};
