import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getLaravelApiUrl, requestLaravelJson } from '@/lib/laravel-api';

const missingLaravelApiMessage =
  "L'API Laravel n'est pas configuree. Ajoutez LARAVEL_API_URL dans l'environnement du frontend.";
const checkoutSessionIdPattern = /^cs_[A-Za-z0-9_]+$/;

type LaravelStatusResponse = {
  message?: string;
  is_paid?: unknown;
  payment_status?: unknown;
  paid_at?: unknown;
  [key: string]: unknown;
} | null;

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error(
      "Stripe n'est pas configure. Ajoutez STRIPE_SECRET_KEY dans l'environnement du frontend."
    );
  }

  return new Stripe(secretKey);
}

function safeString(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isBookingMarkedPaid(payload: LaravelStatusResponse) {
  if (!isObjectRecord(payload)) {
    return false;
  }

  const status = safeString(payload.payment_status).toLowerCase();
  return payload.is_paid === true || status === 'paid';
}

function shouldAttemptStripeReconciliation(paymentStatus: string) {
  return (
    paymentStatus === '' ||
    paymentStatus === 'awaiting_payment' ||
    paymentStatus === 'pending' ||
    paymentStatus === 'unpaid' ||
    paymentStatus === 'open'
  );
}

function isStripeSessionPaid(session: Stripe.Checkout.Session) {
  const paymentStatus = safeString(session.payment_status).toLowerCase();
  const checkoutStatus = safeString(session.status).toLowerCase();
  const amountTotal = typeof session.amount_total === 'number' ? session.amount_total : null;

  // Treat no_payment_required as valid for free-checkout test flows.
  return (
    paymentStatus === 'paid' ||
    paymentStatus === 'no_payment_required' ||
    (checkoutStatus === 'complete' && amountTotal === 0)
  );
}

function validateCheckoutSessionId(sessionId: string) {
  const normalized = sessionId.trim();

  if (!normalized) {
    return 'Le parametre session_id est obligatoire.';
  }

  if (
    normalized.includes('{') ||
    normalized.includes('}') ||
    normalized.toUpperCase().includes('CHECKOUT_SESSION_ID')
  ) {
    return 'Session Stripe invalide. Relancez le paiement depuis la reservation.';
  }

  if (!checkoutSessionIdPattern.test(normalized)) {
    return 'Session Stripe invalide ou mal formee.';
  }

  return null;
}

function mapStripeFallbackError(error: unknown) {
  const message = error instanceof Error ? error.message : '';

  if (/No such checkout\.session/i.test(message) || /Invalid string/i.test(message)) {
    return {
      status: 422,
      message: 'Session Stripe invalide ou introuvable. Relancez le paiement.',
    };
  }

  if (message) {
    return {
      status: 502,
      message: `Verification Stripe impossible: ${message}`,
    };
  }

  return {
    status: 502,
    message: "Impossible de verifier le statut Stripe pour cette session.",
  };
}

function buildFallbackReference(session: Stripe.Checkout.Session) {
  const metadata = session.metadata ?? {};
  const bookingDate = safeString(metadata.booking_date).replaceAll('-', '') || 'UNKNOWNDATE';
  const bookingTime = safeString(metadata.booking_time).replaceAll(':', '') || 'UNKNOWNTIME';
  return `RNJ-${bookingDate}-${bookingTime}`;
}

async function buildStripeFallbackStatus(sessionId: string) {
  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const paymentStatus = safeString(session.payment_status).toLowerCase();
  const checkoutStatus = safeString(session.status).toLowerCase();
  const amountTotal = typeof session.amount_total === 'number' ? session.amount_total : null;
  const currency = safeString(session.currency) || 'eur';

  const isPaid = isStripeSessionPaid(session);

  const metadata = session.metadata ?? {};
  const bookingDate = safeString(metadata.booking_date) || null;
  const bookingTime = safeString(metadata.booking_time) || null;

  return {
    is_paid: isPaid,
    payment_status: paymentStatus || checkoutStatus || 'unknown',
    paid_at: null,
    booking: {
      subject: safeString(metadata.booking_subject) || 'Rendez-vous',
      preferred_date: bookingDate,
      preferred_time: bookingTime,
      payment_amount: amountTotal,
      payment_currency: currency,
      name: safeString(metadata.customer_name) || 'Client RNJ',
      email: safeString(session.customer_email) || 'Non renseigne',
      phone: 'Non renseigne',
      reference: buildFallbackReference(session),
    },
    invoice_upload: {
      uploaded: false,
      filename: null,
      uploaded_at: null,
    },
    source: 'stripe_fallback',
  };
}

async function fetchLaravelPaymentStatus(targetUrl: string) {
  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  const data = (await response.json().catch(() => null)) as LaravelStatusResponse;
  return { response, data };
}

async function syncLaravelBookingPaidFromStripeSession(session: Stripe.Checkout.Session) {
  const internalToken = process.env.INTERNAL_API_TOKEN?.trim();

  if (!internalToken) {
    return {
      synced: false,
      message:
        "Paiement confirme sur Stripe mais synchronisation interne indisponible (INTERNAL_API_TOKEN manquant).",
    };
  }

  const paymentIntentId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id ?? null;

  try {
    const { response, data } = await requestLaravelJson('/internal/bookings/payment-status', {
      payload: {
        stripe_checkout_session_id: session.id,
        payment_status: 'paid',
        stripe_payment_intent_id: paymentIntentId ?? undefined,
        payment_amount: session.amount_total ?? undefined,
        payment_currency: session.currency ?? undefined,
        paid_at: new Date().toISOString(),
      },
      headers: {
        'X-Internal-Token': internalToken,
      },
    });

    if (!response.ok) {
      return {
        synced: false,
        message:
          safeString(data?.message) ||
          'Paiement detecte sur Stripe mais echec de synchronisation backend.',
      };
    }

    return { synced: true, message: '' };
  } catch (error) {
    return {
      synced: false,
      message:
        error instanceof Error
          ? error.message
          : 'Paiement detecte sur Stripe mais erreur reseau lors de la synchronisation.',
    };
  }
}

async function reconcileAwaitingPaymentStatus(
  sessionId: string,
  targetUrl: string,
  payload: LaravelStatusResponse
) {
  if (!isObjectRecord(payload) || isBookingMarkedPaid(payload)) {
    return payload;
  }

  const paymentStatus = safeString(payload.payment_status).toLowerCase();

  if (!shouldAttemptStripeReconciliation(paymentStatus)) {
    return payload;
  }

  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (!isStripeSessionPaid(session)) {
    return payload;
  }

  const syncResult = await syncLaravelBookingPaidFromStripeSession(session);

  if (!syncResult.synced) {
    return {
      ...payload,
      message:
        syncResult.message ||
        'Paiement detecte sur Stripe. Synchronisation backend en cours, rechargez la page.',
    };
  }

  const refreshed = await fetchLaravelPaymentStatus(targetUrl);

  if (refreshed.response.ok && refreshed.data) {
    return refreshed.data;
  }

  return payload;
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id')?.trim();

  if (!sessionId) {
    return NextResponse.json(
      { message: 'Le parametre session_id est obligatoire.' },
      { status: 400 }
    );
  }

  const invalidSessionMessage = validateCheckoutSessionId(sessionId);

  if (invalidSessionMessage) {
    return NextResponse.json({ message: invalidSessionMessage }, { status: 422 });
  }

  const baseUrl = getLaravelApiUrl();

  if (!baseUrl) {
    return NextResponse.json({ message: missingLaravelApiMessage }, { status: 500 });
  }

  const targetUrl = `${baseUrl}/bookings/payment-status?stripe_checkout_session_id=${encodeURIComponent(sessionId)}`;

  try {
    const { response, data } = await fetchLaravelPaymentStatus(targetUrl);

    if (response.status === 404) {
      try {
        const fallbackPayload = await buildStripeFallbackStatus(sessionId);
        return NextResponse.json(fallbackPayload, { status: 200 });
      } catch (fallbackError) {
        const mapped = mapStripeFallbackError(fallbackError);
        return NextResponse.json({ message: mapped.message }, { status: mapped.status });
      }
    }

    if (response.ok) {
      try {
        const reconciledPayload = await reconcileAwaitingPaymentStatus(sessionId, targetUrl, data);
        return NextResponse.json(reconciledPayload ?? { message: 'OK' }, { status: 200 });
      } catch (reconciliationError) {
        return NextResponse.json(
          {
            ...(isObjectRecord(data) ? data : {}),
            message:
              reconciliationError instanceof Error
                ? reconciliationError.message
                : 'Verification Stripe en cours.',
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      data ?? { message: response.ok ? 'OK' : "Une erreur est survenue." },
      { status: response.status }
    );
  } catch {
    try {
      const fallbackPayload = await buildStripeFallbackStatus(sessionId);
      return NextResponse.json(fallbackPayload, { status: 200 });
    } catch (fallbackError) {
      const mapped = mapStripeFallbackError(fallbackError);
      return NextResponse.json({ message: mapped.message }, { status: mapped.status });
    }
  }
}
