// Desktop table of vendor orders (shown from lg, hidden below).
// Needs: orders (list). Reuses OrderThumb for the item picture and VendorOrderStatusBadge for status.
import OrderThumb from "@/app/dashboard/customer/_components/OrderThumb";
import VendorOrderStatusBadge from "./VendorOrderStatusBadge";
import VendorOrderActions from "./VendorOrderActions";
import { VendorOrder } from "./vendor-orders-data";

type VendorOrdersTableProps = {
  orders: VendorOrder[];
};

const VendorOrdersTable = ({ orders }: VendorOrdersTableProps) => {
  return (
    // Scroll wrapper so wide tables never push the page sideways.
    <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card lg:block">
      <table className="min-w-245 w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="text-sm font-semibold text-table-header whitespace-nowrap border-b border-table-border px-4 py-3.5">
              Customer
            </th>
            <th className="text-sm font-semibold text-table-header whitespace-nowrap border-b border-table-border px-4 py-3.5">
              Item
            </th>
            <th className="text-sm font-semibold text-table-header whitespace-nowrap border-b border-table-border px-4 py-3.5">
              Delivery
            </th>
            <th className="text-sm font-semibold text-table-header whitespace-nowrap border-b border-table-border px-4 py-3.5">
              Message
            </th>
            <th className="text-sm font-semibold text-table-header whitespace-nowrap border-b border-table-border px-4 py-3.5">
              Status
            </th>
            <th className="text-sm font-semibold text-table-header whitespace-nowrap border-b border-table-border px-4 py-3.5">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border-b border-table-border px-4 py-3.5 align-middle min-w-0">
                <div className="min-w-0">
                  <p className="font-bold text-foreground wrap-break-word">{order.customerName}</p>
                  <p className="text-sm text-text-muted break-all">{order.customerEmail ?? "-"}</p>
                </div>
              </td>
              <td className="border-b border-table-border px-4 py-3.5 align-middle min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <OrderThumb
                    itemName={order.itemName}
                    imageUrl={order.images[0]}
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-foreground wrap-break-word">
                      {order.itemName}
                    </p>
                  </div>
                </div>
              </td>
              <td className="border-b border-table-border px-4 py-3.5 align-middle whitespace-nowrap">
                <div className="min-w-0">
                  <p className="font-bold text-foreground">{order.deliveryDate}</p>
                  <p className="text-sm text-text-muted wrap-break-word max-w-55">
                    {order.deliveryAddress}
                  </p>
                </div>
              </td>
              <td className="border-b border-table-border px-4 py-3.5 align-middle max-w-50 wrap-break-word text-text-secondary">
                {order.message ?? "—"}
              </td>
              <td className="border-b border-table-border px-4 py-3.5 align-middle">
                <VendorOrderStatusBadge status={order.orderStatus} />
              </td>
              <td className="border-b border-table-border px-4 py-3.5 align-middle">
                <VendorOrderActions orderStatus={order.orderStatus} id={order._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorOrdersTable;
