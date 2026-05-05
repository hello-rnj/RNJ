'use client';

import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { EB_Garamond, Geist, Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { BOOKING_FEE_LABEL } from '@/lib/booking';

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

type BookingStep = 1 | 2 | 3;
type View = 'initial' | 'booking' | 'message';
type SubmissionMode = 'contact' | 'booking';
type PaymentState = 'success' | 'cancelled';
type CalendarMonth = {
  year: number;
  month: number;
};

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};

type BookingPayload = ContactPayload & {
  preferred_date: string;
  preferred_time?: string;
};
type CalendarDateParts = CalendarMonth & {
  day: number;
};
type CalendarCell = {
  iso: string;
  day: number;
  isUnavailable: boolean;
};

const initialMessageForm: ContactPayload = {
  name: '',
  phone: '',
  email: '',
  company: '',
  subject: '',
  message: '',
};

const fieldClassName =
  'w-full rounded-[18px] border border-transparent bg-[#F0F3F0] px-5 py-4 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 sm:px-6 sm:py-5 sm:text-[16px]';
const pendingBookingStorageKey = 'rnj-pending-booking';
const defaultBookingSubject = "Creation d'entreprise";
const defaultCalendarMonth: CalendarMonth = { year: 2026, month: 3 };
const defaultBookingDate = '2026-04-15';
const defaultBookingTime = '14:00';
const monthLabels = [
  'Janvier',
  'Fevrier',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Decembre',
] as const;
const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const timeOptions = [
  '09:00',
  '09:15',
  '09:30',
  '09:45',
  '10:00',
  '10:15',
  '10:30',
  '10:45',
  '11:00',
  '11:15',
  '11:30',
  '11:45',
  '13:00',
  '13:15',
  '13:30',
  '13:45',
  '14:00',
  '14:15',
  '14:30',
  '14:45',
  '15:00',
  '15:15',
  '15:30',
  '15:45',
  '16:00',
  '16:15',
  '16:30',
  '16:45',
  '17:00',
  '17:15',
  '17:30',
  '17:45',
] as const;
const explicitlyUnavailableDates = new Set(['2026-04-10', '2026-04-11', '2026-04-12', '2026-04-13']);

function padNumber(value: number) {
  return String(value).padStart(2, '0');
}

function toIsoDate(parts: CalendarDateParts) {
  return `${parts.year}-${padNumber(parts.month + 1)}-${padNumber(parts.day)}`;
}

function parseIsoDate(value: string | null): CalendarDateParts | null {
  if (!value) {
    return null;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  return {
    year: Number(match[1]),
    month: Number(match[2]) - 1,
    day: Number(match[3]),
  };
}

function shiftCalendarMonth(month: CalendarMonth, offset: number): CalendarMonth {
  const next = new Date(Date.UTC(month.year, month.month + offset, 1));

  return {
    year: next.getUTCFullYear(),
    month: next.getUTCMonth(),
  };
}

function isUnavailableDate(parts: CalendarDateParts) {
  const isoDate = toIsoDate(parts);
  const weekday = new Date(Date.UTC(parts.year, parts.month, parts.day)).getUTCDay();

  return explicitlyUnavailableDates.has(isoDate) || weekday === 0 || weekday === 6;
}

function findFirstAvailableDate(month: CalendarMonth) {
  const daysInMonth = new Date(Date.UTC(month.year, month.month + 1, 0)).getUTCDate();

  for (let day = 1; day <= daysInMonth; day += 1) {
    const candidate = { ...month, day };

    if (!isUnavailableDate(candidate)) {
      return toIsoDate(candidate);
    }
  }

  return null;
}

function getCalendarWeeks(month: CalendarMonth): Array<Array<CalendarCell | null>> {
  const firstWeekday = new Date(Date.UTC(month.year, month.month, 1)).getUTCDay();
  const firstColumn = (firstWeekday + 6) % 7;
  const daysInMonth = new Date(Date.UTC(month.year, month.month + 1, 0)).getUTCDate();
  const cells: Array<CalendarCell | null> = Array.from({ length: firstColumn }, () => null);

  for (let day = 1; day <= daysInMonth; day += 1) {
    const parts = { ...month, day };

    cells.push({
      iso: toIsoDate(parts),
      day,
      isUnavailable: isUnavailableDate(parts),
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: Array<Array<CalendarCell | null>> = [];

  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  return weeks;
}

function formatLongDateLabel(value: string | null) {
  const parts = parseIsoDate(value);

  if (!parts) {
    return 'Date a confirmer';
  }

  return `${parts.day} ${monthLabels[parts.month].toLowerCase()} ${parts.year}`;
}

function formatMonthLabel(month: CalendarMonth) {
  return `${monthLabels[month.month]} ${month.year}`;
}

function formatBookingMessage(date: string | null, time: string) {
  return `Je souhaite planifier un rendez-vous le ${formatLongDateLabel(date)} a ${time}.`;
}

type ContactPageClientProps = {
  initialMode?: 'message' | 'booking' | null;
  initialSubject?: string;
  initialPaymentState?: PaymentState | null;
};

export default function ContactPageClient({
  initialMode = null,
  initialSubject = '',
  initialPaymentState = null,
}: ContactPageClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submissionMode, setSubmissionMode] = useState<SubmissionMode>('contact');

  const [view, setView] = useState<View>('initial');
  const [bookingStep, setBookingStep] = useState<BookingStep>(1);
  const [selectedSubject, setSelectedSubject] = useState(defaultBookingSubject);
  const [selectedProfile, setSelectedProfile] = useState('other'); // Pour Institution vs autres
  const [displayedMonth, setDisplayedMonth] = useState<CalendarMonth>(defaultCalendarMonth);
  const [selectedBookingDate, setSelectedBookingDate] = useState<string | null>(defaultBookingDate);
  const [selectedBookingTime, setSelectedBookingTime] = useState(defaultBookingTime);
  const [cardIndex, setCardIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [messageForm, setMessageForm] = useState<ContactPayload>(initialMessageForm);

  const subjects = [
    { label: "Creation d'entreprise" },
    { label: 'Conseil reglementaire' },
    { label: 'ESG & conformite' },
    { label: 'Investissement' },
    { label: 'Autre' },
  ];
  const requestedMode = initialMode;
  const requestedSubject = initialSubject.trim();
  const calendarWeeks = getCalendarWeeks(displayedMonth);
  const selectedTimeIndex = Math.max(0, timeOptions.indexOf(selectedBookingTime as (typeof timeOptions)[number]));
  const [selectedHourPart, selectedMinutePart] = selectedBookingTime.split(':');
  const isMorningTime = Number(selectedHourPart) < 12;
  const paymentNotice =
    initialPaymentState === 'success'
      ? {
          title: 'Paiement confirme',
          copy: `Vos frais de dossier de ${BOOKING_FEE_LABEL} ont ete recus. Le rendez-vous reste visible dans le dashboard admin pour validation finale.`,
        }
      : initialPaymentState === 'cancelled'
        ? {
            title: 'Paiement annule',
            copy: `Le paiement des frais de dossier de ${BOOKING_FEE_LABEL} a ete annule. Vous pouvez reprendre votre reservation et relancer Stripe ci-dessous.`,
          }
        : null;

  useEffect(() => {
    if (requestedMode === 'message') {
      setSubmitState('idle');
      setSubmitMessage('');
      setSubmissionMode('contact');
      setSelectedBookingDate(null);
      setView('message');
      setMessageForm((current) => ({
        ...current,
        subject: requestedSubject || current.subject,
      }));
      return;
    }

    if (requestedMode === 'booking') {
      setSubmitState('idle');
      setSubmitMessage('');
      setSubmissionMode('booking');
      setDisplayedMonth(defaultCalendarMonth);
      setSelectedBookingDate(defaultBookingDate);
      setSelectedBookingTime(defaultBookingTime);
      setSelectedSubject(requestedSubject || defaultBookingSubject);
      setView('booking');
      setBookingStep(1);
    }
  }, [requestedMode, requestedSubject]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (initialPaymentState === 'success') {
      window.sessionStorage.removeItem(pendingBookingStorageKey);
      return;
    }

    if (initialPaymentState !== 'cancelled') {
      return;
    }

    const savedBooking = window.sessionStorage.getItem(pendingBookingStorageKey);

    if (!savedBooking) {
      return;
    }

    try {
      const parsedBooking = JSON.parse(savedBooking) as BookingPayload;
      const parsedDate = parseIsoDate(parsedBooking.preferred_date);
      setSubmissionMode('booking');
      setSelectedSubject(parsedBooking.subject);
      setSelectedBookingDate(parsedBooking.preferred_date);
      setSelectedBookingTime(parsedBooking.preferred_time || defaultBookingTime);
      if (parsedDate) {
        setDisplayedMonth({
          year: parsedDate.year,
          month: parsedDate.month,
        });
      }
      setMessageForm({
        name: parsedBooking.name,
        phone: parsedBooking.phone,
        email: parsedBooking.email,
        company: parsedBooking.company,
        subject: parsedBooking.subject,
        message: parsedBooking.message,
      });
      setView('message');
    } catch {
      window.sessionStorage.removeItem(pendingBookingStorageKey);
    }
  }, [initialPaymentState]);

  async function sendContact(payload: ContactPayload) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { message?: string };
    if (!response.ok) {
      throw new Error(data.message || "Echec de l'envoi.");
    }
  }

  async function startBookingCheckout(payload: BookingPayload) {
    const response = await fetch('/api/bookings/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        profile: selectedProfile || 'other',
      }),
    });

    const data = (await response.json()) as { message?: string; url?: string };
    if (!response.ok) {
      throw new Error(data.message || "Echec de l'envoi.");
    }

    if (!data.url) {
      throw new Error("Stripe n'a pas retourne d'URL de paiement.");
    }

    return data.url;
  }

  function openMessageView(
    overrides?: Partial<ContactPayload>,
    options?: {
      mode?: SubmissionMode;
      preferredDate?: string | null;
      preferredTime?: string;
    }
  ) {
    setSubmitState('idle');
    setSubmitMessage('');
    setSubmissionMode(options?.mode ?? 'contact');
    setSelectedBookingDate(options?.preferredDate ?? null);
    if (options?.preferredTime) {
      setSelectedBookingTime(options.preferredTime);
    }
    setView('message');
    if (overrides) {
      setMessageForm((current) => ({
        ...current,
        ...overrides,
      }));
    }
  }

  function openBookingView() {
    setSubmitState('idle');
    setSubmitMessage('');
    setSubmissionMode('booking');
    setBookingStep(1);
    if (!selectedSubject) {
      setSelectedSubject(defaultBookingSubject);
    }
    if (!selectedBookingDate) {
      setDisplayedMonth(defaultCalendarMonth);
      setSelectedBookingDate(defaultBookingDate);
      setSelectedBookingTime(defaultBookingTime);
    }
    setView('booking');
  }

  function goToBookingStep(step: BookingStep) {
    setBookingStep(step);
  }

  function nextBookingStep() {
    if (bookingStep < 3) {
      setBookingStep((prev) => (prev + 1) as BookingStep);
    }
  }

  function prevBookingStep() {
    if (bookingStep > 1) {
      setBookingStep((prev) => (prev - 1) as BookingStep);
    }
  }

  function changeDisplayedMonth(offset: number) {
    const nextMonth = shiftCalendarMonth(displayedMonth, offset);
    const nextAvailableDate = findFirstAvailableDate(nextMonth);

    setDisplayedMonth(nextMonth);

    if (nextAvailableDate) {
      setSelectedBookingDate(nextAvailableDate);
    }
  }

  function moveSelectedTime(direction: -1 | 1) {
    const currentIndex = Math.max(0, timeOptions.indexOf(selectedBookingTime as (typeof timeOptions)[number]));
    const nextIndex = Math.min(timeOptions.length - 1, Math.max(0, currentIndex + direction));

    setSelectedBookingTime(timeOptions[nextIndex]);
  }

  async function handleMessageSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState('idle');
    setSubmitMessage('');

    try {
      if (submissionMode === 'booking') {
        if (!selectedBookingDate) {
          throw new Error('Merci de selectionner une date pour le rendez-vous.');
        }

        const normalizedSubject = (messageForm.subject || selectedSubject || 'Rendez-vous').trim();
        const normalizedMessage = (messageForm.message || formatBookingMessage(selectedBookingDate, selectedBookingTime)).trim();

        const bookingPayload = {
          ...messageForm,
          subject: normalizedSubject,
          message: normalizedMessage,
          preferred_date: selectedBookingDate,
          preferred_time: selectedBookingTime,
        };

        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(pendingBookingStorageKey, JSON.stringify(bookingPayload));
        }

        const checkoutUrl = await startBookingCheckout(bookingPayload);
        window.location.assign(checkoutUrl);
        return;
      } else {
        await sendContact(messageForm);
      }

      setSubmitState('success');
      setShowSuccessModal(true);
      setMessageForm(initialMessageForm);
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isBookingMessageStep = view === 'message' && submissionMode === 'booking';
  const bookingDateTimeLabel = `${formatLongDateLabel(selectedBookingDate)} a ${selectedBookingTime}`;

  return (
    <>
      <main
        className={`relative min-h-screen w-full overflow-x-hidden bg-[#BBCB2E] ${
          showSuccessModal ? 'pointer-events-none select-none' : ''
        }`}
      >
        <div className="absolute inset-0 bg-[#BBCB2E]" />

        <div className="relative z-10">
          <Navbar />

          {paymentNotice ? (
            <section className="relative z-20 px-4 pt-6 sm:px-6">
              <div className="mx-auto max-w-[1040px] rounded-[28px] border border-[#003300]/10 bg-white/90 px-5 py-5 shadow-[0px_12px_40px_rgba(0,0,0,0.08)] backdrop-blur sm:px-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className={`${geist.className} text-[12px] font-semibold uppercase tracking-[0.18em] text-[#406640]`}>
                      Stripe
                    </p>
                    <h2 className={`${ebGaramond.className} text-[34px] leading-[0.95] text-[#003300]`}>
                      {paymentNotice.title}
                    </h2>
                  </div>
                  <p className={`${geist.className} max-w-[620px] text-[14px] font-medium leading-[1.5] text-[#003300]/70`}>
                    {paymentNotice.copy}
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          <section className="relative w-full overflow-hidden" style={{ minHeight: '10vh' }}>
            <div className="relative z-10 flex flex-col items-center">
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
                      src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                      alt="RNJ Advisory"
                      width={199}
                      height={49}
                      className="h-auto w-[120px] brightness-0 sm:w-[150px] md:w-[199px]"
                    />
                    <h1
                      className={`${ebGaramond.className} max-w-[465px] text-center text-[clamp(36px,8vw,82.14px)] font-normal leading-[0.67] text-[#003300]`}
                    >
                      Parlons de votre projet
                    </h1>
                    <p
                      className={`${geist.className} max-w-[356px] text-center text-[11px] font-medium leading-[15px] text-[#003300]/40 sm:text-[12px] md:text-[13.69px]`}
                    >
                      Vous avez une question ou un projet en tête ? Contactez notre équipe et
                      nous vous répondrons dès que possible.
                    </p>
                  </div>
                </div>

                <div className="flex w-full max-w-[546px] flex-col items-center gap-[8.56px]">
                  <button
                    type="button"
                    onClick={() => openBookingView()}
                    className={`${poppins.className} flex h-[60px] w-full items-center justify-center rounded-[59.89px] bg-[#BBCB2E] text-[16px] font-medium text-[#003300] transition hover:brightness-95 sm:h-[72px] sm:text-[18px] md:h-[88.12px] md:text-[20.53px]`}
                  >
                    Rendez-vous
                  </button>
                  <button
                    type="button"
                    onClick={() => openMessageView(undefined, { mode: 'contact', preferredDate: null })}
                    className={`${poppins.className} flex h-[60px] w-full items-center justify-center rounded-[59.89px] bg-[#406640] text-[16px] font-medium text-[#BFCCBF] transition hover:opacity-90 sm:h-[72px] sm:text-[18px] md:h-[88.12px] md:text-[20.53px]`}
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </section>


          {view === 'booking' ? (
            <section className="relative z-20 flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 md:py-12">
              <div className="mx-auto w-full max-w-[1392px] h-[883px] rounded-[50px] bg-white px-[58px] py-16 shadow-[0px_4px_57.4px_rgba(0,0,0,0.25)]">
                {/* Step 1: Subject selection and calendar */}
                <div
                  className={`transition-all duration-500 ${
                    bookingStep === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 absolute pointer-events-none'
                  }`}
                >
                  <div className="absolute left-[79.11px] top-[144.9px] flex flex-row items-center gap-[124px] w-[1233.78px] h-[593.2px]">
                    {/* Left column: Subject selection */}
                    <div className="flex flex-col items-start gap-[87.13px] w-[587.64px] h-[565.34px]">
                      <div className="flex flex-col gap-[32.75px] w-[587.64px] h-[414.16px]">
                        <h2 className={`${ebGaramond.className} w-[587.64px] h-[151px] text-[64px] font-medium leading-[75px] text-[#003300]`}>
                          Quel est le sujet de votre demande&nbsp;?
                        </h2>
                        <div className="flex flex-row flex-wrap items-center align-content-flex-start gap-[10.12px] w-[457px] h-[153.24px]">
                          <button
                            type="button"
                            onClick={() => setSelectedSubject('Creation d\'entreprise')}
                            className={`${poppins.className} flex h-[71.56px] w-[211.8px] items-center justify-center rounded-[19.46px] px-[25px] text-[15.56px] font-medium text-[#003300] transition ${
                              selectedSubject === 'Creation d\'entreprise'
                                ? 'border-[1.5px] border-[#003300] bg-[#DDE597]'
                                : 'bg-[#DDE597]/50'
                            }`}
                          >
                            Creation d&apos;entreprise
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedSubject('Conseil reglementaire')}
                            className={`${poppins.className} flex h-[71.56px] w-[211.8px] items-center justify-center rounded-[19.46px] px-[25px] text-[15.56px] font-medium text-[#003300] transition ${
                              selectedSubject === 'Conseil reglementaire'
                                ? 'border-[1.5px] border-[#003300] bg-[#DDE597]'
                                : 'bg-[#DDE597]/50'
                            }`}
                          >
                            Conseil reglementaire
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedSubject('ESG & conformite')}
                            className={`${poppins.className} flex h-[71.56px] w-[173.29px] items-center justify-center rounded-[19.46px] px-[25px] text-[15.56px] font-medium text-[#003300] transition ${
                              selectedSubject === 'ESG & conformite'
                                ? 'border-[1.5px] border-[#003300] bg-[#DDE597]'
                                : 'bg-[#DDE597]/50'
                            }`}
                          >
                            ESG & conformite
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedSubject('Investissement')}
                            className={`${poppins.className} flex h-[71.56px] w-[173.29px] items-center justify-center rounded-[19.46px] px-[25px] text-[15.56px] font-medium text-[#003300] transition ${
                              selectedSubject === 'Investissement'
                                ? 'border-[1.5px] border-[#003300] bg-[#DDE597]'
                                : 'bg-[#DDE597]/50'
                            }`}
                          >
                            Investissement
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedSubject('Autre')}
                            className={`${poppins.className} flex h-[71.56px] w-[90.11px] items-center justify-center rounded-[19.46px] px-[25px] text-[15.56px] font-medium text-[#003300] transition ${
                              selectedSubject === 'Autre'
                                ? 'border-[1.5px] border-[#003300] bg-[#DDE597]'
                                : 'bg-[#DDE597]/50'
                            }`}
                          >
                            Autre
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-row items-center gap-[7.04px] w-[183px] h-[64.05px] bg-[#BBCB2E] opacity-30 rounded-[290px]">
                        <button
                          type="button"
                          onClick={() => goToBookingStep(2)}
                          disabled={!selectedSubject.trim()}
                          className={`${ebGaramond.className} flex h-[64px] w-[183px] items-center justify-center rounded-[290px] bg-[#BBCB2E] text-[22.52px] font-bold text-[#003300] transition hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          Soumettre
                        </button>
                      </div>
                    </div>

                    {/* Right column: Calendrier card */}
                    <div className="flex flex-col items-center px-[33.3676px] py-[61px] gap-[12px] w-[522.14px] h-[593.2px] rounded-[30.8959px] border-2 border-[#003300] bg-white shadow-[4px_4px_0px_#003300]">
                      <div className="flex flex-col gap-[40.78px] w-[454.79px] h-[445.13px]">
                        <div className="flex flex-row justify-between items-start gap-[197.12px] w-[454.79px] h-[62px]">
                          <div className="flex flex-col w-[150.77px] h-[62px]">
                            <span className={`${poppins.className} w-[150.77px] h-[31px] text-[29.66px] font-normal leading-[31px] text-[#003300]`}>
                              calendrier
                            </span>
                            <div className="flex items-center gap-[7.42px] w-[87.39px] h-[31px]">
                              <button
                                type="button"
                                onClick={() => changeDisplayedMonth(-1)}
                                className="flex h-[10px] w-[6px] items-center justify-center text-[10px] text-[#003300] transition hover:opacity-60"
                                aria-label="Mois precedent"
                              >
                                &#9664;
                              </button>
                              <span className={`${poppins.className} w-[74px] h-[31px] text-[14.83px] font-semibold leading-[31px] text-[#003300] opacity-0.4`}>
                                {formatMonthLabel(displayedMonth)}
                              </span>
                              <button
                                type="button"
                                onClick={() => changeDisplayedMonth(1)}
                                className="flex h-[10px] w-[6px] items-center justify-center text-[10px] text-[#003300] transition hover:opacity-60"
                                aria-label="Mois suivant"
                              >
                                &#9654;
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-row justify-center items-center px-[11.7404px] py-[12.3584px] gap-[6.18px] w-[159.42px] h-[46.96px] rounded-[9.26877px] bg-[#E0E5C0] opacity-0.5">
                            <div className="flex flex-row items-center gap-[4.33px] w-[152.68px] h-[40.78px]">
                              <div className="flex flex-row justify-center items-center px-[11.7404px] py-[12.3584px] gap-[6.18px] w-[40.16px] h-[39.55px] rounded-[9.26877px] bg-[#C1CB82]">
                                <span className={`${poppins.className} w-[19px] h-[16px] text-[19.7734px] leading-[15px] text-[#003300]`}>
                                  {selectedHourPart}
                                </span>
                              </div>
                              <span className={`${poppins.className} w-[5px] h-[16px] text-[19.7734px] leading-[15px] text-[#003300]`}>
                                :
                              </span>
                              <div className="flex flex-row justify-center items-center px-[11.7404px] py-[12.3584px] gap-[6.18px] w-[40.16px] h-[39.55px] rounded-[9.26877px] bg-[#C1CB82]">
                                <span className={`${poppins.className} w-[25px] h-[16px] text-[19.7734px] leading-[15px] text-[#003300]`}>
                                  {selectedMinutePart}
                                </span>
                              </div>
                              <div className="flex flex-col gap-[2.47px] w-[31.51px] h-[40.78px]">
                                <div className="flex flex-row justify-center items-center px-[11.7404px] py-[12.3584px] gap-[6.18px] w-[31.51px] h-[18.54px] rounded-[5.56126px] bg-[#C1CB82]">
                                  <span className={`${poppins.className} w-[18px] h-[16px] text-[12.3584px] leading-[15px] text-[#003300]`}>
                                    PM
                                  </span>
                                </div>
                                <div className="flex flex-row justify-center items-center px-[11.7404px] py-[12.3584px] gap-[6.18px] w-[31.51px] h-[18.54px] rounded-[5.56126px] bg-[#C1CB82] opacity-0.5">
                                  <span className={`${poppins.className} w-[19px] h-[16px] text-[12.3584px] leading-[15px] text-[#003300]`}>
                                    AM
                                  </span>
                                </div>
                              </div>
                              <label className="relative cursor-pointer">
                                <span className="sr-only">Choisir l heure du rendez-vous</span>
                                <select
                                  value={selectedBookingTime}
                                  onChange={(event) => setSelectedBookingTime(event.target.value)}
                                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                  aria-label="Choisir l heure du rendez-vous"
                                >
                                  {timeOptions.map((time) => (
                                    <option key={time} value={time}>
                                      {time}
                                    </option>
                                  ))}
                                </select>
                              </label>
                            </div>

                            <div className="ml-1 flex flex-col gap-[2px]">
                              <button
                                type="button"
                                onClick={() => moveSelectedTime(-1)}
                                disabled={selectedTimeIndex === 0}
                                className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#C1CB82] text-[#003300] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-45"
                                aria-label="Heure precedente"
                              >
                                <svg width="8" height="4" viewBox="0 0 8 4" fill="none" stroke="currentColor" strokeWidth="1.4">
                                  <path d="M1 3 L4 1 L7 3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => moveSelectedTime(1)}
                                disabled={selectedTimeIndex === timeOptions.length - 1}
                                className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#C1CB82] text-[#003300] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-45"
                                aria-label="Heure suivante"
                              >
                                <svg width="8" height="4" viewBox="0 0 8 4" fill="none" stroke="currentColor" strokeWidth="1.4">
                                  <path d="M1 1 L4 3 L7 1" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full">
                        <div className="mb-2 grid grid-cols-7 gap-1">
                          {daysOfWeek.map((d, i) => (
                            <div key={i} className="flex h-[30px] items-center justify-center">
                              <span className={`${poppins.className} text-[10px] font-semibold text-[#003300]/50 sm:text-[12px]`}>
                                {d}
                              </span>
                            </div>
                          ))}
                        </div>
                        {calendarWeeks.map((week, wi) => (
                          <div key={wi} className="grid grid-cols-7 gap-1">
                            {week.map((day, di) => {
                              if (day === null) {
                                return <div key={di} className="h-[42px] sm:h-[58.58px]" />;
                              }

                              const isSelected = day.iso === selectedBookingDate;

                              return (
                                <button
                                  key={di}
                                  type="button"
                                  onClick={() => !day.isUnavailable && setSelectedBookingDate(day.iso)}
                                  className={`${poppins.className} flex h-[42px] w-full items-center justify-center rounded-full text-[11px] transition sm:h-[58.58px] sm:text-[12.57px] ${
                                    day.isUnavailable
                                      ? 'border border-dashed border-[#B3C2B3] text-[#B3C2B3]'
                                      : isSelected
                                        ? 'bg-[#DDE597] font-semibold text-[#003300]'
                                        : 'bg-[#EEF2CA] text-[#003300] hover:bg-[#E4ECA8]'
                                  }`}
                                  aria-label={`Choisir le ${day.day} ${monthLabels[displayedMonth.month].toLowerCase()} ${displayedMonth.year}`}
                                >
                                  {day.day}
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Contact details and payment - Variant8 */}
                <div
                  className={`transition-all duration-500 ${
                    bookingStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 absolute pointer-events-none'
                  }`}
                >
                  <div className="relative mx-auto h-[883px] w-full max-w-[1392px] overflow-hidden rounded-[50px] bg-white px-[58px] py-16 shadow-[0px_4px_57.4px_rgba(0,0,0,0.25)]">
                    <Image
                      src="/optimized/Group%20349091%20(1).svg"
                      alt=""
                      width={1550}
                      height={1074}
                      className="pointer-events-none absolute left-[-43px] top-[-79px] h-[1073.89px] w-[1549.96px] max-w-none"
                    />

                    {/* Payment card */}
                    <div className="absolute left-[436px] top-[103px] z-10 h-[662.03px] w-[520px] rounded-[28.6344px] bg-white shadow-[0px_3.43612px_78px_rgba(0,0,0,0.16)]">
                      {/* Green header */}
                      <div className="absolute left-[0px] top-[0px] w-[520px] h-[263.44px] rounded-t-[28.6344px] bg-[#003300]">
                        <div className="absolute left-[34.36px] top-[35.51px] w-[424.93px] h-[182.3px]">
                          <p className={`${geist.className} absolute left-[0px] top-[0px] w-[91px] h-[30px] text-[22.9075px] font-medium leading-[30px] text-white opacity-0.5`}>Montant</p>
                          <p className={`${ebGaramond.className} absolute left-[0px] top-[32.07px] w-[264px] h-[96px] text-[73.304px] font-semibold leading-[96px] text-white`}>500EUR</p>
                          <p className={`${geist.className} absolute left-[0px] top-[136.3px] w-[424.93px] h-[46px] text-[16.0352px] font-medium leading-[23px] text-white opacity-0.5`}>
                            Le paiement Stripe des frais de dossier est demande avant l enregistrement definitif du rendez-vous.
                          </p>
                        </div>
                      </div>

                      {/* Date and time display */}
                      <div className="absolute left-[29.78px] top-[366.52px] w-[289.78px] h-[37.15px]">
                        <p className={`${geist.className} absolute left-[6.87px] top-[1.15px] w-[273px] h-[36px] text-[27.489px] font-semibold leading-[36px] text-center text-[#003300]`}>
                          {bookingDateTimeLabel}
                        </p>
                      </div>

                      {/* Confirmation text */}
                      <div className="absolute left-[40.09px] top-[421.5px] w-[411.19px] h-[56.02px] flex flex-col gap-[8.02px]">
                        <p className={`${geist.className} w-[411.19px] h-[32px] text-[12.5991px] font-medium leading-[16px] text-[#003300] opacity-0.5`}>
                          Votre rendez-vous est confirme pour le creneau selectionne. Un expert RNJ vous accompagnera lors de cet echange.
                        </p>
                        <p className={`${geist.className} w-[411.19px] h-[16px] text-[12.5991px] font-semibold leading-[16px] underline text-[#003300] opacity-0.7`}>
                          Apprendre encore plus
                        </p>
                      </div>

                      {/* Info badges */}
                      <div className="absolute left-[34.36px] top-[287.49px] w-[177.53px] h-[46.96px] rounded-[9.163px] bg-[#C1CB82]">
                        <span className={`${geist.className} absolute left-[14.89px] top-[11.45px] w-[148px] h-[23px] text-[12.5991px] font-medium leading-[23px] text-[#406640]`}>Paiement securise Stripe</span>
                      </div>
                      <div className="absolute left-[217.62px] top-[287.49px] w-[202.73px] h-[46.96px] rounded-[9.163px] bg-[#C1CB82]">
                        <span className={`${geist.className} absolute left-[14.89px] top-[11.45px] w-[173px] h-[23px] text-[12.5991px] font-medium leading-[23px] text-[#406640]`}>Validation avant confirmation</span>
                      </div>

                      {/* Contact form */}
                      <form className="absolute left-[28.67px] top-[440.5px] flex flex-col gap-[14px] w-[462.73px]" onSubmit={handleMessageSubmit}>
                        <input
                          type="text"
                          value={messageForm.name}
                          onChange={(event) =>
                            setMessageForm((current) => ({ ...current, name: event.target.value }))
                          }
                          placeholder="Nom"
                          className={`${geist.className} h-[103.05px] w-[505px] rounded-[20px] bg-[#EEF2CA] px-6 text-[24px] font-normal text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white text-center`}
                          required
                        />
                        <input
                          type="email"
                          value={messageForm.email}
                          onChange={(event) =>
                            setMessageForm((current) => ({ ...current, email: event.target.value }))
                          }
                          placeholder="Email"
                          className={`${geist.className} h-[103.05px] w-[505px] rounded-[20px] bg-[#EEF2CA] px-6 text-[24px] font-normal text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white text-center`}
                          required
                        />
                        <input
                          type="tel"
                          value={messageForm.phone}
                          onChange={(event) =>
                            setMessageForm((current) => ({ ...current, phone: event.target.value }))
                          }
                          placeholder="Telephone"
                          className={`${geist.className} h-[103.05px] w-[505px] rounded-[20px] bg-[#EEF2CA] px-6 text-[24px] font-normal text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white text-center`}
                          required
                        />

                        {/* Submit button */}
                        <div className="relative h-[95.07px] w-[511px] mt-4">
                          <div className="absolute bottom-0 left-[2.29px] h-[91.23px] w-[458.15px] rounded-[22.9075px] bg-[#003300]" />
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${ebGaramond.className} absolute top-0 left-[2.29px] flex h-[91.23px] w-[458.15px] items-center justify-center rounded-[22.9075px] bg-[#BBCB2E] text-[36.652px] font-bold text-[#003300] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60`}
                          >
                            Soumettre
                          </button>
                        </div>

                        {submitState === 'error' && submitMessage ? (
                          <p className={`${geist.className} text-[14px] font-medium text-[#9b1c1c]`}>
                            {submitMessage}
                          </p>
                        ) : null}
                      </form>
                    </div>

                    {/* Back button */}
                    <div className="absolute bottom-[32px] left-[79px] z-10">
                      <button
                        type="button"
                        onClick={prevBookingStep}
                        className={`${ebGaramond.className} flex h-[64px] w-[183px] items-center justify-center rounded-[290px] bg-[#BBCB2E] text-[22.52px] font-bold text-[#003300] transition hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        Retour
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {view === 'message' ? (
              <section className="relative z-20 -mt-[30vh] w-full px-4 pb-16 sm:px-6 md:pb-20">
                <div className="mx-auto w-full max-w-[1512px] overflow-hidden rounded-[34px] bg-[#BBCB2E] shadow-[0px_4px_56px_rgba(0,0,0,0.18)] sm:rounded-[44px] lg:rounded-[50px]">
                  <div className="relative overflow-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.22),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(0,51,0,0.12),_transparent_38%)]" />
                    <div className="absolute -left-16 top-[-90px] h-[260px] w-[260px] rounded-full border border-white/25 bg-white/10 blur-2xl" />
                    <div className="absolute -right-10 bottom-[-60px] h-[220px] w-[220px] rounded-full border border-[#003300]/10 bg-[#DDE597]/50 blur-2xl" />

                    <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] lg:items-center">
                      <div className="rounded-[28px] bg-white px-6 py-8 shadow-[0px_4px_40px_rgba(0,0,0,0.12)] sm:px-8 sm:py-10 lg:min-h-[760px] lg:rounded-[42px] lg:px-10">
                        <div className="flex h-full flex-col justify-between gap-10">
                          <div className="space-y-7">
                            <Image
                              src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                              alt="RNJ Advisory"
                              width={233}
                              height={58}
                              className="h-auto w-[150px] brightness-0 sm:w-[190px] lg:w-[233px]"
                            />

                            <div className="space-y-4">
                              <h2
                                className={`${ebGaramond.className} max-w-[420px] text-[clamp(46px,7vw,96px)] font-normal leading-[0.9] text-[#003300]`}
                              >
                                Parlons de votre projet
                              </h2>
                              <p
                                className={`${geist.className} max-w-[430px] text-[14px] font-medium leading-[1.45] text-[#003300]/50 sm:text-[15px] lg:text-[16px]`}
                              >
                                Have a question or a project in mind? Get in touch with our team and
                                we&apos;ll respond as soon as possible.
                              </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                              <button
                                type="button"
                                onClick={() => openBookingView()}
                                className={`${poppins.className} flex h-[60px] items-center justify-center rounded-[70px] bg-[#BBCB2E] px-6 text-[18px] font-medium text-[#003300] transition hover:brightness-95 sm:h-[72px] sm:text-[22px]`}
                              >
                                Rendez-vous
                              </button>
                              <button
                                type="button"
                                className={`${poppins.className} flex h-[60px] items-center justify-center rounded-[70px] bg-[#406640] px-6 text-[18px] font-medium text-[#BFCCBF] sm:h-[72px] sm:text-[22px]`}
                              >
                                Message
                              </button>
                            </div>
                          </div>

                          <div className="relative overflow-hidden rounded-[28px] border border-[#003300]/10 bg-[linear-gradient(145deg,#F4F7D9,#DDE597)] px-6 py-6 sm:px-7">
                            <div className="absolute -right-6 top-5 h-20 w-20 rounded-full border border-[#003300]/10 bg-white/30" />
                            <div className="absolute bottom-[-18px] left-[-12px] h-28 w-28 rounded-full bg-[#003300]/8" />
                            <div className="relative z-10 space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0px_8px_18px_rgba(0,0,0,0.08)]">
                                  <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M4 6.5C4 5.67157 4.67157 5 5.5 5H18.5C19.3284 5 20 5.67157 20 6.5V15.5C20 16.3284 19.3284 17 18.5 17H8L4 20V6.5Z"
                                      stroke="#003300"
                                      strokeWidth="1.8"
                                      strokeLinejoin="round"
                                    />
                                    <path d="M8 9H16" stroke="#003300" strokeWidth="1.8" strokeLinecap="round" />
                                    <path d="M8 12H13" stroke="#003300" strokeWidth="1.8" strokeLinecap="round" />
                                  </svg>
                                </div>
                                <div>
                                  <p className={`${geist.className} text-[12px] font-semibold uppercase tracking-[0.2em] text-[#003300]/45`}>
                                    Contact us
                                  </p>
                                  <p className={`${geist.className} text-[14px] font-medium text-[#003300]/70`}>
                                    A direct line for strategic questions, mandates, and follow-up.
                                  </p>
                                </div>
                              </div>

                              {messageForm.subject ? (
                                <div className="flex flex-wrap gap-2">
                                  <div className="inline-flex max-w-full rounded-full border border-[#003300]/15 bg-white/80 px-4 py-2 text-[13px] font-medium text-[#003300]">
                                    Sujet pre-rempli: {messageForm.subject}
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[28px] bg-white px-5 py-6 shadow-[0px_4px_40px_rgba(0,0,0,0.12)] sm:px-7 sm:py-8 lg:rounded-[42px] lg:px-10 lg:py-10">
                        <div className="mb-6 flex items-start justify-between gap-4">
                          <div>
                            <h3
                              className={`${ebGaramond.className} text-[clamp(36px,5vw,55px)] leading-[0.95] text-[#003300]`}
                            >
                              Let&apos;s Talk About Your Project
                            </h3>
                            <p
                              className={`${geist.className} mt-3 max-w-[360px] text-[14px] font-medium leading-[1.45] text-[#003300]/45`}
                            >
                              Share your question, context, or objective and we&apos;ll get back to
                              you quickly.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setView('initial')}
                            className={`${geist.className} inline-flex h-11 items-center justify-center rounded-full border border-[#003300]/15 px-4 text-[13px] font-semibold text-[#003300] transition hover:bg-[#F0F3F0]`}
                          >
                            Retour
                          </button>
                        </div>

                        <form className="space-y-4" onSubmit={handleMessageSubmit}>
                          <div className="grid gap-4 md:grid-cols-2">
                            <input
                              type="text"
                              value={messageForm.name}
                              onChange={(event) =>
                                setMessageForm((current) => ({ ...current, name: event.target.value }))
                              }
                              placeholder="Nom *"
                              className={`${geist.className} ${fieldClassName}`}
                              required
                            />
                            <input
                              type="tel"
                              value={messageForm.phone}
                              onChange={(event) =>
                                setMessageForm((current) => ({ ...current, phone: event.target.value }))
                              }
                              placeholder="(+216) Telephone *"
                              className={`${geist.className} ${fieldClassName}`}
                              required
                            />
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <input
                              type="email"
                              value={messageForm.email}
                              onChange={(event) =>
                                setMessageForm((current) => ({ ...current, email: event.target.value }))
                              }
                              placeholder="Votre email *"
                              className={`${geist.className} ${fieldClassName}`}
                              required
                            />
                            <input
                              type="text"
                              value={messageForm.company}
                              onChange={(event) =>
                                setMessageForm((current) => ({ ...current, company: event.target.value }))
                              }
                              placeholder="Votre societe"
                              className={`${geist.className} ${fieldClassName}`}
                            />
                          </div>

                          <input
                            type="text"
                            value={messageForm.subject}
                            onChange={(event) =>
                              setMessageForm((current) => ({ ...current, subject: event.target.value }))
                            }
                            placeholder="Sujet *"
                            className={`${geist.className} ${fieldClassName}`}
                            required
                          />

                          <textarea
                            value={messageForm.message}
                            onChange={(event) =>
                              setMessageForm((current) => ({ ...current, message: event.target.value }))
                            }
                            placeholder="Votre question *"
                            className={`${geist.className} ${fieldClassName} min-h-[180px] resize-none`}
                            required
                          />

                          {submitState === 'error' && submitMessage ? (
                            <p className={`${geist.className} text-[14px] font-medium text-[#9b1c1c]`}>
                              {submitMessage}
                            </p>
                          ) : null}

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`${ebGaramond.className} flex h-[72px] w-full items-center justify-center rounded-[70px] bg-[#BBCB2E] text-[28px] font-bold text-[#003300] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 sm:h-[82px] sm:text-[32px]`}
                          >
                            {isSubmitting ? 'Envoi...' : 'Soumettre'}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
          ) : null}
        </div>
      </main>

      {showSuccessModal ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(0,0,0,0.22)] px-4 backdrop-blur-sm">
          <div className="w-full max-w-[360px] rounded-[44px] bg-white px-7 py-8 text-center shadow-[0px_20px_70px_rgba(0,0,0,0.22)] md:max-w-[520px] md:rounded-[70px] md:px-14 md:py-12">
            <div className="relative mx-auto mb-6 h-[88px] w-[120px] md:mb-8 md:h-[150px] md:w-[205px]">
              <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334091/rnj/layer-1-24-5765da83.svg" alt="Message envoye" fill className="object-contain" />
            </div>

            <h2
              className={`${ebGaramond.className} mx-auto max-w-[280px] text-[34px] leading-[0.96] text-[#003300] md:max-w-[420px] md:text-[64px] md:leading-[0.92]`}
            >
              Votre message a ete envoye
            </h2>

            <p
              className={`${geist.className} mx-auto mt-4 max-w-[250px] text-[11px] leading-[1.45] text-[#003300] md:mt-6 md:max-w-[360px] md:text-[15px] md:leading-[22px]`}
            >
              Merci pour votre message. Nous l&apos;avons bien recu et nous vous repondrons tres prochainement.
            </p>

            <button
              type="button"
              onClick={() => {
                setShowSuccessModal(false);
                setView('initial');
                setSubmissionMode('contact');
                setSelectedBookingDate(null);
                setSelectedSubject('');
              }}
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
