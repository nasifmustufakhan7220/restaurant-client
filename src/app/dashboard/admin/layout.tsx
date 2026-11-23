import { requireRole } from '@/lib/api/servers';
import React, { Suspense } from 'react';
async function AdminGuard() {
  await requireRole("admin")
  return null
}
const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Suspense fallback={<div className="h-16" />}>
                <AdminGuard />
            </Suspense>
                {children}
        </div>
    );
};

export default AdminLayout;