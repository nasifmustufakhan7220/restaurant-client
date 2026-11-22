import { Suspense } from "react";
import PublicDetailsCard from "../_components/PublicDetailsCard";
import ItemDetailsSkeleton from "../_components/ItemDetailsSkeleton";

interface ItemDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicMenuPage({ params }: ItemDetailsPageProps) {

  return (
    <Suspense fallback={<ItemDetailsSkeleton/>}>
        <PublicDetailsCard params={params} />
    </Suspense>
  );
}