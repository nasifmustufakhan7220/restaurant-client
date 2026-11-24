import { Suspense } from "react";
import FirstMenuPage from "../_components/menu/FirstMenuPage";
import OrdersSkeleton from "../../vendor/customer-orders/_components/SkeletonOfCustomerOrder";

const ManageMenuItemsPage = () => {
  // FUNCTIONALITY: load the real menu items from the database here
 


  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Menu Items</h1>
        <p className="mt-1 text-text-secondary">
          Review submitted items, approve or reject them, and manage published items.
        </p>
      </div>

      <Suspense fallback={<OrdersSkeleton/>}>
        <FirstMenuPage />
      </Suspense>
    </div>
  );
};

export default ManageMenuItemsPage;