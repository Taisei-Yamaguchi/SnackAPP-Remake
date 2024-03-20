"use server"
import { UserData } from "@/interfaces/index";
export const login= async (userData: UserData)=>{
    const response = await fetch(`http://localhost:8000/accounts/login/`, {
        method: 'POST',
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(userData)
    });

    return response.json();
}