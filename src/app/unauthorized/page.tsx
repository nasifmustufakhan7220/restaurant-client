import Link from "next/link";
import { ShieldX } from "lucide-react";

export const metadata = {
  title: "Access denied",
};

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <ShieldX className="h-10 w-10 text-destructive" />
        </div>

        {/* Status code */}
        <p className="text-sm font-medium text-muted-foreground">Error 403</p>

        {/* Title */}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          You can&apos;t view this page
        </h1>

        {/* Message */}
        <p className="mt-4 text-muted-foreground">
          Your account doesn&apos;t have permission to open this page. If you think
          this is a mistake, sign in with a different account.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button className="w-full rounded-xl bg-destructive px-5 py-3 text-sm font-semibold text-white transition hover:bg-destructive/90 sm:w-auto">
            <Link href="/">Go to home</Link>
          </button>
          <button >
            <Link href="/login">Sign in with another account</Link>
          </button>
        </div>
      </div>
    </main>
  );
}