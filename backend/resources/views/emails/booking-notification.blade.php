<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Nouveau rendez-vous RNJ Advisory</title>
</head>
<body style="margin:0; padding:24px; background:#f5f7f3; color:#163016; font-family:Arial, Helvetica, sans-serif;">
    <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:16px; padding:32px; border:1px solid #d9e5d0;">
        <p style="margin:0 0 8px; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:#406640;">
            RNJ Advisory
        </p>
        <h1 style="margin:0 0 20px; font-size:28px; line-height:1.1;">
            Nouveau rendez-vous paye
        </h1>

        <p style="margin:0 0 18px; font-size:15px; line-height:1.6;">
            Un nouveau rendez-vous a ete confirme avec paiement Stripe.
        </p>

        <table style="width:100%; border-collapse:collapse; font-size:15px; line-height:1.6;">
            <tr>
                <td style="padding:8px 0; font-weight:bold; width:180px;">Nom</td>
                <td style="padding:8px 0;">{{ $booking->name }}</td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Email</td>
                <td style="padding:8px 0;">{{ $booking->email }}</td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Telephone</td>
                <td style="padding:8px 0;">{{ $booking->phone }}</td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Societe</td>
                <td style="padding:8px 0;">{{ $booking->company ?: 'Non renseignee' }}</td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Sujet</td>
                <td style="padding:8px 0;">{{ $booking->subject }}</td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Date souhaitee</td>
                <td style="padding:8px 0;">{{ $booking->preferred_date?->format('d/m/Y') }}</td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Heure souhaitee</td>
                <td style="padding:8px 0;">{{ $booking->preferred_time ?: 'A confirmer' }}</td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Paiement</td>
                <td style="padding:8px 0;">
                    {{ $booking->payment_amount ? number_format($booking->payment_amount / 100, 2, ',', ' ') : '500,00' }}
                    {{ strtoupper((string) ($booking->payment_currency ?: 'eur')) }}
                    · {{ $booking->payment_status }}
                </td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Confirme le</td>
                <td style="padding:8px 0;">{{ $booking->paid_at?->format('d/m/Y H:i') ?: now()->format('d/m/Y H:i') }}</td>
            </tr>
        </table>

        <div style="margin-top:24px; padding:18px; background:#f5f7f3; border-radius:12px;">
            <p style="margin:0 0 8px; font-size:13px; font-weight:bold; text-transform:uppercase; color:#406640;">
                Message
            </p>
            <p style="margin:0; white-space:pre-line; font-size:15px; line-height:1.7;">{{ $booking->message ?: 'Aucun message complementaire.' }}</p>
        </div>
    </div>
</body>
</html>
