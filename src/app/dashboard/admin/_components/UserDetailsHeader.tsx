import Link from "next/link";
import { ArrowLeft } from "lucide-react";


import type { UserDetails } from "./user-details-data";
import UserAvatar from "./UserAvatar";
import UserBadge from "./UserBadge";

// Top part of the page: breadcrumb, avatar, name, badges and the Back button.
// Needs: user.
const UserDetailsHeader = ({ user }: { user: UserDetails }) => {
  const status = user.isBlocked ? "blocked" : "active";

  return (
    <div className="space-y-4">
      <p className="flex flex-wrap items-center gap-1.5 text-sm text-text-muted">
        <span>Manage Users</span>
        <span aria-hidden="true">›</span>
        <span className="wrap-break-word font-bold text-foreground">{user.name}</span>
      </p>

      {/* Mobile: avatar + name on top, Back button below. From "sm": all in one row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <UserAvatar name={user.name} className="size-16 text-xl" />

          <div className="min-w-0">
            <h1 className="wrap-break-word text-2xl font-bold text-foreground">{user.name}</h1>
            <p className="break-all text-text-secondary">{user.email}</p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              <UserBadge tone={user.role}>{user.role}</UserBadge>
              {user.subscriptionPlan ? (
                <UserBadge tone={user.subscriptionPlan}>{user.subscriptionPlan}</UserBadge>
              ) : (
                <UserBadge tone={status}>Free</UserBadge>
              )}
              <UserBadge tone={status}>{status}</UserBadge>
            </div>
          </div>
        </div>

        <Link
          href="/dashboard/admin/users"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-bold text-foreground transition-colors hover:bg-section"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to users
        </Link>
      </div>
    </div>
  );
};

export default UserDetailsHeader;