import BarChartCard, { type ChartBar } from "./BarChartCard";
import OrdersTableCard, { type OverviewTableRow } from "./OrdersTableCard";
import StatCard, { type StatCardData } from "./StatCard";

// The shared Overview page body: title, stat cards, then chart and table.
type OverviewContentProps = {
  statsLabel: string;
  statCards: StatCardData[];
  chartTitle: string;
  chartBars: ChartBar[];
  tableTitle: string;
  tableColumns: string[];
  tableRows: OverviewTableRow[];
};

export default function OverviewContent({
  statsLabel,
  statCards,
  chartTitle,
  chartBars,
  tableTitle,
  tableColumns,
  tableRows,
}: OverviewContentProps) {
  return (
    <div className="flex flex-col gap-5">
      

      <section
        aria-label={statsLabel}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      {/* One column below `lg`, then chart (3) and table (2) side by side. */}
      <section className="grid grid-cols-1 gap-3 lg:grid-cols-[3fr_2fr]">
        <BarChartCard title={chartTitle} bars={chartBars} />
        <OrdersTableCard title={tableTitle} columns={tableColumns} rows={tableRows} />
      </section>
    </div>
  );
}
