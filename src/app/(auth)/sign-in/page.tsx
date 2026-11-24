"use client"
import Link from "next/link";
import { ArrowRight, Pizza, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputClassName =
  "h-12 border-black/10 bg-white px-4 shadow-sm placeholder:text-text-muted focus-visible:border-primary focus-visible:ring-primary/20";

// ✅ নতুন: Google আইকন
function GoogleIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}

export default function SignInPage() {
  const router = useRouter()
  const [passwordError, setPasswordError] = useState("");
  const checkPassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must have at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must have at least one lowercase letter.";
    }
    if(!/[0-9]/.test(password)){
      return "Password must have at least one number.";
    }
    return "";
  };
  const handelSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const objectData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const message = checkPassword(objectData.password);
    if (message) {
      setPasswordError(message);
      return;
    }
    setPasswordError("");

    const { data, error } = await authClient.signIn.email({
      email: objectData.email,
      password: objectData.password,
    });

    console.log(data);

    if(data?.user){
      toast.add({
        title: "Signed in",
        description: "You have been signed in successfully.",
        type: "success",
      });    
      router.push(`/dashboard/${data?.user?.role}`);  
    }else{
      toast.add({
        title: "Error",
        description: error?.message || "An error occurred while creating your account.",
        type: "error",
      });
    }
  };
  return (
    <main className="flex min-h-dvh items-center justify-center bg-[#f3ede4] bg-[radial-gradient(circle_at_top,#fbf6ee,#f0e8db)] px-4 py-8 sm:px-6 sm:py-12">
      <section className="w-full max-w-137 rounded-3xl bg-[#fdfaf5] p-5 shadow-[0_30px_70px_-35px_rgba(27,27,27,0.45)] ring-1 ring-black/5 sm:p-7 lg:p-9">
        {/* Brand mark + close */}
        <div className="flex items-start justify-between">
          <Link
            href="/"
            aria-label="Restan home"
            className="flex size-12 items-center justify-center rounded-[14px] bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Pizza className="size-6" strokeWidth={1.8} aria-hidden="true" />
          </Link>

          <Link
            href="/"
            aria-label="Close sign in"
            className="-mr-1 -mt-1 flex size-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-black/5 hover:text-foreground"
          >
            <X className="size-5" aria-hidden="true" />
          </Link>
        </div>

        <h1 className="mt-6 font-serif text-[2rem] leading-[1.1] tracking-tight text-foreground sm:text-[2.4rem] lg:mt-7 lg:text-[2.6rem]">
          Welcome back
        </h1>

        <form onSubmit={handelSignIn} className="mt-7 sm:mt-8" noValidate>
          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-sm font-bold text-foreground"
              >
                Email address
              </FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClassName}
              />
            </Field>

            <Field>
              <FieldLabel
                htmlFor="password"
                className="text-sm font-bold text-foreground"
              >
                Password
              </FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Your password"
                className={inputClassName}
              />
              {passwordError && (
                <p className="text-sm text-red-600">{passwordError}</p>
              )}
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            className="mt-7 h-13 w-full gap-2 rounded-lg text-[15px] font-semibold shadow-sm sm:mt-8"
          >
            Sign in
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </form>

        {/* ✅ নতুন: "or" দাগ */}
        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-black/10" />
          <span className="text-xs text-text-muted">or</span>
          <span className="h-px flex-1 bg-black/10" />
        </div>

        {/* ✅ নতুন: Google বাটন (ফাংশনালিটি পরে onClick দিয়ে যোগ করবেন) */}
        <Button
          type="button"
          variant="outline"
          className="h-12 w-full gap-3 rounded-lg border-black/10 bg-white text-[15px] font-semibold shadow-sm hover:bg-black/5"
        >
          <GoogleIcon />
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-text-secondary">
          New to PizzaHub?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}