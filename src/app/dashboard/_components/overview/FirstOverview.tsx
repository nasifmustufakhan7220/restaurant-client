import {
  Clock3,
  ReceiptText,
  Store,
  UserRound,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";

import type { ChartBar } from "@/app/dashboard/_components/overview/BarChartCard";
import type { OverviewTableRow } from "@/app/dashboard/_components/overview/OrdersTableCard";
import type { StatCardData } from "@/app/dashboard/_components/overview/StatCard";
import OverviewContent from "@/app/dashboard/_components/overview/OverviewContent";
import { getAllMenuItems, getAllUsers } from "@/lib/api/admin";
import { MenuItemData } from "@/lib/actions/menu";
export interface IUser {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  role: "customer" | "vendor" | "admin";
  isBlocked: boolean;
}

const FirstOverview = async () => {
  const users: IUser[] = await getAllUsers();
  const menu: MenuItemData[] = await getAllMenuItems();
  const statCards: StatCardData[] = [
    {
      label: "Total Users",
      value: users.filter((user) => user.role !== "admin").length,
      icon: Users,
    },
    {
      label: "Vendors",
      value: users.filter((vendors) => vendors.role === "vendor").length,
      icon: Store,
    },
    {
      label: "Customers",
      value: users.filter((customers) => customers.role === "customer").length,
      icon: UserRound,
    },
    { label: "Menu Items", value: menu.length, icon: UtensilsCrossed },
    {
      label: "Pending Items",
      value: menu.filter((item) => item.status === "Pending").length,
      icon: Clock3,
    },
    {
      label: "Rejected Items",
      value: menu.filter((item) => item.status === "Rejected").length,
      icon: X,
    },
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

  const pendingItemsRows: MenuItemData[] = menu.filter(
    (item) => item.status === "Pending",
  );

  const pendingMenuItems: OverviewTableRow[] = pendingItemsRows.map((item) => ({
    id: item._id!,
    cells: [item.itemName, item.vendorEmail, item.price],
    status: item.status,
  }));

  return (
    <div>
      <OverviewContent
        statsLabel="Admin statistics"
        statCards={statCards}
        chartTitle="Premium revenue (monthly)"
        chartBars={monthlyRevenueBars}
        tableTitle="Pending menu items"
        tableColumns={pendingItemColumns}
        tableRows={pendingMenuItems}
      />
    </div>
  );
};

export default FirstOverview;
