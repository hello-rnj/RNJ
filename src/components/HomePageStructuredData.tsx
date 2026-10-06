import {
  homeSeoAudienceCatalog,
  homeSeoFaqCatalog,
  homeSeoServiceCatalog,
} from '@/lib/home-seo';

/* La fiche d'entreprise (ProfessionalService / LocalBusiness) est emise une
   seule fois, cote layout racine, par `JsonLd`. Cette page ne decrit donc que
   ce qui lui est propre — la page elle-meme et sa FAQ — et pointe vers le
   noeud d'entreprise par `@id`. */
const organizationId = 'https://rnj-advisory.be/#organization';
const websiteId = 'https://rnj-advisory.be/#website';
const homePageId = 'https://rnj-advisory.be/#webpage';
const faqPageId = 'https://rnj-advisory.be/#faq';

export default function HomePageStructuredData() {
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
    about: {
      '@id': organizationId,
    },
    mentions: homeSeoServiceCatalog.map((service) => ({
      '@type': 'Service',
      name: service.name,
      description: service.description,
      url: `https://rnj-advisory.be${service.path}`,
      provider: { '@id': organizationId },
    })),
    audience: homeSeoAudienceCatalog.map((audienceType) => ({
      '@type': 'Audience',
      audienceType,
    })),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://rnj-advisory.be/opengraph-image.png',
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
    inLanguage: 'fr-BE',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageData) }}
      />
    </>
  );
}
