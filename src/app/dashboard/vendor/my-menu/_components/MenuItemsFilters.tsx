import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { menuCategories } from "./menuItemsData";

// Search box and category filter. Visual only; the owner wires the real logic later.
export default function MenuItemsFilters() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Input
        type="text"
        placeholder="Search by item name"
        className="h-11 w-full min-w-0 rounded-xl border-border bg-card px-3.5 text-base md:text-sm"
      />

      <Select defaultValue="All categories">
        <SelectTrigger
          className="h-11 w-full rounded-xl border-primary bg-card px-3.5 text-base data-[size=default]:h-11 md:text-sm sm:w-64 lg:w-80"
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="All categories">All categories</SelectItem>
          {menuCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
