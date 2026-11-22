// Subscription plan for a user.
export type SubscriptionPlan = "free" | "premium";

// One user item in the admin manage-users list.
// role uses the same values as Role from "@/lib/types/role".
export type UserItem = {
  _id: string;
  name: string;
  email: string;
  role: "vendor" | "customer" | "admin";
  businessName?: string;
  subscriptionPlan?: SubscriptionPlan;
  isBlocked: boolean;
  createdAt: string;
};

// Extended user details for the user details page.
export type UserDetails = UserItem & {
  subscriptionExpiresAt?: string;
  summary: { label: string; value: number }[];
};
