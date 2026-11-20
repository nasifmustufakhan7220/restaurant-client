export interface MenuItemData {
  _id?: string;
  itemName: string;
  category: string;
  description: string;
  price: string;
  location: string;
  images: string[];
  status: "Approved" | "Pending" | "Rejected" | "Inactive";
  vendorId: string;
  isAvailable: boolean;
}

export const createMenuPost = async (data:MenuItemData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/add-menu`,
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
