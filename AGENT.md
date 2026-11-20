# AGENT.md — Project Audit & Instructions for AI Agents

> **Audit date:** 2026-11-20
> **Audited commit:** `3e4cb9d` — "try to find out the bug in the side bar"
> **Working tree:** clean at the start of the audit
> **Audit scope:** every project file under `src/`, all root config files, `public/`, Git history, dependencies, lint, type-check, production build, and read-only browser checks of `/`, `/sign-in`, `/sign-up`, `/dashboard/*`.
> **Rule for future agents:** read this file **and** `AGENTS.md` first. Inspect only the files relevant to the task. Update this file after meaningful changes.
> **Important:** this audit changed **documentation only**. No application code or functionality was modified.
>
> **Legend:** **[Verified]** = confirmed by reading files or running commands during this audit. **[Assumption]** = inferred, not proven end-to-end.

---

## 0. Mandatory Project Context Instructions

> **These instructions are mandatory before performing any task in this project.**

1. **Read** `AGENT.md` (this file) first.
2. **Read** `AGENTS.md` as well. It contains:
   - Auto-generated Next.js rules telling agents to read the bundled docs in `node_modules/next/dist/docs/` before writing code, because this Next.js version has breaking changes versus older training data.
   - A project-specific responsive-navbar note (see §7.7 for a conflict between that note and the current code).
   - Do **not** edit or delete `AGENTS.md`; `next dev` re-creates part of it.
3. **Understand** the current status, architecture, conventions, and known bugs below before editing.
4. **Reuse** existing patterns (Base UI wrappers, auth client, `cn`, Tailwind tokens).
5. **Do not** change behavior that was not requested. The user explicitly asked for a read-only review at the time of this audit.
6. **Verify** changes with `npm.cmd run lint`, `npx.cmd tsc --noEmit`, and `npm.cmd run build` (PowerShell on Windows).
7. **Update this file** after meaningful changes: feature status, bugs fixed, new files, new env vars.

---

## 1. Project Overview

**Name:** `pizza-odering-client` (note the spelling in `package.json`; the UI brand is "Pizza Hub" / "PizzaHub"; the banner says "Pizza").

**Purpose:** a pizza ordering and delivery platform with customer, vendor, and admin roles. Public marketing/banner page, email auth, and a work-in-progress role-based dashboard.

**Current maturity:** early-stage UI + auth prototype.

- Public home page and banner: implemented.
- Email/password sign-up and sign-in: implemented and working.
- GitHub social login: configured on the server but **not exposed in the UI**, and **missing credentials** in `.env`.
- Role-based dashboard shell and sidebar: **work in progress**, with a confirmed role-resolution bug.
- Dashboard feature pages (orders, menu management, profile, subscription, admin tools): **not implemented** — only three placeholder overview pages exist.
- Cart, checkout, payments, order flow, and APIs for pizza data: **not started**.

---

## 2. Tech Stack (all [Verified])

| Area | Choice | Notes |
| --- | --- | --- |
| Framework | Next.js `16.4.6` (App Router, Turbopack) | Uses `cacheComponents: true` and `partialPrefetching: true` |
| React | `19.3.0` | React Compiler lint rules are active (`react-hooks/*`) |
| Language | TypeScript `^5`, `strict: true` | Path alias `@/*` → `./src/*` |
| Styling | Tailwind CSS `4.3.3` (CSS-first) | No `tailwind.config.*`; tokens live in `src/app/globals.css` |
| Component primitives | `@base-ui/react` `^1.9.0` | **Not Radix.** Components use the Base UI `render` prop pattern, not `asChild` |
| Component system | shadcn `4.23.0`, style `base-nova` | `components.json`; generated files under `src/components/ui` |
| Icons | `lucide-react` `^1.76.0` | |
| Auth | Better Auth `^1.7.26` | Email/password + GitHub provider |
| Database | MongoDB via `mongodb` `^7.9.0` + `@better-auth/mongo-adapter` | Database name hardcoded to `pizza-hub` |
| Animation | `tw-animate-css` | `framer-motion` is installed but **unused** |
| Theme | CSS variables, `.dark` class | `next-themes` installed but **unused**; no theme toggle |
| Class utils | `cn` package `^0.5.2` | Also re-exported from `src/lib/utils.ts` |
| Lint | ESLint 9 + `eslint-config-next` | `npm run lint` currently **fails** (see §3) |
| Tests / CI / formatter | none | No test runner, no CI workflow, no Prettier config |

---

## 3. Verified Health Check

Commands were run on 2026-11-20 from the project root in PowerShell.

### 3.1 Lint — **FAILS** [Verified]

```text
npm.cmd run lint
```

```text
src\hooks\use-mobile.ts
  15:5  error  Calling setState synchronously within an effect can trigger cascading renders
  react-hooks/set-state-in-effect

✖ 1 problem (1 error, 0 warnings)
```

- The rule is real and blocking: `setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)` runs directly in the effect body at `src/hooks/use-mobile.ts:15`.
- `npm run lint` exits with code `1`.
- This is the shadcn-generated mobile hook, but the current React/ESLint config rejects it.

### 3.2 Type-check — **PASSES** [Verified]

```text
npx.cmd tsc --noEmit
```

No output, exit code `0`.

### 3.3 Production build — **PASSES (with one warning)** [Verified]

```text
npm.cmd run build
```

- Compiles successfully, TypeScript passes, all 9 pages generated.
- Warning: `[Better Auth]: Social provider github is missing clientId or clientSecret`.
- Route table:

```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/auth/[...all]
├ ○ /dashboard/admin
├ ○ /dashboard/customer
├ ○ /dashboard/vendor
├ ○ /sign-in
└ ○ /sign-up
```

There is **no `/dashboard` index route**; `/dashboard` returns 404 in the browser [Verified].

### 3.4 Runtime smoke checks [Verified]

- `/`, `/sign-in`, `/sign-up`: load without uncaught exceptions.
- `/dashboard/vendor`, `/dashboard/customer`, `/dashboard/admin`: load without uncaught exceptions.
- `/dashboard`: renders the default Next.js 404 page.
- `GET /api/auth/get-session` returns `200` with body `null` when signed out.
- `document.title` is **empty on every page** (no metadata export; see §7.8).
- No dev-server or console errors were observed on the tested pages.

---

## 4. Repository Structure

```text
pizza-odering-client/
├─ AGENT.md                     # this audit/documentation file
├─ AGENTS.md                    # Next.js agent rules + responsive-navbar note
├─ README.md                    # still the default create-next-app boilerplate
├─ components.json              # shadcn config: style "base-nova", aliases, icon library
├─ eslint.config.mjs            # flat config extending eslint-config-next
├─ next.config.ts               # cacheComponents, partialPrefetching, images, turbopack CSS rule
├─ package.json                 # scripts: dev, build, start, lint (no typecheck/test)
├─ tsconfig.json                # strict, bundler resolution, "@/*" alias
├─ next-env.d.ts                # generated; do not edit
├─ public/
│  ├─ pizza1.webp               # ~1.07 MB (hero preload) — heavy
│  ├─ pizza2.webp               # ~59 KB
│  ├─ pizza3.webp               # ~76 KB
│  ├─ pizza4.webp               # ~139 KB
│  └─ pizza5.webp               # ~29 KB
└─ src/
   ├─ app/
   │  ├─ favicon.ico
   │  ├─ globals.css            # Tailwind v4 imports, design tokens, base layer
   │  ├─ layout.tsx             # root layout; fonts, <html>/<body>, Toaster
   │  ├─ page.tsx               # home: <Navbar /> + <Banner />
   │  ├─ (auth)/
   │  │  ├─ sign-in/page.tsx    # functional email sign-in
   │  │  └─ sign-up/page.tsx    # functional email sign-up + role select
   │  ├─ api/auth/[...all]/route.ts  # Better Auth Next.js handler
   │  └─ dashboard/
   │     ├─ layout.tsx          # sidebar shell + dashboard navbar
   │     ├─ _components/        # private (not routable)
   │     │  ├─ DashboardSideBar.tsx
   │     │  ├─ DashboardSideFooter.tsx
   │     │  ├─ SidebarLink.tsx
   │     │  └─ dashboard-menu-config.ts
   │     ├─ admin/page.tsx      # placeholder
   │     ├─ customer/page.tsx   # placeholder
   │     └─ vendor/page.tsx     # placeholder
   ├─ components/
   │  ├─ Banner/Banner.tsx      # 5-image carousel, auto-advance
   │  ├─ Navbar/Navbar.tsx      # 389 lines; home/dashboard variants; duplicated account UI
   │  └─ ui/                    # shadcn/Base UI primitives
   │     ├─ avatar.tsx          # unused
   │     ├─ button.tsx
   │     ├─ dropdown-menu.tsx
   │     ├─ field.tsx
   │     ├─ input.tsx
   │     ├─ label.tsx
   │     ├─ select.tsx
   │     ├─ separator.tsx
   │     ├─ sheet.tsx
   │     ├─ sidebar.tsx         # 728 lines; desktop + mobile drawer
   │     ├─ skeleton.tsx
   │     ├─ toast.tsx
   │     └─ tooltip.tsx
   ├─ hooks/
   │  └─ use-mobile.ts          # 1024px breakpoint; lint failure here
   └─ lib/
      ├─ auth.ts                # Better Auth server config + Mongo adapter
      ├─ auth-client.ts         # browser auth client + additional-fields plugin
      ├─ utils.ts               # re-export of cn
      └─ types/role.ts          # Role = "customer" | "vendor" | "admin"
```

### Deleted/renamed files that older docs may mention

- `src/components/Navbar/DropDownProfile.tsx` **no longer exists**. Its markup was copied into `Navbar.tsx`. `AGENTS.md` still refers to `DropDownProfile` (see §7.7).
- There is no `middleware.ts`, no `src/app/dashboard/page.tsx`, and no data/API layer beyond Better Auth.

---

## 5. Architecture

### 5.1 Routing map

| Route | File | Status |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Public home: `Navbar` + `Banner` |
| `/sign-in` | `src/app/(auth)/sign-in/page.tsx` | Email sign-in form |
| `/sign-up` | `src/app/(auth)/sign-up/page.tsx` | Email sign-up form with role select |
| `/api/auth/[...all]` | `src/app/api/auth/[...all]/route.ts` | Better Auth GET/POST handler |
| `/dashboard` | **missing** | 404 |
| `/dashboard/customer` | `src/app/dashboard/customer/page.tsx` | Placeholder heading only |
| `/dashboard/vendor` | `src/app/dashboard/vendor/page.tsx` | Placeholder heading only |
| `/dashboard/admin` | `src/app/dashboard/admin/page.tsx` | Placeholder heading only |
| Sidebar links such as `/dashboard/vendor/menu`, `/orders`, `/subscription`, `/profile`, `/dashboard/admin/users` | **missing** | All 404 |

`(auth)` is a route group, so it does not appear in URLs. `_components` is a private folder, so it is not routable.

### 5.2 Auth architecture

**Server config — `src/lib/auth.ts`** [Verified]

- Creates one `MongoClient` from `process.env.MONGO_URL` and selects DB **`"pizza-hub"`** (hardcoded).
- `emailAndPassword.enabled = true`.
- `user.additionalFields.role` has `type: ["customer", "vendor", "admin"]` and `input: true`.
  - In Better Auth, an array of literals behaves as an **enum for OpenAPI/schema metadata**, not as a runtime validator. Better Auth's client form schema maps array-typed fields to `z.any()`.
  - No `required` and no `defaultValue` are set, so users created without an explicit role (for example via GitHub) can end up without one.
- `socialProviders.github` reads `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`; neither key is present in `.env`, hence the build warning.

**Route handler — `src/app/api/auth/[...all]/route.ts`**

```ts
export const { POST, GET } = toNextJsHandler(auth);
```

**Browser client — `src/lib/auth-client.ts`** [Verified]

```ts
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
});
export const { signIn, signUp, useSession } = authClient;
```

- `inferAdditionalFields` makes `session.user.role` available to TypeScript.
- `BETTER_AUTH_URL` is **not** a `NEXT_PUBLIC_*` variable, so it is not inlined into browser bundles. [Assumption] In the browser `baseURL` is `undefined`, and Better Auth falls back to same-origin `/api/auth`, which is why local development works. Do not rely on this for cross-origin deployments.

**Roles — `src/lib/types/role.ts`**

```ts
export type Role = "customer" | "vendor" | "admin";
```

**Sign-in flow** (`sign-in/page.tsx`)

1. `preventDefault`, build `FormData`.
2. `authClient.signIn.email({ email, password })`.
3. On `data?.user`: success toast, `router.push("/")`.
4. Otherwise: error toast with `error?.message`.
5. Yet unknown: no redirect back to a protected page, no "forgot password", no social button, and the error fallback copy says "while creating your account" (copy bug at line 42).

**Sign-up flow** (`sign-up/page.tsx`)

1. `preventDefault`, build `FormData`.
2. `authClient.signUp.email({ name, email, password, role: objectData.role as Role })`.
3. On `data`: success toast, `router.push("/")`.
4. Otherwise: error toast.
5. `roleOptions` uses `"customer"` and **`"Vendor"`** (capital V) — see bug §7.3.

### 5.3 Dashboard / sidebar architecture

- `dashboard/layout.tsx` wraps everything in `SidebarProvider className="flex min-h-screen flex-col"`, renders `<Navbar variant="dashboard" />`, then a flex row containing `<DashboardSideBar />` and `<SidebarInset className="min-h-0 min-w-0 flex-1 overflow-auto bg-section p-4 md:p-8">`.
- The dashboard navbar is `sticky top-0 h-(--dashboard-navbar-height)`, with `--dashboard-navbar-height: 4rem`.
- The sidebar is `fixed` with `top-(--dashboard-navbar-height)!, bottom-0!` and `h-[calc(100svh-var(--dashboard-navbar-height))]!`; at 1440×900 the rendered container was exactly `top: 64px`, `height: 836px` [Verified].
- `DashboardSideBar` reads `useSession()`, computes `const currentRole = session?.user?.role || "customer"`, then looks up `dashboardMenuItems[currentRole] ?? []`.
- `dashboard-menu-config.ts` defines lowercase role keys with menu items per role.
- `DashboardSideFooter` shows a hardcoded "PizzaHub User" plus the current role string.
- `SidebarLink` renders a Next `<Link>` through Base UI's `render` prop and marks the active route via `isActive`.
- Mobile behavior: `use-mobile.ts` uses a **1024px** breakpoint. Below 1024px the `Sidebar` renders as a `Sheet` drawer controlled by `SidebarTrigger` in the dashboard navbar; the drawer content is unmounted while closed [Verified at 900px and 390px].

### 5.4 Styling and theme

- Tailwind v4 imports: `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`.
- Tokens in `:root` / `.dark`: `--background`, `--foreground`, `--section`, `--card`, `--popover`, `--primary: #e7272d`, `--accent`, `--border`, `--input`, `--ring`, `--radius: 0.75rem`, `--dashboard-navbar-height: 4rem`.
- Sidebar tokens are mapped onto the existing palette: `--sidebar: var(--card)`, `--sidebar-accent: var(--accent)`, etc.
- `@theme inline` maps fonts to:
  - `--font-heading: var(--font-dm-serif)`
  - `--font-sans: var(--font-lato)`
  - `--font-serif: var(--font-dm-serif)`
  - `--font-script: var(--font-dancing-script)`
- **Problem:** `layout.tsx` no longer assigns `.variable` classes, so these three CSS variables are never defined (see §7.9).
- `@layer base` applies border/outline to `*`, background/text to `body`, and `font-sans` to `html`.
- Dark-mode colors exist, but nothing toggles `.dark` (no `next-themes` provider).

---

## 6. Feature Status Matrix

| Feature | Status | Notes |
| --- | --- | --- |
| Home banner carousel | **Done** | 5 images, 6s auto-advance, arrows, fade transitions, `preload` on first image |
| Public navbar | **Done (functional)** | Session-aware, mobile menu, cart placeholder, auth links |
| Sign-up | **Functional, buggy** | Email/password + role; role value mismatch; no validation |
| Sign-in | **Functional** | Email/password; copy bug; no social login button |
| Better Auth backend | **Done** | Mongo `pizza-hub`; GitHub configured but unset |
| Session display | **Done** | Navbar uses `useSession`; pending skeletons |
| Cart | **Placeholder** | Button does nothing, badge hardcoded `0`, no state/store |
| Dashboard layout/navbar | **WIP** | Renders; sidebar shell works at ≥1024px |
| Dashboard sidebar | **WIP / confirmed bug** | Role fallback and role casing break menus |
| Role-based menus | **Partly wired** | Config exists; wrong/absent role yields wrong/empty menu |
| Dashboard route protection | **Not implemented** | No middleware, no server check, no redirect |
| Vendor/customer/admin overview | **Placeholder** | Heading only |
| Menu management, orders, subscription, profile, admin users/transactions | **Not implemented** | Sidebar links lead to 404 |
| Checkout / payments / order API | **Not implemented** | |
| Metadata / SEO | **Missing** | No `metadata` export; empty `document.title` |
| Tests / CI / formatter | **Missing** | |

---

## 7. Known Bugs and Risks

Ordered roughly by severity. Do **not** fix these unless the user asks; this section is the review record.

### 7.1 `npm run lint` fails [Verified — P0]

- **File:** `src/hooks/use-mobile.ts:15`
- **Error:** `react-hooks/set-state-in-effect` — "Calling setState synchronously within an effect can trigger cascading renders."
- **Cause:** `setIsMobile(...)` is called directly in the effect body.
- **Impact:** lint is red; any CI gate would fail.

### 7.2 Sidebar shows the customer menu for every role when the session is absent [Verified — P0]

- **File:** `src/app/dashboard/_components/DashboardSideBar.tsx:20-24`
- **Cause:** `const currentRole = session?.user?.role || "customer";`
- **Verified behavior:** opening `/dashboard/vendor` and `/dashboard/admin` while signed out renders `MENU → Overview, My Orders, Profile Settings` and footer role `Customer`, regardless of the URL. This is very likely the "bug in the sidebar" referenced by commit `3e4cb9d`.
- **Impact:** no real role isolation; vendor/admin pages silently display customer navigation.

### 7.3 Role value casing mismatch hides the vendor menu [Verified by code; end-to-end not exercised — P0]

- **Files:**
  - `sign-up/page.tsx:20-23` — option `{ value: "Vendor", label: "Restaurant Vendor" }`
  - `sign-up/page.tsx:37` — `role: objectData.role as Role`
  - `dashboard-menu-config.ts:44-48` — keys `vendor | customer | admin` (lowercase)
  - `login`/`useSession` consumers compare against lowercase values
- **Cause:** the form sends `"Vendor"` while the union, config keys, and server enum all use `"vendor"`. The `as Role` cast suppresses the TypeScript error.
- **Likely result:** a vendor who signs up gets `session.user.role === "Vendor"`, `dashboardMenuItems["Vendor"]` is `undefined`, `?? []` yields an **empty sidebar**, and vendor pages render without navigation.
- **Additional risk:** Better Auth does not runtime-validate the enum for this array-typed field (its client schema maps such fields to `z.any()`), so arbitrary strings can be stored.
- **Not exercised end-to-end** to avoid creating accounts/mutating the database during the audit.

### 7.4 No authorization on `/dashboard/*` [Verified — P0]

- There is no `middleware.ts`, no server-side session check in `dashboard/layout.tsx`, and no redirect.
- Any visitor can load `/dashboard/admin`, `/dashboard/customer`, and `/dashboard/vendor` (currently only placeholder headings, but this becomes critical as features land).
- The sidebar only changes which links are shown; it does not enforce access.

### 7.5 Sign-out redirects to a route that does not exist [Verified — P1]

- **File:** `src/components/Navbar/Navbar.tsx:44`
- `router.push("/login")`, but the app only has `/sign-in` and `/sign-up`.
- Result: logging out lands on a 404. Should target `/sign-in` (or `/`).
- The old `DropDownProfile.tsx` used `/sign-in`; the logic was changed when the markup was inlined.

### 7.6 Dashboard navigation points at unimplemented routes [Verified — P1]

- `dashboard-menu-config.ts` links to `/dashboard/vendor/menu`, `/menu/new`, `/orders`, `/subscription`, `/profile`, `/dashboard/customer/orders`, `/profile`, `/dashboard/admin/users`, `/menu`, `/transactions`.
- Only the three overview pages exist. `/dashboard` itself is also missing.
- Clicking most sidebar items produces 404s.

### 7.7 Navbar duplication and stale documentation conflict [Verified — P1]

- `Navbar.tsx` repeats the same auth/profile dropdown markup **three times**: mobile header (lines ~138-176), desktop header (lines ~226-264), and inside the mobile menu (lines ~347-382).
- `src/components/Navbar/DropDownProfile.tsx` was deleted, but `AGENTS.md` still says it "was inspected and unchanged" and that it is "intentionally not rendered inside the expandable mobile navigation menu."
- Current code **does** render the profile dropdown inside the mobile menu when a session exists (`Navbar.tsx:347`).
- The mobile header also renders the profile image, so an authenticated mobile user can see two profile triggers (header + expanded menu).
- `AGENTS.md` must not be edited; treat this section as the authoritative note on the contradiction until the user resolves it.

### 7.8 Metadata is missing [Verified — P1]

- `src/app/layout.tsx` has **no `metadata` export**.
- Verified in the browser: `document.title === ""` on `/`, `/dashboard/vendor`, etc.
- No description, Open Graph data, or per-page titles. The tab shows no brand name.
- An earlier version of this project had `title: "PizzaHub"`; it was removed during the font/layout changes.

### 7.9 Font CSS variables are referenced but never defined [Verified — P1]

- **File:** `src/app/layout.tsx:14-37`
- Five fonts are created (`dmSerif`, `cinzel`, `dancingScript`, `lato`, `playfair`), but **only `lato` is applied** (`className` on `<html>`/`<body>`).
- None use the `.variable` option, so `--font-dm-serif`, `--font-lato`, and `--font-dancing-script` are undefined.
- Verified: `getComputedStyle(document.documentElement).getPropertyValue("--font-dm-serif")` returns `""`.
- `globals.css:96-99` maps `--font-heading`, `--font-sans`, `--font-serif`, `--font-script` to those missing variables, so `font-serif` / `font-heading` resolve to invalid values (effectively falling back to inherited Lato).
- The banner headline still renders Playfair only because `Banner.tsx` imports `playfair` from `@/app/layout` and applies `playfair.className` directly.
- `cinzel`/`dmSerif`/`dancingScript` are otherwise dead and still add font work at build time.

### 7.10 Client component imports the root layout module [Verified — P1]

- **File:** `src/components/Banner/Banner.tsx:6` — `import { playfair } from "@/app/layout";`
- `layout.tsx` is a server layout module. Importing it into the client bundle couples the banner to the layout file, drags the layout module into the client graph, and is fragile if the layout later uses server-only APIs.
- It works today (build passes), but font objects should live in a neutral module (e.g. `src/lib/fonts.ts`) if this pattern is kept.

### 7.11 Auth/session UX issues [Verified — P2]

- While `useSession()` is pending, the navbar shows the **unauthenticated** skeleton (Sign In / Join Free placeholders) even if the user is signed in (`Navbar.tsx:130-137`, `218-225`, `324-331`).
- The navbar avatar is hardcoded to `https://github.com/shadcn.png` in all three dropdowns, and the dropdown has no user name/email.
- `DropdownMenuTrigger` renders an `Image` with `alt="Open"` and no `aria-label` such as "Open profile menu".
- Navbar active-link styling uses exact equality (`pathname === link.src`), so nested routes do not highlight the parent link.
- Cart buttons have no `onClick` and a hardcoded `0` badge.

### 7.12 Form validation is absent [Verified — P2]

- Both auth forms use `<form noValidate>` and inputs without `required`, `minLength`, or client-side error display.
- Empty/invalid submissions are sent to Better Auth; feedback arrives only as a toast.
- Sign-up does not confirm the password and does not check the Better Auth password policy before submission.
- The sign-in error fallback text is wrong: "An error occurred while creating your account." (`sign-in/page.tsx:42`).

### 7.13 Auth client config risk [Assumption — P2]

- `src/lib/auth-client.ts:6` reads `process.env.BETTER_AUTH_URL`.
- Only `NEXT_PUBLIC_*` variables are exposed to browser code in Next.js. This variable is therefore likely `undefined` client-side, and Better Auth relies on a same-origin fallback.
- If the app is deployed with the auth API on another origin, the client will not use the configured URL.
- `NEXT_PUBLIC_BASE_URL` exists in `.env` but is unused by the source.

### 7.14 Theme tokens referenced but undefined [Verified — P2]

- `globals.css` uses `--color-destructive` (line 128) and `--color-chart-1..5` (lines 118-122) in `@theme inline`, but `:root` never defines `--destructive` or `--chart-*`.
- Components that rely on `bg-destructive`/chart colors will not get the intended palette.
- `--bg-background` (line 94) looks like a typo for `--color-background` and is unused.

### 7.15 Sidebar state cookie is write-only [Verified — P2]

- `sidebar.tsx:86` sets the `sidebar_state` cookie, but nothing reads it during initialization.
- `SidebarProvider` always starts from `defaultOpen` (`true`), so the sidebar does not actually persist across reloads despite the comment.

### 7.16 Performance and asset issues [Verified — P2]

- `public/pizza1.webp` is ~1.07 MB and is the preloaded first hero image; on slow connections this dominates LCP.
- All five slides are rendered simultaneously with `fill` and `sizes="100vw"`.
- The carousel auto-advances every 6 seconds with no pause control and no `prefers-reduced-motion` handling.

### 7.17 Unused code and dependencies [Verified — P2]

- `src/components/ui/avatar.tsx` is not imported anywhere.
- `framer-motion` and `next-themes` are dependencies but not imported in `src`.
- `shadcn` is listed as a runtime dependency (it is normally a CLI/dev tool).
- `SidebarRail`, `SidebarMenuSkeleton`, `SidebarHeader`, and several other sidebar primitives are exported but unused by the dashboard.
- `Banner` also imports fonts that are not used (`dmSerif`, etc. exported from `layout.tsx`).
- `Skeleton` is used only inside the sidebar-generated skeleton.

### 7.18 Remote image policy is wide open [Verified — P2]

- `next.config.ts:7-13` allows `https` images from **any** hostname (`hostname: "**"`).
- Combined with the hardcoded GitHub avatar, this is convenient for prototyping but unsafe as a default.

### 7.19 Documentation and tooling gaps [Verified — P2]

- `README.md` is still the default `create-next-app` text and does not describe this project.
- No `typecheck` script, no tests, no CI, no Prettier/format script.
- No `.env.example`; required variables are only discoverable by reading source.
- `package.json` name `pizza-odering-client` is misspelled but is the actual package identity.

---

## 8. Environment Variables

`.env` is gitignored (`.env*` in `.gitignore`). The audit only inspected **names**, not secret values.

| Variable | Used by | Notes |
| --- | --- | --- |
| `MONGO_URL` | `src/lib/auth.ts:5` | Required. Cast `as string`; no startup validation. |
| `BETTER_AUTH_SECRET` | Better Auth runtime convention | Present in `.env`, not referenced directly in source. |
| `BETTER_AUTH_URL` | `src/lib/auth-client.ts:6` | Not `NEXT_PUBLIC_*`; see §7.13. |
| `NEXT_PUBLIC_BASE_URL` | **unused** | Present in `.env`; no source reference. |
| `GITHUB_CLIENT_ID` | `src/lib/auth.ts:22` | **Missing** from `.env`; causes build warning. |
| `GITHUB_CLIENT_SECRET` | `src/lib/auth.ts:23` | **Missing** from `.env`; causes build warning. |

Database name `"pizza-hub"` is hardcoded in `src/lib/auth.ts:6`; there is no separate DB-name env var.

---

## 9. Coding Conventions and Patterns

Follow these when modifying the project.

1. **App Router + `src/`**: routes live in `src/app`; route groups in parentheses; private component folders use `_components`.
2. **Aliases**: always import via `@/...` (`@/*` → `./src/*`).
3. **Client vs server**: add `"use client"` only when hooks, events, or browser APIs are needed. Pages with forms and the navbar/banner are client components. The root layout and dashboard layout are server components.
4. **Base UI, not Radix**:
   - Primitives come from `@base-ui/react/*`.
   - Composition uses the `render` prop (`<Trigger render={<Link href="..." />} />`), **not** `asChild`.
   - Do not copy Radix-based shadcn snippets into this project without adapting them.
5. **UI components**: generated shadcn "base-nova" files live in `src/components/ui`. Reuse them; do not fork unless necessary.
6. **Class merging**: `cn(...)` from `"cn"` (also re-exported by `@/lib/utils`). Variants use `class-variance-authority`.
7. **Styling tokens**: use semantic classes (`bg-primary`, `text-text-secondary`, `border-border`, `bg-section`, `text-muted-foreground`). Avoid raw hex values where a token exists; note that auth pages currently use raw hex backgrounds.
8. **Tailwind v4**: no config file; extend tokens inside `globals.css` under `:root`, `.dark`, and `@theme inline`.
9. **Auth**: use the shared `authClient` from `@/lib/auth-client`. Never create a second client (an earlier duplicate-client bug was fixed). Use `useSession()` for session state.
10. **Forms**: use `Field`, `FieldGroup`, `FieldLabel` with `Input`/`Select`; report outcomes with `toast.add(...)`. There is no form library (no react-hook-form/zod resolver).
11. **Naming**: components are PascalCase; route folders are kebab-case; handler names in the codebase use the existing `handel...` typo (`handelSignIn`, `handelSignUp`, `handelSignOut`). Do not rename them as part of unrelated work.
12. **Formatting**: the codebase mixes semicolons/no-semicolons and quote styles; there is no formatter. Match the file you are editing.
13. **Type safety**: `strict` is on; avoid `as` casts that hide real mismatches (the role cast is the cautionary example). Note that `tsc` passes even with the `"Vendor"` bug because of the cast.
14. **Comments**: sparse; a few explain carousel timing and sidebar behavior.
15. **Verification**: run lint, `tsc --noEmit`, and build. Remember lint is currently red before your change.

---

## 10. File-by-File Reference

### App shell and routes

| File | Purpose / notes |
| --- | --- |
| `src/app/layout.tsx` | Root layout. Creates five Google fonts, applies only `lato.className`, renders `{children}` + `<Toaster />`, and exports all font objects. No `metadata`, no font variables. |
| `src/app/page.tsx` | `<main><Navbar /><Banner /></main>`. |
| `src/app/globals.css` | Tailwind/shadcn imports; light/dark tokens; sidebar token mapping; `@theme inline`; base layer. |
| `src/app/(auth)/sign-in/page.tsx` | 131 lines. Email/password form, toast feedback, redirect to `/`. `console.log(data)`. |
| `src/app/(auth)/sign-up/page.tsx` | 185 lines. Full name/email/password/role form, toast feedback, redirect to `/`. `console.log(...)`. Role option uses `"Vendor"`. |
| `src/app/api/auth/[...all]/route.ts` | Better Auth handler export. |

### Dashboard

| File | Purpose / notes |
| --- | --- |
| `src/app/dashboard/layout.tsx` | `SidebarProvider` + dashboard `Navbar` + `DashboardSideBar` + `SidebarInset`. No auth guard. |
| `src/app/dashboard/_components/DashboardSideBar.tsx` | Computes role with `|| "customer"`, looks up menu config, renders sidebar + footer. |
| `src/app/dashboard/_components/dashboard-menu-config.ts` | Role → menu items (lowercase keys). Most hrefs are unimplemented. |
| `src/app/dashboard/_components/DashboardSideFooter.tsx` | Hardcoded "PizzaHub User" and role label; static button. |
| `src/app/dashboard/_components/SidebarLink.tsx` | Link-based menu button with active styling. |
| `src/app/dashboard/{admin,customer,vendor}/page.tsx` | Placeholder headings. |

### Public components

| File | Purpose / notes |
| --- | --- |
| `src/components/Navbar/Navbar.tsx` | 389 lines. `variant: "home" | "dashboard"`. Session-aware links, cart placeholder, three copies of the profile dropdown, mobile menu, dashboard `SidebarTrigger`. Sign-out goes to `/login` (bug). |
| `src/components/Banner/Banner.tsx` | 5-slide carousel, arrows, 6s interval, dark overlays. Imports `playfair` from the layout. |

### UI primitives (`src/components/ui`)

| File | Notes |
| --- | --- |
| `button.tsx` | Base UI Button + cva variants (`default`, `outline`, `secondary`, `ghost`, `destructive`, `link`). |
| `input.tsx` | Base UI Input wrapper. |
| `label.tsx` | Plain `<label>` wrapper. |
| `field.tsx` | Field/FieldGroup/FieldLabel/FieldDescription/FieldError/etc. |
| `select.tsx` | Base UI Select wrappers. |
| `dropdown-menu.tsx` | Base UI Menu wrappers, `render`-prop composition. |
| `sheet.tsx` | Base UI Dialog-based sheet; used by mobile sidebar. |
| `sidebar.tsx` | 728 lines. Provider, desktop sidebar, mobile sheet, trigger, rail, menu primitives, cookie state. |
| `skeleton.tsx` | Pulse placeholder. |
| `tooltip.tsx` | Base UI Tooltip wrappers. |
| `toast.tsx` | Base UI Toast manager + `Toaster`, `toast` singleton. |
| `avatar.tsx` | Avatar primitives; **unused**. |
| `separator.tsx` | Base UI Separator wrapper. |

### Lib / hooks

| File | Notes |
| --- | --- |
| `src/lib/auth.ts` | Better Auth server config, Mongo adapter, DB `pizza-hub`, role additional field, GitHub provider. |
| `src/lib/auth-client.ts` | Browser client + `inferAdditionalFields`; non-public `baseURL`. |
| `src/lib/types/role.ts` | Lowercase role union. |
| `src/lib/utils.ts` | `export { cn } from "cn"`. |
| `src/hooks/use-mobile.ts` | 1024px breakpoint; lint failure at line 15. |

### Root config

| File | Notes |
| --- | --- |
| `package.json` | Scripts: `dev`, `build`, `start`, `lint`. No test/typecheck. |
| `tsconfig.json` | Strict, `moduleResolution: "bundler"`, `@/*` alias, Next plugin. |
| `next.config.ts` | `cacheComponents`, `partialPrefetching`, wildcard remote images, Turbopack CSS loader rule. |
| `eslint.config.mjs` | Next.js flat config. |
| `components.json` | shadcn base-nova, RSC, aliases, lucide. |
| `AGENTS.md` | Next.js agent rules + responsive navbar note; do not edit. |
| `README.md` | Default boilerplate. |

---

## 11. Recommended Next Steps (priority order)

These are suggestions from the audit, **not changes made**.

1. **Fix lint**: restructure `use-mobile.ts` so state is initialized without a synchronous `setState` inside the effect (for example, a `useSyncExternalStore`-based subscription to `matchMedia`).
2. **Normalize roles end-to-end**:
   - Change the sign-up option value to `"vendor"`.
   - Remove the `as Role` cast (let the compiler catch mismatches).
   - Add server-side validation/default for `role` (Better Auth additional-field config or a database-level rule).
   - Keep `Role`, Better Auth enum, and menu-config keys in sync.
3. **Fix sidebar role resolution**: do not default missing/unknown roles to the customer menu without an explicit redirect or loading state. Handle `isPending` separately.
4. **Add dashboard authorization**: server-side session/role check (middleware or layout) and redirect unauthenticated users to `/sign-in`, plus role-appropriate redirects (`/dashboard` → role overview).
5. **Fix sign-out redirect** from `/login` to `/sign-in`.
6. **Implement `/dashboard` index** and either create the linked pages or disable/hide links until they exist.
7. **Restore metadata** in `src/app/layout.tsx` (title template, description, icons) and add per-page titles.
8. **Fix font wiring**: either apply `.variable` classes and use them in `@theme`, or remove the unused fonts and define `--font-*` tokens explicitly. Move the `playfair` export out of `layout.tsx` if the banner keeps using it.
9. **De-duplicate navbar account UI** into one component (the deleted `DropDownProfile` is effectively the missing abstraction) and align behavior with `AGENTS.md`.
10. **Add client-side form validation** and correct the sign-in error copy.
11. **Optimize images** (compress `pizza1.webp`, use responsive sizes, consider a single prioritized slide).
12. **Harden config**: restrict `images.remotePatterns`, add `.env.example`, add `typecheck`/format/test scripts, replace the default `README.md`.

---

## 12. Rules for Future Agents

- **Do not** edit `AGENTS.md`; it is managed by `next dev` and contains the project's Next.js guidance.
- **Do not** modify auth, dashboard, or UI behavior unless the user explicitly asks; this audit found real bugs but intentionally left them unchanged.
- **Do not** create test accounts or mutate the production/local MongoDB to "verify" role behavior without explicit permission.
- **Do** read the relevant bundled Next.js docs before using unfamiliar APIs (`node_modules/next/dist/docs/`), per `AGENTS.md`.
- **Do** preserve the existing Base UI `render`-prop pattern and the `cn` import convention.
- **Do** update this file when you fix one of the bugs in §7 or add routes/env vars.
- **Do** run `npm.cmd run lint`, `npx.cmd tsc --noEmit`, and `npm.cmd run build` in PowerShell; note that lint is red at the time of this audit.
- **Remember** the dev server runs at `http://localhost:3000`.

---

## 13. Audit Change Log

| Date | Change |
| --- | --- |
| 2026-11-19 | Initial audit: project scaffold, banner, navbar, auth setup, sign-in/sign-up UI. |
| 2026-11-20 | Re-audit after commits `efba16e`…`3e4cb9d`: dashboard routes, sidebar shell, role menus, navbar refactor (profile dropdown inlined, `DropDownProfile.tsx` removed), layout/font changes. Verified current lint failure, passing type-check/build, empty metadata, missing font variables, and the confirmed sidebar role bug. Documentation only; no code changes. |
