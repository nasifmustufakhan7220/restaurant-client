import { Ban, UserCheck } from "lucide-react";


import { cn } from "@/lib/utils";
import type { UserDetails } from "./user-details-data";
import UserBadge from "./UserBadge";

// Account status card with the Block / Unblock button. Needs: user.
const buttonStyles =
  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border px-5 text-sm font-bold transition-colors";

const UserAccountCard = ({ user }: { user: UserDetails }) => {
  const status = user.isBlocked ? "blocked" : "active";

  // The explanation text changes with the status
  let statusMessage = "This user can use all the features of their role.";
  if (user.isBlocked) {
    statusMessage = "This user is blocked and cannot use protected platform features.";
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">Account status</h2>
        <UserBadge tone={status}>{status}</UserBadge>
      </div>

      <p className="mb-4 text-sm text-text-secondary">{statusMessage}</p>

      {/* FUNCTIONALITY: connect block / unblock (with a confirm dialog) here */}
      {user.isBlocked ? (
        <button
          type="button"
          className={cn(buttonStyles, "border-success text-success hover:bg-pill-success")}
        >
          <UserCheck className="size-4" aria-hidden="true" />
          Unblock user
        </button>
      ) : (
        <button
          type="button"
          className={cn(buttonStyles, "border-destructive text-destructive hover:bg-pill-danger")}
        >
          <Ban className="size-4" aria-hidden="true" />
          Block user
        </button>
      )}
    </section>
  );
};

export default UserAccountCard;