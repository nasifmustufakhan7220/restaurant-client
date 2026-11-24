
import { Skeleton } from "@/components/ui/skeleton";

const FirstSuccessSkeleton = () => {
  return (
    <main
      id="success-skeleton"
      className="flex min-h-dvh items-center justify-center bg-[#f3ede4] bg-[radial-gradient(circle_at_top,#fbf6ee,#f0e8db)] px-4 py-8 sm:px-6 sm:py-12"
    >
      <section className="w-full max-w-lg rounded-3xl bg-[#fdfaf5] p-6 text-center shadow-[0_30px_70px_-35px_rgba(27,27,27,0.45)] ring-1 ring-black/5 sm:p-10">

        {/* Success Icon Skeleton */}
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100">
          <Skeleton className="size-11 rounded-full" />
        </div>

        {/* Heading Skeleton */}
        <Skeleton className="mx-auto mt-6 h-10 w-64 rounded-lg sm:h-11" />

        {/* Description Skeleton */}
        <div className="mt-5 space-y-2">
          <Skeleton className="mx-auto h-4 w-full max-w-85 rounded-md" />
          <Skeleton className="mx-auto h-4 w-[85%] rounded-md" />
        </div>

        {/* Email Skeleton */}
        <div className="mt-3 space-y-2">
          <Skeleton className="mx-auto h-3.5 w-[90%] rounded-md" />
          <Skeleton className="mx-auto h-3.5 w-36 rounded-md" />
        </div>

        {/* Buttons Skeleton */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Skeleton className="h-12 w-full rounded-xl sm:w-40" />
          <Skeleton className="h-12 w-full rounded-xl sm:w-48" />
        </div>

      </section>
    </main>
  );
};

export default FirstSuccessSkeleton;
