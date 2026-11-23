import DashboardPageHeader from "@/app/dashboard/customer/_components/DashboardPageHeader";
import { Suspense } from "react";
import FirstCustomerOrder from "./_components/FirstCustomerOrder";


const CustomerOrdersPage = () => {


  // FUNCTIONALITY: load the logged-in vendor's real orders here

  return (
    <div>
      <DashboardPageHeader
        title="Customer Orders"
        description="Review the orders for your items. Accept or reject the ones that are pending."
      />

      <Suspense fallback={<div>Loading orders...</div>}>
        <FirstCustomerOrder />
      </Suspense>
    </div>
  );
};

export default CustomerOrdersPage;
