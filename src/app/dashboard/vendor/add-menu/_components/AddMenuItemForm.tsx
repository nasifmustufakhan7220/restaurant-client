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
import CardShell from "./CardShell";
import FormField from "./FormField";
import FormFooter from "./FormFooter";
import ImageUploadBox from "./ImageUploadBox";
import { inputClasses, textareaClasses } from "./fieldStyles";
import { menuCategories } from "./menuCategories";
import { createMenuPost } from "@/lib/actions/menu";

// The Add Menu Item form. Static UI only; the owner wires the behaviour later.
export default function AddMenuItemForm() {
  const handelSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const objectData = Object.fromEntries(formData.entries());
    console.log("Form submitted:", objectData);

    //     Fields: Item Name, Category, Description, Price, Location (area / city), Item Image (required, must be uploaded as a file using ImgBB)
    // Vendor must be authenticated, and required fields are validated
    // Saved in the menuItems collection with default status Pending until an admin approves

    const result = await createMenuPost({...objectData, status: "Pending"});
    console.log("Menu item created:", result);
  };
  return (
    <CardShell className="min-w-0">
      {/* FUNCTIONALITY: connect form submit here */}
      <form onSubmit={handelSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <FormField label="Item Name" htmlFor="itemName" required>
            <Input
              id="itemName"
              name="itemName"
              type="text"
              placeholder="e.g. Margherita Classic"
              className={inputClasses}
            />
          </FormField>

          <FormField label="Category" htmlFor="category" required>
            <Select name="category">
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
            />
          </FormField>

          <FormField label="Location (area / city)" htmlFor="location" required>
            <Input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. Dhanmondi, Dhaka"
              className={inputClasses}
            />
          </FormField>
        </div>

        <div className="mt-4 sm:mt-5">
          <FormField label="Item Images" htmlFor="images" required>
            <ImageUploadBox />
          </FormField>
        </div>

        <FormFooter />
      </form>
    </CardShell>
  );
}
