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


export const getMenuDetails = async (id:string)=>{
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/vendor/menu-details/${id}`,
    );
    if (!res.ok) {
      throw new Error("Failed to fetch menu details");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching menu details:", error);
  }
}
