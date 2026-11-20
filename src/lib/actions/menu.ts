export const createMenuPost = async(data)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/vendor/add-menu`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to create menu");
    }

    return await res.json();
}