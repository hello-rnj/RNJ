import Image from 'next/image';
import { EB_Garamond, Geist } from 'next/font/google';
import Footer from '@/components/Footer';

const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });
const geist = Geist({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap' });

/**
 * Bas de page complet de /expertises : la grande image de fond, le bloc CTA
 * « Conseil stratégique » puis le pied de page lui-même. Extrait ici pour que les
 * pages du blog affichent exactement le même bas de page, sans le recopier dans
 * chacune d'elles.
 */
export default function FooterWithCta() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/optimized/mask-group-6.webp"
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="100vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
      </div>

      {/* Frame 490 — CTA area */}
      <div className="relative z-[1] flex flex-col items-center gap-10 px-5 pb-16 pt-10 sm:gap-16 sm:px-6 sm:pb-20 sm:pt-14 md:gap-20 md:pb-24 md:pt-16 lg:gap-[118px] lg:pb-[200px] lg:pt-20">
        {/* Line 13 — separator */}
        <div className="h-0 w-full max-w-[1392px] border-t-2 border-black/20" />

        {/* Frame 489 — content row */}
        <div className="flex w-full max-w-[1345px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:gap-[162px]">
          {/* Group 480 — text block */}
          <div className="flex max-w-[1067px] flex-col gap-0">
            <span className={`${geist.className} text-[20px] font-medium leading-[34px] tracking-[-0.04em] text-[#003300] sm:text-[24px] md:text-[32px]`}>
              Conseil strat&eacute;gique
            </span>

            <h2 className={`${ebGaramond.className} mt-8 text-[32px] font-medium leading-[1.05] tracking-[-0.04em] text-[#003300] sm:mt-12 sm:text-[44px] md:mt-[80px] md:text-[60px] lg:mt-[120px] lg:text-[96px] lg:leading-[97px]`}>
              Quel est le r&ocirc;le du conseil juridique dans vos d&eacute;cisions strat&eacute;giques&nbsp;?
            </h2>

            <p className={`${geist.className} mt-6 max-w-[611px] text-[14px] font-medium leading-[1.4] text-[#003300]/70 sm:mt-8 sm:text-[16px] md:mt-[51px] md:text-[20px] md:leading-[23px]`}>
              Dans un environnement r&eacute;glementaire complexe, le conseil juridique devient un levier cl&eacute; pour s&eacute;curiser, structurer et orienter les d&eacute;cisions &agrave; fort impact.
            </p>
          </div>

          {/* Frame 487 — arrow button */}
          <button type="button" className="shrink-0 self-start sm:self-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/optimized/Frame 487.svg"
              alt="Voir plus"
              className="h-[60px] w-[60px] sm:h-[80px] sm:w-[80px] lg:h-[116px] lg:w-[116px]"
            />
          </button>
        </div>
      </div>

      <div className="relative z-[1]">
        <Footer showTopRow={false} />
      </div>
    </div>
  );
}
