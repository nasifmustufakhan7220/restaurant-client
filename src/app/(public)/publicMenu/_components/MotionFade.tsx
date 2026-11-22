"use client";
import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion"; // 🎬 MOTION

interface MotionFadeProps {
  children: ReactNode;
  className?: string;
  x?: number;     // কত px পাশ থেকে আসবে
  y?: number;     // কত px নিচ থেকে আসবে
  delay?: number;
  duration?: number;
}

// 🎬 MOTION ANIMATION: পেজ লোডে fade + slide
export default function MotionFade({
  children,
  className = "",
  x = 0,
  y = 0,
  delay = 0,
  duration = 0.5,
}: MotionFadeProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}