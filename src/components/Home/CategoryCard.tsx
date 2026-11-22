"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Category } from "@/lib/types/home";


interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/menu?category=${encodeURIComponent(category.name)}`}
      className="block h-full"
    >
      {/* 🎬 MOTION ANIMATION: hover-এ একটু বড়, ক্লিকের সময় একটু ছোট */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 text-center h-full"
      >
        <div className="text-5xl">{category.icon}</div>
        <h3 className="mt-4 font-bold text-gray-800">{category.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{category.description}</p>
      </motion.div>
    </Link>
  );
}