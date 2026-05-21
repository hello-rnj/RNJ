'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar({ dark = false }: { dark?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navBg   = dark ? '#002600' : '#F7FCFF';
  const textCol = dark ? '#FFFFFF' : '#003300';

  return (
    <nav className="absolute left-1/2 top-3 z-50 w-[95%] max-w-[1450px] -translate-x-1/2 sm:top-4 sm:w-[94%] md:top-8 md:w-[92%] lg:top-10 lg:w-[90%] xl:top-12">
      <div
        className="flex flex-row items-center justify-between gap-3 rounded-[16px] px-3 py-3 sm:px-4 md:rounded-[19.6104px] md:px-5 md:py-[13.8772px] lg:px-6 xl:px-[25px]"
        style={{
          background: navBg,
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
            unoptimized
          />
          <Image
            src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334126/rnj/group-73892e5a.svg"
            alt="Logo text"
            width={162}
            height={43}
            className="h-auto w-[110px] sm:w-[150px] md:w-[162px]"
            priority
            unoptimized
          />
        </Link>

        <div className="hidden flex-row items-center gap-6 xl:flex 2xl:gap-[29.36px]">
          <Link
            href="/"
            className="text-center font-[Geist] text-[15px] font-semibold transition hover:opacity-75 2xl:text-[17px]"
            style={{ color: textCol }}
          >
            Accueil
          </Link>

          <div className="relative">
            <button
              type="button"
              disabled
              className="flex items-center gap-1.5 text-center font-[Geist] text-[15px] font-semibold opacity-50 transition hover:opacity-75 2xl:text-[17px] cursor-not-allowed"
              style={{ color: textCol }}
            >
              <span>Services</span>
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transition-transform rotate-180"
              >
                <path d="M1 5 L6 1 L11 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <Link
            href="/projets"
            className="text-center font-[Geist] text-[15px] font-semibold opacity-50 transition hover:opacity-75 2xl:text-[17px]"
            style={{ color: textCol }}
          >
            Projets
          </Link>

          <Link
            href="/a-propos"
            className="text-center font-[Geist] text-[15px] font-semibold opacity-50 transition hover:opacity-75 2xl:text-[17px]"
            style={{ color: textCol }}
          >
            À propos
          </Link>
        </div>

        <div className="hidden flex-row items-center gap-2 xl:flex xl:gap-[10px]">
          <Image src="/optimized/belgium-flag.svg"
            alt="Drapeau Belgique"
            width={20}
            height={30}
            unoptimized
            className="h-[26px] w-[18px] object-contain 2xl:h-[30px] 2xl:w-[20px]"
           loading="lazy"/>
          <Link
            href="/a-propos"
            className="flex h-[39px] items-center justify-center rounded-[10px] border-[1.5px] px-4 text-center font-[Geist] text-[14px] font-semibold transition 2xl:h-[41px] 2xl:px-[17px] 2xl:text-[15px]"
            style={{ borderColor: textCol, color: textCol }}
          >
            À propos
          </Link>

          <Link
            href="/contact"
            className="flex h-[41px] w-[100px] items-center justify-center rounded-[10px] px-4 text-center font-[Geist] text-[15.0249px] font-extrabold leading-[17px] text-white transition hover:opacity-90 relative overflow-hidden"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376864/rnj/group-349012-8572149e.svg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <span className="relative z-10">Contact</span>
          </Link>
        </div>

        <button
          type="button"
          className="flex flex-col items-center justify-center gap-1.5 p-2 xl:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            className={`block h-0.5 w-6 transition-transform ${
              isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
            style={{ background: textCol }}
          />
          <span
            className={`block h-0.5 w-6 transition-opacity ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
            style={{ background: textCol }}
          />
          <span
            className={`block h-0.5 w-6 transition-transform ${
              isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
            style={{ background: textCol }}
          />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="mt-2 rounded-2xl p-4 shadow-lg xl:hidden"
          style={{ background: navBg, boxShadow: '0px 3px 20px rgba(0, 51, 0, 0.2)' }}
        >
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="border-b py-2 font-[Geist] text-lg font-semibold"
              style={{ color: textCol, borderColor: `${textCol}1a` }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>

            <div>
              <button
                type="button"
                disabled
                className="flex w-full items-center justify-between border-b py-2 font-[Geist] text-lg font-semibold cursor-not-allowed opacity-50"
                style={{ color: textCol, borderColor: `${textCol}1a` }}
              >
                <span>Services</span>
                <svg
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="transition-transform rotate-180"
                >
                  <path d="M1 5 L6 1 L11 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <Link
              href="/projets"
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b py-2 text-left font-[Geist] text-lg font-semibold"
              style={{ color: textCol, borderColor: `${textCol}1a` }}
            >
              Projets
            </Link>

            <Link
              href="/a-propos"
              onClick={() => setIsMobileMenuOpen(false)}
              className="border-b py-2 text-left font-[Geist] text-lg font-semibold"
              style={{ color: textCol, borderColor: `${textCol}1a` }}
            >
              À propos
            </Link>

            <div className="mt-2 flex flex-col gap-3">
              <Link
                href="/a-propos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full rounded-xl border-[1.5px] py-3 text-center font-[Geist] font-semibold"
                style={{ color: textCol, borderColor: textCol }}
              >
                À propos
              </Link>
              <Link
                href="/contact"
                className="w-full rounded-xl py-3 text-center font-[Geist] font-extrabold text-white transition hover:opacity-90 relative overflow-hidden"
                style={{
                  backgroundImage: "url('https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777376864/rnj/group-349012-8572149e.svg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="relative z-10">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
