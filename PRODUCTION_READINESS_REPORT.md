# RNJ Advisory — Production Readiness Report

> **Audience:** Senior full-stack developer  
> **Scope:** Home page, Contact page, À Propos (About) page, VPS Docker deployment  
> **Date:** 2026-05-13  
> **Status:** ⚠️ **Not production-ready** — multiple critical issues identified

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Frontend Performance & Code Quality](#2-frontend-performance--code-quality)
3. [Docker & Containerization](#3-docker--containerization)
4. [Backend Architecture](#4-backend-architecture)
5. [Security Audit](#5-security-audit)
6. [Nginx / Reverse Proxy](#6-nginx--reverse-proxy)
7. [Scalability & Resource Usage](#7-scalability--resource-usage)
8. [Monitoring & Observability](#8-monitoring--observability)
9. [Priority Action Items](#9-priority-action-items)
10. [Recommended Architecture Changes](#10-recommended-architecture-changes)

---

## 1. Executive Summary

The RNJ Advisory application has **strong foundations** (Cloudinary for media, proper multi-stage Docker builds, good SEO metadata, structured data via JSON-LD, modern Next.js 16 + React 19) but suffers from **several critical issues** that must be addressed before production deployment:

| Domain | Severity | Key Issues |
|--------|----------|------------|
| Frontend Performance | 🔴 Critical | 3,801-line client component; dead code in production; `console.log` in production; no code splitting |
| Docker Security | 🔴 Critical | Hardcoded secrets in compose file; root user in backend container; legacy dev Dockerfile still present |
| Backend Architecture | 🟠 High | `php artisan serve` (CLI dev server) in production; no Redis; no rate limiting on API |
| Security Headers | 🟠 High | No CSP; no HSTS; `session.encrypt` disabled |
| Monitoring | 🟡 Medium | No health check on frontend/backend services; no logging infrastructure |

---

## 2. Frontend Performance & Code Quality

### 2.1 🔴 Critical: Massive Client Components

#### [`rnj/src/app/HomePageClient.tsx`](rnj/src/app/HomePageClient.tsx:1) — **3,801 lines**

This single `'use client'` component contains the **entire homepage** — hero section, partner carousel, services section, entrepreneur section, institutional carousel, interactive impact map with SVG pins, FAQ accordion, bento grid, ESG cards, Belgium steps animation, and 3 popup modals.

**Problems:**
- **70+ state variables** managed across 20+ `useState` hooks
- **10+ `useEffect` hooks** with `setInterval` timers, `IntersectionObserver`, and scroll listeners
- **Dead code** wrapped in `{false && (...)}` blocks at lines ~1916 and ~3545 — these ship to the browser but never render
- **`console.log` statements** at lines ~1456 and ~1470 inside `IntersectionObserver` callbacks — leak implementation details in production
- No dynamic imports or lazy loading of any section — **all 3,801 lines parse, evaluate, and execute on every homepage visit**

**Impact:** Poor Largest Contentful Paint (LCP), high JavaScript bundle size, excessive memory usage from unused components.

#### [`rnj/src/app/contact/ContactPageClient.tsx`](rnj/src/app/contact/ContactPageClient.tsx:1) — **1,289 lines**

Contains a 4-step booking flow (subject selection + calendar, personal info, payment preview via Stripe, confirmation) plus a contact message form.

**Problems:**
- Font re-declarations (`EB_Garamond`, `Geist`, `Poppins` style objects) that are **already loaded in the root layout** [`rnj/src/app/layout.tsx`](rnj/src/app/layout.tsx:16)
- Inline Cloudinary transform parameters using non-standard format: `f_auto,q_auto:best,dpr_auto,fl_progressive` — should use the image component's `sizes` and Cloudinary's automatic formatting

### 2.2 🟡 Recommended: Code Splitting Strategy

Each major section in [`HomePageClient.tsx`](rnj/src/app/HomePageClient.tsx:1) should be split into **separate components** and lazy-loaded:

```typescript
// Before: All in one file
export default function Home() { /* 3801 lines */ }

// After: Dynamic imports per section
const HeroSection = dynamic(() => import('@/components/home/HeroSection'));
const PartnerCarousel = dynamic(() => import('@/components/home/PartnerCarousel'));
const ServicesSection = dynamic(() => import('@/components/home/ServicesSection'));
const ImpactMap = dynamic(() => import('@/components/home/ImpactMap'), { ssr: false });
const FaqSection = dynamic(() => import('@/components/home/FaqSection'));
```

**Target files to create:**
- [`rnj/src/components/home/HeroSection.tsx`] — lines 1482–1670
- [`rnj/src/components/home/PartnerCarousel.tsx`] — lines 1671–1750
- [`rnj/src/components/home/ServicesSection.tsx`] — lines 1751–1810
- [`rnj/src/components/home/StrategicTrust.tsx`] — lines 1810–1874
- [`rnj/src/components/home/EntrepreneurshipSection.tsx`] — lines 1916–2049 (note: this is partially dead code!)
- [`rnj/src/components/home/WhyChooseSection.tsx`] — lines 2053–2299
- [`rnj/src/components/home/ImpactMap.tsx`] — lines 3119–3345
- [`rnj/src/components/home/BentoGrid.tsx`] — lines 3348–3542
- [`rnj/src/components/home/FaqSection.tsx`] — lines 3633–3793

### 2.3 🟢 Positive Findings

- **Font loading:** Using `next/font` with `display: 'swap'` and CSS variables — optimal
- **Image preconnect:** Already preconnecting to `res.cloudinary.com` in [`layout.tsx`](rnj/src/app/layout.tsx:104)
- **SEO metadata:** Comprehensive OG, Twitter, and robots tags in [`layout.tsx`](rnj/src/app/layout.tsx:31) and [`metadata.ts`](rnj/src/app/metadata.ts:1)
- **JSON-LD:** Structured data via [`JsonLd`](rnj/src/app/layout.tsx:110) component
- **React Compiler:** Enabled via `reactCompiler: true` in [`next.config.ts`](rnj/src/app/layout.tsx:4)
- **Viewport config:** Proper `viewportFit: "cover"` and `themeColor` in [`layout.tsx`](rnj/src/app/layout.tsx:24)

### 2.4 🟡 Next.js Configuration

#### [`rnj/next.config.ts`](rnj/next.config.ts:1)

```typescript
const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};
```

**Issues:**
- **`unoptimized: true`** — This disables Next.js built-in image optimization. While appropriate when using Cloudinary (which handles optimization), it means **no image optimization fallback** if Cloudinary is unreachable. Consider removing this and relying on Cloudinary's `f_auto,q_auto` transform parameters instead.
- **No `output: 'standalone'`** — Without this, the Docker image must include all `node_modules` (as the runner stage does with `npm ci --omit=dev`), increasing image size. Adding `output: 'standalone'` to `next.config.ts` and updating [`Dockerfile.frontend`](rnj/Dockerfile.frontend:22) to copy only the `.next/standalone` output would reduce image size by ~40-60%.

**Recommended config:**
```typescript
const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  // Security headers — see Section 5
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: cspDirectives },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
    ];
  },
};
```

---

## 3. Docker & Containerization

### 3.1 🔴 Critical: Hardcoded Secrets

#### [`rnj/docker-compose.yml`](rnj/docker-compose.yml:1)

| Line | Secret | Value | Risk |
|------|--------|-------|------|
| 40 | `DB_PASSWORD` | `secret` | Database accessible with trivial password |
| 47 | `ADMIN_PASSWORD` | `change-me-please` | Admin panel accessible with default credentials |
| 61 | `MYSQL_ROOT_PASSWORD` | `root` | Root MySQL access with trivial password |

**Fix:** Use Docker secrets or an `.env` file with `env_file` directive (partially done for frontend at line 3, but the backend still has inline env vars). Remove all hardcoded secrets:

```yaml
backend:
  env_file:
    - backend/.env
  # Remove all inline environment variables that contain secrets
```

Create a `.env.production.template` with placeholder values and add `.env.production` to `.gitignore`.

### 3.2 🔴 Critical: Backend Uses `php artisan serve`

#### [`rnj/backend/Dockerfile`](rnj/backend/Dockerfile:23)

The backend uses `php:8.3-cli` as its base image. The entrypoint (not shown but referenced at line 33) runs `php artisan serve` — PHP's **built-in development server**.

**Why this is critical:**
- The built-in PHP server is **single-threaded** — it can only handle one request at a time
- It's intended for **development only** — the PHP manual explicitly warns against using it in production
- No support for concurrent connections, request pooling, or proper process management
- **No PHP-FPM process manager** for graceful reloads or worker control

**Fix:** Replace with Nginx + PHP-FPM:

```dockerfile
FROM php:8.3-fpm AS fpm
# Install extensions, configure FPM pool settings
# ...

FROM nginx:alpine AS nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

Or better, use a separate Nginx container (as a reverse proxy) in docker-compose with the PHP-FPM container:

```yaml
services:
  nginx:
    image: nginx:alpine
    ports: ["127.0.0.1:8000:80"]
    volumes:
      - ./backend/nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      backend-fpm:
        condition: service_healthy

  backend-fpm:
    build:
      context: ./backend
      dockerfile: Dockerfile.fpm
    environment:
      - APP_ENV=production
      # ...
```

### 3.3 🟡 Legacy Dockerfile

#### [`rnj/Dockerfile`](rnj/Dockerfile:1)

A **development-only Dockerfile** still exists at the project root:

```dockerfile
FROM node:22-alpine
# ...
CMD ["npm", "run", "dev"]  # Line 12: DEVELOPMENT MODE
```

This file should be **removed or renamed** to `Dockerfile.dev` to prevent accidental use in production. The production build uses [`Dockerfile.frontend`](rnj/Dockerfile.frontend:1).

### 3.4 🟡 Missing Health Checks

| Service | Health Check | Current Status |
|---------|-------------|----------------|
| [`frontend`](rnj/docker-compose.yml:2) | ❌ None | No health check defined |
| [`backend`](rnj/docker-compose.yml:22) | ❌ None | `depends_on` uses `service_started` (line 15) |
| [`db`](rnj/docker-compose.yml:55) | ✅ Present | MySQL ping at 5s intervals (line 62) |

**Impact:** Docker Compose has no way to know if the frontend or backend is actually serving traffic. The frontend starts before the backend is ready (no health check condition on `depends_on`).

**Fix:**
```yaml
frontend:
  depends_on:
    backend:
      condition: service_healthy
  healthcheck:
    test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000"]
    interval: 10s
    timeout: 5s
    retries: 5
    start_period: 30s

backend:
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:8000/api/health"]
    interval: 10s
    timeout: 5s
    retries: 5
    start_period: 30s
```

### 3.5 🟡 Backend Dockerfile Layer Caching

#### [`rnj/backend/Dockerfile`](rnj/backend/Dockerfile:14)

```dockerfile
COPY composer.json ./
RUN composer install ... --no-scripts ...

COPY . .  # Line 14: Copies ALL files, invalidating cache

RUN composer install ...  # Line 16: Second install runs EVERY build
```

The `COPY . .` on line 14 copies **all source files** before the second `composer install`, which means any file change invalidates the composer install cache. This could be optimized by using `.dockerignore` and only copying what's needed, or restructuring to run `composer install` with scripts after copying.

### 3.6 🟢 Positive Findings

- **Multi-stage build** in [`Dockerfile.frontend`](rnj/Dockerfile.frontend:1) — separates deps, builder, and runner stages correctly
- **`npm ci`** used instead of `npm install` for deterministic builds (line 6)
- **`--omit=dev`** in runner stage (line 33) — production dependencies only
- **`NEXT_TELEMETRY_DISABLED=1`** set in builder and runner
- **`restart: unless-stopped`** on all services
- **Port binding to `127.0.0.1`** (line 17) — services not exposed externally, only accessible via reverse proxy
- **MySQL health check** with proper retry/interval configuration
- **Named volume** for MySQL data persistence

---

## 4. Backend Architecture

### 4.1 🔴 Critical: No Redis for Sessions, Cache, or Queue

#### [`rnj/docker-compose.yml`](rnj/docker-compose.yml:41)

```yaml
SESSION_DRIVER: database
CACHE_STORE: database
QUEUE_CONNECTION: database
```

All three use **MySQL as the backend** — sessions, cache, and queue jobs all share the same database connection.

**Why this is critical for production:**
- **Session reads/writes on every request** add unnecessary load to MySQL
- **Cache store in database** means cached data queries compete with application queries
- **Queue processing via database** uses locking (`SELECT ... FOR UPDATE`) which blocks other queries
- **No horizontal scaling** — if you scale to multiple backend containers, all share the same MySQL for sessions/cache/queue
- **No TTL garbage collection** — MySQL sessions table grows unbounded (though `lottery: [2, 100]` provides probabilistic cleanup)

**Fix:** Add a Redis service to docker-compose:

```yaml
services:
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s

  backend:
    environment:
      SESSION_DRIVER: redis
      CACHE_STORE: redis
      QUEUE_CONNECTION: redis
      REDIS_HOST: redis
      REDIS_PASSWORD: ${REDIS_PASSWORD}
      REDIS_PORT: 6379

volumes:
  redis_data:
```

### 4.2 🟠 High: No Rate Limiting on API Routes

#### [`rnj/backend/routes/api.php`](rnj/backend/routes/api.php:1)

```php
Route::post('/contacts', [ContactSubmissionController::class, 'store']);
Route::post('/bookings', [BookingSubmissionController::class, 'store']);
Route::post('/internal/bookings/payment-status', [InternalBookingPaymentController::class, 'update']);
```

**No rate limiting middleware** applied to any of these endpoints. A malicious actor could:
- Flood the contact form endpoint with thousands of submissions
- Repeatedly hit the booking endpoint with fake payment status updates
- Exhaust MySQL connection pool with concurrent requests

**Fix:** Apply Laravel's built-in rate limiter:

```php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

// In AppServiceProvider::boot() or RouteServiceProvider
RateLimiter::for('api', function (Request $request) {
    return Limit::perMinute(30)->by($request->ip());
});

// In routes/api.php
Route::middleware('throttle:api')->group(function () {
    Route::post('/contacts', [ContactSubmissionController::class, 'store']);
    Route::post('/bookings', [BookingSubmissionController::class, 'store']);
    Route::post('/internal/bookings/payment-status', [InternalBookingPaymentController::class, 'update']);
});
```

### 4.3 🟡 Session Encryption Disabled

#### [`rnj/backend/config/session.php`](rnj/backend/config/session.php:50)

```php
'encrypt' => env('SESSION_ENCRYPT', false),
```

Session data is stored **unencrypted** in the database. While the session cookie itself is signed by Laravel, the actual session data (which may contain user-related information) is stored in plain text in MySQL.

**Recommendation:** Enable encryption for any session data that could contain sensitive information.

### 4.4 🟢 Positive Findings

- **MySQL strict mode** enabled in [`config/database.php`](rnj/backend/config/database.php) — prevents silent data truncation
- **SSL CA** configurable via environment variable for MySQL connections — good for encrypted database connections
- **Proper charset**: `utf8mb4` with `utf8mb4_unicode_ci` collation
- **`APP_DEBUG: "false"`** in docker-compose — prevents debug output in production
- **`SESSION_SECURE_COOKIE: "true"`** — cookies only sent over HTTPS
- **`http_only: true`** — prevents JavaScript access to session cookies
- **`same_site: lax`** — CSRF protection for same-site requests

---

## 5. Security Audit

### 5.1 🔴 Critical: No Content Security Policy (CSP)

Neither the Next.js configuration nor the Nginx configuration includes a **Content Security Policy** header. Without CSP, the application is vulnerable to XSS attacks—if an attacker injects a `<script>` tag, the browser will execute it without restriction.

**Recommended CSP for this application:**
```typescript
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",  // unsafe-inline needed for Next.js
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' res.cloudinary.com data: blob:",
  "font-src 'self' res.cloudinary.com",
  "connect-src 'self' https://api.stripe.com https://res.cloudinary.com",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
  "media-src 'self' res.cloudinary.com",
].join('; ');
```

### 5.2 🟠 High: No HSTS Header

The application should enforce **HTTP Strict Transport Security** to prevent downgrade attacks. Add to Nginx config:

```nginx
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
```

### 5.3 🟠 High: Admin Default Credentials

#### [`rnj/docker-compose.yml`](rnj/docker-compose.yml:47)

```yaml
ADMIN_PASSWORD: change-me-please
```

An admin account is created with this password during first deployment. Even if changed later, the initial deployment window is vulnerable. The password should be generated randomly on first deploy or set via a secure mechanism (Docker secrets, external vault).

### 5.4 🟠 High: Legacy Dockerfile Contains Dev Mode

#### [`rnj/Dockerfile`](rnj/Dockerfile:12)

```dockerfile
CMD ["npm", "run", "dev"]
```

If someone accidentally builds with `docker build -f Dockerfile .` instead of `docker build -f Dockerfile.frontend .`, the app will run in **development mode**, which:
- Exposes source maps and debug information
- Disables caching and optimization
- Has no rate limiting or security hardening
- Serves over HTTP with no encryption

### 5.5 🟡 API Authentication

The three API endpoints in [`api.php`](rnj/backend/routes/api.php:1) are **unauthenticated** (public). This is expected for contact form and booking endpoints, but the `/internal/bookings/payment-status` endpoint (line 10) appears to be an **internal webhook-style endpoint** that should have authentication (e.g., API key, Stripe webhook signature verification).

### 5.6 🟢 Positive Findings

- **No CSRF on API routes** — correctly handled via stateless auth / Sanctum for API
- **Robots config** — `index: true, follow: true` with proper GoogleBot directives in [`layout.tsx`](rnj/src/app/layout.tsx:83)
- **No debug mode** — `APP_DEBUG: "false"` in compose
- **Format detection disabled** — `email: false, address: false, telephone: false` in [`layout.tsx`](rnj/src/app/layout.tsx:59)
- **SSL/TLS** — TLS 1.2/1.3 configured in Nginx (from balo reference config)

---

## 6. Nginx / Reverse Proxy

### 6.1 🟠 High: No Nginx Configuration in RNJ Project

The RNJ project does **not include its own Nginx configuration**. The reference config is from the [`balo/nginx/nginx.conf`](balo/nginx/nginx.conf:1) project. RNJ needs its own Nginx config with:

- **Rate limiting** (from balo at line 28: `rate=10r/s`)
- **Static asset caching** (from balo at lines 96-107)
- **SSL/HTTPS configuration** with Let's Encrypt
- **Security headers** including CSP and HSTS
- **gzip compression** (from balo at lines 21-25)

### 6.2 🟡 Recommended Nginx Configuration

Create [`rnj/nginx/nginx.conf`] based on the balo pattern but with RNJ-specific settings:

```nginx
# Key settings to include:
# - Rate limiting: 30 req/s for API, 10 req/s for general
# - CSP header with Cloudinary and Stripe domains
# - HSTS with preload
# - SSL with TLS 1.2/1.3 only
# - Larger upload limit for booking attachments
# - Proxy pass to 127.0.0.1:3001 (frontend) and /api/* to 127.0.0.1:8000 (backend)
```

**Important:** The Nginx container should be added to [`rnj/docker-compose.yml`] and placed **in front of** the frontend service:

```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - certbot_data:/var/www/certbot
    depends_on:
      frontend:
        condition: service_healthy
    restart: unless-stopped
```

---

## 7. Scalability & Resource Usage

### 7.1 Current Resource Profile

| Component | Base Image | Estimated RAM | Estimated Disk |
|-----------|-----------|---------------|----------------|
| Frontend (Next.js) | `node:22-alpine` | ~200-400 MB (production server) | ~300-500 MB (with node_modules) |
| Backend (Laravel) | `php:8.3-cli` | ~100-200 MB (single-threaded) | ~150-300 MB (PHP + Composer deps) |
| Database (MySQL 8.4) | `mysql:8.4` | ~400-800 MB (minimum for MySQL 8) | ~1-5 GB (data + binlogs) |

**Total estimate:** ~1-2 GB RAM minimum, ~2-5 GB disk (excluding MySQL data growth).

### 7.2 🟠 High: `output: 'standalone'` Not Used

The Docker image for the frontend includes **all production node_modules** (line 33 of [`Dockerfile.frontend`](rnj/Dockerfile.frontend:33)):

```dockerfile
RUN npm pkg delete ... && npm ci --omit=dev
```

With `output: 'standalone'` in [`next.config.ts`](rnj/next.config.ts:1), Next.js produces a minimal self-contained build that includes only the runtime code needed. The Dockerfile would then only need to copy the `.next/standalone` directory:

```dockerfile
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
```

This reduces image size from ~500 MB to ~150-200 MB and improves cold-start time.

### 7.3 🟡 Database-Bound Sessions/Cache

With sessions, cache, and queue all in MySQL, scaling to multiple backend containers is **not viable** — each container would contend for database locks on the sessions and queue tables.

**Fix:** Add Redis (as described in Section 4.1) to enable horizontal scaling of the backend.

### 7.4 🟡 No Queue Worker in Docker Compose

#### [`rnj/docker-compose.yml`](rnj/docker-compose.yml:43)

```yaml
QUEUE_CONNECTION: database
```

There is no dedicated queue worker service defined. The queue connection is configured but no container runs `php artisan queue:work`. If any queue jobs are dispatched, they will never be processed.

**Fix:** Add a queue worker service:

```yaml
queue:
  build:
    context: ./backend
    dockerfile: Dockerfile
  command: php artisan queue:work --sleep=3 --tries=3
  env_file:
    - backend/.env
  depends_on:
    db:
      condition: service_healthy
  restart: unless-stopped
```

### 7.5 🟢 Positive

- **Optimized autoloader** in [`backend/Dockerfile`](rnj/backend/Dockerfile:10) — `--optimize-autoloader` flag
- **Alpine base images** for all containers — minimal footprint
- **`--prefer-dist`** for composer — avoids git clones

---

## 8. Monitoring & Observability

### 8.1 🟡 Missing: Health Check Endpoints

Create a dedicated health check endpoint for Docker orchestration:

**Backend** [`rnj/backend/routes/api.php`](rnj/backend/routes/api.php):
```php
Route::get('/health', function () {
    try {
        DB::connection()->getPdo();
        return response()->json(['status' => 'healthy', 'timestamp' => now()]);
    } catch (\Exception $e) {
        return response()->json(['status' => 'unhealthy', 'error' => $e->getMessage()], 500);
    }
});
```

**Frontend** — Next.js already serves `/api/health` if created as a route handler.

### 8.2 🟡 Missing: Centralized Logging

- No log aggregation (e.g., ELK stack, Loki, or DataDog)
- Backend logs go to `docker logs` but aren't structured for search
- Frontend errors are only visible in browser console

### 8.3 🟡 Missing: Application Performance Monitoring (APM)

No APM tool configured. Consider:
- **Sentry** for error tracking (free tier available)
- **Laravel Telescope** for local debugging (don't deploy in production without auth)
- **OpenTelemetry** for distributed tracing across frontend → API → database

### 8.4 🟢 Docker Restart Policy

All services configured with `restart: unless-stopped` — containers auto-restart on crash or host reboot.

---

## 9. Priority Action Items

### 🔴 Immediate (Before Deployment)

| # | Action | File | Effort |
|---|--------|------|--------|
| 1 | Remove hardcoded secrets from [`docker-compose.yml`](rnj/docker-compose.yml:1) | Move all secrets to `.env` file, add to `.gitignore` | 30 min |
| 2 | Replace `php artisan serve` with Nginx + PHP-FPM | Rewrite [`backend/Dockerfile`](rnj/backend/Dockerfile:23) | 2-4 hours |
| 3 | Add CSP and HSTS headers | Add `async headers()` to [`next.config.ts`](rnj/next.config.ts:1) | 30 min |
| 4 | Remove/rename legacy [`Dockerfile`](rnj/Dockerfile:1) | `mv Dockerfile Dockerfile.dev` | 5 min |
| 5 | Remove dead code and `console.log` from [`HomePageClient.tsx`](rnj/src/app/HomePageClient.tsx:1) | Delete `{false && (...)}` blocks, remove `console.log` | 15 min |

### 🟠 High (First Month in Production)

| # | Action | Files | Effort |
|---|--------|-------|--------|
| 6 | Split [`HomePageClient.tsx`](rnj/src/app/HomePageClient.tsx:1) into lazy-loaded sections | Create components in `src/components/home/` | 4-8 hours |
| 7 | Split [`ContactPageClient.tsx`](rnj/src/app/contact/ContactPageClient.tsx:1) into step components | `src/app/contact/steps/` | 2-4 hours |
| 8 | Add Redis for sessions/cache/queue | Update [`docker-compose.yml`](rnj/docker-compose.yml:1) | 2-3 hours |
| 9 | Add rate limiting to API routes | [`routes/api.php`](rnj/backend/routes/api.php:1) | 1 hour |
| 10 | Add Nginx config to RNJ project | Create `rnj/nginx/nginx.conf` | 2 hours |
| 11 | Enable `output: 'standalone'` in Next.js | [`next.config.ts`](rnj/next.config.ts:1) + [`Dockerfile.frontend`](rnj/Dockerfile.frontend:22) | 1 hour |
| 12 | Add health checks for frontend and backend | [`docker-compose.yml`](rnj/docker-compose.yml:1) | 30 min |
| 13 | Add queue worker service | [`docker-compose.yml`](rnj/docker-compose.yml:1) | 30 min |

### 🟡 Medium (Ongoing)

| # | Action | Effort |
|---|--------|--------|
| 14 | Add error tracking (Sentry) | 2 hours |
| 15 | Secure admin dashboard with 2FA | 4 hours |
| 16 | Enable session encryption | 30 min |
| 17 | Add automated backup for MySQL volume | 2 hours |
| 18 | Create CI/CD pipeline (GitHub Actions) | 4-8 hours |
| 19 | Add load testing (k6 or artillery) | 4 hours |

---

## 10. Recommended Architecture Changes

### Target Docker Compose Architecture

```yaml
services:
  nginx:          # NEW — reverse proxy with SSL termination
  frontend:       # EXISTING — update with standalone mode
  backend-fpm:    # REPLACE — php:8.3-fpm instead of php:8.3-cli
  queue:          # NEW — dedicated queue worker
  redis:          # NEW — session/cache/queue backend
  db:             # EXISTING — MySQL 8.4 (no changes needed)
  certbot:        # NEW — Let's Encrypt SSL automation
```

### Data Flow (Production)

```
Internet → Nginx (443) → Next.js (3001) → API calls → PHP-FPM (9000) → MySQL (3306)
                                                              ↓
                                                            Redis (6379)
                                                              ↓
                                                          Queue Worker
```

### Deployment Checklist

Before pushing to production VPS:

- [ ] Secrets removed from docker-compose, stored in `.env` files
- [ ] Legacy Dockerfile removed
- [ ] Dead code removed from HomePageClient.tsx
- [ ] Console.log statements removed
- [ ] CSP and HSTS headers configured
- [ ] Nginx config created with SSL, rate limiting, caching
- [ ] Backend uses PHP-FPM (not `php artisan serve`)
- [ ] Redis service configured for sessions/cache/queue
- [ ] API routes have rate limiting
- [ ] Health check endpoints created for all services
- [ ] Queue worker service defined in compose
- [ ] Next.js `output: 'standalone'` enabled
- [ ] Docker image sizes verified (target: <200 MB frontend)
- [ ] SSL certificates obtained (Let's Encrypt with certbot)
- [ ] `.env.production` and `backend/.env` in `.gitignore`
- [ ] Docker Compose up with `--env-file` flag

---

*This report was compiled from analysis of the [`rnj/`](rnj/) project directory, including Docker configuration, frontend components, backend API routes, and deployment patterns. See the referenced file paths for specific line numbers of all issues discussed.*
