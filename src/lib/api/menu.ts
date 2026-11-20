export const getMenuItems = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/${id}/my-menu`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch menu items");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching menu items:", error);
  }
};
