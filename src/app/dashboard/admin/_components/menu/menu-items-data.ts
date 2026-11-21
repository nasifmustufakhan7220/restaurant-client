// Types, helpers and placeholder data for the Manage Menu Items page.

export type MenuItemStatus = "Pending" | "Approved" | "Rejected";

export type MenuItem = {
  _id: string;
  itemName: string;
  category: string;
  price: number;
  location: string;
  vendorEmail: string;
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