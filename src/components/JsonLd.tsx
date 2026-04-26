export default function JsonLd() {
  const organizationId = 'https://rnj-advisory.be/#organization';
  const websiteId = 'https://rnj-advisory.be/#website';

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: 'RNJ Advisory',
    url: 'https://rnj-advisory.be',
    logo: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg',
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
      email: 'info@rnj-advisory.be',
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

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: 'RNJ Advisory',
    url: 'https://rnj-advisory.be',
    inLanguage: 'fr-BE',
    publisher: {
      '@id': organizationId,
    },
  };

  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Conseil Stratégique et Réglementaire',
    description:
      'Accompagnement stratégique et réglementaire pour acteurs publics, entreprises privées et investisseurs',
    provider: {
      '@id': organizationId,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
    </>
  );
}
