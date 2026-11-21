import Banner from "@/components/Banner/Banner";
import Navbar from "@/components/Navbar/Navbar";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="h-16" />}>
        <Navbar />
      </Suspense>
      <Banner />
    </main>
  );
}
