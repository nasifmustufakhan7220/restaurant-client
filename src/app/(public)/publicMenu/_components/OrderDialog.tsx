"use client";

import Image from "next/image";
import { ArrowRight, Pizza, X } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


import OrderFormFields from "./OrderFormFields";
import OrderItemSummary from "./OrderItemSummary";
import { formatPrice } from "@/app/dashboard/admin/_components/menu/menu-items-data";
import type { MenuItem } from "@/lib/types/menu-item";

// A pop-up with the item and the order form. Needs: item.
// The "Order Now" button opens it. "use client" is needed because of the form submit handler.


type OrderDialogProps = MenuItem;
const OrderDialog = ({ item }: { item: OrderDialogProps }) => {
  const imageUrl = item.images![0]; // Type fix only: no runtime change

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Stop the browser from reloading the page
    event.preventDefault();

    // Reads every input by its "name":
    // { itemId, deliveryDate, deliveryAddress, message }
    const orderData = Object.fromEntries(new FormData(event.currentTarget));

    // FUNCTIONALITY: send orderData to the server here (then close the dialog and show a toast)
    console.log(orderData); // Temporary: shows the values. Remove it later.
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90">
        Order Now
      </AlertDialogTrigger>

      {/* max-h + overflow-y-auto: on a small phone the dialog scrolls instead of getting cut off */}
      <AlertDialogContent className="max-h-[92vh] w-[calc(100%-2rem)] max-w-4xl overflow-y-auto bg-card p-5 sm:max-w-4xl sm:p-8">
        <AlertDialogCancel
          aria-label="Close"
          className="absolute right-3 top-3 size-10 rounded-full border-0 bg-transparent p-0 shadow-none hover:bg-section"
        >
          <X className="size-5" aria-hidden="true" />
        </AlertDialogCancel>

        <AlertDialogTitle className="pr-10 font-heading text-3xl text-foreground">
          Your next favorite
        </AlertDialogTitle>

        {/* Mobile: one column (image on top). From "md": image on the left, form on the right */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative h-64 overflow-hidden rounded-2xl bg-section md:h-auto md:min-h-115">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={item.itemName as string} // Type fix only: no runtime change
                fill
                sizes="(min-width: 768px) 400px, 100vw"
                className="object-cover"
              />
            ) : (
              // Shown only when the item has no image
              <div className="flex h-full items-center justify-center text-text-muted">
                <Pizza className="size-14" aria-hidden="true" />
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid content-start gap-5">
            <OrderItemSummary item={item} />
            <OrderFormFields itemId={item._id as string} />

            {/* A normal submit button. Do not use AlertDialogAction here: it closes the dialog at once */}
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Place order · {formatPrice(Number(item.price))}
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>

            <p className="text-xs text-text-muted">
              No payment is needed now. The vendor will review your order.
            </p>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderDialog;