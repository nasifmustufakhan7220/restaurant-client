"use client"
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/lib/types/order";
import Link from "next/link";
import { deleteOrder } from "@/lib/actions/customer";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";


const baseButtonStyles =
  "inline-flex min-h-10 flex-1 items-center justify-center rounded-full border px-4 text-sm font-bold transition-colors lg:flex-none";

type OrderActionsProps = {
  status: OrderStatus;
  className?: string;
  id : string;
  orderId: string;
};

const OrderActions = ({ status, className, id, orderId }: OrderActionsProps) => {
  console.log(orderId)
  const router = useRouter();

  const handelCancelOrder = async () => {
    const result = await deleteOrder(orderId);
    if(result.deletedCount === 1){
      router.refresh();
      toast.add({
        title: "Order Cancelled",
        description: "Your order has been cancelled successfully.",
        type: "success",
      });
    }else{
      toast.add({
        title: "Cancellation Failed",
        description: "There was an issue cancelling your order. Please try again.",
        type: "error",
      });
      return;
    }
  }
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {/* FUNCTIONALITY: open the order details here */}
      <Link href={`/publicMenu/${id}`}>
        <button
        type="button"
        className={cn(baseButtonStyles, "border-border text-foreground hover:bg-section")}
      >
        View
      </button>
      
      </Link>

      {/* FUNCTIONALITY: connect cancel order (with a confirm dialog) here */}
      {status === "Pending" && (
        <button
        onClick={handelCancelOrder}
          type="button"
          className={cn(baseButtonStyles, "border-destructive text-destructive hover:bg-pill-danger")}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default OrderActions;