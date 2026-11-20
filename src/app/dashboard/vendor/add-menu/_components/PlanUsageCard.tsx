import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardShell from "./CardShell";

// Placeholder. Replace with real plan data later.
const planUsage = {
  planName: "Free",
  usedItems: 2,
  itemLimit: 3,
};

// Shows the vendor's plan usage and the upgrade button. Static UI only.
export default function PlanUsageCard() {
  const fillPercent = (planUsage.usedItems / planUsage.itemLimit) * 100;

  return (
    <CardShell className="bg-linear-to-br from-accent to-card">
      {/* FUNCTIONALITY: show real plan usage here */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-foreground">
            {planUsage.planName} plan: {planUsage.usedItems} of {planUsage.itemLimit} active
            items used
          </p>

          <div className="mt-2 h-2 w-full max-w-md overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-linear-to-r from-primary to-highlight"
              style={{ width: `${fillPercent}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-text-muted">
            Upgrade to Premium for unlimited active items.
          </p>
        </div>

        <Button
          type="button"
          className="h-11 w-full shrink-0 rounded-full px-5 font-semibold sm:w-auto"
        >
          <Star className="size-4" aria-hidden="true" />
          Upgrade to Premium
        </Button>
      </div>
    </CardShell>
  );
}
