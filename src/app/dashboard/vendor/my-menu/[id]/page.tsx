import React, { Suspense } from 'react';
import MenuDetails from '../_components/menuDetails/MenuDetails';

const MenuDetailsPage = ({ params }: { params:Promise<{ id: string }> }) => {

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <MenuDetails params={params} />
            </Suspense>
        </div>
    );
};

export default MenuDetailsPage;