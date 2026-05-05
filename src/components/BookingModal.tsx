'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { EB_Garamond, Geist, Poppins } from 'next/font/google';
import { X } from 'lucide-react';

const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' });
const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });

type Step = 'initial' | 'profile' | 'form' | 'booking';
type CalendarMonth = { year: number; month: number };
type CalendarDateParts = CalendarMonth & { day: number };
type CalendarCell = { iso: string; day: number; isUnavailable: boolean };
type ContactPayload = { name: string; phone: string; email: string; company: string; subject: string; message: string };
type BookingPayload = ContactPayload & { preferred_date: string; preferred_time?: string };

const fieldCls =
  'w-full rounded-[18px] border border-transparent bg-[#F0F3F0] px-5 py-4 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30';

const emptyForm: ContactPayload = { name: '', phone: '', email: '', company: '', subject: '', message: '' };
const pendingKey = 'rnj-pending-booking';
const monthLabels = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Decembre'] as const;
const daysOfWeek = ['L','M','M','J','V','S','D'];
const unavailableDates = new Set(['2026-04-10','2026-04-11','2026-04-12','2026-04-13']);
const timeOptions = [
  '09:00','09:15','09:30','09:45','10:00','10:15','10:30','10:45',
  '11:00','11:15','11:30','11:45','13:00','13:15','13:30','13:45',
  '14:00','14:15','14:30','14:45','15:00','15:15','15:30','15:45',
  '16:00','16:15','16:30','16:45','17:00','17:15','17:30','17:45',
] as const;

const profiles = [
  {
    id: 'entrepreneur',
    label: 'Entrepreneur',
    description: 'Vous développez un projet et recherchez un accompagnement structuré.',
    illustration: '/optimized/profile-entrepreneur.svg',
  },
  {
    id: 'investisseur',
    label: 'Investisseur',
    description: 'Vous identifiez des opportunités et souhaitez sécuriser vos décisions.',
    illustration: '/optimized/profile-investisseur.svg',
  },
  {
    id: 'institution',
    label: 'Institution',
    description: 'Vous représentez une organisation impliquée dans des enjeux stratégiques et réglementaires.',
    illustration: '/optimized/profile-institution.svg',
  },
  {
    id: 'autre',
    label: 'Autre',
    description: 'Votre besoin ne correspond pas aux profils ci-dessus.',
    illustration: '/optimized/profile-autre.svg',
  },
] as const;

function pad(n: number) { return String(n).padStart(2, '0'); }

function toIso(p: CalendarDateParts) {
  return `${p.year}-${pad(p.month + 1)}-${pad(p.day)}`;
}

function parseIso(v: string | null): CalendarDateParts | null {
  if (!v) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (!m) return null;
  return { year: Number(m[1]), month: Number(m[2]) - 1, day: Number(m[3]) };
}

function shiftMonth(m: CalendarMonth, d: number): CalendarMonth {
  const date = new Date(m.year, m.month + d, 1);
  return { year: date.getFullYear(), month: date.getMonth() };
}

function isUnavailable(p: CalendarDateParts) {
  const weekday = new Date(p.year, p.month, p.day).getDay();
  return unavailableDates.has(toIso(p)) || weekday === 0 || weekday === 6;
}

function firstAvailable(m: CalendarMonth): string | null {
  const daysInMonth = new Date(m.year, m.month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    const p = { ...m, day: d };
    if (!isUnavailable(p)) return toIso(p);
  }
  return null;
}

function getCalendarWeeks(m: CalendarMonth): Array<Array<CalendarCell | null>> {
  const daysInMonth = new Date(m.year, m.month + 1, 0).getDate();
  let firstWeekday = new Date(m.year, m.month, 1).getDay();
  firstWeekday = firstWeekday === 0 ? 6 : firstWeekday - 1;
  const cells: Array<CalendarCell | null> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const p = { ...m, day: d };
    cells.push({ iso: toIso(p), day: d, isUnavailable: isUnavailable(p) });
  }
  const weeks: Array<Array<CalendarCell | null>> = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function formatMonthLabel(m: CalendarMonth) {
  return `${monthLabels[m.month]} ${m.year}`;
}

function formatDateLabel(iso: string | null) {
  if (!iso) return 'Date à confirmer';
  const p = parseIso(iso);
  if (!p) return 'Date à confirmer';
  return `${p.day} ${monthLabels[p.month].toLowerCase()} ${p.year}`;
}

const defaultMonth: CalendarMonth = { year: 2026, month: 3 };
const defaultDate = '2026-04-15';
const defaultTime = '14:00';

async function sendContact(payload: ContactPayload) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as { message?: string };
  if (!res.ok) throw new Error(data.message || "Échec de l'envoi.");
}

async function startBookingCheckout(payload: BookingPayload) {
  const res = await fetch('/api/bookings/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as { message?: string; url?: string };
  if (!res.ok) throw new Error(data.message || "Échec de l'envoi.");
  if (!data.url) throw new Error('URL de paiement manquante.');
  return data.url;
}

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: 'message' | 'booking' | null;
}

export default function BookingModal({ open, onClose, initialMode = null }: BookingModalProps) {
  const [step, setStep] = useState<Step>('initial');
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [animating, setAnimating] = useState(false);
  const [profileIndex, setProfileIndex] = useState(0);
  const [nextStep, setNextStep] = useState<Step>('initial');
  const [formMode, setFormMode] = useState<'contact' | 'booking'>('contact');
  const [form, setForm] = useState<ContactPayload>(emptyForm);
  const [selectedSubject, setSelectedSubject] = useState("Création d'entreprise");
  const [displayedMonth, setDisplayedMonth] = useState<CalendarMonth>(defaultMonth);
  const [selectedDate, setSelectedDate] = useState<string | null>(defaultDate);
  const [selectedTime, setSelectedTime] = useState(defaultTime);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const calendarWeeks = getCalendarWeeks(displayedMonth);
  const timeIndex = Math.max(0, timeOptions.indexOf(selectedTime as (typeof timeOptions)[number]));
  const [hourPart, minutePart] = selectedTime.split(':');
  const isMorning = Number(hourPart) < 12;

  useEffect(() => {
    if (open) {
      setStep(initialMode === 'booking' ? 'profile' : 'initial');
      setFormMode(initialMode === 'booking' ? 'booking' : 'contact');
      setProfileIndex(0);
      setForm(emptyForm);
      setSubmitState('idle');
      setSubmitMessage('');
      setShowSuccess(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, initialMode]);

  const goTo = useCallback((target: Step, dir: 'forward' | 'back' = 'forward') => {
    if (animating) return;
    setDirection(dir);
    setNextStep(target);
    setAnimating(true);
    setTimeout(() => {
      setStep(target);
      setAnimating(false);
    }, 350);
  }, [animating]);

  function changeMonth(offset: number) {
    const next = shiftMonth(displayedMonth, offset);
    setDisplayedMonth(next);
    const avail = firstAvailable(next);
    if (avail) setSelectedDate(avail);
  }

  function moveTime(dir: -1 | 1) {
    const idx = Math.max(0, timeOptions.indexOf(selectedTime as (typeof timeOptions)[number]));
    const next = Math.min(timeOptions.length - 1, Math.max(0, idx + dir));
    setSelectedTime(timeOptions[next]);
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitState('idle');
    setSubmitMessage('');
    try {
      if (formMode === 'booking') {
        goTo('booking');
      } else {
        await sendContact(form);
        setSubmitState('success');
        setShowSuccess(true);
        setForm(emptyForm);
      }
    } catch (err) {
      setSubmitState('error');
      setSubmitMessage(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleBookingSubmit() {
    if (!selectedDate) return;
    setIsSubmitting(true);
    setSubmitState('idle');
    setSubmitMessage('');
    try {
      const payload: BookingPayload = {
        ...form,
        subject: selectedSubject,
        message: form.message || `Rendez-vous le ${formatDateLabel(selectedDate)} à ${selectedTime}.`,
        preferred_date: selectedDate,
        preferred_time: selectedTime,
      };
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(pendingKey, JSON.stringify(payload));
      }
      const url = await startBookingCheckout(payload);
      window.location.assign(url);
    } catch (err) {
      setSubmitState('error');
      setSubmitMessage(err instanceof Error ? err.message : 'Une erreur est survenue.');
      setIsSubmitting(false);
    }
  }

  if (!open) return null;

  const slideOut = animating ? (direction === 'forward' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0') : 'translate-x-0 opacity-100';
  const slideIn = animating ? 'translate-x-0 opacity-100' : '';
  void slideIn; // used via CSS class, not inline

  const isSmall = step === 'initial' || step === 'profile';

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[300] flex items-center justify-center overflow-auto p-4 sm:p-6">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#2d3d0a]" />
        <div className="absolute -left-[20%] top-[-10%] h-[70%] w-[70%] rounded-full bg-[#6b8013] opacity-60 blur-[120px]" />
        <div className="absolute right-[-15%] top-[10%] h-[60%] w-[60%] rounded-full bg-[#8fa51a] opacity-50 blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[20%] h-[65%] w-[65%] rounded-full bg-[#5a7011] opacity-55 blur-[130px]" />
        <div className="absolute bottom-[5%] right-[10%] h-[45%] w-[45%] rounded-full bg-[#bbcb2e] opacity-30 blur-[90px]" />
        <div className="absolute left-[40%] top-[30%] h-[40%] w-[40%] rounded-full bg-[#d4e135] opacity-20 blur-[80px]" />
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-[310] flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30 sm:right-6 sm:top-6"
        aria-label="Fermer"
      >
        <X size={20} />
      </button>

      {/* Step container */}
      <div
        className={`relative z-10 w-full transition-all duration-350 ease-in-out ${
          isSmall ? 'max-w-[604px]' : 'max-w-[1392px]'
        } ${slideOut}`}
      >
        {/* ── STEP: INITIAL ── */}
        {step === 'initial' && (
          <div className="mx-auto flex w-full max-w-[604px] flex-col items-center justify-center gap-[8.56px] rounded-[43px] bg-white px-6 py-10 shadow-[0px_3.42px_48px_rgba(0,0,0,0.25)] sm:px-10 sm:py-14">
            <div className="flex flex-col items-center justify-center gap-12">
              <div className="flex flex-col items-center gap-6">
                <Image
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                  alt="RNJ Advisory"
                  width={199}
                  height={49}
                  className="h-auto w-[140px] brightness-0 sm:w-[180px] md:w-[199px]"
                />
                <div className="flex flex-col items-center gap-4 text-center">
                  <h2 className={`${ebGaramond.className} max-w-[465px] text-[clamp(40px,8vw,82px)] font-normal leading-[0.9] text-[#003300]`}>
                    Parlons de votre projet
                  </h2>
                  <p className={`${geist.className} max-w-[356px] text-[13px] font-medium leading-[1.5] text-[#003300]/40 sm:text-[14px]`}>
                    Vous avez une question ou un projet en tête ? Contactez notre équipe et nous vous répondrons dès que possible.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex w-full max-w-[546px] flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => { setFormMode('booking'); goTo('profile'); }}
                className={`${poppins.className} flex h-[72px] w-full items-center justify-center rounded-full bg-[#BBCB2E] text-[18px] font-medium text-[#003300] transition hover:brightness-95 sm:h-[88px] sm:text-[20px]`}
              >
                Rendez-vous
              </button>
              <button
                type="button"
                onClick={() => { setFormMode('contact'); goTo('profile'); }}
                className={`${poppins.className} flex h-[72px] w-full items-center justify-center rounded-full bg-[#406640] text-[18px] font-medium text-[#BFCCBF] transition hover:opacity-90 sm:h-[88px] sm:text-[20px]`}
              >
                Message
              </button>
            </div>
          </div>
        )}

        {/* ── STEP: PROFILE SELECTION ── */}
        {step === 'profile' && (
          <div className="relative mx-auto flex w-full max-w-[604px] items-center justify-center">
            {/* Left arrow */}
            <button
              type="button"
              onClick={() => setProfileIndex((i) => (i - 1 + profiles.length) % profiles.length)}
              className="absolute -left-8 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30 sm:-left-12"
              aria-label="Profil précédent"
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M7 1L1 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="mx-auto flex w-full max-w-[520px] flex-col items-center rounded-[43px] bg-white px-6 py-10 shadow-[0px_3.42px_48px_rgba(0,0,0,0.25)] sm:px-10 sm:py-12">
              {/* Back */}
              <button
                type="button"
                onClick={() => goTo('initial', 'back')}
                className={`${geist.className} self-start inline-flex h-9 items-center gap-1 rounded-full border border-[#003300]/15 px-4 text-[13px] font-semibold text-[#003300] transition hover:bg-[#F0F3F0]`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Retour
              </button>

              <div className="mt-6 flex w-full flex-col items-center gap-6">
                <div className="relative h-[180px] w-[200px] sm:h-[210px] sm:w-[230px]">
                  <Image
                    key={profiles[profileIndex].id}
                    src={profiles[profileIndex].illustration}
                    alt={profiles[profileIndex].label}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                <div className="flex flex-col items-center gap-3 text-center">
                  <h3 className={`${ebGaramond.className} text-[clamp(32px,6vw,54px)] font-normal text-[#003300]`}>
                    {profiles[profileIndex].label}
                  </h3>
                  <p className={`${geist.className} max-w-[340px] text-[13px] font-medium leading-[1.5] text-[#003300]/45 sm:text-[14px]`}>
                    {profiles[profileIndex].description}
                  </p>
                </div>

                {/* Profile dots */}
                <div className="flex gap-2">
                  {profiles.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setProfileIndex(i)}
                      className={`h-2 rounded-full transition-all ${i === profileIndex ? 'w-6 bg-[#003300]' : 'w-2 bg-[#003300]/25'}`}
                      aria-label={`Profil ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => goTo(formMode === 'booking' ? 'booking' : 'form')}
                  className={`${poppins.className} flex h-[58px] items-center justify-center rounded-full bg-[#003300] px-10 text-[17px] font-medium text-white transition hover:opacity-90 sm:h-[64px] sm:text-[18px]`}
                >
                  Continuer
                </button>
              </div>
            </div>

            {/* Right arrow */}
            <button
              type="button"
              onClick={() => setProfileIndex((i) => (i + 1) % profiles.length)}
              className="absolute -right-8 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/30 sm:-right-12"
              aria-label="Profil suivant"
            >
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M1 1L7 7L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}

        {/* ── STEP: FORM ── */}
        {step === 'form' && (
          <div className="mx-auto flex w-full max-w-[900px] flex-col gap-6 sm:flex-row">
            {/* Left card */}
            <div className="flex w-full flex-col justify-between gap-8 rounded-[34px] bg-white px-6 py-8 shadow-[0px_4px_40px_rgba(0,0,0,0.12)] sm:max-w-[300px] sm:rounded-[42px] sm:px-8 sm:py-10 lg:max-w-[360px]">
              <div className="space-y-6">
                <Image
                  src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334027/rnj/minimal-horizontal-logo-white-1-317aafcc.svg"
                  alt="RNJ Advisory"
                  width={199}
                  height={49}
                  className="h-auto w-[130px] brightness-0 sm:w-[160px]"
                />
                <div className="space-y-3">
                  <h2 className={`${ebGaramond.className} text-[clamp(38px,5vw,64px)] font-normal leading-[0.92] text-[#003300]`}>
                    Parlons de votre projet
                  </h2>
                  <p className={`${geist.className} max-w-[300px] text-[13px] font-medium leading-[1.5] text-[#003300]/45`}>
                    Vous avez une question ou un projet en tête ? Contactez notre équipe et nous vous répondrons dès que possible.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => { setFormMode('booking'); goTo('booking'); }}
                    className={`${poppins.className} flex h-[56px] items-center justify-center rounded-full bg-[#BBCB2E] text-[15px] font-medium text-[#003300] transition hover:brightness-95`}
                  >
                    Rendez-vous
                  </button>
                  <button
                    type="button"
                    className={`${poppins.className} flex h-[56px] items-center justify-center rounded-full bg-[#406640] text-[15px] font-medium text-[#BFCCBF]`}
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>

            {/* Right card: Form */}
            <div className="flex-1 rounded-[34px] bg-white px-5 py-6 shadow-[0px_4px_40px_rgba(0,0,0,0.12)] sm:rounded-[42px] sm:px-7 sm:py-8">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className={`${ebGaramond.className} text-[clamp(28px,4vw,46px)] leading-[0.95] text-[#003300]`}>
                    Let&apos;s Talk About Your Project
                  </h3>
                  <p className={`${geist.className} mt-2 text-[13px] font-medium leading-[1.5] text-[#003300]/45`}>
                    Partagez votre question, contexte ou objectif et nous vous répondrons rapidement.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => goTo('profile', 'back')}
                  className={`${geist.className} shrink-0 inline-flex h-10 items-center justify-center rounded-full border border-[#003300]/15 px-4 text-[13px] font-semibold text-[#003300] transition hover:bg-[#F0F3F0]`}
                >
                  Retour
                </button>
              </div>

              <form className="space-y-3" onSubmit={handleFormSubmit}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input type="text" placeholder="Nom *" required value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={`${geist.className} ${fieldCls}`} />
                  <input type="tel" placeholder="(+216) Téléphone *" required value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className={`${geist.className} ${fieldCls}`} />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input type="email" placeholder="Votre email *" required value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={`${geist.className} ${fieldCls}`} />
                  <input type="text" placeholder="Votre société (optionnel)" value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    className={`${geist.className} ${fieldCls}`} />
                </div>
                <input type="text" placeholder="Sujet *" required value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className={`${geist.className} ${fieldCls}`} />
                <textarea placeholder="Votre question *" required value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className={`${geist.className} ${fieldCls} min-h-[130px] resize-none`} />

                {submitState === 'error' && submitMessage && (
                  <p className={`${geist.className} text-[13px] font-medium text-red-700`}>{submitMessage}</p>
                )}

                <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                  <button type="submit" disabled={isSubmitting}
                    className={`${ebGaramond.className} flex h-[64px] flex-1 items-center justify-center rounded-full bg-[#BBCB2E] text-[24px] font-bold text-[#003300] transition hover:brightness-95 disabled:opacity-60`}>
                    {isSubmitting ? 'Envoi...' : 'Soumettre'}
                  </button>
                  <button type="button" onClick={() => { setFormMode('booking'); goTo('booking'); }}
                    className={`${poppins.className} flex h-[64px] flex-1 items-center justify-center rounded-full bg-[#003300] text-[17px] font-medium text-white transition hover:opacity-90`}>
                    Rendez-vous
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── STEP: BOOKING (Calendar + Subject) ── */}
        {step === 'booking' && (
          <div className="mx-auto w-full rounded-[34px] bg-white px-5 py-8 shadow-[0px_4px_57px_rgba(0,0,0,0.25)] sm:rounded-[42px] sm:px-8 sm:py-12 lg:rounded-[50px] lg:px-14 lg:py-14">
            <div className="mb-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => goTo('profile', 'back')}
                className={`${geist.className} inline-flex h-10 items-center gap-1 rounded-full border border-[#003300]/15 px-4 text-[13px] font-semibold text-[#003300] transition hover:bg-[#F0F3F0]`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Retour
              </button>
              <span className={`${geist.className} text-[12px] font-semibold uppercase tracking-[0.18em] text-[#003300]/40`}>
                Rendez-vous
              </span>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Left: Subject selection */}
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className={`${ebGaramond.className} text-[clamp(32px,4vw,64px)] font-medium leading-[1.1] text-[#003300]`}>
                    Quel est le sujet de votre demande&nbsp;?
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Création d'entreprise", 'Conseil réglementaire', 'ESG & conformité', 'Investissement', 'Autre'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSubject(s)}
                        className={`${poppins.className} rounded-[14px] px-5 py-3 text-[14px] font-medium text-[#003300] transition ${
                          selectedSubject === s
                            ? 'border border-[#003300] bg-[#DDE597]'
                            : 'bg-[#DDE597]/50 hover:bg-[#DDE597]/80'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact fields for booking */}
                <div className="space-y-3">
                  <p className={`${geist.className} text-[12px] font-semibold uppercase tracking-[0.18em] text-[#003300]/40`}>
                    Vos coordonnées
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input type="text" placeholder="Nom *" required value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className={`${geist.className} ${fieldCls}`} />
                    <input type="tel" placeholder="Téléphone *" required value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className={`${geist.className} ${fieldCls}`} />
                  </div>
                  <input type="email" placeholder="Votre email *" required value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={`${geist.className} ${fieldCls}`} />
                </div>

                {submitState === 'error' && submitMessage && (
                  <p className={`${geist.className} text-[13px] font-medium text-red-700`}>{submitMessage}</p>
                )}

                <button
                  type="button"
                  disabled={isSubmitting || !selectedDate || !form.name.trim() || !form.email.trim() || !form.phone.trim()}
                  onClick={handleBookingSubmit}
                  className={`${ebGaramond.className} flex h-[64px] w-[200px] items-center justify-center rounded-full bg-[#BBCB2E] text-[22px] font-bold text-[#003300] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  {isSubmitting ? 'Chargement...' : 'Soumettre'}
                </button>
              </div>

              {/* Right: Calendar */}
              <div className="flex flex-col rounded-[28px] border-2 border-[#003300] bg-white p-6 shadow-[4px_4px_0px_#003300] lg:rounded-[31px] lg:p-8">
                {/* Calendar header */}
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <span className={`${poppins.className} block text-[22px] font-normal text-[#003300] lg:text-[28px]`}>
                      calendrier
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                      <button type="button" onClick={() => changeMonth(-1)}
                        className="flex h-5 w-5 items-center justify-center text-[#003300] transition hover:opacity-60"
                        aria-label="Mois précédent">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                          <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <span className={`${poppins.className} text-[13px] font-semibold text-[#003300]`}>
                        {formatMonthLabel(displayedMonth)}
                      </span>
                      <button type="button" onClick={() => changeMonth(1)}
                        className="flex h-5 w-5 items-center justify-center text-[#003300] transition hover:opacity-60"
                        aria-label="Mois suivant">
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                          <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Time selector */}
                  <div className="flex items-center gap-1 rounded-[9px] bg-[#E0E5C0] px-3 py-2">
                    <div className="flex items-center gap-1">
                      <span className={`${poppins.className} flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#C1CB82] text-[16px] text-[#003300]`}>
                        {hourPart}
                      </span>
                      <span className={`${poppins.className} text-[16px] text-[#003300]`}>:</span>
                      <span className={`${poppins.className} flex h-8 w-8 items-center justify-center rounded-[7px] bg-[#C1CB82] text-[16px] text-[#003300]`}>
                        {minutePart}
                      </span>
                    </div>
                    <div className="ml-1 flex flex-col gap-[2px]">
                      <span className={`${poppins.className} flex h-5 w-7 items-center justify-center rounded-[5px] bg-[#C1CB82] text-[10px] font-medium text-[#003300] ${isMorning ? 'opacity-100' : 'opacity-40'}`}>AM</span>
                      <span className={`${poppins.className} flex h-5 w-7 items-center justify-center rounded-[5px] bg-[#C1CB82] text-[10px] font-medium text-[#003300] ${!isMorning ? 'opacity-100' : 'opacity-40'}`}>PM</span>
                    </div>
                    <div className="ml-1 flex flex-col gap-1">
                      <button type="button" onClick={() => moveTime(-1)} disabled={timeIndex === 0}
                        className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#C1CB82] text-[#003300] transition hover:brightness-95 disabled:opacity-40"
                        aria-label="Heure précédente">
                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <path d="M1 4L4 1L7 4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button type="button" onClick={() => moveTime(1)} disabled={timeIndex === timeOptions.length - 1}
                        className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#C1CB82] text-[#003300] transition hover:brightness-95 disabled:opacity-40"
                        aria-label="Heure suivante">
                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <path d="M1 1L4 4L7 1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    {/* Hidden select for accessibility */}
                    <label className="relative cursor-pointer">
                      <span className="sr-only">Choisir l&apos;heure</span>
                      <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0">
                        {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </label>
                  </div>
                </div>

                {/* Day headers */}
                <div className="mb-1 grid grid-cols-7 gap-1">
                  {daysOfWeek.map((d, i) => (
                    <div key={i} className="flex h-7 items-center justify-center">
                      <span className={`${poppins.className} text-[10px] font-semibold text-[#003300]/50`}>{d}</span>
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                {calendarWeeks.map((week, wi) => (
                  <div key={wi} className="grid grid-cols-7 gap-1">
                    {week.map((day, di) => {
                      if (day === null) return <div key={di} className="h-9 lg:h-[58px]" />;
                      const isSelected = day.iso === selectedDate;
                      return (
                        <button key={di} type="button"
                          onClick={() => !day.isUnavailable && setSelectedDate(day.iso)}
                          className={`${poppins.className} flex h-9 w-full items-center justify-center rounded-full text-[11px] transition lg:h-[56px] lg:text-[12.5px] ${
                            day.isUnavailable
                              ? 'border border-dashed border-[#B3C2B3] text-[#B3C2B3]'
                              : isSelected
                                ? 'bg-[#DDE597] font-semibold text-[#003300]'
                                : 'bg-[#EEF2CA] text-[#003300] hover:bg-[#E4ECA8]'
                          }`}
                          aria-label={`${day.day} ${monthLabels[displayedMonth.month]}`}
                          aria-pressed={isSelected}
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
        )}
      </div>

      {/* Success modal */}
      {showSuccess && (
        <div className="absolute inset-0 z-[320] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-[420px] rounded-[44px] bg-white px-8 py-10 text-center shadow-[0px_20px_70px_rgba(0,0,0,0.22)]">
            <div className="relative mx-auto mb-6 h-[100px] w-[140px]">
              <Image src="https://res.cloudinary.com/dmrtdo9z3/image/upload/v1776334091/rnj/layer-1-24-5765da83.svg"
                alt="Message envoyé" fill className="object-contain" />
            </div>
            <h2 className={`${ebGaramond.className} text-[clamp(28px,5vw,48px)] leading-[0.95] text-[#003300]`}>
              Votre message a été envoyé
            </h2>
            <p className={`${geist.className} mx-auto mt-4 max-w-[300px] text-[13px] leading-[1.5] text-[#003300]/60`}>
              Merci pour votre message. Nous l&apos;avons bien reçu et nous vous répondrons très prochainement.
            </p>
            <button type="button"
              onClick={() => { setShowSuccess(false); onClose(); }}
              className={`${geist.className} mt-6 inline-flex h-[52px] items-center justify-center rounded-full bg-[#BBCB2E] px-8 text-[17px] font-semibold text-[#003300] transition hover:brightness-95`}>
              Compris
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
