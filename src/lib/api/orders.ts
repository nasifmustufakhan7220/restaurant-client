export const getOrdersByUserId = async (userId: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/get-orders/${userId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch orders for ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}