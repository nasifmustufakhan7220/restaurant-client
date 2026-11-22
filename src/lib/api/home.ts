import { notFound } from "next/navigation";

export const getSixHomeData = async()=>{
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/home/get-six-menu`);
        if (!response.ok) {
            notFound()
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching home data:', error);
        throw error;
    }
}