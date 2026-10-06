'use client';

import { useState } from 'react';
import Link from 'next/link';
import { COOKIE_CONSENT_EVENT, COOKIE_NAME, type CookieConsentValue } from '@/lib/cookieConsent';

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

function hasConsentCookie() {
  return document.cookie
    .split('; ')
    .some((entry) => entry.startsWith(`${COOKIE_NAME}=`));
}

export default function CookieNotice() {
  const [visible, setVisible] = useState(!hasConsentCookie());

  if (!visible) {
    return null;
  }

  const choose = (value: CookieConsentValue) => {
    document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
    window.dispatchEvent(new CustomEvent<CookieConsentValue>(COOKIE_CONSENT_EVENT, { detail: value }));
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-[920px] flex-col items-center gap-4 rounded-[20px] bg-[#003300] px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)] sm:flex-row sm:justify-between sm:px-7">
        <p className="font-[Geist] text-[13px] leading-[1.5] text-white/85 sm:text-[14px]">
          Nous utilisons un cookie de mesure d&apos;audience (Google Analytics) uniquement si vous
          l&apos;acceptez. Aucune statistique n&apos;est envoyée sans votre accord.{' '}
          <Link
            href="/politique-de-confidentialite"
            className="text-[#BBCB2E] underline underline-offset-2"
          >
            En savoir plus
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose('refused')}
            className="rounded-full border border-white/30 px-6 py-2.5 font-[Geist] text-[14px] font-semibold text-white transition hover:bg-white/10"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="rounded-full bg-[#BBCB2E] px-6 py-2.5 font-[Geist] text-[14px] font-semibold text-[#003300] transition hover:opacity-90"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
