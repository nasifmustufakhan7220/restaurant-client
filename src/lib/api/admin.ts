import { notFound } from "next/navigation";

export const getAllUsers = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/get-all-users`);
        if (!response.ok) {
            notFound()
        }
        const users = await response.json();
        return users;

    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
}