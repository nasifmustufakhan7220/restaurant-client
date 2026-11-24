export const checkoutVerify = async (sessionId: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/checkoutVerify`,{
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
        });
        return response.json();
    }catch (error) {
        console.error('Error verifying checkout session:', error);
    }
}