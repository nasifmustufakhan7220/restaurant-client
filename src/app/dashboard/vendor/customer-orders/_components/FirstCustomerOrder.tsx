
import React from 'react';
import VendorOrderStatusTabs from './VendorOrderStatusTabs';
import VendorOrdersTable from './VendorOrdersTable';
import VendorOrderCard from './VendorOrderCard';
import EmptyState from '@/app/(public)/browse/_components/EmptyState';
import { ClipboardList } from 'lucide-react';
import { getOrders } from '@/lib/api/menu';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { connection } from 'next/server';
import { Order } from '@/app/dashboard/customer/_components/order';

const FirstCustomerOrder = async () => {
    await connection();

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    if(user?.role !== "vendor"){
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg text-text-secondary">
                    You are not authorized to view this page.
                </p>
            </div>
        );
    }

    const result:Order[] = await getOrders(user.email as string);

    const orders = result;

  // FUNCTIONALITY: load the logged-in vendor's real orders here

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      

      <VendorOrderStatusTabs orders={orders} />

      {orders.length > 0 ? (
        <>
          {/* Desktop: table from lg, hidden below */}
          <VendorOrdersTable orders={orders} />

          {/* Mobile and tablet: cards */}
          <div className="grid gap-3 lg:hidden">
            {orders.map((order) => (
              <VendorOrderCard key={order._id} order={order} />
            ))}
          </div>

          <p className="text-sm text-text-secondary">
            Showing {orders.length} of {orders.length} orders
          </p>
        </>
      ) : (
        <EmptyState
          icon={<ClipboardList />}
          title="No orders yet"
          text="Orders for your items will appear here."
        />
      )}
    </div>
  );
};

export default FirstCustomerOrder;