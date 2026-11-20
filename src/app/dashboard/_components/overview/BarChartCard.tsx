// A small CSS bar chart used on the Overview page. No chart library needed.
export type ChartBar = {
  label: string;
  value: number;
};

type BarChartCardProps = {
  title: string;
  bars: ChartBar[];
};

const BAR_AREA_HEIGHT = 140;

export default function BarChartCard({ title, bars }: BarChartCardProps) {
  const highestValue = Math.max(...bars.map((bar) => bar.value), 1);

  return (
    <section className="min-w-0 rounded-2xl border border-border bg-card p-4.5">
      <h3 className="text-[17px] font-semibold text-foreground">{title}</h3>

      {/* Bars share the row evenly, so the chart stays readable on mobile. */}
      <div className="mt-5 flex gap-2.5">
        {bars.map((bar) => {
          const heightPercent = (bar.value / highestValue) * 100;

          return (
            <div key={bar.label} className="flex min-w-0 flex-1 flex-col items-center">
              <span className="mb-1 text-xs text-text-muted">{bar.value}</span>

              <div
                className="flex w-full items-end"
                style={{ height: `${BAR_AREA_HEIGHT}px` }}
              >
                <div
                  className="w-full rounded-t-[8px] bg-linear-to-b from-chart-1 to-chart-2"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              <span className="mt-2 truncate text-xs text-text-muted">{bar.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
