
import Navbar from "@/components/Navbar/Navbar";
import { Suspense } from "react";

import Banner from "@/components/Home/Banner";
import Categories from "@/components/Home/Categories";
import FeaturedItems from "@/components/Home/FeaturedItems";
import HowItWorks from "@/components/Home/HowItWorks";
import WhyChoose from "@/components/Home/WhyChoose";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="h-16" />}>
        <Navbar />
      </Suspense>
      <Banner />
      <FeaturedItems /> 
      <Categories /> 
      <WhyChoose /> 
      <HowItWorks />
    </main>
  );
}
