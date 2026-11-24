import { MenuItem } from "@/lib/types/menu-item";
import FadeIn from "./FadeIn";
import MenuCard from "./MenuCard";
import SectionTitle from "./SectionTitle";
import { getSixHomeData } from "@/lib/api/home";
import EmptyState from "@/app/(public)/browse/_components/EmptyState";


export default async function FeaturedItems() {
  const result:MenuItem[] = await getSixHomeData();
  const filteredData = result.filter(item=> item.status === "Approved" && item.isAvailable === true).slice(0, 6);
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <SectionTitle
        title="Featured Menu Items"
        subtitle="Our most loved pizzas and treats from trusted vendors"
      />

      {/* মোবাইলে ১টা, ট্যাবলেটে ২টা, ডেস্কটপে ৩টা */}
      
      <div>
        {filteredData.length === 0 ?<EmptyState
                    icon="🍕"
                    title="No items found"
                    text="We could not find any pizza matching your search. Try changing the filters."
                    buttonText="Clear Filters"
                  /> : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{filteredData.map((item, index) => (
          <FadeIn key={item._id} delay={(index % 3) * 0.1}>
            {/* 🖼️ প্রথম ৩টা card-এর ছবি আগে লোড হবে */}
            <MenuCard item={item} priority={index < 3} />
          </FadeIn>
        ))}</div>}
      </div>
    </section>
  );
}
