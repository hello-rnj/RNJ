'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import BlogStructuredData from '@/components/BlogStructuredData';
import Navbar from '@/components/Navbar';
import { blogPosts, blogFilters } from '@/data/blogPosts';
import FooterWithCta from '@/components/FooterWithCta';

export default function BlogsPageClient() {
  const [selectedFilter, setSelectedFilter] = useState('Tous');

const visiblePosts =
    selectedFilter === 'Tous' ? blogPosts : blogPosts.filter((post) => post.category === selectedFilter);

  return (
    <main className="min-h-screen bg-[#F7FCFF]">
      <BlogStructuredData />

      {/* Navbar + hero partagent le meme conteneur : l'image de fond est en
          absolu sur l'ensemble, donc elle remonte derriere la barre de
          navigation au lieu de s'arreter sous elle. */}
      <div className="relative w-full">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/optimized/blogs-hero-v2.webp"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

      {/* Logo fonce demande sur cette page, tout en gardant le panneau
          en verre et le texte clair des pages de services. */}
      <Navbar glass logo="dark" />

      {/* Hero Section — l'image de fond est desormais portee par le conteneur
          parent, ce bloc ne garde que la hauteur et les calques de contenu. */}
      <div className="relative z-10 w-full">
        <div className="relative h-[720px] sm:h-[900px] lg:h-[1016px] w-full" />

        {/* Content overlay */}
        <div className="absolute left-4 sm:left-6 lg:left-[84px] top-[320px] sm:top-[420px] lg:top-[553px]">
          {/* Les deux pastilles forment le titre de la page : elles etaient de
              simples <div>, si bien que /blogs n'avait aucun h1. Le conteneur
              devient le h1 — meme rendu, structure correcte. */}
          <h1 className="m-0 flex flex-col gap-[14px]">
            <div className="h-[60px] sm:h-[80px] lg:h-[99px] w-fit min-w-[220px] sm:min-w-[320px] lg:min-w-[471px] bg-white rounded-[30px] flex items-center justify-center px-6 sm:px-8 lg:px-10">
              <span className="font-[Geist] text-[32px] sm:text-[48px] lg:text-[64px] font-semibold leading-[1.1] text-[#003300]">
                RNJ Advisory
              </span>
            </div>
            <div className="h-[60px] sm:h-[80px] lg:h-[99px] w-fit min-w-[120px] sm:min-w-[180px] lg:min-w-[230px] bg-white rounded-[30px] flex items-center justify-center px-6 sm:px-8 lg:px-10">
              <span className="font-[Geist] text-[32px] sm:text-[48px] lg:text-[64px] font-semibold leading-[1.1] text-[#003300]">
                Blogs
              </span>
            </div>
          </h1>
        </div>

        {/* Social icons */}
        <div className="absolute left-4 sm:left-6 lg:left-[84px] bottom-[60px] sm:bottom-[80px] lg:top-[869px] lg:bottom-auto flex items-center gap-[12px] sm:gap-[16px] lg:gap-[20px]">
          <div className="h-[56px] w-[56px] sm:h-[64px] sm:w-[64px] lg:h-[84px] lg:w-[84px] rounded-full bg-white flex items-center justify-center">
            <Image src="/optimized/Layer%201%20(25).png" alt="Vues" width={46} height={46} className="h-[28px] sm:h-[32px] lg:h-[40px] w-auto object-contain" loading="lazy"/>
          </div>
          <div className="h-[56px] w-[56px] sm:h-[64px] sm:w-[64px] lg:h-[84px] lg:w-[84px] rounded-full bg-white flex items-center justify-center">
            <Image src="/optimized/Layer%201%20(26).png" alt="Mentions J’aime" width={24} height={46} className="h-[28px] sm:h-[32px] lg:h-[40px] w-auto object-contain" loading="lazy"/>
          </div>
        </div>
      </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full bg-white">
        <div className="mx-auto max-w-[1392px] px-4 py-16 sm:py-24 sm:px-6 md:px-8 lg:px-12 lg:py-[118px]">
          {/* Filter Section */}
          <div className="mb-[74px]">
            <div className="flex flex-col items-center gap-6 sm:gap-9">
              <h2 className="font-[Geist] text-[28px] sm:text-[32px] lg:text-[40px] font-medium leading-[1.1] text-black opacity-80">
                Contenu associé
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-[16px]">
                {blogFilters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`flex h-[44px] sm:h-[52px] items-center justify-center rounded-[160px] px-6 sm:px-[33px] py-[12px] sm:py-[15px] font-[Geist] text-[16px] sm:text-[20px] font-medium leading-[23px] ${
                      selectedFilter === filter
                        ? 'bg-[#BBCB2E] text-[#003300]'
                        : 'bg-[rgba(187,203,46,0.2)] text-[rgba(0,51,0,0.5)] opacity-70'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Cards Grid */}
          <div className="flex flex-col gap-16 sm:gap-24 lg:gap-[118px]">
            {visiblePosts.map((post) => (
              <div key={post.id} className="flex flex-col items-center gap-8 sm:gap-12 lg:flex-row lg:items-center lg:justify-center lg:gap-[51px]">
                {/* Cadre en 3/2 et non carre : les couvertures d'articles sont
                    panoramiques (1,73 a 2,5). Dans un cadre 1:1, `object-cover`
                    en rognait 42 a 60% de la largeur — sur la couverture MACF,
                    le titre incruste disparaissait purement et simplement.
                    Le ratio est le MEME a toutes les tailles d'ecran. Il avait
                    ete laisse s'etirer sur la hauteur du texte au-dela de 1024px :
                    le cadre devenait alors bien plus haut que large et rognait
                    beaucoup plus qu'en mobile, si bien que la meme couverture
                    n'etait pas cadree pareil d'un appareil a l'autre. */}
                <div className="relative aspect-[3/2] w-full max-w-[360px] shrink-0 overflow-hidden rounded-[20.2377px] bg-[#D9D9D9] sm:max-w-[460px] lg:w-[46%] lg:max-w-[560px] lg:shrink">
                  {/* `object-cover` centre : l'image remplit tout le cadre, les
                      bords excedentaires sont rognes. Le cadre epouse la hauteur
                      du bloc de texte (voir `items-stretch` sur la rangee), donc
                      toutes les vignettes s'alignent d'un article a l'autre. */}
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="560px"
                    className="object-cover object-center"
                  />
                </div>
                {/* `lg:min-w-0` : sans lui un element flex refuse de descendre sous la
                    largeur de son contenu, et le titre imposait sa largeur au lieu
                    de se reformater. */}
                <div className="flex w-full max-w-[568px] flex-col justify-center gap-8 sm:gap-12 lg:w-[54%] lg:min-w-0 lg:max-w-[568px] lg:gap-[66px]">
                  <div className="flex flex-col gap-6 sm:gap-9 lg:gap-[35px]">
                    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[40px]">
                      <span className="font-[Geist] text-[15px] font-medium leading-[17px] text-[#BBCB2E]">
                        [{post.category}]
                      </span>
                      <h3 className="font-[EB_Garamond] text-[28px] sm:text-[36px] lg:text-[48px] font-medium leading-[1.05] text-[#003300]">
                        {post.title}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-[30px]">
                      <div className="flex flex-col gap-[15px]">
                        <span className="font-[Geist] text-[20px] sm:text-[24px] font-bold leading-[1.2] text-[#003300] opacity-70">
                          {post.date}
                        </span>
                        <p className="font-[Geist] text-[16px] sm:text-[20px] font-medium leading-[1.3] text-[#003300] opacity-50">
                          {post.description}
                        </p>
                      </div>
                      {/* « Know More » ne pointait nulle part : les articles
                          n'avaient pas de page. Il devient un lien quand le
                          post en a une (champ href), sinon il reste inerte. */}
                      <div className="flex flex-row gap-[7.98px]">
                        <Link
                          href="/contact"
                          className="flex h-[37.51px] items-center justify-center rounded-[49.4852px] bg-[#BBCB2E] px-[25.5407px] py-[11.1741px] font-[Geist] text-[12.7704px] font-bold leading-[14px] text-[#003300]"
                        >
                          Contact
                        </Link>
                        {'href' in post && post.href ? (
                          <Link
                            href={post.href}
                            className="flex h-[37.51px] items-center justify-center rounded-[49.4852px] border-[0.798148px] border-[#003300] px-[25.5407px] py-[11.1741px] font-[Geist] text-[12.7704px] font-bold leading-[14px] text-[#003300]"
                          >
                            Lire l&apos;article
                          </Link>
                        ) : (
                          <button className="flex h-[37.51px] items-center justify-center rounded-[49.4852px] border-[0.798148px] border-[#003300] px-[25.5407px] py-[11.1741px] font-[Geist] text-[12.7704px] font-bold leading-[14px] text-[#003300]">
                            En savoir plus
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-[20px]">
                    <div className="w-full h-[2px] border-2 border-[rgba(0,51,0,0.2)]" />
                    <div className="flex flex-row items-center justify-start w-full max-w-[480px]">
                      <div className="flex items-center gap-[28.03px]">
                        <div className="relative h-[34px] w-[36.78px]">
                          <svg className="h-full w-full" viewBox="0 0 36.78 34" fill="none">
                            <path d="M5.5 17H31.28" stroke="#CCD6CC" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div className="relative h-[32.88px] w-[29.25px]">
                          <Image src="/optimized/Vector (9).png" alt="Mentions J'aime" fill className="object-contain" sizes="29px" loading="lazy"/>
                        </div>
                        <div className="relative h-[29.72px] w-[28.1px]">
                          <Image src="/optimized/Vector (10).png" alt="Commentaires" fill className="object-contain" sizes="28px" loading="lazy"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterWithCta />
    </main>
  );
}
