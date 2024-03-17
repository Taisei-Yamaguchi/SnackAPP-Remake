"use client"
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import { setReloading } from "@/store/slices/reload.slice";
import { useRouter } from 'next/navigation';

const LogoutButton=()=>{
    const dispatch = useAppDispatch()
    const router = useRouter();
    const handleLogout = async () => {
        
        // request to next server
        try {
            const response = await fetch("/api/logout", { method: "DELETE" });
            if (response.ok) {
                console.log("Logged out successfully");
                
                document.cookie = "loginId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "loginUsername=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                router.push('/login');
            } else {
                console.error("Failed to logout");
            }
        } catch (error) {
            console.error("Error while logging out:", error);
        } 
    };
    return(
        <button onClick={handleLogout}>Logout</button>
    )
}
export default LogoutButton