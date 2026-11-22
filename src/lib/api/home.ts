export const getSixHomeData = async()=>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/home/get-six-menu`);
       if (!response.ok) {
            throw new Error(`Failed to fetch six home data: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching home data:', error);
        throw error;
    }
}



export const getPublicItemDetails = async (id: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/home/get-menu-details/${id}`, { cache: "force-cache" });
        if (!response.ok) {
            throw new Error(`Failed to fetch public item details: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching public item details:', error);
        throw error;
    }
}