// Types for orders.

export type OrderStatus = "pending" | "accepted" | "rejected" | "cancelled";

export type Order = {
  _id: string;
  itemId: string;
  itemName: string; // comes from the menu item
  itemImage?: string; // the first image of the menu item
  vendorName: string; // comes from the vendor
  deliveryDate: string;
  deliveryAddress: string;
  message?: string;
  status: OrderStatus;
  createdAt: string;
};