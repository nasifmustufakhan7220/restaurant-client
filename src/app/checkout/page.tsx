import { Suspense } from "react";
import FirstCheckout from "./_component/FirstCheckout";
import CheckoutSkeleton from "./_component/CeckoutPageSkeleton";


export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {


  return (
    <div>
        <Suspense fallback={<CheckoutSkeleton/>}>
            <FirstCheckout searchParams={searchParams} />
        </Suspense>
    </div>
  );
}
