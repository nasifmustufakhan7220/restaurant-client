"use client"
import Link from "next/link";
import { ArrowRight, Pizza, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const inputClassName =
  "h-12 border-black/10 bg-white px-4 shadow-sm placeholder:text-text-muted focus-visible:border-primary focus-visible:ring-primary/20";

export default function SignInPage() {
  const router = useRouter()
  const handelSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const objectData = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

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
      router.push('/')  
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
