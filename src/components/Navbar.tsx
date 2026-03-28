'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    'Analyse institutionnelle',
    'Conseil stratégique',
    'Études réglementaires',
    'Accompagnement des projets',
  ];

  return (
    <nav className="absolute left-1/2 top-4 z-50 w-[95%] -translate-x-1/2 md:top-12 md:w-[90%] 2xl:w-[1450px]">
      <div
        className="flex flex-row items-center justify-between bg-[#F7FCFF] px-4 py-3 md:px-6 md:py-3.5"
        style={{
          boxShadow: '0px 3.23873px 28.9866px rgba(0, 51, 0, 0.25)',
          borderRadius: '16px',
        }}
      >
        <Link href="/">
          <Image
            src="/Group (2).svg"
            alt="Logo"
            width={32}
            height={34}
            className="md:h-[41px] md:w-[39px]"
            priority
          />
        </Link>

        <div className="hidden flex-row items-center gap-7 lg:flex">
          <Link
            href="/"
            className="text-center font-[Geist] text-[15px] font-semibold text-[#003300] transition hover:opacity-75 md:text-[17px]"
          >
            Accueil
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-1.5 text-center font-[Geist] text-[15px] font-semibold text-[#003300] opacity-50 transition hover:opacity-75 md:text-[17px]"
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
                {services.map((service, index) => (
                  <button
                    key={index}
                    type="button"
                    className="block w-full border-b border-[#003300]/5 px-4 py-3 text-left text-sm font-medium text-[#003300] transition last:border-b-0 hover:bg-[#BBCB2E]/10"
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="text-center font-[Geist] text-[15px] font-semibold text-[#003300] opacity-50 transition hover:opacity-75 md:text-[17px]"
          >
            Projets
          </button>

          <button
            type="button"
            className="text-center font-[Geist] text-[15px] font-semibold text-[#003300] opacity-50 transition hover:opacity-75 md:text-[17px]"
          >
            À propos
          </button>
        </div>

        <div className="hidden flex-row items-center gap-2.5 lg:flex">
          <button
            type="button"
            className="flex items-center justify-center rounded-[10px] border-[1.5px] border-[#003300] px-4 py-2.5 text-center font-[Geist] text-[14px] font-semibold text-[#003300] transition hover:bg-[#003300]/5 md:text-[15px]"
          >
            À propos
          </button>

          <Link
            href="/contact"
            className="flex items-center justify-center rounded-[10px] bg-[#BBCB2E] px-4 py-2.5 text-center font-[Geist] text-[14px] font-extrabold text-[#003300] transition hover:bg-[#BBCB2E]/90 md:text-[15px]"
          >
            Contact
          </Link>
        </div>

        <button
          type="button"
          className="flex flex-col items-center justify-center gap-1.5 p-2 lg:hidden"
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
          className="mt-2 rounded-2xl bg-[#F7FCFF] p-4 shadow-lg lg:hidden"
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
                  {services.map((service, index) => (
                    <button
                      key={index}
                      type="button"
                      className="py-2 text-left text-sm font-medium text-[#003300] opacity-70 hover:opacity-100"
                    >
                      {service}
                    </button>
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
