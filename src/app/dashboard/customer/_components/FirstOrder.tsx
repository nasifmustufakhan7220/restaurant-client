import React from 'react';
import OrderStatusTabs from './OrderStatusTabs';
import OrdersTable from './OrdersTable';
import OrderCard from './OrderCard';
import EmptyState from '@/app/(public)/browse/_components/EmptyState';
import { SearchX } from 'lucide-react';
import { getOrdersByUserId } from '@/lib/api/orders';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Order } from '@/lib/types/order';


const FirstOrder = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

      const customerId = session?.user?.id;
      if(session?.user.role !== "customer"){
        return null;
      }
      const result:Order[] = await getOrdersByUserId(customerId as string);
    
     const orders = result;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      

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

export default FirstOrder;