'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    { label: 'Analyse institutionnelle', href: '/services/analyse-institutionnelle' },
    { label: 'Conseil strat\u00e9gique', href: '/services' },
    { label: '\u00c9tudes r\u00e9glementaires', href: '/services' },
    { label: 'Accompagnement des projets', href: '/services' },
  ];

  return (
    <nav className="absolute left-1/2 top-3 z-50 w-[95%] max-w-[1450px] -translate-x-1/2 sm:top-4 sm:w-[94%] md:top-8 md:w-[92%] lg:top-10 lg:w-[90%] xl:top-12">
      <div
        className="flex flex-row items-center justify-between gap-3 rounded-[16px] bg-[#F7FCFF] px-3 py-3 sm:px-4 md:rounded-[19.6104px] md:px-5 md:py-[13.8772px] lg:px-6 xl:px-[25px]"
        style={{
          boxShadow: '0px 3.23873px 28.9866px rgba(0, 51, 0, 0.25)',
        }}
      >
        <Link href="/" className="flex min-w-0 items-center gap-2 md:gap-2.5">
          <Image
            src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776333984/rnj/layer-4-955dc651.svg"
            alt="Logo icon"
            width={32}
            height={34}
            className="h-[30px] w-[28px] sm:h-[34px] sm:w-[32px] md:h-[41px] md:w-[39px]"
            priority
          />
          <Image
            src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334126/rnj/group-73892e5a.svg"
            alt="Logo text"
            width={162}
            height={43}
            className="hidden h-auto w-[132px] sm:block sm:w-[150px] md:w-[162px]"
            priority
          />
        </Link>

        <div className="hidden flex-row items-center gap-6 xl:flex 2xl:gap-[29.36px]">
          <Link
            href="/"
            className="text-center font-[Geist] text-[15px] font-semibold text-[#003300] transition hover:opacity-75 2xl:text-[17px]"
          >
            Accueil
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-1.5 text-center font-[Geist] text-[15px] font-semibold text-[#003300] opacity-50 transition hover:opacity-75 2xl:text-[17px]"
            >
              <span>Services</span>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className={`transition-transform ${isServicesOpen ? 'rotate-0' : 'rotate-180'}`}
              >
                <path d="M1 5 L6 1 L11 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isServicesOpen && (
              <div className="absolute left-0 top-full z-20 mt-2 min-w-[200px] overflow-hidden rounded-lg border border-[#003300]/10 bg-[#F7FCFF] shadow-lg">
                {services.map((service) => (
                  <Link
                    key={service.label}
                    href={service.href}
                    onClick={() => setIsServicesOpen(false)}
                    className="block w-full border-b border-[#003300]/5 px-4 py-3 text-left text-sm font-medium text-[#003300] transition last:border-b-0 hover:bg-[#BBCB2E]/10"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="text-center font-[Geist] text-[15px] font-semibold text-[#003300] opacity-50 transition hover:opacity-75 2xl:text-[17px]"
          >
            Projets
          </button>

          <button
            type="button"
            className="text-center font-[Geist] text-[15px] font-semibold text-[#003300] opacity-50 transition hover:opacity-75 2xl:text-[17px]"
          >
            À propos
          </button>
        </div>

        <div className="hidden flex-row items-center gap-2 xl:flex xl:gap-[10px]">
          <Image
            src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334127/rnj/asset-96a86689.png"
            alt="Drapeau Belgique"
            width={20}
            height={30}
            className="h-[26px] w-[18px] object-contain 2xl:h-[30px] 2xl:w-[20px]"
          />
          <button
            type="button"
            className="flex h-[39px] items-center justify-center rounded-[10px] border-[1.5px] border-[#003300] px-4 text-center font-[Geist] text-[14px] font-semibold text-[#003300] transition hover:bg-[#003300]/5 2xl:h-[41px] 2xl:px-[17px] 2xl:text-[15px]"
          >
            À propos
          </button>

          <Link
            href="/contact"
            className="flex h-[39px] items-center justify-center rounded-[10px] bg-[#BBCB2E] px-4 text-center font-[Geist] text-[14px] font-extrabold text-[#003300] transition hover:bg-[#BBCB2E]/90 2xl:h-[41px] 2xl:text-[15px]"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          className="flex flex-col items-center justify-center gap-1.5 p-2 xl:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            className={`block h-0.5 w-6 bg-[#003300] transition-transform ${
              isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#003300] transition-opacity ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#003300] transition-transform ${
              isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="mt-2 rounded-2xl bg-[#F7FCFF] p-4 shadow-lg xl:hidden"
          style={{ boxShadow: '0px 3px 20px rgba(0, 51, 0, 0.2)' }}
        >
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="border-b border-[#003300]/10 py-2 font-[Geist] text-lg font-semibold text-[#003300]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex w-full items-center justify-between border-b border-[#003300]/10 py-2 font-[Geist] text-lg font-semibold text-[#003300]"
              >
                <span>Services</span>
                <svg
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform ${isServicesOpen ? 'rotate-0' : 'rotate-180'}`}
                >
                  <path d="M1 5 L6 1 L11 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {isServicesOpen && (
                <div className="mt-2 flex flex-col gap-2 pl-4">
                  {services.map((service) => (
                    <Link
                      key={service.label}
                      href={service.href}
                      onClick={() => {
                        setIsServicesOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="py-2 text-left text-sm font-medium text-[#003300] opacity-70 hover:opacity-100"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className="border-b border-[#003300]/10 py-2 text-left font-[Geist] text-lg font-semibold text-[#003300]"
            >
              Projets
            </button>

            <button
              type="button"
              className="border-b border-[#003300]/10 py-2 text-left font-[Geist] text-lg font-semibold text-[#003300]"
            >
              À propos
            </button>

            <div className="mt-2 flex flex-col gap-3">
              <button
                type="button"
                className="w-full rounded-xl border-[1.5px] border-[#003300] py-3 text-center font-[Geist] font-semibold text-[#003300]"
              >
                À propos
              </button>
              <Link
                href="/contact"
                className="w-full rounded-xl bg-[#BBCB2E] py-3 text-center font-[Geist] font-extrabold text-[#003300]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}


