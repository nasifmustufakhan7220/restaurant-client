"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowRight, Pizza, X, Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import OrderFormFields from "./OrderFormFields";
import OrderItemSummary from "./OrderItemSummary";

import type { MenuItem } from "@/lib/types/menu-item";

import { formatPrice } from "@/app/dashboard/admin/_components/menu/menu-items-data";

import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/customer";
import { OrderFormData } from "@/lib/types/order";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";

// Order Dialog Component
type OrderDialogProps = MenuItem;

const OrderDialog = ({ item }: { item: OrderDialogProps }) => {
  const {data:session} = useSession(); // Get session data if needed
  // Main Dialog state
  const [open, setOpen] = useState(false);

  // Confirmation Dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Form reference
  const formRef = useRef<HTMLFormElement>(null);

  const imageUrl = item.images?.[0];

  // Open confirmation dialog after form validation
  const handleOpenConfirmation = () => {
    if (!formRef.current?.reportValidity()) {
      return;
    }

    if(!session?.user){
      setOpen(false);
      return toast.add({
        title: "Not Logged In",
        description: "You must be logged in to place an order.",
        type: "error",
      });
    }
    setConfirmOpen(true);
  };

  // Submit order
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Get all form values
      const orderData = Object.fromEntries(new FormData(event.currentTarget));

      const orders: OrderFormData = {
        itemName: item.itemName as string,
        vendorName: item.vendorName as string,
        vendorEmail: item.vendorEmail as string,
        orderStatus: "Pending",
        vendorId: item.vendorId as string,
        category: item.category,
        images: item.images,
        customerId: session?.user?.id,
        customerName: session?.user?.name,
        customerEmail: session?.user?.email,
        createdAt: new Date().toISOString(),
        deliveryAddress: orderData.deliveryAddress as string,
        deliveryDate: orderData.deliveryDate as string,
        itemId: item._id as string,
        message: orderData.message as string,
      };


      // Send order data to backend
      const result = await createOrder(orders);

      // Close both dialogs after successful order
      setConfirmOpen(false);
      setOpen(false);

      if(result.insertedId){
        toast.add({
          title: "Order Placed",
          description: "Your order has been placed successfully.",
          type: "success",
        });
      }else{
        toast.add({
          title: "Order Failed",
          description: "There was an issue placing your order. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Order submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {/* Main Dialog Trigger */}
      <AlertDialogTrigger className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90">
        Order Now
      </AlertDialogTrigger>

      {/* Main Order Dialog */}
      <AlertDialogContent className="max-h-[92vh] w-[calc(100%-1.5rem)] max-w-none! overflow-y-auto bg-card p-4 sm:w-[calc(100%-3rem)] sm:max-w-4xl! sm:p-8">
        {/* Close Button */}
        <AlertDialogCancel
          aria-label="Close"
          className="absolute right-3 top-3 z-10 size-10 rounded-full border-0 bg-transparent p-0 shadow-none hover:bg-section"
        >
          <X className="size-5" aria-hidden="true" />
        </AlertDialogCancel>

        <AlertDialogTitle className="pr-10 font-heading text-3xl text-foreground">
          Your next favorite
        </AlertDialogTitle>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Item Image */}
          <div className="relative h-52 overflow-hidden rounded-2xl bg-section sm:h-64 md:h-auto md:min-h-115">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={item.itemName as string}
                fill
                sizes="(min-width: 768px) 400px, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-text-muted">
                <Pizza className="size-14" aria-hidden="true" />
              </div>
            )}
          </div>

          {/* Order Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid content-start gap-5"
          >
            <OrderItemSummary item={item} />

            <OrderFormFields itemId={item._id as string} />

            {/* First Place Order Button */}
            <Button
              type="button"
              onClick={handleOpenConfirmation}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-base font-bold text-primary-foreground transition-all hover:opacity-90"
            >
              Place Order
              <ArrowRight className="size-5" aria-hidden="true" />
              {formatPrice(Number(item.price))}
            </Button>

            <p className="text-xs text-text-muted">
              No payment is needed now. The vendor will review your order.
            </p>
          </form>
        </div>
      </AlertDialogContent>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={confirmOpen}
        onOpenChange={(value) => {
          if (!loading) {
            setConfirmOpen(value);
          }
        }}
      >
        <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8">
          <AlertDialogHeader className="gap-3 text-left">
            {/* Confirmation Icon */}
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Pizza className="size-6" aria-hidden="true" />
            </div>

            <AlertDialogTitle className="font-heading text-2xl font-bold text-foreground">
              Confirm Your Order?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm leading-6 text-text-muted">
              Are you sure you want to place this order for{" "}
              <span className="font-semibold text-foreground">
                {item.itemName}
              </span>
              ? Please confirm to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Confirmation Actions */}
          <AlertDialogFooter className="mt-5 flex-col gap-3 sm:flex-row sm:justify-end">
            {/* Cancel Button */}
            <AlertDialogCancel
              disabled={loading}
              className="min-h-11 w-full rounded-xl border border-border bg-transparent px-5 font-semibold text-foreground transition-colors hover:bg-section sm:w-auto"
            >
              Cancel
            </AlertDialogCancel>

            {/* Final Confirm Button */}
            <AlertDialogAction
              disabled={loading}
              onClick={(event) => {
                event.preventDefault();

                formRef.current?.requestSubmit();
              }}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-bold text-primary-foreground shadow-md transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  Confirm Order
                  <ArrowRight className="size-4" />
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialog>
  );
};

export default OrderDialog;
