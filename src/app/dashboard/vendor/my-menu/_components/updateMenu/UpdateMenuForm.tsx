"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MenuItemData, updateMenuPost } from "@/lib/actions/menu";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
// import { useRouter } from "next/navigation";
import CardShell from "../../../add-menu/_components/CardShell";
import FormField from "../../../add-menu/_components/FormField";
import {
  inputClasses,
  textareaClasses,
} from "../../../add-menu/_components/fieldStyles";
import { menuCategories } from "../menuItemsData";
import ImageUploadBox from "../../../add-menu/_components/ImageUploadBox";
import { getMenuDetails } from "@/lib/api/menu";
import { Button } from "@/components/ui/button";

const UpdateMenuForm = ({ id }: { id: string }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { data: session } = useSession();
//   const router = useRouter();
  const [defaultData, setDefaultData] = useState<MenuItemData | null>(null);

  useEffect(() => {
    const fetchMenuDetails = async () => {
      const result = await getMenuDetails(id);
      setDefaultData(result);
      setImageUrls(result.images || []);
    };
    fetchMenuDetails();
  }, [id]);

  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const objectData = Object.fromEntries(formData.entries());
    if (
      !objectData.itemName ||
      !objectData.category ||
      !objectData.description ||
      !objectData.price ||
      !objectData.location
    ) {
      toast.add({
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (imageUrls.length === 0) {
      toast.add({
        title: "Error",
        description: "Please upload at least one image.",
      });
      return;
    }

    const data: MenuItemData = {
      itemName: objectData.itemName as string,
      category: objectData.category as string,
      description: objectData.description as string,
      price: objectData.price as string,
      location: objectData.location as string,
      images: imageUrls,
      status: "Pending",
      vendorId: session?.user?.id as string,
      vendorEmail: session?.user?.email as string,
      isAvailable: false,
      createdDate: new Date().toISOString(),
    };
    const result = await updateMenuPost(id, data);
    console.log("Updated menu item:", result);
  };

  if (!defaultData) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-lg font-semibold text-foreground">Loading...</p>
      </div>
    );
  }
  return (
    <CardShell className="min-w-0 mt-6">
      <form onSubmit={handelSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <FormField label="Item Name" htmlFor="itemName" required>
            <Input
              id="itemName"
              name="itemName"
              defaultValue={defaultData.itemName}
              type="text"
              placeholder="e.g. Margherita Classic"
              className={inputClasses}
            />
          </FormField>

          <FormField label="Category" htmlFor="category" required>
            <Select name="category" defaultValue={defaultData.category}>
              <SelectTrigger
                id="category"
                className={cn(
                  inputClasses,
                  "flex items-center justify-between data-[size=default]:h-11",
                )}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent>
                {menuCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <div className="mt-4 sm:mt-5">
          <FormField label="Description" htmlFor="description" required>
            <textarea
              id="description"
              name="description"
              defaultValue={defaultData.description as string}
              placeholder="Describe the ingredients and taste"
              className={textareaClasses}
            />
          </FormField>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5">
          <FormField
            label="Price ($)"
            htmlFor="price"
            required
            hint="Must be greater than 0."
          >
            <Input
              id="price"
              name="price"
              type="number"
              min={0}
              step={0.01}
              placeholder="12.99"
              className={inputClasses}
              defaultValue={defaultData.price}
            />
          </FormField>

          <FormField label="Location (area / city)" htmlFor="location" required>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. Dhanmondi, Dhaka"
              defaultValue={defaultData.location}
              className={inputClasses}
            />
          </FormField>
        </div>

        <div className="mt-4 sm:mt-5">
          <FormField label="Item Images" htmlFor="images" required>
            <ImageUploadBox onImagesChange={setImageUrls} defaultImages={defaultData.images || []} />
          </FormField>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button
          type="reset"
          variant="ghost"
          className="h-11 w-full rounded-full border border-border bg-transparent text-foreground sm:w-auto"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="h-11 w-full rounded-full px-5 font-semibold sm:w-auto"
        >
          Submit for Approval
        </Button>
      </div>
      </form>
    </CardShell>
  );
};

export default UpdateMenuForm;
