import { NextRequest, NextResponse } from 'next/server';
import { getLaravelApiUrl } from '@/lib/laravel-api';

const missingLaravelApiMessage =
  "L'API Laravel n'est pas configuree. Ajoutez LARAVEL_API_URL dans l'environnement du frontend.";

type LaravelInvoiceResponse = {
  message?: string;
  [key: string]: unknown;
} | null;

export async function POST(request: NextRequest) {
  const baseUrl = getLaravelApiUrl();

  if (!baseUrl) {
    return NextResponse.json({ message: missingLaravelApiMessage }, { status: 500 });
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { message: 'Le formulaire de facture est invalide.' },
      { status: 400 }
    );
  }

  const sessionId = formData.get('session_id');
  const invoiceFile = formData.get('invoice_file');

  if (typeof sessionId !== 'string' || sessionId.trim() === '') {
    return NextResponse.json(
      { message: 'Le parametre session_id est obligatoire.' },
      { status: 400 }
    );
  }

  if (!(invoiceFile instanceof File)) {
    return NextResponse.json(
      { message: 'Le fichier facture est obligatoire.' },
      { status: 422 }
    );
  }

  const outbound = new FormData();
  outbound.set('stripe_checkout_session_id', sessionId.trim());
  outbound.set('invoice_file', invoiceFile, invoiceFile.name || 'invoice-file');

  try {
    const response = await fetch(`${baseUrl}/bookings/invoice`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: outbound,
      cache: 'no-store',
    });

    const data = (await response.json().catch(() => null)) as LaravelInvoiceResponse;

    if (response.status === 404) {
      return NextResponse.json(
        {
          message:
            "Upload facture indisponible: la route backend /bookings/invoice est absente. Deployez les dernieres routes Laravel.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      data ?? { message: response.ok ? 'OK' : "Une erreur est survenue." },
      { status: response.status }
    );
  } catch {
    return NextResponse.json(
      { message: "Impossible de joindre l'API Laravel." },
      { status: 502 }
    );
  }
}
