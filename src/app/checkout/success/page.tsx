import { Suspense } from "react";
import FirstSuccess from "../_component/FirstSuccess";
import FirstSuccessSkeleton from "../_component/SuccessSkeleton";




export default async function CheckoutSuccess({ searchParams }: {searchParams: Promise<{ session_id?: string }>}) {
  
    return (
      <div>
        <Suspense fallback={<FirstSuccessSkeleton />}>
            <FirstSuccess searchParams={searchParams} />
        </Suspense>
      </div>
    )
}