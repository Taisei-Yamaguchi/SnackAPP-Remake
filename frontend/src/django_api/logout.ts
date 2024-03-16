"use server"
export const logout= async (token:string|undefined)=>{
    if(token===undefined){
        return {"error":"Token is required!"}
    }
    const response = await fetch(`http://localhost:8000/accounts/logout/`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": `Token ${token}` 
        },
        body: JSON.stringify({})
    });

    return response.json();
}