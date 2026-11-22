
import { Order } from "@/lib/types/order";
import OrderActions from "./OrderActions";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderThumb from "./OrderThumb";

// Desktop table of orders. Needs: orders (list).
// Hidden below "lg" because small screens use cards instead (see OrderCard).

const tableHeaders = ["Item", "Delivery date", "Delivery address", "Requested", "Status", "Actions"];

const cellStyles = "border-b border-table-border px-4 py-3.5";

const OrdersTable = ({ orders }: { orders: Order[] }) => {
  return (
    // overflow-x-auto: if the table is wider than the card, only the card scrolls, not the page
    <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card lg:block">
      <table className="w-full min-w-215 border-collapse text-left">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                className="whitespace-nowrap border-b border-table-border px-4 py-3.5 text-sm font-semibold text-table-header"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className={cellStyles}>
                <div className="flex min-w-0 items-center gap-3">
                  <OrderThumb itemName={order.itemName} imageUrl={order.itemImage} />
                  <div className="min-w-0">
                    <p className="truncate font-bold text-foreground">{order.itemName}</p>
                    <p className="truncate text-sm text-text-muted">{order.vendorName}</p>
                  </div>
                </div>
              </td>

              <td className={`${cellStyles} whitespace-nowrap font-bold text-foreground`}>
                {order.deliveryDate}
              </td>

              {/* A long address wraps inside the cell instead of widening the table */}
              <td className={`${cellStyles} max-w-55 wrap-break-wordtext-text-secondary`}>
                {order.deliveryAddress}
              </td>

              <td className={`${cellStyles} whitespace-nowrap text-text-secondary`}>{order.createdAt}</td>

              <td className={cellStyles}>
                <OrderStatusBadge status={order.status} />
              </td>

              <td className={cellStyles}>
                <OrderActions status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;