'use client';

import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, CalendarDays, CheckCircle2, Download, Home, RefreshCw, XCircle } from 'lucide-react';
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

type BookingStep = 1 | 2 | 3 | 4;
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
  isOutsideMonth: boolean;
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
const totalBookingSteps = 4;
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

function getCalendarRows(month: CalendarMonth): CalendarCell[][] {
  const daysInMonth = new Date(Date.UTC(month.year, month.month + 1, 0)).getUTCDate();
  const cells: CalendarCell[] = [];

  for (let day = 1; day <= daysInMonth; day += 1) {
    const parts = { ...month, day };

    cells.push({
      iso: toIsoDate(parts),
      day,
      isUnavailable: isUnavailableDate(parts),
      isOutsideMonth: false,
    });
  }

  const nextMonth = shiftCalendarMonth(month, 1);
  let nextDay = 1;
  while (cells.length < 35 || cells.length % 7 !== 0) {
    const nextParts = { ...nextMonth, day: nextDay };
    cells.push({
      iso: toIsoDate(nextParts),
      day: nextDay,
      isUnavailable: false,
      isOutsideMonth: true,
    });
    nextDay += 1;
  }

  const rows: CalendarCell[][] = [];

  for (let index = 0; index < cells.length; index += 7) {
    rows.push(cells.slice(index, index + 7));
  }

  return rows;
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
  const [selectedProfile] = useState('other'); // Pour Institution vs autres
  const [displayedMonth, setDisplayedMonth] = useState<CalendarMonth>(defaultCalendarMonth);
  const [selectedBookingDate, setSelectedBookingDate] = useState<string | null>(defaultBookingDate);
  const [selectedBookingTime, setSelectedBookingTime] = useState(defaultBookingTime);
  const [messageForm, setMessageForm] = useState<ContactPayload>(initialMessageForm);
  const [mockPaymentState, setMockPaymentState] = useState<PaymentState | null>(initialPaymentState);

  const subjects = [
    { label: "Creation d'entreprise" },
    { label: 'Conseil reglementaire' },
    { label: 'ESG & conformite' },
    { label: 'Investissement' },
    { label: 'Autre' },
  ];
  const requestedMode = initialMode;
  const requestedSubject = initialSubject.trim();
  const calendarRows = getCalendarRows(displayedMonth);
  const selectedTimeIndex = Math.max(0, timeOptions.indexOf(selectedBookingTime as (typeof timeOptions)[number]));
  const [selectedHourPart, selectedMinutePart] = selectedBookingTime.split(':');
  const isMorningTime = Number(selectedHourPart) < 12;
  const isAfternoon = !isMorningTime;
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
  const paymentStatusTitle =
    mockPaymentState === 'success'
      ? 'Paiement confirme'
      : mockPaymentState === 'cancelled'
        ? 'Paiement a reprendre'
        : 'Retour du paiement';
  const paymentStatusCopy =
    mockPaymentState === 'success'
      ? `Le paiement de ${BOOKING_FEE_LABEL} est valide. Votre demande est prete pour validation finale par RNJ.`
      : mockPaymentState === 'cancelled'
        ? `Le paiement de ${BOOKING_FEE_LABEL} n a pas abouti. Vous pouvez relancer le paiement ou revenir au recapitulatif.`
        : `Selectionnez un etat de paiement pour previsualiser le retour du prestataire tiers.`;
  const paymentStatusLabel =
    mockPaymentState === 'success' ? 'Paye' : mockPaymentState === 'cancelled' ? 'Non paye' : 'En attente';

  useEffect(() => {
    setMockPaymentState(initialPaymentState);
  }, [initialPaymentState]);

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
      const savedBooking = window.sessionStorage.getItem(pendingBookingStorageKey);

      if (savedBooking) {
        try {
          const parsedBooking = JSON.parse(savedBooking) as BookingPayload;
          const parsedDate = parseIsoDate(parsedBooking.preferred_date);
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
        } catch {
          window.sessionStorage.removeItem(pendingBookingStorageKey);
        }
      }

      window.sessionStorage.removeItem(pendingBookingStorageKey);
      setSubmissionMode('booking');
      setView('booking');
      setBookingStep(4);
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
      setView('booking');
      setBookingStep(4);
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

  function nextBookingStep() {
    if (bookingStep < totalBookingSteps) {
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

  const bookingDateTimeLabel = `${formatLongDateLabel(selectedBookingDate)} a ${selectedBookingTime}`;
  const bookingReference = `RNJ-${(selectedBookingDate || defaultBookingDate).replaceAll('-', '')}-${selectedBookingTime.replace(':', '')}`;

  function downloadMockInvoice() {
    if (typeof window === 'undefined') {
      return;
    }

    const invoice = [
      'RNJ Advisory',
      'Facture - frais de dossier',
      '',
      `Reference: ${bookingReference}`,
      `Statut paiement: ${paymentStatusLabel}`,
      `Montant: ${BOOKING_FEE_LABEL}`,
      `Date rendez-vous: ${bookingDateTimeLabel}`,
      `Sujet: ${selectedSubject || 'Rendez-vous'}`,
      '',
      `Client: ${messageForm.name || 'Client RNJ'}`,
      `Email: ${messageForm.email || 'Non renseigne'}`,
      `Telephone: ${messageForm.phone || 'Non renseigne'}`,
      '',
      'Document genere pour previsualisation du parcours de paiement.',
    ].join('\n');

    const blob = new Blob([invoice], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `facture-${bookingReference}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  return (
    <>
      <main
        className={`relative min-h-screen w-full overflow-x-hidden bg-[#BBCB2E] bg-cover bg-center bg-no-repeat ${
          showSuccessModal ? 'pointer-events-none select-none' : ''
        }`}
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778032115/Group_391_euee0h.png")',
        }}
      >
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
              <div
                className="relative mx-auto w-full max-w-[1512px] overflow-hidden rounded-[34px] bg-white shadow-[0px_4px_57px_rgba(0,0,0,0.25)] sm:rounded-[44px] lg:rounded-[50px]"
              >
                <div
                  className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `translate3d(-${(bookingStep - 1) * 100}%, 0, 0)` }}
                >
                  <article className="min-w-full px-4 py-8 sm:px-8 sm:py-10">
                    <div className="mx-auto grid min-h-[730px] w-full max-w-[1350px] gap-8 rounded-[30px] bg-white p-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-10">
                      <div className="max-w-[620px]">
                        <Image
                          src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                          alt="RNJ Advisory"
                          width={199}
                          height={49}
                          className="h-auto w-[160px] brightness-0 sm:w-[210px]"
                        />
                        <h2 className={`${ebGaramond.className} mt-6 text-[clamp(38px,7vw,74px)] leading-[0.95] text-[#003300] sm:mt-8`}>
                          Quel est le sujet de votre demande ?
                        </h2>

                        <div className="mt-8 flex max-w-[520px] flex-wrap gap-3">
                          {subjects.map((subject) => (
                            <button
                              key={subject.label}
                              type="button"
                              onClick={() => setSelectedSubject(subject.label)}
                              className={`${poppins.className} flex min-h-[62px] w-full items-center justify-center rounded-[17px] px-5 text-[17px] font-medium transition sm:w-auto sm:text-[21px] ${
                                selectedSubject === subject.label
                                  ? 'border-[2px] border-[#003300] bg-[#DDE597] text-[#003300]'
                                  : 'bg-[#E8ECCE] text-[#748974]'
                              } ${
                                subject.label === "Creation d'entreprise"
                                  ? 'sm:min-w-[280px]'
                                  : subject.label === 'Conseil reglementaire'
                                    ? 'sm:min-w-[285px]'
                                    : subject.label === 'Autre'
                                      ? 'sm:min-w-[110px]'
                                      : 'sm:min-w-[220px]'
                              }`}
                            >
                              {subject.label}
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => nextBookingStep()}
                          className={`${ebGaramond.className} mt-10 inline-flex h-[66px] min-w-[190px] items-center justify-center rounded-[30px] bg-[#BBCB2E] px-7 text-[34px] font-bold leading-none text-[#003300] shadow-[0px_4px_0px_#003300] transition hover:brightness-95 sm:mt-16 sm:h-[74px] sm:min-w-[220px] sm:rounded-[34px] sm:px-8 sm:text-[42px]`}
                        >
                          Soumettre
                        </button>
                      </div>

                      <div className="rounded-[38px] border-[2px] border-[#0E3F13] bg-[#F5F5F2] px-4 py-5 shadow-[4px_4px_0px_#0E3F13] sm:px-6 sm:py-7">
                        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className={`${poppins.className} text-[34px] font-medium leading-none text-[#003300] sm:text-[44px]`}>
                              calendrier
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => changeDisplayedMonth(-1)}
                                className="text-[#003300]"
                                aria-label="Mois precedent"
                              >
                                <svg width="11" height="15" viewBox="0 0 11 15" fill="none" stroke="currentColor" strokeWidth="1.8">
                                  <path d="M2 6 L5.5 2.5 L9 6" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M2 12 L5.5 8.5 L9 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                              <span className={`${geist.className} text-[20px] font-medium text-[#748974] sm:text-[30px]`}>
                                {formatMonthLabel(displayedMonth)}
                              </span>
                            </div>
                          </div>

                          <div className="relative flex items-center gap-1 rounded-[12px] bg-[#E3E5D7] px-2 py-1.5">
                            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#BEC888]">
                              <span className={`${poppins.className} text-[20px] font-medium leading-none text-[#0E3F13]`}>
                                {selectedHourPart}
                              </span>
                            </div>
                            <span className={`${poppins.className} text-[20px] text-[#0E3F13]`}>:</span>
                            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#BEC888]">
                              <span className={`${poppins.className} text-[20px] font-medium leading-none text-[#0E3F13]`}>
                                {selectedMinutePart}
                              </span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className={`rounded-[8px] px-2 py-0.5 text-[10px] ${isMorningTime ? 'bg-[#BEC888]' : 'bg-[#BEC888]/50'} ${geist.className} text-[#6F876F]`}>AM</span>
                              <span className={`rounded-[8px] px-2 py-0.5 text-[10px] ${isAfternoon ? 'bg-[#BEC888]' : 'bg-[#BEC888]/50'} ${geist.className} text-[#6F876F]`}>PM</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <button
                                type="button"
                                onClick={() => moveSelectedTime(-1)}
                                disabled={selectedTimeIndex === 0}
                                className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#BEC888] text-[#0E3F13] disabled:cursor-not-allowed disabled:opacity-45"
                                aria-label="Heure precedente"
                              >
                                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.4">
                                  <path d="M1 4 L4 1 L7 4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                onClick={() => moveSelectedTime(1)}
                                disabled={selectedTimeIndex === timeOptions.length - 1}
                                className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#BEC888] text-[#0E3F13] disabled:cursor-not-allowed disabled:opacity-45"
                                aria-label="Heure suivante"
                              >
                                <svg width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.4">
                                  <path d="M1 1 L4 4 L7 1" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            </div>
                            <label className="absolute inset-0 cursor-pointer">
                              <span className="sr-only">Choisir l heure du rendez-vous</span>
                              <select
                                value={selectedBookingTime}
                                onChange={(event) => setSelectedBookingTime(event.target.value)}
                                className="h-full w-full cursor-pointer opacity-0"
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
                        </div>

                        <div className="grid grid-cols-7 gap-2.5">
                          {calendarRows.flat().map((day, index) => {
                            const isSelected = day.iso === selectedBookingDate;
                            const isDisabled = day.isUnavailable || day.isOutsideMonth;
                            return (
                              <button
                                key={`${day.iso}-${index}`}
                                type="button"
                                onClick={() => !isDisabled && setSelectedBookingDate(day.iso)}
                                disabled={isDisabled}
                                className={`${poppins.className} flex h-[46px] w-full items-center justify-center rounded-full text-[14px] font-medium transition sm:h-[52px] sm:text-[16px] ${
                                  day.isOutsideMonth
                                    ? 'bg-[#E6E6DA] text-[#A8B8A6] disabled:cursor-default'
                                    : day.isUnavailable
                                      ? 'border border-dashed border-[#A8B8A6] bg-transparent text-[#A8B8A6] disabled:cursor-not-allowed'
                                      : isSelected
                                        ? 'bg-[#BBCB2E] text-[#0E3F13]'
                                        : 'bg-[#DADDBA] text-[#1A421F] hover:bg-[#CED4A4]'
                                }`}
                              >
                                {day.day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="min-w-full p-0">
                    <div
                      className="mx-auto flex min-h-[560px] w-full max-w-[1360px] items-center justify-center rounded-[30px] bg-cover bg-center bg-no-repeat px-4 py-8 sm:min-h-[620px] sm:px-8 sm:py-10 lg:min-h-[730px]"
                      style={{
                        backgroundImage: 'url("https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778051891/rnj/optimized/group-349091-1-144384f9.svg")',
                      }}
                    >
                      <div className="w-full max-w-[700px]">
                        <div className="mx-auto flex w-full max-w-[700px] flex-col items-center justify-center">
                      <Image
                        src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                        alt="RNJ Advisory"
                        width={220}
                        height={54}
                        className="h-auto w-[150px] brightness-0 sm:w-[220px]"
                      />

                      <div className="mt-8 w-full space-y-3 sm:mt-10 sm:space-y-4">
                        <input
                          type="text"
                          value={messageForm.name}
                          onChange={(event) =>
                            setMessageForm((current) => ({ ...current, name: event.target.value }))
                          }
                          placeholder="Nom"
                          className={`${geist.className} h-[66px] w-full rounded-[16px] bg-[#E9EDCC] px-5 text-center text-[20px] font-medium text-[#7C9678] outline-none transition placeholder:text-[#7C9678] focus:bg-white sm:h-[92px] sm:rounded-[18px] sm:px-6 sm:text-[38px]`}
                          required
                        />
                        <input
                          type="email"
                          value={messageForm.email}
                          onChange={(event) =>
                            setMessageForm((current) => ({ ...current, email: event.target.value }))
                          }
                          placeholder="Email"
                          className={`${geist.className} h-[66px] w-full rounded-[16px] bg-[#E9EDCC] px-5 text-center text-[20px] font-medium text-[#7C9678] outline-none transition placeholder:text-[#7C9678] focus:bg-white sm:h-[92px] sm:rounded-[18px] sm:px-6 sm:text-[38px]`}
                          required
                        />
                        <input
                          type="tel"
                          value={messageForm.phone}
                          onChange={(event) =>
                            setMessageForm((current) => ({ ...current, phone: event.target.value }))
                          }
                          placeholder="Telephone"
                          className={`${geist.className} h-[66px] w-full rounded-[16px] bg-[#E9EDCC] px-5 text-center text-[20px] font-medium text-[#7C9678] outline-none transition placeholder:text-[#7C9678] focus:bg-white sm:h-[92px] sm:rounded-[18px] sm:px-6 sm:text-[38px]`}
                          required
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => nextBookingStep()}
                        disabled={!messageForm.name.trim() || !messageForm.email.trim() || !messageForm.phone.trim()}
                        className={`${ebGaramond.className} mt-3 flex h-[70px] w-full items-center justify-center rounded-[18px] bg-[#BBCB2E] text-[40px] font-bold leading-none text-[#003300] shadow-[0px_5px_0px_#003300] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-55 sm:mt-4 sm:h-[92px] sm:rounded-[20px] sm:text-[52px]`}
                      >
                        Soumettre
                      </button>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="min-w-full p-0">
                    <div
                      className="mx-auto flex min-h-[560px] w-full max-w-[1360px] items-center justify-center rounded-[30px] bg-cover bg-center bg-no-repeat px-4 py-8 sm:min-h-[620px] sm:px-8 sm:py-10 lg:min-h-[730px]"
                      style={{
                        backgroundImage:
                          'url("https://res.cloudinary.com/dmrtdo9z3/image/upload/v1778038594/Group_349101_cbdiuf.png")',
                      }}
                    >
                      <div
                        className="w-full max-w-[560px] overflow-hidden rounded-[24px] bg-white shadow-[0px_18px_45px_rgba(0,0,0,0.16)] sm:rounded-[30px]"
                      >
                        <div className="bg-[#003300] px-5 py-6 sm:px-8 sm:py-9">
                          <p className={`${geist.className} text-[20px] font-medium text-white/55 sm:text-[24px]`}>Montant</p>
                          <p className={`${ebGaramond.className} mt-1 text-[52px] font-semibold leading-[0.95] text-white sm:text-[68px]`}>{BOOKING_FEE_LABEL}</p>
                          <p className={`${geist.className} mt-3 max-w-[430px] text-[14px] font-medium leading-[1.35] text-white/55 sm:text-[17px]`}>
                            Le paiement Stripe des frais de dossier est demande avant l enregistrement definitif du rendez-vous.
                          </p>
                        </div>

                        <div className="space-y-4 bg-white/95 px-5 py-5 sm:space-y-5 sm:px-8 sm:py-7">
                          <div className="flex flex-wrap gap-2">
                            <span className={`${geist.className} rounded-[10px] bg-[#C1CB82] px-3 py-2 text-[13px] font-medium text-[#406640] sm:px-4 sm:text-[16px]`}>
                              Paiement securise Stripe
                            </span>
                            <span className={`${geist.className} rounded-[10px] bg-[#C1CB82] px-3 py-2 text-[13px] font-medium text-[#406640] sm:px-4 sm:text-[16px]`}>
                              Validation avant confirmation
                            </span>
                          </div>

                          <p className={`${geist.className} inline-block rounded-[8px] bg-[#BBCB2E] px-1 text-[36px] font-semibold leading-none text-[#003300] sm:text-[44px]`}>
                            {bookingDateTimeLabel}
                          </p>

                          <p className={`${geist.className} max-w-[430px] text-[13px] font-medium leading-[1.35] text-[#003300]/45 sm:text-[14px]`}>
                            Votre rendez-vous est confirme pour le creneau selectionne. Un expert RNJ vous accompagnera lors de cet echange.
                          </p>
                          <p className={`${geist.className} text-[13px] font-semibold underline text-[#003300]/65 sm:text-[14px]`}>
                            Apprendre encore plus
                          </p>

                          <button
                            type="button"
                            onClick={async () => {
                              if (!selectedBookingDate) {
                                throw new Error('Merci de sélectionner une date pour le rendez-vous.');
                              }
                              const bookingPayload = {
                                ...messageForm,
                                subject: selectedSubject || 'Rendez-vous',
                                message: formatBookingMessage(selectedBookingDate, selectedBookingTime),
                                preferred_date: selectedBookingDate,
                                preferred_time: selectedBookingTime,
                              };
                              const checkoutUrl = await startBookingCheckout(bookingPayload);
                              window.location.assign(checkoutUrl);
                            }}
                            className={`${ebGaramond.className} mt-2 flex h-[72px] w-full items-center justify-center rounded-[18px] bg-[#BBCB2E] text-[40px] font-bold leading-none text-[#003300] shadow-[0px_5px_0px_#003300] transition hover:brightness-95 sm:mt-3 sm:h-[82px] sm:rounded-[22px] sm:text-[52px]`}
                          >
                            Soumettre
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="min-w-full p-0">
                    <div className="mx-auto flex min-h-[560px] w-full max-w-[1360px] items-center justify-center rounded-[30px] bg-[linear-gradient(135deg,#F5F5F2_0%,#EDF2D1_48%,#DDE6B5_100%)] px-4 py-8 sm:min-h-[620px] sm:px-8 sm:py-10 lg:min-h-[730px]">
                      <div className="w-full max-w-[880px] overflow-hidden rounded-[24px] border border-[#003300]/10 bg-white shadow-[0px_20px_50px_rgba(0,0,0,0.18)]">
                        <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
                          <div className="bg-[#003300] p-6 text-white sm:p-8">
                            <div
                              className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full ${
                                mockPaymentState === 'success' ? 'bg-[#C1CB82] text-[#003300]' : 'bg-white/12 text-white'
                              }`}
                            >
                              {mockPaymentState === 'cancelled' ? <XCircle size={26} /> : <CheckCircle2 size={26} />}
                            </div>
                            <p className={`${geist.className} text-[12px] font-semibold uppercase tracking-[0.16em] text-white/45`}>
                              Paiement tiers
                            </p>
                            <h2 className={`${ebGaramond.className} mt-3 text-[42px] leading-[0.95] sm:text-[58px]`}>
                              {paymentStatusTitle}
                            </h2>
                            <p className={`${geist.className} mt-4 text-[15px] font-medium leading-[1.5] text-white/60 sm:text-[16px]`}>
                              {paymentStatusCopy}
                            </p>
                            <div className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2">
                              <span className={`${geist.className} text-[13px] font-semibold text-white`}>
                                {paymentStatusLabel}
                              </span>
                            </div>
                          </div>

                          <div className="p-5 sm:p-7">
                            <div className="flex flex-col gap-4 border-b border-[#003300]/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <p className={`${geist.className} text-[12px] font-semibold uppercase tracking-[0.14em] text-[#406640]/70`}>
                                  Reservation
                                </p>
                                <p className={`${ebGaramond.className} mt-1 text-[32px] leading-none text-[#003300] sm:text-[40px]`}>
                                  {selectedSubject || 'Rendez-vous RNJ'}
                                </p>
                              </div>
                              <div className={`${geist.className} rounded-full bg-[#EEF2EA] px-4 py-2 text-[13px] font-semibold text-[#003300]`}>
                                {bookingReference}
                              </div>
                            </div>

                            <div className="grid gap-3 border-b border-[#003300]/10 py-5 sm:grid-cols-2">
                              <div className="flex items-center gap-3">
                                <CalendarDays className="h-5 w-5 text-[#406640]" />
                                <div>
                                  <p className={`${geist.className} text-[12px] font-semibold text-[#003300]/40`}>Date et heure</p>
                                  <p className={`${geist.className} text-[15px] font-semibold text-[#003300]`}>{bookingDateTimeLabel}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-[#406640]" />
                                <div>
                                  <p className={`${geist.className} text-[12px] font-semibold text-[#003300]/40`}>Montant</p>
                                  <p className={`${geist.className} text-[15px] font-semibold text-[#003300]`}>{BOOKING_FEE_LABEL}</p>
                                </div>
                              </div>
                              <div>
                                <p className={`${geist.className} text-[12px] font-semibold text-[#003300]/40`}>Client</p>
                                <p className={`${geist.className} text-[15px] font-semibold text-[#003300]`}>{messageForm.name || 'Client RNJ'}</p>
                              </div>
                              <div>
                                <p className={`${geist.className} text-[12px] font-semibold text-[#003300]/40`}>Contact</p>
                                <p className={`${geist.className} break-words text-[15px] font-semibold text-[#003300]`}>
                                  {messageForm.email || messageForm.phone || 'A confirmer'}
                                </p>
                              </div>
                            </div>

                            <div className="grid gap-3 pt-5 sm:grid-cols-2">
                              <button
                                type="button"
                                onClick={downloadMockInvoice}
                                className={`${geist.className} flex h-[54px] items-center justify-center gap-2 rounded-[14px] bg-[#BBCB2E] px-4 text-[15px] font-semibold text-[#003300] transition hover:brightness-95`}
                              >
                                <Download size={18} />
                                Telecharger facture
                              </button>
                              <button
                                type="button"
                                onClick={() => setBookingStep(3)}
                                className={`${geist.className} flex h-[54px] items-center justify-center gap-2 rounded-[14px] border border-[#003300]/15 bg-white px-4 text-[15px] font-semibold text-[#003300] transition hover:bg-[#F0F3F0]`}
                              >
                                <ArrowLeft size={18} />
                                Retour paiement
                              </button>
                              <button
                                type="button"
                                onClick={() => setMockPaymentState('success')}
                                className={`${geist.className} flex h-[50px] items-center justify-center gap-2 rounded-[14px] bg-[#EEF2EA] px-4 text-[14px] font-semibold text-[#003300] transition hover:bg-[#E1E8D8]`}
                              >
                                <RefreshCw size={16} />
                                Simuler succes
                              </button>
                              <button
                                type="button"
                                onClick={() => setView('initial')}
                                className={`${geist.className} flex h-[50px] items-center justify-center gap-2 rounded-[14px] bg-[#EEF2EA] px-4 text-[14px] font-semibold text-[#003300] transition hover:bg-[#E1E8D8]`}
                              >
                                <Home size={16} />
                                Retour accueil
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between">
                  {bookingStep > 1 && bookingStep !== 4 ? (
                    <button
                      type="button"
                      onClick={prevBookingStep}
                      className={`${ebGaramond.className} inline-flex h-[56px] min-w-[150px] items-center justify-center rounded-full bg-[#BBCB2E] px-6 text-[30px] font-bold leading-none text-[#003300] shadow-[0px_4px_0px_#003300] transition hover:brightness-95`}
                    >
                      Retour
                    </button>
                  ) : (
                    <span />
                  )}

                  {bookingStep > 1 && bookingStep < 4 && bookingStep !== 2 && bookingStep !== 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (bookingStep === 1 && (!selectedSubject.trim() || !selectedBookingDate)) {
                          return;
                        }
                        nextBookingStep();
                      }}
                      className={`${ebGaramond.className} inline-flex h-[56px] min-w-[150px] items-center justify-center rounded-full bg-[#BBCB2E] px-6 text-[30px] font-bold leading-none text-[#003300] shadow-[0px_4px_0px_#003300] transition hover:brightness-95`}
                    >
                      Suivant
                    </button>
                  ) : (
                    <span />
                  )}
                </div>
              </div>
            </section>
          ) : null}

          {view === 'message' ? (
              <section className="relative z-20 w-full px-4 py-10 sm:px-6 sm:py-12 md:py-16">
                <div className="mx-auto w-full max-w-[1512px] overflow-hidden rounded-[34px] bg-[#BBCB2E] shadow-[0px_4px_56px_rgba(0,0,0,0.18)] sm:rounded-[44px] lg:rounded-[50px]">
                  <div className="relative overflow-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
                    <div className="absolute -left-16 top-[-90px] h-[260px] w-[260px] rounded-full border border-white/25 bg-white/10 blur-2xl" />
                    <div className="absolute -right-10 bottom-[-60px] h-[220px] w-[220px] rounded-full border border-[#003300]/10 bg-[#DDE597]/50 blur-2xl" />

                    <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] lg:items-center">
                      <div className="mx-auto w-full max-w-[667.57px] rounded-[28px] bg-white px-5 py-6 shadow-[0px_4px_40px_rgba(0,0,0,0.12)] sm:px-7 sm:py-8 lg:rounded-[42px] lg:px-10 lg:py-10">
                        <div className="mb-[13.69px] flex items-start justify-between gap-4">
                          <div>
                            <h3
                              className={`${ebGaramond.className} text-[54.76px] leading-[47px] text-[#003300]`}
                            >
                              Let&apos;s Talk About Your Project
                            </h3>
                            <p
                              className={`${geist.className} mt-[21px] max-w-[355.92px] text-[13.69px] font-medium leading-[15px] text-[#003300]/40`}
                            >
                              Have a question or a project in mind? Get in touch with our team and we&apos;ll respond as soon as possible.
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

                        <form className="space-y-0" onSubmit={handleMessageSubmit}>
                          <div className="grid gap-[8.56px] md:grid-cols-2">
                            <input
                              type="text"
                              value={messageForm.name}
                              onChange={(event) =>
                                setMessageForm((current) => ({ ...current, name: event.target.value }))
                              }
                              placeholder="Nom *"
                              className={`${geist.className} h-[83.76px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-[31.66px] py-[30.80px] text-[20.53px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30`}
                              required
                            />
                            <input
                              type="tel"
                              value={messageForm.phone}
                              onChange={(event) =>
                                setMessageForm((current) => ({ ...current, phone: event.target.value }))
                              }
                              placeholder="(+216) Telephone *"
                              className={`${geist.className} h-[83.76px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-[31.66px] py-[30.80px] text-[20.53px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30`}
                              required
                            />
                          </div>

                          <div className="grid gap-[8.56px] md:grid-cols-2">
                            <input
                              type="email"
                              value={messageForm.email}
                              onChange={(event) =>
                                setMessageForm((current) => ({ ...current, email: event.target.value }))
                              }
                              placeholder="Votre email *"
                              className={`${geist.className} h-[83.76px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-[31.66px] py-[30.80px] text-[20.53px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30`}
                              required
                            />
                            <input
                              type="text"
                              value={messageForm.company}
                              onChange={(event) =>
                                setMessageForm((current) => ({ ...current, company: event.target.value }))
                              }
                              placeholder="Votre societe"
                              className={`${geist.className} h-[83.76px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-[31.66px] py-[30.80px] text-[20.53px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30`}
                            />
                          </div>

                          <input
                            type="text"
                            value={messageForm.subject}
                            onChange={(event) =>
                              setMessageForm((current) => ({ ...current, subject: event.target.value }))
                            }
                            placeholder="Sujet *"
                            className={`${geist.className} h-[88.19px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-[31.66px] py-[30.80px] text-[20.53px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30`}
                            required
                          />
                          <textarea
                            value={messageForm.message}
                            onChange={(event) =>
                              setMessageForm((current) => ({ ...current, message: event.target.value }))
                            }
                            placeholder="Votre question *"
                            className={`${geist.className} h-[204.57px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-[31.66px] py-[30.80px] text-[20.53px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 resize-none`}
                            required
                          />
                          <div className="grid gap-[8.56px] md:grid-cols-2">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`${ebGaramond.className} h-[88.19px] w-full items-center justify-center rounded-[12.83px] bg-[#BBCB2E] text-[34.22px] font-bold leading-[35px] text-[#003300] transition hover:bg-[#dde597] disabled:cursor-not-allowed disabled:opacity-60`}
                            >
                              {isSubmitting ? 'Envoi...' : 'Soumettre'}
                            </button>
                            <button
                              type="button"
                              onClick={() => openBookingView()}
                              className={`${ebGaramond.className} h-[88.19px] w-full items-center justify-center rounded-[12.83px] bg-[#003300] text-[34.22px] font-bold leading-[35px] text-[#BBCB2E] transition hover:bg-[#004400]`}
                            >
                              Rendez-vous
                            </button>
                          </div>
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
