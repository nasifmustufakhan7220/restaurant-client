
import MenuItemActions from "./MenuItemActions";
import MenuItemBadge from "./MenuItemBadge";
import MenuItemThumb from "./MenuItemThumb";
import { formatPrice, type MenuItem } from "./menu-items-data";

const tableHeaders = [
  "Item",
  "Vendor Email",
  "Vendor Name",
  "Price",
  "Submitted",
  "Status",
  "Actions",
];

const cellStyles =
  "border-b border-table-border px-5 py-4 align-middle";

const MenuItemsTable = ({ items }: { items: MenuItem[] }) => {
  return (
    <div className="hidden overflow-hidden rounded-2xl border border-border bg-card lg:block">
      <div className="overflow-x-auto">
        <table className="w-full min-w-262.5 table-fixed border-collapse text-left">
          <thead className="bg-muted/50">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  className="border-b border-table-border px-5 py-4 text-xs font-semibold uppercase tracking-wider text-table-header"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className="transition-colors hover:bg-muted/40"
              >
                {/* Item */}
                <td className={`${cellStyles} w-[24%]`}>
                  <div className="flex min-w-0 items-center gap-3">
                    <MenuItemThumb />

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {item.itemName}
                      </p>
                      <p className="mt-1 truncate text-xs text-text-muted">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Vendor Email */}
                <td className={`${cellStyles} w-[19%]`}>
                  <p
                    title={item.vendorEmail}
                    className="truncate text-sm text-text-secondary"
                  >
                    {item.vendorEmail}
                  </p>
                </td>

                {/* Vendor Name */}
                <td className={`${cellStyles} w-[15%]`}>
                  <p
                    title={item.vendorName}
                    className="truncate text-sm font-medium text-foreground"
                  >
                    {item.vendorName}
                  </p>
                </td>

                {/* Price */}
                <td className={`${cellStyles} w-[11%]`}>
                  <p className="whitespace-nowrap text-sm font-bold text-foreground">
                    {formatPrice(Number(item.price))}
                  </p>
                </td>

                {/* Submitted */}
                <td className={`${cellStyles} w-[14%]`}>
                  <p className="whitespace-nowrap text-sm text-text-secondary">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </td>

                {/* Status */}
                <td className={`${cellStyles} w-[10%]`}>
                  <MenuItemBadge status={item.status} />
                </td>

                {/* Actions */}
                <td className={`${cellStyles} w-[7%]`}>
                  <MenuItemActions
                    status={item.status}
                    id={item._id}
                  />
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="px-5 py-16 text-center"
                >
                  <p className="text-sm font-medium text-foreground">
                    No menu items found
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    Menu items will appear here once submitted.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuItemsTable;
