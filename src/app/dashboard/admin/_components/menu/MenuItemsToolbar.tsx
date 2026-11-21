import { menuCategories } from "./menu-items-data";

// Search box + category filter + status filter (design only, nothing is connected yet).
// Text is 16px on mobile so phones do not zoom in when you tap a field.

const fieldStyles =
  "min-h-11 w-full rounded-xl border border-border bg-section px-3.5 text-base text-foreground outline-none placeholder:text-text-muted focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-ring/30 md:text-sm";

const MenuItemsToolbar = () => {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[2fr_1fr_1fr]">
      {/* FUNCTIONALITY: connect search by item or vendor name here */}
      <input
        type="search"
        id="search"
        name="search"
        aria-label="Search menu items"
        placeholder="Search by item or vendor name"
        className={fieldStyles}
      />

      {/* FUNCTIONALITY: connect category filter here */}
      <select id="category" name="category" aria-label="Filter by category" defaultValue="" className={fieldStyles}>
        <option value="">All categories</option>
        {menuCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* FUNCTIONALITY: connect status filter here */}
      <select id="status" name="status" aria-label="Filter by status" defaultValue="" className={fieldStyles}>
        <option value="">All statuses</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default MenuItemsToolbar;