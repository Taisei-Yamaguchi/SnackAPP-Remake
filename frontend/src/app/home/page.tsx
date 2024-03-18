"use client"
import SnackSearch from "./components/SnackSearch";
import SnackList from "./components/SnackList";
import HomeHeader from "./components/HomeHeader";
import RecommendedSnacks from "./components/RecommendedSnacks";

import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { setAccount } from "@/store/slices/loginUser.slice";
import { setToken } from "@/store/slices/loginUser.slice";


export default function Home() {
	const dispatch=useAppDispatch()
	useEffect(() => {
        const fetchLoginUserFromCookie = async () => {
            try {
                // get loginUserInfo from cookie
				const response = await fetch("/api/auth");
				if (response.ok) {
                    const data = await response.json();
					dispatch(setAccount(data.account));
                	dispatch(setToken(data.token));
                } else {
                    console.error("Failed to fetch login user");
					dispatch(setAccount(null));
                	dispatch(setToken(null));
                }
            } catch (error) {
                console.error('Error fetching login user from cookie:', error);
            }
        };
        fetchLoginUserFromCookie();
    }, []); 

	return (
		<div className="bg-pink-100 h-screen">
			<div className="bg-pink-100">
				<HomeHeader />
				<SnackSearch />
				<RecommendedSnacks />
			</div>
			<div className="mt-64 pt-20 overflow-y-auto flex-grow bg-pink-50">
				<SnackList />
			</div>
		</div>
	);
}