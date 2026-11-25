"use server"
import type { MenuItemData } from "@/lib/types/menu-item";
import { authDelete, authPost } from "../api/servers";

export const createMenuPost = async (data:MenuItemData) => {

  const res = await authPost(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/add-menu`, "POST", data);

  if (!res.ok) {
    throw new Error("Failed to create menu");
  }

  return await res.json();
};


export const updateMenuPost = async (id: string, data: MenuItemData) => {
  try{

    const res = await authPost(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/update-menu/${id}`,"PATCH", data)

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
    const res = await authDelete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/delete-menu/${id}`);
    if (!res.ok) {
      throw new Error("Failed to delete menu");
    }
    return await res.json();
  } catch (error) {
    console.error("Error deleting menu item:", error);
  }
}

export const updateCustomerOrderStatus = async (orderId: string, status: string) => {
  try {
    const res = await authPost(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/order-status-update/${orderId}`,"PATCH",{ orderStatus: status })

    if (!res.ok) {
      throw new Error(`Failed to fetch orders: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating customer order status:", error);
  }
}

export const updateVendorProfile = async(id:string, data:{ name: string; image: string })=>{
  try{
    const res = await authPost(`${process.env.NEXT_PUBLIC_API_BASE_URL}/vendor/${id}/profile`, "PATCH", data);
    if(!res.ok){
      throw new Error(`Failed to update vendor profile: ${res.status}`);
    }
    return res.json();
  }catch(error){
    console.error("Error updating vendor profile:", error);
    return null;
  }
}