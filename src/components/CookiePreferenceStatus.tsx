'use client';

import { COOKIE_NAME } from '@/lib/cookieConsent';

function readConsentCookie(): string | null {
  const match = document.cookie.split('; ').find((entry) => entry.startsWith(`${COOKIE_NAME}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

/**
 * Preuve visible, sans outils developpeur, que le cookie de consentement est
 * reellement pose : on relit sa valeur depuis `document.cookie` et on
 * l'affiche telle quelle. « Modifier mon choix » l'efface et recharge la
 * page pour faire reapparaitre le bandeau et permettre de rejouer le cycle.
 */
export default function CookiePreferenceStatus() {
  const value = readConsentCookie();

  const label =
    value === 'accepted' ? 'Accepté' : value === 'refused' ? 'Refusé' : 'Aucun choix enregistré pour le moment';

  const resetChoice = () => {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0`;
    window.location.reload();
  };

  return (
    <div
      className="mb-6 flex flex-col gap-2 rounded-[14px] border px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
      style={{ borderColor: 'rgba(0,51,0,0.25)', background: 'rgba(187,203,46,0.1)' }}
    >
      <p className="text-[#003300]" style={{ fontSize: '15px', fontWeight: 600 }}>
        Votre choix actuel, lu directement depuis le cookie&nbsp;:{' '}
        <span style={{ fontWeight: 700 }}>{label}</span>
      </p>
      <button
        type="button"
        onClick={resetChoice}
        className="self-start text-[14px] font-semibold text-[#003300] underline underline-offset-2 sm:self-auto"
      >
        Modifier mon choix
      </button>
    </div>
  );
}
