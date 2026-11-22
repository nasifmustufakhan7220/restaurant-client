import Link from "next/link";

interface EmptyStateProps {
  icon?: string;
  title: string;
  text: string;
  buttonText?: string;
  buttonHref?: string;
}

// কোনো আইটেম না পাওয়া গেলে এটা দেখাবে
export default function EmptyState({
  icon = "🍕",
  title,
  text,
  buttonText,
  buttonHref = "/menu",
}: EmptyStateProps) {
  return (
    <div className="bg-white border border-orange-100 rounded-2xl shadow-sm py-16 px-6 text-center">
      <div className="text-6xl">{icon}</div>
      <h3 className="mt-4 text-xl font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-500 max-w-md mx-auto">{text}</p>

      {/* বাটন ঐচ্ছিক */}
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