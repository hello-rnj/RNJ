import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { requestLaravelJson } from '@/lib/laravel-api';
import { BOOKING_FEE_CENTS } from '@/lib/booking';

const BOOKING_PRICE_CENTS = BOOKING_FEE_CENTS;
const BOOKING_CURRENCY = 'eur';
const BOOKING_PRODUCT_NAME = 'Frais de dossier RNJ Advisory';

type BookingCheckoutPayload = {
  name: string;
  phone: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  preferred_date: string;
  preferred_time?: string;
  profile: string;
};

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "Stripe n'est pas configure. Ajoutez STRIPE_SECRET_KEY dans l'environnement du frontend."
    );
  }

  return new Stripe(secretKey);
}

function getPublicSiteUrl(request: NextRequest) {
  const configuredUrl =
    process.env.SITE_URL?.trim() || process.env.CLOUDINARY_SITE_ORIGIN?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  return request.nextUrl.origin;
}

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function parseBookingPayload(payload: unknown): BookingCheckoutPayload | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const record = payload as Record<string, unknown>;
  const normalizedPayload: BookingCheckoutPayload = {
    name: normalizeText(record.name),
    phone: normalizeText(record.phone),
    email: normalizeText(record.email),
    company: normalizeText(record.company),
    subject: normalizeText(record.subject),
    message: normalizeText(record.message),
    preferred_date: normalizeText(record.preferred_date),
    preferred_time: normalizeText(record.preferred_time) || '15:00',
    profile: normalizeText(record.profile) || 'other',
  };

  if (
    !normalizedPayload.name ||
    !normalizedPayload.phone ||
    !normalizedPayload.email ||
    !normalizedPayload.subject ||
    !normalizedPayload.message ||
    !normalizedPayload.preferred_date
  ) {
    return null;
  }

  return normalizedPayload;
}

export async function POST(request: NextRequest) {
  let rawPayload: unknown;

  try {
    rawPayload = await request.json();
  } catch {
    return NextResponse.json({ message: 'Le formulaire de rendez-vous est invalide.' }, { status: 400 });
  }

  const payload = parseBookingPayload(rawPayload);

  if (!payload) {
    return NextResponse.json(
      { message: 'Merci de completer tous les champs obligatoires du rendez-vous.' },
      { status: 422 }
    );
  }

  try {
    const stripe = getStripeClient();
    const siteUrl = getPublicSiteUrl(request);
    const successUrl = new URL('/contact', siteUrl);
    successUrl.searchParams.set('payment', 'success');

    const cancelUrl = new URL('/contact', siteUrl);
    cancelUrl.searchParams.set('payment', 'cancelled');

    // Déterminer le montant selon le profil
    const priceCents = payload.profile === 'institution' ? 50000 : 20000;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: payload.email,
      billing_address_collection: 'auto',
      success_url: successUrl.toString(),
      cancel_url: cancelUrl.toString(),
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: BOOKING_CURRENCY,
            unit_amount: priceCents,
            product_data: {
              name: BOOKING_PRODUCT_NAME,
              description: `Frais de dossier pour le rendez-vous du ${payload.preferred_date} a ${payload.preferred_time ?? '15:00'}`,
            },
          },
        },
      ],
      metadata: {
        booking_subject: payload.subject.slice(0, 255),
        booking_date: payload.preferred_date,
        booking_time: (payload.preferred_time ?? '15:00').slice(0, 50),
        customer_name: payload.name.slice(0, 255),
        booking_profile: payload.profile || 'other',
      },
    });

    const { response, data } = await requestLaravelJson('/bookings', {
      payload: {
        ...payload,
        stripe_checkout_session_id: session.id,
      },
    });

    if (!response.ok) {
      await stripe.checkout.sessions.expire(session.id).catch(() => undefined);

      return NextResponse.json(
        data ?? { message: "Impossible d'enregistrer votre demande de rendez-vous." },
        { status: response.status }
      );
    }

    if (!session.url) {
      return NextResponse.json(
        { message: "Stripe n'a pas retourne d'URL de paiement." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Impossible de lancer le paiement Stripe pour le rendez-vous.",
      },
      { status: 500 }
    );
  }
}
