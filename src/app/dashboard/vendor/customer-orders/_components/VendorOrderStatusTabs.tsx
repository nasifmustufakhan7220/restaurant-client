// Row of status pill buttons with order counts (design only).
// Needs: orders (list). The "All" tab looks selected.
// No filtering yet — connect the real filter later.
import { cn } from "@/lib/utils";
import {
  vendorStatusTabs,
  getVendorStatusCount,
} from "./vendor-orders-data";
import { VendorOrder } from "./vendor-orders-data";

type VendorOrderStatusTabsProps = {
  orders: VendorOrder[];
};

const VendorOrderStatusTabs = ({ orders }: VendorOrderStatusTabsProps) => {
  // FUNCTIONALITY: mark the really selected tab and connect the filter here
  const selectedTab = "all";

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {vendorStatusTabs.map((tab) => (
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
          {tab} ({getVendorStatusCount(orders, tab)})
        </button>
      ))}
    </div>
  );
};

export default VendorOrderStatusTabs;
