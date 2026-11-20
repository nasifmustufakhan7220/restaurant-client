import { Suspense } from "react";
import MenuItemsFilters from "./_components/MenuItemsFilters";
import MenuItemsHeader from "./_components/MenuItemsHeader";
import PlanUsageBanner from "./_components/PlanUsageBanner";
import StatusTabs from "./_components/StatusTabs";

import FirstPageOfMyMenu from "./_components/firstPageoFMyMenu";

const MyMenuPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 lg:gap-6">
      <MenuItemsHeader />
      <PlanUsageBanner />
      <StatusTabs />
      <MenuItemsFilters />

      <Suspense fallback={<div>Loading menu items...</div>}>
        <FirstPageOfMyMenu />
      </Suspense>
    </div>
  );
};

export default MyMenuPage;
