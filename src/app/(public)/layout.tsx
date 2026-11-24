import Navbar from '@/components/Navbar/Navbar';
import React, { Suspense } from 'react';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Suspense fallback={<div className="h-16" />}>
            
                <Navbar/>
            </Suspense>
            {children}
        </div>
    );
};

export const dynamic = "force-dynamic";

export default PublicLayout;