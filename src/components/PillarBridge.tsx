import Link from 'next/link';
import { EB_Garamond, Geist } from 'next/font/google';
import type { Pillar } from '@/data/blogPosts';

const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });
const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });

/**
 * Encart de pont entre les deux piliers editoriaux, en bas d'article.
 *
 * Chaque article ne portait que deux liens internes, `/contact` et `/blogs` :
 * un lecteur venu d'une recherche « MACF » ne trouvait aucun chemin vers les
 * prestations belges, et inversement. L'encart renvoie donc vers l'AUTRE
 * pilier que celui de l'article — c'est tout son interet, un lien de plus vers
 * le meme silo n'apprendrait rien de neuf ni au lecteur ni au moteur.
 *
 * `pillar` est celui de l'article hote, pas celui de la destination.
 */
const BRIDGE: Record<Pillar, { title: string; text: string; href: string; cta: string }> = {
  /* Article belge -> vitrine des grands projets internationaux. */
  belgique: {
    title: 'Un projet à l’international ou dans les énergies ?',
    text: "RNJ Advisory intervient aussi sur les grands projets institutionnels et énergétiques : cadre réglementaire de l’interconnexion Elmed, garanties d’origine, partenariats public-privé et analyse d’impact en Tunisie, en Europe et en Afrique.",
    href: '/expertises',
    cta: 'Découvrir nos projets et expertises',
  },
  /* Article international -> prestations juridiques operationnelles en Belgique. */
  international: {
    title: 'Besoin d’un accompagnement juridique en Belgique ?',
    text: "Structurer un investissement, sécuriser un contrat ou créer votre société en Belgique demande un conseil de terrain. Nous accompagnons entrepreneurs, PME et ASBL sur le droit des affaires, la revue contractuelle, la conformité et la gouvernance.",
    href: '/services/conseil-juridique',
    cta: 'Voir nos services juridiques',
  },
};

export default function PillarBridge({ pillar }: { pillar: Pillar }) {
  const bridge = BRIDGE[pillar];

  return (
    /* Meme gabarit que le `<article>` qui precede (max-w-[860px], px-6/sm:px-8),
       pour que l'encart s'aligne sur la colonne de texte. */
    <aside className="mx-auto w-full max-w-[860px] px-6 pb-14 sm:px-8 lg:pb-20">
      <div
        className="flex flex-col gap-4 rounded-[20px] px-6 py-8 sm:px-9 sm:py-10"
        style={{ background: 'rgba(187, 203, 46, 0.12)', border: '1px solid rgba(0, 51, 0, 0.12)' }}
      >
        <h2
          className={`${ebGaramond.className} text-[#003300]`}
          style={{ fontWeight: 500, fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: '1.15em', margin: 0 }}
        >
          {bridge.title}
        </h2>
        <p
          className={`${geist.className} text-[#003300]/80`}
          style={{ fontWeight: 400, fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: '1.6em', margin: 0 }}
        >
          {bridge.text}
        </p>
        <div className="mt-2">
          <Link
            href={bridge.href}
            className={`${geist.className} inline-flex h-[46px] items-center justify-center rounded-full px-7 font-semibold transition hover:brightness-95`}
            style={{ background: '#BBCB2E', color: '#003300', fontSize: '14px' }}
          >
            {bridge.cta}
          </Link>
        </div>
      </div>
    </aside>
  );
}
