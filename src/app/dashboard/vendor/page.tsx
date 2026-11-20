import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Crown,
  UtensilsCrossed,
} from "lucide-react";

import type { ChartBar } from "@/app/dashboard/_components/overview/BarChartCard";
import type { OverviewTableRow } from "@/app/dashboard/_components/overview/OrdersTableCard";
import type { StatCardData } from "@/app/dashboard/_components/overview/StatCard";
import OverviewContent from "@/app/dashboard/_components/overview/OverviewContent";

// Placeholder data. Replace with real data later.
const statCards: StatCardData[] = [
  { label: "Menu Items", value: 14, icon: UtensilsCrossed },
  { label: "Active Items", value: 11, icon: BadgeCheck },
  { label: "Pending Orders", value: 5, icon: Clock3 },
  { label: "Accepted Orders", value: 28, icon: CheckCircle2 },
  { label: "Plan", value: "Free", icon: Crown },
];

const weeklyOrderBars: ChartBar[] = [
  { label: "Mon", value: 4 },
  { label: "Tue", value: 6 },
  { label: "Wed", value: 3 },
  { label: "Thu", value: 8 },
  { label: "Fri", value: 10 },
  { label: "Sat", value: 12 },
  { label: "Sun", value: 7 },
];

const customerOrderColumns = ["Customer", "Item", "Delivery", "Status"];

const customerOrders: OverviewTableRow[] = [
  { id: "rahim", cells: ["Rahim", "Margherita", "24 Nov"], status: "Pending" },
  { id: "nusrat", cells: ["Nusrat", "Pepperoni", "24 Nov"], status: "Pending" },
  { id: "arif", cells: ["Arif", "Veggie Delight", "23 Nov"], status: "Accepted" },
  { id: "mitu", cells: ["Mitu", "BBQ Chicken", "21 Nov"], status: "Rejected" },
];

const VendorDashBoardpage = () => {
  return (
    <OverviewContent
      statsLabel="Vendor statistics"
      statCards={statCards}
      chartTitle="Orders this week"
      chartBars={weeklyOrderBars}
      tableTitle="Customer orders"
      tableColumns={customerOrderColumns}
      tableRows={customerOrders}
    />
  );
};

export default VendorDashBoardpage;
