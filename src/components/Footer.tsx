'use client';

import Image from 'next/image';
import Link from 'next/link';

const footerColumns = [
  {
    title: 'Cabinet',
    items: ['Accueil', 'À propos', 'Notre approche', "Zones d'intervention"],
  },
  {
    title: 'Expertise',
    items: [
      'Conseil stratégique',
      'Analyse institutionnelle',
      'Conformité réglementaire',
      'Transition énergétique',
      "Structuration d'entreprise",
    ],
  },
  {
    title: 'Secteurs',
    items: ['Acteurs publics', 'Investisseurs & bailleurs', 'PME & ASBL', 'Indépendants', 'Exportateurs'],
  },
  {
    title: 'Publications',
    items: ['Articles', 'Analyses', 'PME & ASBL', 'Études sectorielles'],
  },
];

const socialIcons = [
  { name: 'Instagram', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334109/rnj/mask-group-23-1ce30be9.svg' },
  { name: 'LinkedIn', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334110/rnj/mask-group-24-fd4f223e.svg' },
  { name: 'Telegram', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334111/rnj/mask-group-25-516d2f88.svg' },
  { name: 'Twitter', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334113/rnj/mask-group-26-a7a619cb.svg' },
  { name: 'Facebook', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334115/rnj/mask-group-27-5870749d.svg' },
];

const footerItemLinks: Record<string, string> = {
  Accueil: '/',
  'À propos': '/about',
  'Notre approche': '/about#approche',
  "Zones d'intervention": '/#impact-map',
  'Conseil stratégique': '/services',
  'Analyse institutionnelle': '/services/analyse-institutionnelle',
  'Conformité réglementaire': '/services',
  'Transition énergétique': '/services',
  "Structuration d'entreprise": '/services',
};

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#BBCB2E] px-4 py-10 sm:px-6 md:px-8 md:py-14">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#BBCB2E]" />
        <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334121/rnj/mask-group-20-0d9c29f8.svg" alt="Arrière-plan du pied de page" fill className="object-cover" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1462px] flex-col gap-6 md:gap-8">
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
            <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334123/rnj/mask-group-21-d1c01771.svg" alt="Flèches décoratives" fill className="object-contain" />
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

        <div className="rounded-[24px] bg-[rgba(0,0,0,0.17)] p-5 shadow-[2px_4px_39.6px_rgba(0,0,0,0.69)] backdrop-blur-[10px] sm:p-7 md:rounded-[30px] md:p-9 lg:p-[35px]">
          <div className="flex flex-col gap-10 lg:gap-12">
            <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
              <div className="flex max-w-[352px] flex-col gap-6">
                <Image
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                  alt="Logo RNJ Advisory"
                  width={233}
                  height={58}
                  className="h-auto w-[180px] sm:w-[233px]"
                />
                <p className="font-[Geist] text-[14px] font-medium leading-6 text-white opacity-70 sm:text-[16px]">
                  Cabinet de conseil stratégique et réglementaire accompagnant acteurs publics,
                  entreprises privées et investisseurs dans la sécurisation de leurs projets et la
                  maîtrise des environnements institutionnels complexes.
                </p>
              </div>

              <div className="grid w-full max-w-[916px] grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
                {footerColumns.map((column) => (
                  <div key={column.title} className="flex flex-col gap-6">
                    <span className="font-[Geist] text-[18px] font-semibold text-white sm:text-[20px]">
                      {column.title}
                    </span>
                    <div className="flex flex-col items-start gap-4">
                      {column.items.map((item) => {
                        const href = footerItemLinks[item];
                        const content = (
                          <>
                            <div className="h-[6px] w-[6px] rounded-full bg-white" />
                            <span className="font-[Geist] text-[15px] font-medium leading-5 text-white opacity-80 sm:text-[16px]">
                              {item}
                            </span>
                          </>
                        );

                        if (href) {
                          return (
                            <Link
                              key={item}
                              href={href}
                              className="flex items-center gap-3 text-left transition-opacity hover:opacity-100"
                            >
                              {content}
                            </Link>
                          );
                        }

                        return (
                          <button
                            key={item}
                            type="button"
                            className="flex items-center gap-3 text-left transition-opacity hover:opacity-100"
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

            <div className="flex flex-col gap-6 border-t border-white/15 pt-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                {socialIcons.map((social) => (
                  <div key={social.name} className="relative h-[29.2px] w-[29.2px] overflow-hidden rounded-full">
                    <Image src={social.src} alt={social.name} fill className="object-contain" />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-5 lg:items-end">
                <div className="flex flex-col gap-4 sm:items-end">
                  <span className="font-[Geist] text-[14px] font-medium leading-5 text-white sm:text-[15.37px] sm:leading-[21px]">
                    Avenue Louise 500, Ixelles, Bruxelles
                  </span>

                  <div className="flex items-center gap-4">
                    <div className="relative h-[22px] w-[22px]">
                      <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333875/rnj/vector-18-18cc905b.svg" alt="Téléphone" fill className="object-contain" />
                    </div>
                    <span className="font-[Geist] text-[14px] font-medium tracking-[0.05em] text-white sm:text-[15.37px]">
                      +32 474 03 22 66
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative h-[15px] w-[22px]">
                      <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333875/rnj/vector-18-18cc905b.svg" alt="E-mail" fill className="object-contain" />
                    </div>
                    <span className="break-all font-[Geist] text-[14px] font-medium tracking-[0.05em] text-white sm:text-[15.37px]">
                      info@rnj-advisory.be
                    </span>
                  </div>
                </div>

                <span className="font-[Geist] text-[13px] font-medium leading-5 text-white opacity-50 sm:text-[15.37px] sm:leading-[21px]">
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
