// Order status values. Matches the status field on order documents.
export type OrderStatus = "pending" | "accepted" | "rejected" | "cancelled";

// One order. Matches the orders collection in the database.
export type Order = {
  _id: string;
  itemId: string;
  itemName: string;
  itemImage?: string;
  vendorName: string;
  deliveryDate: string;
  deliveryAddress: string;
  message?: string;
  status: OrderStatus;
  createdAt: string;
};
