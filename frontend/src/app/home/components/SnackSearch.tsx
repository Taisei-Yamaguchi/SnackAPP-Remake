"use client"
import React, { FC, useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '@/store';
import { setSnackResult } from '@/store/slices/snackResult.slice';
import { useAppSelector } from '@/store';
import { snackSearch } from '@/django_api/snack_search';
import { FaHeart } from 'react-icons/fa';
import { setTotalPages } from '@/store/slices/snackResult.slice';
import { setSearchLoad } from '@/store/slices/reload.slice';

type Props = {
    page: number;
};
const SnackSearch:FC<Props> = ({page}) => {
    const dispatch = useAppDispatch();
    const reloading = useAppSelector((state: RootState) => state.reloadSlice.reloading);
    const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token)
    const [keyword, setKeyword] = useState('');
    const [maker, setMaker] = useState('');
    const [order, setOrder] = useState('');
    const [type, setType] = useState('');
    const [country, setCountry] = useState('');

    const [onlyLike,setOnlyLike] = useState(false);
    const [onlyYouPost,setOnlyYouPost] = useState(false)
    const [onlyUsersPost,setOnlyUsersPost] = useState(false);

    useEffect(() => {
        handleSearch();
    }, [reloading,account,token,onlyLike,onlyUsersPost,onlyYouPost]);

    const handleSearch = async () => {
        const keywordParam = keyword !== '' ? `keyword=${keyword}` : '';
        const makerParam = maker !== '' ? `maker=${maker}` : '';
        const orderParam = order !== '' ? `order=${order}` : '';
        const typeParam = type !== '' ? `type=${type}` : '';
        const countryParam = country !== '' ? `country=${country}` : '';
        const onlyLikeParam = onlyLike ? `only_like=${onlyLike}`:'';
        const onlyYouPostParam = onlyYouPost ? `only_you_post=${onlyYouPost}`:'';
        const onlyUsersPostParam = onlyUsersPost ? `only_users_post=${onlyUsersPost}`:'';
        const pageParam = page ? `page=${page}`:'';
        const queryParams = [keywordParam, makerParam, orderParam, typeParam, countryParam,onlyLikeParam,onlyYouPostParam,onlyUsersPostParam,pageParam].filter(param => param !== '').join('&');
        const query = queryParams ? `?${queryParams}` : '';
        // API request
        try {
            dispatch(setSearchLoad(true))
            const data = await snackSearch(query,token);
            dispatch(setSnackResult(data.result));
            dispatch(setTotalPages(data.total_pages));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            dispatch(setSearchLoad(false))
        }
    };

        return (
        <div className="bg-gradient-to-r from-pink-400 to-white w-full fixed p-1 top-14 z-20  m-0 p-1 h-50 rounded flex justify-evenly border max-md:flex-col">
            <div className="w-3/4 max-md:w-full">
                <div className=' w-full flex flex-wrap items-center'>
                    <label className="w-full input input-sm input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Keyword" value={keyword} onChange={e => setKeyword(e.target.value)} />
                    </label>
                    <label className="w-full input input-sm input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Maker" value={maker} onChange={e => setMaker(e.target.value)} />
                    </label>

                    <select 
                        className={`select select-bordered select-sm w-1/4 max-md:w-1/3 max-w-xs ${
                            !order && 'text-gray-400' 
                        }`}
                        value={order} 
                        onChange={e => setOrder(e.target.value)}
                    >
						<option value="">Order</option>
						<option value="price_asc">Reasnable</option>
						<option value="price_desc">Expensive</option>
                        <option value="popularity">Popularity</option>
						<option value="random">Random</option>
					</select>
					
					<select 
                        className={`select select-bordered select-sm w-1/4 max-md:w-1/3 max-w-xs ${
                            !country && 'text-gray-400' 
                        }`}
                        value={country} 
                        onChange={e => setCountry(e.target.value)}
                    >
						<option value="">Country</option>
						<option value="Japan">Japan</option>
						<option value="Canada">Canada</option>
						<option value="Other">Other</option>
					</select>
					<select 
                        className={`select select-bordered select-sm w-1/4 max-md:w-1/3 max-w-xs ${
                            !type && 'text-gray-400' 
                        }`}
                        value={type} 
                        onChange={e => setType(e.target.value)}
                    >
						<option value="">Type</option>
						<option value="snack">Snack</option>
						<option value="chocolate">Chocolate</option>
						<option value="cookie">Cookie</option>
                        <option value="senbei">Senbei</option>
						<option value="candy">Candy,Gumi,Ramune etc</option>
                        <option value="other">Other</option>
					</select>

                    <button onClick={handleSearch} className="btn btn-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </button>
                </div>
            </div>
            <div className="w-1/3 max-md:flex max-md:justify-between max-md:justify-items-center ">
                {/* <PostSnack /> */}
                
                {/* snack you liked */}
                <div className="form-control text-sm btn btn-xs btn-warning">
                    <label className="cursor-pointer label w-full">
                    <input 
                            type="checkbox" 
                            className="checkbox checkbox-warning checkbox-xs w-full" 
                            checked={onlyLike}
                            onChange={(e) => setOnlyLike(e.target.checked)}  
                        />
                        <span className="label-text"><FaHeart/></span>
                    </label>
                </div>

                {/* snack you post */}
                <div className="form-control text-sm btn btn-xs btn-info">
                    <label className="cursor-pointer label w-full">
                    <input 
                            type="checkbox" 
                            className="checkbox checkbox-info checkbox-xs w-full" 
                            checked={onlyYouPost}
                            onChange={(e) => setOnlyYouPost(e.target.checked)}  
                        />
                        <span className="label-text">Yours</span>
                    </label>
                </div>

                {/* posted snacks */}
                <div className="form-control text-sm btn btn-xs btn-secondary ">
                    <label className="cursor-pointer label w-full">
                    <input 
                            type="checkbox" 
                            className="checkbox checkbox-secondary checkbox-xs" 
                            checked={onlyUsersPost}
                            onChange={(e) => setOnlyUsersPost(e.target.checked)}  
                        />
                        <span className="label-text">Post Snacks</span>
                    </label>
                </div>
            </div>
            
        </div>
    );
}


export default SnackSearch;
