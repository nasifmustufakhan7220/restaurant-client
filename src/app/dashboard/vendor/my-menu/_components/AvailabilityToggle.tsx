"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// Visual only for now: the owner connects the real availability update later.
type AvailabilityToggleProps = {
  initialValue: boolean;
  itemName: string;
};

export default function AvailabilityToggle({
  initialValue,
  itemName,
}: AvailabilityToggleProps) {
  const [isAvailable, setIsAvailable] = useState(initialValue);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isAvailable}
      aria-label={`Toggle availability for ${itemName}`}
      onClick={() => setIsAvailable(!isAvailable)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors",
        isAvailable ? "bg-success" : "bg-border",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-5 rounded-full bg-primary-foreground shadow-sm transition-all",
          isAvailable ? "left-5.5" : "left-0.5",
        )}
      />
    </button>
  );
}
