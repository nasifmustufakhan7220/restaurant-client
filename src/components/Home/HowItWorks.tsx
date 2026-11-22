import FadeIn from "./FadeIn";
import SectionTitle from "./SectionTitle";

interface Step {
  number: number;
  icon: string;
  title: string;
  text: string;
}

const steps: Step[] = [
  { number: 1, icon: "🔍", title: "Browse Menu", text: "Explore pizzas from local vendors." },
  { number: 2, icon: "🛒", title: "Choose & Order", text: "Pick your favorite and place the order." },
  { number: 3, icon: "👨‍🍳", title: "We Prepare", text: "Your pizza is freshly made and baked." },
  { number: 4, icon: "🛵", title: "Enjoy!", text: "Delivered hot right to your door." },
];

export default function HowItWorks() {
  return (
    <section className="bg-orange-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="How PizzaHub Works"
          subtitle="Getting your pizza is as easy as 1-2-3-4"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            // 🎬 MOTION ANIMATION
            <FadeIn key={step.number} delay={index * 0.1}>
              <div className="relative bg-white rounded-2xl p-6 text-center shadow-md h-full">
                {/* ধাপের নম্বর */}
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </span>
                <div className="text-5xl mt-3">{step.icon}</div>
                <h3 className="mt-4 text-lg font-bold text-gray-800">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{step.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}