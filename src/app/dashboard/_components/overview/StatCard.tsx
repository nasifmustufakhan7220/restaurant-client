import type { LucideIcon } from "lucide-react";

// One Overview stat card: a muted label, a bold value, and an icon in the top-right.
export type StatCardData = {
  label: string;
  value: string | number;
  icon: LucideIcon;
};

type StatCardProps = StatCardData;

export default function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] text-text-muted">{label}</p>
          <p className="mt-1.5 text-[26px] font-bold leading-none text-foreground">
            {value}
          </p>
        </div>

        <div className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-stat-icon text-stat-icon-foreground">
          <Icon className="size-4" aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
