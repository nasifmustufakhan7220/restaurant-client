import { getMenuItems } from "@/lib/api/menu";
import MenuItemCard from "./MenuItemCard";
import { headers } from "next/headers";
import { connection } from "next/server";
import { auth } from "@/lib/auth";
import type { MenuItemData } from "@/lib/types/menu-item";
import MenuItemsFilters from "./MenuItemsFilters";
import StatusTabs from "./StatusTabs";
import PlanUsageBanner from "./PlanUsageBanner";

const FirstPageOfMyMenu = async () => {
  await connection();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const vendorId = session?.user?.id;
  const result: MenuItemData[] = await getMenuItems(vendorId as string);


  return (
    <div>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-4 lg:gap-6">
        <PlanUsageBanner />
        <StatusTabs result={result} />
        <MenuItemsFilters />

        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">

        {result.map((item) => (
          <MenuItemCard key={item._id} item={item} />
        ))}
        </div>
      </section>
    </div>
  );
};

export default FirstPageOfMyMenu;
