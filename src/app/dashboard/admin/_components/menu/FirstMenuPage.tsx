import { getAllMenuItems } from "@/lib/api/admin";
import MenuItemsStats from "./MenuItemsStats";
import MenuItemsToolbar from "./MenuItemsToolbar";
import MenuItemsTable from "./MenuItemsTable";
import MenuItemCard from "./MenuItemCard";
import { MenuItem } from "./menu-items-data";

const FirstMenuPage = async () => {
  const menuItems:MenuItem[] = await getAllMenuItems();
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 space-y-4">
      <MenuItemsStats items={menuItems} />
      <MenuItemsToolbar />

      {/* Desktop: table (hidden below "lg") */}
      <MenuItemsTable items={menuItems} />

      {/* Mobile and tablet: cards (hidden from "lg") */}
      <div className="grid gap-3 lg:hidden">
        {menuItems.map((item) => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </div>

      {/* FUNCTIONALITY: show the real count and connect pagination here */}
      <p className="text-sm text-text-secondary">
        Showing {menuItems.length} of {menuItems.length} items
      </p>
    </div>
  );
};

export default FirstMenuPage;
