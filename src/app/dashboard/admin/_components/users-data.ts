// Types and placeholder data for the Manage Users page.
// Replace the placeholder data with real data later.

export type UserRole = "vendor" | "customer" | "admin";
export type SubscriptionPlan = "free" | "premium";

export type UserItem = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  businessName?: string; // vendors only
  subscriptionPlan?: SubscriptionPlan; // vendors only
  isBlocked: boolean;
  joinedAt: string;
  createdAt: string;
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

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


// Numbers shown in the four small cards at the top


// FUNCTIONALITY: load real users from the database here
