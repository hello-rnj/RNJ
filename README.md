# RNJ Advisory

Site public et back-office de [rnj-advisory.be](https://rnj-advisory.be), cabinet
de conseil juridique et stratégique à Bruxelles.

Le dépôt contient les trois parties de l'application :

| Dossier | Rôle | Technologie |
| --- | --- | --- |
| `src/`, `public/` | Site public | Next.js 16 (App Router) |
| `backend/` | Back-office : réservations, factures, paiements | Laravel |
| — | Base de données | MySQL 8.4 (via Docker) |

Le site est en français, servi depuis la Belgique, et couvre neuf articles de
blog, quatre pages de services, une carte de projets interactive et un tunnel de
prise de rendez-vous payant.

## Démarrer

### Tout l'environnement (recommandé)

```bash
docker compose up --build
```

- Site public : http://localhost:3000
- Back-office : http://localhost:8000/login
- Base de données : localhost:3306

Les identifiants d'administration par défaut sont définis dans
`docker-compose.yml`. **Changez-les avant toute mise en production.**

### Le site seul

```bash
npm install
npm run dev
```

Le back-office et la base de données ne seront pas disponibles : le formulaire de
contact et la prise de rendez-vous échoueront, puisqu'ils appellent Laravel.

## Configuration

Copiez `.env.example` vers `.env.production` et renseignez les valeurs.

| Variable | Rôle |
| --- | --- |
| `SITE_URL` | URL publique, utilisée pour les liens absolus et le référencement |
| `LARAVEL_API_URL` | Adresse interne du back-office (`http://backend:8000/api` sous Docker) |
| `INTERNAL_API_TOKEN` | Secret partagé entre le site et Laravel ; **la même valeur des deux côtés** |
| `STRIPE_SECRET_KEY` | Clé Stripe pour le paiement des rendez-vous |
| `STRIPE_WEBHOOK_SECRET` | Signature des notifications Stripe |
| `CLOUDINARY_SITE_ORIGIN` | Origine utilisée pour construire les URL d'images |

Le back-office a son propre `backend/.env`, à créer depuis `backend/.env.example`.

Aucun de ces fichiers n'est versionné : ils contiennent des secrets.

## Prise de rendez-vous et paiement

Le tunnel redirige vers Stripe Checkout pour un acompte fixe de **500 EUR** avant
de marquer la réservation comme payée. Le montant est défini à un seul endroit,
dans `src/lib/booking.ts`.

Configurez un webhook Stripe vers `https://<votre-domaine>/api/stripe/webhook`
pour les événements :

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

Les routes API du site relaient vers Laravel :

```
/api/contact                  formulaire de contact
/api/bookings                 création d'une réservation
/api/bookings/checkout        ouverture de la session Stripe
/api/bookings/payment-status  vérification du paiement
/api/bookings/invoice         génération de la facture
/api/stripe/webhook           notifications Stripe
```

## Déploiement

Le serveur de production fait tourner l'application en conteneurs. Après une
modification du site :

```bash
npm run build
docker compose build frontend
docker compose up -d frontend
```

Le dossier `public/` est monté depuis l'hôte : une image ajoutée y est servie
sans reconstruire l'image Docker. En revanche, toute modification de `src/`
exige la reconstruction ci-dessus — sans quoi le site continue de servir la
version précédente.

## Images

Les visuels sont servis depuis `public/optimized/` et, pour une partie, depuis
Cloudinary. Avant d'ajouter une image, convertissez-la : les sources d'appareil
photo dépassent souvent 10 Mo, contre quelques dizaines de kilo-octets une fois
converties.

```bash
convert source.jpg -resize 2400x -strip -quality 82 public/optimized/cible.webp
```

## Vérifications avant de livrer

```bash
npx tsc --noEmit   # types
npm run lint       # code mort, règles React
npm run build      # compilation complète
```
