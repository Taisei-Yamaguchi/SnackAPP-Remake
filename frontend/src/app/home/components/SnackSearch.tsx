"use client"
import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '@/store';
import { setSnackResult } from '@/store/slices/snackResult.slice';
import { useAppSelector } from '@/store';
import { snackSearch } from '@/django_api/snack_search';

const SnackSearch = () => {
    const dispatch = useAppDispatch();
    const reloading = useAppSelector((state:RootState)=>state.reloadSlice.reloading)

    const [keyword, setKeyword] = useState('');
    const [maker, setMaker] = useState('');
    const [order, setOrder] = useState('');
    const [sort, setSort] = useState('');
    const [type, setType] = useState('');
    const [country, setCountry] = useState('');

    useEffect(()=>{
        handleSearch()
    },[reloading])

    const handleSearch = async () => {
        const keywordParam = keyword !== '' ? `keyword=${keyword}` : '';
        const makerParam = maker !== '' ? `maker=${maker}` : '';
        const orderParam = order !== '' ? `order=${order}` : '';
        const sortParam = sort !== '' ? `sort=${sort}` : '';
        const typeParam = type !== '' ? `type=${type}` : '';
        const countryParam = country !== '' ? `country=${country}` : '';

        const queryParams = [keywordParam, makerParam, orderParam, sortParam, typeParam, countryParam].filter(param => param !== '').join('&');
        const query = queryParams ? `?${queryParams}` : '';
        // console.log('queryparams', query);

        // API request
        try {
			// dispatch(setReloading(true)); // reloading true
			const data= await snackSearch(query)
            dispatch(setSnackResult(data))
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
            // dispatch(setReloading(false)); // reloading false
		}
    };

    return (
        <div className="bg-pink-100 m-2 p-1 h-[300px] rounded flex justify-evenly ">
            <div className=" w-3/4">
                <div className=' w-full'>
                    <label className="w-full input input-sm input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Keyword" value={keyword} onChange={e => setKeyword(e.target.value)} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>
                    <label className="w-full input input-sm input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Maker" value={maker} onChange={e => setMaker(e.target.value)} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>

                    <select className="select select-bordered select-sm w-1/2 max-w-xs" value={order} onChange={e => setOrder(e.target.value)}>
						<option value="">Order</option>
						<option value="price_asc">Reasnable</option>
						<option value="price_desc">Expensive</option>
                        <option value="popularity">Popularity</option>
						<option value="random">Random</option>
					</select>
					<select className="select select-bordered select-sm w-1/2 max-w-xs" value={sort} onChange={e => setSort(e.target.value)}>
						<option value="">Sort</option>
						<option value="maker">Maker</option>
						<option value="type">Type</option>
						<option value="name">Name</option>
					</select>
					<select className="select select-bordered select-sm w-1/2 max-w-xs" value={country} onChange={e => setCountry(e.target.value)}>
						<option value="">Country</option>
						<option value="japan">Japan</option>
						<option value="canada">Canada</option>
						<option value="other">Other</option>
					</select>
					<select className="select select-bordered select-sm w-1/2 max-w-xs" value={type} onChange={e => setType(e.target.value)}>
						<option value="">Type</option>
						<option value="snack">Snack</option>
						<option value="chocolate">Chocolate</option>
						<option value="cookie">Cookie</option>
                        <option value="senbei">Senbei</option>
						<option value="candy">Candy,Gumi,Ramune etc</option>
					</select>

                </div>

                <button onClick={handleSearch} className="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-7 h-7 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                </button>
            </div>
            <div className="border w-1/3">
                
            </div>
            
        </div>
    );
}

export default SnackSearch;
