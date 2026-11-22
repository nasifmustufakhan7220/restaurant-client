import { SearchX } from "lucide-react";
import { ordersPlaceholder } from "../_components/orders-data";
import DashboardPageHeader from "../_components/DashboardPageHeader";
import OrderStatusTabs from "../_components/OrderStatusTabs";
import OrdersTable from "../_components/OrdersTable";
import OrderCard from "../_components/OrderCard";
import EmptyState from "@/app/(public)/browse/_components/EmptyState";

// Customer > My Orders page (UI only).
// The dashboard layout already adds the page padding and the background.

const MyOrdersPage = () => {
  // FUNCTIONALITY: load the logged-in customer's real orders here
  const orders = ordersPlaceholder;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <DashboardPageHeader
        title="My Orders"
        description="Track your orders and cancel the ones that are still pending."
      />

      <OrderStatusTabs orders={orders} />

      {orders.length > 0 ? (
        <>
          {/* Desktop: table (hidden below "lg") */}
          <OrdersTable orders={orders} />

          {/* Mobile and tablet: cards (hidden from "lg") */}
          <div className="grid gap-3 lg:hidden">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>

          <p className="text-sm text-text-secondary">
            Showing {orders.length} of {orders.length} orders
          </p>
        </>
      ) : (
        <EmptyState
          icon={<SearchX className="h-12 w-12 text-gray-400" />}
          title="No items found"
          text="Try a different search, category or location."
        />
      )}
    </div>
  );
};

export default MyOrdersPage;
