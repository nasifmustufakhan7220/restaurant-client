# Pizza Hub — Ordering Client

A Next.js 16 (App Router) web client for a multi-role pizza ordering platform.
Customers browse and order pizzas, vendors manage their menu and customer orders,
and admins moderate users and menu items. Authentication is handled with
Better Auth (MongoDB adapter) and payments with Stripe.

> This client depends on a separate backend REST API for business data.
> Set `NEXT_PUBLIC_API_BASE_URL` to point at that API.

## Features

### Public
- Landing page with featured menu items, categories, and how-it-works section
- Browse all active menu items with search/filtering
- Item details page with image gallery and order dialog
- Email/password and Google OAuth sign-in/sign-up

### Customer dashboard
- Overview and order history with status tabs (Pending / Accepted / Rejected)
- Order placement with delivery date, address, and message
- Profile management

### Vendor dashboard
- Overview with stats and orders table
- Manage menu items (list, filter, update, delete, availability toggle)
- Add new menu items with image upload (imgbb)
- Customer orders view with status updates
- Stripe subscription checkout for premium plans
- Profile settings

### Admin dashboard
- Overview with transactions summary
- Manage users (view details, block/unblock, role info)
- Manage menu items (approve / reject / delete)
- Transactions listing

## Tech stack

- **Framework:** Next.js 16.4 (App Router, Turbopack, `cacheComponents`)
- **UI:** React 19, TypeScript, Tailwind CSS 4, shadcn/ui (base-nova), Framer Motion, Lucide
- **Auth:** Better Auth with MongoDB adapter (email/password + Google OAuth)
- **Database:** MongoDB (auth data)
- **Payments:** Stripe Checkout
- **Image hosting:** imgbb (`NEXT_PUBLIC_IMGBB_API_KEY`)

## Project structure

```
src/
├── app/
│   ├── (auth)/          # sign-in, sign-up
│   ├── (public)/        # home, browse, public menu details
│   ├── api/             # auth handler, Stripe checkout session
│   ├── checkout/        # Stripe checkout success
│   └── dashboard/       # admin / customer / vendor dashboards
├── components/          # shared UI + shadcn/ui
├── hooks/
├── lib/
│   ├── actions/         # server actions
│   ├── api/             # data-fetch helpers
│   ├── types/           # central shared types
│   ├── auth.ts          # Better Auth config
│   ├── auth-client.ts
│   └── stripe.ts
└── proxy.ts             # route protection
```

## Getting started

### Prerequisites
- Node.js 20+
- A running backend REST API
- MongoDB instance
- Stripe account (for subscriptions)
- Google OAuth credentials (optional)
- imgbb API key

### Install & run

```bash
npm install
cp .env .env.local   # then fill in values
npm run dev
```

Open http://localhost:3000.

### Build for production

```bash
npm run build
npm run start
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `MONGODB_CLIENT_URL` | Yes | MongoDB connection string |
| `BETTER_AUTH_SECRET` | Yes | Better Auth secret |
| `BETTER_AUTH_URL` | Yes | Public base URL of this app |
| `NEXT_PUBLIC_API_BASE_URL` | Yes | Backend REST API base URL |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key |
| `GOOGLE_CLIENT_ID` | Optional | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Optional | Google OAuth client secret |
| `NEXT_PUBLIC_IMGBB_API_KEY` | Optional | imgbb API key for image uploads |

## Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `next dev` | Start dev server |
| `build` | `next build` | Production build |
| `start` | `next start` | Start production server |
| `lint` | `eslint` | Lint |

## Architecture notes

- Server components fetch data via helpers in `src/lib/api/*` using `cache: "no-store"`
  so routes stay dynamic under `cacheComponents`.
- Auth is centralized in `src/lib/auth.ts`; a single `MongoClient` is cached on
  `globalThis` (maxPoolSize 5) for Vercel serverless stability. Sessions use a
  cookie cache (5 minutes) to reduce MongoDB hits.
- `src/proxy.ts` protects `/dashboard/*` routes by checking the session and
  redirecting unauthenticated users to `/sign-in`.
- Shared types live in `src/lib/types/`.

## Deployment (Vercel)

Ensure all environment variables above are configured. The app is tuned for
serverless: cached MongoDB client, no `client.close()`, cookie-cached sessions,
and dynamic server components to avoid prerender/hanging-promise issues.

## License

Private project.
