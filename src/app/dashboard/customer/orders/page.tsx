import { Suspense } from "react";
import DashboardPageHeader from "../_components/DashboardPageHeader";
import FirstOrder from "../_components/FirstOrder";

const MyOrdersPage = () => {
 return(
  <div>
    <DashboardPageHeader
        title="My Orders"
        description="Track your orders and cancel the ones that are still pending."
      />

      <Suspense fallback={<p className="text-center text-gray-500">Loading your orders...</p>}>
        <FirstOrder/>
      </Suspense>
  </div>
 )
};

export default MyOrdersPage;
