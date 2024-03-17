export const toggleLike= async (snack_id:number,token:string)=>{
    const response = await fetch(`http://localhost:8000/like/${snack_id}/`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({})
    });

    return response.json();
}