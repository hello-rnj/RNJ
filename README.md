This repository now contains:

- A public [Next.js](https://nextjs.org) frontend in the project root
- A Laravel admin/backend in [`backend`](./backend)
- A MySQL database wired through `docker-compose.yml`

## Getting Started

## Frontend only

First, run the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the public site.

## Full stack with Docker Compose

The stack includes:

- Frontend: `http://localhost:3000`
- Laravel admin: `http://localhost:8000/login`
- MySQL: `localhost:3306`

Start everything with:

```bash
docker compose up --build
```

Default admin credentials are injected through Docker Compose:

- Email: `admin@rnj-advisory.be`
- Password: `change-me-please`

Change those values in [`docker-compose.yml`](./docker-compose.yml) before production use.

The frontend proxies `/api/contact` and `/api/bookings` to Laravel using `LARAVEL_API_URL`.

## Stripe rendez-vous payment

The booking flow can redirect clients to Stripe Checkout for a fixed 200 EUR rendez-vous payment before the booking is marked as paid.

Add these variables to the frontend environment:

```bash
LARAVEL_API_URL=http://backend:8000/api
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
INTERNAL_API_TOKEN=change-this-shared-secret
```

Add the same shared secret to the Laravel backend environment:

```bash
INTERNAL_API_TOKEN=change-this-shared-secret
```

Then configure a Stripe webhook to send these events to your frontend deployment:

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

Webhook URL:

```bash
https://your-frontend-domain/api/stripe/webhook
```

## Cloudinary asset migration

To migrate referenced `public/` images to Cloudinary and rewrite the codebase to the returned CDN URLs:

1. Add these variables to your environment:

```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=rnj
CLOUDINARY_SITE_ORIGIN=https://rnj-advisory.be
```

2. Run a dry scan first:

```bash
npm run cloudinary:scan-assets
```

3. Run the real migration:

```bash
npm run cloudinary:migrate-assets
```

The script:

- scans `src/` for referenced local image paths
- uploads the matching `public/` assets to Cloudinary
- rewrites the source files to use the returned `secure_url`
- saves a manifest to `cloudinary-assets-manifest.json`

## Production notes

For the current Docker deployment on the server, rebuild and relaunch with:

```bash
sudo docker-compose up -d --build
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
