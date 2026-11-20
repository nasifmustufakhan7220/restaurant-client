import { MapPin, Pizza } from "lucide-react";
import CardShell from "./CardShell";

// Static menu card preview. The owner will connect real form values later.
export default function MenuItemPreviewCard() {
  return (
    <CardShell className="min-w-0 lg:sticky lg:top-[calc(var(--dashboard-navbar-height)+1rem)]">
      <h3 className="text-[17px] font-semibold text-foreground">Live preview</h3>

      {/* FUNCTIONALITY: show live preview from form values here */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-border">
        <div className="flex aspect-2/1 w-full items-center justify-center bg-linear-to-br from-accent to-section">
          <Pizza className="size-10 text-primary" aria-hidden="true" />
        </div>

        <div className="p-3.5">
          <p className="text-[11px] font-bold tracking-wide text-primary uppercase">
            Category
          </p>

          <p className="mt-1 truncate text-base font-bold text-foreground">Item name</p>

          <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
            <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">Location</span>
          </p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-lg font-bold text-foreground">$0.00</span>
            <span className="rounded-full bg-pill-warning px-2.5 py-1 text-xs font-bold text-warning">
              Pending
            </span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-text-muted">
        This is how your item card will look on the menu.
      </p>
    </CardShell>
  );
}
