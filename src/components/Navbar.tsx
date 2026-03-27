'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const services = [
    'Analyse institutionnelle',
    'Conseil stratégique',
    'Études réglementaires',
    'Accompagnement des projets',
  ];

  return (
    <nav className="absolute top-12 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl">
      <div className="bg-[#F7FCFF] rounded-3xl shadow-lg px-6 py-3 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-12">
          <Image
            src="/Group (2).svg"
            alt="Logo"
            width={39}
            height={41}
            priority
          />
        </div>

        {/* Navigation Links - Frame 11 */}
        <div className="flex items-center gap-[144px] w-[258px] h-5">
          {/* Home */}
          <Link 
            href="/" 
            className="w-12 h-5 text-[#003300] font-semibold text-[17.13px] text-center leading-[19px] hover:opacity-75 transition z-0"
          >
            Home
          </Link>
          
          {/* Insights */}
          <button 
            className="w-[66px] h-5 text-[#003300] font-semibold text-[17.13px] text-center leading-[19px] opacity-50 hover:opacity-75 transition z-10"
          >
            Insights
          </button>

          {/* Group 420 - Services with Dropdown */}
          <div className="relative w-[94.61px] h-[20.35px]">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center gap-[6.95px] w-full h-full text-[#003300] font-semibold text-[17.43px] leading-[19px] opacity-50 hover:opacity-75 transition"
            >
              <span className="w-[73px]">Services</span>
              <svg 
                width="11.81" 
                height="5.56" 
                viewBox="0 0 12 6" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.7781"
                className={`transition-transform ${isServicesOpen ? 'rotate-0' : 'rotate-180'}`}
              >
                <path d="M1 5 L6 1 L11 5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Group 421 - Dropdown Menu */}
            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-2 bg-[#F7FCFF] rounded-lg shadow-lg overflow-hidden z-20 border border-[#003300]/10">
                {services.map((service, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-3 py-2 text-[#003300] text-xs font-medium hover:bg-[#BBCB2E]/10 transition border-b border-[#003300]/9 last:border-b-0"
                  >
                    {service}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex items-center gap-2.5">
          <button className="px-4 py-2.5 border-2 border-[#003300] rounded-xl text-[#003300] font-semibold text-sm hover:bg-[#003300]/5 transition">
            About
          </button>
          
          <button className="px-4 py-2.5 bg-[#BBCB2E] rounded-xl text-[#003300] font-bold text-sm hover:bg-[#BBCB2E]/90 transition">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
