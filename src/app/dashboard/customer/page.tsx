

import { Suspense } from "react";
import FirstOverview from "./_components/FirstOverview";
import Loading from "../vendor/my-menu/_components/OverViewSkeleton";

const CustomerDashBoardPage = () => {
 
  return (
    <div className="space-y-4">
      <Suspense fallback={<Loading/>}>
        <FirstOverview />
      </Suspense>
    </div>
  );
};

export default CustomerDashBoardPage;
