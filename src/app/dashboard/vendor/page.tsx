import { Suspense } from "react";
import FirstOverViewVendor from "./my-menu/_components/FirstOverViewVendor";


const VendorDashBoardpage = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold text-foreground mb-5">Overview</h1>
      <Suspense fallback={<div className="flex h-full w-full items-center justify-center">Loading...</div>}>
        <FirstOverViewVendor/>
      </Suspense>
    </div>
  );
};

export default VendorDashBoardpage;
