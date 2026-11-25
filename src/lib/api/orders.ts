"use server"
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
        return [];
    }
}



export const getCustomerProfile = async (userId: string) => {
    try {
        const res = await authFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/${userId}/profile`)
        if (!res.ok) {
            throw new Error(`Failed to fetch customer profile for ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching customer profile:", error);
        return null;
    }
}


export const vendorOrCustomer = async (userId: string) => {
    try {
        const res = await authFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/${userId}/customer-vendor`);
        if (!res.ok) {
            throw new Error(`Failed to fetch user role for ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error("Error fetching user role:", error);
        return null;
    }
}