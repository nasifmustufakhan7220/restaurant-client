import Navbar from "@/components/Navbar/Navbar";
import { Suspense } from "react";

import Banner from "@/components/Home/Banner";
import Categories from "@/components/Home/Categories";
import FeaturedItems from "@/components/Home/FeaturedItems";
import HowItWorks from "@/components/Home/HowItWorks";
import WhyChoose from "@/components/Home/WhyChoose";
import MenuCardSkeleton from "./(public)/browse/_components/MenuCardSkeleton";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="h-16" />}>
        <Navbar />
      </Suspense>
      <Banner />
      <Suspense
        fallback={
          <div className="mt-8 mb-8 max-w-300 mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <MenuCardSkeleton key={n} />
            ))}
          </div>
        }
      >
        <FeaturedItems />
      </Suspense>
      <Categories />
      <WhyChoose />
      <HowItWorks />
    </main>
  );
}
