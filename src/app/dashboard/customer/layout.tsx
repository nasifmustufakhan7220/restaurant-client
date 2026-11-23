import { requireRole } from '@/lib/api/servers';
import React, { Suspense } from 'react';
async function CustomerGuard() {
  await requireRole("customer")
  return null
}
const CustomerLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Suspense fallback={<div className="h-16" />}>
                <CustomerGuard />
            </Suspense>
                {children}
        </div>
    );
};

export default CustomerLayout;