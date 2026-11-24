<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project-specific responsive navbar note

- On mobile and tablet widths below `lg`, the existing cart control and authenticated `DropDownProfile` remain in the navbar header beside the hamburger button.
- `DropDownProfile` is intentionally not rendered inside the expandable mobile navigation menu.
- The mobile menu continues to control the existing navigation and unauthenticated sign-in/join links.
- The responsive layout change is implemented in `src/components/Navbar/Navbar.tsx`; `src/components/Navbar/DropDownProfile.tsx` was inspected and unchanged.

## Task in progress: TypeScript cleanup and central types
Status: Done | Last completed step: Step 7 | Next step: none
Errors at start: 18 | Errors now: 0
- [x] Step 1: Collect the errors
- [x] Step 2: Inventory the existing types
- [x] Step 3: Create the central types folder
- [x] Step 4: Move types and update imports
- [x] Step 5: Fix the remaining errors (type-only)
- [x] Step 6: Verify (no runtime change)
- [x] Step 7: Final report

Working tree was NOT clean at start (pre-existing changes from previous tasks).

### Central type files (`src/lib/types/`)
- `menu-item.ts` — `MenuItemStatus`, `MenuItem`, `MenuItemData`, `Category`
- `order.ts` — `OrderStatus`, `Order`
- `user.ts` — `SubscriptionPlan`, `UserItem`, `UserDetails`
- `role.ts` — `Role`
- `home.ts` — re-exports `Category` and `MenuItem`

### Files touched by this task
- `src/lib/types/menu-item.ts` — made `itemName`, `images`, `vendorEmail`, `vendorName` optional
- `src/lib/types/home.ts` — added re-export of `MenuItem`
- `src/app/dashboard/customer/_components/order.ts` — added re-export of `Order`, `OrderStatus`
- `src/app/(public)/publicMenu/_components/OrderDialog.tsx` — set `OrderDialogProps = MenuItem`, added import, assertions
- `src/app/(public)/browse/_components/FirstBrowse.tsx` — import from `@/lib/types/menu-item`
- `src/app/dashboard/_components/overview/FirstOverview.tsx` — import from `@/lib/types/menu-item`, status assertion
- `src/app/dashboard/vendor/my-menu/_components/FirstOverViewVendor.tsx` — import from `@/lib/types/menu-item`
- `src/app/dashboard/admin/_components/UserActions.tsx` — import from `@/lib/types/user`
- `src/app/dashboard/admin/_components/UserCard.tsx` — import from `@/lib/types/user`
- `src/app/(public)/publicMenu/_components/PublicDetailsCard.tsx` — type assertions
- `src/app/dashboard/_components/overview/OrdersTableCard.tsx` — widened `cells` to `(string | number | undefined)[]`
- `src/app/dashboard/vendor/my-menu/_components/menuDetails/MenuDetailsCard.tsx` — non-null assertions
- `src/app/dashboard/vendor/my-menu/_components/MenuItemCard.tsx` — type assertions
- `src/components/Home/MenuCard.tsx` — type assertions

### Duplicates merged
- `MenuItem` / `MenuItemStatus`: merged admin's `menu-items-data.ts` definition and vendor's `menuItemsData.ts` usage into one `MenuItem` in `src/lib/types/menu-item.ts`
- `MenuItemData`: alias for `MenuItem` in `src/lib/types/menu-item.ts` (was local to `@/lib/actions/menu`)
- `UserItem`: was duplicated in `users-data.ts`; now single source in `src/lib/types/user.ts`
- `Order` / `OrderStatus`: was in `customer/_components/order.ts`; now in `src/lib/types/order.ts`
- `Category`: was in `home.ts`; now in `menu-item.ts` with re-export from `home.ts`

### Rule for the future
New shared types go in `src/types/` (currently `src/lib/types/`). Types describe the real data. Never change the data to fit a type.

## Task: Vercel serverless MongoDB/Better Auth stability
- `src/lib/auth.ts`: cached one `MongoClient` on `globalThis._mongoClient` (maxPoolSize 5, serverSelectionTimeoutMS 5000), passed to `mongodbAdapter(db, { client })`; no `client.close()`.
- Enabled Better Auth `session.cookieCache` (enabled: true, maxAge: 5 * 60).
- Server-side Express API fetches use `cache: "no-store"`; layouts under `src/app/dashboard` and `src/app/(public)` set `export const dynamic = "force-dynamic"`.
- GET helpers in `src/lib/api/*` now return safe fallbacks (`[]` / `null`) instead of throwing.
- Env vars to verify in Vercel: MONGODB_CLIENT_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL, NEXT_PUBLIC_API_BASE_URL, STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXT_PUBLIC_IMGBB_API_KEY.
