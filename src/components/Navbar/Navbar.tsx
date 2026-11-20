"use client";
import { useState } from "react";
import { Menu, Pizza, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
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

const navLinks = [
  { name: "Home", src: "/", alt: "Home" },
  { name: "Browse", src: "/browse", alt: "Browse" },
];

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
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
  };

  return (
    <header
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
            : "mx-auto w-full max-w-[1700px] rounded-2xl bg-white px-4 shadow-[0_10px_35px_rgba(0,0,0,0.18)] sm:px-6 lg:px-8"
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
            className="flex shrink-0 flex-col items-center text-neutral-900 transition-colors sm:flex-row sm:gap-1.5"
            aria-label="Restan home"
          >
            <Pizza
              className="h-6 w-6 text-primary sm:h-7 sm:w-7"
              strokeWidth={1.5}
              aria-hidden="true"
            />
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
                  className={`flex items-center gap-1.5 text-[15px] transition-colors hover:text-primary ${
                    pathname === link.src ? "text-primary" : "text-neutral-700"
                  }`}
                >
                  {link.name}
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
              <button
                type="button"
                aria-label="Open cart"
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-primary"
              >
                <ShoppingCart
                  className="h-5 w-5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white">
                  0
                </span>
              </button>
              {!isPending && session?.user && (
                <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Image
                          className="rounded-full"
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
              <button
                type="button"
                aria-label="Open cart"
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-primary"
              >
                <ShoppingCart
                  className="h-5 w-5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-white">
                  0
                </span>
              </button>
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
                          className="rounded-full"
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
                    className="rounded-full px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:text-primary"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                  >
                    Join Free
                  </Link>
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
                {isMenuOpen ? (
                  <X className="h-7 w-7" aria-hidden="true" />
                ) : (
                  <Menu className="h-7 w-7" aria-hidden="true" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile navigation */}
        {!isDashboardNavbar && isMenuOpen && (
          <div className="border-t border-neutral-200 py-2 lg:hidden">
            <ul>
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
                    className="rounded-full px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:text-primary"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                  >
                    Join Free
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
