import { Suspense } from "react";
import FirstOverViewVendor from "./my-menu/_components/FirstOverViewVendor";
import Loading from "./my-menu/_components/OverViewSkeleton";


const VendorDashBoardpage = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold text-foreground mb-5">Overview</h1>
      <Suspense fallback={<Loading/>}>
        <FirstOverViewVendor/>
      </Suspense>
    </div>
  );
};

export default VendorDashBoardpage;
