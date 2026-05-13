'use client';

import { FormEvent, useState } from 'react';
import { EB_Garamond, Geist } from 'next/font/google';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

type FormData = {
  name: string;
  phone: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};

const emptyForm: FormData = {
  name: '',
  phone: '',
  email: '',
  company: '',
  subject: '',
  message: '',
};

type ContactFormFigmaCardProps = {
  onBack?: () => void;
  onSubmit?: (data: FormData) => void | Promise<void>;
  onRequestAppointment?: () => void;
  isSubmitting?: boolean;
};

export default function ContactFormFigmaCard({
  onBack,
  onSubmit,
  onRequestAppointment,
  isSubmitting = false,
}: ContactFormFigmaCardProps) {
  const [form, setForm] = useState<FormData>(emptyForm);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onSubmit) {
      await onSubmit(form);
    }
  }

  return (
    <div
      className="relative bg-white shadow-[0px_3.42233px_47.9982px_rgba(0,0,0,0.25)] rounded-[42.7791px] overflow-hidden px-3 py-5 sm:px-6 sm:py-8 lg:px-10 lg:py-10"
    >
      <div className="relative z-10 flex w-full justify-center">
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
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className={`${geist.className} inline-flex h-11 items-center justify-center rounded-full border border-[#003300]/15 px-4 text-[13px] font-semibold text-[#003300] transition hover:bg-[#F0F3F0]`}
              >
                Retour
              </button>
            )}
          </div>
          <form className="space-y-0" onSubmit={handleSubmit}>
            <div className="grid gap-[8.56px] md:grid-cols-2">
              <input
                placeholder="Nom *"
                className={`${geist.className} h-[56px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-4 py-3 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 sm:h-[70px] sm:px-6 sm:py-4 sm:text-[18px] md:h-[83.76px] md:px-[31.66px] md:py-[30.80px] md:text-[20.53px]`}
                required
                type="text"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
              <input
                placeholder="(+32) Telephone *"
                className={`${geist.className} h-[56px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-4 py-3 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 sm:h-[70px] sm:px-6 sm:py-4 sm:text-[18px] md:h-[83.76px] md:px-[31.66px] md:py-[30.80px] md:text-[20.53px]`}
                required
                type="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </div>
            <div className="grid gap-[8.56px] md:grid-cols-2">
              <input
                placeholder="Votre email *"
                className={`${geist.className} h-[56px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-4 py-3 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 sm:h-[70px] sm:px-6 sm:py-4 sm:text-[18px] md:h-[83.76px] md:px-[31.66px] md:py-[30.80px] md:text-[20.53px]`}
                required
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
              <input
                placeholder="Votre societe"
                className={`${geist.className} h-[56px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-4 py-3 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 sm:h-[70px] sm:px-6 sm:py-4 sm:text-[18px] md:h-[83.76px] md:px-[31.66px] md:py-[30.80px] md:text-[20.53px]`}
                type="text"
                value={form.company}
                onChange={(e) => updateField('company', e.target.value)}
              />
            </div>
            <input
              placeholder="Sujet *"
              className={`${geist.className} h-[56px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-4 py-3 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 sm:h-[70px] sm:px-6 sm:py-4 sm:text-[18px] md:h-[88.19px] md:px-[31.66px] md:py-[30.80px] md:text-[20.53px]`}
              required
              type="text"
              value={form.subject}
              onChange={(e) => updateField('subject', e.target.value)}
            />
            <textarea
              placeholder="Votre question *"
              className={`${geist.className} h-[140px] w-full rounded-[12.83px] border border-transparent bg-[#F0F3F0] px-4 py-3 text-[15px] font-medium text-[#003300] outline-none transition placeholder:text-[#003300]/40 focus:border-[#BBCB2E] focus:bg-white focus:ring-2 focus:ring-[#BBCB2E]/30 resize-none sm:h-[170px] sm:px-6 sm:py-4 sm:text-[18px] md:h-[204.57px] md:px-[31.66px] md:py-[30.80px] md:text-[20.53px]`}
              required
              value={form.message}
              onChange={(e) => updateField('message', e.target.value)}
            />
            <div className="grid gap-[8.56px] md:grid-cols-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${ebGaramond.className} flex h-[56px] w-full items-center justify-center rounded-[12.83px] bg-[#BBCB2E] text-[20px] font-bold leading-tight text-[#003300] transition hover:bg-[#dde597] disabled:cursor-not-allowed disabled:opacity-60 sm:h-[70px] sm:text-[28px] md:h-[88.19px] md:px-[36.79px] md:py-[22.25px] md:text-[34.22px] md:leading-[35px]`}
              >
                {isSubmitting ? 'Envoi...' : 'Soumettre'}
              </button>
              <button
                type="button"
                onClick={onRequestAppointment}
                className={`${ebGaramond.className} flex h-[56px] w-full items-center justify-center rounded-[12.83px] bg-[#003300] text-[20px] font-bold leading-tight text-[#BBCB2E] transition hover:bg-[#004400] sm:h-[70px] sm:text-[28px] md:h-[88.19px] md:px-[36.79px] md:py-[22.25px] md:text-[34.22px] md:leading-[35px]`}
              >
                Rendez-vous
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
