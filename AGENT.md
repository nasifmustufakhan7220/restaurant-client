# AGENT.md - PizzaHub Project Context

> **Last full audit:** 2026-11-20
> **Source of truth:** The implementation is authoritative. Re-read the relevant source files before changing behavior.
> **Secret handling:** Environment variable names may be documented; values, tokens, and credentials must never be documented or committed.

## 1. Project Overview

- **Project name:** `pizza-odering-client` (the package name contains the existing `odering` spelling; do not rename without approval).
- **Product branding:** PizzaHub.
- **Purpose:** Early-stage customer-facing pizza restaurant web application with a branded landing page and an unfinished authentication foundation.
- **Main objectives currently represented in code:** Present a pizza restaurant landing experience, provide sign-in/sign-up entry points, and establish Better Auth with MongoDB.
- **Target users:** Restaurant customers are the apparent primary audience; a vendor role is exposed by the sign-up form. Admin access is mentioned in UI copy but no authorization system exists.
- **Current maturity:** UI foundation plus partial authentication. It is not yet a working ordering platform.

## 2. Technology Stack

### Frontend

- Next.js `16.4.6` App Router with `src/app`.
- React `19.3.0`, React DOM `19.3.0`.
- TypeScript `^5`, strict mode, `@/*` mapped to `src/*`.
- Client components are used where state, effects, or browser events are required (`Navbar`, `Banner`, auth forms, and UI primitives).

### Backend and data

- Better Auth `^1.7.26`.
- MongoDB driver `^7.9.0` and `@better-auth/mongo-adapter`.
- One catch-all auth API route at `/api/auth/[...all]`.
- No application product, cart, order, or payment schema exists.

### Styling and UI

- Tailwind CSS `4.3.3`, `@tailwindcss/turbopack`, and `tw-animate-css`.
- shadcn configuration uses `base-nova`, RSC mode, and Base UI primitives via `@base-ui/react`.
- `class-variance-authority` and the `cn` package are used for component variants and class merging.
- Lucide React supplies icons.
- Fonts are loaded with `next/font/google`: DM Serif Display, Dancing Script, and Lato.

### Installed but currently unused or not fully adopted

- `framer-motion` and `next-themes` are installed but have no application usage.
- `shadcn` is listed under production dependencies even though it is a development CLI.
- There is no test runner, formatter, CI configuration, or pre-commit hook.

## 3. Project Architecture

### Folder structure

```text
pizza-odering-client/
├── AGENT.md                         # This project context and audit record
├── AGENTS.md                        # Next.js-generated agent instructions; preserve its block
├── README.md                        # Unmodified create-next-app boilerplate
├── components.json                  # shadcn/Base UI configuration and aliases
├── eslint.config.mjs                # ESLint flat config
├── next.config.ts                   # Cache Components, prefetching, images, Turbopack CSS
├── package.json / package-lock.json
├── tsconfig.json                    # Strict TypeScript and @/* alias
├── .env                             # Local, ignored environment values; never expose values
├── public/
│   └── pizza1.webp ... pizza5.webp  # Hero carousel assets
└── src/
    ├── app/
    │   ├── layout.tsx               # Root HTML shell, fonts, metadata, toaster
    │   ├── page.tsx                 # Home route
    │   ├── globals.css              # Tailwind imports and design tokens
    │   ├── favicon.ico
    │   ├── (auth)/
    │   │   ├── sign-in/page.tsx     # Sign-in form and auth call
    │   │   └── sign-up/page.tsx     # Sign-up form, role, and auth call
    │   └── api/auth/[...all]/route.ts
    ├── components/
    │   ├── Banner/Banner.tsx        # Hero carousel
    │   ├── Navbar/Navbar.tsx        # Responsive header and session-aware actions
    │   ├── Navbar/DropDownProfile.tsx
    │   └── ui/                      # Base UI/shadcn primitives
    └── lib/
        ├── auth.ts                  # Server Better Auth and Mongo adapter
        ├── auth-client.ts           # Configured browser auth client
        ├── types/role.ts            # Role union
        └── utils.ts                 # cn re-export
```

### Application architecture and data flow

1. `src/app/layout.tsx` provides metadata, font variables, global styles, page children, and the global `Toaster`.
2. `/` renders `Navbar` and `Banner`; the landing page currently has no server data or shared application state.
3. `Navbar` reads the current pathname and Better Auth session, then renders navigation, auth links/profile menu, and a visual cart badge.
4. `Banner` owns carousel state locally and cycles through five local public images every six seconds.
5. `/sign-in` and `/sign-up` collect form data in client components and call the configured `authClient`.
6. `/api/auth/[...all]` delegates GET and POST requests to Better Auth, which uses MongoDB database `pizza-hub`.

There are no server actions, middleware, protected routes, global state store, data-fetching library, product API, or order API.

## 4. Implemented Features

### Landing page shell - Completed

- **Files:** `src/app/page.tsx`, `src/app/layout.tsx`.
- **How it works:** The home route composes the fixed navbar and full-viewport banner. The root layout loads brand fonts, metadata, global CSS, and toast rendering.
- **Status:** Implemented and included in the successful production build.

### Responsive navbar - Partially Completed

- **Files:** `src/components/Navbar/Navbar.tsx`, `src/components/Navbar/DropDownProfile.tsx`.
- **How it works:** A fixed white header provides Home and Browse links, Pizza Hub branding, a visual cart button, responsive mobile menu, and Sign In/Join Free links. It calls `useSession`; pending state shows skeletons, authenticated state shows a profile dropdown, and unauthenticated state shows auth links. Below `lg`, the existing cart and authenticated profile dropdown are kept in the header row beside the hamburger; the profile is no longer rendered inside the expandable menu. The mobile menu still contains the unauthenticated sign-in/join links.
- **Status:** UI and session-aware rendering exist. Browse, cart, profile, billing, and settings actions do not have application routes/behavior. The profile menu uses a fixed remote shadcn avatar image.

### Hero carousel - Completed

- **Files:** `src/components/Banner/Banner.tsx`, `public/pizza1.webp` through `public/pizza5.webp`.
- **How it works:** A client component renders five absolutely positioned `next/image` slides with opacity transitions, previous/next controls, dark overlays, and a six-second interval. The first image is preloaded.
- **Status:** Implemented. There are no pagination indicators or pause/keyboard-specific carousel controls.

### Authentication foundation - Partially Completed

- **Files:** `src/lib/auth.ts`, `src/lib/auth-client.ts`, `src/app/api/auth/[...all]/route.ts`.
- **How it works:** Better Auth enables email/password, declares an additional `role` field, configures GitHub as a social provider, and uses the Mongo adapter. The browser client is configured with `BETTER_AUTH_URL` and `inferAdditionalFields`.
- **Status:** Configuration and route handler compile. Runtime database connectivity, session persistence, and OAuth have not been verified in this audit. GitHub credentials are missing, causing a build warning.

### Sign-in - Partially Completed

- **File:** `src/app/(auth)/sign-in/page.tsx`.
- **How it works:** A responsive card collects email and password, prevents the native form submission, calls `authClient.signIn.email`, displays success/error toasts, and routes successful users to `/`.
- **Status:** Client flow is implemented, but it has no field validation, loading/disabled state, error field mapping, or runtime verification against MongoDB.

### Sign-up - Partially Completed

- **Files:** `src/app/(auth)/sign-up/page.tsx`, `src/lib/types/role.ts`.
- **How it works:** A responsive card collects full name, email, password, and role. Submission calls `authClient.signUp.email` with the selected role, shows a toast, and routes success to `/`.
- **Status:** Client flow is implemented. Validation, loading state, field-level errors, role policy, and runtime verification are incomplete. The UI offers `customer` and `Vendor`, while the TypeScript/auth role union uses lowercase `vendor`; this casing mismatch needs correction before relying on vendor registration.

### Reusable UI primitives - Partially Completed

- **Files:** `src/components/ui/avatar.tsx`, `button.tsx`, `dropdown-menu.tsx`, `field.tsx`, `input.tsx`, `label.tsx`, `select.tsx`, `separator.tsx`, `toast.tsx`.
- **How it works:** These are Base UI/shadcn-style wrappers with Tailwind classes, CVA variants, and shared toast management.
- **Status:** The auth pages use button, field, input, label, select, and toast primitives. Avatar and most dropdown variants are present for future use.

### Dashboard sidebar UI - Completed

- **Files:** `src/app/dashboard/layout.tsx`, `src/app/dashboard/_components/DashboardSideBar.tsx`, `src/app/dashboard/_components/SidebarLink.tsx`, `src/app/dashboard/_components/DashboardSideFooter.tsx`, and `src/app/dashboard/_components/dashboard-menu-config.ts`.
- **How it works:** The dashboard layout renders the existing responsive shadcn sidebar beside the page content. Menu links are selected from a role-based configuration for vendor, customer, or admin, and the active link follows the current pathname. The sidebar primitive provides the desktop sidebar and mobile Sheet drawer with overlay and close behavior.
- **Status:** UI-only preview is implemented. Links are presentational navigation targets; role selection is not connected to authentication and the linked feature pages do not exist yet.

## 5. UI/UX Documentation

- **Home:** Full-height darkened food-image hero. The fixed, rounded white navbar floats over it. Hero typography uses DM Serif Display and presents “DIXOR”, a red “RESTAURANT” label, and “ESTD - 1759”.
- **Auth pages:** Centered cream card on a warm radial-gradient background, red Pizza icon, close link, serif heading, labeled inputs, red CTA, and cross-links between sign-in/sign-up.
- **Reusable design:** Tailwind utility classes, CSS variables, rounded cards/controls, red brand primary, neutral dark text, warm cream auth background, and Lucide icons.
- **Typography:** Lato is the body font; DM Serif Display is the serif heading font; Dancing Script is exposed but not currently used by the reviewed page components.
- **Responsive behavior:** Navbar switches to a hamburger below `lg`; on mobile and tablet widths the cart and authenticated profile remain aligned in the header row while navigation/auth links expand below when opened. Auth cards use responsive padding and full-width controls; hero sizes and spacing scale through Tailwind breakpoints.
- **Accessibility observed:** Interactive buttons have labels, images have alt text, forms have associated labels, and links provide accessible labels for icon-only close/logo actions. Carousel controls do not expose slide position or pause controls.
- **Theme:** Light and dark token sets exist in `globals.css`, but no provider, toggle, or code currently activates dark mode.

## 6. Backend & Database Documentation

### API

- `GET` and `POST` `/api/auth/[...all]` are provided by `toNextJsHandler(auth)`.
- No other API routes or server actions exist.

### Authentication configuration

- Email/password is enabled.
- GitHub social login is configured in source but requires `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`.
- Users receive an additional `role` field intended to allow `customer`, `vendor`, or `admin`.
- No middleware, session guard, protected page, authorization check, role check, or admin workflow exists.

### Database

- `src/lib/auth.ts` creates a MongoDB client from `MONGO_URL`.
- Better Auth uses the Mongo adapter and database name `pizza-hub`.
- Better Auth owns its auth collections; there are no application models, migrations, seeds, or documented relationships.
- Product catalog, cart, order, delivery, and payment persistence do not exist.

### Environment configuration

Names observed in the local `.env` file or source references (values intentionally omitted):

- `BETTER_AUTH_SECRET` - Better Auth secret.
- `BETTER_AUTH_URL` - Better Auth base URL used by the client.
- `NEXT_PUBLIC_BASE_URL` - present locally but not referenced by reviewed source.
- `MONGO_URL` - MongoDB connection string.
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` - referenced by source but absent from the local variable-name inventory; required for GitHub OAuth.

The `.env*` pattern is ignored by Git. There is no `.env.example`.

## 7. Development Progress Tracker

### Completed

- [x] Next.js App Router scaffold and strict TypeScript configuration.
- [x] Tailwind v4/shadcn Base UI foundation and brand tokens.
- [x] Root layout, metadata, Google fonts, global toaster.
- [x] Responsive fixed navbar and mobile menu.
- [x] Mobile navbar keeps the existing cart/profile controls outside the expandable hamburger menu.
- [x] Five-image hero carousel with autoplay and arrow controls.
- [x] Better Auth route handler and Mongo adapter configuration.
- [x] Responsive sign-in and sign-up UI.
- [x] Sign-in and sign-up client calls, success/error toasts, and redirect handling.
- [x] Responsive role-based dashboard sidebar UI with active-link styling and profile footer.
- [x] ESLint and TypeScript validation.
- [x] Production build for the current route set.

### [~] Partially Completed

- [~] Authentication runtime, validation, loading/error UX, and authorization.
- [~] Session-aware navbar/profile actions.
- [~] Role-based registration (role casing and policy are unresolved).
- [~] Theme tokens without an active dark-mode UX.
- [~] UI primitive library; several primitives are unused.
- [~] Dashboard sidebar preview; role wiring and dashboard feature routes are unresolved.
- [~] Documentation/README; this document is current, but README remains scaffold text.

### Not Started

- [ ] Browse/menu/catalog route and product data.
- [ ] Pizza customization, cart state, quantities, pricing, and checkout.
- [ ] Delivery details, payment, order placement, history, and tracking.
- [ ] Product/cart/order APIs and application database schema.
- [ ] Search, filtering, sorting, footer, and additional content sections.
- [ ] Automated tests, formatting, CI/CD, deployment, and monitoring.

### [!] Needs Attention

- [!] GitHub OAuth credentials are missing; the build warns about the provider.
- [!] Auth environment variables are asserted as strings without explicit configuration validation.
- [!] Vendor role option uses `Vendor` while the declared role is lowercase `vendor`.
- [!] Profile dropdown logs user data to the console and uses a remote avatar image.
- [!] Cart button and profile menu items are visual/no-op actions.
- [!] Dashboard sidebar uses a `currentRole` preview constant and must not be treated as authorization.
- [!] Secondary CSS variables referenced by the theme (`destructive`, chart, and sidebar tokens) are not defined.

## 8. Known Issues & Technical Debt

1. Authentication is not end-to-end verified and lacks validation, pending state, field-level error handling, and protected routes.
2. `auth.ts` uses `as string` assertions for required environment variables; missing values can fail unclearly at runtime.
3. GitHub provider configuration is incomplete and produces a build warning.
4. Sign-up role casing is inconsistent (`Vendor` in the option versus `vendor` in the role type/auth configuration).
5. `DropDownProfile` has a `console.log(data)` and an intentionally fixed remote avatar; profile/billing/settings items have no destinations.
6. The cart badge is hard-coded to `0`, and the cart button has no handler.
7. Dark-mode tokens are declared but not activated; several referenced secondary tokens are undefined.
8. `components.json` declares `@/hooks`, but `src/hooks` does not exist.
9. `README.md` is create-next-app boilerplate and does not describe this application.
10. No automated test suite, formatter, typecheck script, CI, deployment config, or monitoring exists.
11. `framer-motion` and `next-themes` are unused; `shadcn` is a production dependency despite being a CLI.
12. `pizza5.webp` has previously been identified as non-WebP image content despite its extension; re-encode or rename after confirming asset ownership.
13. Branding/naming differs across package name, PizzaHub metadata, DIXOR hero copy, and the repository remote; clarify before a branding cleanup.
14. Carousel accessibility could be improved with slide status, keyboard/gesture behavior, and pause controls.

## 9. Development Guidelines

- Read this file first, then verify the actual relevant source before editing.
- Keep the implementation TypeScript-first with `strict: true`; avoid unnecessary casts and `any`.
- Use `@/*` for internal imports and preserve the existing folder conventions.
- Use Server Components by default; add `"use client"` only for hooks, browser APIs, or event handlers.
- Keep feature components in PascalCase directories/files; keep generated UI primitives in `src/components/ui` with their existing naming style.
- Prefer existing Base UI/shadcn wrappers and Tailwind tokens over duplicate primitives.
- Preserve the existing visual language unless a design change is explicitly requested.
- Never expose secrets in code, logs, documentation, or responses.
- Use `npm.cmd`/`npx.cmd` in this PowerShell environment.
- Before framework changes, consult the Next.js 16 guidance in `node_modules/next/dist/docs/`, as required by `AGENTS.md`.
- Validate focused changes with lint, TypeScript, and the production build as appropriate.
- Update this document after meaningful implementation changes; keep status claims tied to verified behavior.
- Do not remove or alter the generated instruction block in `AGENTS.md`.

## 10. Pending Tasks & Next Steps

Recommended order; these are not owner-confirmed requirements:

1. Confirm product scope and branding names before adding ordering features.
2. Stabilize authentication: validate environment configuration, normalize role values, add form validation/loading/error states, remove debug logging, and test against MongoDB.
3. Add session protection and explicit authorization rules before exposing vendor/admin behavior.
4. Define product, cart, order, delivery, and payment requirements, then design the application schema/API.
5. Implement catalog and cart incrementally, reusing current UI primitives and navbar patterns.
6. Add focused automated tests and quality scripts/CI.
7. Replace the scaffold README and add a secret-free `.env.example`.
8. Clean up unused dependencies/assets only after confirming they are not planned.

## 11. Important Development Decisions

- The project uses Next.js App Router under `src/app`, not a root-level `app` directory.
- Cache Components and Partial Prefetching are enabled in `next.config.ts`; retain the Next.js 16-specific behavior unless intentionally revisited.
- Better Auth is the selected authentication system and MongoDB is the selected persistence adapter.
- The auth database name is `pizza-hub`.
- The current homepage is intentionally a focused hero shell; catalog/cart/order functionality must not be inferred from its visual placeholders.
- `Navbar` and `Banner` remain client components because they own interaction state and session/effect behavior.
- Brand primary is `#e7272d`; warm cream is used for auth surfaces.
- The existing package spelling and generated `AGENTS.md` should not be changed casually.

## 12. Latest Development Session

- **Last reviewed:** 2026-11-20.
- **Latest completed work:** Added the UI-only role-based dashboard sidebar with responsive drawer behavior, active links, profile footer, and CSS token mappings for the sidebar primitive. The existing navbar responsive work remains intact.
- **Application files modified:** `src/app/dashboard/layout.tsx`, `src/app/dashboard/_components/DashboardSideBar.tsx`, `src/app/dashboard/_components/SidebarLink.tsx`, `src/app/dashboard/_components/DashboardSideFooter.tsx`, `src/app/dashboard/_components/dashboard-menu-config.ts`, `src/app/globals.css`, and `AGENT.md`.
- **Important dashboard notes:** Change `currentRole` near the top of `DashboardSideBar.tsx` to `vendor`, `customer`, or `admin` to preview each menu. Replace it with the authenticated session role only after authorization is designed. Menu labels and routes live in `dashboard-menu-config.ts`.
- **Validation performed:** `npx.cmd tsc --noEmit` and `npm.cmd run build` passed. `npm.cmd run lint` still reports the pre-existing `setState`-in-effect error in `src/hooks/use-mobile.ts`; no dashboard-specific lint error was reported. The build emitted the expected missing-GitHub-credentials warning.
- **Current project status:** Home, auth entry pages, and the dashboard sidebar UI compile and build; authentication is still partial/unverified, role wiring is not connected, and no ordering domain exists.
- **Remaining work:** Authentication hardening/runtime verification, role wiring and authorization, dashboard feature routes, product scope/schema, catalog/cart/checkout/orders, tests/CI, and project documentation cleanup.
- **Recommended next step:** Connect the sidebar role to a verified session only after protected routes and authorization rules are defined, then add dashboard feature pages incrementally.
