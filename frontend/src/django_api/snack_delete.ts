import { BACKEND_ENDPOINT } from "@/config/envs";

export const snackHide= async (snack_id:number,token:string)=>{
    const response = await fetch(`${BACKEND_ENDPOINT}/snack/hide/${snack_id}/`, {
        method: 'PATCH',
        headers: {
            "content-type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({})
    });
    return response;
}