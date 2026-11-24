import React from "react";
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
import { getMenuItems, getOrders, getPremiumVendor } from "@/lib/api/menu"; // path to your Better Auth server instance
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import type { MenuItemData } from "@/lib/types/menu-item";
import { Order } from "@/lib/types/order";

// Placeholder data. Replace with real data later.

const FirstOverViewVendor = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const result:MenuItemData[] = await getMenuItems(session?.user?.id as string);
  const acceptOrders:Order[]  = await getOrders(session?.user?.email as string);
  const premium = await getPremiumVendor(session?.user?.id as string);
  const statCards: StatCardData[] = [
    { label: "Menu Items", value: result.length, icon: UtensilsCrossed },
    { label: "Active Items", value: result.filter((item) => item.status === "Approved").length, icon: BadgeCheck },
    { label: "Pending Orders", value: result.filter((item) => item.status === "Pending").length, icon: Clock3 },
    { label: "Accepted Orders", value: acceptOrders.filter(accept=> accept.orderStatus === "Accepted").length, icon: CheckCircle2 },
    { label: "Plan", value: premium.premium === true ? "Premium User" : "Free User", icon: Crown },
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
    {
      id: "rahim",
      cells: ["Rahim", "Margherita", "24 Nov"],
      status: "Pending",
    },
    {
      id: "nusrat",
      cells: ["Nusrat", "Pepperoni", "24 Nov"],
      status: "Pending",
    },
    {
      id: "arif",
      cells: ["Arif", "Veggie Delight", "23 Nov"],
      status: "Accepted",
    },
    {
      id: "mitu",
      cells: ["Mitu", "BBQ Chicken", "21 Nov"],
      status: "Rejected",
    },
  ];
  return (
    <div>
      <OverviewContent
        statsLabel="Vendor statistics"
        statCards={statCards}
        chartTitle="Orders this week"
        chartBars={weeklyOrderBars}
        tableTitle="Customer orders"
        tableColumns={customerOrderColumns}
        tableRows={customerOrders}
      />
    </div>
  );
};

export default FirstOverViewVendor;
