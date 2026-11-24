import { checkoutVerify } from "@/lib/actions/payment";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import {
  CheckCircle2,
  Home,
  LayoutDashboard,
} from "lucide-react";
import { getSession } from "@/lib/api/servers";
const FirstSuccess = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) => {
  await connection();
  const { session_id } = await searchParams;
  const user = await getSession();

  if (!session_id){
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }
  const { status, payment_status, customer_email, metadata, payment_intent } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete" && payment_status === "paid") {
    console.log(payment_intent, metadata, payment_status, customer_email);

    const result = await checkoutVerify(session_id);
    console.log("Checkout verification result:", { result });
    return (
      <main
        id="success"
        className="flex min-h-dvh items-center justify-center bg-[#f3ede4] bg-[radial-gradient(circle_at_top,#fbf6ee,#f0e8db)] px-4 py-8 sm:px-6 sm:py-12"
      >
        <section className="w-full max-w-lg rounded-3xl bg-[#fdfaf5] p-6 text-center shadow-[0_30px_70px_-35px_rgba(27,27,27,0.45)] ring-1 ring-black/5 sm:p-10">
          {/* সাকসেস আইকন */}
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2
              className="size-11 text-green-600"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </div>

          <h1 className="mt-6 font-serif text-[2rem] leading-[1.1] tracking-tight text-foreground sm:text-[2.4rem]">
            Payment successful!
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
            We appreciate your business! A confirmation email will be sent to{" "}
            <span className="font-semibold text-foreground">
              {customer_email}
            </span>
            .
          </p>

          <p className="mt-2 text-sm text-text-muted">
            If you have any questions, please email{" "}
            <a
              href="mailto:orders@example.com"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              orders@example.com
            </a>
            .
          </p>

          {/* বাটন দুটো */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {/* বাটন ১: Home (মূল রঙ) */}
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <Home className="size-4" aria-hidden="true" />
              Go to Home
            </Link>

            {/* বাটন ২: Dashboard (সাদা, বর্ডারসহ) */}
            <Link
              href={`/dashboard/${user?.user.role}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-6 text-[15px] font-semibold text-foreground shadow-sm transition-colors hover:bg-black/5"
            >
              <LayoutDashboard className="size-4" aria-hidden="true" />
              Go to Dashboard
            </Link>
          </div>
        </section>
      </main>
    );
  }
};

export default FirstSuccess;
