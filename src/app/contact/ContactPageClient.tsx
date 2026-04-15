'use client';

import { useState } from 'react';
import Image from 'next/image';
import { EB_Garamond, Geist, Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

// Keep backend logic for future use
export default function ContactPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const [view, setView] = useState<'initial' | 'subjects' | 'calendar'>('initial');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDay, setSelectedDay] = useState<number | null>(15);
  const [cardIndex, setCardIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const subjects = [
    { label: "Création d'entreprise" },
    { label: 'Conseil réglementaire' },
    { label: 'ESG & conformité' },
    { label: 'Investissement' },
    { label: 'Autre' },
  ];

  const calendarWeeks = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, null, null],
  ];
  const unavailableDays = [10, 11, 12, 13];
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  return (
    <>
      <main
        className={`relative min-h-screen w-full overflow-x-hidden bg-[#BBCB2E] ${
          showSuccessModal ? 'pointer-events-none select-none' : ''
        }`}
      >
        {/* Full-page background */}
        <Image src="/Frame 391.svg" alt="" fill className="object-cover" priority />

        <div className="relative z-10">
        <Navbar />

        {/* Green hero — Group 391 */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>

          <div className="relative z-10 flex flex-col items-center">
            {/* White card — slides left when rendezvous is selected */}
            <div
              className={`flex w-full max-w-[604px] flex-col items-center justify-center gap-[8.56px] rounded-[28px] bg-white px-6 py-10 shadow-[0px_3.42px_48px_rgba(0,0,0,0.25)] transition-all duration-700 ease-in-out sm:rounded-[42.78px] sm:px-10 sm:py-14 md:px-12 ${
                view === 'initial'
                  ? 'mx-auto mt-[20vh] mb-[20vh] translate-x-0 opacity-100'
                  : '-translate-x-[200%] absolute opacity-0 pointer-events-none'
              }`}
              style={{ minHeight: view === 'initial' ? 'clamp(480px, 56vw, 652.81px)' : undefined }}
            >
              <div className="flex flex-col items-center justify-center gap-[68.45px]">
                <div className="flex flex-col items-center justify-center gap-[27.38px]">
                  <Image
                    src="/minimal horizontal logo white 1.svg"
                    alt="RNJ Advisory"
                    width={199}
                    height={49}
                    className="h-auto w-[120px] brightness-0 sm:w-[150px] md:w-[199px]"
                  />
                  <h1 className={`${ebGaramond.className} max-w-[465px] text-center text-[clamp(36px,8vw,82.14px)] font-normal leading-[0.67] text-[#003300]`}>
                    Parlons de votre projet
                  </h1>
                  <p className={`${geist.className} max-w-[356px] text-center text-[11px] font-medium leading-[15px] text-[#003300]/40 sm:text-[12px] md:text-[13.69px]`}>
                    Have a question or a project in mind? Get in touch with our team and we&apos;ll respond as soon as possible.
                  </p>
                </div>
              </div>

              <div className="flex w-full max-w-[546px] flex-col items-center gap-[8.56px]">
                <button
                  type="button"
                  onClick={() => setView('subjects')}
                  className={`${poppins.className} flex h-[60px] w-full items-center justify-center rounded-[59.89px] bg-[#BBCB2E] text-[16px] font-medium text-[#003300] transition hover:brightness-95 sm:h-[72px] sm:text-[18px] md:h-[88.12px] md:text-[20.53px]`}
                >
                  Rendez-vous
                </button>
                <button
                  type="button"
                  className={`${poppins.className} flex h-[60px] w-full items-center justify-center rounded-[59.89px] bg-[#406640] text-[16px] font-medium text-[#BFCCBF] opacity-50 transition hover:opacity-70 sm:h-[72px] sm:text-[18px] md:h-[88.12px] md:text-[20.53px]`}
                >
                  Message
                </button>
              </div>
            </div>

            {/* Spacer for rendezvous view to push form below hero */}
            {view !== 'initial' && <div className="h-[60vh] sm:h-[70vh] md:h-[80vh]" />}
          </div>
        </section>

        {/* Cards selection — one card at a time, centered like "Parlons" card */}
        {view === 'subjects' && (() => {
          const cards = [
            { src: '/institution.svg', label: 'Institution' },
            { src: '/investisseur.svg', label: 'Investisseur' },
            { src: '/Entrepreneur.svg', label: 'Entrepreneur' },
            { src: '/Autre.svg', label: 'Autre' },
          ];
          return (
            <div className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-6">
              <div className="relative w-full max-w-[604px]">
                {/* SVG card — clickable */}
                <button
                  type="button"
                  onClick={() => { setSelectedSubject(cards[cardIndex].label); setView('calendar'); }}
                  className={`w-full overflow-hidden rounded-[28px] shadow-[0px_3.42px_48px_rgba(0,0,0,0.25)] transition-all duration-500 ease-in-out hover:shadow-[0px_6px_60px_rgba(0,0,0,0.3)] sm:rounded-[42.78px] ${isSliding ? '-translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100'}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cards[cardIndex].src}
                    alt={cards[cardIndex].label}
                    className="w-full"
                  />
                </button>

                {/* Double chevron — left center of card, scrolls to next */}
                <button
                  type="button"
                  onClick={() => {
                    setIsSliding(true);
                    setTimeout(() => {
                      setCardIndex((prev: number) => (prev + 1) % cards.length);
                      setIsSliding(false);
                    }, 500);
                  }}
                  className="absolute -left-[50px] top-1/2 flex -translate-y-1/2 items-center sm:-left-[60px]"
                >
                  <svg width="44" height="22" viewBox="0 0 44 22" fill="none" className="-mr-[28px]">
                    <path d="M44 0L22 11L44 22" stroke="#F7FCFF" strokeWidth="4" fill="none" />
                  </svg>
                  <svg width="44" height="22" viewBox="0 0 44 22" fill="none">
                    <path d="M44 0L22 11L44 22" stroke="#F7FCFF" strokeWidth="4" fill="none" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })()}

        {/* Calendar section — visible after choosing a card */}
        {view === 'calendar' && (
          <section className="relative z-20 -mt-[20vh] w-full px-4 pb-16 sm:px-6 md:pb-20">
            <div className="mx-auto w-full max-w-[1392px] rounded-[30px] bg-white px-5 py-10 shadow-[0px_4px_57.4px_rgba(0,0,0,0.25)] sm:rounded-[40px] sm:px-8 sm:py-12 md:rounded-[50px] md:px-[58px] md:py-16">
              <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[124px]">
                {/* Left — selected subject + submit */}
                <div className="flex flex-1 flex-col gap-10 md:gap-[87px]">
                  <div className="flex flex-col gap-6 md:gap-[32.75px]">
                    <Image
                      src="/minimal horizontal logo white 1.svg"
                      alt="RNJ Advisory"
                      width={180}
                      height={44}
                      className="h-auto w-[130px] brightness-0 sm:w-[150px] md:w-[180px]"
                    />
                    <h2 className={`${ebGaramond.className} text-[clamp(32px,5vw,64px)] font-medium leading-[1.17] text-[#003300]`}>
                      Quel est le sujet de votre demande&nbsp;?
                    </h2>
                    <div className="flex flex-wrap gap-[10px]">
                      {subjects.map((s) => (
                        <button
                          key={s.label}
                          type="button"
                          onClick={() => setSelectedSubject(s.label)}
                          className={`${poppins.className} flex h-[52px] items-center justify-center rounded-[19.46px] px-5 text-[13px] font-medium text-[#003300] transition sm:h-[60px] sm:px-6 sm:text-[14px] md:h-[71.56px] md:text-[15.56px] ${
                            selectedSubject === s.label
                              ? 'border-[1.5px] border-[#003300] bg-[#DDE597]'
                              : 'bg-[#DDE597]/50'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={async () => {
                      setIsSubmitting(true);
                      setSubmitState('idle');
                      setSubmitMessage('');
                      try {
                        const response = await fetch('/api/contact', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            subject: selectedSubject,
                            message: `Rendez-vous demandé le ${selectedDay} Avril 2026`,
                            name: '', phone: '', email: '', company: '',
                          }),
                        });
                        const data = (await response.json()) as { message?: string };
                        if (!response.ok) throw new Error(data.message || "Échec de l'envoi.");
                        setSubmitState('success');
                        setShowSuccessModal(true);
                      } catch (error) {
                        setSubmitState('error');
                        setSubmitMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    className={`${ebGaramond.className} flex h-[50px] w-[150px] items-center justify-center rounded-[290px] bg-[#BBCB2E]/30 text-[18px] font-bold text-[#003300] transition hover:bg-[#BBCB2E]/50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-[56px] sm:w-[170px] sm:text-[20px] md:h-[64px] md:w-[183px] md:text-[22.52px]`}
                  >
                    {isSubmitting ? 'Envoi...' : 'Soumettre'}
                  </button>

                  {submitState === 'error' && submitMessage && (
                    <p className={`${geist.className} text-[14px] font-medium text-[#9b1c1c]`}>{submitMessage}</p>
                  )}
                </div>

                {/* Right — calendar card (only after subject selected) */}
                {view === 'calendar' && <div className="flex w-full max-w-[522px] flex-col items-center rounded-[20px] border-2 border-[#003300] bg-white px-4 py-8 shadow-[4px_4px_0px_#003300] sm:rounded-[30.9px] sm:px-8 sm:py-[61px]">
                  <div className="flex w-full max-w-[455px] flex-col gap-8 sm:gap-[40.78px]">
                    {/* Calendar header */}
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <span className={`${poppins.className} text-[22px] leading-[31px] text-[#003300] sm:text-[29.66px]`}>calendrier</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[#003300]">&#9664;</span>
                          <span className={`${poppins.className} text-[12px] font-semibold text-[#003300]/40 sm:text-[14.83px]`}>Avril 2026</span>
                          <span className="text-[10px] text-[#003300]">&#9654;</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 rounded-[9.27px] bg-[#E0E5C0]/50 px-2.5 py-2.5">
                        <div className={`${poppins.className} flex h-[32px] w-[32px] items-center justify-center rounded-[9.27px] bg-[#C1CB82] text-[15px] text-[#003300] sm:h-[40px] sm:w-[40px] sm:text-[19.77px]`}>{selectedDay ?? 15}</div>
                        <span className={`${poppins.className} text-[15px] text-[#003300] sm:text-[19.77px]`}>:</span>
                        <div className={`${poppins.className} flex h-[32px] w-[32px] items-center justify-center rounded-[9.27px] bg-[#C1CB82] text-[15px] text-[#003300] sm:h-[40px] sm:w-[40px] sm:text-[19.77px]`}>00</div>
                        <div className="ml-1 flex flex-col gap-[2px]">
                          <div className={`${poppins.className} flex h-[16px] w-[26px] items-center justify-center rounded-[5.56px] bg-[#C1CB82]/50 text-[9px] text-[#003300] sm:h-[18.54px] sm:w-[31.51px] sm:text-[12.36px]`}>AM</div>
                          <div className={`${poppins.className} flex h-[16px] w-[26px] items-center justify-center rounded-[5.56px] bg-[#C1CB82] text-[9px] text-[#003300] sm:h-[18.54px] sm:w-[31.51px] sm:text-[12.36px]`}>PM</div>
                        </div>
                      </div>
                    </div>

                    {/* Calendar grid */}
                    <div className="w-full">
                      <div className="mb-2 grid grid-cols-7 gap-1">
                        {daysOfWeek.map((d, i) => (
                          <div key={i} className="flex h-[30px] items-center justify-center">
                            <span className={`${poppins.className} text-[10px] font-semibold text-[#003300]/50 sm:text-[12px]`}>{d}</span>
                          </div>
                        ))}
                      </div>
                      {calendarWeeks.map((week, wi) => (
                        <div key={wi} className="grid grid-cols-7 gap-1">
                          {week.map((day, di) => {
                            if (day === null) return <div key={di} className="h-[42px] sm:h-[58.58px]" />;
                            const isUnavailable = unavailableDays.includes(day);
                            const isSelected = day === selectedDay;
                            const isNextMonth = wi === 4 && (day === 1 || day === 2);
                            return (
                              <button
                                key={di}
                                type="button"
                                onClick={() => !isUnavailable && setSelectedDay(day)}
                                className={`${poppins.className} flex h-[42px] w-full items-center justify-center rounded-full text-[11px] transition sm:h-[58.58px] sm:text-[12.57px] ${
                                  isUnavailable
                                    ? 'border border-dashed border-[#B3C2B3] text-[#B3C2B3]'
                                    : isSelected
                                      ? 'bg-[#DDE597] font-semibold text-[#003300]'
                                      : isNextMonth
                                        ? 'bg-[#EEF2CA]/50 text-[#003300]'
                                        : 'bg-[#EEF2CA] text-[#003300]'
                                }`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </section>
        )}
        </div>
      </main>

      {/* Success modal — preserved for backend */}
      {showSuccessModal ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(0,0,0,0.22)] px-4 backdrop-blur-sm">
          <div className="w-full max-w-[360px] rounded-[44px] bg-white px-7 py-8 text-center shadow-[0px_20px_70px_rgba(0,0,0,0.22)] md:max-w-[520px] md:rounded-[70px] md:px-14 md:py-12">
            <div className="relative mx-auto mb-6 h-[88px] w-[120px] md:mb-8 md:h-[150px] md:w-[205px]">
              <Image
                src="/Layer 1 (24).svg"
                alt="Message envoyé"
                fill
                className="object-contain"
              />
            </div>

            <h2 className={`${ebGaramond.className} mx-auto max-w-[280px] text-[34px] leading-[0.96] text-[#003300] md:max-w-[420px] md:text-[64px] md:leading-[0.92]`}>
              Votre message a été envoyé
            </h2>

            <p className={`${geist.className} mx-auto mt-4 max-w-[250px] text-[11px] leading-[1.45] text-[#003300] md:mt-6 md:max-w-[360px] md:text-[15px] md:leading-[22px]`}>
              Merci pour votre message. Nous l&apos;avons bien reçu et nous vous répondrons très
              prochainement.
            </p>

            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className={`${geist.className} mt-7 inline-flex h-[54px] items-center justify-center rounded-full bg-[#BBCB2E] px-8 text-[18px] font-semibold text-white transition hover:bg-[#a8b829] md:mt-10 md:h-[72px] md:px-12 md:text-[24px]`}
            >
              Compris
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
