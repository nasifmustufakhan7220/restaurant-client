import {
  CheckCircle2,
  Clock3,
  ShoppingBag,
  XCircle,
} from "lucide-react";

import type { ChartBar } from "@/app/dashboard/_components/overview/BarChartCard";
import type { OverviewTableRow } from "@/app/dashboard/_components/overview/OrdersTableCard";
import type { StatCardData } from "@/app/dashboard/_components/overview/StatCard";
import OverviewContent from "@/app/dashboard/_components/overview/OverviewContent";

// Placeholder data. Replace with real data later.
const statCards: StatCardData[] = [
  { label: "Total Orders", value: 12, icon: ShoppingBag },
  { label: "Pending", value: 3, icon: Clock3 },
  { label: "Accepted", value: 7, icon: CheckCircle2 },
  { label: "Rejected", value: 2, icon: XCircle },
];

const orderStatusBars: ChartBar[] = [
  { label: "Pending", value: 3 },
  { label: "Accepted", value: 7 },
  { label: "Rejected", value: 2 },
  { label: "Cancelled", value: 1 },
];

const recentOrderColumns = ["Item", "Vendor", "Delivery", "Status"];

const recentOrders: OverviewTableRow[] = [
  { id: "margherita", cells: ["Margherita", "Roma Pizza", "24 Nov"], status: "Pending" },
  { id: "bbq-chicken", cells: ["BBQ Chicken", "Slice House", "22 Nov"], status: "Accepted" },
  { id: "veggie-delight", cells: ["Veggie Delight", "Green Oven", "20 Nov"], status: "Rejected" },
  { id: "garlic-bread", cells: ["Garlic Bread", "Roma Pizza", "18 Nov"], status: "Accepted" },
];

const CustomerDashBoardPage = () => {
  return (
    <OverviewContent
      statsLabel="Order statistics"
      statCards={statCards}
      chartTitle="Orders by status"
      chartBars={orderStatusBars}
      tableTitle="Recent orders"
      tableColumns={recentOrderColumns}
      tableRows={recentOrders}
    />
  );
};

export default CustomerDashBoardPage;
