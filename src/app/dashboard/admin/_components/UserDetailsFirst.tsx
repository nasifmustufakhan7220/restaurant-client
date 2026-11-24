import { connection } from "next/server";
import { getUserDetails } from "@/lib/api/admin";
import { userDetailsPlaceholder } from "./user-details-data";
import UserAccountCard from "./UserAccountCard";
import UserBusinessCard from "./UserBusinessCard";
import UserDetailsHeader from "./UserDetailsHeader";
import UserInfoCard from "./UserInfoCard";
import UserSummaryCards from "./UserSummaryCards";


const UserDetailsFirst = async ({ params }: { params:Promise<{ id: string }> }) => {
    await connection();
    const { id } = await params;
    console.log(id);
    const userResult = await getUserDetails(id);
    console.log(userResult);
  const user =userDetailsPlaceholder ;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
      <UserDetailsHeader user={userResult} />

      <UserSummaryCards summary={user.summary} />

      {/* Mobile and tablet: one column. Desktop ("lg"): two columns, left is wider (3:2) */}
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-6">
        <UserInfoCard user={userResult} />

        <div className="grid gap-4">
          {/* The business card is only for vendors */}
          {user.role === "vendor" && <UserBusinessCard user={userResult} />}
          <UserAccountCard user={user} />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsFirst;