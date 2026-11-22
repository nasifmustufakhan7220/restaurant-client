import type { MenuItemData } from "@/lib/types/menu-item";

export const createMenuPost = async (data:MenuItemData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/add-menu`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to create menu");
  }

  return await res.json();
};


export const updateMenuPost = async (id: string, data: MenuItemData) => {
  try{
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/update-menu/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to update menu");
    }

    return await res.json();

  }catch(error){
    console.error("Error updating menu item:", error);
  }
}


export const deleteMenuPost = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/delete-menu/${id}`,
      {
        method: "DELETE",
      },
    );
    if (!res.ok) {
      throw new Error("Failed to delete menu");
    }
    return await res.json();
  } catch (error) {
    console.error("Error deleting menu item:", error);
  }
}
