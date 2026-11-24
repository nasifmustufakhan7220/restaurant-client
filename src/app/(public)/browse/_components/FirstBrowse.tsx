import React from "react";
import { connection } from "next/server";
import MenuFilters from "./MenuFilters";
import EmptyState from "./EmptyState";
import FadeIn from "@/components/Home/FadeIn";
import MenuCard from "@/components/Home/MenuCard";
import { getAllActiveMenuItems } from "@/lib/api/browse";
import type { MenuItemData } from "@/lib/types/menu-item";
import { MenuItem } from "@/lib/types/home";

const FirstBrowse = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  await connection();
  const search = await searchParams;
  const urlSearch = new URLSearchParams(
    search as Record<string, string>,
  ).toString();
  const result: MenuItemData[] = await getAllActiveMenuItems(urlSearch);
  const items = result.filter(
    (item) => item.status === "Approved" && item.isAvailable === true,
  );
  return (
    <div>
      {/* সার্চ ও ফিল্টার */}

      <MenuFilters currentParams={urlSearch} />
      <h1 className="text-2xl font-bold mb-6"> {items.length} Items Found</h1>

        {items.length === 0 ? (
          <EmptyState
            icon="🍕"
            title="No items found"
            text="We could not find any pizza matching your search. Try changing the filters."
            buttonText="Clear Filters"
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
            <FadeIn key={item._id} delay={(index % 3) * 0.1}>
              <MenuCard item={item as MenuItem} priority={index < 3} />
            </FadeIn>
          ))}
          </div>
        )}
    </div>
  );
};

export default FirstBrowse;
