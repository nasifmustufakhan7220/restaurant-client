import { Suspense } from "react";
import FirstSuccess from "../_component/FirstSuccess";




export default async function CheckoutSuccess({ searchParams }: {searchParams: Promise<{ session_id?: string }>}) {
  
    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
            <FirstSuccess searchParams={searchParams} />
        </Suspense>
      </div>
    )
}