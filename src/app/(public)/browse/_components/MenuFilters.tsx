// শুধু UI: এখানে কোনো কাজ করে না, পরে তুমি state ও onChange যোগ করবে
export default function MenuFilters() {
  const inputStyle =
    "w-full rounded-full border border-orange-200 bg-white px-5 py-3 text-sm text-gray-700 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100";

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mb-10">
      {/* মোবাইলে ১টা, ট্যাবলেটে ২টা, ডেস্কটপে ৪টা */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search (ডেস্কটপে ২ ঘর নেবে) */}
        <div className="relative lg:col-span-2">
          <span className="absolute left-4 top-1/2 -translate-y-1/2">🔍</span>
          <input
            type="text"
            placeholder="Search by name..."
            className={`${inputStyle} pl-11`}
          />
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