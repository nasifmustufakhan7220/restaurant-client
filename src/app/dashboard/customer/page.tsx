

import { Suspense } from "react";
import FirstOverview from "./_components/FirstOverview";

const CustomerDashBoardPage = () => {
 
  return (
    <div className="space-y-4">
      <Suspense fallback={<div className="text-center text-gray-500">Loading overview...</div>}>
        <FirstOverview />
      </Suspense>
    </div>
  );
};

export default CustomerDashBoardPage;
