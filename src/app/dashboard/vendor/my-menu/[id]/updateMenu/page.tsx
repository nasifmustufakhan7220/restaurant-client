import React, { Suspense } from "react";
import UpdateMenu from "../../_components/updateMenu/UpdateMenu";

const UpdateMenuPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <div>
      {/* ============ Heading ============ */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Update Menu
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Update your menu item details below. Your changes will be reviewed by
          an admin before they are reflected on the menu.
        </p>
      </div>
      <Suspense
        fallback={null}
      >
        <UpdateMenu params={params} />
      </Suspense>
    </div>
  );
};

export default UpdateMenuPage;
