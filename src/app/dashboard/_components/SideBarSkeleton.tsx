// SidebarSkeleton.jsx
// Tailwind CSS only. Fills its parent's height, so it works as a fixed
// desktop sidebar or inside a mobile drawer/sheet.
// Width: full width on mobile drawer, fixed 320px (w-80) from md up.

const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
);

function MenuItemSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3.5">
      {/* icon */}
      <Bar className="h-5 w-5 shrink-0 rounded" />
      {/* label */}
      <Bar className="h-4 w-24 max-w-[60%]" />
    </div>
  );
}

export default function SidebarSkeleton({ items = 4 }) {
  return (
    <aside
      className="flex h-full min-h-screen w-full flex-col border-r border-gray-200 bg-white md:w-80"
      role="status"
      aria-busy="true"
      aria-label="Loading menu"
    >
      {/* Menu section */}
      <div className="flex-1 px-4 pt-8">
        {/* "MENU" label */}
        <Bar className="mb-5 ml-3 h-3 w-14" />

        <nav className="space-y-1.5">
          {Array.from({ length: items }).map((_, i) => (
            <MenuItemSkeleton key={i} />
          ))}
        </nav>
      </div>

      {/* User footer */}
      <div className="flex items-center gap-3 border-t border-gray-200 px-5 py-5">
        {/* avatar */}
        <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-gray-200" />

        {/* name + role */}
        <div className="min-w-0 flex-1 space-y-2">
          <Bar className="h-4 w-28 max-w-full" />
          <Bar className="h-3 w-20 max-w-full" />
        </div>

        {/* chevron */}
        <Bar className="h-4 w-4 shrink-0 rounded" />
      </div>

      <span className="sr-only">Loading...</span>
    </aside>
  );
}