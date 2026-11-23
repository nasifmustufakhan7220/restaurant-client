import { requireRole } from '@/lib/api/servers';
import React, { Suspense } from 'react';
async function VendorGuard() {
  await requireRole("vendor")
  return null
}
const VendorLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Suspense fallback={<div className="h-16" />}>
                <VendorGuard />
            </Suspense>
            {children}
        </div>
    );
};

export default VendorLayout;