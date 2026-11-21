import { Pizza } from "lucide-react";

// Small square picture box for an item.
// FUNCTIONALITY: show the real first image of the item here

const MenuItemThumb = () => {
  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-accent to-section text-primary">
      <Pizza className="size-6" aria-hidden="true" />
    </div>
  );
};

export default MenuItemThumb;