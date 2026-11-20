import { cn } from "@/lib/utils";

// One shared look for every text input and the Select trigger.
export const inputClasses = cn(
  "h-11 w-full min-w-0 rounded-xl border border-border bg-section px-3.5 text-base text-foreground",
  "placeholder:text-text-muted outline-none transition-colors dark:bg-section",
  "focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-ring/30",
  "md:text-sm",
);

// The description box is a bit taller and can be resized vertically.
export const textareaClasses = cn(
  "min-h-[110px] w-full min-w-0 resize-y rounded-xl border border-border bg-section px-3.5 py-3",
  "text-base text-foreground placeholder:text-text-muted outline-none transition-colors dark:bg-section",
  "focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-ring/30",
  "md:text-sm",
);
