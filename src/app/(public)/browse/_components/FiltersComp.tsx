import { Button } from "@/components/ui/button";

const FiltersComp = () => {
    const inputStyle =
    "w-full rounded-full border border-orange-200 bg-white px-5 py-3 text-sm text-gray-700 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100";

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mb-10">
      {/* মোবাইলে ১টা, ট্যাবলেটে ২টা, ডেস্কটপে ৪টা */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search (ট্যাবলেটে ২ ঘর, ডেস্কটপেও ২ ঘর নেবে) */}
        <div className="relative sm:col-span-2">
          <span className="absolute left-4 top-1/2 -translate-y-1/2">🔍</span>

          {/* pr-28: ডানে বাটনের জন্য জায়গা ফাঁকা রাখা হয়েছে */}
          <input
            type="text"
            placeholder="Search by name..."
            className={`${inputStyle} pl-11 pr-28`}
          />

          {/* বাটন ইনপুটের ভেতরে ডানদিকে বসবে */}
          <Button
            type="button"
            className="absolute right-1.5 top-1/2 h-9 -translate-y-1/2 rounded-full bg-red-600 px-4 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition-all duration-300 hover:bg-red-700 active:scale-[0.97] sm:px-5"
          >
            Search
          </Button>
        </div>

        {/* Category */}
        <select className={inputStyle} defaultValue="">
          <option value="">All Categories</option>
          <option>Classic Pizzas</option>
          <option>Vegetarian Pizzas</option>
          <option>Meat Lovers</option>
          <option>Specialty / Gourmet Pizzas</option>
          <option>Sides & Appetizers</option>
          <option>Beverages & Desserts</option>
        </select>

        {/* Location */}
        <select className={inputStyle} defaultValue="">
          <option value="">All Locations</option>
          <option>Dhaka</option>
          <option>Chattogram</option>
          <option>Sylhet</option>
        </select>
      </div>
    </div>
  );
}


export default FiltersComp;