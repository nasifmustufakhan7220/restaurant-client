"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function MenuFilters({ currentParams }: { currentParams: string }) {
  const router = useRouter();
  const inputStyle =
    "w-full rounded-full border border-orange-200 bg-white px-5 py-3 text-sm text-gray-700 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100";
    const current = new URLSearchParams(currentParams);



    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries()) as Record<string, string>;
      const search = data.searchField;

      const params = new URLSearchParams();
      params.set("search", search as string);

      router.push(`/browse?${params.toString()}`);

    }

    const handelCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const category = e.target.value;
      const params = new URLSearchParams();
      params.set("category", category);
      router.push(`/browse?${params.toString()}`);
    }

    const handelLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const location = e.target.value;
      const params = new URLSearchParams();
      params.set("location", location);
      router.push(`/browse?${params.toString()}`);
    }

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mb-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <form onSubmit={handelSubmit} className="relative sm:col-span-2">
          <span className="absolute left-4 top-1/2 -translate-y-1/2">🔍</span>

          {/* pr-28: ডানে বাটনের জন্য জায়গা ফাঁকা রাখা হয়েছে */}
          <input
            type="text"
            name="searchField"
            placeholder="Search by name..."
            className={`${inputStyle} pl-11 pr-28`}
          />

          {/* বাটন ইনপুটের ভেতরে ডানদিকে বসবে */}
          <Button
            type="submit"
            className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 rounded-full bg-red-600 px-4 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition-all duration-300 hover:bg-red-700 active:scale-[0.97] sm:px-5"
          >
            Search
          </Button>
        </form>
        <select onChange={handelCategory} className={inputStyle} value={current.get("category") || ""}>
          <option value="">All Categories</option>
          <option value="Classic Pizzas">Classic Pizzas</option>
          <option value="Vegetarian Pizzas">Vegetarian Pizzas</option>
          <option value="Meat Lovers">Meat Lovers</option>
          <option value="Specialty / Gourmet Pizzas">Specialty / Gourmet Pizzas</option>
          <option value="Sides & Appetizers">Sides & Appetizers</option>
          <option value="Beverages & Desserts">Beverages & Desserts</option>
        </select>

        {/* Location */}
        <select onChange={handelLocation} className={inputStyle} value={current.get("location") || ""}>
          <option value="">All Locations</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chattogram">Chattogram</option>
          <option value="Sylhet">Sylhet</option>
        </select>
      </div>
    </div>
  );
}