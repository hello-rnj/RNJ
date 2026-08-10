<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Nouveau contact RNJ Advisory</title>
</head>
<body style="margin:0; padding:24px; background:#f5f7f3; color:#163016; font-family:Arial, Helvetica, sans-serif;">
    <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:16px; padding:32px; border:1px solid #d9e5d0;">
        <p style="margin:0 0 8px; font-size:12px; letter-spacing:0.12em; text-transform:uppercase; color:#406640;">
            RNJ Advisory
        </p>
        <h1 style="margin:0 0 20px; font-size:28px; line-height:1.1;">
            Nouveau message de contact
        </h1>

        <p style="margin:0 0 18px; font-size:15px; line-height:1.6;">
            Un nouveau message vient d'etre envoye depuis le formulaire de contact du site.
        </p>

        <table style="width:100%; border-collapse:collapse; font-size:15px; line-height:1.6;">
            <tr>
                <td style="padding:8px 0; font-weight:bold; width:180px;">Nom</td>
                <td style="padding:8px 0;">{{ $contact->name }}</td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Email</td>
                <td style="padding:8px 0;">{{ $contact->email }}</td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Telephone</td>
                <td style="padding:8px 0;">{{ $contact->phone }}</td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Societe</td>
                <td style="padding:8px 0;">{{ $contact->company ?: 'Non renseignee' }}</td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Sujet</td>
                <td style="padding:8px 0;">{{ $contact->subject }}</td>
            </tr>
            <tr>
                <td style="padding:8px 0; font-weight:bold;">Recu le</td>
                <td style="padding:8px 0;">{{ $contact->created_at?->format('d/m/Y H:i') ?: now()->format('d/m/Y H:i') }}</td>
            </tr>
        </table>

        <div style="margin-top:24px; padding:18px; background:#f5f7f3; border-radius:12px;">
            <p style="margin:0 0 8px; font-size:13px; font-weight:bold; text-transform:uppercase; color:#406640;">
                Message
            </p>
            <p style="margin:0; white-space:pre-line; font-size:15px; line-height:1.7;">{{ $contact->message }}</p>
        </div>
    </div>
</body>
</html>
