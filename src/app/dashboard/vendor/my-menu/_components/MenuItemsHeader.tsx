import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

// Page title and the link that opens the Add Menu Item form.
export default function MenuItemsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-foreground">My Menu Items</h1>
        <p className="mt-1 text-sm text-text-muted">
          Manage your items, their availability and approval status.
        </p>
      </div>

      <Link
        href="/dashboard/vendor/add-menu"
        className={buttonVariants({
          className:
            "h-11 w-full shrink-0 rounded-full px-5 font-semibold sm:w-auto",
        })}
      >
        <Plus className="size-4" aria-hidden="true" />
        Add Menu Item
      </Link>
    </div>
  );
}
