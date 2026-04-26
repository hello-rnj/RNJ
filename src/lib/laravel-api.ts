import { NextRequest, NextResponse } from 'next/server';

const missingLaravelApiMessage =
  "L'API Laravel n'est pas configuree. Ajoutez LARAVEL_API_URL dans l'environnement du frontend.";

export type LaravelApiResponse =
  | {
      message?: string;
      errors?: Record<string, string[]>;
      [key: string]: unknown;
    }
  | null;

export function getLaravelApiUrl() {
  const baseUrl = process.env.LARAVEL_API_URL;
  return baseUrl ? baseUrl.replace(/\/$/, '') : null;
}

export async function requestLaravelJson(
  path: string,
  options?: {
    method?: 'POST' | 'PATCH';
    payload?: unknown;
    headers?: HeadersInit;
  }
) {
  const baseUrl = getLaravelApiUrl();

  if (!baseUrl) {
    throw new Error(missingLaravelApiMessage);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method: options?.method ?? 'POST',
    headers: {
      Accept: 'application/json',
      ...(options?.payload !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...options?.headers,
    },
    ...(options?.payload !== undefined ? { body: JSON.stringify(options.payload) } : {}),
    cache: 'no-store',
  });

  const data = (await response.json().catch(() => null)) as LaravelApiResponse;

  return { response, data };
}

export async function forwardToLaravel(request: NextRequest, path: string) {
  const baseUrl = getLaravelApiUrl();

  if (!baseUrl) {
    return NextResponse.json(
      { message: missingLaravelApiMessage },
      { status: 500 }
    );
  }

  try {
    const payload = await request.json();
    const { response, data } = await requestLaravelJson(path, { payload });

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
