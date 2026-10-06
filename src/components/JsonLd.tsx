import { homeSeoServiceCatalog } from '@/lib/home-seo';

/* Un seul noeud d'entreprise pour tout le site.
   Auparavant trois blocs coexistaient : `Organization` ici (avec l'adresse et le
   telephone), `ProfessionalService` sur la page d'accueil (avec la meme adresse
   et le meme telephone) et un `Service` flottant sans `@id`. Les validateurs y
   voyaient deux fiches d'entreprise concurrentes pour la meme adresse.
   `ProfessionalService` etant un sous-type de `LocalBusiness`, lui-meme
   sous-type d'`Organization`, un noeud unique porte desormais l'ensemble. */
const organizationId = 'https://rnj-advisory.be/#organization';
const websiteId = 'https://rnj-advisory.be/#website';

const servedAreas = ['Belgium', 'Brussels', 'Tunisia', 'France', 'Morocco', 'Algeria', 'Europe'];

export default function JsonLd() {
  const businessData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': organizationId,
    name: 'RNJ Advisory',
    url: 'https://rnj-advisory.be/',
    image: 'https://rnj-advisory.be/opengraph-image.png',
    logo: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677463/rnj/minimal-horizontal-logo-white-1-317aafcc.png',
    telephone: '+32 474 03 22 66',
    email: 'info@rnj-advisory.be',
    /* Champ attendu par Google pour les fiches de services professionnels :
       son absence remontait comme une erreur dans l'audit. Une fourchette
       indicative suffit, le detail se negocie au cadrage. */
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    description:
      "Cabinet de conseil juridique et stratégique à Bruxelles : conformité réglementaire, RGPD, ESG, analyse institutionnelle, structuration juridique et partenariats public-privé.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenue Louise 500',
      addressLocality: 'Ixelles',
      addressRegion: 'Bruxelles',
      postalCode: '1050',
      addressCountry: 'BE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 50.8266,
      longitude: 4.3675,
    },
    /* Aligne sur les creneaux reellement proposes par le formulaire de prise de
       rendez-vous (09:00 -> 18:00, du lundi au vendredi). */
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+32 474 03 22 66',
      email: 'info@rnj-advisory.be',
      contactType: 'customer service',
      areaServed: servedAreas,
      availableLanguage: ['French', 'English', 'Arabic'],
    },
    /* `sameAs` sert a Google pour rattacher le site a des profils officiels : un
       profil inexistant affaiblit le signal. twitter.com/rnjadvisory repondait
       404, il a donc ete retire. */
    sameAs: [
      'https://www.linkedin.com/company/84297679/',
      'https://www.facebook.com/Nahlaaschijelalia/',
    ],
    areaServed: servedAreas,
    availableLanguage: ['fr', 'en', 'ar'],
    knowsAbout: [
      'conseil stratégique',
      'conformité réglementaire',
      'analyse institutionnelle',
      'développement économique',
      'entrepreneuriat',
      "structuration d'entreprise",
    ],
    serviceType: homeSeoServiceCatalog.map((service) => service.name),
    makesOffer: homeSeoServiceCatalog.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: `https://rnj-advisory.be${service.path}`,
        provider: { '@id': organizationId },
        areaServed: servedAreas,
      },
    })),
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: 'RNJ Advisory',
    url: 'https://rnj-advisory.be/',
    inLanguage: 'fr-BE',
    publisher: {
      '@id': organizationId,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  );
}
