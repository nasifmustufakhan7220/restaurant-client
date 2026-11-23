import OrderThumb from "@/app/dashboard/customer/_components/OrderThumb";
import VendorOrderStatusBadge from "./VendorOrderStatusBadge";
import VendorOrderActions from "./VendorOrderActions";
import { VendorOrder } from "./vendor-orders-data";

type VendorOrderCardProps = {
  order: VendorOrder;
};

const VendorOrderCard = ({ order }: VendorOrderCardProps) => {
  console.log("VendorOrderCard order:", order); // Log the order to verify it's being passed correctly
  return (
    <article className="rounded-2xl border border-border bg-card p-4 grid gap-3">
      {/* Top row: customer on the left, status badge on the right */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="min-w-0">
          <p className="font-bold text-foreground wrap-break-word">{order.customerName}</p>
          <p className="text-sm text-text-muted break-all">{order.customerEmail ?? "-"}</p>
        </div>
        <VendorOrderStatusBadge status={order.orderStatus} />
      </div>

      {/* Item row */}
      <div className="flex items-center gap-3 min-w-0">
        <OrderThumb itemName={order.itemName} imageUrl={order.images[0]} />
        <p className="font-bold text-foreground wrap-break-word min-w-0">
          {order.itemName}
        </p>
      </div>

      {/* Details list */}
      <dl className="grid gap-1.5 text-sm">
        <div className="flex justify-between gap-3 wrap-break-word">
          <dt className="shrink-0 text-text-muted">Delivery date</dt>
          <dd className="font-bold text-foreground">{order.deliveryDate}</dd>
        </div>
        <div className="flex justify-between gap-3 wrap-break-word">
          <dt className="shrink-0 text-text-muted">Address</dt>
          <dd className="font-bold text-foreground">{order.deliveryAddress}</dd>
        </div>
        <div className="flex justify-between gap-3 wrap-break-word">
          <dt className="shrink-0 text-text-muted">Requested</dt>
          <dd className="font-bold text-foreground">{order.createdAt}</dd>
        </div>
      </dl>

      {/* Message box, shown only when there is a message */}
      {order.message && (
        <div className="rounded-xl bg-section p-3 text-sm text-text-secondary">
          “{order.message}”
        </div>
      )}

      {/* Action buttons: full width on mobile, auto width on desktop */}
      <VendorOrderActions orderStatus={order.orderStatus} id={order._id} />
    </article>
  );
};

export default VendorOrderCard;
