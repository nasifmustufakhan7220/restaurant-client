import MenuItemActions from "./MenuItemActions";
import MenuItemBadge from "./MenuItemBadge";
import MenuItemThumb from "./MenuItemThumb";
import { formatPrice, type MenuItem } from "./menu-items-data";

// Desktop table of menu items. Needs: items (list).
// Hidden below "lg" because small screens use cards instead (see MenuItemCard).

const tableHeaders = ["Item", "Vendor", "Price", "Submitted", "Status", "Actions"];

const cellStyles = "border-b border-table-border px-4 py-3.5";

const MenuItemsTable = ({ items }: { items: MenuItem[] }) => {
  return (
    // overflow-x-auto: if the table is wider than the card, only the card scrolls, not the page
    <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card lg:block">
      <table className="w-full min-w-205 border-collapse text-left">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                className="whitespace-nowrap border-b border-table-border px-4 py-3.5 text-sm font-semibold text-table-header"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td className={cellStyles}>
                <div className="flex min-w-0 items-center gap-3">
                  <MenuItemThumb />
                  <div className="min-w-0">
                    <p className="truncate font-bold text-foreground">{item.itemName}</p>
                    <p className="truncate text-sm text-text-muted">{item.category}</p>
                  </div>
                </div>
              </td>

              <td className={cellStyles}>
                <p className="font-bold text-foreground">{item.vendorName}</p>
                <p className="text-sm text-text-muted">{item.location}</p>
              </td>

              <td className={`${cellStyles} font-bold text-foreground`}>{formatPrice(Number(item.price))}</td>

              <td className={`${cellStyles} whitespace-nowrap text-text-secondary`}>{item.createdAt}</td>

              <td className={cellStyles}>
                <MenuItemBadge status={item.status} />
              </td>

              <td className={cellStyles}>
                <MenuItemActions status={item.status} id={item._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MenuItemsTable;