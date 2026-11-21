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
      throw new Error("Failed to update menu item status");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating menu item status:", error);
    throw error;
  }
};