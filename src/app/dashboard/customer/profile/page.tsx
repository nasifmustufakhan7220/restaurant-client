import React, { Suspense } from 'react';
import FirstProfilePageCustomer from './_components/FirstProfilePageCustomer';
import ProfileSkeleton from './_components/Skeleton';

const CustomerProfilePage = () => {
    return (
        <div>
            <Suspense fallback={<ProfileSkeleton/>}>
                <FirstProfilePageCustomer />
            </Suspense>
        </div>
    );
}

export default CustomerProfilePage;