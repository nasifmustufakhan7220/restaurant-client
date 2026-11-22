// লোডিং অবস্থায় MenuCard-এর মতো দেখতে ধূসর কার্ড
export default function MenuCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      {/* ছবির জায়গা */}
      <div className="h-48 bg-gray-200" />

      <div className="p-5">
        {/* category ও price */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
          <div className="h-6 w-14 bg-gray-200 rounded" />
        </div>

        {/* নাম, location, vendor */}
        <div className="mt-4 h-6 w-3/4 bg-gray-200 rounded" />
        <div className="mt-3 h-4 w-1/2 bg-gray-200 rounded" />
        <div className="mt-2 h-4 w-2/3 bg-gray-200 rounded" />

        {/* বাটন */}
        <div className="mt-5 h-11 w-full bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}