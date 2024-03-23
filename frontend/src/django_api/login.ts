"use server"
import { BACKEND_ENDPOINT } from "@/config/envs";
import { UserData } from "@/interfaces/index";

export const login= async (userData: UserData)=>{
    const response = await fetch(`${BACKEND_ENDPOINT}/accounts/login/`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(userData)
    });

    return response.json();
}