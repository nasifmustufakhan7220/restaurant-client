import { cn } from "@/lib/utils";
import { OrderStatus } from "@/lib/types/order";
import Link from "next/link";


// The "View" and "Cancel" buttons of one order.
// Needs: status. Optional: className to control the layout.
// Only a pending order can be cancelled, so the Cancel button shows only for "pending".

const baseButtonStyles =
  "inline-flex min-h-10 flex-1 items-center justify-center rounded-full border px-4 text-sm font-bold transition-colors lg:flex-none";

type OrderActionsProps = {
  status: OrderStatus;
  className?: string;
  id : string;
};

const OrderActions = ({ status, className, id }: OrderActionsProps) => {
  console.log("OrderActions id:", id); // Log the id to verify it's being passed correctly
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {/* FUNCTIONALITY: open the order details here */}
      <Link href={`/publicMenu/${id}`}>
        <button
        type="button"
        className={cn(baseButtonStyles, "border-border text-foreground hover:bg-section")}
      >
        View
      </button>
      
      </Link>

      {/* FUNCTIONALITY: connect cancel order (with a confirm dialog) here */}
      {status === "Pending" && (
        <button
          type="button"
          className={cn(baseButtonStyles, "border-destructive text-destructive hover:bg-pill-danger")}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default OrderActions;