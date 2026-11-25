import React, { Suspense } from 'react';
import FirstProfilePage from './_components/FirstProfilePage';

const VendorProfilePage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <FirstProfilePage/>
            </Suspense>
        </div>
    );
};

export default VendorProfilePage;