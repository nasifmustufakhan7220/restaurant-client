"use server"
import { authFetch } from "./servers";

export const getMenuItems = async (id: string) => {
  try {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/${id}/my-menu`)
    if (!res.ok) {
      throw new Error(`Failed to fetch menu items: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
};

export const getMenuDetails = async (id: string) => {
  try {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/menu-details/${id}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch menu details: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching menu details:", error);
    return null;
  }
};


export const getOrders = async (email: string) => {
  try {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/get-orders/${email}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch orders: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}

export const getMenuItemCount = async (query=" ") : Promise<{count: number}>=>{
  try{
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/menu-count?${query}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch menu item count: ${res.status}`);
    }
    return res.json();
  }catch (error) {
    console.error("Error fetching menu item count:", error);
    return { count: 0 };
  }
}


export const getPremiumVendor = async (id: string) => {
  try {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/${id}/premium`)
    if (!res.ok) {
      throw new Error(`Failed to fetch premium vendor: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching premium vendor:", error);
    return null;
  }
}


export const getVendorProfile = async (id: string) => {
  try {
    const res = await authFetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/${id}/profile`);
    if (!res.ok) {
      throw new Error(`Failed to fetch vendor profile: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching vendor profile:", error);
    return null;
  }
}