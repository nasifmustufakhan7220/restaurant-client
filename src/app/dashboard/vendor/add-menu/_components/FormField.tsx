import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

// One form label (with an optional red star), its field, and an optional hint.
type FormFieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
};

export default function FormField({
  label,
  htmlFor,
  required = false,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="min-w-0">
      <Label
        htmlFor={htmlFor}
        className="mb-2 flex gap-1 text-sm font-semibold text-foreground"
      >
        {label}
        {required ? <span className="text-primary">*</span> : null}
      </Label>

      {children}

      {hint ? <p className="mt-1.5 text-xs text-text-muted">{hint}</p> : null}
    </div>
  );
}
