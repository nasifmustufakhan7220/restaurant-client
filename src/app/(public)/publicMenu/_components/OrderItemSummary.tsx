import { MapPin, Store } from "lucide-react";

import { AlertDialogDescription } from "@/components/ui/alert-dialog";

import { MenuItem } from "@/lib/types/home";
import { formatPrice } from "@/app/dashboard/admin/_components/menu/menu-items-data";


// The item details on the right side of the order dialog. Needs: item.

const OrderItemSummary = ({ item }: { item: MenuItem }) => {
  return (
    <div className="space-y-2">
      <span className="text-xs font-bold uppercase tracking-widest text-primary">{item.category}</span>

      {/* font-heading is the serif font from globals.css */}
      <h3 className="font-heading text-3xl text-foreground">{item.itemName}</h3>

      <AlertDialogDescription className="text-text-secondary">{item.description}</AlertDialogDescription>

      <p className="flex items-center gap-2 text-sm text-text-secondary">
        <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span className="wrap-break-word">{item.location}</span>
      </p>

      <p className="flex items-center gap-2 text-sm text-text-secondary">
        <Store className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <span className="wrap-break-word">{item.vendorName}</span>
      </p>

      <div className="flex items-baseline gap-2 border-t border-border pt-4">
        <span className="font-heading text-3xl text-foreground">{formatPrice(Number(item.price))}</span>
        <span className="text-xs whitespace-nowrap text-text-muted">made fresh to order</span>
      </div>
    </div>
  );
};

export default OrderItemSummary;