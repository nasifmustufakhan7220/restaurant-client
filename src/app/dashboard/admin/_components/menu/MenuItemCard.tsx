import MenuItemActions from "./MenuItemActions";
import MenuItemBadge from "./MenuItemBadge";
import MenuItemThumb from "./MenuItemThumb";
import { formatPrice, type MenuItem } from "./menu-items-data";

// One menu item as a card, for mobile and tablet. Needs: item.
const MenuItemCard = ({ item }: { item: MenuItem }) => {
  return (
    <article className="grid gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <MenuItemThumb />
          <div className="min-w-0">
            <p className="wrap-break-word font-bold text-foreground">{item.itemName}</p>
            <p className="wrap-break-word text-sm text-text-muted">{item.category}</p>
          </div>
        </div>
        <MenuItemBadge status={item.status} />
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 wrap-break-word text-sm text-text-secondary">
          {item.vendorName} · {item.location}
        </p>
        <p className="shrink-0 text-lg font-extrabold text-foreground">{formatPrice(item.price)}</p>
      </div>

      <MenuItemActions status={item.status} id={item._id} />
    </article>
  );
};

export default MenuItemCard;