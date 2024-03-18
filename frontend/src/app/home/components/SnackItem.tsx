"use client"
import React, { FC,useState,useEffect } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { toggleLike } from '@/django_api/snack_like';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import DeleteSnack from './DeleteSnack';

type Snack = {
    id: number;
    tid: string;
    name: string;
    image: string;
    url: string;
    price: number;
    maker: string;
    type: string;
    liked: boolean;
    like_count: number;
    country: string;
    account: {id:number,username:string}|null
};

type Props = {
    snack: Snack;
};

const SnackItem: FC<Props> = ({ snack }) => {
    const router = useRouter();
    const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token)
	
    const dispatch = useAppDispatch()
    
    const handleLike = async (snackId:number) => {
        try {
            if (!account||!token) {
                router.push('/login');
                return;
            }
            dispatch(setReloading(true)); // reloading true
            const data =await toggleLike(snackId,token)
            console.log(data) 

        } catch (error) {
            console.error('Error updating text:', error);
        } finally {
            dispatch(setReloading(false)); // reloading false
        }
    };

    return (
        
        <li>
            <div className="card w-96 bg-base-100 shadow-xl m-1">
            <figure><img className="h-32" src={snack.image} alt={snack.name} /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {/* name */}
                    {snack.name}
                    {/* delete action */}
                    {account && snack.account && account.id===snack.account.id ?(
                    <DeleteSnack snack_id={snack.id}/>
                    ):(
                        <></>
                    )}
                </h2>
                <div className='flex justify-between'>
                    {/* like toggle */}
                    <button className="skeleton w-24 btn" onClick={()=>handleLike(snack.id)}>
                        { snack.liked ?(<FaHeart/>):(<FaRegHeart/>)}
                        <div className="badge">{snack.like_count}</div>
                    </button>
                    {/* type */}
                    <strong>{snack.type}</strong>
                    {/* url */}
                    <a className="text-xs link link-primary" href={snack.url}>more info</a>
                </div>
                
                
                <div className="card-actions justify-end">
                    {/* country */}
                    <div className="badge badge-outline">{snack.country}</div>
                    {/* price */}
                    <div className="badge badge-outline">
                        {snack.country==="Canada"?(
                            <>CA$</>
                        ):(
                            <>￥</>
                        )}
                        {snack.price >0 ? (
                            <>{snack.price}</>
                        ):(
                            <>?</>
                        )}
                        
                    </div> 
                    {/* maker */}
                    <div className="badge badge-outline">Maker: {snack.maker}</div>
                </div>
                {/* account or toriko info */}
                {snack.account&&(
                    <div className="text-xs">
                        Provided by: <strong> {snack.account.username}</strong>
                    </div>
                )}
                {snack.tid && (
                    <div className="text-xs">
                        Provided by: <a href="https://sysbird.jp/toriko/" className="link link-primary"><strong> お菓子の虜</strong></a>
                    </div>
                )}
            </div>
            </div>
        </li>
    );
};

export default SnackItem;
