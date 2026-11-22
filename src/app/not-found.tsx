import Link from "next/link";
import { Home, UtensilsCrossed } from "lucide-react";
import NotFoundAnimation from "@/components/NotFoundAnimation";


// ✅ Server Component: Next.js এটা নিজে থেকেই 404-এ দেখাবে
export default function NotFound() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-orange-50 px-5 py-28">
      {/* 🎨 সাজানোর জন্য ঝাপসা গোল আকৃতি */}
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-yellow-300/30 blur-3xl" />

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        {/* 🎬 404 লেখা ও ঘুরন্ত পিৎজা (client কম্পোনেন্ট) */}
        <NotFoundAnimation />

        <h1 className="mt-6 text-3xl font-bold text-neutral-900 sm:text-4xl">
          Oops! This slice is missing
        </h1>

        <p className="mt-4 max-w-md text-neutral-600">
          The page you are looking for does not exist, was moved, or the item
          is no longer available. Let&apos;s get you back to something delicious.
        </p>

        {/* বাটন */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105 hover:bg-primary/90"
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            Back to Home
          </Link>

          <Link
            href="/browse"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-3 font-semibold text-neutral-800 transition hover:scale-105 hover:border-primary hover:text-primary"
          >
            <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
            Browse Menu
          </Link>
        </div>
      </div>
    </main>
  );
}