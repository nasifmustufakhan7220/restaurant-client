import StatusPill, { type OrderStatus } from "./StatusPill";

// One row of table content. `cells` holds the text for every column except Status.
export type OverviewTableRow = {
  id: string;
  cells: string[];
  status: OrderStatus;
};

type OrdersTableCardProps = {
  title: string;
  columns: string[];
  rows: OverviewTableRow[];
};

export default function OrdersTableCard({
  title,
  columns,
  rows,
}: OrdersTableCardProps) {
  return (
    <section className="min-w-0 rounded-2xl border border-border bg-card p-4.5">
      <h3 className="text-[17px] font-semibold text-foreground">{title}</h3>

      {/* The table scrolls inside this wrapper so the page itself never scrolls sideways. */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-120 border-collapse text-sm lg:min-w-0">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="whitespace-nowrap px-2 pb-3 text-left text-[13px] font-semibold text-table-header"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {row.cells.map((cell, index) => (
                  <td
                    key={columns[index]}
                    className="border-b border-table-border px-2 py-3 text-foreground"
                  >
                    {cell}
                  </td>
                ))}

                <td className="border-b border-table-border px-2 py-3">
                  <StatusPill status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
