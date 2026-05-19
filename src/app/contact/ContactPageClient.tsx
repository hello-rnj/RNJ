'use client';

import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, CalendarDays, CheckCircle2, Download, Home, XCircle } from 'lucide-react';
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
type PaymentVerificationState = 'idle' | 'loading' | 'paid' | 'rejected' | 'error';
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
type BookingSnapshot = {
  subject?: string;
  preferred_date?: string;
  preferred_time?: string | null;
  payment_amount?: number | null;
  payment_currency?: string | null;
  name?: string;
  email?: string;
  phone?: string;
  reference?: string;
};
type PaymentStatusResponse = {
  message?: string;
  is_paid?: boolean;
  payment_status?: string;
  paid_at?: string | null;
  booking?: BookingSnapshot;
  invoice_upload?: {
    uploaded?: boolean;
    filename?: string | null;
    uploaded_at?: string | null;
  };
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

function escapePdfText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function formatEuropeanAmount(
  amountCents: number | null | undefined,
  currencyCode: string | null | undefined
) {
  if (typeof amountCents !== 'number' || Number.isNaN(amountCents)) {
    return BOOKING_FEE_LABEL;
  }

  const currency = (currencyCode || 'EUR').toUpperCase();
  const absolute = Math.abs(amountCents);
  const cents = absolute % 100;
  const units = Math.floor(absolute / 100);
  const groupedUnits = String(units).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const sign = amountCents < 0 ? '-' : '';

  return `${sign}${groupedUnits},${String(cents).padStart(2, '0')} ${currency}`;
}

function formatFrenchDateTime(value: string | null | undefined) {
  if (!value) {
    return 'Non disponible';
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return 'Non disponible';
  }

  return parsedDate.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildEuropeanInvoicePdf(payload: {
  reference: string;
  paymentStatus: string;
  amountLabel: string;
  issueDateLabel: string;
  paidAtLabel: string;
  appointmentLabel: string;
  subjectLabel: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
}) {
  const lineItemTotal = payload.amountLabel;
  const streamLines = [
    '0.968 0.976 0.956 rg',
    '0 0 595 842 re',
    'f',
    '0.102 0.274 0.129 rg',
    '0 732 595 110 re',
    'f',
    'BT',
    '1 1 1 rg',
    '/F2 22 Tf',
    '1 0 0 1 42 800 Tm',
    '(RNJ ADVISORY) Tj',
    'ET',
    'BT',
    '1 1 1 rg',
    '/F1 12 Tf',
    '1 0 0 1 42 778 Tm',
    '(Conseil juridique et strategique) Tj',
    'ET',
    'BT',
    '1 1 1 rg',
    '/F2 18 Tf',
    '1 0 0 1 430 800 Tm',
    '(FACTURE) Tj',
    'ET',
    'BT',
    '1 1 1 rg',
    '/F1 11 Tf',
    `1 0 0 1 430 780 Tm (${escapePdfText(`Ref: ${payload.reference}`)}) Tj`,
    'ET',
    'BT',
    '0.102 0.274 0.129 rg',
    '/F2 12 Tf',
    '1 0 0 1 42 700 Tm',
    '(Facture emise pour paiement confirme Stripe) Tj',
    'ET',
    '0.855 0.909 0.765 rg',
    '40 645 515 1 re',
    'f',
    'BT',
    '0.102 0.274 0.129 rg',
    '/F2 12 Tf',
    '1 0 0 1 42 620 Tm',
    '(Informations facture) Tj',
    'ET',
    'BT',
    '0.149 0.211 0.149 rg',
    '/F1 11 Tf',
    `1 0 0 1 42 596 Tm (${escapePdfText(`Date d emission: ${payload.issueDateLabel}`)}) Tj`,
    'ET',
    'BT',
    '0.149 0.211 0.149 rg',
    '/F1 11 Tf',
    `1 0 0 1 42 578 Tm (${escapePdfText(`Paiement confirme le: ${payload.paidAtLabel}`)}) Tj`,
    'ET',
    'BT',
    '0.149 0.211 0.149 rg',
    '/F1 11 Tf',
    `1 0 0 1 42 560 Tm (${escapePdfText(`Statut paiement: ${payload.paymentStatus}`)}) Tj`,
    'ET',
    'BT',
    '0.149 0.211 0.149 rg',
    '/F1 11 Tf',
    `1 0 0 1 42 542 Tm (${escapePdfText(`Date rendez-vous: ${payload.appointmentLabel}`)}) Tj`,
    'ET',
    'BT',
    '0.149 0.211 0.149 rg',
    '/F1 11 Tf',
    `1 0 0 1 42 524 Tm (${escapePdfText(`Objet: ${payload.subjectLabel}`)}) Tj`,
    'ET',
    '0.937 0.949 0.910 rg',
    '40 480 515 28 re',
    'f',
    'BT',
    '0.102 0.274 0.129 rg',
    '/F2 11 Tf',
    '1 0 0 1 48 490 Tm',
    '(Description) Tj',
    'ET',
    'BT',
    '0.102 0.274 0.129 rg',
    '/F2 11 Tf',
    '1 0 0 1 420 490 Tm',
    '(Montant) Tj',
    'ET',
    'BT',
    '0.149 0.211 0.149 rg',
    '/F1 11 Tf',
    '1 0 0 1 48 466 Tm',
    '(Frais de dossier RNJ Advisory) Tj',
    'ET',
    'BT',
    '0.149 0.211 0.149 rg',
    '/F1 11 Tf',
    `1 0 0 1 420 466 Tm (${escapePdfText(lineItemTotal)}) Tj`,
    'ET',
    '0.855 0.909 0.765 rg',
    '40 446 515 1 re',
    'f',
    'BT',
    '0.102 0.274 0.129 rg',
    '/F2 12 Tf',
    '1 0 0 1 360 424 Tm',
    '(Total TTC) Tj',
    'ET',
    'BT',
    '0.102 0.274 0.129 rg',
    '/F2 16 Tf',
    `1 0 0 1 438 422 Tm (${escapePdfText(lineItemTotal)}) Tj`,
    'ET',
    'BT',
    '0.149 0.211 0.149 rg',
    '/F2 12 Tf',
    '1 0 0 1 42 380 Tm',
    '(Facture client) Tj',
    'ET',
    'BT',
    '0.149 0.211 0.149 rg',
    '/F1 11 Tf',
    `1 0 0 1 42 362 Tm (${escapePdfText(`Nom: ${payload.clientName}`)}) Tj`,
    'ET',
    'BT',
    '0.149 0.211 0.149 rg',
    '/F1 11 Tf',
    `1 0 0 1 42 344 Tm (${escapePdfText(`Email: ${payload.clientEmail}`)}) Tj`,
    'ET',
    'BT',
    '0.149 0.211 0.149 rg',
    '/F1 11 Tf',
    `1 0 0 1 42 326 Tm (${escapePdfText(`Telephone: ${payload.clientPhone}`)}) Tj`,
    'ET',
    'BT',
    '0.349 0.435 0.302 rg',
    '/F1 10 Tf',
    '1 0 0 1 42 130 Tm',
    '(Paiement Stripe confirme - facture generee automatiquement.) Tj',
    'ET',
    'BT',
    '0.349 0.435 0.302 rg',
    '/F1 10 Tf',
    '1 0 0 1 42 114 Tm',
    '(TVA: selon regime applicable.) Tj',
    'ET',
  ];
  const contentStream = streamLines.join('\n');

  const object1 = '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n';
  const object2 = '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n';
  const object3 =
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>\nendobj\n';
  const object4 = `4 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`;
  const object5 = '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n';
  const object6 = '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n';
  const objects = [object1, object2, object3, object4, object5, object6];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  objects.forEach((objectContent) => {
    offsets.push(pdf.length);
    pdf += objectContent;
  });

  const xrefOffset = pdf.length;

  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return pdf;
}

type ContactPageClientProps = {
  initialMode?: 'message' | 'booking' | null;
  initialSubject?: string;
  initialPaymentState?: PaymentState | null;
  initialCheckoutSessionId?: string | null;
};

export default function ContactPageClient({
  initialMode = null,
  initialSubject = '',
  initialPaymentState = null,
  initialCheckoutSessionId = null,
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
  const [paymentVerificationState, setPaymentVerificationState] = useState<PaymentVerificationState>('idle');
  const [paymentVerificationMessage, setPaymentVerificationMessage] = useState('');
  const [bookingReferenceOverride, setBookingReferenceOverride] = useState<string | null>(null);
  const [backendPaymentAmountCents, setBackendPaymentAmountCents] = useState<number | null>(null);
  const [backendPaymentCurrency, setBackendPaymentCurrency] = useState<string | null>(null);
  const [paidAtIsoValue, setPaidAtIsoValue] = useState<string | null>(null);

  const subjects = [
    { label: "Creation d'entreprise" },
    { label: 'Conseil reglementaire' },
    { label: 'ESG & conformite' },
    { label: 'Investissement' },
    { label: 'Autre' },
  ];
  const requestedMode = initialMode;
  const requestedSubject = initialSubject.trim();
  const displayedFeeLabel =
    backendPaymentAmountCents !== null
      ? formatEuropeanAmount(backendPaymentAmountCents, backendPaymentCurrency || 'EUR')
      : BOOKING_FEE_LABEL;
  const paidAtLabel = formatFrenchDateTime(paidAtIsoValue);
  const calendarRows = getCalendarRows(displayedMonth);
  const selectedTimeIndex = Math.max(0, timeOptions.indexOf(selectedBookingTime as (typeof timeOptions)[number]));
  const [selectedHourPart, selectedMinutePart] = selectedBookingTime.split(':');
  const isMorningTime = Number(selectedHourPart) < 12;
  const isAfternoon = !isMorningTime;
  const isPaymentConfirmed = paymentVerificationState === 'paid';
  const isPaymentRejected =
    paymentVerificationState === 'rejected' || initialPaymentState === 'cancelled';
  const canAccessInvoice = isPaymentConfirmed;
  const paymentNotice =
    initialPaymentState === 'success'
      ? paymentVerificationState === 'loading' || paymentVerificationState === 'idle'
        ? {
            title: 'Verification du paiement',
            copy: 'Nous validons actuellement votre paiement Stripe avant de vous autoriser la facture.',
          }
        : isPaymentConfirmed
          ? {
              title: 'Paiement confirme',
              copy: `Vos frais de dossier de ${displayedFeeLabel} ont ete recus. Vous pouvez maintenant telecharger votre facture.`,
            }
          : {
              title: 'Paiement non valide',
              copy:
                paymentVerificationMessage ||
                'La facture reste indisponible tant que le paiement Stripe n est pas confirme.',
            }
      : initialPaymentState === 'cancelled'
        ? {
            title: 'Paiement annule',
            copy: `Le paiement des frais de dossier de ${displayedFeeLabel} a ete annule. Vous pouvez reprendre votre reservation et relancer Stripe ci-dessous.`,
          }
        : null;
  const paymentStatusTitle = isPaymentConfirmed
    ? 'Paiement confirme'
    : isPaymentRejected
      ? 'Paiement a reprendre'
      : paymentVerificationState === 'loading' || paymentVerificationState === 'idle'
        ? 'Verification en cours'
        : 'Paiement en attente';
  const paymentStatusCopy = isPaymentConfirmed
    ? `Le paiement de ${displayedFeeLabel} est valide. Votre facture est maintenant disponible.`
    : isPaymentRejected
      ? `Le paiement de ${displayedFeeLabel} n a pas abouti. Vous pouvez relancer le paiement depuis l etape precedente.`
      : paymentVerificationState === 'loading' || paymentVerificationState === 'idle'
        ? 'Nous verifions actuellement le statut Stripe de votre transaction.'
        : 'La facture sera visible uniquement apres validation reelle du paiement Stripe.';
  const paymentStatusLabel = isPaymentConfirmed
    ? 'Paye'
    : isPaymentRejected
      ? 'Non paye'
      : 'En attente';

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
        setMessageForm((current) => ({
          ...current,
          name: parsedBooking.name,
          phone: parsedBooking.phone,
          email: parsedBooking.email,
          company: parsedBooking.company,
          subject: parsedBooking.subject,
          message: parsedBooking.message,
        }));
      } catch {
        window.sessionStorage.removeItem(pendingBookingStorageKey);
      }
    }

    if (initialPaymentState === 'success') {
      setSubmissionMode('booking');
      setView('booking');
      setBookingStep(4);
      const checkoutSessionId = initialCheckoutSessionId;

      if (!checkoutSessionId) {
        setPaymentVerificationState('rejected');
        setPaymentVerificationMessage(
          'Session Stripe manquante. Le paiement doit etre verifie avant affichage de la facture.'
        );
        return;
      }
      const verifiedCheckoutSessionId: string = checkoutSessionId;

      let active = true;
      const controller = new AbortController();
      const maxAttempts = 120;
      const retryDelayMs = 3000;

      async function verifyPaymentStatusWithRetry() {
        setPaymentVerificationState('loading');
        setPaymentVerificationMessage('');

        for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
          if (!active) {
            return;
          }

          if (attempt > 1) {
            setPaymentVerificationMessage(
              `Confirmation webhook en cours (${attempt}/${maxAttempts})...`
            );
          }

          try {
            const response = await fetch(
              `/api/bookings/payment-status?session_id=${encodeURIComponent(verifiedCheckoutSessionId)}`,
              {
                method: 'GET',
                cache: 'no-store',
                signal: controller.signal,
              }
            );
            const data = (await response.json().catch(() => null)) as PaymentStatusResponse | null;

            if (!response.ok) {
              throw new Error(data?.message || 'Verification du paiement impossible.');
            }

            if (!active) {
              return;
            }

            setPaidAtIsoValue(typeof data?.paid_at === 'string' ? data.paid_at : null);
            if (typeof data?.booking?.payment_amount === 'number') {
              setBackendPaymentAmountCents(data.booking.payment_amount);
            }
            if (typeof data?.booking?.payment_currency === 'string') {
              setBackendPaymentCurrency(data.booking.payment_currency);
            }

            if (data?.booking?.reference) {
              setBookingReferenceOverride(data.booking.reference);
            }
            if (data?.booking?.subject) {
              setSelectedSubject(data.booking.subject);
            }
            if (data?.booking?.preferred_date) {
              setSelectedBookingDate(data.booking.preferred_date);
              const parsedDate = parseIsoDate(data.booking.preferred_date);
              if (parsedDate) {
                setDisplayedMonth({
                  year: parsedDate.year,
                  month: parsedDate.month,
                });
              }
            }
            if (data?.booking?.preferred_time) {
              setSelectedBookingTime(data.booking.preferred_time);
            }
            if (data?.booking?.name || data?.booking?.email || data?.booking?.phone) {
              setMessageForm((current) => ({
                ...current,
                name: data?.booking?.name || current.name,
                email: data?.booking?.email || current.email,
                phone: data?.booking?.phone || current.phone,
              }));
            }

            const normalizedStatus = (data?.payment_status || '').toLowerCase();
            const shouldRetry =
              normalizedStatus === '' ||
              normalizedStatus === 'awaiting_payment' ||
              normalizedStatus === 'pending' ||
              normalizedStatus === 'unpaid' ||
              normalizedStatus === 'open';

            if (data?.is_paid || normalizedStatus === 'paid') {
              setPaymentVerificationState('paid');
              setPaymentVerificationMessage('');
              window.sessionStorage.removeItem(pendingBookingStorageKey);
              return;
            }

            if (normalizedStatus === 'failed' || normalizedStatus === 'cancelled') {
              setPaymentVerificationState('rejected');
              setPaymentVerificationMessage(
                'Le paiement Stripe a ete refuse. La facture reste indisponible.'
              );
              return;
            }

            if (shouldRetry && attempt < maxAttempts) {
              await new Promise<void>((resolve) => {
                setTimeout(resolve, retryDelayMs);
              });
              continue;
            }

            setPaymentVerificationState(shouldRetry ? 'loading' : 'rejected');
            setPaymentVerificationMessage(
              shouldRetry
                ? 'Paiement Stripe recu, validation bancaire en cours. Rechargez la page dans quelques instants si la facture reste masquee.'
                : `Paiement non confirme (statut: ${normalizedStatus || 'inconnu'}).`
            );
            return;
          } catch (error) {
            if (!active || controller.signal.aborted) {
              return;
            }

            if (attempt < maxAttempts) {
              await new Promise<void>((resolve) => {
                setTimeout(resolve, retryDelayMs);
              });
              continue;
            }

            setPaymentVerificationState('error');
            setPaymentVerificationMessage(
              error instanceof Error
                ? error.message
                : 'Erreur technique pendant la verification du paiement.'
            );
            return;
          }
        }
      }

      void verifyPaymentStatusWithRetry();

      return () => {
        active = false;
        controller.abort();
      };
    }

    if (initialPaymentState === 'cancelled') {
      setSubmissionMode('booking');
      setView('booking');
      setBookingStep(4);
      setPaymentVerificationState('rejected');
      setPaymentVerificationMessage('Paiement annule. Facture indisponible.');
      return;
    }

    setPaymentVerificationState('idle');
    setPaymentVerificationMessage('');
  }, [initialCheckoutSessionId, initialPaymentState]);

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
  const fallbackBookingReference = `RNJ-${(selectedBookingDate || defaultBookingDate).replaceAll('-', '')}-${selectedBookingTime.replace(':', '')}`;
  const bookingReference = bookingReferenceOverride || fallbackBookingReference;

  function downloadInvoicePdf() {
    if (!canAccessInvoice) {
      setPaymentVerificationMessage(
        'La facture est verrouillee tant que le paiement Stripe n est pas confirme.'
      );
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    const invoicePdf = buildEuropeanInvoicePdf({
      reference: bookingReference,
      paymentStatus: paymentStatusLabel,
      amountLabel: displayedFeeLabel,
      issueDateLabel: formatFrenchDateTime(new Date().toISOString()),
      paidAtLabel,
      appointmentLabel: bookingDateTimeLabel,
      subjectLabel: selectedSubject || 'Rendez-vous',
      clientName: messageForm.name || 'Client RNJ',
      clientEmail: messageForm.email || 'Non renseigne',
      clientPhone: messageForm.phone || 'Non renseigne',
    });

    const blob = new Blob([invoicePdf], {
      type: 'application/pdf',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `facture-${bookingReference}.pdf`;
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
            'url("https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive,w_800,h_600,c_limit/v1778032115/Group_391_euee0h.png")',
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

          {submitState === 'error' && submitMessage ? (
            <section className="relative z-20 px-4 pt-4 sm:px-6">
              <div className={`${geist.className} mx-auto max-w-[1040px] rounded-[16px] border border-[#7A0F0F]/20 bg-[#FFF2F2] px-4 py-3 text-[14px] font-medium text-[#7A0F0F]`}>
                {submitMessage}
              </div>
            </section>
          ) : null}

          <section className={`relative w-full overflow-hidden px-4 sm:px-6 ${view === 'initial' ? 'flex min-h-[calc(100vh-64px)] items-center justify-center py-10 sm:py-14' : 'h-0 p-0'}`}>
            <div className="relative z-10 flex w-full flex-col items-center">
              <div
                className={`flex w-full max-w-[604px] flex-col items-center justify-center gap-[8px] rounded-[22px] bg-white px-5 py-8 shadow-[0px_3.42px_48px_rgba(0,0,0,0.25)] transition-all duration-700 ease-in-out sm:gap-[8.56px] sm:rounded-[32px] sm:px-8 sm:py-12 md:rounded-[42.78px] md:px-12 md:py-14 ${
                  view === 'initial'
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-[200%] absolute opacity-0 pointer-events-none'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-[40px] sm:gap-[55px] md:gap-[68.45px]">
                  <div className="flex flex-col items-center justify-center gap-[18px] sm:gap-[22px] md:gap-[27.38px]">
                    <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                      alt="RNJ Advisory"
                      width={199}
                      height={49}
                      className="h-auto w-[100px] brightness-0 sm:w-[140px] md:w-[199px]"
                     priority/>
                    <h1
                      className={`${ebGaramond.className} max-w-[465px] text-center font-normal leading-[0.8] text-[#003300]`}
                      style={{ fontSize: 'clamp(28px, 8vw, 82.14px)' }}
                    >
                      Parlons de votre projet
                    </h1>
                    <p
                      className={`${geist.className} max-w-[320px] text-center text-[11px] font-medium leading-[15px] text-[#003300]/40 sm:max-w-[356px] sm:text-[12px] md:text-[13.69px]`}
                    >
                      Vous avez une question ou un projet en tête ? Contactez notre équipe et
                      nous vous répondrons dès que possible.
                    </p>
                  </div>
                </div>

                <div className="flex w-full max-w-[546px] flex-col items-center gap-[8px] sm:gap-[8.56px]">
                  <button
                    type="button"
                    onClick={() => openBookingView()}
                    className={`${poppins.className} flex h-[52px] w-full items-center justify-center rounded-[59.89px] bg-[#BBCB2E] text-[15px] font-medium text-[#003300] transition hover:brightness-95 sm:h-[64px] sm:text-[17px] md:h-[88.12px] md:text-[20.53px]`}
                  >
                    Rendez-vous
                  </button>
                  <button
                    type="button"
                    onClick={() => openMessageView(undefined, { mode: 'contact', preferredDate: null })}
                    className={`${poppins.className} flex h-[52px] w-full items-center justify-center rounded-[59.89px] bg-[#406640] text-[15px] font-medium text-[#BFCCBF] transition hover:opacity-90 sm:h-[64px] sm:text-[17px] md:h-[88.12px] md:text-[20.53px]`}
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </section>


          {view === 'booking' ? (
            <section className="relative z-20 flex min-h-screen w-full items-center justify-center px-3 py-6 sm:px-6 md:py-12">
              <div
                className="relative mx-auto w-full max-w-[1512px]"
              >
                <div
                  className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: `translate3d(-${(bookingStep - 1) * 100}%, 0, 0)` }}
                >
                  <article className="min-w-full px-3 py-6 sm:px-8 sm:py-10">
                    <div className="mx-auto grid w-full max-w-[1350px] gap-5 rounded-[18px] bg-white p-3 sm:gap-7 sm:rounded-[28px] sm:p-6 md:gap-8 md:rounded-[30px] md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center" style={{ minHeight: 'clamp(420px, 80vh, 730px)' }}>
                      <div className="max-w-[620px]">
                        <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                          alt="RNJ Advisory"
                          width={199}
                          height={49}
                          className="h-auto w-[160px] brightness-0 sm:w-[210px]"
                         priority/>
                        <h2 className={`${ebGaramond.className} mt-4 leading-[0.95] text-[#003300] sm:mt-8`} style={{ fontSize: 'clamp(26px, 6vw, 74px)' }}>
                          Quel est le sujet de votre demande ?
                        </h2>

                        <div className="mt-5 flex max-w-[520px] flex-wrap gap-2 sm:mt-8 sm:gap-3">
                          {subjects.map((subject) => (
                            <button
                              key={subject.label}
                              type="button"
                              onClick={() => setSelectedSubject(subject.label)}
                              className={`${poppins.className} flex min-h-[44px] w-full items-center justify-center rounded-[12px] px-3 text-[13px] font-medium transition sm:min-h-[52px] sm:w-auto sm:rounded-[14px] sm:px-4 sm:text-[16px] md:min-h-[62px] md:rounded-[17px] md:text-[21px] ${
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
                          className={`${ebGaramond.className} mt-5 inline-flex h-[52px] min-w-[150px] items-center justify-center rounded-[24px] bg-[#BBCB2E] px-5 text-[26px] font-bold leading-none text-[#003300] shadow-[0px_4px_0px_#003300] transition hover:brightness-95 sm:mt-10 sm:h-[66px] sm:min-w-[190px] sm:rounded-[30px] sm:px-7 sm:text-[34px] md:mt-16 md:h-[74px] md:min-w-[220px] md:rounded-[34px] md:px-8 md:text-[42px]`}
                        >
                          Soumettre
                        </button>
                      </div>

                      <div className="rounded-[22px] border-[2px] border-[#0E3F13] bg-[#F5F5F2] px-3 py-4 shadow-[4px_4px_0px_#0E3F13] sm:rounded-[38px] sm:px-6 sm:py-7">
                        <div className="mb-4 flex flex-wrap items-start justify-between gap-3 sm:mb-6">
                          <div>
                            <p className={`${poppins.className} text-[24px] font-medium leading-none text-[#003300] sm:text-[34px] md:text-[44px]`}>
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
                              <span className={`${geist.className} text-[16px] font-medium text-[#748974] sm:text-[22px] md:text-[30px]`}>
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

                        <div className="grid grid-cols-7 gap-1 sm:gap-2">
                          {calendarRows.flat().map((day, index) => {
                            const isSelected = day.iso === selectedBookingDate;
                            const isDisabled = day.isUnavailable || day.isOutsideMonth;
                            return (
                              <button
                                key={`${day.iso}-${index}`}
                                type="button"
                                onClick={() => !isDisabled && setSelectedBookingDate(day.iso)}
                                disabled={isDisabled}
                                className={`${poppins.className} flex h-[32px] w-full items-center justify-center rounded-full text-[11px] font-medium transition sm:h-[40px] sm:text-[13px] md:h-[46px] md:text-[14px] lg:h-[52px] lg:text-[16px] ${
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
                      className="mx-auto flex w-full max-w-[1360px] items-center justify-center rounded-[20px] bg-cover bg-center bg-no-repeat px-4 py-8 sm:rounded-[30px] sm:px-8 sm:py-10"
                      style={{
                        backgroundImage: 'url("https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1778051891/rnj/optimized/group-349091-1-144384f9.svg")',
                        minHeight: 'clamp(400px, 75vh, 730px)',
                      }}
                    >
                      <div className="w-full max-w-[700px]">
                        <div className="mx-auto flex w-full max-w-[700px] flex-col items-center justify-center">
                      <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                        alt="RNJ Advisory"
                        width={220}
                        height={54}
                        className="h-auto w-[110px] brightness-0 sm:w-[160px] md:w-[220px]"
                       priority/>

                      <div className="mt-5 w-full space-y-2 sm:mt-8 sm:space-y-3 md:mt-10 md:space-y-4">
                        <input
                          type="text"
                          value={messageForm.name}
                          onChange={(event) =>
                            setMessageForm((current) => ({ ...current, name: event.target.value }))
                          }
                          placeholder="Nom"
                          className={`${geist.className} h-[52px] w-full rounded-[14px] bg-[#E9EDCC] px-4 text-center text-[16px] font-medium text-[#7C9678] outline-none transition placeholder:text-[#7C9678] focus:bg-white sm:h-[70px] sm:rounded-[16px] sm:px-5 sm:text-[26px] md:h-[92px] md:rounded-[18px] md:px-6 md:text-[38px]`}
                          required
                        />
                        <input
                          type="email"
                          value={messageForm.email}
                          onChange={(event) =>
                            setMessageForm((current) => ({ ...current, email: event.target.value }))
                          }
                          placeholder="Email"
                          className={`${geist.className} h-[52px] w-full rounded-[14px] bg-[#E9EDCC] px-4 text-center text-[16px] font-medium text-[#7C9678] outline-none transition placeholder:text-[#7C9678] focus:bg-white sm:h-[70px] sm:rounded-[16px] sm:px-5 sm:text-[26px] md:h-[92px] md:rounded-[18px] md:px-6 md:text-[38px]`}
                          required
                        />
                        <input
                          type="tel"
                          value={messageForm.phone}
                          onChange={(event) =>
                            setMessageForm((current) => ({ ...current, phone: event.target.value }))
                          }
                          placeholder="Telephone"
                          className={`${geist.className} h-[52px] w-full rounded-[14px] bg-[#E9EDCC] px-4 text-center text-[16px] font-medium text-[#7C9678] outline-none transition placeholder:text-[#7C9678] focus:bg-white sm:h-[70px] sm:rounded-[16px] sm:px-5 sm:text-[26px] md:h-[92px] md:rounded-[18px] md:px-6 md:text-[38px]`}
                          required
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => nextBookingStep()}
                        disabled={!messageForm.name.trim() || !messageForm.email.trim() || !messageForm.phone.trim()}
                        className={`${ebGaramond.className} mt-3 flex h-[54px] w-full items-center justify-center rounded-[16px] bg-[#BBCB2E] text-[28px] font-bold leading-none text-[#003300] shadow-[0px_4px_0px_#003300] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-55 sm:mt-4 sm:h-[70px] sm:rounded-[18px] sm:text-[40px] md:h-[92px] md:rounded-[20px] md:text-[52px]`}
                      >
                        Soumettre
                      </button>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="min-w-full p-0">
                    <div
                      className="mx-auto flex w-full max-w-[1360px] items-center justify-center rounded-[20px] bg-cover bg-center bg-no-repeat px-4 py-8 sm:rounded-[30px] sm:px-8 sm:py-10"
                      style={{
                        backgroundImage:
                          'url("https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive,w_800,h_600,c_limit/v1778038594/Group_349101_cbdiuf.png")',
                        minHeight: 'clamp(400px, 75vh, 730px)',
                      }}
                    >
                      <div
                        className="w-full max-w-[560px] overflow-hidden rounded-[18px] bg-white shadow-[0px_18px_45px_rgba(0,0,0,0.16)] sm:rounded-[24px] md:rounded-[30px]"
                      >
                        <div className="bg-[#003300] px-4 py-5 sm:px-6 sm:py-7 md:px-8 md:py-9">
                          <p className={`${geist.className} text-[16px] font-medium text-white/55 sm:text-[20px] md:text-[24px]`}>Montant</p>
                          <p className={`${ebGaramond.className} mt-1 text-[38px] font-semibold leading-[0.95] text-white sm:text-[52px] md:text-[68px]`}>{displayedFeeLabel}</p>
                          <p className={`${geist.className} mt-2 max-w-[430px] text-[12px] font-medium leading-[1.35] text-white/55 sm:mt-3 sm:text-[14px] md:text-[17px]`}>
                            Le paiement Stripe des frais de dossier est demande avant l enregistrement definitif du rendez-vous.
                          </p>
                        </div>

                        <div className="space-y-3 bg-white/95 px-4 py-4 sm:space-y-4 sm:px-6 sm:py-5 md:space-y-5 md:px-8 md:py-7">
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            <span className={`${geist.className} rounded-[8px] bg-[#C1CB82] px-2.5 py-1.5 text-[11px] font-medium text-[#406640] sm:rounded-[10px] sm:px-3 sm:py-2 sm:text-[13px] md:px-4 md:text-[16px]`}>
                              Paiement securise Stripe
                            </span>
                            <span className={`${geist.className} rounded-[8px] bg-[#C1CB82] px-2.5 py-1.5 text-[11px] font-medium text-[#406640] sm:rounded-[10px] sm:px-3 sm:py-2 sm:text-[13px] md:px-4 md:text-[16px]`}>
                              Validation avant confirmation
                            </span>
                          </div>

                          <p className={`${geist.className} inline-block rounded-[8px] bg-[#BBCB2E] px-1 text-[26px] font-semibold leading-none text-[#003300] sm:text-[36px] md:text-[44px]`}>
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
                              if (typeof window !== 'undefined') {
                                window.sessionStorage.setItem(pendingBookingStorageKey, JSON.stringify(bookingPayload));
                              }
                              const checkoutUrl = await startBookingCheckout(bookingPayload);
                              window.location.assign(checkoutUrl);
                            }}
                            className={`${ebGaramond.className} mt-2 flex h-[54px] w-full items-center justify-center rounded-[16px] bg-[#BBCB2E] text-[28px] font-bold leading-none text-[#003300] shadow-[0px_4px_0px_#003300] transition hover:brightness-95 sm:mt-3 sm:h-[66px] sm:rounded-[18px] sm:text-[38px] md:h-[82px] md:rounded-[22px] md:text-[52px]`}
                          >
                            Soumettre
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="min-w-full p-0">
                    <div className="mx-auto flex w-full max-w-[1360px] items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#F5F5F2_0%,#EDF2D1_48%,#DDE6B5_100%)] px-4 py-8 sm:rounded-[30px] sm:px-8 sm:py-10" style={{ minHeight: 'clamp(400px, 75vh, 730px)' }}>
                      <div className="w-full max-w-[880px] overflow-hidden rounded-[24px] border border-[#003300]/10 bg-white shadow-[0px_20px_50px_rgba(0,0,0,0.18)]">
                        <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
                          <div className="bg-[#003300] p-6 text-white sm:p-8">
                            <div
                              className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full ${
                                isPaymentConfirmed ? 'bg-[#C1CB82] text-[#003300]' : 'bg-white/12 text-white'
                              }`}
                            >
                              {isPaymentRejected ? <XCircle size={26} /> : <CheckCircle2 size={26} />}
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
                                  <p className={`${geist.className} text-[15px] font-semibold text-[#003300]`}>{displayedFeeLabel}</p>
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
                              <div>
                                <p className={`${geist.className} text-[12px] font-semibold text-[#003300]/40`}>Paiement confirme</p>
                                <p className={`${geist.className} text-[15px] font-semibold text-[#003300]`}>{paidAtLabel}</p>
                              </div>
                            </div>

                            {paymentVerificationState === 'loading' ? (
                              <div className={`${geist.className} mt-4 rounded-[14px] border border-[#003300]/10 bg-[#F5F8EE] px-4 py-3 text-[14px] font-medium text-[#003300]/80`}>
                                {paymentVerificationMessage || 'Verification du paiement Stripe en cours...'}
                              </div>
                            ) : null}

                            {canAccessInvoice ? (
                              <div className="pt-5">
                                <div className="grid gap-3">
                                  <button
                                    type="button"
                                    onClick={downloadInvoicePdf}
                                    className={`${geist.className} flex h-[54px] items-center justify-center gap-2 rounded-[14px] bg-[#BBCB2E] px-4 text-[15px] font-semibold text-[#003300] transition hover:brightness-95`}
                                  >
                                    <Download size={18} />
                                    Telecharger facture
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className={`${geist.className} mt-5 rounded-[14px] border border-[#003300]/10 bg-[#F5F8EE] px-4 py-4 text-[14px] font-medium leading-[1.5] text-[#003300]/80`}>
                                La facture est masquee et le televersement est bloque tant que le paiement Stripe n est pas valide.
                                {paymentVerificationMessage ? ` ${paymentVerificationMessage}` : ''}
                              </div>
                            )}

                            <div className="grid gap-3 pt-5 sm:grid-cols-2">
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
                                onClick={() => setView('initial')}
                                className={`${geist.className} flex h-[54px] items-center justify-center gap-2 rounded-[14px] bg-[#EEF2EA] px-4 text-[15px] font-semibold text-[#003300] transition hover:bg-[#E1E8D8]`}
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
              <section className="relative z-10 flex min-h-[calc(100vh-64px)] w-full items-center justify-center px-4 pb-10 pt-28 sm:min-h-[calc(100vh-80px)] sm:px-6 sm:pb-12 sm:pt-32">
                <div className="mx-auto mt-6 w-full max-w-[753px] sm:mt-8">
                  <div
                    className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[42.7791px]"
                    style={{
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0px 3.42233px 47.9982px rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      borderRadius: '42.7791px',
                    }}
                  >
                    <div className="relative z-10 px-3 py-5 sm:px-6 sm:py-8 lg:px-[42.82px] lg:pb-[39.19px] lg:pt-[50.48px]">
                      <div className="mx-auto w-full max-w-[667.57px]">
                        <div className="mb-3 flex items-start justify-between gap-3 sm:mb-[13.69px] sm:gap-4">
                          <div>
                            <h3
                              className={`${ebGaramond.className} leading-[0.92] text-[#003300]`}
                              style={{ fontSize: 'clamp(24px, 5vw, 54.76px)' }}
                            >
                              Parlons de votre projet
                            </h3>
                            <p
                              className={`${geist.className} mt-[21px] max-w-[355.92px] text-[13.69px] font-medium leading-[15px] text-[#003300]/40`}
                            >
                              Vous avez une question ou un projet en tête ? Contactez notre équipe et nous vous répondrons dès que possible.
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

                        <form className="space-y-[10px] sm:space-y-[12px] md:space-y-[14px]" onSubmit={handleMessageSubmit}>
                          <div className="grid gap-[10px] sm:gap-[12px] md:grid-cols-2 md:gap-[14px]">
                            <input
                              type="text"
                              value={messageForm.name}
                              onChange={(event) =>
                                setMessageForm((current) => ({ ...current, name: event.target.value }))
                              }
                              placeholder="Nom *"
                              className={`${geist.className} h-[56px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-4 py-3 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 sm:h-[70px] sm:px-6 sm:py-4 sm:text-[18px] md:h-[83.76px] md:px-[31.66px] md:py-[30.80px] md:text-[20.53px]`}
                              required
                            />
                            <input
                              type="tel"
                              value={messageForm.phone}
                              onChange={(event) =>
                                setMessageForm((current) => ({ ...current, phone: event.target.value }))
                              }
                              placeholder="(+32) Telephone *"
                              className={`${geist.className} h-[56px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-4 py-3 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 sm:h-[70px] sm:px-6 sm:py-4 sm:text-[18px] md:h-[83.76px] md:px-[31.66px] md:py-[30.80px] md:text-[20.53px]`}
                              required
                            />
                          </div>

                          <div className="grid gap-[10px] sm:gap-[12px] md:grid-cols-2 md:gap-[14px]">
                            <input
                              type="email"
                              value={messageForm.email}
                              onChange={(event) =>
                                setMessageForm((current) => ({ ...current, email: event.target.value }))
                              }
                              placeholder="Votre email *"
                              className={`${geist.className} h-[56px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-4 py-3 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 sm:h-[70px] sm:px-6 sm:py-4 sm:text-[18px] md:h-[83.76px] md:px-[31.66px] md:py-[30.80px] md:text-[20.53px]`}
                              required
                            />
                            <input
                              type="text"
                              value={messageForm.company}
                              onChange={(event) =>
                                setMessageForm((current) => ({ ...current, company: event.target.value }))
                              }
                              placeholder="Votre societe"
                              className={`${geist.className} h-[56px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-4 py-3 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 sm:h-[70px] sm:px-6 sm:py-4 sm:text-[18px] md:h-[83.76px] md:px-[31.66px] md:py-[30.80px] md:text-[20.53px]`}
                            />
                          </div>

                          <input
                            type="text"
                            value={messageForm.subject}
                            onChange={(event) =>
                              setMessageForm((current) => ({ ...current, subject: event.target.value }))
                            }
                            placeholder="Sujet *"
                            className={`${geist.className} h-[56px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-4 py-3 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 sm:h-[70px] sm:px-6 sm:py-4 sm:text-[18px] md:h-[88.19px] md:px-[31.66px] md:py-[30.80px] md:text-[20.53px]`}
                            required
                          />
                          <textarea
                            value={messageForm.message}
                            onChange={(event) =>
                              setMessageForm((current) => ({ ...current, message: event.target.value }))
                            }
                            placeholder="Votre question *"
                            className={`${geist.className} h-[140px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-4 py-3 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 resize-none sm:h-[170px] sm:px-6 sm:py-4 sm:text-[18px] md:h-[204.57px] md:px-[31.66px] md:py-[30.80px] md:text-[20.53px]`}
                            required
                          />
                          <div className="grid gap-[10px] sm:gap-[12px] md:grid-cols-2 md:gap-[14px]">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`${ebGaramond.className} h-[56px] w-full items-center justify-center rounded-[12.83px] bg-[#BBCB2E] text-[20px] font-bold leading-tight text-[#003300] transition hover:bg-[#dde597] disabled:cursor-not-allowed disabled:opacity-60 sm:h-[70px] sm:text-[28px] md:h-[88.19px] md:text-[34.22px] md:leading-[35px]`}
                            >
                              {isSubmitting ? 'Envoi...' : 'Soumettre'}
                            </button>
                            <button
                              type="button"
                              onClick={() => openBookingView()}
                              className={`${ebGaramond.className} h-[56px] w-full items-center justify-center rounded-[12.83px] bg-[#003300] text-[20px] font-bold leading-tight text-[#BBCB2E] transition hover:bg-[#004400] sm:h-[70px] sm:text-[28px] md:h-[88.19px] md:text-[34.22px] md:leading-[35px]`}
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
              <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/f_auto,q_auto:best,dpr_auto,fl_progressive/v1776334091/rnj/layer-1-24-5765da83.svg" alt="Message envoye" fill className="object-contain"  loading="lazy"/>
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
