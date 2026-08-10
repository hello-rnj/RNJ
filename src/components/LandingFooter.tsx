'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type FooterItem = {
  label: string;
  href?: string;
};

type FooterColumn = {
  title: string;
  items: FooterItem[];
};

const footerColumns: FooterColumn[] = [
  {
    title: 'Cabinet',
    items: [
      { label: 'Accueil', href: '/' },
      { label: 'À propos', href: '/a-propos' },
      { label: 'Projet', href: '/projets' },
    ],
  },
  {
    /* Trois des quatre intitules pointaient tous vers la meme page /services.
       La colonne mene desormais aux trois pages de services. */
    title: 'Expertise',
    items: [
      { label: "Création d'entreprise", href: '/services/creation-entreprise' },
      { label: 'Accompagnement juridique', href: '/services/conseil-juridique' },
      { label: 'Accélérer mon business', href: '/services/accelerer-mon-business' },
    ],
  },
  {
    title: 'Publications',
    items: [
      { label: 'Blog', href: '/blogs' },
    ],
  },
];

const socialIcons = [
  {
    name: 'Instagram',
    src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677785/rnj/mask-group-23-1ce30be9.png',
    href: 'https://instagram.com',
  },
  {
    name: 'LinkedIn',
    src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677785/rnj/mask-group-24-fd4f223e.png',
    href: 'https://www.linkedin.com/company/84297679/',
  },
  {
    name: 'Facebook',
    src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677788/rnj/mask-group-27-5870749d.png',
    href: 'https://www.facebook.com/Nahlaaschijelalia/',
  },
] as const;

const footerBackgroundMask = '/optimized/mask-group-45.webp';

export default function LandingFooter() {
  const contactButtonRef = useRef<HTMLAnchorElement | null>(null);
  const [isContactNear, setIsContactNear] = useState(false);
  const [isContactFocused, setIsContactFocused] = useState(false);
  const [isExtraLargeViewport, setIsExtraLargeViewport] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let rafId = 0;
    let mouseX = 0;
    let mouseY = 0;

    const updateContactProximity = () => {
      rafId = 0;

      const button = contactButtonRef.current;

      if (!button) {
        setIsContactNear(false);
        return;
      }

      const rect = button.getBoundingClientRect();
      const nearZone = {
        left: rect.left - 90,
        right: rect.right + 90,
        top: rect.top - 80,
        bottom: rect.bottom + 80,
      };

      const isInNearZone =
        mouseX >= nearZone.left &&
        mouseX <= nearZone.right &&
        mouseY >= nearZone.top &&
        mouseY <= nearZone.bottom;

      if (!isInNearZone) {
        setIsContactNear(false);
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceToCenter = Math.hypot(mouseX - centerX, mouseY - centerY);

      setIsContactNear(distanceToCenter <= 240 || isInNearZone);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!rafId) {
        rafId = window.requestAnimationFrame(updateContactProximity);
      }
    };

    const handleWindowLeave = () => {
      setIsContactNear(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('blur', handleWindowLeave);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('blur', handleWindowLeave);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    const updateViewportState = () => {
      setIsExtraLargeViewport(mediaQuery.matches);
    };

    updateViewportState();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateViewportState);
      return () => {
        mediaQuery.removeEventListener('change', updateViewportState);
      };
    }

    mediaQuery.addListener(updateViewportState);

    return () => {
      mediaQuery.removeListener(updateViewportState);
    };
  }, []);

  const isContactExpanded = isExtraLargeViewport && (isContactNear || isContactFocused);

  return (
    <footer className="relative isolate w-full overflow-hidden bg-[#BBCB2E]">
      <div className="relative w-full overflow-hidden lg:min-h-[816px]">
        <div className="absolute inset-0 bg-[#BBCB2E]" aria-hidden="true" />

        <Image
          src={footerBackgroundMask}
          alt=""
          fill
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none object-cover object-center"
        />

        <div className="relative z-10 flex h-full w-full px-4 py-10 sm:px-6 lg:px-[25px] lg:py-[40px]">
          <div className="mx-auto flex w-full max-w-[1462px] flex-col gap-[40px]">
            <div className="flex w-full flex-col items-center gap-5 xl:flex-row xl:justify-between xl:gap-[209px]">
              <div className="w-full max-w-[454px] rounded-[23px] bg-[#F7FCFF] p-[5px]">
                <div className="flex min-h-[74px] items-center justify-between gap-3 rounded-[18px] bg-[#F7FCFF] pl-5 pr-[5px] sm:min-h-[92px] sm:pl-10">
                  <span className="font-[Geist] text-[15px] font-medium leading-4 text-[#003300] opacity-50 sm:text-[20px]">
                    Notre Newsletter
                  </span>

                  <button
                    type="button"
                    className="flex h-[64px] min-w-[122px] items-center justify-center rounded-[18px] bg-[#C1CB82] px-5 transition hover:opacity-90 sm:h-[92px] sm:min-w-[156px] sm:px-[28px]"
                  >
                    <span className="font-[Geist] text-[14px] font-extrabold leading-4 text-[#003300] sm:text-[16px]">
                      S&apos;abonner
                    </span>
                  </button>
                </div>
              </div>

              <div className="relative hidden h-[49px] w-[175px] shrink-0 xl:block">
                <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678185/rnj/mask-group-21-d1c01771.png"
                  alt="Décor"
                  fill
                  className="object-contain"
                 loading="lazy"/>
              </div>

              <div className="relative h-[78px] w-full max-w-[359px] sm:h-[92px] xl:ml-auto xl:h-[106px]">
                <Link
                  ref={contactButtonRef}
                  href="/contact"
                  onFocus={() => setIsContactFocused(true)}
                  onBlur={() => setIsContactFocused(false)}
                  className={`absolute right-0 top-0 z-[12] flex h-[78px] items-center overflow-hidden rounded-[451.572px] bg-[#C1CB82] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-[92px] xl:h-[106px] ${
                    isContactExpanded
                      ? 'w-full justify-center px-5 xl:w-[580px] xl:justify-between xl:pl-[6px] xl:pr-[54px]'
                      : 'w-full justify-center px-5 xl:px-[52px]'
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center font-[Geist] text-[32px] font-semibold leading-[1] text-[#003300] transition-all duration-400 sm:text-[40px] xl:text-[53.47px] ${
                      isContactExpanded ? 'scale-[0.92] opacity-0' : 'scale-100 opacity-100'
                    }`}
                  >
                    Contact
                  </span>

                  <span
                    className={`flex w-full items-center justify-between gap-[22.58px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isContactExpanded
                        ? 'translate-x-0 opacity-100'
                        : 'pointer-events-none translate-x-10 opacity-0'
                    }`}
                  >
                    <span className="flex h-[94px] w-[320px] items-center justify-center rounded-[192px] bg-white px-[23px] py-[13px]">
                      <span className="font-[Geist] text-[45px] font-semibold leading-[48px] text-[#BBCB2E] sm:text-[50px] lg:text-[57.0372px]">
                        Contact
                      </span>
                    </span>

                    <span className="relative h-[49px] w-[175px] shrink-0">
                      <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678185/rnj/mask-group-21-d1c01771.png"
                        alt="Flèches"
                        fill
                        className="object-contain"
                       loading="lazy"/>
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] bg-[rgba(0,51,0,0.09)] px-5 pb-7 pt-8 shadow-[2px_4px_39.6px_rgba(0,0,0,0.69)] backdrop-blur-[3px] sm:px-8 sm:pt-10 lg:min-h-[553px] lg:px-[35px] lg:pb-[40px] lg:pt-[35px]">
              <div className="flex h-full flex-col justify-between gap-12">
                {/* Mise cote a cote a partir de xl seulement. Entre 1024 et 1279px
                    (iPad Pro), le bloc de gauche prend 352px sur les 890px de la
                    carte : il ne restait que 490px pour les colonnes, trop peu pour
                    trois, et « Publications » retombait sur une deuxieme rangee. */}
                <div className="flex flex-col gap-10 xl:flex-row xl:justify-between">
                  <div className="flex max-w-[352px] flex-col gap-[30px]">
                    <Image src="/optimized/rnj-logo-white.png"
                      alt="RNJ Advisory"
                      width={700}
                      height={136}
                      className="h-auto w-[233px]"
                     priority/>

                    {/* `leading-4` valait 16px d'interligne pour un texte de 16px :
                        les lignes se touchaient et le paragraphe devenait un bloc
                        compact. 1,6 laisse respirer les quatre lignes. */}
                    <p className="font-[Geist] text-[16px] font-medium leading-[1.6] text-white opacity-50">
                      Cabinet de conseil stratégique et réglementaire accompagnant acteurs publics,
                      entreprises privées et investisseurs dans la sécurisation de leurs projets et la
                      maîtrise des environnements institutionnels complexes.
                    </p>
                  </div>

                  {/* Trois colonnes, pas quatre : la grille en comptait une de plus
                      que de contenu, ce qui laissait un vide a droite et serrait les
                      trois autres sur la gauche. */}
                  <div className="grid w-full max-w-[916px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:gap-5">
                    {footerColumns.map((column) => (
                      <div key={column.title} className="flex flex-col gap-4 sm:gap-6">
                        <h3 className="font-[Geist] text-[20px] font-semibold leading-4 text-white">
                          {column.title}
                        </h3>

                        {/* Chaque entree porte deja un `href` dans `footerColumns` ; il
                            n'etait pas utilise et les liens etaient rendus comme des
                            <div aria-disabled>, donc inertes alors que les pages
                            existent. On rend un <Link> des qu'un href est defini. */}
                        <div className="flex flex-col items-start gap-[6px] sm:gap-[17px]">
                          {column.items.map((item) => {
                            const content = (
                              <>
                                <span className="h-[6px] w-[6px] rounded-full bg-white" aria-hidden="true" />
                                <span className="whitespace-nowrap font-[Geist] text-[16px] font-medium leading-4 text-white opacity-80">
                                  {item.label}
                                </span>
                              </>
                            );

                            return item.href ? (
                              <Link
                                key={`${column.title}-${item.label}`}
                                href={item.href}
                                className="flex items-center gap-[8px] transition-opacity hover:opacity-80 sm:gap-[14px]"
                              >
                                {content}
                              </Link>
                            ) : (
                              <div
                                key={`${column.title}-${item.label}`}
                                aria-disabled="true"
                                className="flex cursor-default items-center gap-[8px] sm:gap-[14px]"
                              >
                                {content}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-5 pt-5 xl:flex-row xl:items-end xl:justify-between">
                  <div className="flex flex-nowrap items-center justify-center gap-[12px] sm:gap-[14px]">
                    {socialIcons.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full border-[1.5px] border-white/20 transition-all duration-200 hover:border-white/40 hover:bg-white/5 sm:h-[44px] sm:w-[44px]"
                        aria-label={social.name}
                      >
                        <Image src={social.src} alt={social.name} fill sizes="44px" loading="lazy" className="object-contain p-[8px]" unoptimized />
                      </a>
                    ))}
                  </div>

                  {/* Le copyright n'est plus a cote des coordonnees mais sur sa
                      propre ligne, sous tout le bloc : a cote, il prenait de la
                      largeur sur la meme rangee que les reseaux sociaux et les
                      trois coordonnees, et le manque de place cassait le
                      telephone et l'e-mail en quatre lignes chacun.
                      min-w-0 + whitespace-nowrap garantissent qu'aucune des
                      trois coordonnees ne se coupe. */}
                  {/* En colonne, chaque ligne se centrait pour elle-meme : les trois
                      icones se retrouvaient a trois abscisses differentes, celle de
                      l'adresse nettement plus a gauche que les deux autres. Le bloc
                      se dimensionne maintenant sur sa ligne la plus large et se centre
                      d'un seul tenant, ce qui aligne les icones. */}
                  <div className="mx-auto flex w-fit max-w-full flex-col items-start gap-3 whitespace-nowrap sm:mx-0 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-3 xl:flex-nowrap xl:gap-x-[40px]">
                      <div className="flex items-center gap-3 sm:gap-5">
                        <div className="relative h-[22px] w-[22px] shrink-0">
                          <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677789/rnj/layer-1-27-a0d86191.png"
                            alt="Téléphone"
                            fill
                            className="object-contain"
                           loading="lazy"/>
                        </div>

                        <span className="font-[Geist] text-[13px] font-medium leading-[18px] tracking-[0.03em] text-white sm:text-[15.37px] sm:leading-[21px] sm:tracking-[0.05em]">
                          +32 474 03 22 66
                        </span>
                      </div>

                      <div className="flex items-center gap-3 sm:gap-5">
                        <div className="relative h-[15.47px] w-[22px] shrink-0">
                          <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677789/rnj/layer-1-26-33e2a54e.png"
                            alt="E-mail"
                            fill
                            className="object-contain"
                           loading="lazy"/>
                        </div>

                        <span className="break-all text-center font-[Geist] text-[13px] font-medium leading-[18px] tracking-[0.03em] text-white sm:text-left sm:text-[15.37px] sm:leading-[21px] sm:tracking-[0.05em]">
                          info@rnj-advisory.be
                        </span>
                      </div>

                      {/* Adresse. L'icone source est en #332203 sur un footer
                          sombre : on la blanchit avec le meme filtre que la
                          bande de logos partenaires. Ratio du viewBox
                          28.75x33.72 -> 18.76px de large pour 22px de haut,
                          soit la hauteur des icones telephone et e-mail.
                          Le drapeau est une image et non l'emoji 🇧🇪 : Windows
                          ne fournit aucun glyphe de drapeau. */}
                      <div className="flex items-center gap-3 sm:gap-5">
                        <div className="relative h-[22px] w-[18.76px] shrink-0">
                          <Image
                            src="/optimized/localisation%20icon.svg"
                            alt="Adresse"
                            fill
                            className="object-contain [filter:brightness(0)_saturate(100%)_invert(100%)]"
                            loading="lazy"
                          />
                        </div>

                        {/* L'adresse fait 439px et la rangee entiere 913px : elle
                            ne tient d'un seul tenant qu'a partir de xl. En dessous,
                            le `whitespace-nowrap` du conteneur la faisait deborder
                            de la carte, ou elle etait coupee par `overflow-hidden`.
                            Le telephone et l'e-mail gardent leur nowrap.
                            Pas de `flex-wrap` ici : le drapeau est un element flex et
                            passait seul a la ligne des qu'il manquait quelques pixels.
                            Sans lui, c'est le texte qui se replie et le drapeau reste
                            colle a sa droite. */}
                        <span className="flex items-center gap-2 whitespace-normal text-left font-[Geist] text-[13px] font-medium leading-[18px] tracking-[0.03em] text-white sm:text-[15.37px] sm:leading-[21px] sm:tracking-[0.05em] xl:whitespace-nowrap">
                          Avenue Louise 500, Ixelles Bruxelles Belgique
                          {/* alt vide : le drapeau est decoratif, le mot
                              « Belgique » est deja dans le texte juste avant.
                              Avec alt="Belgique" il apparaissait en double a
                              la copie du texte et pour les lecteurs d'ecran. */}
                          <Image
                            src="/optimized/be-flag.png"
                            alt=""
                            aria-hidden
                            width={38}
                            height={44}
                            unoptimized
                            className="inline-block h-auto w-[20px] shrink-0"
                          />
                        </span>
                      </div>
                  </div>
                </div>

                <span className="block pt-4 text-center font-[Geist] text-[12px] font-medium leading-[18px] text-white opacity-50 sm:text-[15.37px] sm:leading-[21px]">
                  © 2026 RNJ Advisory. Tous droits réservés.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
