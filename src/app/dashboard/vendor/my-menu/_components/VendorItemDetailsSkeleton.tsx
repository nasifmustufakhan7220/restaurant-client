
const MenuItemDetailsSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse bg-background p-6 md:p-10">
      <div className="mx-auto max-w-[1600px] space-y-5">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3">
          <div className="h-3 w-24 rounded bg-muted" />
          <div className="h-3 w-3 rounded bg-muted" />
          <div className="h-3 w-16 rounded bg-muted" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-7 w-36 rounded-md bg-muted" />
            <div className="h-5 w-16 rounded-full bg-muted" />
          </div>

          <div className="flex gap-3">
            <div className="h-10 w-20 rounded-full bg-muted" />
            <div className="h-10 w-20 rounded-full bg-muted" />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">

          {/* Left Column */}
          <div className="space-y-4">

            {/* Image Card */}
            <div className="rounded-3xl border border-border bg-card p-4">
              <div className="h-[340px] w-full rounded-2xl bg-muted md:h-[340px]" />
            </div>

            {/* Approval Status */}
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="mb-6 h-5 w-32 rounded bg-muted" />

              <div className="space-y-5">
                {[1, 2].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-muted" />

                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-3.5 w-36 rounded bg-muted" />
                      <div className="h-3 w-48 rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Message */}
              <div className="mt-5 h-10 w-full rounded-2xl bg-muted" />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">

            {/* Item Details */}
            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="space-y-3 border-b border-border pb-5">
                <div className="h-3 w-24 rounded bg-muted" />
                <div className="h-7 w-28 rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
              </div>

              {/* Details Rows */}
              <div className="divide-y divide-border">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="h-3 w-16 rounded bg-muted" />
                    <div className="h-3 w-28 rounded bg-muted" />
                  </div>
                ))}
              </div>

              {/* Availability Toggle */}
              <div className="flex items-center justify-between pt-3">
                <div className="space-y-2">
                  <div className="h-4 w-36 rounded bg-muted" />
                  <div className="h-3 w-48 rounded bg-muted" />
                </div>
                <div className="h-6 w-10 rounded-full bg-muted" />
              </div>
            </div>

            {/* Design Preview */}
            <div className="rounded-3xl border border-dashed border-border p-5">
              <div className="mb-3 h-4 w-32 rounded bg-muted" />
              <div className="mb-4 h-3 w-full max-w-xs rounded bg-muted" />

              <div className="flex gap-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-8 w-16 rounded-full bg-muted"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetailsSkeleton;
