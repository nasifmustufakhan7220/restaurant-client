import { Suspense } from "react";
import UserDetailsFirst from "../../_components/UserDetailsFirst";
import UserDetailsSkeleton from "../../_components/UserDetailsSkeleton";

const UserDetailsPage = async ({ params }: { params:Promise<{ id: string }> }) => {
  return(
    <div>
      <Suspense fallback={<UserDetailsSkeleton />}>
        <UserDetailsFirst params={params} />
      </Suspense>
    </div>
  )
};

export default UserDetailsPage;