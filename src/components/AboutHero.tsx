'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type AboutHeroProps = {
  titleClassName: string;
};

export default function AboutHero({ titleClassName }: AboutHeroProps) {
  const [entered, setEntered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const visualRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setEntered(true);
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (visualRef.current && target && !visualRef.current.contains(target)) {
        setExpanded(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [expanded]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') {
      setExpanded(true);
    }
  };

  const handlePointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') {
      setExpanded(true);
    }
  };

  const handlePointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') {
      setExpanded(false);
    }
  };

  const handleVisualClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('a')) {
      return;
    }

    setExpanded(true);
  };

  const handleFocus = () => {
    setExpanded(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setExpanded(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setExpanded((current) => !current);
    }
  };

  const handleCtaClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!expanded) {
      event.preventDefault();
      setExpanded(true);
    }
  };

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 md:pt-40 lg:px-8">
      <div
        data-entered={entered ? 'true' : 'false'}
        data-expanded={expanded ? 'true' : 'false'}
        className="about-hero-shell mx-auto grid w-full max-w-[1246px] gap-12 lg:grid-cols-[0.72fr_1fr] lg:items-end"
      >
        <div className="flex flex-col gap-12">
          <div className="about-hero-tag flex items-center gap-3 font-[Geist] text-[16px] font-medium text-[#003300]">
            <span className="h-2 w-2 rounded-full bg-[#003300]" />
            <span>À propos</span>
          </div>

          <div
            ref={visualRef}
            className="about-hero-visual relative max-w-[423px]"
            data-expanded={expanded ? 'true' : 'false'}
            tabIndex={0}
            aria-expanded={expanded}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onClick={handleVisualClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          >
            <span aria-hidden="true" className="about-hero-accent about-hero-accent-top" />
            <span aria-hidden="true" className="about-hero-accent about-hero-accent-bottom" />

            <div className="about-hero-card relative overflow-hidden rounded-[16px] bg-[#D9D9D9] shadow-[0px_2px_20px_rgba(0,0,0,0.2)]">
              <Image
                src="/optimized/IMG_0223.jpeg"
                alt="Équipe RNJ Advisory"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 423px"
                className="about-hero-card-image object-cover"
              />

              <div className="about-hero-card-overlay" />

              <Link
                href="#contact-about"
                aria-label="Accéder à la section contact"
                className="about-hero-card-cta"
                onClick={handleCtaClick}
              >
                <span className="sr-only">Connect</span>
                <span className="about-hero-card-cta-label about-hero-card-cta-label-initial font-[Geist] text-[16px] font-bold leading-none">
                  Notre équipe
                </span>
                <span className="about-hero-card-cta-label about-hero-card-cta-label-final font-[Geist] text-[16px] font-bold leading-none">
                  Connect
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="about-hero-logo relative h-[60px] w-[233px]">
            <Image src="/optimized/logo.svg"
              alt="RNJ Advisory"
              fill
              sizes="233px"
              className="object-contain"
             priority/>
          </div>

          <h1
            className={`about-hero-title ${titleClassName} max-w-[744px] text-[44px] font-medium leading-none text-[#003300] sm:text-[56px] lg:text-[64px]`}
          >
            Votre Partenaire Stratégique et Juridique de Confiance
          </h1>

          <p className="about-hero-body max-w-[696px] font-[Geist] text-[16px] font-medium leading-[18px] text-[#003300]/30">
            Nous accompagnons entreprises, investisseurs et institutions dans leurs décisions juridiques,
            réglementaires et stratégiques, en Belgique et à l’international.
          </p>
        </div>
      </div>
    </section>
  );
}
