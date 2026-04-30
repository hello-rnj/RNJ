'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TeamCardProps {
  name: string;
  role: string;
  tone: string;
  image?: string;
}

export default function TeamCard({ name, role, tone, image }: TeamCardProps) {
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

  const handleLinkedInClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Ajouter le lien LinkedIn ici
    console.log('LinkedIn clicked for', name);
  };

  return (
    <article
      className="flex flex-col gap-5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div
        className="relative h-[459px] w-[352px] overflow-hidden rounded-[10px] cursor-pointer"
        style={{ background: tone }}
      >
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 1280px) 50vw, 352px"
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
          className="absolute left-1/2 flex h-[30px] w-[185px] -translate-x-1/2 items-center justify-center rounded-full bg-white transition-all duration-500"
          style={{ top: isHovered ? '332px' : '503px', opacity: isHovered ? 1 : 0 }}
        >
          <span className="font-[Geist] text-[15px] font-medium leading-[20px] text-[#003300]/50">
            {role}
          </span>
        </div>

        {/* LinkedIn button */}
        <div
          className={`absolute left-[10px] top-[379px] flex h-[70px] w-[332px] cursor-pointer items-center justify-center rounded-[10px] bg-white transition-all duration-500 ${
            isHovered ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
          }`}
          onClick={handleLinkedInClick}
        >
          <div className="relative h-full w-full">
            <Image
              src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1777410434/rnj/mask-group-38-09146cc3.svg"
              alt="LinkedIn"
              width={27}
              height={27}
              className="absolute left-[91px] top-[22px] h-[27px] w-[27px]"
            />
            <span className="absolute left-[130px] top-[28px] font-[Geist] text-[15px] font-semibold leading-[16px] text-[#003300]">
              Check LinkedIn
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-[Geist] text-[15px] font-medium leading-5 text-black/50">{role}</p>
        <h3 className="font-[Geist] text-[32px] font-semibold leading-[42px] text-black">
          {name}
        </h3>
      </div>
    </article>
  );
}
