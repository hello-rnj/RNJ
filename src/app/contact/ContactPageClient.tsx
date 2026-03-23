'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitState('idle');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') || ''),
      phone: String(formData.get('phone') || ''),
      email: String(formData.get('email') || ''),
      company: String(formData.get('company') || ''),
      subject: String(formData.get('subject') || ''),
      message: String(formData.get('message') || ''),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "L'envoi du message a échoué.");
      }

      setSubmitState('success');
      setSubmitMessage('');
      setShowSuccessModal(true);
      form.reset();
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(
        error instanceof Error ? error.message : "Une erreur est survenue pendant l'envoi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main
        className={`relative min-h-screen w-full overflow-x-hidden bg-[#F7FCFF] ${
          showSuccessModal ? 'pointer-events-none select-none' : ''
        }`}
      >
        <Navbar />

        <section className="relative h-[500px] w-full md:h-[700px] lg:h-[836px]">
          <div className="absolute inset-0 w-full bg-[#BBCB2E]" />
          <Image
            src="/Frame 391.svg"
            alt="Contact hero background"
            fill
            className="object-cover"
            style={{ width: '100%', height: '100%' }}
          />

          <div className="absolute left-1/2 top-[120px] flex w-full max-w-[964px] -translate-x-1/2 flex-col items-center px-4 md:top-[200px] md:px-8 lg:top-[279px]">
            <h1
              className="mb-4 text-center font-['EB_Garamond'] font-bold text-white"
              style={{ fontSize: 'clamp(32px, 5vw, 70px)', lineHeight: '1.1' }}
            >
              Contactez RNJ Advisory
            </h1>
            <p
              className="max-w-[800px] text-center font-[Geist] font-medium text-white"
              style={{ fontSize: 'clamp(16px, 2vw, 24px)', lineHeight: '1.4' }}
            >
              Notre équipe d&apos;experts est à votre disposition pour vous accompagner dans vos
              projets stratégiques et réglementaires.
            </p>
          </div>
        </section>

        <section className="relative w-full py-16 md:py-24">
          <div className="mx-auto max-w-[800px] px-4">
            <div className="mx-auto w-full max-w-[600px]">
              <div className="rounded-[20px] bg-white p-8 shadow-lg">
                <h2
                  className="mb-6 font-['EB_Garamond'] font-bold text-[#003300]"
                  style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
                >
                  Envoyez-nous un message
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                      name="name"
                      type="text"
                      placeholder="Nom*"
                      required
                      className="h-[48px] w-full rounded-[10px] border-2 border-transparent bg-[#F0F3F0] px-4 font-[Geist] text-[14px] font-medium text-[#003300] outline-none transition-colors placeholder:opacity-40 focus:border-[#BBCB2E]"
                    />
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Téléphone*"
                      required
                      className="h-[48px] w-full rounded-[10px] border-2 border-transparent bg-[#F0F3F0] px-4 font-[Geist] text-[14px] font-medium text-[#003300] outline-none transition-colors placeholder:opacity-40 focus:border-[#BBCB2E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                      name="email"
                      type="email"
                      placeholder="Email*"
                      required
                      className="h-[48px] w-full rounded-[10px] border-2 border-transparent bg-[#F0F3F0] px-4 font-[Geist] text-[14px] font-medium text-[#003300] outline-none transition-colors placeholder:opacity-40 focus:border-[#BBCB2E]"
                    />
                    <input
                      name="company"
                      type="text"
                      placeholder="Société"
                      className="h-[48px] w-full rounded-[10px] border-2 border-transparent bg-[#F0F3F0] px-4 font-[Geist] text-[14px] font-medium text-[#003300] outline-none transition-colors placeholder:opacity-40 focus:border-[#BBCB2E]"
                    />
                  </div>

                  <input
                    name="subject"
                    type="text"
                    placeholder="Sujet*"
                    required
                    className="h-[48px] w-full rounded-[10px] border-2 border-transparent bg-[#F0F3F0] px-4 font-[Geist] text-[14px] font-medium text-[#003300] outline-none transition-colors placeholder:opacity-40 focus:border-[#BBCB2E]"
                  />

                  <textarea
                    name="message"
                    placeholder="Votre message*"
                    required
                    className="h-[120px] w-full resize-none rounded-[10px] border-2 border-transparent bg-[#F0F3F0] px-4 py-3 font-[Geist] text-[14px] font-medium text-[#003300] outline-none transition-colors placeholder:opacity-40 focus:border-[#BBCB2E]"
                  />

                  {submitState === 'error' && submitMessage ? (
                    <p className="font-[Geist] text-[14px] font-medium text-[#9b1c1c]">
                      {submitMessage}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[50px] w-full rounded-[10px] bg-[#BBCB2E] font-['EB_Garamond'] text-[20px] font-bold text-[#003300] transition-colors hover:bg-[#a8b829] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <div className="h-[60px] md:h-[100px]" />

        <Footer />
      </main>

      {showSuccessModal ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(0,0,0,0.22)] px-4 backdrop-blur-sm">
          <div className="w-full max-w-[360px] rounded-[44px] bg-white px-7 py-8 text-center shadow-[0px_20px_70px_rgba(0,0,0,0.22)] md:max-w-[520px] md:rounded-[70px] md:px-14 md:py-12">
            <div className="mx-auto mb-6 relative h-[88px] w-[120px] md:mb-8 md:h-[150px] md:w-[205px]">
              <Image
                src="/Layer 1 (24).svg"
                alt="Message envoyé"
                fill
                className="object-contain"
              />
            </div>

            <h2 className="mx-auto max-w-[280px] font-['EB_Garamond'] text-[34px] leading-[0.96] text-[#003300] md:max-w-[420px] md:text-[64px] md:leading-[0.92]">
              Votre Message A Été Envoyé
            </h2>

            <p className="mx-auto mt-4 max-w-[250px] font-[Geist] text-[11px] leading-[1.45] text-[#003300] md:mt-6 md:max-w-[360px] md:text-[15px] md:leading-[22px]">
              Merci pour votre message. Nous l&apos;avons bien reçu et nous vous répondrons très
              prochainement.
            </p>

            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="mt-7 inline-flex h-[54px] items-center justify-center rounded-full bg-[#BBCB2E] px-8 font-[Geist] text-[18px] font-semibold text-white transition hover:bg-[#a8b829] md:mt-10 md:h-[72px] md:px-12 md:text-[24px]"
            >
              Compris
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
