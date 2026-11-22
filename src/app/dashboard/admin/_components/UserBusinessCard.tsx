
import type { UserDetails } from "@/lib/types/user";
import UserBadge from "./UserBadge";


const UserBusinessCard = ({ user }: { user: UserDetails }) => {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <h2 className="mb-3 text-lg font-semibold text-foreground">Business and subscription</h2>

      <dl>
        <div className="flex justify-between gap-4 border-t border-table-border py-3">
          <dt className="text-text-secondary">Business name</dt>
          <dd className="wrap-break-word text-right font-bold text-foreground">
            {user.role === "vendor" ? user.businessName ?? "Pizza Hub" : "Customer"}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-table-border py-3">
          <dt className="text-text-secondary">Plan</dt>
          <dd>
            {user.subscriptionPlan ? (
              <UserBadge tone={user.subscriptionPlan}>{user.subscriptionPlan}</UserBadge>
            ) : (
              "Free"
            )}
          </dd>
        </div>

        <div className="flex justify-between gap-4 border-t border-table-border py-3">
          <dt className="text-text-secondary">Plan expires</dt>
          <dd className="text-right font-bold text-foreground">
            {user.subscriptionExpiresAt ?? "—"}
          </dd>
        </div>
      </dl>
    </section>
  );
};

export default UserBusinessCard;