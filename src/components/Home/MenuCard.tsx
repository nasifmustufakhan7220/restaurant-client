"use client";
import Image from "next/image"; // 🖼️ Next.js Image component
import { motion } from "framer-motion";
import { MenuItem } from "@/lib/types/menu-item";
import { useSession } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
  priority?: boolean; // 🖼️ প্রথম দিকের card-এর ছবি দ্রুত লোড করার জন্য (ঐচ্ছিক)
}

export default function MenuCard({ item, priority = false }: MenuCardProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleViewDetails = () => {
    if (session?.user?.role === "vendor" || session?.user?.role === "admin") {
      toast.add({
        title: "Access Denied",
        description: `You need to be a customer to view menu details. Current role: ${session?.user?.role}`,
        type: "error",
      });
      return;
    }
    router.push(`/publicMenu/${item._id}`)
  };
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
          src={item.images![0]} // Type fix only: no runtime change
          alt={item.itemName as string} // Type fix only: no runtime change
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

        {/* Location */}
        <p className="mt-1 text-sm text-gray-500"> 🍕 {item.itemName}</p>
        <p className="mt-1 text-sm text-gray-500">📍 {item.location}</p>

        {/* Vendor */}
        <p className="text-sm text-gray-500">🏪 {item.vendorName}</p>

        <div className="mt-auto pt-5">
  <Button
    onClick={handleViewDetails}
    className="group relative flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-red-600 text-sm font-semibold text-white shadow-md shadow-red-600/25 transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/40 active:scale-[0.97]"
  >
    {/* 🎨 hover-এ আলোর ঝলক */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[150%]"
    />

    <span className="relative">View Details</span>

    {/* 🎨 hover-এ তীর একটু ডানে সরবে */}
    <ArrowRight
      className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden="true"
    />
  </Button>
</div>
      </div>
    </motion.div>
  );
}
