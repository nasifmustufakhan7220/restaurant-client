import { cn } from "@/lib/utils";

// A small rounded label (pill). Needs: tone (the color style) and children (the text).
type BadgeTone = "vendor" | "customer" | "admin" | "premium" | "free" | "active" | "blocked";

// One place to change every badge color
const toneStyles: Record<BadgeTone, string> = {
  vendor: "bg-accent text-accent-foreground",
  customer: "bg-section text-text-secondary",
  admin: "bg-section text-text-secondary",
  premium: "bg-pill-warning text-warning",
  free: "bg-section text-text-secondary",
  active: "bg-pill-success text-success",
  blocked: "bg-pill-danger text-destructive",
};

type UserBadgeProps = {
  tone: BadgeTone;
  children: React.ReactNode;
};

const UserBadge = ({ tone, children }: UserBadgeProps) => {
  return (
    <span
      className={cn(
        // "capitalize" turns "vendor" into "Vendor", so we can pass the raw value
        "inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold capitalize",
        toneStyles[tone],
      )}
    >
      {children}
    </span>
  );
};

export default UserBadge;