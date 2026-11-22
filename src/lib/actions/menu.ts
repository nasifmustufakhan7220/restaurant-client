export interface MenuItemData {
  _id?: string;
  itemName: string;
  category: string;
  description: string;
  price: string;
  location: string;
  images: string[];
  status: "Approved" | "Pending" | "Rejected";
  vendorId: string;
  vendorEmail: string;
  isAvailable: boolean;
  createdDate: string;
  vendorName?: string;
}

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
