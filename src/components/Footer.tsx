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
    title: 'Publications',
    items: ['Articles', 'Analyses', 'PME & ASBL', 'Études sectorielles'],
  },
];

const socialIcons = [
  { name: 'Instagram', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334109/rnj/mask-group-23-1ce30be9.svg' },
  { name: 'LinkedIn', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334110/rnj/mask-group-24-fd4f223e.svg' },
  { name: 'Telegram', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334111/rnj/mask-group-25-516d2f88.svg' },
  { name: 'Twitter', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334113/rnj/mask-group-26-a7a619cb.svg' },
  { name: 'Facebook', src: 'https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334115/rnj/mask-group-27-5870749d.svg' },
];

const footerItemLinks: Record<string, string> = {
  Accueil: '/',
  'À propos': '/a-propos',
  'Notre approche': '/a-propos#approche',
  "Zones d'intervention": '/#impact-map',
  'Conseil stratégique': '/services',
  'Analyse institutionnelle': '/services/analyse-institutionnelle',
  'Conformité réglementaire': '/services',
  'Transition énergétique': '/services',
  "Structuration d'entreprise": '/services',
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
              <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334123/rnj/mask-group-21-d1c01771.svg" alt="Flèches décoratives" fill className="object-contain"  loading="lazy"/>
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
            <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
              <div className="flex max-w-[351.77px] flex-col gap-[29.98px]">
                <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                  alt="Logo RNJ Advisory"
                  width={233}
                  height={58}
                  className="h-auto w-[180px] sm:w-[232.85px]"
                 priority/>
                <p className="font-[Geist] text-[15.9894px] font-medium leading-[16px] text-white opacity-50">
                  Cabinet de conseil stratégique et réglementaire accompagnant acteurs publics,
                  entreprises privées et investisseurs dans la sécurisation de leurs projets et la
                  maîtrise des environnements institutionnels complexes.
                </p>
              </div>

              <div className="grid w-full max-w-[915.39px] grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[19.99px]">
                {footerColumns.map((column) => (
                  <div key={column.title} className="flex flex-col gap-6">
                    <span className="font-[Geist] text-[19.9868px] font-semibold leading-[16px] text-white">
                      {column.title}
                    </span>
                    <div className="flex flex-col items-start gap-[16.99px]">
                      {column.items.map((item) => {
                        const href = footerItemLinks[item];
                        const content = (
                          <>
                            <div className="h-[6px] w-[6px] rounded-full bg-white" />
                            <span className="font-[Geist] text-[15.9894px] font-medium leading-[16px] text-white opacity-80">
                              {item}
                            </span>
                          </>
                        );

                        if (href) {
                          return (
                            <Link
                              key={item}
                              href={href}
                              className="flex items-center gap-[13.99px] text-left transition-opacity hover:opacity-100"
                            >
                              {content}
                            </Link>
                          );
                        }

                        return (
                          <button
                            key={item}
                            type="button"
                            className="flex items-center gap-[13.99px] text-left transition-opacity hover:opacity-100"
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

            <div className="mt-10 flex w-full flex-col items-center gap-6 md:flex-row md:items-center md:justify-between md:gap-8 lg:mt-auto lg:pt-8 lg:gap-[214.86px]">
              {/* Frame 334 — social icons */}
              <div className="flex flex-row flex-wrap items-center justify-center gap-[14px] sm:gap-[19.99px]">
                {socialIcons.map((social) => (
                  <div key={social.name} className="relative h-[29.2px] w-[29.2px] overflow-hidden rounded-full">
                    <Image src={social.src} alt={social.name} fill className="object-contain" />
                  </div>
                ))}
              </div>

              {/* Frame 345 — contact + copyright row */}
              <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row md:items-end md:justify-end md:gap-8 lg:gap-[141.91px]">
                {/* Frame 336 — phone + email */}
                <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-5 lg:gap-[77.95px]">
                  {/* Frame 201 — phone */}
                  <div className="flex flex-row items-center gap-[19.99px]">
                    <div className="relative h-[22px] w-[21.92px] shrink-0">
                      <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1777310359/rnj/layer-1-27-a0d86191.svg" alt="Téléphone" fill className="object-contain"  loading="lazy"/>
                    </div>
                    <span className="font-[Geist] text-[13px] font-medium leading-[19px] tracking-[0.04em] text-white sm:text-[14px] sm:leading-[20px] lg:text-[15.3604px] lg:leading-[21px] lg:tracking-[0.05em] whitespace-nowrap">
                      +32 474 03 22 66
                    </span>
                  </div>
                  {/* Frame 202 — email */}
                  <div className="flex max-w-full flex-row items-center gap-[12px] sm:gap-[19.99px]">
                    <div className="relative h-[15.47px] w-[22px] shrink-0">
                      <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1777310361/rnj/layer-1-26-33e2a54e.svg" alt="E-mail" fill className="object-contain"  loading="lazy"/>
                    </div>
                    <span className="break-words text-center font-[Geist] text-[13px] font-medium leading-[19px] tracking-[0.04em] text-white sm:text-left sm:text-[14px] sm:leading-[20px] lg:text-[15.3604px] lg:leading-[21px] lg:tracking-[0.05em]">
                      info@rnj-advisory.be
                    </span>
                  </div>
                </div>
                {/* Copyright */}
                <span className="max-w-full text-center font-[Geist] text-[12px] font-medium leading-[18px] text-white opacity-50 sm:text-[13px] sm:leading-[19px] md:text-right lg:text-[15.3604px] lg:leading-[21px] lg:whitespace-nowrap">
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
