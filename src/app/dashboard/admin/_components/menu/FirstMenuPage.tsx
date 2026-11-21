import { getAllMenuItems } from "@/lib/api/admin";
import React from "react";
import MenuItemsStats from "./MenuItemsStats";
import MenuItemsToolbar from "./MenuItemsToolbar";
import MenuItemsTable from "./MenuItemsTable";
import MenuItemCard from "./MenuItemCard";
import { menuItemsPlaceholder } from "./menu-items-data";

const FirstMenuPage = async () => {
  const menuItems = await getAllMenuItems();
  console.log(menuItems);
  const items = menuItemsPlaceholder;
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 space-y-4">
      <MenuItemsStats items={menuItems} />
      <MenuItemsToolbar />

      {/* Desktop: table (hidden below "lg") */}
      <MenuItemsTable items={menuItems} />

      {/* Mobile and tablet: cards (hidden from "lg") */}
      <div className="grid gap-3 lg:hidden">
        {items.map((item) => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </div>

      {/* FUNCTIONALITY: show the real count and connect pagination here */}
      <p className="text-sm text-text-secondary">
        Showing {items.length} of {items.length} items
      </p>
    </div>
  );
};

export default FirstMenuPage;
