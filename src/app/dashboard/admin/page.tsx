import {
  Clock3,
  ReceiptText,
  Store,
  UserRound,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import type { ChartBar } from "@/app/dashboard/_components/overview/BarChartCard";
import type { OverviewTableRow } from "@/app/dashboard/_components/overview/OrdersTableCard";
import type { StatCardData } from "@/app/dashboard/_components/overview/StatCard";
import OverviewContent from "@/app/dashboard/_components/overview/OverviewContent";

// Placeholder data. Replace with real data later.
const statCards: StatCardData[] = [
  { label: "Total Users", value: 342, icon: Users },
  { label: "Vendors", value: 48, icon: Store },
  { label: "Customers", value: 293, icon: UserRound },
  { label: "Menu Items", value: 216, icon: UtensilsCrossed },
  { label: "Pending Items", value: 9, icon: Clock3 },
  { label: "Transactions", value: 37, icon: ReceiptText },
];

const monthlyRevenueBars: ChartBar[] = [
  { label: "Jun", value: 3 },
  { label: "Jul", value: 5 },
  { label: "Aug", value: 4 },
  { label: "Sep", value: 8 },
  { label: "Oct", value: 9 },
  { label: "Nov", value: 12 },
];

const pendingItemColumns = ["Item", "Vendor", "Price", "Status"];

const pendingMenuItems: OverviewTableRow[] = [
  { id: "truffle-pizza", cells: ["Truffle Pizza", "Roma Pizza", "$18"], status: "Pending" },
  { id: "spicy-beef", cells: ["Spicy Beef", "Slice House", "$14"], status: "Pending" },
  { id: "cheese-burst", cells: ["Cheese Burst", "Green Oven", "$12"], status: "Pending" },
  { id: "mango-lassi", cells: ["Mango Lassi", "Roma Pizza", "$4"], status: "Pending" },
];

const AdminDashBoardPage = () => {
  return (
    <OverviewContent
      statsLabel="Admin statistics"
      statCards={statCards}
      chartTitle="Premium revenue (monthly)"
      chartBars={monthlyRevenueBars}
      tableTitle="Pending menu items"
      tableColumns={pendingItemColumns}
      tableRows={pendingMenuItems}
    />
  );
};

export default AdminDashBoardPage;
