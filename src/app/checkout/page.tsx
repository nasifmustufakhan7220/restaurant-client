import { Suspense } from "react";
import FirstCheckout from "./_component/FirstCheckout";


export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {


  return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            <FirstCheckout searchParams={searchParams} />
        </Suspense>
    </div>
  );
}
