import type { LucideIcon } from "lucide-react";

// Approval status of a menu item. Matches the status values stored for menu items.
export type MenuItemStatus = "Approved" | "Pending" | "Rejected" | "Inactive";

// One menu item. Covers the vendor, admin and home page shapes.
// Extra properties that only exist in some contexts are optional.
export type MenuItem = {
  _id?: string;
  id?: string;
  itemName?: string;
  name?: string;
  category: string;
  description?: string;
  price: string | number;
  location: string;
  images?: string[];
  isAvailable: boolean;
  status: MenuItemStatus;
  vendorId?: string;
  vendorEmail?: string;
  vendorName?: string;
  createdAt?: string;
  createdDate?: string;
  priority?: boolean;
  vendor?: string;
  icon?: LucideIcon;
  deliveryDate?: string;
};

// Kept for backwards compatibility: code that imports MenuItemData still works.
export type MenuItemData = MenuItem;

// One category card. Matches the categories used on the home page.
export interface Category {
  name: string;
  icon: string;
  description: string;
}
