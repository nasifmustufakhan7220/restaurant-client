# AGENT.md — Project Audit & Instructions for AI Agents

> **Audit date:** 2026-11-19
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
- **Actual state:** A fresh Next.js scaffold with branding colors, Google Fonts, and one unused shadcn/Base UI button. There is **no backend, database, authentication, API, or product UI**. **[Verified]**
- **Current home page:** Renders only `<div>Home</div>`. **[Verified]**

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
| Icons | `lucide-react` `^1.76.0` (installed, unused) |
| Animation | `framer-motion` `^14.14.0` (installed, unused) |
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
| `dev` | `next dev` | Available |
| `build` | `next build` | Passes (Turbopack) |
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

- **None present.** No `.env`, `.env.local`, or `.env.example` file exists. **[Verified]**
- No `process.env` references anywhere in `src/`. **[Verified]**
- `.env*` is git-ignored. **[Verified]**
- If variables are added later, document their **names and purpose only**, never values.

---

## 3. Project Architecture

**Pattern:** Next.js App Router, single-page static scaffold. **[Verified]**

```
Browser request
  -> src/app/layout.tsx (root layout, metadata, Lato font, globals.css)
  -> src/app/page.tsx   (home route, placeholder)
  -> no data fetching, no API layer, no state, no auth
```

- All current components run as React Server Components by default; there are no explicit `"use client"` files.
- `Button` wraps `@base-ui/react/button`, whose package code includes its own `"use client"` directive, so the component is client-capable even though the local file has no directive. It is not imported anywhere. **[Verified]**
- There are **no** route groups, dynamic routes, layouts beyond the root, API route handlers, middleware, server actions, or data-access modules. **[Verified]**
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
├── public/                    # Default create-next-app SVGs (unused by the app)
│   ├── file.svg, globe.svg, next.svg, vercel.svg, window.svg
└── src/
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css        # Tailwind v4 + shadcn imports, brand tokens
    │   ├── layout.tsx         # Root layout, 3 Google fonts, metadata
    │   └── page.tsx           # "/" placeholder
    ├── components/
    │   └── ui/
    │       └── button.tsx     # shadcn/Base UI Button (unused)
    └── lib/
        └── utils.ts           # Re-exports cn from "cn"
```

- `@/` resolves to `src/`. **[Verified]**
- `components.json` also declares a `@/hooks` alias, but `src/hooks/` does not exist. **[Verified]**

---

## 5. Database Schema and Relationships

- **No database exists in this repository.** **[Verified]**
- No ORM or DB client (Prisma, Drizzle, Mongoose, Supabase, Firebase, etc.).
- No schema, migrations, seed files, models, or SQL.
- No API routes/server actions that would access data.
- Therefore there are **no entity relationships** to document.

---

## 6. Authentication and Authorization

- **Not implemented.** **[Verified]**
- No auth library (NextAuth/Auth.js, Clerk, Supabase Auth, custom JWT, etc.).
- No `middleware.ts`, session handling, cookies/headers usage, role checks, or protected routes.
- No login/register UI.
- Do not assume any auth behavior when building features; it must be designed and added.

---

## 7. Existing Features

Only scaffolding-level features exist:

1. **Root layout** (`src/app/layout.tsx`) **[Verified]**
   - Sets metadata `title: "PizzaHub"` and description `"Pizza Ordering & Delivery Platform"`.
   - Loads three Google Fonts via `next/font/google`: DM Serif Display (400), Dancing Script (400/700), Lato (400/700).
   - Applies only Lato via `body className={lato.className}`.
   - Exports `dmSerif`, `dancingScript`, and `lato` as named exports (non-standard, but the production build passes).
2. **Home route** (`src/app/page.tsx`) **[Verified]**
   - Default export renders `<div>Home</div>`. No sections, links, images, or data.
3. **Brand design tokens** (`src/app/globals.css`) **[Verified]**
   - Tailwind v4 CSS-first setup with `@import "tailwindcss"`, `tw-animate-css`, and `shadcn/tailwind.css`.
   - Light/dark palettes using `#e7272d` as primary red; radii and section/text tokens.
   - `@custom-variant dark` is defined, but no theme toggle/provider activates dark mode.
4. **UI primitive** (`src/components/ui/button.tsx`) **[Verified]**
   - Variants: `default`, `outline`, `secondary`, `ghost`, `destructive`, `link`.
   - Sizes: `default`, `xs`, `sm`, `lg`, `icon`, `icon-xs`, `icon-sm`, `icon-lg`.
   - Uses Base UI `Button`, CVA, and `cn` from the `cn` package. Not imported or rendered anywhere.
5. **Utility** (`src/lib/utils.ts`) **[Verified]**
   - Re-exports `cn` from `"cn"`; not currently imported by any file.

---

## 8. Completed Features

Strictly speaking, only infrastructure is complete:

- [x] Next.js App Router project scaffold with `src/` layout. **[Verified]**
- [x] TypeScript strict configuration and `@/*` path alias. **[Verified]**
- [x] ESLint flat config integrated with Next.js core-web-vitals and TypeScript rules. **[Verified]**
- [x] Production build succeeds and prerenders `/` and `/_not-found` as static routes. **[Verified]**
- [x] Lint and type-check pass with zero errors. **[Verified]**
- [x] Brand color palette and dark-palette values written in CSS. **[Verified]**
- [x] Base UI/shadcn `Button` primitive generated (not integrated). **[Verified]**

> No customer-facing product feature is complete.

---

## 9. Partially Completed Features

1. **Theming / design system** — Light and dark token values exist, but:
   - Dark mode is never activated (no `next-themes` provider, no toggle, no `dark` class logic). **[Verified]**
   - Some tokens referenced in `@theme inline` are undefined (see Section 11).
2. **Typography** — Fonts are downloaded/loaded, but font CSS variables are not wired:
   - No `variable` option is passed to the `next/font` calls.
   - `globals.css` declares `--font-sans: var(--font-sans)` (self-reference) and `--font-heading: var(--font-sans)`.
   - DM Serif Display and Dancing Script are loaded and exported but cannot be used through CSS/Tailwind utilities. **[Verified]**
3. **UI component library** — One `Button` exists with variants, but it is unused and untested in the app. **[Verified]**
4. **Documentation** — `README.md` is still the create-next-app boilerplate and refers to `app/page.tsx` instead of `src/app/page.tsx`. **[Verified]**

---

## 10. Missing Features

**Verified absent** from the repository (not merely unimplemented in a file):

- Menu/catalog pages, product listing, pizza customization.
- Cart, quantities, pricing, checkout, delivery details.
- Order placement, order history, order tracking.
- User accounts, authentication, authorization, profiles.
- Payment integration.
- Backend/API routes/server actions.
- Database, ORM, schema, seed data.
- Header, footer, navigation, shared marketing sections.
- Forms and client/server validation.
- Search, filtering, or sorting.
- Dark-mode switching UI.
- Loading, error, empty, or `not-found` UI (only the framework default 404).
- Tests of any kind, test runner, coverage configuration.
- Formatting tool (Prettier/Biome) and pre-commit hooks.
- CI/CD, Docker, deployment configuration.
- Custom brand assets/logo (only default Next.js public SVGs and the default favicon are present). **[Assumption]** that `favicon.ico` is the scaffold default; not visually verified.
- Analytics/monitoring.

> The specific future product scope is **not documented anywhere in the repo**. Any statement about planned pages (e.g., menu, checkout, admin) is an **[Assumption]** until the owner confirms.

---

## 11. Known Bugs, Issues, and Technical Debt

### Verified issues

1. **Uncommitted work:** `src/app/globals.css` has uncommitted changes (brand palette rewrite replacing the original oklch tokens). The rest of the tree is clean. Do not discard this user work.
2. **Self-referential font variable:** `--font-sans: var(--font-sans)` inside `@theme inline` is invalid; `font-sans`/`font-heading` do not resolve to the loaded fonts.
3. **Fonts not exposed as CSS variables:** `next/font` calls do not set `variable`, so DM Serif Display and Dancing Script cannot be referenced. Only Lato works, via `lato.className` on `<body>`.
4. **Undefined theme variables:** `@theme inline` references `--destructive`, `--chart-1`…`--chart-5`, `--sidebar`, `--sidebar-*`, and `--sidebar-ring`, but these are no longer defined in `:root`/`.dark` after the palette rewrite. Utilities using them resolve to invalid/empty values.
5. **No-op custom property:** `--bg-background: var(--background)` is not a Tailwind color namespace (`--color-*`); `bg-background` still works through `--color-background`.
6. **Unused `Button` API risk:** The button's `destructive` variant relies on the currently undefined `--destructive` token and would render incorrectly until the token is restored.
7. **Non-standard font exports:** `layout.tsx` exports `dmSerif`, `dancingScript`, and `lato`. The current Next.js 16 build accepts this, but layout files generally expose only framework-recognized exports; avoid expanding this pattern without checking Next.js 16 docs.
8. **shadcn alias inconsistency:** `components.json` points utils to `@/lib/utils`, but `button.tsx` imports `cn` directly from `"cn"` instead. Both work, but the convention is inconsistent.
9. **`shadcn` CLI in production dependencies:** `shadcn` is listed under `dependencies` rather than `devDependencies`. Not a runtime bug, but it bloats installs.
10. **Unused dependencies:** `framer-motion`, `lucide-react`, and `next-themes` are installed but never imported. `@base-ui/react` is imported only by the unused button. Public scaffold SVGs are unused.
11. **Naming drift:** package name `pizza-odering-client` (typo), branding `PizzaHub`, and Git remote `restaurant-client` disagree. **[Verified]**; treat the intended naming as an owner decision.
12. **Stale README:** Describes the scaffold and wrong path (`app/page.tsx`), with no project-specific instructions.
13. **Formatting inconsistency:** `layout.tsx`/`page.tsx` use semicolons and double quotes; `button.tsx`/`utils.ts` use no semicolons. No formatter config exists.
14. **`page.tsx` starts with blank lines** and is effectively unfinished.

### Improvements (not bugs)

- Add `src/hooks/` or remove the unused alias from `components.json`.
- Add scripts for type-checking, formatting, and tests.
- Replace scaffold assets and favicon with PizzaHub branding.
- Add `.env.example` only when actual env vars are introduced.

### Verification status

- `npm.cmd run lint` — **passes**. **[Verified]**
- `npx.cmd tsc --noEmit` — **passes**. **[Verified]**
- `npm.cmd run build` — **passes**; routes `/` and `/_not-found` are static. **[Verified]**
- No runtime testing was performed in a browser; the home page is trivial. No console/runtime errors are known.

> PowerShell note for this environment: `npm`/`npx` `.ps1` shims are blocked by execution policy. Use `npm.cmd` and `npx.cmd`.

---

## 12. Coding Conventions and Guidelines

Observed conventions (follow unless the owner directs otherwise):

- **Language:** TypeScript only, `strict: true`; no `any` introduced without reason.
- **Imports:** Use the `@/*` alias for project-internal imports (`@/components/...`, `@/lib/...`).
- **Components:** Function declarations (`function Button(...)`, `export default function Home()`), PascalCase component names, kebab-case filenames.
- **App Router:** Pages/layouts use default exports; route files live under `src/app/`.
- **Server vs client:** Default to Server Components; add `"use client"` only when hooks/browser events are needed.
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
| `src/app/layout.tsx` | Root HTML shell, metadata, Google Fonts, global CSS import | Only Lato applied; fonts exported unusually |
| `src/app/page.tsx` | Home route `/` | Placeholder `<div>Home</div>` |
| `src/app/globals.css` | Tailwind v4 imports, theme tokens, dark palette, base layer | Uncommitted; undefined vars noted in Section 11 |
| `src/components/ui/button.tsx` | Base UI button with CVA variants/sizes | Unused; destructive variant depends on missing token |
| `src/lib/utils.ts` | Re-exports `cn` | Unused |
| `components.json` | shadcn CLI configuration and aliases | `@/hooks` alias has no directory |
| `next.config.ts` | Next.js/Turbopack/Cache Components config | `cacheComponents`, `partialPrefetching` |
| `tsconfig.json` | Strict TS config and path aliases | `@/*` -> `./src/*` |
| `eslint.config.mjs` | ESLint flat config | Next core-web-vitals + TS |
| `package.json` | Dependencies and scripts | No test/format scripts |
| `AGENTS.md` | Next.js-generated agent warning block | Do not treat as project documentation |
| `README.md` | Default scaffold README | Stale; should be replaced eventually |
| `public/*.svg` | Default Next.js scaffold assets | Unused by app code |

---

## 14. Current Project Status

**Stage: pre-feature scaffold.** **[Verified]**

- The app compiles, lints, type-checks, and builds successfully.
- The only route is a static placeholder home page.
- There is no ordering functionality and no backend/data/auth layer.
- Brand tokens and fonts are partially prepared but not correctly wired.
- One reusable UI primitive exists but is not used.
- Working tree contains uncommitted theme work in `globals.css`.

**Do not describe this project as a working pizza-ordering application.** It is a UI foundation only.

---

## 15. Pending Tasks and Next Steps

These are audit recommendations, not owner-confirmed requirements. Confirm scope before building:

1. **Preserve/commit the pending `globals.css` changes** after reviewing them; clarify whether the brand palette is final.
2. **Fix the theme foundation:**
   - Define or remove `--destructive`, `--chart-*`, and `--sidebar-*` tokens.
   - Wire fonts with `variable` options and correct `--font-sans`/`--font-heading` mappings.
   - Decide whether dark mode is in scope; if yes, add a theme provider/toggle.
3. **Define the product scope and routes** (e.g., menu, item details, cart, checkout, order confirmation, account/orders). All are currently missing; none are proven planned.
4. **Build the application shell:** header, footer, navigation, responsive layout, and brand assets.
5. **Implement catalog and cart state** with a chosen state/data approach (none installed yet).
6. **Add backend/API, database schema, and validation** only after the data model is agreed.
7. **Add authentication/authorization** if accounts or order history are required.
8. **Add payment/delivery integration** if in scope.
9. **Improve project hygiene:** fix or confirm naming, replace the README, move `shadcn` to dev dependencies, remove unused packages/assets, add Prettier or Biome.
10. **Add quality gates:** test runner and tests, type-check/format scripts, CI.
11. **Fix `button.tsx` import convention** to use `@/lib/utils` (or standardize the opposite).
12. **Update this `AGENT.md`** after every meaningful change.

---

## 16. Important Notes for Future AI Agents

- **Read this file first** and trust verified sections to avoid re-auditing. Open only task-relevant files.
- **No app code was changed during this audit** other than creating `AGENT.md`. Build artifacts (`.next`) and `tsconfig.tsbuildinfo` may have been regenerated and are git-ignored.
- **Do not assume features exist.** Specifically: no API, no database, no auth, no cart, no checkout, no payment, no tests. Verify before referencing them.
- **Do not invent product requirements.** The repo contains no spec beyond "Pizza Ordering & Delivery Platform".
- **Keep the user's uncommitted `globals.css` work.** It is intentional pending work, not something to reset.
- **Use `npm.cmd` / `npx.cmd`** in this PowerShell environment; the `.ps1` shims are blocked.
- **Next.js 16 is not the Next.js in most training data.** Read `node_modules/next/dist/docs/` for routing, caching (`cacheComponents`), and prefetching behavior before coding.
- **Keep `AGENTS.md` intact.** The Next.js block is regenerated by `next dev`; removing it only creates churn.
- **No secrets:** never add credentials. If env vars appear, record names and purpose only.
- **No test harness:** do not claim tests pass; there are none. Validate with `npm.cmd run lint`, `npx.cmd tsc --noEmit`, and `npm.cmd run build`.
- **Maintain this document:** update Sections 7–11, 14, and 15 when features, bugs, or architecture change, and refresh the audit date.
