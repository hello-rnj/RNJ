'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function BlogsPage() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['Juridique', 'Stratégie', 'Marchés', 'Insights', 'All'];

  const blogPosts = [
    {
      id: 1,
      title: 'Workshop BeCentral : digitalisation durable',
      description: 'Retour sur un échange autour des enjeux de la digitalisation responsable.',
      date: '21 déc. 2025',
      category: 'Sustain Digitalization',
      image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310353/rnj/blog-0f03cf9e.svg',
      views: '13k',
      likes: '13k',
      comments: '13k',
    },
    {
      id: 2,
      title: 'Principes et fonctionnement des garanties d\'origine',
      description: 'Informations de base sur les garanties d\'origine (GO).',
      date: '15 déc. 2025',
      category: 'Énergie',
      image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310353/rnj/blog-0f03cf9e.svg',
      views: '13k',
      likes: '13k',
      comments: '13k',
    },
    {
      id: 3,
      title: 'Branding Excellence : Une approche unique',
      description: 'Comment développer une stratégie de marque distinctive et durable.',
      date: '10 déc. 2025',
      category: 'Stratégie',
      image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310353/rnj/blog-0f03cf9e.svg',
      views: '13k',
      likes: '13k',
      comments: '13k',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7FCFF]">
      {/* Navbar */}
      <div className="relative w-full px-4 py-4 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[1393px]">
          <div className="flex items-center justify-between rounded-[19.6104px] bg-[#F7FCFF] px-6 py-[13.8772px] shadow-[0px_3.23873px_28.9866px_rgba(0,51,0,0.25)]">
            <div className="flex items-center gap-[261px]">
              <Link href="/" className="flex items-center gap-4">
                <Image
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310357/rnj/group-555-a5305936.svg"
                  alt="RNJ Advisory"
                  width={180}
                  height={44}
                  className="h-auto w-[180px]"
                />
              </Link>
              <nav className="hidden items-center gap-[29.36px] md:flex">
                <Link href="/" className="font-[Geist] text-[17.1349px] font-semibold leading-[19px] text-[#003300]">
                  Home
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-[6.83px] font-[Geist] text-[17.1349px] font-semibold leading-[19px] text-[#003300] opacity-50">
                    Services
                    <svg width="11.61" height="5.46" viewBox="0 0 11.61 5.46" fill="none" className="opacity-50">
                      <path d="M1 1L5.805 4.46L10.61 1" stroke="#003300" strokeWidth="2.73079" strokeLinecap="round" strokeLinejoin="round" transform="rotate(180)"/>
                    </svg>
                  </button>
                </div>
                <Link href="/projets" className="font-[Geist] text-[17.1349px] font-semibold leading-[19px] text-[#003300] opacity-50">
                  Projects
                </Link>
                <Link href="/a-propos" className="font-[Geist] text-[17.1349px] font-semibold leading-[19px] text-[#003300] opacity-50">
                  À propos
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="font-[Geist] text-[20px] font-medium leading-[29px] text-black">🇧🇪</span>
              </div>
              <Link
                href="/contact"
                className="flex h-[41px] items-center justify-center rounded-[10px] border-[1.5px] border-[#003300] px-[18px] py-[17px] font-[Geist] text-[15.0249px] font-semibold leading-[17px] text-[#003300]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full">
        <div className="relative h-[1016px] w-full">
          <Image
            src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310353/rnj/blog-0f03cf9e.svg"
            alt="Blog background"
            fill
            className="object-cover"
          />
        </div>

        {/* Logo overlay */}
        <div className="absolute left-[84px] top-[277px]">
          <Image
            src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310357/rnj/group-555-a5305936.svg"
            alt="RNJ Advisory"
            width={319}
            height={78.81}
            className="h-auto w-[319px]"
          />
        </div>

        {/* Content overlay */}
        <div className="absolute left-[84px] top-[419px]">
          <div className="flex flex-col gap-[14px]">
            <div className="h-[99px] w-[471px] bg-white rounded-[30px] flex items-center justify-center">
              <span className="font-[Geist] text-[64px] font-semibold leading-[73px] text-[#003300]">
                RNJ Advisory
              </span>
            </div>
            <div className="h-[99px] w-[230px] bg-white rounded-[30px] flex items-center justify-center">
              <span className="font-[Geist] text-[64px] font-semibold leading-[73px] text-[#003300]">
                Blogs
              </span>
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div className="absolute left-[84px] top-[553px] flex items-center gap-[20px]">
          <div className="h-[84px] w-[84px] rounded-[169.5px] bg-white flex items-center justify-center">
            <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310357/rnj/group-555-a5305936.svg" alt="Social" width={40} height={40} />
          </div>
          <div className="h-[84px] w-[84px] rounded-[169.5px] bg-white flex items-center justify-center">
            <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310357/rnj/group-555-a5305936.svg" alt="Social" width={40} height={40} />
          </div>
          <div className="h-[84px] w-[84px] rounded-[169.5px] bg-white flex items-center justify-center">
            <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310357/rnj/group-555-a5305936.svg" alt="Social" width={40} height={40} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full bg-white">
        <div className="mx-auto max-w-[1392px] px-4 py-[118px] sm:px-6 md:px-8 lg:px-12">
          {/* Section Title */}
          <div className="mb-[118px] flex flex-col items-center gap-[118px]">
            <div className="w-full h-[2px] border-2 border-black/20" />
            <div className="flex flex-col items-center gap-[40px]">
              <h1 className="font-[EB_Garamond] text-[96px] font-medium leading-[97px] text-[#003300] text-center">
                Quel est le rôle du conseil juridique dans vos décisions stratégiques ?
              </h1>
              <p className="font-[Geist] text-[20px] font-medium leading-[23px] text-[#003300] opacity-70 text-center max-w-[611px]">
                Dans un environnement réglementaire complexe, le conseil juridique devient un levier clé pour sécuriser, structurer et orienter les décisions à fort impact.
              </p>
              <button className="flex h-[116px] w-[116px] items-center justify-center rounded-[140px] bg-[#BBCB2E] shadow-[1px_1px_38.1px_rgba(0,0,0,0.34)]">
                <svg width="48.72" height="41.81" viewBox="0 0 48.72 41.81" fill="none" className="rotate-[-45deg]">
                  <path d="M47.53 25.99L5.72 25.99L41.87 41.51" stroke="#003300" strokeWidth="6.01351" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="41.87" y1="41.51" x2="5.72" y2="25.99" stroke="#003300" strokeWidth="5.73838" strokeLinecap="round" strokeLinejoin="round" transform="rotate(135 23.795 33.75)"/>
                </svg>
              </button>
            </div>
            <div className="w-full h-[2px] border-2 border-black/20" />
          </div>

          {/* Filter Section */}
          <div className="mb-[74px]">
            <div className="flex flex-col items-center gap-[30px]">
              <h2 className="font-[Geist] text-[40px] font-medium leading-[40px] text-black opacity-80">
                contenu associé
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-[16px]">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`flex h-[52px] items-center justify-center rounded-[160px] px-[33px] py-[15px] font-[Geist] text-[20px] font-medium leading-[23px] ${
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
          <div className="flex flex-col gap-[118px]">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex flex-col items-center gap-[51px] lg:flex-row lg:items-center lg:justify-center">
                <div className="relative h-[509px] w-[509px] bg-[#D9D9D9] rounded-[20.2377px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex max-w-[568px] flex-col gap-[66px]">
                  <div className="flex flex-col gap-[35px]">
                    <div className="flex flex-col gap-[40px]">
                      <span className="font-[Geist] text-[15px] font-medium leading-[17px] text-[#BBCB2E]">
                        [{post.category}]
                      </span>
                      <h3 className="font-[EB_Garamond] text-[48px] font-medium leading-[49px] text-[#003300]">
                        {post.title}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-[30px]">
                      <div className="flex flex-col gap-[15px]">
                        <span className="font-[Geist] text-[24px] font-bold leading-[17px] text-[#003300] opacity-70">
                          {post.date}
                        </span>
                        <p className="font-[Geist] text-[20px] font-medium leading-[17px] text-[#003300] opacity-50">
                          {post.description}
                        </p>
                      </div>
                      <div className="flex flex-row gap-[7.98px]">
                        <button className="flex h-[37.51px] items-center justify-center rounded-[49.4852px] bg-[#BBCB2E] px-[25.5407px] py-[11.1741px] font-[Geist] text-[12.7704px] font-bold leading-[14px] text-[#003300]">
                          Connect
                        </button>
                        <button className="flex h-[37.51px] items-center justify-center rounded-[49.4852px] border-[0.798148px] border-[#003300] px-[25.5407px] py-[11.1741px] font-[Geist] text-[12.7704px] font-bold leading-[14px] text-[#003300]">
                          Know More
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-[20px]">
                    <div className="w-full h-[2px] border-2 border-[rgba(0,51,0,0.2)]" />
                    <div className="flex flex-row items-center justify-between w-full max-w-[480px]">
                      <div className="flex items-center gap-[28.03px]">
                        <div className="flex items-center gap-[11.68px]">
                          <svg width="36.78" height="34" viewBox="0 0 36.78 34" fill="none">
                            <path d="M5.5 17H31.28" stroke="#CCD6CC" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <span className="font-[Geist] text-[17.5181px] font-medium leading-[20px] text-[#CCD6CC]">
                            {post.views}
                          </span>
                        </div>
                        <div className="flex items-center gap-[11.68px]">
                          <svg width="29.25" height="32.88" viewBox="0 0 29.25 32.88" fill="none">
                            <path d="M14.63 2.88V29.88" stroke="#CCD6CC" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M5.75 14.63H23.5" stroke="#CCD6CC" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <span className="font-[Geist] text-[17.5181px] font-medium leading-[20px] text-[#CCD6CC]">
                            {post.likes}
                          </span>
                        </div>
                        <div className="flex items-center gap-[11.68px]">
                          <svg width="28.1" height="29.72" viewBox="0 0 28.1 29.72" fill="none">
                            <path d="M14.05 19.33V2.88" stroke="#CCD6CC" strokeWidth="2.91969" strokeLinecap="round"/>
                            <path d="M5.88 14.63H22.22" stroke="#CCD6CC" strokeWidth="2.91969" strokeLinecap="round"/>
                            <path d="M5.88 6.06H22.22" stroke="#CCD6CC" strokeWidth="2.91969" strokeLinecap="round"/>
                          </svg>
                          <span className="font-[Geist] text-[17.5181px] font-medium leading-[20px] text-[#CCD6CC]">
                            {post.comments}
                          </span>
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

      {/* Footer */}
      <div className="relative w-full bg-[#BBCB2E]">
        <div className="mx-auto max-w-[1513px] px-4 py-[40px] sm:px-6 md:px-8 lg:px-12">
          <div className="flex flex-col gap-[25px]">
            <div className="flex flex-col gap-[30px] lg:flex-row lg:justify-between">
              <div className="flex flex-col gap-[30px] max-w-[352px]">
                <Image
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                  alt="RNJ Advisory"
                  width={233}
                  height={58}
                  className="h-auto w-[180px] sm:w-[233px]"
                />
                <p className="font-[Geist] text-[16px] font-medium leading-[16px] text-white opacity-50 sm:text-[16px]">
                  Cabinet de conseil stratégique et réglementaire accompagnant acteurs publics, entreprises privées et investisseurs dans la sécurisation de leurs projets et la maîtrise des environnements institutionnels complexes.
                </p>
              </div>

              <div className="flex flex-row gap-[20px] lg:gap-[20px]">
                <div className="flex flex-col gap-[17px]">
                  <span className="font-[Geist] text-[20px] font-semibold leading-[16px] text-white">Cabinet</span>
                  <div className="flex flex-col gap-[17px]">
                    {['Accueil', 'À propos', 'Notre approche', "Zones d'intervention"].map((item) => (
                      <Link key={item} href="/" className="flex items-center gap-[14px] text-left transition-opacity hover:opacity-100">
                        <div className="h-[6px] w-[6px] rounded-full bg-white" />
                        <span className="font-[Geist] text-[16px] font-medium leading-[16px] text-white opacity-80">{item}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-[17px]">
                  <span className="font-[Geist] text-[20px] font-semibold leading-[16px] text-white">Expertise</span>
                  <div className="flex flex-col gap-[17px]">
                    {['Conseil stratégique', 'Analyse institutionnelle', 'Conformité réglementaire', 'Transition énergétique', "Structuration d'entreprise"].map((item) => (
                      <Link key={item} href="/services" className="flex items-center gap-[14px] text-left transition-opacity hover:opacity-100">
                        <div className="h-[6px] w-[6px] rounded-full bg-white" />
                        <span className="font-[Geist] text-[16px] font-medium leading-[16px] text-white opacity-80">{item}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-[17px]">
                  <span className="font-[Geist] text-[20px] font-semibold leading-[16px] text-white">Publications</span>
                  <div className="flex flex-col gap-[17px]">
                    {['Articles', 'Analyses', 'PME & ASBL', 'Études sectorielles'].map((item) => (
                      <Link key={item} href="/blogs" className="flex items-center gap-[14px] text-left transition-opacity hover:opacity-100">
                        <div className="h-[6px] w-[6px] rounded-full bg-white" />
                        <span className="font-[Geist] text-[16px] font-medium leading-[16px] text-white opacity-80">{item}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 border-t border-white/15 pt-6 w-full sm:flex-row sm:items-center sm:justify-between sm:gap-[20px] md:gap-[60px] lg:gap-[215px]">
              <div className="flex flex-row items-center gap-[20px]">
                {['Instagram', 'LinkedIn', 'Telegram', 'Twitter', 'Facebook'].map((social) => (
                  <div key={social} className="relative h-[29.2px] w-[29.2px] overflow-hidden rounded-full">
                    <Image
                      src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334109/rnj/mask-group-23-1ce30be9.svg"
                      alt={social}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-[20px] md:gap-[78px] lg:gap-[142px] w-full">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-[20px] md:gap-[78px]">
                  <div className="flex flex-row items-center gap-[20px]">
                    <div className="relative h-[22px] w-[21.92px] shrink-0">
                      <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310359/rnj/layer-1-27-a0d86191.svg" alt="Téléphone" fill className="object-contain" />
                    </div>
                    <span className="font-[Geist] text-[14px] font-medium tracking-[0.05em] text-white sm:text-[15.37px] whitespace-nowrap">
                      +32 474 03 22 66
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-[20px]">
                    <div className="relative h-[15.47px] w-[22px] shrink-0">
                      <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777310361/rnj/layer-1-26-33e2a54e.svg" alt="E-mail" fill className="object-contain" />
                    </div>
                    <span className="break-all font-[Geist] text-[14px] font-medium tracking-[0.05em] text-white sm:text-[15.37px]">
                      info@rnj-advisory.be
                    </span>
                  </div>
                </div>
                <span className="font-[Geist] text-[13px] font-medium leading-5 text-white opacity-50 sm:text-[15.37px] sm:leading-[21px] whitespace-nowrap">
                  © 2026 RNJ Advisory. Tous droits réservés.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
