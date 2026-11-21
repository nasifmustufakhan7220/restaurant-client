"use client";
import type { LucideIcon } from "lucide-react";
import { Check, EyeOff, Trash2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { MenuItemStatus } from "./menu-items-data";
import { updateMenuItemStatus } from "@/lib/actions/admin";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

// The action buttons of one item. They change with the item status.
// Needs: status, and an optional className to control the layout.

type ActionTone = "success" | "danger" | "neutral";

type ItemAction = {
  label: string;
  tone: ActionTone;
  icon: LucideIcon;
};

// Which buttons each status gets (the delete button is added for every status below)
const actionsByStatus: Record<MenuItemStatus, ItemAction[]> = {
  Pending: [
    { label: "Approved", tone: "success", icon: Check },
    { label: "Rejected", tone: "danger", icon: X },
  ],
  Approved: [{ label: "Deactivate", tone: "neutral", icon: EyeOff }],
  Rejected: [],
};

const toneStyles: Record<ActionTone, string> = {
  success: "border-success text-success hover:bg-pill-success",
  danger: "border-destructive text-destructive hover:bg-pill-danger",
  neutral: "border-border text-foreground hover:bg-section",
};

const baseButtonStyles =
  "inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border px-4 text-sm font-bold transition-colors";

type MenuItemActionsProps = {
  status: MenuItemStatus;
  className?: string;
  id: string;
};

const MenuItemActions = ({ status, className, id }: MenuItemActionsProps) => {
  const actions = actionsByStatus[status];
  const router = useRouter();

  const handleActionClick = async (actionLabel: "Approved" | "Rejected" | "Pending") => {
    console.log(`${actionLabel} clicked for status: ${actionLabel} and ID: ${id}`);
    const result = await updateMenuItemStatus(id, actionLabel);
    console.log("Update result:", result); 
    if(result.matchedCount > 0){
      toast.add({
        title: "Success",
        description: `Menu item status updated to ${actionLabel}.`,
        type: "success",
      });
      router.refresh();
    }else{
      toast.add({
        title: "Error",
        description: `Failed to update menu item status to ${actionLabel}.`,
        type: "error",
      });
    }
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* FUNCTIONALITY: connect approve, reject, activate and deactivate here */}
      {actions.map((action) => (

        <button
          key={action.label}
          onClick={() => {
            handleActionClick(action.label as "Approved" | "Rejected" | "Pending");
          }}
          type="button"
          className={cn(baseButtonStyles, toneStyles[action.tone])}
        >
          <action.icon className="size-4" aria-hidden="true" />
          {action.label}
        </button>
      ))}

      {/* FUNCTIONALITY: connect delete (with a confirm dialog) here */}
      <button
        type="button"
        aria-label="Delete item"
        className="inline-flex size-10 items-center justify-center rounded-full border border-border text-destructive transition-colors hover:bg-pill-danger"
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
};

export default MenuItemActions;