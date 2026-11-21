import React from 'react';
import MenuDetailsCard from './MenuDetailsCard';
import { getMenuDetails } from '@/lib/api/menu';

const MenuDetails = async ({ params }: { params:Promise<{ id: string }> }) => {
    const { id } = await params;
    const result = await getMenuDetails(id);
    return (
        <div>
            <MenuDetailsCard menu={result} />
        </div>
    );
};

export default MenuDetails;