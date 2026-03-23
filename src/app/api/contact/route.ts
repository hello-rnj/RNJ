import { NextRequest, NextResponse } from 'next/server';

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  company?: string;
  subject?: string;
  message?: string;
};

function normalize(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(request: NextRequest) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL || 'nahla.jelalia@rnj-advisory.be';
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !contactFromEmail) {
    return NextResponse.json(
      {
        message:
          "Le formulaire n'est pas encore configuré pour la production. Ajoutez RESEND_API_KEY et CONTACT_FROM_EMAIL dans l'environnement du site.",
      },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as ContactPayload;

    const payload = {
      name: normalize(body.name),
      phone: normalize(body.phone),
      email: normalize(body.email),
      company: normalize(body.company),
      subject: normalize(body.subject),
      message: normalize(body.message),
    };

    if (!payload.name || !payload.phone || !payload.email || !payload.subject || !payload.message) {
      return NextResponse.json(
        { message: 'Merci de remplir tous les champs obligatoires.' },
        { status: 400 }
      );
    }

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;color:#003300;line-height:1.6">
        <h2 style="margin:0 0 16px">Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(payload.phone)}</p>
        <p><strong>Email :</strong> ${escapeHtml(payload.email)}</p>
        <p><strong>Société :</strong> ${escapeHtml(payload.company || '-')}</p>
        <p><strong>Sujet :</strong> ${escapeHtml(payload.subject)}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        subject: `Nouveau message contact: ${payload.subject}`,
        html: emailHtml,
        text: [
          'Nouveau message de contact',
          `Nom: ${payload.name}`,
          `Téléphone: ${payload.phone}`,
          `Email: ${payload.email}`,
          `Société: ${payload.company || '-'}`,
          `Sujet: ${payload.subject}`,
          '',
          payload.message,
        ].join('\n'),
        reply_to: payload.email,
      }),
      cache: 'no-store',
    });

    const result = (await response.json().catch(() => null)) as
      | { id?: string; message?: string; name?: string }
      | null;

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            result?.message ||
            "Le service d'envoi a refusé le message. Vérifiez la configuration email du site.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: 'Votre message a bien été envoyé.',
    });
  } catch {
    return NextResponse.json(
      { message: "Une erreur est survenue pendant l'envoi du message." },
      { status: 500 }
    );
  }
}
