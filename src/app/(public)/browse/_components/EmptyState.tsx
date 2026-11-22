import Link from "next/link";

// Shown when there is nothing to list (no items, no orders...).
// Needs: title and text. Optional: icon (an element or an emoji), buttonText, buttonHref.

interface EmptyStateProps {
  icon?: React.ReactNode; // an icon element like <ShoppingBag />, or an emoji like "🍕"
  title: string;
  text: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function EmptyState({
  icon = "🍕", // used when no icon is given
  title,
  text,
  buttonText,
  buttonHref = "/menu",
}: EmptyStateProps) {
  return (
    <div className="bg-white border border-orange-100 rounded-2xl shadow-sm py-16 px-6 text-center">
      {/* flex + justify-center: centers an icon element, and text-6xl sizes an emoji */}
      <div className="flex justify-center text-6xl">{icon}</div>
      <h3 className="mt-4 text-xl font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-500 max-w-md mx-auto">{text}</p>

      {/* The button is optional */}
      {buttonText && (
        <Link
          href={buttonHref}
          className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}