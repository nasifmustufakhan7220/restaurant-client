"use client";
import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

// props-এর type: কোন কোন জিনিস আসবে
interface FadeInProps {
  children: ReactNode; // ভেতরের যেকোনো JSX
  delay?: number;      // ? মানে ঐচ্ছিক (না দিলেও চলবে)
  className?: string;
}

// 🎬 MOTION ANIMATION: স্ক্রল করে এলে নিচ থেকে উপরে ভেসে ওঠা (fade + slide up)
export default function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  // যাদের "reduce motion" অন করা আছে, তাদের জন্য animation কমে যাবে
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      // 🎬 শুরুর অবস্থা: অদৃশ্য এবং ৩০px নিচে
      initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
      // 🎬 স্ক্রিনে এলে শেষ অবস্থা: দৃশ্যমান এবং নিজের জায়গায়
      whileInView={{ opacity: 1, y: 0 }}
      // 🎬 once: true মানে শুধু একবারই চলবে
      viewport={{ once: true, amount: 0.2 }}
      // 🎬 ০.৫ সেকেন্ড, delay দিয়ে একটার পর একটা আনা যায়
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}