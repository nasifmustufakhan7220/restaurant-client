

function Bar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />;
}

export default function CheckoutSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-7xl px-4 py-6 md:px-0"
      aria-busy="true"
      aria-label="Loading checkout"
    >
      {/* Page header */}
      <Bar className="h-9 w-44" />
      <Bar className="mt-3 h-5 w-80 max-w-full" />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Order summary card */}
        <section className="rounded-[32px] bg-white p-10">
          <Bar className="h-6 w-40" />

          {/* Plan row */}
          <div className="mt-8 flex items-start justify-between">
            <div className="space-y-3">
              <Bar className="h-5 w-40" />
              <Bar className="h-4 w-32" />
              <Bar className="h-7 w-24 rounded-full" />
            </div>
            <Bar className="h-7 w-24" />
          </div>

          <div className="my-6 h-px w-full bg-gray-200" />

          {/* Feature list */}
          <ul className="space-y-5">
            {["w-56", "w-64", "w-72", "w-48"].map((w) => (
              <li key={w} className="flex items-center gap-4">
                <Bar className="h-9 w-9 shrink-0 rounded-full" />
                <Bar className={`h-5 ${w} max-w-full`} />
              </li>
            ))}
          </ul>
        </section>

        {/* Payment card */}
        <section className="h-fit rounded-[32px] bg-white p-10">
          <Bar className="h-6 w-28" />

          {/* Subtotal */}
          <div className="mt-8 flex items-center justify-between">
            <Bar className="h-4 w-16" />
            <Bar className="h-4 w-16" />
          </div>

          <div className="my-5 h-px w-full bg-gray-200" />

          {/* Total */}
          <div className="flex items-center justify-between">
            <Bar className="h-5 w-12" />
            <Bar className="h-9 w-28" />
          </div>

          {/* Pay button */}
          <Bar className="mt-8 h-16 w-full rounded-2xl" />

          {/* Secure note + back link */}
          <div className="mt-6 flex justify-center">
            <Bar className="h-4 w-56" />
          </div>
          <div className="mt-5 flex justify-center">
            <Bar className="h-4 w-40" />
          </div>
        </section>
      </div>
    </div>
  );
}