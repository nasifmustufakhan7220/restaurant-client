export default function ItemDetailsSkeleton() {
  return (
    // animate-pulse: Tailwind-এর নিজস্ব ঝিকিমিকি effect, আলাদা motion লাগে না
    <main className="mx-auto max-w-6xl animate-pulse px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
      {/* Back লিংক */}
      <div className="h-4 w-32 rounded bg-neutral-200" />

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* বাম পাশ: ছবি */}
        <div>
          <div className="aspect-square w-full rounded-3xl bg-neutral-200" />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="aspect-square rounded-xl bg-neutral-200" />
            ))}
          </div>
        </div>

        {/* ডান পাশ: তথ্য */}
        <div className="flex flex-col">
          {/* Category */}
          <div className="h-7 w-32 rounded-full bg-neutral-200" />
          {/* নাম */}
          <div className="mt-4 h-10 w-3/4 rounded bg-neutral-200 lg:h-12" />
          {/* দাম */}
          <div className="mt-4 h-10 w-32 rounded bg-neutral-200" />
          {/* বিবরণ */}
          <div className="mt-5 space-y-2">
            <div className="h-4 w-full rounded bg-neutral-200" />
            <div className="h-4 w-full rounded bg-neutral-200" />
            <div className="h-4 w-2/3 rounded bg-neutral-200" />
          </div>
          {/* Location ও Vendor কার্ড */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="h-20 rounded-2xl bg-neutral-200" />
            <div className="h-20 rounded-2xl bg-neutral-200" />
          </div>
        </div>
      </div>
    </main>
  );
}