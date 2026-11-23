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
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
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
    throw error;
  }
}