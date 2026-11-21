"use client";
import { deleteMenuPost } from "@/lib/actions/menu";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { deleteMenuItem } from "@/lib/actions/admin";




const DeleteBtn = ({ id, deleteMenuOnRole }: { id: string; deleteMenuOnRole: "vendor" | "admin" }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter()
  const handelDelete = async (id: string) => {
      try {
        let result;
        if(deleteMenuOnRole === "vendor"){
           result = await deleteMenuPost(id);
        }else{
          result = await deleteMenuItem(id)
        }
      if(result.deletedCount > 0){
        setOpen(false);
        router.refresh();
        toast.add({
          title: "Menu item deleted",
          description: "The menu item has been successfully deleted.",
          type: "success",
        });
      }else{
       return toast.add({
          title: "Failed to delete menu item",
          description: "The menu item could not be deleted. Please try again.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
  <div className="flex-1">
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button className={`${
        deleteMenuOnRole === "vendor"
          ? "h-auto w-full rounded-none bg-transparent px-4 py-3 text-center text-sm font-semibold text-destructive shadow-none transition-colors hover:bg-destructive/10"
          : "size-9 rounded-full border border-border bg-transparent p-0 text-muted-foreground shadow-none transition-all hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
      }`}>
            {deleteMenuOnRole === "vendor" ? "Delete" : <Trash2 className="size-4" aria-hidden="true" />}
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 size={13} />
          </AlertDialogMedia>

          <AlertDialogTitle>
            Delete this menu item?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to delete this menu item?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handelDelete(id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
);
};

export default DeleteBtn;
