
import { Order } from "@/lib/types/order";
import OrderActions from "./OrderActions";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderThumb from "./OrderThumb";

// One order as a card, for mobile and tablet. Needs: order.

const OrderCard = ({ order }: { order: Order }) => {
  // Each row is { label, value }. To show one more detail, add one line here.
  const details = [
    { label: "Delivery date", value: order.deliveryDate },
    { label: "Address", value: order.deliveryAddress },
    { label: "Requested", value: order.createdAt },
  ];

  return (
    <article className="grid gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <OrderThumb itemName={order.itemName} imageUrl={order.itemImage} />
          <div className="min-w-0">
            <p className="wrap-break-word font-bold text-foreground">{order.itemName}</p>
            <p className="wrap-break-word text-sm text-text-muted">{order.vendorName}</p>
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <dl className="grid gap-1.5 text-sm">
        {details.map((detail) => (
          <div key={detail.label} className="flex justify-between gap-3">
            <dt className="shrink-0 text-text-muted">{detail.label}</dt>
            {/* break-words: a long address wraps and never widens the card */}
            <dd className="wrap-break-word text-right font-bold text-foreground">{detail.value}</dd>
          </div>
        ))}
      </dl>

      <OrderActions status={order.status} />
    </article>
  );
};

export default OrderCard;