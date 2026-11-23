// Status badge for vendor orders. Shows one badge per order.
// Needs: orderStatus. Handles Pending, Accepted, Rejected, Cancelled.
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/lib/types/order";

// Local status type includes Cancelled, which is not in the shared OrderStatus.
type VendorOrderStatus = OrderStatus | "Cancelled";

// One place to change every badge color.
const statusStyles: Record<VendorOrderStatus, string> = {
  Pending: "bg-pill-warning text-warning",
  Accepted: "bg-pill-success text-success",
  Rejected: "bg-pill-danger text-destructive",
  Cancelled: "bg-section text-text-secondary",
};

type VendorOrderStatusBadgeProps = {
  status: VendorOrderStatus;
};

const VendorOrderStatusBadge = ({
  status,
}: VendorOrderStatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold capitalize",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
};

export default VendorOrderStatusBadge;
