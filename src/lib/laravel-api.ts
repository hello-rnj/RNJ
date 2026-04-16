import { NextRequest, NextResponse } from 'next/server';

function getLaravelApiUrl() {
  const baseUrl = process.env.LARAVEL_API_URL;
  return baseUrl ? baseUrl.replace(/\/$/, '') : null;
}

export async function forwardToLaravel(request: NextRequest, path: string) {
  const baseUrl = getLaravelApiUrl();

  if (!baseUrl) {
    return NextResponse.json(
      {
        message:
          "L'API Laravel n'est pas configuree. Ajoutez LARAVEL_API_URL dans l'environnement du frontend.",
      },
      { status: 500 }
    );
  }

  try {
    const payload = await request.json();
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const data = (await response.json().catch(() => null)) as
      | { message?: string; errors?: Record<string, string[]> }
      | null;

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
