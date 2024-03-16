'use client';

import { use, useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";

const HomeHeader = () => {
	//* Get login User from cookie
	const [loginUser, setLoginUser] = useState<{account:{id:number,username:string},token:string}|null>(null);
	const reloading = useAppSelector((state:RootState)=>state.reloadSlice.reloading)

    useEffect(() => {
        const fetchLoginUser = async () => {
            try {
                const response = await fetch("/api/auth");
                if (response.ok) {
                    const data = await response.json();
                    setLoginUser(data);
                } else {
                    console.error("Failed to fetch login user");
                }
            } catch (error) {
                console.error("Error fetching login user:", error);
            }
        };

        fetchLoginUser();
    }, [reloading]);

	useEffect(()=>{
		console.log("loginUser",loginUser)
	},[loginUser])
    
	return (
		<header className="fixed pt-2 top-0 left-0 right-0 z-50 h-14 flex w-full items-center justify-between border-b border-gray-200 bg-pink-500 p-2">
			<div className="flex items-center space-x-2">
				<button type="button" className="text-3xl asideOpen">
					<i className="bx bx-menu"></i>
				</button>
				<div className="font-bold text-white">SnackApp</div>
			</div>

			<div>
			{loginUser && loginUser.account && loginUser.account.id && loginUser.account.username ? (
				<div>
					{loginUser.account.username}
					<LogoutButton />
				</div>
			) : (
				<div>
					<button><a href="/login">Login</a></button>
				</div>
			)}
			</div>
		</header>
	);
};

export default HomeHeader;
