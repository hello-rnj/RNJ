'use client';

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
    role: 'Co-Founder & CEO',
    initials: 'NA',
    tone: '#EEF2CA',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376840/rnj/nahla-eae48fe8.svg',
  },
  {
    name: 'Ramzi Jelalia',
    role: 'Co-founder & CTO',
    initials: 'RJ',
    tone: '#DDE597',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132761/rnj/ramzi-05917bd9.svg',
  },
  {
    name: 'Eya Mhamed',
    role: 'Tech Lead',
    initials: 'EM',
    tone: '#CCD862',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132763/rnj/eya-44c9ccac.svg',
  },
  {
    name: 'Chahine Fehri',
    role: 'Creative Director',
    initials: 'CF',
    tone: '#EEF2CA',
    image: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132766/rnj/chahine-88336938.svg',
  },
];

const partnerAssetLogos = [
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333855/rnj/asset-14-1-cda0f5e7.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333857/rnj/asset-15-1-7f0249bf.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333858/rnj/asset-16-1-41dc72e6.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333859/rnj/asset-17-1-5077f95f.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333861/rnj/asset-21-1-6ad9b68e.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333863/rnj/asset-22-1-ac5775de.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333864/rnj/asset-23-1-9c5664dc.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333866/rnj/asset-24-1-1c05ea09.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333867/rnj/asset-26-1-3d6250e2.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333869/rnj/asset-27-1-8679f4ab.svg',
  'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333870/rnj/asset-28-1-d6d25061.svg',
] as const;

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
          src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132770/rnj/group-349020-a82fd32c.svg"
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
          <div className="mb-16 grid gap-8 lg:grid-cols-[minmax(240px,0.45fr)_1fr]">
            <h2 className={`${poppins.className} text-[32px] font-medium leading-[38px] text-black`}>{'//Notre équipe'}</h2>
            <p className={`${poppins.className} max-w-[455px] text-[15px] font-medium leading-5 text-black/70`}>
              Une équipe de professionnels expérimentés, forte d’un parcours solide et d’une expertise reconnue.
            </p>
          </div>

          <div className="flex flex-row items-center gap-[18px]">
            {teamMembers.map((member) => (
              <TeamCard
                key={member.name}
                name={member.name}
                role={member.role}
                tone={member.tone}
                image={member.image}
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
              <Image
                src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777410436/rnj/optimized/group-349025.webp"
                alt="Réunion de conseil stratégique"
                fill
                sizes="(max-width: 1024px) 92vw, 435px"
                className="object-cover"
              />
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

      <section className="relative z-[2] w-full bg-[#BBCB2E] py-3 sm:py-3 md:py-4">
        <div className="w-full px-0">
          <div className="relative min-h-[54px] overflow-hidden sm:min-h-[58px] md:min-h-[66px] lg:min-h-[74px]">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[clamp(24px,6vw,80px)] bg-gradient-to-r from-[#BBCB2E] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[clamp(24px,6vw,80px)] bg-gradient-to-l from-[#BBCB2E] to-transparent" />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                className="flex w-max items-center gap-[clamp(24px,4.5vw,73px)]"
                style={{
                  animation: 'scroll 26s linear infinite',
                  willChange: 'transform',
                }}
              >
                {[...partnerAssetLogos, ...partnerAssetLogos].map((logo, index) => (
                  <div
                    key={`partner-asset-logo-about-${index}-${logo}`}
                    className="relative h-[clamp(30px,4.6vw,52px)] w-[clamp(108px,15vw,190px)] shrink-0"
                  >
                    <Image
                      src={logo}
                      alt={`Logo partenaire ${index % partnerAssetLogos.length + 1}`}
                      fill
                      className="object-contain [filter:brightness(0)_saturate(100%)_invert(100%)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-about" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-[116px]">
        <div className="mx-auto grid max-w-[1155px] gap-12 lg:grid-cols-[336px_1fr] lg:items-start lg:gap-[165px]">
          <div className="flex flex-col gap-10">
            <h2 className={`${poppins.className} text-[52px] font-normal leading-none text-black md:text-[64px]`}>
              Contactez-nous
            </h2>
            <p className={`${poppins.className} text-[16px] font-normal leading-[22px] text-black/60`}>
              Échangez avec nos experts et obtenez un accompagnement adapté à vos enjeux.
            </p>
          </div>

          <form action="/contact" className="bg-[#F7FCFF] p-7 shadow-[2px_4px_42px_rgba(0,0,0,0.19)] md:p-10">
            <div className="mb-14">
              <div className="flex items-center justify-between gap-8 px-4 font-[Geist] text-[20px] font-medium leading-6 md:text-[24px]">
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
              <div className="mt-8 h-1 bg-[#BFCCBF]">
                <div className={`h-full transition-all duration-300 ${selectedTab === 'entrepreneuriat' ? 'w-1/2' : 'w-full ml-auto'}`} style={{ marginLeft: selectedTab === 'institutionnel' ? '50%' : '0' }} />
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <input type="hidden" name="subject" value={selectedTab === 'entrepreneuriat' ? 'Entrepreneuriat' : 'Institutionnel'} />
              {['*Nom', 'Prenom', 'Email'].map((placeholder) => (
                <label key={placeholder} className="block border-b-2 border-[#BFCCBF] pb-5">
                  <span className="sr-only">{placeholder}</span>
                  <input
                    name={placeholder.replace('*', '').toLowerCase()}
                    placeholder={placeholder}
                    className="w-full bg-transparent font-[Geist] text-[20px] font-normal leading-6 text-[#003300] outline-none placeholder:text-[#003300]/70"
                  />
                </label>
              ))}
              <label className="block border-b-2 border-[#BFCCBF] pb-5">
                <span className="sr-only">Messages</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Messages"
                  className="w-full resize-none bg-transparent font-[Geist] text-[20px] font-normal leading-6 text-[#003300] outline-none placeholder:text-[#003300]/70"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-14 flex h-[72px] w-full items-center justify-center rounded-[8px] bg-[#BBCB2E] font-[Geist] text-[24px] font-medium leading-6 text-[#003300] transition hover:bg-[#aeba2a]"
            >
              Envoyer
            </button>
          </form>
        </div>
      </section>

      <section className="relative h-[540px] overflow-hidden bg-[#003300] md:h-[660px]">
        <Image
          src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777410436/rnj/optimized/mask-group-43.webp"
          alt="Ville et architecture"
          fill
          sizes="100vw"
          className="absolute left-[-2px] bottom-[-50px] h-[1674.89px] w-[1512px] object-cover"
        />
      </section>

      <Footer />
    </main>
  );
}
