import React from "react";

const Bone = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
);

const ProfileSkeleton = () => {
  return (
    <div
      className="grid gap-4 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-6"
      aria-busy="true"
      aria-label="Loading profile"
    >
      {/* ===== Left column ===== */}
      <div className="space-y-4 lg:space-y-6">
        {/* Profile overview card */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {/* Banner */}
          <div className="h-24 animate-pulse bg-gray-200" />

          <div className="px-6 pb-8 text-center">
            {/* Avatar */}
            <div className="-mt-16 mx-auto size-32 animate-pulse rounded-full border-4 border-white bg-gray-300" />

            {/* Name */}
            <Bone className="mx-auto mt-4 h-6 w-40" />
            {/* Business name */}
            <Bone className="mx-auto mt-3 h-4 w-28" />
            {/* Email */}
            <Bone className="mx-auto mt-2 h-4 w-48" />

            {/* Badges */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <Bone className="h-6 w-16 rounded-full" />
              <Bone className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </section>

        {/* Subscription card */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <Bone className="h-6 w-32" />

          <div className="mt-6 flex items-center justify-between">
            <Bone className="h-4 w-10" />
            <Bone className="h-4 w-16" />
          </div>

          <Bone className="mt-6 h-11 w-full rounded-full" />
        </section>
      </div>

      {/* ===== Right column ===== */}
      <section className="rounded-3xl border border-gray-200 bg-white p-6">
        {/* Heading */}
        <Bone className="h-6 w-36" />
        <Bone className="mt-2 h-4 w-64 max-w-full" />

        {/* Profile photo box */}
        <div className="mt-6 rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-2">
            <Bone className="size-4 rounded-full" />
            <Bone className="h-4 w-28" />
          </div>

          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="size-20 shrink-0 animate-pulse rounded-full bg-gray-200" />
            <Bone className="h-32 w-full flex-1 rounded-xl" />
          </div>
        </div>

        {/* Name fields */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Bone className="h-4 w-20" />
            <Bone className="h-10 w-full rounded-full" />
          </div>
          <div className="space-y-2">
            <Bone className="h-4 w-28" />
            <Bone className="h-10 w-full rounded-full" />
          </div>
        </div>

        {/* Locked info box */}
        <div className="mt-6 rounded-2xl bg-gray-100 p-4">
          <div className="flex items-center gap-2">
            <Bone className="size-4 bg-gray-300" />
            <Bone className="h-3 w-40 bg-gray-300" />
          </div>

          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-gray-200 py-4 last:border-0"
            >
              <Bone className="h-4 w-14 bg-gray-300" />
              <Bone className="h-4 w-36 bg-gray-300" />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-6 border-t border-gray-200" />

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Bone className="h-11 w-24 rounded-full" />
          <Bone className="h-11 w-32 rounded-full" />
        </div>
      </section>
    </div>
  );
};

export default ProfileSkeleton;