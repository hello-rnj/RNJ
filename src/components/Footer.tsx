'use client';

import Image from 'next/image';
import Link from 'next/link';

const footerColumns = [
  {
    title: 'Cabinet',
    items: ['Accueil', 'À propos', 'Notre approche', 'Expertises', 'Contact'],
  },
  {
    title: 'Expertise',
    items: [
      "Création d'entreprise",
      'Accompagnement juridique',
      'Accélérer mon business',
    ],
  },
  {
    title: 'Publications',
    items: ['Blog'],
  },
];

const socialIcons = [
  { name: 'Instagram', src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677785/rnj/mask-group-23-1ce30be9.png', href: 'https://instagram.com' },
  { name: 'LinkedIn', src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677785/rnj/mask-group-24-fd4f223e.png', href: 'https://www.linkedin.com/company/84297679/' },
  { name: 'Facebook', src: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677788/rnj/mask-group-27-5870749d.png', href: 'https://www.facebook.com/Nahlaaschijelalia/' },
];

const footerItemLinks: Record<string, string> = {
  Accueil: '/',
  'À propos': '/a-propos',
  'Notre approche': '/a-propos#approche',
  Expertises: '/expertises',
  Contact: '/contact',
  "Création d'entreprise": '/services/creation-entreprise',
  'Accompagnement juridique': '/services/conseil-juridique',
  'Accélérer mon business': '/services/accelerer-mon-business',
  Blog: '/blogs',
};

type FooterProps = {
  showTopRow?: boolean;
};

export default function Footer({ showTopRow = true }: FooterProps) {
  return (
    <footer className="relative w-full overflow-hidden px-4 py-10 sm:px-6 md:px-8 md:py-14">
      <div className="relative z-10 mx-auto flex w-full max-w-[1461.03px] flex-col gap-[24.98px]">
        {showTopRow && (
          <div className="flex w-full flex-col items-center gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="relative w-full max-w-[454px] rounded-[23px] bg-[#F7FCFF] p-[5px] shadow-[2px_4px_33.5px_rgba(0,0,0,0.12)]">
              <div className="flex min-h-[72px] items-center justify-between gap-3 rounded-[20px] bg-[#F7FCFF] pl-5 pr-[5px]">
                <span className="font-[Geist] text-[14px] font-medium text-[#003300] opacity-50 sm:text-[16px]">
                  Notre newsletter
                </span>
                <button
                  type="button"
                  className="flex h-[62px] min-w-[128px] items-center justify-center rounded-[18px] bg-[#BBCB2E] px-5 transition hover:opacity-90 sm:h-[72px] sm:min-w-[156px]"
                >
                  <span className="font-[Geist] text-[15px] font-semibold text-[#003300] sm:text-[16px]">
                    S&apos;abonner
                  </span>
                </button>
              </div>
            </div>

            <div className="relative hidden h-[49px] w-[175px] shrink-0 lg:block">
              <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779678185/rnj/mask-group-21-d1c01771.png" alt="Flèches décoratives" fill className="object-contain"  loading="lazy"/>
            </div>

            <Link
              href="/contact"
              className="flex min-h-[72px] w-full max-w-[345px] items-center justify-center rounded-full bg-[#BBCB2E] px-8 py-4 transition hover:opacity-90"
            >
              <span className="font-[Geist] text-[28px] font-semibold leading-none text-[#003300] sm:text-[38px] lg:text-[51.3966px]">
                Contact
              </span>
            </Link>
          </div>
        )}

        <div className="rounded-[29.9802px] bg-[rgba(0,0,0,0.17)] p-5 shadow-[1.99868px_3.99736px_39.5738px_rgba(0,0,0,0.69)] backdrop-blur-[10px] backdrop-saturate-150 sm:p-7 md:p-9 lg:min-h-[552.63px] lg:px-[34.98px] lg:pb-[39px] lg:pt-[85.94px]">
          <div className="flex h-full flex-col gap-10 lg:gap-12">
            {/* Mise cote a cote a partir de xl seulement. Entre 1024 et 1279px
                (iPad Pro), le bloc de gauche prend 352px sur les 890px de la
                carte : il ne restait que 490px pour les colonnes, trop peu pour
                trois, et « Publications » retombait sur une deuxieme rangee. */}
            <div className="flex flex-col gap-10 xl:flex-row xl:justify-between">
              <div className="flex max-w-[352px] flex-col gap-[30px]">
                <Image src="/optimized/rnj-logo-white.png"
                  alt="Logo RNJ Advisory"
                  width={700}
                  height={136}
                  className="h-auto w-[180px] sm:w-[233px]"
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
                    <div className="flex flex-col items-start gap-[6px] sm:gap-[17px]">
                      {column.items.map((item) => {
                        const href = footerItemLinks[item];
                        const content = (
                          <>
                            <span className="h-[6px] w-[6px] rounded-full bg-white" aria-hidden="true" />
                            <span className="whitespace-nowrap font-[Geist] text-[16px] font-medium leading-4 text-white opacity-80">
                              {item}
                            </span>
                          </>
                        );

                        if (href) {
                          return (
                            <Link
                              key={item}
                              href={href}
                              className="flex items-center gap-[8px] text-left transition-opacity hover:opacity-100 sm:gap-[14px]"
                            >
                              {content}
                            </Link>
                          );
                        }

                        return (
                          <button
                            key={item}
                            type="button"
                            className="flex items-center gap-[8px] text-left transition-opacity hover:opacity-100 sm:gap-[14px]"
                          >
                            {content}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rangee du bas, au style de la page d'accueil : icones sociales
                cerclees a gauche, coordonnees a droite, et le copyright seul sur
                sa propre ligne en dessous. Le sortir de la rangee evite qu'il
                dispute la largeur aux trois coordonnees, ce qui cassait le
                telephone et l'e-mail sur plusieurs lignes. */}
            <div className="flex flex-col gap-5 pt-5 xl:flex-row xl:items-end xl:justify-between">
              {/* Frame 334 — social icons */}
              <div className="flex flex-nowrap items-center justify-center gap-[12px] sm:gap-[14px]">
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-white/20 transition-all duration-200 hover:border-white/40 hover:bg-white/5 sm:h-[44px] sm:w-[44px]"
                    aria-label={social.name}
                  >
                    <Image src={social.src} alt={social.name} fill sizes="44px" loading="lazy" className="object-contain p-[8px]" unoptimized />
                  </a>
                ))}
              </div>

              {/* Frame 336 — telephone + e-mail + adresse */}
              {/* En colonne, chaque ligne se centrait pour elle-meme : les trois
                  icones se retrouvaient a trois abscisses differentes, celle de
                  l'adresse nettement plus a gauche que les deux autres. Le bloc
                  se dimensionne maintenant sur sa ligne la plus large et se centre
                  d'un seul tenant, ce qui aligne les icones. */}
              <div className="mx-auto flex w-fit max-w-full flex-col items-start gap-3 whitespace-nowrap sm:mx-0 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-3 xl:flex-nowrap xl:gap-x-[40px]">
                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="relative h-[22px] w-[22px] shrink-0">
                    <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677789/rnj/layer-1-27-a0d86191.png" alt="Téléphone" fill className="object-contain" loading="lazy"/>
                  </div>
                  <span className="font-[Geist] text-[13px] font-medium leading-[18px] tracking-[0.03em] text-white sm:text-[15.37px] sm:leading-[21px] sm:tracking-[0.05em]">
                    +32 474 03 22 66
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="relative h-[15.47px] w-[22px] shrink-0">
                    <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677789/rnj/layer-1-26-33e2a54e.png" alt="E-mail" fill className="object-contain" loading="lazy"/>
                  </div>
                  <span className="text-center font-[Geist] text-[13px] font-medium leading-[18px] tracking-[0.03em] text-white sm:text-left sm:text-[15.37px] sm:leading-[21px] sm:tracking-[0.05em]">
                    info@rnj-advisory.be
                  </span>
                </div>

                <div className="flex items-center gap-3 sm:gap-5">
                  <div className="relative h-[22px] w-[18.76px] shrink-0">
                    <Image src="/optimized/localisation%20icon.svg" alt="Adresse" fill className="object-contain [filter:brightness(0)_saturate(100%)_invert(100%)]" loading="lazy"/>
                  </div>
                  {/* L'adresse fait 439px et la rangee entiere 913px : elle ne
                      tient d'un seul tenant qu'a partir de xl. En dessous, le
                      `whitespace-nowrap` du conteneur la faisait deborder de la
                      carte, ou elle etait coupee par `overflow-hidden`. Le
                      telephone et l'e-mail gardent leur nowrap.
                      Pas de `flex-wrap` ici : le drapeau est un element flex et
                      passait seul a la ligne des qu'il manquait quelques pixels.
                      Sans lui, c'est le texte qui se replie et le drapeau reste
                      colle a sa droite. */}
                  <span className="flex items-center gap-2 whitespace-normal text-left font-[Geist] text-[13px] font-medium leading-[18px] tracking-[0.03em] text-white sm:text-[15.37px] sm:leading-[21px] sm:tracking-[0.05em] xl:whitespace-nowrap">
                    Avenue Louise 500, Ixelles Bruxelles Belgique
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

            <div className="flex flex-col items-center justify-center gap-2 pt-4 text-center sm:flex-row sm:gap-4">
              <span className="font-[Geist] text-[12px] font-medium leading-[18px] text-white opacity-50 sm:text-[15.37px] sm:leading-[21px]">
                © 2026 RNJ Advisory. Tous droits réservés.
              </span>
              <Link
                href="/politique-de-confidentialite"
                className="font-[Geist] text-[12px] font-medium leading-[18px] text-white opacity-50 underline-offset-2 transition-opacity hover:opacity-80 hover:underline sm:text-[15.37px] sm:leading-[21px]"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
