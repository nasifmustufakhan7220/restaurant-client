import { notFound } from "next/navigation";

export const updateMenuItemStatus = async (id: string, newStatus: "Approved" | "Rejected" | "Pending") => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/update-menu/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!response.ok) {
      notFound()
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating menu item status:", error);
    throw error;
  }
};


export const deleteMenuItem = async (id: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/delete-menu/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      notFound()
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};