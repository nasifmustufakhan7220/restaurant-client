"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion"; // 🎬 MOTION

interface ImageGalleryProps {
  images?: string[]; // ? দেওয়া হয়েছে, কারণ ডেটায় ছবি না-ও থাকতে পারে
  name: string;
}

export default function ImageGallery({ images = [], name }: ImageGalleryProps) {
  // 0 মানে images array-র প্রথম ছবি (images[0]) দিয়ে শুরু হবে
  const [activeImage, setActiveImage] = useState(0);

  // ছবি না থাকলে placeholder দেখাবে (crash করবে না)
  if (images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-3xl bg-neutral-100 text-6xl shadow-lg">
        🍕
      </div>
    );
  }

  return (
    <div>
      {/* বড় ছবি: images[activeImage], শুরুতে images[0] */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-lg">
        <Image
          key={activeImage}
          src={images[activeImage]}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* ছোট ছবির তালিকা: একাধিক ছবি থাকলেই দেখাবে */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((img, index) => (
            // 🎬 MOTION: hover-এ একটু বড়, ক্লিকে একটু ছোট
            <motion.button
              key={img + index}
              type="button"
              onClick={() => setActiveImage(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Show image ${index + 1}`}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-colors ${
                index === activeImage
                  ? "border-primary"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${name} ${index + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}