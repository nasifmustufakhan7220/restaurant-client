export const getSixHomeData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home/get-six-menu`, {
            cache: "no-store",
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch six home data: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching home data:', error);
        return [];
    }
}



export const getPublicItemDetails = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home/get-menu-details/${id}`, {
            cache: "no-store",
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch public item details: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching public item details:', error);
        return null;
    }
}