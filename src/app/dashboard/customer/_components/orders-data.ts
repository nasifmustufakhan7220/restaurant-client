

// Placeholder data and helpers for the My Orders page.

import { Order, OrderStatus } from "./order";

// The tabs above the list ("all" shows every order)
export const statusTabs: (OrderStatus | "all")[] = [
  "all",
  "pending",
  "accepted",
  "rejected",
  "cancelled",
];

// How many orders have a status. For "all" it counts every order.
export const getStatusCount = (orders: Order[], status: OrderStatus | "all") => {
  if (status === "all") {
    return orders.length;
  }
  return orders.filter((order) => order.status === status).length;
};

// FUNCTIONALITY: load the logged-in customer's real orders from the database here
// TODO: replace the fake image links with real ImgBB links.
export const ordersPlaceholder: Order[] = [
  {
    _id: "1001",
    itemId: "1",
    itemName: "Margherita Classic",
    itemImage: "https://i.ibb.co/example1/margherita.jpg",
    vendorName: "Roma Pizza",
    deliveryDate: "Nov 28, 2026",
    deliveryAddress: "House 12, Road 5, Dhanmondi, Dhaka",
    message: "Please add extra cheese",
    status: "pending",
    createdAt: "Nov 20, 2026",
  },
  {
    _id: "1002",
    itemId: "2",
    itemName: "Spicy Pepperoni",
    itemImage: "https://i.ibb.co/example2/pepperoni.jpg",
    vendorName: "Slice House",
    deliveryDate: "Nov 26, 2026",
    deliveryAddress: "Flat 4B, Gulshan Avenue, Dhaka",
    message: "No onions please",
    status: "accepted",
    createdAt: "Nov 18, 2026",
  },
  {
    _id: "1003",
    itemId: "3",
    itemName: "Veggie Delight",
    itemImage: "https://i.ibb.co/example3/veggie.jpg",
    vendorName: "Green Oven",
    deliveryDate: "Nov 25, 2026",
    deliveryAddress: "House 7, Banani Block C, Dhaka",
    status: "rejected",
    createdAt: "Nov 17, 2026",
  },
  {
    _id: "1004",
    itemId: "5",
    itemName: "Garlic Bread",
    itemImage: "https://i.ibb.co/example5/garlic-bread.jpg",
    vendorName: "Slice House",
    deliveryDate: "Nov 24, 2026",
    deliveryAddress: "Mirpur 10, Road 3, Dhaka",
    message: "Ring the bell twice",
    status: "cancelled",
    createdAt: "Nov 15, 2026",
  },
  {
    _id: "1005",
    itemId: "6",
    itemName: "Choco Lava Cake",
    itemImage: "https://i.ibb.co/example6/lava-cake.jpg",
    vendorName: "Green Oven",
    deliveryDate: "Dec 02, 2026",
    deliveryAddress: "Motijheel C/A, Dhaka",
    message: "Birthday order, please pack nicely",
    status: "pending",
    createdAt: "Nov 21, 2026",
  },
  {
    _id: "1006",
    itemId: "8",
    itemName: "Mango Lassi",
    itemImage: "https://i.ibb.co/example8/lassi.jpg",
    vendorName: "Roma Pizza",
    deliveryDate: "Nov 22, 2026",
    deliveryAddress: "House 12, Road 5, Dhanmondi, Dhaka",
    status: "accepted",
    createdAt: "Nov 12, 2026",
  },
];