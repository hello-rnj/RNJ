import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { requestLaravelJson } from '@/lib/laravel-api';

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "Stripe n'est pas configure. Ajoutez STRIPE_SECRET_KEY dans l'environnement du frontend."
    );
  }

  return new Stripe(secretKey);
}

async function syncBookingPayment(
  session: Stripe.Checkout.Session,
  paymentStatus: 'paid' | 'failed'
) {
  const internalToken = process.env.INTERNAL_API_TOKEN;

  if (!internalToken) {
    throw new Error(
      "Le token interne n'est pas configure. Ajoutez INTERNAL_API_TOKEN dans les environnements frontend et backend."
    );
  }

  const paymentIntentId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  const { response, data } = await requestLaravelJson('/internal/bookings/payment-status', {
    payload: {
      stripe_checkout_session_id: session.id,
      payment_status: paymentStatus,
      stripe_payment_intent_id: paymentIntentId,
      payment_amount: session.amount_total ?? undefined,
      payment_currency: session.currency ?? undefined,
      paid_at: paymentStatus === 'paid' ? new Date().toISOString() : undefined,
    },
    headers: {
      'X-Internal-Token': internalToken,
    },
  });

  if (!response.ok) {
    throw new Error(
      typeof data?.message === 'string'
        ? data.message
        : 'La synchronisation du paiement Stripe avec Laravel a echoue.'
    );
  }
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { message: 'Ajoutez STRIPE_WEBHOOK_SECRET pour verifier les webhooks Stripe.' },
      { status: 500 }
    );
  }

  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ message: 'Signature Stripe manquante.' }, { status: 400 });
  }

  const payload = await request.text();
  const stripe = getStripeClient();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : 'Signature Stripe invalide pour ce webhook.',
      },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded':
        await syncBookingPayment(event.data.object as Stripe.Checkout.Session, 'paid');
        break;
      case 'checkout.session.async_payment_failed':
        await syncBookingPayment(event.data.object as Stripe.Checkout.Session, 'failed');
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Le webhook Stripe n'a pas pu synchroniser le rendez-vous.",
      },
      { status: 500 }
    );
  }
}
