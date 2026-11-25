import React, { Suspense } from 'react';
import MenuDetails from '../_components/menuDetails/MenuDetails';
import MenuItemDetailsSkeleton from '../_components/VendorItemDetailsSkeleton';

const MenuDetailsPage = ({ params }: { params:Promise<{ id: string }> }) => {

    return (
        <div>
            <Suspense fallback={<MenuItemDetailsSkeleton/>}>
                <MenuDetails params={params} />
            </Suspense>
        </div>
    );
};

export default MenuDetailsPage;