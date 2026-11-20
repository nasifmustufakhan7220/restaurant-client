import type { LucideIcon } from "lucide-react";
import { CakeSlice, Flame, Leaf, Pizza, Salad, Sparkles } from "lucide-react";

export type MenuItemStatus = "Approved" | "Pending" | "Rejected" | "Inactive";

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  location: string;
  price: string;
  status: MenuItemStatus;
  isAvailable: boolean;
  icon: LucideIcon;
};

// The six categories from the Add Menu Item form, reused by the filter select.
export const menuCategories = [
  "Classic Pizzas",
  "Vegetarian Pizzas",
  "Meat Lovers",
  "Specialty / Gourmet Pizzas",
  "Sides & Appetizers",
  "Beverages & Desserts",
];

// Placeholder data so the cards have something to show. Replace with real data later.
export const menuItems: MenuItem[] = [
  {
    id: "margherita-classic",
    name: "Margherita Classic",
    category: "Classic Pizzas",
    location: "Dhanmondi",
    price: "$12.99",
    status: "Approved",
    isAvailable: true,
    icon: Pizza,
  },
  {
    id: "spicy-pepperoni",
    name: "Spicy Pepperoni",
    category: "Meat Lovers",
    location: "Gulshan",
    price: "$15.50",
    status: "Approved",
    isAvailable: true,
    icon: Flame,
  },
  {
    id: "veggie-delight",
    name: "Veggie Delight",
    category: "Vegetarian Pizzas",
    location: "Banani",
    price: "$13.00",
    status: "Pending",
    isAvailable: false,
    icon: Leaf,
  },
  {
    id: "bbq-chicken-feast",
    name: "BBQ Chicken Feast",
    category: "Specialty / Gourmet Pizzas",
    location: "Uttara",
    price: "$16.75",
    status: "Rejected",
    isAvailable: false,
    icon: Sparkles,
  },
  {
    id: "garlic-breadsticks",
    name: "Garlic Breadsticks",
    category: "Sides & Appetizers",
    location: "Mirpur",
    price: "$4.50",
    status: "Inactive",
    isAvailable: false,
    icon: Salad,
  },
  {
    id: "chocolate-lava-cake",
    name: "Chocolate Lava Cake",
    category: "Beverages & Desserts",
    location: "Dhanmondi",
    price: "$6.25",
    status: "Approved",
    isAvailable: true,
    icon: CakeSlice,
  },
];
