import { MenuItem } from "@/lib/types/home";
import FadeIn from "./FadeIn";
import MenuCard from "./MenuCard";
import SectionTitle from "./SectionTitle";

// ⚠️ শুধু নমুনা ডেটা (UI দেখার জন্য)।
// এখানে তুমি database থেকে আনা আসল ডেটা বসাবে
// (শুধু approved ও active item, কমপক্ষে ৬টা)
const sampleItems: MenuItem[] = [
  {
    _id: "1",
    name: "Margherita",
    category: "Classic Pizzas",
    price: 9.99,
    location: "Dhanmondi, Dhaka",
    vendor: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600",
  },
  {
    _id: "2",
    name: "Veggie Delight",
    category: "Vegetarian Pizzas",
    price: 10.99,
    location: "Gulshan, Dhaka",
    vendor: "Green Slice",
    image: "https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=600",
  },
  {
    _id: "3",
    name: "Pepperoni Feast",
    category: "Meat Lovers",
    price: 12.99,
    location: "Banani, Dhaka",
    vendor: "Meat Master",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600",
  },
  {
    _id: "4",
    name: "Truffle Special",
    category: "Specialty / Gourmet Pizzas",
    price: 15.99,
    location: "Uttara, Dhaka",
    vendor: "Gourmet Hub",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600",
  },
  {
    _id: "5",
    name: "Garlic Bread",
    category: "Sides & Appetizers",
    price: 4.99,
    location: "Mirpur, Dhaka",
    vendor: "Slice House",
    image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=600",
  },
  {
    _id: "6",
    name: "Choco Lava Cake",
    category: "Beverages & Desserts",
    price: 5.99,
    location: "Mohakhali, Dhaka",
    vendor: "Sweet Corner",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600",
  },
];

export default function FeaturedItems() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <SectionTitle
        title="Featured Menu Items"
        subtitle="Our most loved pizzas and treats from trusted vendors"
      />

      {/* মোবাইলে ১টা, ট্যাবলেটে ২টা, ডেস্কটপে ৩টা */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleItems.map((item, index) => (
          <FadeIn key={item._id} delay={(index % 3) * 0.1}>
            {/* 🖼️ প্রথম ৩টা card-এর ছবি আগে লোড হবে */}
            <MenuCard item={item} priority={index < 3} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
