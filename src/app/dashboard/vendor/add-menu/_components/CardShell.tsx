import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Shared card box used by the plan, form and preview sections.
type CardShellProps = {
  children: ReactNode;
  className?: string;
};

export default function CardShell({ children, className }: CardShellProps) {
  return (
    <section className={cn("rounded-2xl border border-border bg-card p-4 sm:p-5", className)}>
      {children}
    </section>
  );
}
