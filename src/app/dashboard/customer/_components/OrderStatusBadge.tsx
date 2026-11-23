import { cn } from "@/lib/utils";
import { OrderStatus } from "@/lib/types/order";


// Small rounded label that shows the status of an order. Needs: status.

// One place to change every badge color
const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-pill-warning text-warning",
  Accepted: "bg-pill-success text-success",
  Rejected: "bg-pill-danger text-destructive",
};

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
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

export default OrderStatusBadge;