import { Suspense } from "react";
import DashboardPageHeader from "../_components/DashboardPageHeader";
import FirstOrder from "../_components/FirstOrder";
import OrdersSkeleton from "../../vendor/customer-orders/_components/SkeletonOfCustomerOrder";

const MyOrdersPage = () => {
 return(
  <div>
    <DashboardPageHeader
        title="My Orders"
        description="Track your orders and cancel the ones that are still pending."
      />

      <Suspense fallback={<OrdersSkeleton/>}>
        <FirstOrder/>
      </Suspense>
  </div>
 )
};

export default MyOrdersPage;
