// একটা category card-এর ডেটা
export interface Category {
  name: string;
  icon: string;
  description: string;
}

// Re-export MenuItem so files that import it from here still work.
export type { MenuItem } from "@/lib/types/menu-item";
