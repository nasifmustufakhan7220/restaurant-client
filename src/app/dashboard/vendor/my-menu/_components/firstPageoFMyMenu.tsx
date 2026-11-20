import { getMenuItems } from "@/lib/api/menu";
import MenuItemCard from "./MenuItemCard";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { MenuItemData } from "@/lib/actions/menu";

const FirstPageOfMyMenu = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const vendorId = session?.user?.id;
  const result: MenuItemData[] = await getMenuItems(vendorId as string);
  
  return (
    <div >
      <section className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {result.map((item) => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </section>
    </div>
  );
};

export default FirstPageOfMyMenu;
