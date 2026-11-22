"use client";
import { motion, useReducedMotion } from "framer-motion"; // 🎬 MOTION
import { ShoppingBag } from "lucide-react";

interface OrderButtonProps {
  price: string;       // বাটনে দাম দেখানোর জন্য
  disabled?: boolean;  // পরে চাইলে বাটন বন্ধ রাখতে পারবে
}

export default function OrderButton({ price, disabled = false }: OrderButtonProps) {
  const reduceMotion = useReducedMotion();

  // TODO: 👉 এখানে তোমার order ফাংশনালিটি বসাবে
  const handleOrder = () => {
    // তোমার কোড এখানে লিখবে
  };

  return (
    <div className="mt-8">
      {/* 🎬 MOTION: hover-এ একটু বড়, ক্লিকে একটু ছোট */}
      <motion.button
        type="button"
        onClick={handleOrder}
        disabled={disabled}
        whileHover={disabled || reduceMotion ? undefined : { scale: 1.03 }}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-72"
      >
        {/* 🎨 hover-এ ঝলক (shine) effect */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-all duration-700 group-hover:left-[150%]"
        />

        <ShoppingBag className="relative h-6 w-6" aria-hidden="true" />
        <span className="relative">Order Now</span>

        {/* দাম বাটনের ভেতরে */}
        <span className="relative rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
          ${price}
        </span>
      </motion.button>

      {/* ছোট আশ্বাসের লেখা */}
      <p className="mt-3 text-center text-xs text-neutral-500 sm:text-left">
        🛵 Fast delivery &nbsp;•&nbsp; 🔥 Served hot &nbsp;•&nbsp; ✅ Verified vendor
      </p>
    </div>
  );
}