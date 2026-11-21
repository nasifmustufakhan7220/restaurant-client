import { MapPin } from "lucide-react";
import AvailabilityToggle from "./AvailabilityToggle";
import StatusBadge from "./StatusBadge";
import { MenuItemData } from "@/lib/actions/menu";
import Image from "next/image";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn/DeleteBtn";

// One menu item card: image, details, availability toggle and the three actions.
type MenuItemCardProps = {
  item: MenuItemData;
};

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    // h-full + flex-col keeps every card the same height and the actions at the bottom.
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="relative flex h-37.5 shrink-0 items-center justify-center bg-linear-to-br from-accent to-section">
        <span className="absolute top-3 left-3">
          <StatusBadge status={item.status} />
        </span>

        <Image
          src={item.images?.[0] || "/placeholder.png"}
          alt={item.itemName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold tracking-wide text-primary uppercase">
          {item.category}
        </p>

        <h3 className="mt-1 truncate text-base font-bold text-foreground">
          {item.itemName}
        </h3>

        <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{item.location}</span>
        </p>

        <p className="mt-2 text-lg font-bold text-foreground">{item.price}</p>

        {item.status === "Pending" ? (
          <p className="mt-3 rounded-lg bg-pill-warning px-3 py-2 text-xs text-warning">
            Waiting for admin approval.
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <span className="text-xs text-text-muted">Available to customers</span>

        <AvailabilityToggle
          initialValue={item.isAvailable}
          itemName={item.itemName}
        />
      </div>

      <div className="flex divide-x divide-border border-t border-border">
        <Link
          className="flex-1 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          href={`/dashboard/vendor/my-menu/${item._id}`}
        >
          <button type="button">View</button>
        </Link>

        <Link href={`/dashboard/vendor/my-menu/${item._id}/updateMenu`} className="flex-1 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:bg-accent">
          <button
            type="button"
          >
            Edit
          </button>
        </Link>
        <DeleteBtn id={item._id as string} deleteMenuOnRole="vendor" />
      </div>
    </article>
  );
}
