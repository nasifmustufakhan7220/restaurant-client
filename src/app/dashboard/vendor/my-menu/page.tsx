import { Suspense } from "react";
import MenuItemsHeader from "./_components/MenuItemsHeader";


import FirstPageOfMyMenu from "./_components/firstPageoFMyMenu";
import MenuCardSkeleton from "@/app/(public)/browse/_components/MenuCardSkeleton";

const MyMenuPage = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 lg:gap-6">
      <MenuItemsHeader />
      

      <Suspense fallback={<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <MenuCardSkeleton key={n} />
                  ))}
                </div>}>
        <FirstPageOfMyMenu />
      </Suspense>
    </div>
  );
};

export default MyMenuPage;
