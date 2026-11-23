import { authFetch } from "./servers";

export const getOrdersByUserId = async (userId: string) => {
    try {
        const res = await authFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/get-orders/${userId}`)
        if (!res.ok) {
            throw new Error(`Failed to fetch orders for ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}