export const getAllActiveMenuItems = async (query=" ")=>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/browse/get-all-menu?${query}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch active menu items: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching active menu items:", error);
        throw error;
    }
}