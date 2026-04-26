'use client';

import { useState } from 'react';
import Image from 'next/image';
import { EB_Garamond } from 'next/font/google';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

interface TeamCardProps {
  name: string;
  role: string;
  initials: string;
  tone: string;
  image?: string;
}

export default function TeamCard({ name, role, initials, tone, image }: TeamCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article
      className="team-card group flex flex-col gap-5 cursor-pointer"
      data-expanded={isExpanded ? 'true' : 'false'}
      onClick={handleClick}
    >
      <div
        className="team-card-image relative flex min-h-[459px] overflow-hidden rounded-[8px] p-6 transition-all duration-500"
        style={{ background: tone }}
      >
        {image && (
          <div className="absolute inset-0 opacity-100 z-0">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 1280px) 50vw, 352px"
              className="object-cover"
            />
          </div>
        )}
        <div className="absolute inset-0 opacity-20 z-1">
          <Image
            src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777132783/rnj/jpg-1-1-b32bbd33.svg"
            alt=""
            fill
            sizes="(max-width: 1280px) 50vw, 352px"
            className="object-cover"
          />
        </div>

        <div className="team-card-overlay absolute inset-x-0 bottom-0 h-1/3 bg-[#BBCB2E]/70 transition-all duration-500" />

        <div className="team-card-content relative z-10 mt-auto flex w-full flex-col items-center gap-8 pb-8 text-center">
          <div
            className={`${ebGaramond.className} team-card-initials flex h-36 w-36 items-center justify-center rounded-full bg-white/80 text-[54px] font-semibold text-[#406640] shadow-[0px_18px_45px_rgba(0,51,0,0.16)] transition-all duration-500`}
          >
            {initials}
          </div>

          <div className="team-card-badge rounded-full bg-white px-4 py-2 transition-all duration-500">
            <span className="font-[Geist] text-[15px] font-medium leading-5 text-[#003300]/50">
              {role}
            </span>
          </div>
        </div>
      </div>

      <div className="team-card-info flex flex-col gap-1 transition-all duration-500">
        <p className="font-[Geist] text-[15px] font-medium leading-5 text-black/50">{role}</p>
        <h3 className="font-[Geist] text-[32px] font-semibold leading-[42px] text-black">
          {name}
        </h3>
      </div>
    </article>
  );
}
