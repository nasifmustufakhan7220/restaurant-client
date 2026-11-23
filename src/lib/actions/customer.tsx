import { OrderFormData } from "../types/order";

export const createOrder = async (orderData: OrderFormData) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/customer/add-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error("Failed to create order");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
}