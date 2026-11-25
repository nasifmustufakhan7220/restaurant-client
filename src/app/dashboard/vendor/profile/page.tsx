import React, { Suspense } from 'react';
import FirstProfilePage from './_components/FirstProfilePage';
import ProfileSkeleton from '../../customer/profile/_components/Skeleton';

const VendorProfilePage = () => {
    return (
        <div>
            <Suspense fallback={<ProfileSkeleton/>}>
                <FirstProfilePage/>
            </Suspense>
        </div>
    );
};

export default VendorProfilePage;