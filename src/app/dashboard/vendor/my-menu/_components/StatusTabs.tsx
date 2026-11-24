"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MenuItemData } from "@/lib/types/menu-item";

// The counts match the dummy items in menuItemsData.ts.

// The status filter pills. Only the active look is state; there is no filtering yet.
export default function StatusTabs({result}:{result:MenuItemData[]}) {
  const [activeTab, setActiveTab] = useState("All");
  const statusTabs = [
    { label: "All", count: 6 },
    { label: "Approved", count: result.filter(item=>item.status==="Approved").length },
    { label: "Pending", count: result.filter(item=>item.status==="Pending").length },
    { label: "Rejected", count: result.filter(item=>item.status==="Rejected").length },
  ];

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
