import SectionTitle from "@/components/Home/SectionTitle";

import MenuCardSkeleton from "./_components/MenuCardSkeleton";
import { Suspense } from "react";
import FirstBrowse from "./_components/FirstBrowse";



// ডেমো ডেটা (পরে API থেকে আসবে)

export default function BrowseMenuPage() {


  return (
    <main className="mt-20 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Browse Our Menu"
          subtitle="Discover pizzas and treats from trusted vendors"
        />

        <Suspense fallback={<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <MenuCardSkeleton key={n} />
            ))}
          </div>}>
          <FirstBrowse/>
        </Suspense>

       
      </div>
    </main>
  );
}