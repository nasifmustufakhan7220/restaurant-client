import Image from "next/image";
import { Camera, Lock } from "lucide-react";

// Customer > Profile Settings page (UI only). Everything is in this one file.
// The dashboard layout already adds the page padding and the background.

// ---------------------------------------------------------------
// 1) The type: the fields of the user (from the database) that this page uses
// ---------------------------------------------------------------

type CustomerProfile = {
  name: string;
  email: string;
  image?: string;
  role: string;
};

// FUNCTIONALITY: load the logged-in customer's real profile here
const profile: CustomerProfile = {
  name: "Nusrat Jahan",
  email: "nusrat@example.com",
  image: undefined, // put a real image link here to see the picture
  role: "customer",
};

// ---------------------------------------------------------------
// 2) Small helpers
// ---------------------------------------------------------------

// "Nusrat Jahan" -> "NJ" (first letter of the first two words)
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
};

// Shared look of the text inputs. Text is 16px on mobile so phones do not zoom in on tap.
const inputStyles =
  "min-h-11 w-full rounded-xl border border-border bg-section px-3.5 text-base text-foreground outline-none placeholder:text-text-muted focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-ring/30 md:text-sm";

// ---------------------------------------------------------------
// 3) Small pieces used below
// ---------------------------------------------------------------

// Round picture with the initials. Needs: name, className (for the size). Optional: image.
// FUNCTIONALITY: the image comes from ImgBB after the upload is connected
const ProfileAvatar = ({ name, image, className }: { name: string; image?: string; className: string }) => {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-primary to-highlight font-bold text-primary-foreground ${className}`}
    >
      {image ? <Image src={image} alt={name} fill sizes="96px" className="object-cover" /> : getInitials(name)}
    </div>
  );
};

// A label above an input. Needs: label, htmlFor (the id of the input), children (the input).
const FormField = ({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) => {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-bold text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
};

// A row that can only be read (not edited). Needs: label and children (the value).
const ReadOnlyRow = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-border py-3 first:border-t-0">
      <dt className="text-sm text-text-secondary">{label}</dt>
      <dd className="break-all text-right text-sm font-bold capitalize text-foreground">{children}</dd>
    </div>
  );
};

// ---------------------------------------------------------------
// 4) The page
// ---------------------------------------------------------------

const CustomerProfilePage = () => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
        <p className="mt-1 text-text-secondary">Update your name and photo.</p>
      </div>

      {/* Mobile and tablet: one column. Desktop ("lg"): summary on the left, form on the right */}
      <div className="grid gap-4 lg:grid-cols-[2fr_3fr] lg:items-start lg:gap-6">
        {/* Left: who you are (summary) */}
        <section className="rounded-2xl border border-border bg-card p-5 text-center sm:p-6">
          <ProfileAvatar name={profile.name} image={profile.image} className="mx-auto size-24 text-3xl" />

          <h2 className="mt-4 wrap-break-word text-xl font-bold text-foreground">{profile.name}</h2>
          <p className="break-all text-sm text-text-muted">{profile.email}</p>

          <div className="mt-3 flex justify-center">
            <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold capitalize text-accent-foreground">
              {profile.role}
            </span>
          </div>
        </section>

        {/* Right: the edit form */}
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Edit profile</h2>

          {/* Every input has a "name", so you can read the values by name later */}
          <form className="grid gap-5">
            {/* Profile photo (optional) */}
            <div className="flex flex-wrap items-center gap-4">
              <ProfileAvatar name={profile.name} image={profile.image} className="size-16 text-xl" />

              <div>
                {/* FUNCTIONALITY: upload the chosen file to ImgBB and show the new picture here */}
                <label
                  htmlFor="image"
                  className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-border px-5 text-sm font-bold text-foreground transition-colors hover:bg-section"
                >
                  <Camera className="size-4" aria-hidden="true" />
                  Change photo
                </label>
                <input id="image" name="image" type="file" accept="image/png,image/jpeg" className="sr-only" />
                <p className="mt-1 text-xs text-text-muted">PNG or JPG. This is optional.</p>
              </div>
            </div>

            <FormField label="Full name" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={profile.name}
                placeholder="Your full name"
                required
                className={inputStyles}
              />
            </FormField>

            {/* These can be seen but not changed. They are not inputs, so they are never sent. */}
            <div className="rounded-xl bg-section p-4">
              <p className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-text-muted">
                <Lock className="size-3.5" aria-hidden="true" />
                Cannot be changed here
              </p>
              <dl>
                <ReadOnlyRow label="Email">{profile.email}</ReadOnlyRow>
                <ReadOnlyRow label="Role">{profile.role}</ReadOnlyRow>
              </dl>
            </div>

            {/* FUNCTIONALITY: show a success or error toast after saving */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              {/* type="reset" puts the inputs back to their first values (the browser does this by itself) */}
              <button
                type="reset"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-bold text-foreground transition-colors hover:bg-section"
              >
                Cancel
              </button>

              {/* FUNCTIONALITY: change type to "submit" and connect saving here */}
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Save changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CustomerProfilePage;