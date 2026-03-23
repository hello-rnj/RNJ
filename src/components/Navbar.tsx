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
    <nav
      className="absolute z-50 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] lg:w-[1450px] top-4 md:top-12"
    >
      <div
        className="flex flex-row justify-between items-center bg-[#F7FCFF] px-4 py-3 md:px-6 md:py-3.5"
        style={{
          boxShadow: '0px 3.23873px 28.9866px rgba(0, 51, 0, 0.25)',
          borderRadius: '16px',
        }}
      >
        
        {/* Logo */}
        <Link href="/">
          <Image
            src="/Group (2).svg"
            alt="Logo"
            width={32}
            height={34}
            className="md:w-[39px] md:h-[41px]"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex flex-row items-center gap-7">
          <Link 
            href="/" 
            className="font-[Geist] font-semibold text-[#003300] text-center hover:opacity-75 transition text-[15px] md:text-[17px]"
          >
            Home
          </Link>
          
          {/* Services with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-1.5 font-[Geist] font-semibold text-[#003300] text-center opacity-50 hover:opacity-75 transition text-[15px] md:text-[17px]"
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
                <path d="M1 5 L6 1 L11 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-2 bg-[#F7FCFF] rounded-lg shadow-lg overflow-hidden z-20 border border-[#003300]/10 min-w-[200px]">
                {services.map((service, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-3 text-[#003300] text-sm font-medium hover:bg-[#BBCB2E]/10 transition border-b border-[#003300]/5 last:border-b-0"
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="font-[Geist] font-semibold text-[#003300] text-center opacity-50 hover:opacity-75 transition text-[15px] md:text-[17px]">
            Projects
          </button>

          <button className="font-[Geist] font-semibold text-[#003300] text-center opacity-50 hover:opacity-75 transition text-[15px] md:text-[17px]">
            About
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex flex-row items-center gap-2.5">
          <button
            className="flex justify-center items-center font-[Geist] font-semibold text-[#003300] text-center hover:bg-[#003300]/5 transition px-4 py-2.5 border-[1.5px] border-[#003300] rounded-[10px] text-[14px] md:text-[15px]"
          >
            About
          </button>
          
          <Link
            href="/contact"
            className="flex justify-center items-center font-[Geist] font-extrabold text-[#003300] text-center hover:bg-[#BBCB2E]/90 transition px-4 py-2.5 bg-[#BBCB2E] rounded-[10px] text-[14px] md:text-[15px]"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-[#003300] transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#003300] transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#003300] transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-[#F7FCFF] rounded-2xl shadow-lg p-4" style={{ boxShadow: '0px 3px 20px rgba(0, 51, 0, 0.2)' }}>
          <div className="flex flex-col gap-4">
            <Link 
              href="/" 
              className="font-[Geist] font-semibold text-[#003300] text-lg py-2 border-b border-[#003300]/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <div>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center justify-between w-full font-[Geist] font-semibold text-[#003300] text-lg py-2 border-b border-[#003300]/10"
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
                  <path d="M1 5 L6 1 L11 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {isServicesOpen && (
                <div className="pl-4 mt-2 flex flex-col gap-2">
                  {services.map((service, index) => (
                    <button
                      key={index}
                      className="text-left text-[#003300] text-sm font-medium py-2 opacity-70 hover:opacity-100"
                    >
                      {service}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="font-[Geist] font-semibold text-[#003300] text-lg py-2 border-b border-[#003300]/10 text-left">
              Projects
            </button>

            <button className="font-[Geist] font-semibold text-[#003300] text-lg py-2 border-b border-[#003300]/10 text-left">
              About
            </button>

            <div className="flex flex-col gap-3 mt-2">
              <button className="w-full py-3 border-[1.5px] border-[#003300] rounded-xl font-[Geist] font-semibold text-[#003300] text-center">
                About
              </button>
              <Link
                href="/contact"
                className="w-full py-3 bg-[#BBCB2E] rounded-xl font-[Geist] font-extrabold text-[#003300] text-center"
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
