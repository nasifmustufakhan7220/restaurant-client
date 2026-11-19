"use client";
import { useState } from "react";
import {
  ChefHat,
  Menu,
  ShoppingCart,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", src: "/", alt: "Home" },
  { name: "Browse", src: "/browse", alt: "Browse" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-10 lg:pt-6">
      <nav className="mx-auto w-full max-w-[1700px] rounded-2xl bg-white px-4 shadow-[0_10px_35px_rgba(0,0,0,0.18)] sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-24">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex shrink-0 flex-col items-center text-neutral-900"
            aria-label="Restan home"
          >
            <ChefHat
              className="h-6 w-6 text-primary sm:h-7 sm:w-7"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="mt-0.5 text-lg font-bold uppercase leading-none tracking-[0.14em] sm:text-2xl">
              Restan
            </span>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-7 lg:flex xl:gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.src}
                  className={`${pathname === link.src ? "text-primary" : "text-neutral-700"} flex items-center gap-1.5 text-[15px] text-neutral-700 transition-colors hover:text-primary`}
                >
                  {link.name}
                  
                </Link>
              </li>
            ))}
          </ul>

          {/* Cart and mobile menu buttons */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <button
              type="button"
              aria-label="Open cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-primary sm:h-12 sm:w-12"
            >
              <ShoppingCart
                className="h-4 w-4 sm:h-5 sm:w-5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white">
                0
              </span>
            </button>

            <button>
              Sign In
            </button>

            <button>Sign Up</button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center text-neutral-900 lg:hidden"
            >
              {isMenuOpen ? (
                <X className="h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <ul className="border-t border-neutral-200 py-2 lg:hidden">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.src}
                  onClick={closeMenu}
                  className="flex items-center justify-between px-2 py-3 text-base text-neutral-800 transition-colors hover:text-primary"
                >
                  {link.name}
                
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}
