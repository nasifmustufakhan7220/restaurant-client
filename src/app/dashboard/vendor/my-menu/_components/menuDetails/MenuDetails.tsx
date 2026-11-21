import React from 'react';

const MenuDetails = async ({ params }: { params:Promise<{ id: string }> }) => {
    const { id } = await params;
    console.log('MenuDetails id:', id);
    return (
        <div>
            
        </div>
    );
};

export default MenuDetails;