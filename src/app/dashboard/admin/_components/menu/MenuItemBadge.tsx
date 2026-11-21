import { cn } from "@/lib/utils";
import type { MenuItemStatus } from "./menu-items-data";

// Small rounded label that shows the status of an item. Needs: status.

// One place to change every badge color
const statusStyles: Record<MenuItemStatus, string> = {
  pending: "bg-pill-warning text-warning",
  approved: "bg-pill-success text-success",
  rejected: "bg-pill-danger text-destructive",
  inactive: "bg-section text-text-secondary",
};

const MenuItemBadge = ({ status }: { status: MenuItemStatus }) => {
  return (
    <span
      className={cn(
        // "capitalize" turns "pending" into "Pending"
        "inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold capitalize",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
};

export default MenuItemBadge;