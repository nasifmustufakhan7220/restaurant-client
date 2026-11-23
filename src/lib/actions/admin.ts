"use server"
import { authDelete, authPost } from "../api/servers";


export const updateMenuItemStatus = async (id: string,newStatus: "Approved" | "Rejected" | "Pending") => {
  try {

    const response = await authPost(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/update-menu/${id}`, "PATCH", { status: newStatus });
    if (!response.ok) {
      throw new Error(`Failed to update menu item status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating menu item status:", error);
    throw error;
  }
};

export const deleteMenuItem = async (id: string) => {
  try {
    const response = await authDelete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/delete-menu/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to delete menu item: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};
