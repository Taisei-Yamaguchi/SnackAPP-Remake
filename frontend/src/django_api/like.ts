export const toggleLike= async (snack_id:number)=>{
    const response = await fetch(`http://localhost:8000/like/${snack_id}/`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({})
    });

    return response.json();
}