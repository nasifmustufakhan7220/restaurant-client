"use client";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/lib/types/order";
import { updateCustomerOrderStatus } from "@/lib/actions/menu";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

// Local status type includes Cancelled, which is not in the shared OrderStatus.
type VendorOrderStatus = OrderStatus | "Cancelled";

type VendorOrderActionsProps = {
  orderStatus: VendorOrderStatus;
  id: string;
};

const Buttons = {
  Accepted : "Accepted",
  Rejected : "Rejected"
}

const btns = ["Accepted", "Rejected"];

const VendorOrderActions = ({
  orderStatus,
  id,
}: VendorOrderActionsProps) => {
  const router = useRouter();
  // Only pending orders can be accepted or rejected, and only once.
  if (orderStatus !== "Pending") {
    return <span className="text-sm text-text-muted">No actions</span>;
  }

  const handelOrders = async (btn: string) => {
    const result = await updateCustomerOrderStatus(id, btn as "Accepted" | "Rejected");

    if(result.matchedCount> 0){
      router.refresh();
      toast.add({
        title: "Order status updated",
        description: `Order has been ${btn.toLowerCase()}.`,
        type: "success",
      });
    }else{
      toast.add({
        title: "Failed to update order status",
        description: `Could not update order status to ${btn.toLowerCase()}.`,
        type: "error",
      });
      return;
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      {/* FUNCTIONALITY: connect accept here */}


      {btns.map(btn=>(<button key={btn}
        type="button"
        onClick={()=>handelOrders(btn)}
        className={cn(
          `inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full border ${Buttons[btn as keyof typeof Buttons] === "Accepted" ? "border-success text-success hover:bg-pill-success" : "border-destructive text-destructive hover:bg-pill-danger"}  px-4 text-sm font-bold flex-1 lg:flex-none`,
        )}
      > 
        {Buttons[btn as keyof typeof Buttons] === "Accepted" ? <Check className="size-4" aria-hidden="true" /> : <X className="size-4" aria-hidden="true" />}
        {Buttons[btn as keyof typeof Buttons]}
      </button> ))}
    </div>
  );
};

export default VendorOrderActions;
