
import { getSession } from "@/lib/api/servers";
import { getCustomerProfile } from "@/lib/api/orders";
import UpdateForm from "./UpdateForm";

const CustomerProfilePage = async () => {
  const session = await getSession();
  const user = await getCustomerProfile(session?.user?.id as string);


  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
        <p className="mt-1 text-text-secondary">Update your name and photo.</p>
      </div>

      <UpdateForm id={session?.user.id as string} email={session?.user.email as string} name={user.name as string} user={user.image} />
    </div>
  );
};

export default CustomerProfilePage;
