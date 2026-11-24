// TransactionsSkeleton.jsx
// Tailwind CSS only. Responsive:
// mobile (<768px)  = stat cards stacked, each transaction as a card
// tablet (md)      = stat cards in 3 cols, table without "Payment ID"
// desktop (lg+)    = full 5-column table

const Bar = ({ className = "" }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
);

const COLS =
  "md:grid-cols-[2fr_1.4fr_1fr_1fr] lg:grid-cols-[2.2fr_1.6fr_1fr_1fr_2fr]";

function StatCardSkeleton() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white px-5 py-5 sm:px-6">
      <Bar className="h-4 w-28" />
      <Bar className="mt-4 h-8 w-12" />
    </div>
  );
}

function TransactionRowSkeleton() {
  return (
    <div
      className={`grid grid-cols-1 gap-3 border-b border-gray-200 px-4 py-4 last:border-b-0 sm:px-6 md:items-center md:gap-6 ${COLS}`}
    >
      {/* Vendor (email + ID) */}
      <div className="space-y-2">
        <Bar className="h-4 w-4/5 max-w-57.5" />
        <Bar className="h-3 w-3/5 max-w-47.5" />
      </div>

      {/* Date */}
      <div className="space-y-1.5">
        <Bar className="h-3 w-12 md:hidden" />
        <Bar className="h-4 w-36" />
      </div>

      {/* Payment + Status badges */}
      <div className="flex items-center gap-3 md:contents">
        <Bar className="h-6 w-14 rounded-full" />
        <Bar className="h-6 w-20 rounded-full" />
      </div>

      {/* Payment ID (desktop only) */}
      <div className="hidden space-y-2 lg:block">
        <Bar className="h-3 w-4/5 max-w-57.5" />
        <Bar className="h-3 w-3/5 max-w-47.5" />
      </div>
    </div>
  );
}

export default function TransactionsSkeleton({ rows = 3 }) {
  return (
    <div
      className="w-full space-y-6 px-3 py-4 sm:px-6 lg:px-8"
      role="status"
      aria-busy="true"
      aria-label="Loading transactions"
    >
      {/* Stat cards: Total / Paid / Not paid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Table */}
      <div>
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">
          {/* Header (md and up) */}
          <div
            className={`hidden gap-6 border-b border-gray-200 px-6 py-5 md:grid ${COLS}`}
          >
            <Bar className="h-4 w-16" />
            <Bar className="h-4 w-12" />
            <Bar className="h-4 w-16" />
            <Bar className="h-4 w-14" />
            <Bar className="hidden h-4 w-20 lg:block" />
          </div>

          {Array.from({ length: rows }).map((_, i) => (
            <TransactionRowSkeleton key={i} />
          ))}
        </div>

        {/* "Showing 3 of 3 transactions" */}
        <Bar className="mt-4 h-4 w-48" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}