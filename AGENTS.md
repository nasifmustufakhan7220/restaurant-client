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

## Task in progress: Vendor Menu Item Details page UI
Status: Done | Last completed step: Step 5 | Next step: none
- [x] Step 3: Create components
- [x] Step 4: Build the page
- [x] Step 5: Self-check
Files created:
- src/app/dashboard/vendor/my-menu/[id]/page.tsx
- src/app/dashboard/vendor/my-menu/_components/menuDetails/status-config.ts
- src/app/dashboard/vendor/my-menu/_components/menuDetails/DetailsHeader.tsx
- src/app/dashboard/vendor/my-menu/_components/menuDetails/ItemGallery.tsx
- src/app/dashboard/vendor/my-menu/_components/menuDetails/ApprovalStatusCard.tsx
- src/app/dashboard/vendor/my-menu/_components/menuDetails/ItemDetailsCard.tsx
Menu Item Details page: UI done, no functionality yet.
FUNCTIONALITY markers:
- `{/* FUNCTIONALITY: connect Edit here */}` in DetailsHeader.tsx
- `{/* FUNCTIONALITY: connect Delete and confirm dialog here */}` in DetailsHeader.tsx
- `{/* FUNCTIONALITY: image gallery switching here */}` in ItemGallery.tsx
- `{/* FUNCTIONALITY: connect availability toggle here */}` in ItemDetailsCard.tsx
- `{/* FUNCTIONALITY: load real item data here */}` in page.tsx
