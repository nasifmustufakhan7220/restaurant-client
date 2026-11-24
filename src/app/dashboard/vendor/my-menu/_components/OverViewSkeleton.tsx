// A small reusable block: a grey rounded box that pulses
function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-black/10 ${className}`} />;
}

// Heights for the 7 fake chart bars (Mon to Sun)
const barHeights = ["h-16", "h-24", "h-12", "h-32", "h-40", "h-48", "h-28"];

// Used to repeat things: 5 stat cards, 4 table rows
const statCards = [1, 2, 3, 4, 5];
const tableRows = [1, 2, 3, 4];

export default function Loading() {
  return (
    <div className="p-6 sm:p-10">
      {/* Page title */}
      <Skeleton className="h-9 w-44" />

      {/* Stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((item) => (
          <div
            key={item}
            className="flex items-start justify-between rounded-3xl border border-black/5 bg-white p-5"
          >
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
            {/* icon box */}
            <Skeleton className="size-11 rounded-xl" />
          </div>
        ))}
      </div>

      {/* Chart + table */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        {/* Orders this week (bar chart) */}
        <div className="rounded-3xl border border-black/5 bg-white p-5">
          <Skeleton className="h-6 w-40" />

          <div className="mt-8 flex h-56 items-end justify-between gap-3">
            {barHeights.map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <Skeleton className={`w-full rounded-xl ${height}`} />
                <Skeleton className="h-3 w-8" />
              </div>
            ))}
          </div>
        </div>

        {/* Customer orders (table) */}
        <div className="rounded-3xl border border-black/5 bg-white p-5">
          <Skeleton className="h-6 w-36" />

          {/* table header */}
          <div className="mt-6 grid grid-cols-4 gap-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-4 w-12" />
          </div>

          {/* table rows */}
          <div className="mt-4 space-y-4">
            {tableRows.map((row) => (
              <div
                key={row}
                className="grid grid-cols-4 items-center gap-3 border-t border-black/5 pt-4"
              >
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}