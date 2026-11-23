// Placeholder data for the Vendor Customer Orders page.
// Replace with real orders from the database later.

import { Order, OrderStatus } from "@/lib/types/order";

// Vendor order status includes "Cancelled" which is not in the shared OrderStatus type.
type VendorOrderStatus = OrderStatus | "Cancelled";

// One order as the vendor sees it. Extends the shared Order type with Cancelled.
export type VendorOrder = Omit<Order, "orderStatus"> & {
  orderStatus: VendorOrderStatus;
};

// The tabs above the list ("all" shows every order).
export const vendorStatusTabs: (VendorOrderStatus | "all")[] = [
  "all",
  "Pending",
  "Accepted",
  "Rejected",
  "Cancelled",
];

// How many orders have a status. For "all" it counts every order.
export const getVendorStatusCount = (
  orders: VendorOrder[],
  status: VendorOrderStatus | "all",
) => {
  if (status === "all") {
    return orders.length;
  }
  return orders.filter((order) => order.orderStatus === status).length;
};

// Six sample orders with a mix of statuses.
// Placeholder data. Replace with real data later.
export const vendorOrdersPlaceholder: VendorOrder[] = [
  {
    _id: "ord-1001",
    itemId: "menu-1",
    itemName: "Margherita Classic",
    images: ["https://i.ibb.co/example1/margherita.jpg"],
    vendorName: "PizzaHub",
    deliveryDate: "Nov 28, 2026",
    deliveryAddress: "House 12, Road 5, Dhanmondi, Dhaka",
    message: "Please add extra cheese",
    orderStatus: "Pending",
    createdAt: "Nov 20, 2026",
    customerId: "cust-1",
    customerName: "Rahim Uddin",
    customerEmail: "rahim@example.com",
  },
  {
    _id: "ord-1002",
    itemId: "menu-2",
    itemName: "Choco Lava Cake",
    images: ["https://i.ibb.co/example2/choco-lava.jpg"],
    vendorName: "PizzaHub",
    deliveryDate: "Dec 02, 2026",
    deliveryAddress: "Motijheel C/A, Dhaka",
    message: "Birthday order, please pack nicely",
    orderStatus: "Pending",
    createdAt: "Nov 18, 2026",
    customerId: "cust-2",
    customerName: "Nusrat Jahan",
    customerEmail: "nusrat@example.com",
  },
  {
    _id: "ord-1003",
    itemId: "menu-3",
    itemName: "Four Cheese Truffle",
    images: ["https://i.ibb.co/example3/four-cheese.jpg"],
    vendorName: "PizzaHub",
    deliveryDate: "Nov 26, 2026",
    deliveryAddress: "Flat 4B, Gulshan Avenue, Dhaka",
    message: "No onions please",
    orderStatus: "Accepted",
    createdAt: "Nov 17, 2026",
    customerId: "cust-3",
    customerName: "Arif Hossain",
    customerEmail: "arif@example.com",
  },
  {
    _id: "ord-1004",
    itemId: "menu-4",
    itemName: "Mango Lassi",
    images: ["https://i.ibb.co/example4/mango-lassi.jpg"],
    vendorName: "PizzaHub",
    deliveryDate: "Nov 25, 2026",
    deliveryAddress: "House 7, Banani Block C, Dhaka",
    orderStatus: "Accepted",
    createdAt: "Nov 16, 2026",
    customerId: "cust-4",
    customerName: "Mitu Akter",
    customerEmail: "mitu@example.com",
  },
  {
    _id: "ord-1005",
    itemId: "menu-5",
    itemName: "Veggie Delight",
    images: ["https://i.ibb.co/example5/veggie.jpg"],
    vendorName: "PizzaHub",
    deliveryDate: "Nov 24, 2026",
    deliveryAddress: "Mirpur 10, Road 3, Dhaka",
    message: "Ring the bell twice",
    orderStatus: "Rejected",
    createdAt: "Nov 15, 2026",
    customerId: "cust-5",
    customerName: "Tanvir Ahmed",
    customerEmail: "tanvir@example.com",
  },
  {
    _id: "ord-1006",
    itemId: "menu-6",
    itemName: "Garlic Bread",
    images: ["https://i.ibb.co/example6/garlic-bread.jpg"],
    vendorName: "PizzaHub",
    deliveryDate: "Nov 22, 2026",
    deliveryAddress: "House 3, Uttara Sector 7, Dhaka",
    orderStatus: "Cancelled",
    createdAt: "Nov 12, 2026",
    customerId: "cust-6",
    customerName: "Sadia Rahman",
    customerEmail: "sadia@example.com",
  },
];
