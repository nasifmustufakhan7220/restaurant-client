import { Suspense } from "react";
import FirstOverview from "../_components/overview/FirstOverview";
import Loading from "../vendor/my-menu/_components/OverViewSkeleton";

const AdminDashBoardPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-5">Overview</h1>
      <Suspense
        fallback={
          <Loading/>
        }
      >
        <FirstOverview />
      </Suspense>
    </div>
  );
};

export default AdminDashBoardPage;
