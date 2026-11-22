"use client";
import { motion, useReducedMotion } from "framer-motion"; // 🎬 MOTION

export default function NotFoundAnimation() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {/* 🎬 "4" নিচ থেকে উঠে আসবে */}
      <motion.span
        initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-[7rem] font-extrabold leading-none text-neutral-900 sm:text-[11rem]"
      >
        4
      </motion.span>

      {/* 🎬 মাঝের "0" জায়গায় পিৎজা, প্রথমে বড় হয়ে আসবে, তারপর আস্তে ঘুরবে */}
      <motion.span
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.5 }}
        animate={{ opacity: 1, scale: 1, rotate: reduceMotion ? 0 : 360 }}
        transition={{
          opacity: { duration: 0.5, delay: 0.15 },
          scale: { duration: 0.5, delay: 0.15 },
          // 🎬 ২০ সেকেন্ডে একবার ঘুরবে (খুব ধীর, চোখে লাগে না)
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
        className="select-none text-[6rem] leading-none sm:text-[9.5rem]"
        aria-hidden="true"
      >
        🍕
      </motion.span>

      {/* 🎬 শেষের "4" একটু দেরিতে */}
      <motion.span
        initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="text-[7rem] font-extrabold leading-none text-neutral-900 sm:text-[11rem]"
      >
        4
      </motion.span>
    </div>
  );
}