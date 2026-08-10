/**
 * Logos partenaires de la bande defilante, partages par la page d'accueil et la
 * page A propos — les deux avaient leur propre liste, celle d'A propos etant
 * restee a 11 logos sans les 29 ajoutes depuis.
 *
 * `ratio` = largeur / hauteur du fichier. Il sert a donner a chaque emplacement
 * sa largeur propre, et a ponderer sa hauteur (voir `logoHeightFactor`).
 */
export const partnerAssetLogos = [
  { src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678791/rnj/asset-14-1-cda0f5e7.png', ratio: 0.524 },
  { src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678792/rnj/asset-15-1-7f0249bf.png', ratio: 1.478 },
  { src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779679416/rnj/asset-17-1-5077f95f.png', ratio: 1.185 },
  { src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678793/rnj/asset-22-1-ac5775de.png', ratio: 1.0 },
  { src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678793/rnj/asset-23-1-9c5664dc.png', ratio: 2.388 },
  { src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678793/rnj/asset-24-1-1c05ea09.png', ratio: 2.626 },
  { src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678794/rnj/asset-26-1-3d6250e2.png', ratio: 4.288 },
  // Ces deux bandeaux restaient les plus imposants de la piste meme apres la
  // ponderation par le ratio : on les rapetisse d'un cran supplementaire.
  { src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678795/rnj/asset-27-1-8679f4ab.png', ratio: 4.676, scale: 0.8 },
  { src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779679414/rnj/asset-28-1-d6d25061.png', ratio: 3.507, scale: 0.8 },
  { src: '/optimized/Layer 1 (22).png', ratio: 2.963, scale: 0.8 },
  { src: '/optimized/Layer 1 (23).png', ratio: 2.281 },
  { src: '/optimized/Asset 1.svg', ratio: 0.801 },
  { src: '/optimized/Asset 2.svg', ratio: 3.494, scale: 0.8 },
  { src: '/optimized/Asset 3.svg', ratio: 0.961 },
  { src: '/optimized/Asset 4.svg', ratio: 2.525 },
  { src: '/optimized/Asset 5.svg', ratio: 2.894 },
  { src: '/optimized/Asset 6.svg', ratio: 1.319 },
  { src: '/optimized/Asset 7.svg', ratio: 2.613 },
  { src: '/optimized/Asset 8.svg', ratio: 1.164 },
  { src: '/optimized/Asset 9.svg', ratio: 0.936 },
  { src: '/optimized/Asset 10.svg', ratio: 1.034 },
  { src: '/optimized/Asset 12.svg', ratio: 3.331 },
  { src: '/optimized/Asset 14.svg', ratio: 0.493 },
  { src: '/optimized/Asset 15.svg', ratio: 3.514 },
  { src: '/optimized/Asset 16.svg', ratio: 0.955 },
  // Variante monochrome de « Asset 17.svg » : le logo d'origine pose la main sur
  // une pastille pleine (ciel degrade + vagues), que le filtre blanchissant
  // transformait en disque uni. On a retire ces quatre aplats de fond, ne gardant
  // que l'anneau, la main et le texte — le filtre les rend blancs comme les
  // autres logos.
  { src: '/optimized/Asset 17 mono.svg', ratio: 1.58 },
  { src: '/optimized/Asset 18.svg', ratio: 2.063 },
  { src: '/optimized/Asset 19.svg', ratio: 0.625 },
  { src: '/optimized/Asset 20.svg', ratio: 3.04 },
  { src: '/optimized/Asset 21.svg', ratio: 3.887 },
  { src: '/optimized/Asset 22_1.svg', ratio: 1.899 },
  { src: '/optimized/Asset 23.svg', ratio: 0.796 },
  { src: '/optimized/Asset 24.svg', ratio: 0.947 },
  { src: '/optimized/Asset 25.svg', ratio: 2.569 },
  { src: '/optimized/Asset 26.svg', ratio: 3.101 },
  { src: '/optimized/Asset 27.svg', ratio: 3.515 },
  { src: '/optimized/Asset 28.svg', ratio: 2.924 },
  { src: '/optimized/Asset 29.svg', ratio: 1.0 },
  { src: '/optimized/Asset 30.svg', ratio: 1.039 },
] as const;

/** Tous les logos sont blanchis pour s'harmoniser sur la bande. */
export const LOGO_WHITE_FILTER = '[filter:brightness(0)_saturate(100%)_invert(100%)]';

/**
 * A hauteur egale, un bandeau de ratio 4,7 occupe neuf fois la largeur d'un logo
 * carre et ecrase ses voisins. On reduit donc la hauteur des logos allonges, en
 * racine carree pour egaliser les surfaces sans les rapetisser a l'exces.
 *
 * `scale` permet de corriger un logo au cas par cas, quand la formule generale
 * le laisse encore trop grand face a ses voisins.
 */
export function logoHeightFactor(logo: { ratio: number; scale?: number }): number {
  const base = Math.max(0.68, Math.min(1, Math.sqrt(2.2 / logo.ratio)));
  return base * (logo.scale ?? 1);
}

/** Duree du defilement : proportionnelle a la longueur de la piste. */
export const logoScrollSeconds = Math.round(partnerAssetLogos.length * 2.36);
