// Search box + role filter + status filter (design only, nothing is connected yet).

const fieldStyles =
  "min-h-11 w-full rounded-xl border border-border bg-section px-3.5 text-base text-foreground outline-none placeholder:text-text-muted focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-ring/30 md:text-sm";

const UsersToolbar = () => {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[2fr_1fr_1fr]">
      {/* FUNCTIONALITY: connect search by name or email here */}
      <input
        type="search"
        id="search"
        name="search"
        aria-label="Search users"
        placeholder="Search by name or email"
        className={fieldStyles}
      />

      {/* FUNCTIONALITY: connect role filter here */}
      <select id="role" name="role" aria-label="Filter by role" defaultValue="" className={fieldStyles}>
        <option value="">All roles</option>
        <option value="vendor">Vendors</option>
        <option value="customer">Customers</option>
      </select>

      {/* FUNCTIONALITY: connect status filter here */}
      <select id="status" name="status" aria-label="Filter by status" defaultValue="" className={fieldStyles}>
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>
    </div>
  );
};

export default UsersToolbar;