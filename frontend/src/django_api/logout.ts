"use server"
import { BACKEND_ENDPOINT } from "@/config/envs";

export const logout= async (token:string|undefined)=>{
    if(token===undefined){
        return {"error":"Token is required!"}
    }
    const response = await fetch(`${BACKEND_ENDPOINT}/accounts/logout/`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Authorization": `Token ${token}` 
        },
        body: JSON.stringify({})
    });

    return response.json();
}