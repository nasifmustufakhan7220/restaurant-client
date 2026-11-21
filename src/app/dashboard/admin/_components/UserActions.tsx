import { Ban, Eye, UserCheck } from "lucide-react";

import { cn } from "@/lib/utils";

// The "View" and "Block / Unblock" buttons of one user.
// Needs: isBlocked, and an optional className to control the layout.

const baseButtonStyles =
  "inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border px-4 text-sm font-bold transition-colors";

type UserActionsProps = {
  isBlocked: boolean;
  className?: string;
};

const UserActions = ({ isBlocked, className }: UserActionsProps) => {
  return (
    <div className={cn(className)}>
      {/* FUNCTIONALITY: open the user details dialog here */}
      <button
        type="button"
        className={cn(baseButtonStyles, "border-border text-foreground hover:bg-section")}
      >
        <Eye className="size-4" aria-hidden="true" />
        View
      </button>

      {/* FUNCTIONALITY: connect block / unblock (with a confirm dialog) here */}
      {isBlocked ? (
        <button
          type="button"
          className={cn(baseButtonStyles, "border-success text-success hover:bg-pill-success")}
        >
          <UserCheck className="size-4" aria-hidden="true" />
          Unblock
        </button>
      ) : (
        <button
          type="button"
          className={cn(baseButtonStyles, "border-destructive text-destructive hover:bg-pill-danger")}
        >
          <Ban className="size-4" aria-hidden="true" />
          Block
        </button>
      )}
    </div>
  );
};

export default UserActions;