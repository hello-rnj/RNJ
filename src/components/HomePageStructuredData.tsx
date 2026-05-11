import {
  homeSeoAudienceCatalog,
  homeSeoFaqCatalog,
  homeSeoKeywords,
  homeSeoServiceCatalog,
} from '@/lib/home-seo';

const organizationId = 'https://rnj-advisory.be/#organization';
const websiteId = 'https://rnj-advisory.be/#website';
const professionalServiceId = 'https://rnj-advisory.be/#professional-service';
const homePageId = 'https://rnj-advisory.be/#webpage';
const faqPageId = 'https://rnj-advisory.be/#faq';

const servedAreas = ['Belgium', 'Brussels', 'Tunisia', 'Europe'];

export default function HomePageStructuredData() {
  const professionalServiceData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': professionalServiceId,
    name: 'RNJ Advisory',
    url: 'https://rnj-advisory.be/',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive,w_1200,h_630,c_limit/v1776389845/rnj/og-home-f960652e.jpg',
    logo: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg',
    telephone: '+32 474 03 22 66',
    email: 'info@rnj-advisory.be',
    description:
      "Cabinet de conseil juridique et stratégique à Bruxelles accompagnant entrepreneurs, PME, ASBL, investisseurs et institutions sur la conformité réglementaire, l'analyse institutionnelle, l'ESG, la structuration juridique et les appels à projets.",
    keywords: homeSeoKeywords.join(', '),
    areaServed: servedAreas,
    availableLanguage: ['fr', 'en', 'ar'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenue Louise 500',
      addressLocality: 'Ixelles',
      addressRegion: 'Bruxelles',
      postalCode: '1050',
      addressCountry: 'BE',
    },
    audience: homeSeoAudienceCatalog.map((audienceType) => ({
      '@type': 'Audience',
      audienceType,
    })),
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
        areaServed: servedAreas,
      },
    })),
  };

  const webPageData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': homePageId,
    url: 'https://rnj-advisory.be/',
    name: 'Conseil juridique et stratégique à Bruxelles pour votre croissance durable',
    description:
      "RNJ Advisory accompagne entrepreneurs, PME, ASBL, investisseurs et institutions sur la conformité réglementaire, l'analyse institutionnelle, le RGPD, l'ESG et la structuration juridique.",
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
      url: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive,w_1200,h_630,c_limit/v1776389845/rnj/og-home-f960652e.jpg',
    },
    potentialAction: {
      '@type': 'ContactAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://rnj-advisory.be/contact',
      },
      name: 'Demander un cadrage',
    },
  };

  const faqPageData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': faqPageId,
    url: 'https://rnj-advisory.be/#faq',
    mainEntity: homeSeoFaqCatalog.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
    isPartOf: {
      '@id': homePageId,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageData) }}
      />
    </>
  );
}
