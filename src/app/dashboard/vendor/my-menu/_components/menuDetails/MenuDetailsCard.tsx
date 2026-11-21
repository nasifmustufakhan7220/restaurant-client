"use client";

import { useState } from "react";
import { ArrowLeft, Pencil, Trash2, Check, ChevronRight } from "lucide-react";
import { MenuItemData } from "@/lib/actions/menu";
import Image from "next/image";
import Link from "next/link";

export default function MenuDetailsCard({ menu }: { menu: MenuItemData }) {
  const [isAvailable, setIsAvailable] = useState(menu.isAvailable);
  const [activeStatus] = useState(menu.status);
  const statusOptions = ["Approved", "Pending", "Rejected"];

  return (
    <div className="min-h-screen bg-section text-foreground">
      {/* Main Content */}
      <main className="min-w-0 flex-1 p-4 sm:p-5 lg:p-7">
        {/* Breadcrumb */}
        <div className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-text-secondary">
          <span>My Menu Items</span>
          <ChevronRight size={13} />
          <span className="font-semibold text-foreground">{menu.itemName}</span>
        </div>

        {/* Header */}
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {menu.itemName}
            </h1>

            <span className="mt-2 inline-flex rounded-full bg-pill-success px-3 py-1 text-[10px] font-semibold text-success">
              {menu.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex">
            <Link href="/dashboard/vendor/my-menu">
              <button className="flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold transition hover:bg-section sm:px-4">
                <ArrowLeft size={14} />
                Back
              </button>
            </Link>

            <Link href={`/dashboard/vendor/my-menu/${menu._id}/updateMenu`}>
              <button className="flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-3 py-2 text-xs font-semibold transition hover:bg-section sm:px-4">
                <Pencil size={13} />
                Edit
              </button>
            </Link>

            <button className="flex items-center justify-center gap-1.5 rounded-full border border-destructive bg-card px-3 py-2 text-xs font-semibold text-destructive transition hover:bg-pill-danger sm:px-4">
              <Trash2 size={13} />
              Delete
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[1.55fr_1fr]">
          {/* Left Column */}
          <div className="space-y-3.5">
            {/* Image Gallery */}
            <section className="rounded-2xl border border-border bg-card p-3.5 sm:p-4">
              <div className="relative h-55 overflow-hidden rounded-xl sm:h-75 lg:h-85">
                <Image
                  src={menu.images[0]}
                  alt={menu.itemName}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 60vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
            </section>

            {/* Approval Status */}
            <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <h2 className="mb-4 text-sm font-bold">Approval status</h2>

              <div className="space-y-4">
                {(menu.status === "Approved"
                  ? [
                      {
                        title: "Submitted",
                        description: "Nov 20, 2026, 10:30 AM",
                      },
                      {
                        title: "Admin review",
                        description: "Reviewed by the PizzaHub team",
                      },
                      {
                        title: "Approved by admin",
                        description: "Visible to customers on the menu.",
                      },
                    ]
                  : [
                      {
                        title: "Pending submission",
                        description: "Nov 20, 2026, 10:30 AM",
                      },
                      {
                        title: "Admin review in progress",
                        description: "Review in progress by the PizzaHub team",
                      },
                    ]
                ).map((step) => (
                  <div key={step.title} className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success text-white">
                      {menu.status === "Approved" ? (
                        <Check size={14} />
                      ) : (
                        <ArrowLeft size={14} />
                      )}
                    </div>

                    <div>
                      <h3 className="text-xs font-bold">{step.title}</h3>
                      <p className="mt-0.5 text-[10px] text-text-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl bg-pill-success px-3 py-3 text-xs text-success">
                {menu.status === "Approved"
                  ? "Your menu item has been approved and is now visible to customers."
                  : "Your menu item is currently under review by the PizzaHub team."}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Item Information */}
            <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-primary">
                {menu.itemName}
              </p>

              <h2 className="mt-1 text-2xl font-extrabold tracking-tight">
                $ {menu.price}.00
              </h2>

              <p className="mt-3 text-xs leading-6 text-text-secondary">
                {menu.description}
              </p>

              <div className="my-3 border-t border-border" />

              {/* Information Rows */}
              {[
                { label: "Category", value: menu.category },
                { label: "Price", value: `$${menu.price}.00` },
                { label: "Location", value: menu.location },
                { label: "Images", value: `${menu.images.length} photos` },
                // { label: "Created", value: menu.createdDate },
                { label: "Status", value: menu.status },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 border-b border-border py-2.5 last:border-0"
                >
                  <span className="text-xs text-text-secondary">
                    {item.label}
                  </span>
                  <span className="text-right text-xs font-bold">
                    {item.value}
                  </span>
                </div>
              ))}

              {/* Availability Toggle */}
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold">Available to customers</p>
                  <p className="mt-0.5 text-[10px] text-text-muted">
                    Customers can see and order this item.
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={isAvailable}
                  aria-label="Toggle item availability"
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
                    isAvailable ? "bg-success" : "bg-muted-foreground"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                      isAvailable ? "left-4.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </section>

            {/* Status Preview */}
            <section className="rounded-2xl border border-dashed border-border bg-transparent p-4">
              <h3 className="text-xs font-medium">Design preview only</h3>

              <p className="mt-1 text-[10px] leading-4 text-text-secondary">
                Switch status to see each state of this page. This control is
                not part of the real page.
              </p>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold transition ${
                      activeStatus === status
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-text-secondary hover:bg-section"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
