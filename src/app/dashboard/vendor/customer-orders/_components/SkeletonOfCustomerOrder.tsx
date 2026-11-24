
const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
);

const COLS =
  "md:grid-cols-[2fr_1fr_1fr_auto_auto] lg:grid-cols-[2.2fr_1fr_1fr_1.5fr_0.8fr_1.4fr]";

function SkeletonRow() {
  return (
    <div
      className={`grid grid-cols-1 gap-4 border-b border-gray-200 px-4 py-4 last:border-b-0 sm:px-6 md:items-center md:gap-6 ${COLS}`}
    >
      {/* Item */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-gray-200 sm:h-16 sm:w-16" />
        <div className="min-w-0 flex-1 space-y-2">
          <Bar className="h-4 w-4/5 max-w-55" />
          <Bar className="h-3 w-1/2 max-w-30" />
        </div>
        {/* Mobile-only status pill (top right of card) */}
        <Bar className="h-6 w-16 rounded-full md:hidden" />
      </div>

      {/* Delivery date + address (mobile: 2-column mini grid) */}
      <div className="grid grid-cols-2 gap-4 md:contents">
        <div className="space-y-1.5">
          <Bar className="h-3 w-16 md:hidden" />
          <Bar className="h-4 w-24" />
        </div>
        <div className="space-y-1.5">
          <Bar className="h-3 w-16 md:hidden" />
          <Bar className="h-4 w-20" />
        </div>
      </div>

      {/* Requested (desktop only) */}
      <div className="hidden lg:block">
        <Bar className="h-4 w-full max-w-50" />
      </div>

      {/* Status (tablet + desktop) */}
      <div className="hidden md:block">
        <Bar className="h-6 w-16 rounded-full" />
      </div>

      {/* Actions */}
      <div className="flex gap-2 md:gap-3">
        <div className="h-10 flex-1 animate-pulse rounded-full bg-gray-200 md:w-20 md:flex-none" />
        <div className="h-10 flex-1 animate-pulse rounded-full bg-gray-200 md:w-20 md:flex-none" />
      </div>
    </div>
  );
}

export default function OrdersSkeleton({ rows = 4 }) {
  return (
    <div
      className="w-full px-3 py-4 sm:px-6 lg:px-8"
      role="status"
      aria-busy="true"
      aria-label="Loading orders"
    >
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
        {/* Table header (md and up) */}
        <div
          className={`hidden gap-6 border-b border-gray-200 px-6 py-5 md:grid ${COLS}`}
        >
          <Bar className="h-4 w-12" />
          <Bar className="h-4 w-20" />
          <Bar className="h-4 w-24" />
          <Bar className="hidden h-4 w-20 lg:block" />
          <Bar className="h-4 w-14" />
          <Bar className="h-4 w-16" />
        </div>

        {/* Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </div>

      {/* Footer text: "Showing 4 of 4 orders" */}
      <Bar className="mt-4 h-4 w-40" />

      <span className="sr-only">Loading...</span>
    </div>
  );
}