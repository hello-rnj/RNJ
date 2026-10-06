type ServiceStructuredDataProps = {
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
  serviceType?: string;
};

export default function ServiceStructuredData({
  serviceName,
  serviceDescription,
  serviceUrl,
  serviceType = 'ProfessionalService',
}: ServiceStructuredDataProps) {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': serviceType,
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    provider: {
      '@type': 'Organization',
      name: 'RNJ Advisory',
      url: 'https://rnj-advisory.be',
      logo: 'https://rnj-advisory.be/opengraph-image.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Avenue Louise 500',
        addressLocality: 'Ixelles',
        addressRegion: 'Bruxelles-Capitale',
        postalCode: '1050',
        addressCountry: 'BE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 50.8225,
        longitude: 4.3625,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+32-474-03-22-66',
        contactType: 'customer service',
        availableLanguage: ['French', 'English', 'Arabic'],
      },
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Belgium',
      },
      {
        '@type': 'City',
        name: 'Brussels',
      },
      {
        '@type': 'Country',
        name: 'Tunisia',
      },
      {
        '@type': 'Country',
        name: 'France',
      },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 50.8503,
        longitude: 4.3517,
      },
      geoRadius: '50000',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
    />
  );
}
