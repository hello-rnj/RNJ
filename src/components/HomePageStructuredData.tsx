import { homeSeoKeywords, homeSeoServiceCatalog } from '@/lib/home-seo';

const organizationId = 'https://rnj-advisory.be/#organization';
const websiteId = 'https://rnj-advisory.be/#website';
const professionalServiceId = 'https://rnj-advisory.be/#professional-service';
const homePageId = 'https://rnj-advisory.be/#webpage';

export default function HomePageStructuredData() {
  const professionalServiceData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': professionalServiceId,
    name: 'RNJ Advisory',
    url: 'https://rnj-advisory.be/',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776389845/rnj/og-home-f960652e.jpg',
    logo: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg',
    description:
      "Cabinet de conseil stratégique et réglementaire à Bruxelles accompagnant entrepreneurs, PME, investisseurs et institutions sur la conformité réglementaire, l'analyse institutionnelle, l'ESG, les appels à projets et la structuration juridique.",
    keywords: homeSeoKeywords.join(', '),
    areaServed: ['Belgium', 'Brussels', 'Tunisia', 'France', 'Morocco', 'Algeria'],
    availableLanguage: ['fr', 'en', 'ar'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenue Louise 500',
      addressLocality: 'Ixelles',
      addressRegion: 'Bruxelles',
      postalCode: '1050',
      addressCountry: 'BE',
    },
    serviceType: homeSeoServiceCatalog.map((service) => service.name),
    provider: {
      '@id': organizationId,
    },
    makesOffer: homeSeoServiceCatalog.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: `https://rnj-advisory.be${service.path}`,
        areaServed: ['Belgium', 'Brussels', 'Tunisia', 'France', 'Morocco', 'Algeria'],
      },
    })),
  };

  const webPageData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': homePageId,
    url: 'https://rnj-advisory.be/',
    name: 'Cabinet de conseil stratégique à Bruxelles, conformité réglementaire et ESG',
    description:
      "Landing page RNJ Advisory dédiée au conseil stratégique, à la conformité réglementaire, à l'analyse institutionnelle, au RGPD, à l'ESG et aux appels à projets.",
    inLanguage: 'fr-BE',
    isPartOf: {
      '@id': websiteId,
    },
    about: homeSeoServiceCatalog.map((service) => ({
      '@type': 'Thing',
      name: service.name,
    })),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776389845/rnj/og-home-f960652e.jpg',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageData) }}
      />
    </>
  );
}
