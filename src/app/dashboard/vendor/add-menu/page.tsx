import AddMenuItemForm from "./_components/AddMenuItemForm";
import MenuItemPreviewCard from "./_components/MenuItemPreviewCard";
import PlanUsageCard from "./_components/PlanUsageCard";

const AddMenuPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 lg:gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Add Menu Item</h1>
        <p className="mt-1 text-sm text-text-muted">
          Fill in the details below. Your item will be reviewed by an admin before it
          appears on the menu.
        </p>
      </div>

      <PlanUsageCard />

      {/* Stack on mobile and tablet. From `lg`, the form gets 3 parts and the preview 2. */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-6">
        <AddMenuItemForm />
        <MenuItemPreviewCard />
      </div>
    </div>
  );
};

export default AddMenuPage;
