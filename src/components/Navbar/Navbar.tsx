"use client";
import { useState } from "react";
import { Menu, Pizza, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // 🎬 MOTION
import { signOut, useSession } from "@/lib/auth-client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

type NavbarProps = {
  variant?: "home" | "dashboard";
};

export default function Navbar({ variant = "home" }: NavbarProps) {
  const isDashboardNavbar = variant === "dashboard";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const closeMenu = () => setIsMenuOpen(false);

  const handelSignOut = async () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  const navLinks = [
    { name: "Home", src: "/", alt: "Home" },
    { name: "Browse", src: "/browse", alt: "Browse" },
  ];

  if(session?.user){
    navLinks.push({
      name: "Dashboard",
      src: `/dashboard/${session?.user?.role}`,
      alt: "Dashboard",
    },)
  }

  return (
    // 🎬 MOTION ANIMATION: Navbar উপর থেকে নেমে আসবে
    // dashboard-এ animation নেই (initial={false}), কারণ পেজ বদলালে বারবার চললে বিরক্তিকর লাগবে
    <motion.header
      initial={isDashboardNavbar ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={
        isDashboardNavbar
          ? "sticky top-0 z-40 h-(--dashboard-navbar-height) w-full border-b border-border bg-background"
          : "fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-10 lg:pt-6"
      }
    >
      <nav
        className={
          isDashboardNavbar
            ? "h-full w-full bg-background px-4 sm:px-6 lg:px-8"
            : // 🎨 DESIGN: স্বচ্ছ সাদা + blur + পাতলা border + নরম shadow
              "mx-auto w-full max-w-[1700px] rounded-2xl border border-white/60 bg-white/90 px-4 shadow-[0_10px_35px_rgba(0,0,0,0.18)] backdrop-blur-md sm:px-6 lg:px-8"
        }
      >
        <div
          className={
            isDashboardNavbar
              ? "flex h-full items-center justify-between gap-4"
              : "flex h-16 items-center justify-between gap-4 lg:h-24"
          }
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex shrink-0 flex-col items-center text-neutral-900 transition-colors sm:flex-row sm:gap-1.5"
            aria-label="Restan home"
          >
            {/* 🎬 MOTION ANIMATION: hover-এ Pizza আইকন ঘুরবে */}
            <motion.span
              whileHover={{ rotate: 25, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex"
            >
              <Pizza
                className="h-6 w-6 text-primary sm:h-7 sm:w-7"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </motion.span>
            <span className="mt-0.5 text-lg font-bold uppercase leading-none tracking-[0.14em] sm:text-2xl">
              Pizza <span className="text-primary">Hub</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-7 lg:flex xl:gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.src}
                  // 🎨 DESIGN: relative + group, যাতে নিচের রেখা বসানো যায়
                  className={`group relative flex items-center gap-1.5 py-1 text-[15px] font-medium transition-colors hover:text-primary ${
                    pathname === link.src ? "text-primary" : "text-neutral-700"
                  }`}
                >
                  {link.name}

                  {/* 🎬 MOTION ANIMATION: active লিংকের নিচের রেখা এক লিংক থেকে আরেকটায় স্মুথভাবে সরে যাবে */}
                  {pathname === link.src && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* 🎨 hover-এ রেখা (active না হলে) */}
                  {pathname !== link.src && (
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-primary/60 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Account links, cart, and mobile menu */}
          <div
            className={
              isDashboardNavbar
                ? "flex shrink-0 items-center gap-3"
                : "flex shrink-0 items-center gap-2 sm:gap-3"
            }
          >
            {/* Mobile cart and profile */}
            <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
              {/* 🎬 MOTION ANIMATION: hover/click-এ cart বাটন */}
              <motion.button
                type="button"
                aria-label="Open cart"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md transition-colors hover:bg-primary"
              >
                <ShoppingCart
                  className="h-5 w-5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                  0
                </span>
              </motion.button>
              {!isPending && session?.user && (
                <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Image
                          // 🎨 DESIGN: hover-এ লাল ring
                          className="cursor-pointer rounded-full ring-2 ring-transparent transition hover:ring-primary"
                          src="https://github.com/shadcn.png"
                          alt="Open"
                          width={32}
                          height={32}
                        />
                      }
                    />
                    <DropdownMenuContent className="w-56 mt-7" align="end">
                      <DropdownMenuItem>
                        <UserIcon />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCardIcon />
                        Billing
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <SettingsIcon />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        className="cursor-pointer hover:text-primary"
                        onClick={handelSignOut}
                      >
                        <LogOutIcon />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>

            {/* Desktop account links */}
            <div
              className={
                isDashboardNavbar
                  ? "hidden items-center gap-3 lg:flex"
                  : "hidden items-center gap-2 lg:flex"
              }
            >
              {/* 🎬 MOTION ANIMATION: hover/click-এ cart বাটন */}
              <motion.button
                type="button"
                aria-label="Open cart"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md transition-colors hover:bg-primary"
              >
                <ShoppingCart
                  className="h-5 w-5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
                  0
                </span>
              </motion.button>
              {isPending ? (
                <div className="flex items-center gap-7 animate-pulse">
                  {/* Sign In Skeleton */}
                  <div className="h-4 w-12 rounded bg-neutral-200" />

                  {/* Join Free Button Skeleton */}
                  <div className="h-11 w-28 rounded-full bg-neutral-200" />
                </div>
              ) : session?.user ? (
                <>
                  {!isPending && session?.user && (
                    <div className="flex items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Image
                              // 🎨 DESIGN: hover-এ লাল ring
                              className="cursor-pointer rounded-full ring-2 ring-transparent transition hover:ring-primary"
                              src="https://github.com/shadcn.png"
                              alt="Open"
                              width={32}
                              height={32}
                            />
                          }
                        />
                        <DropdownMenuContent className="w-56 mt-7" align="end">
                          <DropdownMenuItem>
                            <UserIcon />
                            Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CreditCardIcon />
                            Billing
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <SettingsIcon />
                            Settings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            className="cursor-pointer hover:text-primary"
                            onClick={handelSignOut}
                          >
                            <LogOutIcon />
                            Log out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="rounded-full px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-primary"
                  >
                    Sign In
                  </Link>

                  {/* 🎬 MOTION ANIMATION: Join Free বাটন hover-এ একটু বড় হবে */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Link
                      href="/sign-up"
                      className="block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md shadow-primary/30 transition-colors hover:bg-primary/90"
                    >
                      Join Free
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {isDashboardNavbar ? (
              <div className="lg:hidden">
                <SidebarTrigger aria-label="Open dashboard menu" />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="flex h-10 w-10 items-center justify-center text-neutral-900 lg:hidden"
              >
                {/* 🎬 MOTION ANIMATION: Menu ↔ X আইকন ঘুরে বদলাবে */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isMenuOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    {isMenuOpen ? (
                      <X className="h-7 w-7" aria-hidden="true" />
                    ) : (
                      <Menu className="h-7 w-7" aria-hidden="true" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            )}
          </div>
        </div>

        {/* Mobile navigation */}
        {/* 🎬 MOTION ANIMATION: AnimatePresence থাকায় বন্ধ হওয়ার সময়ও animation চলবে */}
        <AnimatePresence>
          {!isDashboardNavbar && isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden lg:hidden"
            >
              <div className="border-t border-neutral-200 py-2">
                <ul>
                  {navLinks.map((link, index) => (
                    // 🎬 MOTION ANIMATION: লিংকগুলো একটার পর একটা বাম থেকে আসবে
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: 0.05 + index * 0.06,
                      }}
                    >
                      <Link
                        href={link.src}
                        onClick={closeMenu}
                        className={`flex items-center justify-between rounded-lg px-2 py-3 text-base transition-colors hover:bg-neutral-50 hover:text-primary ${
                          pathname === link.src
                            ? "font-semibold text-primary"
                            : "text-neutral-800"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Sign In / Sign Up only inside the mobile menu */}
                <div className="grid grid-cols-2 gap-2 px-2 pb-2 pt-1">
                  {isPending ? (
                    <div className="flex items-center gap-7 animate-pulse">
                      {/* Sign In Skeleton */}
                      <div className="h-4 w-12 rounded bg-neutral-200" />

                      {/* Join Free Button Skeleton */}
                      <div className="h-11 w-28 rounded-full bg-neutral-200" />
                    </div>
                  ) : !session?.user ? (
                    <>
                      <Link
                        href="/sign-in"
                        className="rounded-full px-4 py-2 text-center text-sm font-semibold text-neutral-700 transition-colors hover:text-primary"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/sign-up"
                        className="rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                      >
                        Join Free
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
