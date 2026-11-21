import { getMenuItemsStats, type MenuItem } from "./menu-items-data";

// Four small cards with item numbers. Needs: items (list).
// Grid: 2 columns on mobile, 4 from "sm".
const MenuItemsStats = ({ items }: { items: MenuItem[] }) => {
  const stats = getMenuItemsStats(items);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-2xl border border-border bg-card p-4">
          <p className="text-sm text-text-muted">{stat.label}</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MenuItemsStats;