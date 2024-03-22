"use client"
import { useState } from "react";
import { useAppDispatch } from "@/store";
import { useRouter } from 'next/navigation';
import { setAccount } from "@/store/slices/loginUser.slice";
import { setToken } from "@/store/slices/loginUser.slice";
import clsx from "clsx";

const LogoutButton=()=>{
    const dispatch = useAppDispatch()
    const router = useRouter();
    const [ toast, setToast ] = useState({
        message: "",
        type: "",
    });

    const handleLogout = async () => {
        
        // request to next server
        try {
            setToast({  message: "Logout processing", type: 'load' });
            const response = await fetch("/api/logout", { method: "DELETE" });
            if (response.ok) {
                console.log("Logged out successfully");
                
                document.cookie = "loginId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "loginUsername=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                dispatch(setAccount(null));
                dispatch(setToken(null));
                router.push('/login');
            } else {
                console.error("Failed to logout");
                setToast({  message: "Logout Failed!", type: 'error' });
            }
        } catch (error) {
            console.error("Error while logging out:", error);
            setToast({  message: "Logout Failed!", type: 'error' });
        } 
    };
    return(
        <>
        {toast.message && (
			<div className={
				clsx(`fixed z-[100] top-5 right-5 w-fit text-white text-lg px-5 py-3 rounded-md mb-5 `,
				    {
					    "bg-red-500": toast.type === "error",
						"bg-green-500": toast.type === "load",
					}
				)}>
                    {toast.type==="load"?(
                        <>{toast.message}
                        <span className="loading loading-dots loading-lg"></span>
                        </>
                    ):(
                    <>{toast.message}</>
                    )}
			</div>)}
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}
export default LogoutButton