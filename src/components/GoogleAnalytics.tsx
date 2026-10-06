'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { COOKIE_CONSENT_EVENT, COOKIE_NAME, type CookieConsentValue } from '@/lib/cookieConsent';

const GA_MEASUREMENT_ID = 'G-L421R7GCKD';

function hasAccepted() {
  return document.cookie.split('; ').some((entry) => entry === `${COOKIE_NAME}=accepted`);
}

/**
 * Charge gtag.js uniquement si le visiteur a accepte le bandeau cookies.
 * Rien n'est demande a Google tant qu'aucun consentement n'a ete donne —
 * pas de script charge en attente, pas de requete reseau emise.
 */
export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(hasAccepted());

    const handleConsentChange = (event: Event) => {
      const value = (event as CustomEvent<CookieConsentValue>).detail;
      setEnabled(value === 'accepted');
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
