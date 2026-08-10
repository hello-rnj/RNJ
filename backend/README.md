# Back-office RNJ Advisory

Application Laravel qui reçoit les demandes du site public, gère les
réservations de rendez-vous et génère les factures.

Elle n'est pas exposée directement : le site Next.js l'appelle sur le réseau
interne, et seul l'écran d'administration est accessible à un humain.

## Écrans d'administration

Accessibles après connexion sur `/login`.

| Route | Rôle |
| --- | --- |
| `/admin` | Tableau de bord |
| `/admin/contacts` | Messages reçus par le formulaire de contact |
| `/admin/bookings` | Réservations et leur statut de paiement |
| `/admin/bookings/{id}/invoice` | Facture d'une réservation |

## API appelée par le site

| Route | Rôle |
| --- | --- |
| `POST /api/contacts` | Enregistre un message du formulaire |
| `POST /api/bookings` | Crée une réservation |
| `GET /api/bookings/payment-status` | État du paiement d'une réservation |
| `POST /api/bookings/invoice` | Génère la facture |
| `POST /api/internal/bookings/payment-status` | Mise à jour après notification Stripe |

Ces routes sont protégées par `INTERNAL_API_TOKEN`, un secret partagé qui doit
porter **la même valeur** ici et dans le fichier d'environnement du site. Une
valeur divergente fait rejeter tous les appels entre les deux applications.

## Configuration

```bash
cp .env.example .env
php artisan key:generate
php artisan migrate
```

Renseignez ensuite la base de données, l'envoi de courriel et
`INTERNAL_API_TOKEN`. Le fichier `.env` n'est jamais versionné.

## Lancer

En développement :

```bash
php artisan serve
```

En production, l'application tourne dans le conteneur `backend` défini par le
`docker-compose.yml` à la racine du projet. Voir le README principal.
