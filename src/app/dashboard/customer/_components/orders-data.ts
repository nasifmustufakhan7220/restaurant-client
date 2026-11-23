

// Placeholder data and helpers for the My Orders page.

import { Order, OrderStatus } from "@/lib/types/order";

// The tabs above the list ("all" shows every order)
export const statusTabs: (OrderStatus | "all")[] = [
  "all",
  "Pending",
  "Accepted",
  "Rejected",
];

// How many orders have a status. For "all" it counts every order.
export const getStatusCount = (orders: Order[], status: OrderStatus | "all") => {
  if (status === "all") {
    return orders.length;
  }
  return orders.filter((order) => order.orderStatus === status).length;
};
