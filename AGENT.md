# AGENT.md — Project Audit & Instructions for AI Agents

> **Audit date:** 2026-11-19
> **Last implementation update:** 2026-11-19 (responsive fixed navbar + banner image carousel; auth foundation added separately)
> **Audit scope:** Full repository review (structure, config, source, Git history, dependencies, build/lint/type-check).
> **Rule for future agents:** Read this file first. Only inspect files relevant to your task. Update this file after meaningful changes.
>
> **Legend:** **[Verified]** = confirmed by reading files or running commands during this audit. **[Assumption]** = inferred, not proven by the code.

---

## 0. Mandatory Project Context Instructions

> **These instructions are mandatory before performing any task in this project.**

1. **Read** the root-level `AGENT.md` file first.
2. **Understand** the current project status, architecture, coding conventions, and pending tasks.
3. **Use** the existing implementation and project patterns instead of making unnecessary assumptions.
4. **Inspect only** the files relevant to the requested task.
5. **Avoid** unnecessary codebase exploration to reduce token consumption.
6. **Never modify** unrelated code.
7. **After completing a task**, update `AGENT.md` if any meaningful project changes occurred.

Treat `AGENT.md` as the primary project context document, but **always verify actual source code when accuracy matters**.

**Do not assume that the documentation is always up to date.**

### Additional Operating Rules

- Do not modify application code during audit-only requests.
- Never write secret values into this file. If environment variables are added, list **names only**.
- Preserve the auto-generated block in `AGENTS.md`; `next dev` re-adds it. `AGENT.md` and `AGENTS.md` are different files and both currently exist.
- Trust verified sections to avoid re-analysis, but re-check any section marked **[Assumption]** before relying on it.
- Keep this section at the top of the file so every future agent sees it first.

---

## 1. Project Overview

- **Package name:** `pizza-odering-client` **[Verified]** — note the existing spelling typo "odering"; do not rename without the owner's approval.
- **Product branding:** "PizzaHub" — "Pizza Ordering & Delivery Platform" (`src/app/layout.tsx` metadata). **[Verified]**
- **Repository remote:** `https://github.com/nasifmustufakhan7220/restaurant-client.git` **[Verified]** — remote name differs from the pizza branding/package name.
- **Purpose:** Customer-facing pizza ordering web app. **[Assumption]** based on the project name and metadata; no ordering functionality exists yet.
- **Actual state:** An early-stage Next.js app with a responsive homepage shell (fixed navbar + pizza hero carousel) and a partially configured Better Auth backend. Product catalog, cart, checkout, and orders do not exist. **[Verified]**
- **Current home page:** Imports `Navbar` and `Banner`; renders the hero carousel with a fixed navbar overlaid. **[Verified]**
- **Build health:** `next build` currently **fails** because two committed auth page files are empty (0 bytes) and fail Next's route type validation. `eslint` passes. **[Verified 2026-11-19]**

---

## 2. Technology Stack

### Runtime and framework **[Verified]**

| Area | Technology / Version |
|---|---|
| Framework | Next.js `16.4.6` (App Router, Turbopack build) |
| UI runtime | React `19.3.0`, React DOM `19.3.0` |
| Language | TypeScript `^5` (strict mode) |
| Styling | Tailwind CSS `4.3.3` + `@tailwindcss/turbopack` `4.3.3` |
| Component system | shadcn CLI `^4.23.0`, style `base-nova`, RSC enabled |
| UI primitives | `@base-ui/react` `^1.9.0` |
| Variants / class merging | `class-variance-authority` `^0.7.1`, `cn` `^0.5.2` |
| Icons | `lucide-react` `^1.76.0` (used by Navbar/Banner) |
| Animation | `framer-motion` `^14.14.0` (installed, unused) |
| Auth | `better-auth` `^1.7.26`, `@better-auth/mongo-adapter` `^1.7.26`, `mongodb` `^7.9.0` |
| Theming | `next-themes` `^0.4.6` (installed, unused) |
| Animation CSS | `tw-animate-css` `^1.4.0` (imported in `globals.css`) |
| Linting | ESLint `^9`, `eslint-config-next` `16.4.6` (flat config) |

### Toolchain observed **[Verified]**

- Node.js `v24.21.0`, npm `11.19.0`.
- Package manager: npm (`package-lock.json` present).
- **No** test runner, formatter config, CI config, or container config.

### Scripts (`package.json`) **[Verified]**

| Script | Command | Status |
|---|---|---|
| `dev` | `next dev` | Works (homepage renders; a dev server was already running on port 3000 during the audit) |
| `build` | `next build` | **Fails** — empty auth page files fail route type validation |
| `start` | `next start` | Available |
| `lint` | `eslint` | Passes |
| test / format / typecheck | — | Not defined |

### Next.js configuration **[Verified]**

`next.config.ts` enables:
- `cacheComponents: true`
- `partialPrefetching: true`
- A Turbopack rule loading `@tailwindcss/turbopack` for `*.css`

`partialPrefetching` only works with `cacheComponents` enabled. These are Next.js 16 behaviors that may differ from older training data. Per `AGENTS.md`, consult `node_modules/next/dist/docs/` before writing framework code.

### Environment variables

- A local `.env` file exists and is git-ignored. **Do not expose or commit its values.** **[Verified]**
- Variable names currently present in `.env`: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGO_URL`. **[Verified — names only]**
- `src/lib/auth.ts` also reads `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`, but those names are **not present** in `.env`. **[Verified — names only]**
- No `.env.example` exists. **[Verified]**
- If variables change, document **names and purpose only**, never values.

---

## 3. Project Architecture

**Pattern:** Next.js App Router with client-side UI components and a Better Auth route handler. **[Verified]**

```
Browser request
  -> src/app/layout.tsx       (root shell, metadata, font variables, globals.css)
  -> src/app/page.tsx         (home route)
       -> <Navbar />          (client: fixed header, mobile menu state)
       -> <Banner />          (client: 5-image carousel, autoplay, arrows)
  -> /api/auth/[...all]       (Better Auth GET/POST handler -> MongoDB via mongodbAdapter)
  -> /sign-in, /sign-up       (route files exist but are EMPTY placeholders)
```

- `Navbar` and `Banner` are client components (`"use client"`) because they use state/effects and click handlers. **[Verified]**
- `Button` wraps `@base-ui/react/button`, whose package code includes its own `"use client"` directive. It is still unused by the app. **[Verified]**
- The homepage is otherwise static/self-contained: no product data fetching and no shared state. Carousel slide and mobile-menu state are local `useState`. **[Verified]**
- The only API route is the Better Auth catch-all handler. There are no product/cart/order APIs, server actions, middleware, or protected routes. **[Verified]**
- Auth UI pages are committed as 0-byte files, which currently breaks route type validation. **[Verified]**
- No global state management, data-fetching library, form library, or validation library is installed. **[Verified]**

---

## 4. Folder Structure

```
pizza-odering-client/
├── AGENTS.md                  # Next.js-generated agent rules (not the audit document)
├── AGENT.md                   # This audit/instructions document
├── README.md                  # Default create-next-app README (stale)
├── components.json            # shadcn config (base-nova, aliases)
├── eslint.config.mjs          # ESLint flat config (Next core-web-vitals + TS)
├── next.config.ts             # Cache Components, Partial Prefetching, Turbopack CSS
├── tsconfig.json              # Strict TS, "@/*" -> "./src/*"
├── package.json / package-lock.json
├── .env                       # Local secrets, git-ignored (never commit)
├── public/                    # Hero carousel images used by Banner
│   ├── pizza1.webp … pizza5.webp
└── src/
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css        # Tailwind v4 + shadcn imports, brand tokens, font vars
    │   ├── layout.tsx         # Root layout, 3 Google fonts (CSS variables), metadata
    │   ├── page.tsx           # "/" -> Navbar + Banner
    │   ├── (auth)/
    │   │   ├── sign-in/page.tsx   # EMPTY (0 bytes) — build blocker
    │   │   ├── sign-up/page.tsx   # EMPTY (0 bytes) — build blocker
    │   │   └── _components/       # Empty directory
    │   └── api/auth/[...all]/
    │       └── route.ts       # Better Auth Next.js handler
    ├── components/
    │   ├── Navbar/
    │   │   └── Navbar.tsx     # Fixed responsive navbar + mobile menu
    │   ├── Banner/
    │   │   └── Banner.tsx     # Image carousel hero
    │   └── ui/
    │       └── button.tsx     # shadcn/Base UI Button (unused)
    └── lib/
        ├── auth.ts            # Better Auth server config (MongoDB adapter)
        ├── auth-client.ts     # Better Auth React client helpers
        └── utils.ts           # Re-exports cn from "cn"
```

- `@/` resolves to `src/`. **[Verified]**
- `components.json` also declares a `@/hooks` alias, but `src/hooks/` does not exist. **[Verified]**

---

## 5. Database Schema and Relationships

- **No application data schema exists in this repository.** **[Verified]**
- A MongoDB client is configured in `src/lib/auth.ts` using `mongodb` + `@better-auth/mongo-adapter`; the database name is `"users"`. **[Verified]**
- Better Auth owns/manages its own auth collections; no models, migrations, seed files, or SQL are present. **[Verified]**
- No product, cart, order, or payment collections/schema exist. **[Verified]**
- Runtime DB connectivity and auth collections were **not** verified; auth pages exist only as empty placeholders. **[Verified]**
- Therefore there are **no documented entity relationships**.

---

## 6. Authentication and Authorization

**Partially configured with Better Auth; not usable yet.** **[Verified]**

- `src/lib/auth.ts`: Better Auth with email/password, GitHub social provider, and MongoDB adapter (database `"users"`).
- `src/app/api/auth/[...all]/route.ts`: exports Better Auth `GET`/`POST` via `toNextJsHandler`.
- `src/lib/auth-client.ts`: creates a React auth client and exports `signIn`, `signUp`, `useSession`. Note it calls `createAuthClient()` twice — the exported helpers come from a second, unconfigured client (potential bug).
- `src/app/(auth)/sign-in/page.tsx` and `sign-up/page.tsx` exist but are **0-byte files** with no UI and no default export. They currently break the production build.
- No middleware, protected routes, session checks, role checks, or authorization rules exist.
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are referenced by `auth.ts` but are not in `.env`; GitHub sign-in is therefore unverified/likely misconfigured.
- Do not assume auth works. It requires UI, env configuration, and runtime testing.

---

## 7. Existing Features

1. **Fixed responsive navbar** (`src/components/Navbar/Navbar.tsx`) **[Verified]**
   - Client component, `position: fixed` at the top (`z-50`), so it stays visible while scrolling.
   - White rounded bar floating over the banner, matching the reference screenshot.
   - Stacked logo: red `ChefHat` icon + "RESTAN" text.
   - Desktop nav links: Home, Pages, Menu, Blog, Shop with decorative `ChevronDown` icons. **No dropdown menus are implemented (by request).**
   - Cart button with black circle and red "0" badge (visual only, no cart logic).
   - Mobile/tablet hamburger toggles a stacked link panel; closes on link click. Hidden at `lg` and above.
2. **Banner image carousel** (`src/components/Banner/Banner.tsx`) **[Verified]**
   - Client component using `next/image` and local `/public/pizza1.webp`…`pizza5.webp`.
   - 5 slides with fade transition, autoplay every 6 seconds, previous/next arrow buttons.
   - Dark gradient overlays for text readability; first image uses `preload`.
   - Hero copy: "DIXOR", red "RESTAURANT" badge, "ESTD — 1759" with red underline.
   - Full-viewport section (`min-h-[100svh]`) with navbar overlaid at the top.
3. **Root layout** (`src/app/layout.tsx`) **[Verified]**
   - Metadata `title: "PizzaHub"`, description "Pizza Ordering & Delivery Platform".
   - Loads DM Serif Display, Dancing Script, and Lato; exposes each as a CSS variable on `<html>`; Lato is the body font.
4. **Brand design tokens** (`src/app/globals.css`) **[Verified]**
   - Tailwind v4 CSS-first setup with `tw-animate-css` and `shadcn/tailwind.css`.
   - Light/dark palettes with `#e7272d` primary; font utilities now map to the real font variables (`font-sans`, `font-serif`, `font-script`).
5. **Auth foundation** (partial) — Better Auth server/client config, Mongo adapter, catch-all API route; empty auth pages. See Sections 5–6.
6. **UI primitive** (`src/components/ui/button.tsx`) — Base UI button with CVA variants/sizes; still not imported by app code.
7. **Utility** (`src/lib/utils.ts`) — re-exports `cn`; not currently imported.

---

## 8. Completed Features

- [x] Next.js App Router project scaffold with `src/` layout. **[Verified]**
- [x] TypeScript strict configuration and `@/*` path alias. **[Verified]**
- [x] ESLint flat config; `npm.cmd run lint` passes. **[Verified]**
- [x] Brand color palette and dark-palette values written in CSS. **[Verified]**
- [x] Fonts wired through `next/font` CSS variables; `font-serif` used by the hero. **[Verified]**
- [x] Responsive fixed navbar with desktop links, cart badge, and mobile menu. **[Verified]**
- [x] Banner hero with 5-image autoplay carousel, arrow controls, overlays, and reference-style typography. **[Verified]**
- [x] Home page imports and renders both components. **[Verified]**
- [x] Verified in-browser rendering at 390px, 768px, and 1440px widths; images load (HTTP 200) and no console errors were observed. **[Verified]**
- [x] Better Auth server/client configuration and catch-all API route exist. **[Verified]** (not runtime-tested)

> The app is **not** a functioning ordering platform. Some auth code exists, but its UI and runtime behavior are incomplete.

---

## 9. Partially Completed Features

1. **Authentication** — Backend config/route exist; sign-in and sign-up pages are empty, GitHub env keys are missing, client config has a likely duplicate-client bug, and no runtime auth flow was verified.
2. **Theme system** — Light/dark token values exist, but dark mode is never activated (no `next-themes` provider, toggle, or `dark` class strategy in use). Some referenced tokens are still undefined (Section 11).
3. **UI component library** — One `Button` exists with variants, but it is unused and untested.
4. **Navbar interactions** — Desktop links and chevrons are visual placeholders (`href="#"`); the cart button/badge has no behavior. No dropdowns were requested.
5. **Sticky behavior** — The header uses `position: fixed`, so it stays at the top. Because the homepage currently contains only the full-height hero, there is no additional content to scroll yet; behavior with real page content is untested.
6. **Documentation** — `README.md` is still the create-next-app boilerplate and refers to `app/page.tsx` instead of `src/app/page.tsx`.

---

## 10. Missing Features

**Verified absent** from the repository (not merely unimplemented in a file):

- Menu/catalog pages, product listing, pizza customization.
- Cart logic, quantities, pricing, checkout, delivery details (only a visual badge exists).
- Order placement, order history, order tracking.
- Working user accounts/auth UI (pages are empty; backend config only).
- Authorization rules, protected routes, session-aware UI.
- Payment integration.
- Product/cart/order backend APIs or server actions (only the auth API exists).
- Application database schema/seed data (only Better Auth's Mongo adapter config exists).
- Footer and additional shared marketing/content sections.
- Forms and client/server validation.
- Search, filtering, or sorting.
- Working dark-mode switching UI.
- Loading, error, empty, or custom `not-found` UI (only the framework default 404).
- Tests of any kind, test runner, coverage configuration.
- Formatting tool (Prettier/Biome) and pre-commit hooks.
- CI/CD, Docker, deployment configuration.
- Custom logo/icon asset (navbar uses a Lucide icon + text), custom favicon.
- Analytics/monitoring.

> The specific future product scope is **not documented anywhere in the repo**. Any statement about planned pages (e.g., menu, checkout, admin) is an **[Assumption]** until the owner confirms.

---

## 11. Known Bugs, Issues, and Technical Debt

### Verified issues

1. **Build blocker (pre-existing auth work):** `src/app/(auth)/sign-in/page.tsx` and `sign-up/page.tsx` are committed as 0-byte files. Next's generated validator reports "File ... is not a module" and `next build` fails. Fix belongs to the auth task; do not attribute it to the navbar/banner implementation.
2. **Auth client likely misconfigured:** `src/lib/auth-client.ts` creates `authClient` with a `baseURL`, then exports `signIn`/`signUp`/`useSession` from a second bare `createAuthClient()`. Use one configured client.
3. **Missing auth env names:** `auth.ts` reads `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`, which are absent from `.env` (names checked only). GitHub auth is unverified.
4. **Unsafe env assertions:** `process.env.MONGO_URL as string` and similar casts hide missing config. Add validation/guards before using Better Auth.
5. **Undefined theme variables:** `@theme inline` still references `--destructive`, `--chart-1`…`--chart-5`, `--sidebar`, `--sidebar-*`, and `--sidebar-ring`, which are not defined in `:root`/`.dark`. The unused `Button` `destructive` variant depends on `--destructive`.
6. **No-op custom property:** `--bg-background: var(--background)` is not a Tailwind color namespace (`--color-*`); `bg-background` works through `--color-background`.
7. **Placeholder navigation:** Navbar links other than Home use `href="#"`; chevrons are decorative and cart has no action. Intentional for this UI-only task, but not production-ready.
8. **Responsive hamburger difference:** The reference screenshot shows the hamburger on desktop; this implementation hides it at `lg+` because desktop already displays full links. This is a deliberate responsive choice.
9. **Uncommitted UI work:** `layout.tsx`, `page.tsx`, `globals.css`, and `Banner.tsx` are modified; `Navabr.tsx` was renamed to `Navbar.tsx`. Commit only after review.
10. **`shadcn` CLI in production dependencies:** listed under `dependencies` rather than `devDependencies`.
11. **Unused dependencies/assets:** `framer-motion` and `next-themes` are unused; `@base-ui/react` is only used by the unused button. Lucide is now used. `pizza5.webp` actually contains AVIF bytes (confirmed via `sharp`); Next's image optimizer serves it successfully as WebP, but re-encoding/renaming is advisable.
12. **Naming drift and stale docs:** package name `pizza-odering-client` (typo), branding `PizzaHub`/hero `DIXOR`, and Git remote `restaurant-client` disagree. `README.md` is default boilerplate.
13. **Formatting inconsistency:** mixed semicolons/quotes; no formatter config. `page.tsx` is now formatted.
14. **No tests or CI.** Auth and carousel behavior rely on manual verification.

### Improvements (not bugs)

- Add `src/hooks/` or remove the unused alias from `components.json`.
- Add scripts for type-checking, formatting, and tests.
- Replace scaffold favicon with brand assets; consider a real logo image.
- Add `.env.example` with variable **names only**.
- Re-encode `pizza5.webp` as actual WebP (or rename to `.avif`) for consistency.
- Add `loading="eager"`/`fetchPriority` or `preload` only for the first carousel image (already done).

### Verification status

- `npm.cmd run lint` — **passes**. **[Verified]**
- `npx.cmd tsc --noEmit` — **fails** only on the committed empty auth pages (`.next/*/types/validator.ts`). **[Verified]**
- `npm.cmd run build` — **fails** for the same empty auth pages; UI code itself compiled successfully in `next dev`. **[Verified]**
- Browser verification (dev server on port 3000): 390×844, 768×1024, and 1440×900; no console errors; all five carousel images return HTTP 200; mobile menu, autoplay, arrows, and fixed header verified. **[Verified]**

> PowerShell note for this environment: `npm`/`npx` `.ps1` shims are blocked by execution policy. Use `npm.cmd` and `npx.cmd`.

---

## 12. Coding Conventions and Guidelines

Observed conventions (follow unless the owner directs otherwise):

- **Language:** TypeScript only, `strict: true`; no `any` introduced without reason.
- **Imports:** Use the `@/*` alias for project-internal imports (`@/components/...`, `@/lib/...`).
- **Components:** Function declarations, PascalCase component names, and PascalCase filenames for feature components (`Navbar/Navbar.tsx`, `Banner/Banner.tsx`); `ui/` primitives keep kebab-case.
- **App Router:** Pages/layouts use default exports; route files live under `src/app/`.
- **Server vs client:** Default to Server Components; add `"use client"` only when hooks/browser events are needed (Navbar and Banner do).
- **UI scope:** Keep interactions simple/beginner-friendly. Navbar dropdowns were explicitly not required; the cart is visual-only. Do not add complexity without an owner request.
- **Styling:** Tailwind utility classes, CSS variables for theme tokens, `cn` for conditional/merged classes, CVA for component variants.
- **shadcn:** Generated primitives live in `src/components/ui/`; config style is `base-nova`, using Base UI (not Radix).
- **Quotes/semicolons:** Mixed in the current tree; match the file you edit. No Prettier enforcement.
- **Linting:** Flat ESLint config extends `eslint-config-next/core-web-vitals` and `/typescript`.
- **Next.js version caution:** This is Next.js 16.4.6 with Cache Components and Partial Prefetching enabled. Read the bundled docs in `node_modules/next/dist/docs/` before using routing, caching, or data APIs; do not rely on older Next.js patterns.
- **Colors:** Brand primary is `#e7272d`; backgrounds/text/radii are defined in `src/app/globals.css`.
- **No secrets:** Never commit env files or credentials; `.env*` is ignored.

---

## 13. Important Files and Responsibilities

| File | Responsibility | Notes |
|---|---|---|
| `src/app/layout.tsx` | Root HTML shell, metadata, Google Fonts, global CSS import | Exposes font variables on `<html>`; Lato body |
| `src/app/page.tsx` | Home route `/` | Renders `Navbar` + `Banner` |
| `src/app/globals.css` | Tailwind v4 imports, theme tokens, dark palette, base layer | Font vars wired; some color tokens undefined |
| `src/components/Navbar/Navbar.tsx` | Fixed responsive navbar, mobile menu, cart badge | Client component; links are placeholders |
| `src/components/Banner/Banner.tsx` | 5-image autoplay carousel hero | Client component; uses `next/image` |
| `src/components/ui/button.tsx` | Base UI button with CVA variants/sizes | Unused; destructive variant depends on missing token |
| `src/lib/auth.ts` | Better Auth server config + MongoDB adapter | Requires env; runtime untested |
| `src/lib/auth-client.ts` | Better Auth React client helpers | Likely duplicate `createAuthClient` bug |
| `src/app/api/auth/[...all]/route.ts` | Better Auth GET/POST handler | Only API route |
| `src/app/(auth)/sign-in/page.tsx` | Sign-in route | **Empty (0 bytes)** — build blocker |
| `src/app/(auth)/sign-up/page.tsx` | Sign-up route | **Empty (0 bytes)** — build blocker |
| `src/lib/utils.ts` | Re-exports `cn` | Unused |
| `public/pizza1.webp`…`pizza5.webp` | Hero carousel images | Used by Banner; pizza5 is AVIF content |
| `.env` | Local secrets | Git-ignored; never read values into docs |
| `components.json` | shadcn CLI configuration and aliases | `@/hooks` alias has no directory |
| `next.config.ts` | Next.js/Turbopack/Cache Components config | `cacheComponents`, `partialPrefetching` |
| `tsconfig.json` | Strict TS config and path aliases | `@/*` -> `./src/*` |
| `eslint.config.mjs` | ESLint flat config | Next core-web-vitals + TS |
| `package.json` | Dependencies and scripts | No test/format scripts |
| `AGENTS.md` | Next.js-generated agent warning block | Do not treat as project documentation |
| `README.md` | Default scaffold README | Stale; should be replaced eventually |

---

## 14. Current Project Status

**Stage: early UI foundation with partial auth.** **[Verified]**

- Responsive fixed navbar and 5-image hero carousel are implemented and browser-verified.
- Fonts/theme tokens are wired; dark mode and some secondary tokens remain incomplete.
- Better Auth backend foundation exists, but auth pages are empty and env/config issues remain.
- `eslint` passes; `next build` / `tsc` are blocked by the empty auth page files.
- No catalog, cart, checkout, orders, or product data layer exists.
- Working tree contains uncommitted UI work (navbar, banner, home page, layout, CSS).

**Do not describe this project as a working pizza-ordering application.** It currently has a polished homepage hero plus an unfinished auth foundation.

---

## 15. Pending Tasks and Next Steps

These are recommendations, not owner-confirmed requirements. Confirm scope before building:

1. **Unblock the build:** fill or remove the empty `(auth)/sign-in/page.tsx` and `(auth)/sign-up/page.tsx` files (auth task, not the homepage task).
2. **Finish auth:** build sign-in/sign-up UI, fix `auth-client.ts` duplicate client creation, add missing GitHub env names, validate env values, and test the flow against MongoDB.
3. **Review/commit the homepage work:** `Navbar`, `Banner`, `page.tsx`, `layout.tsx`, `globals.css`.
4. **Add the remaining page sections and routes** (menu/catalog, cart, checkout, orders) after product scope is confirmed.
5. **Connect cart UI:** the navbar badge is visual-only; add real cart state when cart requirements exist.
6. **Fix theme foundation:** define/remove `--destructive`, `--chart-*`, and `--sidebar-*`; decide whether dark mode is in scope.
7. **Add quality gates:** test runner/tests, type-check/format scripts, CI.
8. **Project hygiene:** replace the README, confirm naming, move `shadcn` to dev dependencies, remove unused packages, re-encode `pizza5.webp`.
9. **Update this `AGENT.md`** after every meaningful change.

---

## 16. Important Notes for Future AI Agents

- **Read this file first** and trust verified sections to avoid re-auditing. Open only task-relevant files.
- **Do not assume features exist.** There is a homepage shell and a partial Better Auth foundation only — no catalog, cart, checkout, orders, or product database.
- **`next build` and `tsc` currently fail** because of the committed 0-byte auth pages, not because of the navbar/banner code. Verify before attributing build errors.
- **Do not invent product requirements.** The repo contains no spec beyond "Pizza Ordering & Delivery Platform".
- **Keep the uncommitted homepage work** (`layout.tsx`, `page.tsx`, `globals.css`, `Banner.tsx`, new `Navbar.tsx`). Do not reset it.
- **Use `npm.cmd` / `npx.cmd`** in this PowerShell environment; the `.ps1` shims are blocked.
- **Next.js 16 is not the Next.js in most training data.** Read `node_modules/next/dist/docs/` for routing, caching (`cacheComponents`), prefetching (`preload` replaced `priority` on `Image`), and auth-with-cache rules.
- **Keep `AGENTS.md` intact.** The Next.js block is regenerated by `next dev`; removing it only creates churn.
- **No secrets:** never add credentials. `.env` exists; record names and purpose only.
- **No test harness:** do not claim tests pass; there are none. Use `npm.cmd run lint`; build/type-check are blocked until auth pages are fixed.
- **Browser-verified layout:** 390px (mobile), 768px (tablet), 1440px (desktop); navbar fixed, mobile menu works, carousel autoplay/arrows work, all images load.
- **Maintain this document:** update Sections 6–11, 13–15 when features, auth, bugs, or architecture change, and refresh the update date.
