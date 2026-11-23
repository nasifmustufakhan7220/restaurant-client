// Order status values. Matches the status field on order documents.
export type OrderStatus = "Pending" | "Accepted" | "Rejected";

// One order. Matches the orders collection in the database.
export type Order = {
  _id: string;
  itemId: string;
  itemName: string;
  images: string[];
  vendorName: string;
  deliveryDate: string;
  deliveryAddress: string;
  message?: string;
  orderStatus: OrderStatus;
  createdAt: string;
  customerId: string;
  customerName?: string;
  customerEmail?: string;
  vendorEmail?: "crazypizzavendor@gmail.com";
  vendorId?: "6b0206915ca5ad785cc52a34";
  category?: "Meat Lovers";
};

export type OrderFormData = {
  category: string;
  deliveryAddress: string;
  deliveryDate: string;
  images?: string[];
  itemId: string;
  itemName: string;
  message: string;
  orderStatus: "Pending" | "Accepted" | "Rejected";
  vendorEmail: string;
  vendorId: string;
  vendorName: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  createdAt: string;
};
