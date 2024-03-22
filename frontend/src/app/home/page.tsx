"use client"
import SnackSearch from "./components/SnackSearch";
import SnackList from "./components/SnackList";
import HomeHeader from "./components/HomeHeader";
import RecommendedSnacks from "./components/RecommendedSnacks";

import { useEffect,useState } from "react";
import { useAppDispatch } from "@/store";
import { setAccount } from "@/store/slices/loginUser.slice";
import { setToken } from "@/store/slices/loginUser.slice";
import { setReloading } from "@/store/slices/reload.slice";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Home() {
	const dispatch=useAppDispatch()
	const totalPages = useSelector((state: RootState) => state.snackResult.totalPages);
	const [currentPage, setCurrentPage] = useState(1); 

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

	useEffect(()=>{
		setCurrentPage(1)
	},[totalPages])

	const handlePageChange = async (pageNumber:number) => {
		if (pageNumber <= 0) {
			return; 
		}

		if (pageNumber > totalPages) {
			return; 
		}
		dispatch(setReloading(true));
		await setCurrentPage(pageNumber);
		dispatch(setReloading(false));
	};

	return (
		<div className=" h-screen bg-white">
			<div className="bg-gradient-to-r from-purple-500 to-pink-500 ">
				<HomeHeader />
				<SnackSearch page={currentPage}/>
			</div>
			<div className="mt-96 max-md:mt-60  h-screen flex-grow flex flex-col items-center ">
				{/* recommend */}
				<RecommendedSnacks />

				{/* pagination */}
				<div className="join m-2">
                    <button className="join-item btn btn-sm" onClick={() => handlePageChange(currentPage - 1)}>«</button>
                    <select className="join-item btn btn-sm" value={currentPage} onChange={(e) => handlePageChange(Number(e.target.value))}>
						{Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
							<option key={page} value={page}>Page {page}</option>
						))}
					</select>
					<button className="join-item btn btn-sm" onClick={() => handlePageChange(currentPage + 1)}>»</button>
                </div>
				
				{/* result snack search */}
				<SnackList/>

				{/* pagination */}
				<div className="join m-2">
                    <button className="join-item btn btn-sm" onClick={() => handlePageChange(currentPage - 1)}>«</button>
                    <select className="join-item btn btn-sm" value={currentPage} onChange={(e) => handlePageChange(Number(e.target.value))}>
						{Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
							<option key={page} value={page}>Page {page}</option>
						))}
					</select>
					<button className="join-item btn btn-sm" onClick={() => handlePageChange(currentPage + 1)}>»</button>
                </div>
			</div>
		</div>
	);
}