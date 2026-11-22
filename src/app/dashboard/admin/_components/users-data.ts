// Types and placeholder data for the Manage Users page.
// Replace the placeholder data with real data later.

import type { Role } from "@/lib/types/role";
import type { SubscriptionPlan, UserItem } from "@/lib/types/user";

export const formatDateTime = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
export const usersPlaceholder: UserItem[] = [
  {
    _id: "1",
    name: "Rahim Uddin",
    email: "rahim@example.com",
    role: "vendor",
    businessName: "Roma Pizza",
    subscriptionPlan: "premium",
    isBlocked: false,
    createdAt: "Oct 02, 2026",
  },
  {
    _id: "2",
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    role: "customer",
    isBlocked: false,
    createdAt : "Oct 05, 2026",
  },
  {
    _id: "3",
    name: "Arif Hossain",
    email: "arif.hossain@example.com",
    role: "vendor",
    businessName: "Slice House",
    subscriptionPlan: "free",
    isBlocked: false,
    createdAt: "Oct 11, 2026",
  },
  {
    _id: "4",
    name: "Mitu Akter",
    email: "mitu@example.com",
    role: "customer",
    isBlocked: true,
    createdAt: "Oct 14, 2026",
  },
  {
    _id: "5",
    name: "Tanvir Ahmed",
    email: "tanvir@example.com",
    role: "vendor",
    businessName: "Green Oven",
    subscriptionPlan: "premium",
    isBlocked: false,
    createdAt: "Oct 20, 2026",
  },
  {
    _id: "6",
    name: "Sadia Rahman",
    email: "sadia.rahman@example.com",
    role: "customer",
    isBlocked: false,
    createdAt: "Nov 01, 2026",
  },
  {
    _id: "7",
    name: "Imran Khan",
    email: "imran@example.com",
    role: "vendor",
    businessName: "Dough & Co",
    subscriptionPlan: "free",
    isBlocked: true,
    createdAt: "Nov 06, 2026",
  },
  {
    _id: "8",
    name: "Farhana Islam",
    email: "farhana@example.com",
    role: "customer",
    isBlocked: false,
    createdAt: "Nov 12, 2026",
  },
  {
    _id: "9",
    name: "Farhana Islam",
    email: "farhana@example.com",
    role: "customer",
    isBlocked: false,
    createdAt: "Nov 12, 2026",
  },
];