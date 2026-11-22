

export const getAllUsers = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get-all-users`);
        if (!response.ok) {
            throw new Error(`Failed to fetch all users: ${response.status}`);
        }
        const users = await response.json();
        return users;

    } catch (error) {
        console.error("Error fetching all users:", error);
        throw error;
    }
}


export const getUserDetails = async (id: string) => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get-user-details/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch user details: ${response.status}`);
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
}


export const getAllMenuItems = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get-all-menu`);
        if (!response.ok) {
            throw new Error(`Failed to fetch all menu items: ${response.status}`);
        }
        const menuItems = await response.json();
        return menuItems;
    } catch (error) {
        console.error("Error fetching all menu items:", error);
        throw error;
    }
}