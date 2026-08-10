'use client';

import { partnerAssetLogos, logoHeightFactor, logoScrollSeconds, LOGO_WHITE_FILTER } from '@/data/partnerLogos';
import { EB_Garamond, Poppins } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import AboutHero from '@/components/AboutHero';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TeamCard from '@/components/TeamCard';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const values = [
  {
    title: 'Rigueur',
    description:
      'Une approche exigeante fondée sur l’analyse, la précision juridique et la maîtrise des environnements réglementaires.',
    background: '#EEF2CA',
    titleColor: '#406640',
    textColor: 'rgba(64, 102, 64, 0.55)',
  },
  {
    title: 'Excellence',
    description: 'Un accompagnement sur mesure, aligné avec les enjeux stratégiques de chaque client.',
    background: '#CCD862',
    titleColor: '#406640',
    textColor: 'rgba(64, 102, 64, 0.55)',
  },
  {
    title: 'Engagement',
    description:
      'Une implication durable aux côtés de nos clients pour garantir des résultats concrets et mesurables.',
    background: '#406640',
    titleColor: '#CCD862',
    textColor: 'rgba(204, 216, 98, 0.62)',
  },
];

const teamMembers = [
  {
    name: 'Nahla Aschi',
    role: 'Partner & CEO',
    initials: 'NA',
    tone: '#EEF2CA',
    image: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779678953/rnj/nahla-photo.png',
    linkedinUrl: 'https://www.linkedin.com/in/nahla-aschi-/',
  },
  {
    name: 'Ramzi Jelalia',
    role: 'Partner | Legal & Energy Strategy',
    initials: 'RJ',
    tone: '#DDE597',
    image: 'https://res.cloudinary.com/dvyyce3ki/image/upload/v1779678953/rnj/ramzi-photo.png',
    linkedinUrl: 'https://www.linkedin.com/in/ramzi-jelalia-%F0%9F%90%BB-94856b45/',
  },
  {
    name: 'Eya Mhamed',
    role: 'Tech Lead',
    initials: 'EM',
    tone: '#CCD862',
    image: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677465/rnj/eya-44c9ccac.png',
    linkedinUrl: 'https://www.linkedin.com/in/eya-mhamed-',
  },
  {
    name: 'Chahine Fehri',
    role: 'Creative Director',
    initials: 'CF',
    tone: '#EEF2CA',
    image: 'https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677464/rnj/chahine-88336938.png',
    linkedinUrl: 'https://www.linkedin.com/in/chahine-fehri-5a0267276/',
  },
];


const approachSteps = [
  {
    title: 'Analyse & cadrage',
    description:
      'Compréhension approfondie de vos enjeux, de votre environnement et des contraintes réglementaires.',
  },
  {
    title: 'Structuration',
    description: 'Mise en place de solutions juridiques et stratégiques adaptées à vos objectifs.',
  },
  {
    title: 'Accompagnement',
    description: 'Suivi opérationnel et conseil continu pour sécuriser vos décisions et vos projets.',
  },
];

function SectionIntro({
  label,
  eyebrow,
  dark = false,
}: {
  label: string;
  eyebrow: string;
  dark?: boolean;
}) {
  return (
    <div className={`${poppins.className} flex flex-col gap-5`}>
      <h2 className={`text-[28px] font-medium leading-none md:text-[32px] ${dark ? 'text-white' : 'text-black'}`}>
        {label}
      </h2>
      <p className={`max-w-[220px] text-[16px] font-semibold leading-[21px] ${dark ? 'text-white/50' : 'text-black/50'}`}>
        {eyebrow}
      </p>
    </div>
  );
}

export default function AboutPage() {
  const [selectedTab, setSelectedTab] = useState<'entrepreneuriat' | 'institutionnel'>('entrepreneuriat');

  return (
    <main className="min-h-screen bg-white text-[#003300]">
      <Navbar />
      <AboutHero titleClassName={ebGaramond.className} />

      <section className="relative h-[360px] overflow-hidden bg-[#737373] md:h-[500px] lg:h-[569px]">
        <Image
          src="https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779677464/rnj/group-349020-a82fd32c.png"
          alt="Architecture institutionnelle"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[1.45] contrast-[1.2] saturate-[1.15]"
        />
      </section>

      <section id="mission" className="bg-black px-4 py-20 sm:px-6 lg:px-8 lg:py-[72px]">
        <div className="mx-auto grid max-w-[1461px] gap-12 lg:grid-cols-[minmax(220px,0.35fr)_1fr] lg:items-start">
          <SectionIntro label="//Notre mission" eyebrow="Accompagnement sur mesure" dark />
          <p className={`${poppins.className} max-w-[803px] text-[28px] font-medium leading-[1.16] text-[#BBCB2E] md:text-[36px] md:leading-[40px] lg:justify-self-end`}>
            Sécuriser leurs projets et structurer leur croissance, c’est permettre à nos clients d’évoluer avec
            confiance dans des environnements juridiques et réglementaires complexes.
          </p>
        </div>

        {/* Bande de logos (Figma Frame 16), sur le fond noir voulu par le Figma :
            logos blancs a opacity 0.6, padding vertical 26.662px, gap 82.53px,
            hauteur de rangee 114.75 - 2x26.662 = 61.43px. Ces valeurs sont les
            bornes hautes des clamp, le rendu est donc exact des que la page a la
            largeur du Frame.
            Le defilement s'impose : les 40 logos depassent tres largement les
            1559,76px du Frame, une rangee figee deborderait.
            La liste, les largeurs proportionnelles et la duree viennent de
            `@/data/partnerLogos`, partages avec la page d'accueil. */}
        {/* Pleine largeur : les marges negatives annulent le `px-4 / sm:px-6 /
            lg:px-8` de la section, pour que la bande aille d'un bord a l'autre
            de l'ecran au lieu de s'arreter a 1559,76px. */}
        <div className="-mx-4 mt-12 py-[clamp(14px,2vw,26.662px)] sm:-mx-6 lg:-mx-8" style={{ opacity: 0.6 }}>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[clamp(24px,6vw,80px)] bg-gradient-to-r from-black to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[clamp(24px,6vw,80px)] bg-gradient-to-l from-black to-transparent" />
            <div
              className="flex w-max items-center"
              style={{ animation: `scroll ${logoScrollSeconds}s linear infinite`, willChange: 'transform' }}
            >
              {[...partnerAssetLogos, ...partnerAssetLogos].map((logo, index) => (
                <div
                  key={`partner-asset-logo-about-${index}-${logo.src}`}
                  className="relative w-auto shrink-0 mr-[clamp(28px,5.5vw,82.53px)]"
                  style={{
                    aspectRatio: String(logo.ratio),
                    height: `calc(clamp(34px, 4.9vw, 61.43px) * ${logoHeightFactor(logo).toFixed(3)})`,
                  }}
                >
                  <Image
                    src={logo.src}
                    alt={`Logo partenaire ${index % partnerAssetLogos.length + 1}`}
                    fill
                    sizes="203px"
                    loading="lazy"
                    unoptimized={logo.src.endsWith('.svg')}
                    className={`object-contain ${LOGO_WHITE_FILTER}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="valeurs" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-[104px]">
        <div className="mx-auto grid max-w-[1461px] gap-12 lg:grid-cols-[minmax(220px,0.32fr)_1fr]">
          <SectionIntro label="//Nos valeurs" eyebrow="Exigence professionnelle" />
          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="flex min-h-[307px] flex-col justify-end rounded-[8px] p-8"
                style={{ background: value.background }}
              >
                <h3 className={`${poppins.className} text-[32px] font-medium leading-none`} style={{ color: value.titleColor }}>
                  {value.title}
                </h3>
                <p className={`${poppins.className} mt-5 max-w-[280px] text-[12px] font-medium leading-4`} style={{ color: value.textColor }}>
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="equipe" className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-[118px]">
        <div className="mx-auto max-w-[1461px]">
          <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-[minmax(240px,0.45fr)_1fr]">
            <h2 className={`${poppins.className} text-[28px] font-medium leading-[1.2] text-black sm:text-[32px]`}>
              {'//Notre équipe'}
            </h2>
            <p className={`${poppins.className} max-w-[455px] text-[15px] font-medium leading-5 text-black/70`}>
              Une équipe de professionnels expérimentés, forte d’un parcours solide et d’une expertise reconnue.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4 xl:gap-[18px]">
            {teamMembers.map((member) => (
              <TeamCard
                key={member.name}
                name={member.name}
                role={member.role}
                tone={member.tone}
                image={member.image}
                linkedinUrl={member.linkedinUrl}
                className="w-full max-w-[352px] justify-self-center sm:max-w-none"
              />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto h-px max-w-[1157px] bg-black/10" />

      <section id="approche" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-[92px]">
        <div className="mx-auto max-w-[1461px]">
          <div className="mb-16 grid gap-8 lg:grid-cols-[minmax(260px,0.48fr)_1fr]">
            <h2 className={`${poppins.className} text-[32px] font-medium leading-none text-black`}>{'//Notre approche'}</h2>
            <p className={`${poppins.className} max-w-[635px] text-[15px] font-medium leading-5 text-black/70`}>
              Nous adoptons une méthodologie structurée, adaptée à chaque contexte, afin de garantir des décisions
              sécurisées et une exécution efficace.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[435px_1fr] lg:items-start">
            <div className="relative aspect-[435/382] overflow-hidden rounded-[8px] bg-[#D9D9D9]">
              <Image src="/optimized/group-349025.webp"
                alt="Réunion de conseil stratégique"
                fill
                sizes="(max-width: 1024px) 92vw, 435px"
                className="object-cover"
               loading="lazy"/>
            </div>

            <div className="flex flex-col">
              {approachSteps.map((step) => (
                <article key={step.title} className="grid gap-4 border-b border-[#D9D9D9] py-10 first:pt-0 md:grid-cols-[180px_1fr] md:gap-16">
                  <h3 className="font-[Geist] text-[16px] font-medium leading-[21px] text-black">{step.title}</h3>
                  <p className="max-w-[335px] font-[Geist] text-[13px] font-medium leading-[17px] text-black/50">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <Image src="/optimized/mask-group-6.webp"
            alt=""
            fill
            className="object-cover object-bottom"
            sizes="100vw"
            loading="lazy"/>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
        </div>

        <section id="contact-about" className="relative z-[1] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-[116px]">
          <div className="mx-auto grid max-w-[1155px] gap-10 lg:grid-cols-[minmax(280px,336px)_1fr] lg:items-start lg:gap-[96px] xl:gap-[165px]">
            <div className="flex flex-col gap-10">
              <h2 className={`${poppins.className} text-[40px] font-normal leading-none text-black sm:text-[52px] md:text-[64px]`}>
                Contactez-nous
              </h2>
              <p className={`${poppins.className} max-w-[420px] text-[16px] font-normal leading-[22px] text-black/60`}>
                Échangez avec nos experts et obtenez un accompagnement adapté à vos enjeux.
              </p>
            </div>

            <form action="/contact" className="bg-[#F7FCFF]/95 p-6 shadow-[2px_4px_42px_rgba(0,0,0,0.19)] sm:p-8 md:p-10">
              <div className="mb-12 sm:mb-14">
                <div className="flex flex-wrap items-center justify-between gap-4 px-0 font-[Geist] text-[18px] font-medium leading-6 sm:px-4 sm:text-[20px] md:text-[24px]">
                  <button
                    type="button"
                    onClick={() => setSelectedTab('entrepreneuriat')}
                    className={`cursor-pointer transition ${selectedTab === 'entrepreneuriat' ? 'text-[#003300]' : 'text-[#BFCCBF]'}`}
                  >
                    Entrepreneuriat
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTab('institutionnel')}
                    className={`cursor-pointer transition ${selectedTab === 'institutionnel' ? 'text-[#003300]' : 'text-[#BFCCBF]'}`}
                  >
                    Institutionnel
                  </button>
                </div>
                <div className="mt-6 h-1 bg-[#BFCCBF] sm:mt-8">
                  <div
                    className={`h-full transition-all duration-300 ${selectedTab === 'entrepreneuriat' ? 'w-1/2' : 'w-full ml-auto'}`}
                    style={{ marginLeft: selectedTab === 'institutionnel' ? '50%' : '0' }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-8 sm:gap-10">
                <input type="hidden" name="subject" value={selectedTab === 'entrepreneuriat' ? 'Entrepreneuriat' : 'Institutionnel'} />
                {['*Nom', 'Prenom', 'Email'].map((placeholder) => (
                  <label key={placeholder} className="block border-b-2 border-[#BFCCBF] pb-5">
                    <span className="sr-only">{placeholder}</span>
                    <input
                      name={placeholder.replace('*', '').toLowerCase()}
                      placeholder={placeholder}
                      className="w-full bg-transparent font-[Geist] text-[18px] font-normal leading-6 text-[#003300] outline-none placeholder:text-[#003300]/70 sm:text-[20px]"
                    />
                  </label>
                ))}
                <label className="block border-b-2 border-[#BFCCBF] pb-5">
                  <span className="sr-only">Messages</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Messages"
                    className="w-full resize-none bg-transparent font-[Geist] text-[18px] font-normal leading-6 text-[#003300] outline-none placeholder:text-[#003300]/70 sm:text-[20px]"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-10 flex h-[64px] w-full items-center justify-center rounded-[8px] bg-[#BBCB2E] font-[Geist] text-[20px] font-medium leading-6 text-[#003300] transition hover:bg-[#aeba2a] sm:mt-14 sm:h-[72px] sm:text-[24px]"
              >
                Envoyer
              </button>
            </form>
          </div>
        </section>

        <div className="relative z-[1]">
          <Footer showTopRow={false} />
        </div>
      </div>
    </main>
  );
}
