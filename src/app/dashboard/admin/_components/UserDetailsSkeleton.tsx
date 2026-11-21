function Bone({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />;
}

// ডেস্কটপ/ট্যাবলেটের টেবিল রো
function TableRowSkeleton() {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] items-center gap-4 border-b border-gray-200 px-4 py-4 last:border-b-0 lg:grid-cols-[2.5fr_1fr_0.7fr_1.5fr_1.5fr] lg:px-6">
      {/* User */}
      <div className="flex items-center gap-3">
        <Bone className="h-11 w-11 shrink-0 rounded-full" />
        <div className="w-full space-y-2">
          <Bone className="h-4 w-3/4" />
          <Bone className="h-3 w-full max-w-50" />
        </div>
      </div>

      {/* Role */}
      <Bone className="h-6 w-16 rounded-full" />

      {/* Plan (শুধু lg থেকে দেখাবে) */}
      <Bone className="hidden h-4 w-4 lg:block" />

      {/* Joined (শুধু lg থেকে দেখাবে) */}
      <Bone className="hidden h-4 w-36 lg:block" />

      {/* Actions */}
      <div className="flex gap-2">
        <Bone className="h-9 w-16 rounded-full lg:w-20" />
        <Bone className="h-9 w-16 rounded-full lg:w-20" />
      </div>
    </div>
  );
}

// মোবাইলের কার্ড
function MobileCardSkeleton() {
  return (
    <div className="space-y-4 rounded-2xl border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <Bone className="h-11 w-11 shrink-0 rounded-full" />
        <div className="w-full space-y-2">
          <Bone className="h-4 w-2/3" />
          <Bone className="h-3 w-full" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Bone className="h-6 w-16 rounded-full" />
        <Bone className="h-3 w-32" />
      </div>

      <div className="flex gap-2">
        <Bone className="h-9 flex-1 rounded-full" />
        <Bone className="h-9 flex-1 rounded-full" />
      </div>
    </div>
  );
}

export default function UserDetailsSkeleton() {
  // ৫টা ফেক রো বানানোর জন্য
  const rows = Array.from({ length: 5 });

  return (
    <div className="w-full">
      {/* Page title */}
      <div className="mb-6 space-y-3">
        <Bone className="h-8 w-48 sm:w-60" />
        <Bone className="h-4 w-full max-w-md" />
      </div>

      <div className="rounded-3xl bg-white p-4 sm:p-6">
        {/* Stat cards: মোবাইলে 2 কলাম, ডেস্কটপে 4 কলাম */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="space-y-3 rounded-3xl border border-gray-200 p-4 sm:p-5">
              <Bone className="h-4 w-20" />
              <Bone className="h-7 w-10" />
            </div>
          ))}
        </div>

        {/* Filters: মোবাইলে উপর-নিচে, ট্যাবলেটে পাশাপাশি */}
        <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-gray-200 p-4 md:flex-row md:p-5">
          <Bone className="h-11 w-full rounded-full md:flex-1" />
          <Bone className="h-11 w-full rounded-full md:w-48" />
          <Bone className="h-11 w-full rounded-full md:w-48" />
        </div>

        {/* মোবাইল: কার্ড লিস্ট */}
        <div className="mt-6 space-y-3 md:hidden">
          {rows.map((_, i) => (
            <MobileCardSkeleton key={i} />
          ))}
        </div>

        {/* ট্যাবলেট + ডেস্কটপ: টেবিল */}
        <div className="mt-6 hidden overflow-hidden rounded-3xl border border-gray-200 md:block">
          {/* Table header */}
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 border-b border-gray-200 px-4 py-4 lg:grid-cols-[2.5fr_1fr_0.7fr_1.5fr_1.5fr] lg:px-6">
            <Bone className="h-4 w-12" />
            <Bone className="h-4 w-10" />
            <Bone className="hidden h-4 w-10 lg:block" />
            <Bone className="hidden h-4 w-14 lg:block" />
            <Bone className="h-4 w-14" />
          </div>

          {rows.map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </div>

        {/* Footer: "Showing 3 of 3" + Previous/Next */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <Bone className="h-4 w-36" />
          <div className="flex gap-2">
            <Bone className="h-10 w-24 rounded-full" />
            <Bone className="h-10 w-20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}