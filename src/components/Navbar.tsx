'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SERVICES_LINKS = [
  { label: "Création d'entreprise", href: '/services/creation-entreprise' },
  { label: 'Accompagnement juridique', href: '/services/conseil-juridique' },
  { label: 'Accélérer mon business', href: '/services/accelerer-mon-business' },
];

export default function Navbar({
  dark = false,
  glass = false,
  glassText = 'light',
  logo,
}: {
  dark?: boolean;
  glass?: boolean;
  glassText?: 'light' | 'dark';
  /** Force la version du logo, independamment de la couleur du texte. */
  logo?: 'light' | 'dark';
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  // The glass panel is translucent, so the copy has to follow the hero showing through
  // it: white over the dark heroes, dark green over a pale one (creation-entreprise).
  const onLightGlass = glass && glassText === 'dark';
  // Voile du panneau en verre ramene de 0.1 a 0.04 : le fond de la page transparait
  // davantage. Attention, l'essentiel de l'effet « opaque » vient du flou ci-dessous,
  // pas de cette teinte.
  const navBg   = glass ? 'rgba(247, 252, 255, 0.04)' : dark ? '#002600' : '#F7FCFF';
  const textCol = onLightGlass ? '#003300' : dark || glass ? '#FFFFFF' : '#003300';
  // Par defaut le logo suit la couleur du texte ; `logo` permet de le forcer.
  const useLightLogo = logo ? logo === 'light' : glass && !onLightGlass;
  const glassPanel = glass
    ? { border: '1px solid rgba(255, 255, 255, 0.34)', backdropFilter: 'blur(49.2px)', WebkitBackdropFilter: 'blur(49.2px)' }
    : {};

  return (
    <nav
      className={
        glass
          ? 'absolute left-0 top-0 z-50 w-full'
          : 'absolute left-1/2 top-3 z-50 w-[95%] max-w-[1450px] -translate-x-1/2 sm:top-4 sm:w-[94%] md:top-8 md:w-[92%] lg:top-10 lg:w-[90%] xl:top-12'
      }
    >
      <div
        className={
          glass
            ? 'flex flex-row items-center justify-between gap-3 px-4 py-4 sm:px-6 md:px-[34px] md:py-[34px]'
            : 'flex flex-row items-center justify-between gap-3 rounded-[16px] px-3 py-3 sm:px-4 md:rounded-[19.6104px] md:px-5 md:py-[13.8772px] lg:px-6 xl:px-[25px]'
        }
        style={{
          background: navBg,
          boxShadow: '0px 3.23873px 28.9866px rgba(0, 51, 0, 0.25)',
          ...glassPanel,
        }}
      >
        <Link href="/" className="flex min-w-0 items-center gap-2 md:gap-2.5">
          {/* Deux declinaisons du meme dessin : blanche sur les fonds sombres,
              verte sur les fonds clairs. Servies en 700 px de large, soit 3x le
              plus grand affichage du site (233 px dans le pied de page), ce qui
              suffit a rester net sur les ecrans a haute densite. */}
          <Image
            src={useLightLogo ? '/optimized/rnj-logo-white.png' : '/optimized/rnj-logo.png'}
            alt="RNJ Advisory"
            width={700}
            height={136}
            className="h-auto w-[130px] sm:w-[160px] md:w-[180px]"
            priority
            unoptimized
          />
        </Link>

        <div className="hidden flex-row items-center gap-6 xl:flex 2xl:gap-[29.36px]">
          <Link
            href="/"
            className="text-center font-[Geist] text-[15px] font-semibold transition hover:opacity-75 2xl:text-[17px]"
            style={{ color: textCol }}
          >
            Accueil
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-1.5 text-center font-[Geist] text-[15px] font-semibold transition hover:opacity-75 2xl:text-[17px]"
              style={{ color: textCol }}
            >
              <span>Services</span>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`transition-transform ${isServicesOpen ? '' : 'rotate-180'}`}
              >
                <path d="M1 5 L6 1 L11 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isServicesOpen && (
              <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                <div
                  className="flex w-[240px] flex-col overflow-hidden rounded-[14px] py-2"
                  style={{
                    background: navBg,
                    boxShadow: '0px 3.23873px 28.9866px rgba(0, 51, 0, 0.25)',
                    ...glassPanel,
                  }}
                >
                  {SERVICES_LINKS.map((service) => (
                    <Link
                      key={service.label}
                      href={service.href}
                      onClick={() => setIsServicesOpen(false)}
                      className="px-5 py-2.5 font-[Geist] text-[15px] font-semibold transition hover:opacity-75"
                      style={{ color: textCol }}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/projets"
            className="text-center font-[Geist] text-[15px] font-semibold opacity-50 transition hover:opacity-75 2xl:text-[17px]"
            style={{ color: textCol }}
          >
            Projets
          </Link>

          <Link
            href="/a-propos"
            className="text-center font-[Geist] text-[15px] font-semibold opacity-50 transition hover:opacity-75 2xl:text-[17px]"
            style={{ color: textCol }}
          >
            À propos
          </Link>
        </div>

        <div className="hidden flex-row items-center gap-2 xl:flex xl:gap-[10px]">
          <Image src="/optimized/belgium-flag.png"
            alt="Drapeau Belgique"
            width={20}
            height={30}
            className="h-[26px] w-[18px] object-contain 2xl:h-[30px] 2xl:w-[20px]"
            loading="lazy"/>
          {/* Ce bouton pointait vers /a-propos, en doublon du lien texte
              « À propos » juste au-dessus. Il mene desormais au blog, qui
              n'etait accessible depuis aucune entree de navigation. */}
          <Link
            href="/blogs"
            className="flex h-[39px] items-center justify-center rounded-[10px] border-[1.5px] px-4 text-center font-[Geist] text-[14px] font-semibold transition 2xl:h-[41px] 2xl:px-[17px] 2xl:text-[15px]"
            style={{ borderColor: textCol, color: textCol }}
          >
            Blog
          </Link>

          {/* Group 349012 du Figma : 100x41, rayon 10px. Le fond n'est pas un
              aplat `#003300` mais un degrade d'ellipses floutees, fourni en image
              (`Group 17.png`, deja aux cotes exactes du bouton). Elle est posee en
              couche de fond, le libelle restant au-dessus. */}
          <Link
            href="/contact"
            className="relative flex h-[41px] w-[100px] items-center justify-center overflow-hidden rounded-[10px] bg-[#003300] px-4 text-center font-[Geist] text-[15.0249px] font-extrabold leading-[17px] text-white transition hover:opacity-90"
          >
            <Image
              src="/optimized/Group 17.png"
              alt=""
              aria-hidden
              fill
              sizes="100px"
              className="object-cover"
              unoptimized
            />
            <span className="relative z-10">Contact</span>
          </Link>
        </div>

        <button
          type="button"
          className="flex flex-col items-center justify-center gap-1.5 p-2 xl:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            className={`block h-0.5 w-6 transition-transform ${
              isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
            style={{ background: textCol }}
          />
          <span
            className={`block h-0.5 w-6 transition-opacity ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
            style={{ background: textCol }}
          />
          <span
            className={`block h-0.5 w-6 transition-transform ${
              isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
            style={{ background: textCol }}
          />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="mt-2 rounded-2xl p-4 shadow-lg xl:hidden"
          style={{ background: navBg, boxShadow: '0px 3px 20px rgba(0, 51, 0, 0.2)', ...glassPanel }}
        >
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="border-b py-2 font-[Geist] text-lg font-semibold"
              style={{ color: textCol, borderColor: `${textCol}1a` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="flex w-full items-center justify-between border-b py-2 font-[Geist] text-lg font-semibold"
                style={{ color: textCol, borderColor: `${textCol}1a` }}
              >
                <span>Services</span>
                <svg
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform ${isMobileServicesOpen ? '' : 'rotate-180'}`}
                >
                  <path d="M1 5 L6 1 L11 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {isMobileServicesOpen && (
                <div className="flex flex-col gap-1 py-2 pl-4">
                  {SERVICES_LINKS.map((service) => (
                    <Link
                      key={service.label}
                      href={service.href}
                      onClick={() => {
                        setIsMobileServicesOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="py-2 font-[Geist] text-base font-semibold opacity-80"
                      style={{ color: textCol }}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/projets"
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b py-2 text-left font-[Geist] text-lg font-semibold"
              style={{ color: textCol, borderColor: `${textCol}1a` }}
            >
              Projets
            </Link>

            <Link
              href="/a-propos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b py-2 text-left font-[Geist] text-lg font-semibold"
              style={{ color: textCol, borderColor: `${textCol}1a` }}
            >
              À propos
            </Link>

            <div className="mt-2 flex flex-col gap-3">
              {/* Idem version desktop : ce bouton doublait le lien texte
                  « À propos » et mene maintenant au blog. */}
              <Link
                href="/blogs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full rounded-xl border-[1.5px] py-3 text-center font-[Geist] font-semibold"
                style={{ color: textCol, borderColor: textCol }}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="w-full rounded-xl bg-[#003300] py-3 text-center font-[Geist] font-extrabold text-white transition hover:opacity-90 relative overflow-hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative z-10">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
