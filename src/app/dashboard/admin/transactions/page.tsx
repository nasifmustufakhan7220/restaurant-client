
// ---------------------------------------------------------------
// 6) The page
// ---------------------------------------------------------------

import { Suspense } from "react";
import FirstTranjactions from "../../_components/FirstTranjactions";

const TransactionsPage = () => {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 ">
      <div className = "mb-6">
        <h1 className="text-2xl font-bold text-foreground ">Transactions</h1>
        <p className="mt-1 text-text-secondary">
          See the subscription payments made by vendors. Payment records cannot be edited.
        </p>
      </div>

      <Suspense fallback={<p className="text-text-secondary">Loading transactions...</p>}>
        <FirstTranjactions/>
      </Suspense>
    </div>
  );
};

export default TransactionsPage;