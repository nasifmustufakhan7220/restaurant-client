import FadeIn from "./FadeIn";
import CategoryCard from "./CategoryCard";
import SectionTitle from "./SectionTitle";
import { Category } from "@/lib/types/home";


// ৬টা category (রিকোয়ারমেন্ট অনুযায়ী)
const categories: Category[] = [
  { name: "Classic Pizzas", icon: "🍕", description: "Timeless favorites" },
  { name: "Vegetarian Pizzas", icon: "🥦", description: "Fresh & veggie loaded" },
  { name: "Meat Lovers", icon: "🥓", description: "Packed with meat" },
  { name: "Specialty / Gourmet Pizzas", icon: "👨‍🍳", description: "Chef special creations" },
  { name: "Sides & Appetizers", icon: "🍟", description: "Perfect starters" },
  { name: "Beverages & Desserts", icon: "🥤", description: "Sweet finish & drinks" },
];

export default function Categories() {
  return (
    <section className="bg-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Explore Pizza Categories"
          subtitle="Find exactly what you are craving"
        />

        {/* মোবাইলে ২টা, ট্যাবলেটে ৩টা, ডেস্কটপে ৬টা */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            // 🎬 MOTION ANIMATION: stagger delay
            <FadeIn key={cat.name} delay={index * 0.08}>
              <CategoryCard category={cat} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}