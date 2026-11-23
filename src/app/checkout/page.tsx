import { toast } from "@/components/ui/toast";
import { Check, ShieldCheck } from "lucide-react";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { canceled } = await searchParams;

  if (canceled) {
    toast.add({
      title: "Payment canceled",
      description: "Your payment was canceled. Please try again.",
      type: "error",
    });
  }
  const features = [
    "Unlimited active menu items",
    "Premium badge on your restaurant",
    "Featured placement on the homepage",
    "All Free plan features",
  ];

  return (
    <main className="min-h-screen bg-[#eeecea] px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ed2029] text-2xl">
            🍕
          </div>

          <h2 className="text-xl font-extrabold tracking-[3px] text-[#171717]">
            PIZZA <span className="text-[#ed2029]">HUB</span>
          </h2>
        </div>

        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-[#171717]">Checkout</h1>

          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Review your order and complete your payment.
          </p>
        </div>

        {/* Checkout Content */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.5fr_1fr]">
          {/* Order Summary */}
          <div className="rounded-3xl border border-[#dedbd8] bg-white p-6 sm:p-8">
            <h2 className="mb-6 text-lg font-bold text-[#171717]">
              Order summary
            </h2>

            {/* Plan Details */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-[#171717]">PizzaHub Premium</h3>

                <p className="mt-1 text-sm text-gray-500">Plan for vendors</p>

                <span className="mt-3 inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                  ★ Premium
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#171717]">$20.00</h3>
            </div>

            <div className="my-5 border-t border-[#dedbd8]" />

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-[#ed2029]">
                    <Check size={17} strokeWidth={2.5} />
                  </span>

                  <p className="text-sm text-gray-600 sm:text-base">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="h-fit rounded-3xl border border-[#dedbd8] bg-white p-6 sm:p-8">
            <h2 className="mb-7 text-lg font-bold text-[#171717]">Payment</h2>

            {/* Subtotal */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>$20.00</span>
            </div>

            <div className="my-5 border-t border-[#dedbd8]" />

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#171717]">Total</span>

              <h2 className="text-3xl font-bold text-[#171717]">$20.00</h2>
            </div>


              {/* Pay button */}

            <form action="/api/checkout_sessions" method="POST">
              <section>
                <button type="submit" role="link" className="mt-8 w-full rounded-xl bg-[#ed2029] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#d71920]">
                  Pay $20.00 →
                </button>
              </section>
            </form>

            {/* Security Message */}
            <div className="mt-5 flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-gray-400" />

              <p className="text-xs text-gray-500">
                Your payment is processed securely.
              </p>
            </div>

            {/* Back Link */}
            <div className="mt-5 text-center">
              <button
                type="button"
                className="text-sm text-gray-600 transition hover:text-[#ed2029]"
              >
                ← Back to subscription
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
