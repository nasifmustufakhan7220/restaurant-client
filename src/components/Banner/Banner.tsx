"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { playfair } from "@/app/layout";

const slides = [
  { src: "/pizza1.webp", alt: "Freshly baked pizza on a wooden board" },
  { src: "/pizza2.webp", alt: "Pizza with a slice being lifted" },
  { src: "/pizza3.webp", alt: "Pineapple and ham pizza" },
  { src: "/pizza4.webp", alt: "Vegetable pizza on parchment paper" },
  { src: "/pizza5.webp", alt: "Pizza with fresh toppings" },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const showNextSlide = () => {
    setCurrentSlide((current) => (current + 1) % slides.length);
  };

  const showPreviousSlide = () => {
    setCurrentSlide((current) => (current - 1 + slides.length) % slides.length);
  };

  // Move to the next image automatically every 6 seconds.
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-neutral-900 px-5 pb-16 pt-28 sm:px-8 sm:pt-32"
    >
      {/* Image carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              preload={index === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay for readable text */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/20 to-black/65" />

      {/* Carousel arrows */}
      <button
        type="button"
        onClick={showPreviousSlide}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 p-2 text-white/75 transition-colors hover:text-white sm:left-4 lg:left-8"
      >
        <ChevronLeft
          className="h-9 w-9 sm:h-12 sm:w-12"
          strokeWidth={1.25}
          aria-hidden="true"
        />
      </button>

      <button
        type="button"
        onClick={showNextSlide}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 p-2 text-white/75 transition-colors hover:text-white sm:right-4 lg:right-8"
      >
        <ChevronRight
          className="h-9 w-9 sm:h-12 sm:w-12"
          strokeWidth={1.25}
          aria-hidden="true"
        />
      </button>

      {/* Banner text */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className={`font-serif text-[5.5rem] leading-[0.82] tracking-[-0.02em] text-white sm:text-[9rem] md:text-[11rem] lg:text-[13rem] xl:text-[15rem] ${playfair.className}`}>
          Pizza
        </h1>

        <div className="mt-3 bg-primary px-5 py-2 sm:mt-4 sm:px-8 sm:py-2.5 lg:px-10 lg:py-3">
          <p className="font-serif text-xl uppercase tracking-[0.16em] text-white sm:text-3xl lg:text-4xl xl:text-5xl">
            Good pizza. Good people. Right on time.
          </p>
        </div>

        <div className="mt-8 w-60 max-w-[80vw] sm:mt-12 sm:w-90 lg:w-110">
          <div className="flex items-center justify-center gap-3 text-white sm:gap-4">
            <span className="text-sm uppercase tracking-[0.18em] sm:text-lg lg:text-xl">
              ESTD
            </span>
            <span className="h-px w-6 bg-white/80 sm:w-10" />
            <span className="text-sm uppercase tracking-[0.18em] sm:text-lg lg:text-xl">
              2026
            </span>
          </div>
          <div className="mt-2 h-0.5 w-full bg-primary" />
        </div>
      </div>
    </section>
  );
}
