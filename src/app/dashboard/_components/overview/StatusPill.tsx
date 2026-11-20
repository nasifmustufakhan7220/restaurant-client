import { cn } from "@/lib/utils";

// The statuses used by the Overview tables and the one place their pill colors live.
export type OrderStatus =
  | "Pending"
  | "Accepted"
  | "Approved"
  | "Rejected"
  | "Cancelled";

const statusPillClasses: Record<OrderStatus, string> = {
  Pending: "bg-pill-warning text-warning",
  Accepted: "bg-pill-success text-success",
  Approved: "bg-pill-success text-success",
  Rejected: "bg-pill-danger text-destructive",
  Cancelled: "bg-pill-danger text-destructive",
};

type StatusPillProps = {
  status: OrderStatus;
};

export default function StatusPill({ status }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-bold",
        statusPillClasses[status],
      )}
    >
      {status}
    </span>
  );
}
