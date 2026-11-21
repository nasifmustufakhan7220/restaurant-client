// Types, helpers and placeholder data for the Manage Menu Items page.

export type MenuItemStatus = "Pending" | "Approved" | "Rejected";

export type MenuItem = {
  _id: string;
  itemName: string;
  category: string;
  price: number;
  location: string;
  vendorName: string;
  status: MenuItemStatus;
  createdAt: string;
};

// The six categories used by the filter
export const menuCategories = [
  "Classic Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Specialty / Gourmet Pizzas",
  "Sides & Appetizers",
  "Beverages & Desserts",
];

// 12.99 -> "$12.99"
export const formatPrice = (price: number) => `$${price.toFixed(2)}`;

// Counts the numbers for the four cards at the top, from the list
export const getMenuItemsStats = (items: MenuItem[]) => {
  return [
    { label: "Total Items", value: items.length },
    { label: "Pending Review", value: items.filter((item) => item.status === "Pending").length },
    { label: "Approved", value: items.filter((item) => item.status === "Approved").length },
    { label: "Rejected", value: items.filter((item) => item.status === "Rejected").length },
  ];
};

// FUNCTIONALITY: load real menu items from the database here
export const menuItemsPlaceholder: MenuItem[] = [
  {
    _id: "1",
    itemName: "Margherita Classic",
    category: "Classic Pizzas",
    price: 12.99,
    location: "Dhanmondi",
    vendorName: "Roma Pizza",
    status: "Pending",
    createdAt: "Nov 20, 2026",
  },
  {
    _id: "2",
    itemName: "Veggie Delight",
    category: "Vegetarian Pizzas",
    price: 13,
    location: "Banani",
    vendorName: "Green Oven",
    status: "Pending",
    createdAt: "Nov 19, 2026",
  },
  {
    _id: "3",
    itemName: "BBQ Chicken",
    category: "Meat Lovers",
    price: 14.75,
    location: "Dhanmondi",
    vendorName: "Dough & Co",
    status: "Pending",
    createdAt: "Nov 18, 2026",
  },
  {
    _id: "4",
    itemName: "Spicy Pepperoni",
    category: "Meat Lovers",
    price: 15.5,
    location: "Gulshan",
    vendorName: "Slice House",
    status: "Approved",
    createdAt: "Nov 12, 2026",
  },
  {
    _id: "5",
    itemName: "Choco Lava Cake",
    category: "Beverages & Desserts",
    price: 6.25,
    location: "Motijheel",
    vendorName: "Green Oven",
    status: "Approved",
    createdAt: "Nov 10, 2026",
  },
  {
    _id: "6",
    itemName: "Mango Lassi",
    category: "Beverages & Desserts",
    price: 4,
    location: "Gulshan",
    vendorName: "Roma Pizza",
    status: "Approved",
    createdAt: "Nov 08, 2026",
  },
  {
    _id: "7",
    itemName: "Four Cheese Truffle",
    category: "Specialty / Gourmet Pizzas",
    price: 18,
    location: "Uttara",
    vendorName: "Roma Pizza",
    status: "Rejected",
    createdAt: "Nov 05, 2026",
  },
  {
    _id: "8",
    itemName: "Garlic Bread",
    category: "Sides & Appetizers",
    price: 5.5,
    location: "Mirpur",
    vendorName: "Slice House",
    status: "Rejected",
    createdAt: "Nov 02, 2026",
  },
];