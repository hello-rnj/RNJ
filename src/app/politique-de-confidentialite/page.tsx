import type { Metadata } from 'next';
import Link from 'next/link';
import { EB_Garamond, Geist } from 'next/font/google';
import Navbar from '@/components/Navbar';
import FooterWithCta from '@/components/FooterWithCta';
import BreadcrumbStructuredData from '@/components/BreadcrumbStructuredData';
import CookiePreferenceStatus from '@/components/CookiePreferenceStatus';
import { alternatesFor } from '@/lib/seo';

const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });
const geist = Geist({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });

const TITLE = 'Politique de confidentialité';

export const metadata: Metadata = {
  title: `${TITLE} — RNJ Advisory`,
  description:
    "Politique de confidentialité de RNJ Advisory : données collectées, finalités, base légale, cookies et traceurs, et droits des personnes concernées (RGPD).",
  alternates: alternatesFor('/politique-de-confidentialite'),
  robots: { index: true, follow: true },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className={`${ebGaramond.className} mt-12 mb-5 text-[#003300]`}
      style={{ fontWeight: 500, fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: '1.15em' }}
    >
      {children}
    </h2>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-5 text-[#003300]"
      style={{ fontWeight: 400, fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}
    >
      {children}
    </p>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return <li className="mb-3">{children}</li>;
}

export default function PolitiqueConfidentialitePage() {
  return (
    <main className={geist.className} style={{ background: '#F7FCFF' }}>
      <BreadcrumbStructuredData
        items={[
          { name: 'Accueil', item: 'https://rnj-advisory.be/' },
          { name: TITLE, item: 'https://rnj-advisory.be/politique-de-confidentialite' },
        ]}
      />

      <Navbar />

      <header className="mx-auto w-full max-w-[860px] px-6 pb-4 pt-32 sm:px-8 md:pt-40">
        <h1
          className={ebGaramond.className}
          style={{ fontWeight: 500, fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: '1.1em', color: '#003300' }}
        >
          {TITLE}
        </h1>
        <p className="mt-4 text-[#003300]" style={{ opacity: 0.6, fontSize: '15px', fontWeight: 500 }}>
          Dernière mise à jour : 2 octobre 2026
        </p>
      </header>

      <article className="mx-auto w-full max-w-[860px] px-6 pb-14 pt-4 sm:px-8 lg:pb-20">
        <Paragraph>
          RNJ Advisory attache une attention particulière à la protection des données personnelles des
          utilisateurs de son site <strong>rnj-advisory.be</strong>. La présente politique explique quelles
          données sont collectées, pourquoi, pendant combien de temps, et quels sont vos droits, conformément
          au Règlement général sur la protection des données (RGPD).
        </Paragraph>

        <SectionTitle>1. Mentions légales et responsable du traitement</SectionTitle>
        <Paragraph>
          Le site rnj-advisory.be est édité et le traitement des données qui y sont collectées est assuré
          par&nbsp;:
        </Paragraph>
        <ul className="mb-5 ml-5 list-disc text-[#003300]" style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}>
          <ListItem><strong>RNJ Advisory</strong> — Société à responsabilité limitée (SRL)</ListItem>
          <ListItem>Siège social&nbsp;: Avenue Louise 500, 1050 Ixelles, Bruxelles, Belgique</ListItem>
          <ListItem>Numéro d&apos;entreprise (BCE)&nbsp;: 1006.392.123</ListItem>
          <ListItem>Numéro de TVA&nbsp;: BE 1006.392.123</ListItem>
          <ListItem>E-mail&nbsp;: <a href="mailto:info@rnj-advisory.be" className="underline underline-offset-2">info@rnj-advisory.be</a></ListItem>
          <ListItem>Téléphone&nbsp;: +32 474 03 22 66</ListItem>
        </ul>

        <SectionTitle>2. Données collectées et finalités</SectionTitle>
        <Paragraph>
          Nous collectons uniquement les données que vous nous fournissez directement, dans les cas suivants&nbsp;:
        </Paragraph>
        <ul className="mb-5 ml-5 list-disc text-[#003300]" style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}>
          <ListItem>
            <strong>Formulaire de contact</strong> — nom, e-mail, téléphone et message, afin de répondre à votre
            demande de renseignement ou de cadrage.
          </ListItem>
          <ListItem>
            <strong>Prise de rendez-vous et réservation</strong> — informations de réservation nécessaires à
            l&apos;organisation du rendez-vous, temporairement conservées dans la mémoire de votre navigateur
            (<em>sessionStorage</em>) le temps de finaliser votre démarche, puis transmises à nos services.
          </ListItem>
          <ListItem>
            <strong>Paiement des frais de dossier</strong> — lorsqu&apos;un paiement est requis, vous êtes
            redirigé vers la page de paiement sécurisée de notre prestataire <strong>Stripe</strong>. Nous ne
            recevons ni ne stockons vos données bancaires, qui sont traitées exclusivement par Stripe.
          </ListItem>
        </ul>

        <SectionTitle>3. Base légale</SectionTitle>
        <Paragraph>
          Les traitements décrits ci-dessus reposent sur l&apos;exécution de mesures précontractuelles ou
          contractuelles prises à votre demande (prise de contact, rendez-vous, paiement), ainsi que sur notre
          intérêt légitime à répondre aux demandes adressées via notre site.
        </Paragraph>

        <SectionTitle>4. Cookies et traceurs</SectionTitle>
        <Paragraph>
          Ce site utilise un outil de mesure d&apos;audience (<strong>Google Analytics</strong>), mais
          uniquement si vous l&apos;acceptez dans le bandeau affiché en bas de page. Tant que vous n&apos;avez
          pas cliqué sur «&nbsp;Accepter&nbsp;», aucun script Google Analytics n&apos;est chargé et aucune
          donnée de navigation n&apos;est envoyée à Google. Aucun autre traceur (Google Tag Manager,
          Meta/Facebook Pixel, publicité, revente de données) n&apos;est utilisé.
        </Paragraph>

        <CookiePreferenceStatus />
        <ul className="mb-5 ml-5 list-disc text-[#003300]" style={{ fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: '1.7em', opacity: 0.85 }}>
          <ListItem>
            <strong>rnj_cookie_consent</strong> — déposé lorsque vous cliquez sur «&nbsp;Accepter&nbsp;» ou
            «&nbsp;Refuser&nbsp;» dans le bandeau, avec la valeur correspondant à votre choix. Il sert
            exclusivement à mémoriser votre choix, pendant 1 an, et à déterminer si Google Analytics doit se
            charger ou non. Il ne contient aucune donnée personnelle. Strictement nécessaire au fonctionnement
            du bandeau, il ne requiert pas de consentement préalable au sens de la réglementation ePrivacy.
          </ListItem>
          <ListItem>
            <strong>Google Analytics</strong> (cookies <em>_ga</em>, <em>_ga_*</em>) — déposés uniquement si
            vous cliquez sur «&nbsp;Accepter&nbsp;». Ils permettent de mesurer la fréquentation du site
            (nombre de visiteurs, pages consultées, provenance) de façon agrégée. Si vous cliquez sur
            «&nbsp;Refuser&nbsp;», ces cookies ne sont jamais déposés et aucune donnée n&apos;est transmise à
            Google. Vous pouvez revenir sur votre choix à tout moment via le bouton «&nbsp;Modifier mon
            choix&nbsp;» ci-dessus. Ces données sont traitées par Google Ireland Limited, conformément à la{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              politique de confidentialité de Google
            </a>.
          </ListItem>
          <ListItem>
            Le <em>sessionStorage</em> de votre navigateur, utilisé uniquement pour conserver temporairement un
            brouillon de réservation en cours. Il ne s&apos;agit pas d&apos;un cookie&nbsp;: ces données restent
            sur votre appareil, ne sont jamais transmises à un tiers, et sont effacées à la fermeture de
            l&apos;onglet.
          </ListItem>
          <ListItem>
            Les vidéos intégrées depuis YouTube le sont en <strong>mode confidentialité renforcée</strong>
            (<em>youtube-nocookie.com</em>), qui ne dépose pas de cookie tant que vous ne lancez pas la lecture.
          </ListItem>
          <ListItem>
            Lors d&apos;un paiement, Stripe peut déposer ses propres cookies sur son domaine
            (<em>stripe.com</em>) à des fins de sécurité et de prévention de la fraude. Ces cookies ne sont pas
            déposés par RNJ Advisory et sont régis par la politique de confidentialité de Stripe.
          </ListItem>
        </ul>

        <SectionTitle>5. Destinataires des données</SectionTitle>
        <Paragraph>
          Vos données sont destinées aux équipes de RNJ Advisory et, le cas échéant, à nos prestataires
          techniques strictement nécessaires au fonctionnement du site&nbsp;: hébergeur, Stripe pour le
          traitement des paiements, et Google (Google Analytics) pour la mesure d&apos;audience, uniquement si
          vous l&apos;avez accepté. Aucune donnée n&apos;est vendue ni cédée à des fins commerciales.
        </Paragraph>

        <SectionTitle>6. Durée de conservation</SectionTitle>
        <Paragraph>
          Les données transmises via le formulaire de contact ou de réservation sont conservées pendant la durée
          nécessaire au traitement de votre demande, puis archivées conformément à nos obligations légales et
          comptables lorsqu&apos;un dossier ou une facturation y est lié.
        </Paragraph>

        <SectionTitle>7. Vos droits</SectionTitle>
        <Paragraph>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
          de limitation, d&apos;opposition et de portabilité sur vos données personnelles. Vous pouvez exercer
          ces droits en nous contactant à{' '}
          <a href="mailto:info@rnj-advisory.be" className="underline underline-offset-2">info@rnj-advisory.be</a>.
          Vous disposez également du droit d&apos;introduire une réclamation auprès de l&apos;Autorité de
          protection des données belge (APD) si vous estimez que vos droits ne sont pas respectés.
        </Paragraph>

        <SectionTitle>8. Sécurité</SectionTitle>
        <Paragraph>
          Nous mettons en œuvre les mesures techniques et organisationnelles raisonnables pour protéger vos
          données contre toute perte, accès non autorisé ou divulgation.
        </Paragraph>

        <p
          className={`${ebGaramond.className} mt-12 border-t pt-8 text-[#003300]`}
          style={{ borderColor: 'rgba(0,51,0,0.2)', fontWeight: 500, fontSize: 'clamp(16px, 1.8vw, 20px)', lineHeight: '1.4em' }}
        >
          Pour toute question relative à cette politique ou à vos données personnelles,{' '}
          <Link href="/contact" className="underline underline-offset-4" style={{ color: '#BBCB2E' }}>
            contactez-nous
          </Link>
          .
        </p>
      </article>

      <FooterWithCta />
    </main>
  );
}
