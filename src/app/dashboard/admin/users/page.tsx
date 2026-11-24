import { Suspense } from "react";
import UserFirstPage from "../_components/UserFirstPage";
import OrdersSkeleton from "../../vendor/customer-orders/_components/SkeletonOfCustomerOrder";

const ManageUsersPage = async () => {
 
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Users</h1>
        <p className="mt-1 text-text-secondary">
          View all registered vendors and customers, and block or unblock accounts.
        </p>
      </div>

      <Suspense fallback={<OrdersSkeleton/>}>
        <UserFirstPage/>
      </Suspense>

      
    </div>
  );
};

export default ManageUsersPage;