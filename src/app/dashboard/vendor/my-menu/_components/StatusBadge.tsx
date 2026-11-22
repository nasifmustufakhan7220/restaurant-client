import { cn } from "@/lib/utils";
import type { MenuItemStatus } from "@/lib/types/menu-item";

// Approved / Pending / Rejected reuse the existing status tokens.
// There is no "inactive" token, so Inactive uses the neutral section tokens.
const statusClasses: Record<MenuItemStatus, string> = {
  Approved: "bg-pill-success text-success",
  Pending: "bg-pill-warning text-warning",
  Rejected: "bg-pill-danger text-destructive",
  Inactive: "bg-section text-text-secondary",
};

// One small pill that shows the approval status of a menu item.
type StatusBadgeProps = {
  status: MenuItemStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-bold",
        statusClasses[status],
      )}
    >
      {status}
    </span>
  );
}
