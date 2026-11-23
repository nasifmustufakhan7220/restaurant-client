"use client";

import Image from "next/image";
import { ArrowRight, Pizza, ShieldCheck, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// The "Secure demo checkout" pop-up (UI only). Everything is in this one file.
// It has no open button of its own: the parent decides when it is open.
// Needs: item, open, onOpenChange, onBack. Optional: deliveryDate.

// The fields this pop-up reads from an item. All of them are optional on purpose.
// This type does NOT import MenuItem, so a MenuItem (or any object with these names)
// always fits, and extra fields on MenuItem are simply ignored.
type CheckoutItem = {
  itemName?: string;
  category?: string;
  price?: string | number;
  images?: string[]; // the first image is shown
};

type CheckoutDialogProps = {
  item: CheckoutItem;
  deliveryDate?: string; // like "2026-11-25". It is a separate prop, not part of item
  open: boolean; // true = the pop-up is visible
  onOpenChange: (open: boolean) => void; // called when the pop-up asks to open or close
  onBack: () => void; // called when "Back to order details" is clicked
};

// The fake card is only a picture. Change the text here if you want.
const demoCard = {
  brand: "VISA",
  expiry: "12/30",
  lastFour: "4242",
};

// "20.00" or 20 -> "$20.00"
const formatPrice = (price: string | number) => `$${Number(price).toFixed(2)}`;

const CheckoutDialog = ({ item, deliveryDate, open, onOpenChange, onBack }: CheckoutDialogProps) => {
    
  const imageUrl = item.images?.[0];
  const itemName = item.itemName ?? "Menu item";
  const priceText = formatPrice(item.price ?? 0);

  // The small gray line under the name, like "Classic Pizzas · Delivery 2026-11-25".
  // The delivery part is added only when a deliveryDate was passed.
  let detailsText = item.category ?? "";
  if (deliveryDate) {
    detailsText = detailsText ? `${detailsText} · Delivery ${deliveryDate}` : `Delivery ${deliveryDate}`;
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {/* The "!" at the end makes our width win over the small default width of AlertDialogContent.
          max-h + overflow-y-auto: on a small phone the pop-up scrolls instead of getting cut off. */}
      <AlertDialogContent className="max-h-[92vh] w-[calc(100%-1.5rem)] max-w-none! gap-5 overflow-y-auto bg-card p-5 sm:max-w-md! sm:p-8">
        {/* Close button (X) */}
        <AlertDialogCancel
          aria-label="Close"
          className="absolute right-3 top-3 size-10 rounded-full border-0 bg-transparent p-0 shadow-none hover:bg-section"
        >
          <X className="size-5" aria-hidden="true" />
        </AlertDialogCancel>

        {/* Logo. Replace this box with your real logo if you have one */}
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Pizza className="size-5" aria-hidden="true" />
        </div>

        <AlertDialogTitle className="pr-10 font-heading text-3xl text-foreground">
          Secure demo checkout
        </AlertDialogTitle>

        {/* Info box: this is only a demo */}
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-pill-success text-success">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>

          <div className="min-w-0 flex-1">
            <p className="font-bold text-foreground">Demo payment</p>
            <p className="text-xs text-text-muted">No real card or money is used</p>
          </div>

          <span className="shrink-0 rounded-full bg-pill-warning px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-warning">
            Test mode
          </span>
        </div>

        {/* The item: picture, name, category and delivery date, price */}
        <div className="flex items-center gap-3 border-b border-border pb-5">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-section">
            {imageUrl ? (
              <Image src={imageUrl} alt={itemName} fill sizes="56px" className="object-cover" />
            ) : (
              // Shown only when the item has no image
              <div className="flex h-full items-center justify-center text-text-muted">
                <Pizza className="size-5" aria-hidden="true" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="wrap-break-word font-bold text-foreground">{itemName}</p>
            <p className="wrap-break-word text-xs text-text-muted">{detailsText}</p>
          </div>

          <p className="shrink-0 font-bold text-foreground">{priceText}</p>
        </div>

        {/* The fake card (only a picture) */}
        <div className="flex min-h-40 flex-col justify-between rounded-2xl bg-linear-to-br from-demo-card-from to-demo-card-to p-5 text-demo-card-foreground shadow-xl">
          <p className="text-[10px] font-semibold uppercase tracking-widest opacity-70">Demo card</p>

          <p className="text-lg font-bold tracking-widest sm:text-xl">
            •••• •••• •••• {demoCard.lastFour}
          </p>

          <div className="flex items-center justify-between text-xs font-bold opacity-80">
            <span>{demoCard.brand}</span>
            <span>{demoCard.expiry}</span>
          </div>
        </div>

        {/* AlertDialog needs a description. We use the small note for it */}
        <AlertDialogDescription className="text-xs text-text-muted">
          This checkout is for demonstration only. No payment is processed and no card details are
          collected.
        </AlertDialogDescription>

        {/* FUNCTIONALITY: connect the payment here (send the order, close this pop-up and show a toast) */}
        <button
          type="button"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Pay {priceText}
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>

        {/* Goes back to the order form (the parent closes this pop-up and opens the order pop-up) */}
        <button
          type="button"
          onClick={onBack}
          className="mx-auto px-2 py-1 text-sm font-medium text-text-secondary transition-colors hover:text-foreground"
        >
          Back to order details
        </button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CheckoutDialog;