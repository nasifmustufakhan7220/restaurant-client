import { getSession } from "@/lib/api/servers";
import { connection } from "next/server";

import { getPremiumVendor, getVendorProfile } from "@/lib/api/menu";
import UpdateForm from "./UpdateForm";

const VendorProfilePage = async () => {
  await connection();
  const session = await getSession();

  const premium = await getPremiumVendor(session?.user?.id as string);
  const user = await getVendorProfile(session?.user.id as string);
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
        <p className="mt-1 text-text-secondary">Update your name, photo and business details.</p>
      </div>

      {/* The two-column layout is inside UpdateForm now */}
      <UpdateForm premium={premium} image={user} />
    </div>
  );
};

export default VendorProfilePage;