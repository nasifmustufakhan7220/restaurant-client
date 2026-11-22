import { cn } from "@/lib/utils";

import { getStatusCount, statusTabs } from "./orders-data";
import { Order } from "./order";

// A row of status buttons with the number of orders (design only).
// Needs: orders (list). The first tab ("all") looks selected.

const OrderStatusTabs = ({ orders }: { orders: Order[] }) => {
  // FUNCTIONALITY: mark the really selected tab, and connect the filter here
  const selectedTab = "all";

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {statusTabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={cn(
            "min-h-10 shrink-0 rounded-full border px-4 text-sm font-bold capitalize transition-colors",
            tab === selectedTab
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-text-secondary hover:bg-section",
          )}
        >
          {tab} ({getStatusCount(orders, tab)})
        </button>
      ))}
    </div>
  );
};

export default OrderStatusTabs;