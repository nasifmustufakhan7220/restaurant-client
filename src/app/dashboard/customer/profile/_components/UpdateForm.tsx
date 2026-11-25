"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import { updateVendorProfile } from "@/lib/actions/customer";
import ImageUpdateForProfile from "@/app/dashboard/customer/profile/_components/ImageUpdateForProfile";

type CustomerProfile = {
  name: string;
  email: string;
  image?: string;
  role: string;
};

const inputStyles =
  "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
};

const ProfileAvatar = ({
  name,
  image,
  className,
}: {
  name: string;
  image?: string;
  className: string;
}) => (
  <div
    className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 font-semibold text-green-700 ${className}`}
  >
    {image ? (
      <Image
        src={image}
        alt={name}
        fill
        sizes="128px"
        className="object-cover"
      />
    ) : (
      getInitials(name)
    )}
  </div>
);

const FormField = ({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
}) => (
  <div className="space-y-2">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      defaultValue={defaultValue}
      className={inputStyles}
    />
  </div>
);

const UpdateForm = ({
  id,
  email,
  name,
  user,
}: {
  id: string;
  email: string;
  name: string;
  user: string;
}) => {
  const [imageUrl, setImageUrl] = useState("");

  const profile: CustomerProfile = {
    name,
    email,
    image: user || "https://github.com/shadcn.png",
    role: "customer",
  };

  const avatarImage = imageUrl || profile.image;

  const handelProfileUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const objectData = Object.fromEntries(formData.entries());

    const updatedProfile = {
      name: objectData.name as string,
      image: imageUrl || profile.image || "",
    };

    const result = await updateVendorProfile(id, updatedProfile);

    console.log("Updated profile:", result);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-6">
      {/* Profile Overview */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {/* Gradient Banner */}
        <div className="h-24 bg-linear-to-r from-red-500 to-orange-500" />

        <div className="px-6 pb-8 text-center">
          {/* Avatar overlaps the banner */}
          <ProfileAvatar
            name={profile.name}
            image={avatarImage}
            className="-mt-16 mx-auto size-32 border-4 border-white text-4xl shadow-md ring-1 ring-orange-200"
          />

          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            {profile.name}
          </h2>

          <p className="mt-2 break-all text-sm text-gray-500">
            {profile.email}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold capitalize text-red-600">
              {profile.role}
            </span>
          </div>
        </div>
      </section>

      {/* Update Profile */}
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update your profile information.
          </p>
        </div>

        <form onSubmit={handelProfileUpdate} className="space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <ProfileAvatar
              name={profile.name}
              image={avatarImage}
              className="size-16 text-xl"
            />

            {/* relative দেওয়া হয়েছে যাতে ভিতরের ✕ বাটন এই বক্সের ভিতরেই থাকে */}
            <div className="relative w-full min-w-0 flex-1">
              <ImageUpdateForProfile onImageChange={setImageUrl} />

              <p className="mt-2 text-xs text-gray-500">
                PNG or JPG. This is optional.
              </p>
            </div>
          </div>

          {/* Name */}
          <FormField
            label="Full Name"
            name="name"
            defaultValue={profile.name}
          />

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="relative">
              <input
                type="email"
                value={profile.email}
                readOnly
                className={`${inputStyles} cursor-not-allowed bg-gray-50 pr-10`}
              />
              <Lock
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Save Changes
          </button>
        </form>
      </section>
    </div>
  );
};

export default UpdateForm;