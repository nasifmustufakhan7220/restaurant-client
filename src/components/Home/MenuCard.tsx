"use client";
import Link from "next/link";
import Image from "next/image"; // 🖼️ Next.js Image component
import { motion } from "framer-motion";
import { MenuItem } from "@/lib/types/home";

interface MenuCardProps {
  item: MenuItem;
  priority?: boolean; // 🖼️ প্রথম দিকের card-এর ছবি দ্রুত লোড করার জন্য (ঐচ্ছিক)
}

export default function MenuCard({ item, priority = false }: MenuCardProps) {
  return (
    // 🎬 MOTION ANIMATION: mouse নিলে card একটু উপরে উঠবে
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden flex flex-col h-full"
    >
      {/* 🖼️ ছবির container: relative + নির্দিষ্ট উচ্চতা দিতে হবে, নাহলে fill কাজ করবে না */}
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={item.images[0]}
          alt={item.itemName}
          fill // 🖼️ container-এর পুরো জায়গা ভরবে
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // 🖼️ স্ক্রিন অনুযায়ী সঠিক সাইজের ছবি আনবে
          priority={priority} // 🖼️ true হলে আগে লোড হবে
          className="object-cover" // আগের মতোই crop হয়ে ভরবে
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* Category ও Price */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
            {item.category}
          </span>
          <span className="text-lg font-bold text-red-600">${item.price}</span>
        </div>

        {/* নাম */}
        <h3 className="mt-3 text-xl font-bold text-gray-800">{item.name}</h3>

        {/* Location */}
        <p className="mt-1 text-sm text-gray-500">📍 {item.location}</p>

        {/* Vendor */}
        <p className="text-sm text-gray-500">🏪 {item.vendorName}</p>

        <Link
          href={`/menu/${item._id}`}
          className="mt-auto pt-4 block"
        >
          <span className="block text-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition">
            View Details
          </span>
        </Link>
      </div>
    </motion.div>
  );
}