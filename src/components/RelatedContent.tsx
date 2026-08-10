'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Geist } from 'next/font/google';
import { blogPosts, blogFilters } from '@/data/blogPosts';

const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });

/**
 * Section « Contenu associé » (Group 491 du Figma) : un titre, une barre de
 * filtres et un rail horizontal de cartes.
 *
 * Les cartes reprennent les vrais articles du blog plutot qu'un contenu fige :
 * les vignettes du Figma listaient des billets qui n'existent plus sous ce nom,
 * et les filtres y etaient « Juridique / Stratégie / Marchés / Insights », des
 * libelles qui ne correspondent a aucune categorie reelle. Les cotes, elles,
 * suivent le Figma au pixel.
 */
export default function RelatedContent() {
  const [selectedFilter, setSelectedFilter] = useState('Tous');
  const railRef = useRef<HTMLDivElement>(null);

  const visiblePosts =
    selectedFilter === 'Tous' ? blogPosts : blogPosts.filter((post) => post.category === selectedFilter);

  /* Fait defiler d'une carte + son gouttiere (392,61 + 20,24). */
  function scrollBy(direction: -1 | 1) {
    railRef.current?.scrollBy({ left: direction * 412.85, behavior: 'smooth' });
  }

  return (
    /* pt-[220px] : ecart demande entre le bas de la carte et le titre. */
    <section id="contenu-associe" className="relative z-[60] w-full scroll-mt-28 bg-white pt-[220px] pb-10 sm:pb-12 md:pb-16 lg:pb-[86px]">
      <div className="mx-auto w-full max-w-[2163px] px-5 sm:px-6 md:px-10 lg:px-[60px]">
        <div className="mx-auto flex w-full max-w-[2043px] flex-col gap-6 sm:gap-8 lg:gap-[44px]">
          {/* Frame 485 — titre et filtres sur une seule ligne, a toutes les tailles. */}
          <div className="flex flex-row items-center gap-4 sm:gap-6 lg:h-[52px] lg:gap-10">
            <h2 className={`${geist.className} shrink-0 text-[24px] font-medium leading-[1] text-black/80 sm:text-[32px] lg:text-[40px] lg:leading-[40px]`}>
              Contenu associ&eacute;
            </h2>

            {/* Frame 484 — chips de 52px, rayon 160px, gap 16px.
                Il y a une pastille par categorie : plutot que de les faire passer
                a la ligne, la barre defile horizontalement et occupe la largeur
                restante. `min-w-0` est indispensable, sans quoi l'element flex
                refuse de retrecir sous la largeur de son contenu et pousse le
                titre hors du cadre. */}
            <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto sm:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {blogFilters.map((filter) => {
                const isActive = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedFilter(filter)}
                    className={`${geist.className} inline-flex h-[44px] shrink-0 items-center justify-center rounded-[160px] px-6 text-[15px] leading-[23px] transition sm:h-[52px] sm:px-[32px] sm:text-[20px] ${
                      isActive
                        ? 'bg-[#BBCB2E] font-bold text-[#003300]/70'
                        : 'bg-[rgba(187,203,46,0.2)] font-medium text-[rgba(0,51,0,0.5)] opacity-70 hover:opacity-100'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Frame 486 — rail de cartes, gap 20,24px */}
          <div
            ref={railRef}
            className="overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex gap-3 sm:gap-4 lg:gap-[20.24px]">
              {visiblePosts.map((post) => {
                const year = post.publishedAt.slice(0, 4);

                const card = (
                  <>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 250px, (max-width: 1024px) 320px, 392px"
                      className="object-cover"
                    />

                    {/* Rectangle 491 — degrade du bas, 298,51 sur 447,25 = 66,7% */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-[66.7%]"
                      style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, #000000 100%)' }}
                    />

                    {/* Group 485 — pastille de l'annee */}
                    <span
                      className={`${geist.className} absolute left-[25.3px] top-[27.32px] inline-flex h-[21.25px] min-w-[47.81px] items-center justify-center rounded-[91.0698px] bg-white px-2 text-[10.6248px] font-medium leading-[11px] text-black`}
                    >
                      {year}
                    </span>

                    <div className="absolute inset-x-[25.3px] bottom-[24px] flex flex-col gap-[13px]">
                      <h3 className={`${geist.className} line-clamp-2 text-[18px] font-medium leading-[1.05] text-white sm:text-[21px] lg:text-[24.2853px] lg:leading-[23px]`}>
                        {post.title}
                      </h3>
                      <p className={`${geist.className} line-clamp-2 text-[12px] font-medium leading-[1.15] text-white/80 lg:text-[14.1664px] lg:leading-[14px]`}>
                        {post.description}
                      </p>
                    </div>
                  </>
                );

                const shell =
                  'relative h-[320px] w-[250px] shrink-0 overflow-hidden rounded-[20.2377px] bg-[#D9D9D9] sm:h-[380px] sm:w-[320px] lg:h-[447.25px] lg:w-[392.61px]';

                return post.href ? (
                  <Link key={post.id} href={post.href} className={`${shell} transition hover:brightness-105`}>
                    {card}
                  </Link>
                ) : (
                  <div key={post.id} className={shell}>
                    {card}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group 487 — fleches de 44px */}
          <div className="flex items-center gap-[15px]">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Contenu précédent"
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#F1F5D5] transition hover:brightness-95"
            >
              <span className="inline-block h-[12px] w-[12px] rotate-45 border-b-[3px] border-l-[3px] border-[#003300]" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Contenu suivant"
              className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#BBCB2E] transition hover:brightness-95"
            >
              <span className="inline-block h-[12px] w-[12px] -rotate-[135deg] border-b-[3px] border-l-[3px] border-[#003300]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
