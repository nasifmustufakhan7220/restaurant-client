import { CheckCircle2, Clock3, ShoppingBag, XCircle } from "lucide-react";

import type { ChartBar } from "@/app/dashboard/_components/overview/BarChartCard";
import type { OverviewTableRow } from "@/app/dashboard/_components/overview/OrdersTableCard";
import type { StatCardData } from "@/app/dashboard/_components/overview/StatCard";
import OverviewContent from "@/app/dashboard/_components/overview/OverviewContent";
import { getOrdersByUserId } from "@/lib/api/orders";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Order } from "./order";

// Placeholder data. Replace with real data later.

const FirstOverview = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const id = session?.user?.id;
  const getAllOrders: Order[] = await getOrdersByUserId(id as string);

  const statCards: StatCardData[] = [
    { label: "Total Orders", value: getAllOrders.length, icon: ShoppingBag },
    { label: "Pending", value: getAllOrders.filter(order=> order.orderStatus === "Pending").length, icon: Clock3 },
    { label: "Accepted", value: getAllOrders.filter(order=> order.orderStatus === "Accepted").length, icon: CheckCircle2 },
    { label: "Rejected", value: getAllOrders.filter(order=> order.orderStatus === "Rejected").length, icon: XCircle },
  ];

  const orderStatusBars: ChartBar[] = [
    { label: "Pending", value: 3 },
    { label: "Accepted", value: 7 },
    { label: "Rejected", value: 2 },
    { label: "Cancelled", value: 1 },
  ];

  const recentOrderColumns = ["Item", "Vendor", "Delivery", "Status"];

  const recentOrders: OverviewTableRow[] = [
    {
      id: "margherita",
      cells: ["Margherita", "Roma Pizza", "24 Nov"],
      status: "Pending",
    },
    {
      id: "bbq-chicken",
      cells: ["BBQ Chicken", "Slice House", "22 Nov"],
      status: "Accepted",
    },
    {
      id: "veggie-delight",
      cells: ["Veggie Delight", "Green Oven", "20 Nov"],
      status: "Rejected",
    },
    {
      id: "garlic-bread",
      cells: ["Garlic Bread", "Roma Pizza", "18 Nov"],
      status: "Accepted",
    },
  ];
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

export default FirstOverview;
