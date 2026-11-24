import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMenuItemCount } from "@/lib/api/menu";
import { getSession } from "@/lib/api/servers";
import { connection } from "next/server";
export default async function PlanUsageBanner() {
  await connection();
  const session = await getSession();
  const count = await getMenuItemCount(`vendorId=${session?.user?.id as string}`);


  const planUsage = {
    planName: "Free",
    usedItems: count.count <= 3 ? count.count : 3,
    itemLimit: 3,
  };
  const fillPercent = (planUsage.usedItems / planUsage.itemLimit) * 100;

  return (
    <section className="rounded-2xl border border-border bg-linear-to-br from-accent to-card p-4.5 sm:p-5">
      {/* FUNCTIONALITY: show real plan usage here */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-foreground">
            {planUsage.planName} plan: {planUsage.usedItems} of{" "}
            {planUsage.itemLimit} active items used
          </p>

          <div className="mt-2 h-2 w-full max-w-md overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-linear-to-r from-primary to-highlight"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-11 w-full shrink-0 rounded-full bg-card px-5 font-semibold sm:w-auto"
        >
          <Star className="size-4" aria-hidden="true" />
          Upgrade to Premium
        </Button>
      </div>
    </section>
  );
}
