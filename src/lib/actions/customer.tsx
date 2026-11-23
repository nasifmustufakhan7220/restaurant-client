"use server"
import { authDelete, authPost } from "../api/servers";
import { OrderFormData } from "../types/order";

export const createOrder = async (orderData: OrderFormData) => {
    try {
        const response = await authPost(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/add-order`,"POST", orderData)

        if (!response.ok) {
            throw new Error("Failed to create order");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
}



export const deleteOrder = async (id: string) => {
    try {
        const response = await authDelete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/delete-order/${id}`)

        if (!response.ok) {
            throw new Error("Failed to delete order");
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
}