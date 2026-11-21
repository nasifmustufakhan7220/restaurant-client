import { Suspense } from "react";
import FirstOverview from "../_components/overview/FirstOverview";

const AdminDashBoardPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-5">Overview</h1>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            Loading...
          </div>
        }
      >
        <FirstOverview />
      </Suspense>
    </div>
  );
};

export default AdminDashBoardPage;
