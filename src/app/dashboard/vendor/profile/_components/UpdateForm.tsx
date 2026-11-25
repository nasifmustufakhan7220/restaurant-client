"use client";
import { Camera, Lock } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { updateVendorProfile } from "@/lib/actions/menu";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import ImageUpdateForProfile from "@/app/dashboard/customer/profile/_components/ImageUpdateForProfile";
type VendorProfile = {
  name: string;
  email: string;
  image?: string;
  role: string;
  businessName?: string;
  subscriptionPlan?: string;
  subscriptionExpiresAt?: string;
};
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
};
export const ProfileAvatar = ({name,image,className,}: {name: string;image?: string;className: string;}) => {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-primary to-highlight font-bold text-primary-foreground ${className}`}
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          sizes="96px"
          className="object-cover"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
};
const ReadOnlyRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-border py-3 first:border-t-0">
      <dt className="text-sm text-text-secondary">{label}</dt>
      <dd className="break-all text-right text-sm font-bold capitalize text-foreground">
        {children}
      </dd>
    </div>
  );
};

const FormField = ({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-bold text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
};

const inputStyles =
  "min-h-11 w-full rounded-xl border border-border bg-section px-3.5 text-base text-foreground outline-none placeholder:text-text-muted focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-ring/30 md:text-sm";

type updateFormProps = {
  premium: boolean;
  image: {
    image: string;
  };
};

const UpdateForm = ({ premium, image }: updateFormProps) => {
  console.log("image:", image.image);
  const { data: session, isPending} = useSession();
  // CHANGED: string[] এর বদলে এখন একটা string
  const [imageUrl, setImageUrl] = useState<string>("");
  const router = useRouter();
  if(isPending){
    return;
  }
  const profile: VendorProfile = {
    name: session?.user?.name as string,
    email: session?.user?.email as string,
    image: image.image ? image.image : "https://github.com/shadcn.png",
    role: session?.user.role as string,
    businessName: "Pizza Hub",
    subscriptionPlan: premium ? "premium" : "free",
  };
  const isPremium = profile.subscriptionPlan === "premium";

  // CHANGED: imageUrls[0] এর বদলে imageUrl (খালি string হলে পুরোনো ছবি দেখাবে)
  const avatarImage = imageUrl || profile.image;

  const handelProfileUpdate = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedObject = Object.fromEntries(formData.entries());
    const updatedObj ={
        name: updatedObject.name as string,
        image: imageUrl,
    }
    const result = await updateVendorProfile(session?.user?.id as string, updatedObj);
    if(result.modifiedCount > 0 && result.matchedCount > 0){
        toast.add({
            title: "Success",
            description: "Profile updated successfully.",
            type: "success",
        });
        router.refresh();
    };
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-6">
      <div className="grid gap-4">
        <section className="overflow-hidden rounded-2xl border border-border bg-card text-center">
          <div className="h-20 bg-linear-to-r from-primary to-highlight" />

          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <ProfileAvatar
              name={profile.name}
              image={avatarImage}
              className="mx-auto -mt-12 size-24 text-3xl ring-4 ring-card"
            />

            <h2 className="mt-3 wrap-break-word text-xl font-bold text-foreground">
              {profile.name}
            </h2>
            {profile.businessName && (
              <p className="wrap-break-word text-text-secondary">
                {profile.businessName}
              </p>
            )}
            <p className="break-all text-sm text-text-muted">{profile.email}</p>

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold capitalize text-accent-foreground">
                {profile.role}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                  isPremium
                    ? "bg-pill-warning text-warning"
                    : "bg-section text-text-secondary"
                }`}
              >
                {profile.subscriptionPlan ?? "free"} plan
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="mb-2 text-lg font-semibold text-foreground">
            Subscription
          </h2>

          <dl>
            <ReadOnlyRow label="Plan">
              {profile.subscriptionPlan ?? "free"}
            </ReadOnlyRow>
          </dl>

          <Link
            href="/checkout"
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-border px-5 text-sm font-bold text-foreground transition-colors hover:bg-section"
          >
            Manage subscription
          </Link>
        </section>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground">Edit profile</h2>
        <p className="mb-5 mt-1 text-sm text-text-secondary">
          Change your photo, name and business name.
        </p>

        <form className="grid gap-6" onSubmit={handelProfileUpdate}>
          <div className="rounded-2xl border border-border p-4 sm:p-5">
            <p className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
              <Camera className="size-4 text-primary" aria-hidden="true" />
              Profile photo
              <span className="text-xs font-normal text-text-muted">optional</span>
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <ProfileAvatar
                name={profile.name}
                image={avatarImage}
                className="size-20 text-2xl"
              />

              <div className="w-full min-w-0 flex-1">
                <ImageUpdateForProfile onImageChange={setImageUrl} />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Full name" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={profile.name}
                placeholder="Your full name"
                autoComplete="name"
                required
                className={inputStyles}
              />
            </FormField>

            <FormField label="Business name" htmlFor="businessName">
              <input
                id="businessName"
                name="businessName"
                type="text"
                defaultValue={profile.businessName}
                placeholder="Your restaurant name"
                required
                className={inputStyles}
              />
            </FormField>
          </div>

          <div className="rounded-xl bg-section p-4">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-text-muted">
              <Lock className="size-3.5" aria-hidden="true" />
              Cannot be changed here
            </p>
            <dl>
              <ReadOnlyRow label="Email">{profile.email}</ReadOnlyRow>
              <ReadOnlyRow label="Role">{profile.role}</ReadOnlyRow>
              <ReadOnlyRow label="Plan">
                {profile.subscriptionPlan ?? "free"}
              </ReadOnlyRow>
            </dl>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
            <button
              type="reset"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-bold text-foreground transition-colors hover:bg-section"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Save changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateForm;