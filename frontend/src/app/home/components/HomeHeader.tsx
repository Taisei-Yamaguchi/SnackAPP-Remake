'use client';

import { use, useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";

const HomeHeader = () => {
	//* Get login User from cookie
	const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token)
	// const reloading = useAppSelector((state:RootState)=>state.reloadSlice.reloading)

	useEffect(()=>{
		console.log("loginUser Redux:",account,token)
	},[account,token])
    
	return (
		<header className="fixed pt-2 top-0 left-0 right-0 z-50 h-14 flex w-full items-center justify-between border-b border-gray-200 bg-pink-500 p-2">
			<div className="flex items-center space-x-2">
				<button type="button" className="text-3xl asideOpen">
					<i className="bx bx-menu"></i>
				</button>
				<div className="font-bold text-white">SnackApp</div>
			</div>

			<div>
			{account? (
				<div>
					{account.username}
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
