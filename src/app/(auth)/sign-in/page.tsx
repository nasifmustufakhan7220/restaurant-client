import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <h1 className="font-serif text-4xl text-foreground sm:text-5xl">
        Sign In
      </h1>
      <p className="mt-3 max-w-md text-sm text-text-secondary sm:text-base">
        The sign-in form will be added here.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
      >
        Back to Home
      </Link>
    </main>
  );
}
