'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TeamCardProps {
  name: string;
  role: string;
  tone: string;
  image?: string;
  linkedinUrl?: string;
  className?: string;
}

export default function TeamCard({ name, role, tone, image, linkedinUrl, className }: TeamCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCardClick = () => {
    setIsHovered((prev) => !prev);
  };

  const handleLinkedInClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (linkedinUrl) {
      window.open(linkedinUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsHovered((prev) => !prev);
    }
  };

  return (
    <article
      className={`flex flex-col gap-4 sm:gap-5 ${className ?? ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Voir le profil de ${name}`}
      aria-pressed={isHovered}
    >
      <div
        className="relative aspect-[352/459] w-full overflow-hidden rounded-[10px] cursor-pointer"
        style={{ background: tone }}
      >
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 320px, 352px"
            className="object-cover transition-transform duration-500"
            style={{ transform: isHovered ? 'scale(1.02)' : 'scale(1)' }}
          />
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: isHovered
              ? 'linear-gradient(180deg, rgba(187, 203, 46, 0.08) 0%, rgba(187, 203, 46, 0.88) 78.62%)'
              : 'linear-gradient(180deg, rgba(187, 203, 46, 0) 70%, rgba(187, 203, 46, 0.36) 100%)',
          }}
        />

        {/* Role badge */}
        <div
          className="absolute inset-x-[10px] top-[58%] flex min-h-[30px] items-center justify-center rounded-full bg-white px-3 py-1 text-center transition-all duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <span className="font-[Geist] text-[15px] font-medium leading-[20px] text-[#003300]/50">
            {role}
          </span>
        </div>

        {/* LinkedIn button */}
        <button
          type="button"
          className={`absolute bottom-[10px] left-1/2 flex h-[64px] w-[calc(100%-20px)] max-w-[332px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-[10px] bg-white transition-all duration-500 ${
            isHovered ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
          onClick={handleLinkedInClick}
          aria-label={`Ouvrir le profil LinkedIn de ${name}`}
        >
          <div className="relative flex h-full w-full items-center justify-center gap-3">
            <Image src="https://res.cloudinary.com/dvyyce3ki/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1779679499/rnj/mask-group-38-09146cc3.png"
              alt="LinkedIn"
              width={27}
              height={27}
              className="h-[27px] w-[27px]"
             priority/>
            <span className="font-[Geist] text-[15px] font-semibold leading-[16px] text-[#003300]">
              Check LinkedIn
            </span>
          </div>
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-[Geist] text-[15px] font-medium leading-5 text-black/50">{role}</p>
        <h3 className="font-[Geist] text-[28px] font-semibold leading-[1.2] text-black sm:text-[32px] sm:leading-[42px]">
          {name}
        </h3>
      </div>
    </article>
  );
}
