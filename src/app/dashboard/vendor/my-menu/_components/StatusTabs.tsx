"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// The counts match the dummy items in menuItemsData.ts.
const statusTabs = [
  { label: "All", count: 6 },
  { label: "Approved", count: 3 },
  { label: "Pending", count: 1 },
  { label: "Rejected", count: 1 },
  { label: "Inactive", count: 1 },
];

// The status filter pills. Only the active look is state; there is no filtering yet.
export default function StatusTabs() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    // overflow-x-auto keeps the pills on one line on phones instead of wrapping badly.
    <div className="flex gap-2 overflow-x-auto pb-1">
      {statusTabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          onClick={() => setActiveTab(tab.label)}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors",
            activeTab === tab.label
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-foreground hover:bg-accent",
          )}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
}
