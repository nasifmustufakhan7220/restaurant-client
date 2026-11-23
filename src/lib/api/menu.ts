export const getMenuItems = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/${id}/my-menu`,
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch menu items: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching menu items:", error);
  }
};

export const getMenuDetails = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/menu-details/${id}`,
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch menu details: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching menu details:", error);
  }
};


export const getOrders = async (email: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/get-orders/${email}`,
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch orders: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}