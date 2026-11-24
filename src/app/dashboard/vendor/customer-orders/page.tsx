import DashboardPageHeader from "@/app/dashboard/customer/_components/DashboardPageHeader";
import { Suspense } from "react";
import FirstCustomerOrder from "./_components/FirstCustomerOrder";
import OrdersSkeleton from "./_components/SkeletonOfCustomerOrder";


const CustomerOrdersPage = () => {


  // FUNCTIONALITY: load the logged-in vendor's real orders here

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 lg:gap-6">
      <DashboardPageHeader
        title="Customer Orders"
        description="Review the orders for your items. Accept or reject the ones that are pending."
      />

      <Suspense fallback={<OrdersSkeleton/>}>
        <FirstCustomerOrder />
      </Suspense>
    </div>
  );
};

export default CustomerOrdersPage;
