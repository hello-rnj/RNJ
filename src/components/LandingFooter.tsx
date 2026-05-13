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
    title: 'Expertise',
    items: [
      { label: 'Conseil stratégique', href: '/services' },
      { label: 'Analyse institutionnelle', href: '/services/analyse-institutionnelle' },
      { label: 'Conformité réglementaire', href: '/services' },
      { label: 'Structuration d’entreprise', href: '/services' },
    ],
  },
  {
    title: 'Secteurs',
    items: [
      { label: 'PME & ASBL' },
    ],
  },
  {
    title: 'Publications',
    items: [
      { label: 'Articles', href: '/blogs' },
      { label: 'PME & ASBL', href: '/blogs' },
    ],
  },
];

const socialIcons = [
  {
    name: 'Instagram',
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334109/rnj/mask-group-23-1ce30be9.svg',
    href: 'https://instagram.com',
  },
  {
    name: 'LinkedIn',
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334110/rnj/mask-group-24-fd4f223e.svg',
    href: 'https://linkedin.com',
  },
  {
    name: 'Telegram',
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334111/rnj/mask-group-25-516d2f88.svg',
    href: 'https://t.me',
  },
  {
    name: 'Twitter',
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334113/rnj/mask-group-26-a7a619cb.svg',
    href: 'https://twitter.com',
  },
  {
    name: 'Facebook',
    src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334115/rnj/mask-group-27-5870749d.svg',
    href: 'https://facebook.com',
  },
] as const;

const footerBackgroundMask = '/optimized/Mask%20group%20(45).svg';

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
                <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334123/rnj/mask-group-21-d1c01771.svg"
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
                    contact
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
                        contact
                      </span>
                    </span>

                    <span className="relative h-[49px] w-[175px] shrink-0">
                      <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334123/rnj/mask-group-21-d1c01771.svg"
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
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
                  <div className="flex max-w-[352px] flex-col gap-[30px]">
                    <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                      alt="RNJ Advisory"
                      width={233}
                      height={58}
                      className="h-auto w-[233px]"
                     priority/>

                    <p className="font-[Geist] text-[16px] font-medium leading-4 text-white opacity-50">
                      Cabinet de conseil stratégique et réglementaire accompagnant acteurs publics,
                      entreprises privées et investisseurs dans la sécurisation de leurs projets et la
                      maîtrise des environnements institutionnels complexes.
                    </p>
                  </div>

                  <div className="grid w-full max-w-[916px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4 xl:gap-5">
                    {footerColumns.map((column) => (
                      <div key={column.title} className="flex flex-col gap-4 sm:gap-6">
                        <h3 className="font-[Geist] text-[20px] font-semibold leading-4 text-white">
                          {column.title}
                        </h3>

                        <div className="flex flex-col items-start gap-[6px] sm:gap-[17px]">
                          {column.items.map((item) => {
                            const content = (
                              <>
                                <span className="h-[6px] w-[6px] rounded-full bg-white" aria-hidden="true" />
                                <span className="font-[Geist] text-[16px] font-medium leading-4 text-white opacity-80">
                                  {item.label}
                                </span>
                              </>
                            );

                            if (item.href) {
                              return (
                                <Link
                                  key={`${column.title}-${item.label}`}
                                  href={item.href}
                                  className="flex items-center gap-[8px] transition-opacity hover:opacity-100 sm:gap-[14px]"
                                >
                                  {content}
                                </Link>
                              );
                            }

                            return (
                              <div
                                key={`${column.title}-${item.label}`}
                                className="flex items-center gap-[8px] sm:gap-[14px]"
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

                <div className="flex flex-col gap-5 pt-5 lg:flex-row lg:items-end lg:justify-between">
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
                        <Image src={social.src} alt={social.name} fill className="object-contain p-[8px]" unoptimized />
                      </a>
                    ))}
                  </div>

                  <div className="flex w-full flex-col items-center gap-3 lg:w-auto lg:flex-row lg:items-end lg:gap-[142px]">
                    <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-8 lg:gap-[78px]">
                      <div className="flex items-center gap-5">
                        <div className="relative h-[22px] w-[22px] shrink-0">
                          <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1777310359/rnj/layer-1-27-a0d86191.svg"
                            alt="Téléphone"
                            fill
                            className="object-contain"
                           loading="lazy"/>
                        </div>

                        <span className="font-[Geist] text-[13px] font-medium leading-[18px] tracking-[0.03em] text-white sm:text-[15.37px] sm:leading-[21px] sm:tracking-[0.05em]">
                          +32 474 03 22 66
                        </span>
                      </div>

                      <div className="flex items-center gap-5">
                        <div className="relative h-[15.47px] w-[22px] shrink-0">
                          <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1777310361/rnj/layer-1-26-33e2a54e.svg"
                            alt="E-mail"
                            fill
                            className="object-contain"
                           loading="lazy"/>
                        </div>

                        <span className="break-all text-center font-[Geist] text-[13px] font-medium leading-[18px] tracking-[0.03em] text-white sm:text-left sm:text-[15.37px] sm:leading-[21px] sm:tracking-[0.05em]">
                          info@rnj-advisory.be
                        </span>
                      </div>
                    </div>

                    <span className="text-center font-[Geist] text-[12px] font-medium leading-[18px] text-white opacity-50 sm:text-[15.37px] sm:leading-[21px]">
                      © 2026 RNJ Advisory. Tous droits réservés.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
