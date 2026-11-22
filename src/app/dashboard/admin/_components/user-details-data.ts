

// Type and placeholder data for the User Details page.

import type { UserDetails } from "@/lib/types/user";

// FUNCTIONALITY: load the real user by its id (from the page URL) here
export const userDetailsPlaceholder: UserDetails = {
  _id: "665f0a9d8b3a4d0012a1b200",
  name: "Rahim Uddin",
  email: "rahim@example.com",
  role: "vendor",
  businessName: "Roma Pizza",
  subscriptionPlan: "free",
  subscriptionExpiresAt: "Nov 02, 2027",
  isBlocked: false,
  createdAt: "Oct 02, 2026",
  // For a customer, use: Total Orders, Pending Orders, Accepted Orders
  summary: [
    { label: "Menu Items", value: 14 },
    { label: "Active Items", value: 11 },
    { label: "Orders", value: 28 },
  ],
};