export const snackHide= async (snack_id:number,token:string)=>{
    const response = await fetch(`http://localhost:8000/snack/hide/${snack_id}/`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({})
    });
    console.log("Delete Response",response)
    return response;
}