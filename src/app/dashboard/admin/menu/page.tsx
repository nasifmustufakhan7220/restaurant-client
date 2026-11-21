

// Admin > Manage Menu Items page (UI only).
// The dashboard layout already adds the page padding and the background.

import { menuItemsPlaceholder } from "../_components/menu/menu-items-data";
import MenuItemCard from "../_components/menu/MenuItemCard";
import MenuItemsStats from "../_components/menu/MenuItemsStats";
import MenuItemsTable from "../_components/menu/MenuItemsTable";
import MenuItemsToolbar from "../_components/menu/MenuItemsToolbar";

const ManageMenuItemsPage = () => {
  // FUNCTIONALITY: load the real menu items from the database here
  const items = menuItemsPlaceholder;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Menu Items</h1>
        <p className="mt-1 text-text-secondary">
          Review submitted items, approve or reject them, and manage published items.
        </p>
      </div>

      <MenuItemsStats items={items} />
      <MenuItemsToolbar />

      {/* Desktop: table (hidden below "lg") */}
      <MenuItemsTable items={items} />

      {/* Mobile and tablet: cards (hidden from "lg") */}
      <div className="grid gap-3 lg:hidden">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>

      {/* FUNCTIONALITY: show the real count and connect pagination here */}
      <p className="text-sm text-text-secondary">
        Showing {items.length} of {items.length} items
      </p>
    </div>
  );
};

export default ManageMenuItemsPage;