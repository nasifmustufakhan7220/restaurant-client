import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  PlusCircle,
  ReceiptText,
  Settings,
  ShoppingBag,
  UtensilsCrossed,
  Users,
} from "lucide-react";

import type { Role } from "@/lib/types/role";

export type DashboardMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const vendorMenuItems: DashboardMenuItem[] = [
  { label: "Overview", href: "/dashboard/vendor", icon: LayoutDashboard },
  { label: "My Menu Items", href: "/dashboard/vendor/menu", icon: UtensilsCrossed },
  { label: "Add Menu Item", href: "/dashboard/vendor/menu/new", icon: PlusCircle },
  { label: "Customer Orders", href: "/dashboard/vendor/orders", icon: ClipboardList },
  { label: "Subscription", href: "/dashboard/vendor/subscription", icon: CreditCard },
  { label: "Profile Settings", href: "/dashboard/vendor/profile", icon: Settings },
];

const customerMenuItems: DashboardMenuItem[] = [
  { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
  { label: "My Orders", href: "/dashboard/customer/orders", icon: ShoppingBag },
  { label: "Profile Settings", href: "/dashboard/customer/profile", icon: Settings },
];

const adminMenuItems: DashboardMenuItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Manage Menu Items", href: "/dashboard/admin/menu", icon: UtensilsCrossed },
  { label: "Transactions", href: "/dashboard/admin/transactions", icon: ReceiptText },
];

export const dashboardMenuItems: Record<Role, DashboardMenuItem[]> = {
  vendor: vendorMenuItems,
  customer: customerMenuItems,
  admin: adminMenuItems,
};
