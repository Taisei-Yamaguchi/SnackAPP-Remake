'use client';

import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import PostSnack from './PostSnack';

const HomeHeader = () => {
	//* Get login User from cookie
	const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const [rightMenuOpen, setRightMenuOpen] = useState(false);
	
	const toggleRightMenu = () => {
		setRightMenuOpen(!rightMenuOpen);
	};

	return (
		<header className="bg-gradient-to-r from-red-500 to-pink-500 fixed pt-2 top-0 left-0 right-0 z-50 h-14 flex w-full items-center justify-between p-2">
			{/* left menu */}
			<div className="flex items-center space-x-2">
				<button type="button" className="text-base asideOpen">
                    <a href="/home" className="font-bold text-white">SnackApp</a>
				</button>
			</div>

			{/* center menu */}
			<PostSnack />

			{/* right menu */}
			<div>
			{account ? (
				<>
					<button
						type="button"
						className="badge badge-ghost"
						onClick={toggleRightMenu}
					>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
					</button>

					<div
						className={`${rightMenuOpen ? "" : "hidden"
							} absolute right-2 mt-1 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md`}
						x-show="profileOpen"
						x-transition="true"
					>
				
					<div className="flex flex-col space-y-3 p-1">
						<div className="text-sm transition hover:text-blue-600">{account.username}</div>
					</div>
					{/* <div className="flex flex-col space-y-3 p-2">
						<div className="text-sm transition hover:text-blue-600">{account.language}</div>
					</div> */}
				
					<div className="p-2">
						<div className="flex items-center space-x-2 transition hover:text-blue-600">
							<svg
								className="h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
								/>
							</svg>
							<LogoutButton />
						</div>
						</div>
					</div>
				</>
				):(
					<a href ='/login' className="badge badge-ghost">Login</a>
				)}
			</div>
		</header>
	);
};

export default HomeHeader;
