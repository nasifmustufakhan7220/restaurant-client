import FadeIn from "./FadeIn";
import SectionTitle from "./SectionTitle";

// এই section-এর ডেটার type
interface Feature {
  icon: string;
  title: string;
  text: string;
}

const features: Feature[] = [
  { icon: "🚀", title: "Fast Delivery", text: "Hot pizza at your door in 30 minutes or less." },
  { icon: "🥬", title: "Fresh Ingredients", text: "Only the freshest, highest quality ingredients." },
  { icon: "✅", title: "Trusted Vendors", text: "Every vendor and item is verified and approved." },
  { icon: "💰", title: "Best Prices", text: "Great taste at prices that fit your budget." },
];

export default function WhyChoose() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <SectionTitle
        title="Why Choose PizzaHub?"
        subtitle="Here is what makes us different from the rest"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, index) => (
          // 🎬 MOTION ANIMATION
          <FadeIn key={f.title} delay={index * 0.1}>
            <div className="bg-white border border-orange-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition h-full">
              <div className="text-5xl">{f.icon}</div>
              <h3 className="mt-4 text-lg font-bold text-gray-800">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{f.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}