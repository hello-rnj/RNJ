export default function JsonLd() {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RNJ Advisory',
    url: 'https://rnj-advisory.be',
    logo: 'https://rnj-advisory.be/minimal-horizontal-logo-white-1.svg',
    description:
      "Cabinet de conseil stratégique et réglementaire spécialisé dans l'analyse institutionnelle, la conformité réglementaire et le développement économique durable.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenue Louise 500',
      addressLocality: 'Ixelles',
      addressRegion: 'Bruxelles',
      postalCode: '1050',
      addressCountry: 'BE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+32 474 03 22 66',
      email: 'contact@rnj-advisory.be',
      contactType: 'customer service',
      availableLanguage: ['French', 'English', 'Arabic'],
    },
    sameAs: [
      'https://linkedin.com/company/rnj-advisory',
      'https://twitter.com/rnjadvisory',
      'https://facebook.com/rnjadvisory',
    ],
    areaServed: [
      {
        '@type': 'Country',
        name: 'Tunisia',
      },
      {
        '@type': 'Country',
        name: 'France',
      },
      {
        '@type': 'Country',
        name: 'Belgium',
      },
      {
        '@type': 'Country',
        name: 'Morocco',
      },
      {
        '@type': 'Country',
        name: 'Algeria',
      },
    ],
    knowsAbout: [
      'conseil stratégique',
      'conformité réglementaire',
      'analyse institutionnelle',
      'développement économique',
      'entrepreneuriat',
      "structuration d'entreprise",
    ],
  };

  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Conseil Stratégique et Réglementaire',
    description:
      'Accompagnement stratégique et réglementaire pour acteurs publics, entreprises privées et investisseurs',
    provider: {
      '@type': 'Organization',
      name: 'RNJ Advisory',
      url: 'https://rnj-advisory.be',
    },
    serviceType: [
      'Conseil stratégique',
      'Analyse institutionnelle',
      'Conformité réglementaire',
      'Développement économique',
      "Structuration d'entreprise",
      'Transition énergétique',
    ],
    areaServed: ['Tunisia', 'France', 'Belgium', 'Morocco', 'Algeria'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
    </>
  );
}
