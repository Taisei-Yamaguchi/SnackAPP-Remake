"use client"
import React, { FC } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { toggleLike } from '@/api/like';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';

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
};

type Props = {
    snack: Snack;
};

const SnackItem: FC<Props> = ({ snack }) => {
    const dispatch = useAppDispatch()
    const handleLike = async (snackId:number) => {
        try {
            dispatch(setReloading(true)); // reloading true
            const data =await toggleLike(snackId)
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
                    {snack.name}
                </h2>
                <div className='flex justify-between'>
                    <h3>{snack.type}</h3>
                    <a className="text-xs link link-primary" href={snack.url}>more info</a>
                </div>
                <button className="skeleton w-24 btn" onClick={()=>handleLike(snack.id)}>
                    { snack.liked ?(<FaHeart/>):(<FaRegHeart/>)}
                    <div className="badge">{snack.like_count}</div>
                </button>
                
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">￥{snack.price}</div> 
                    <div className="badge badge-outline">Maker: {snack.maker}</div>
                </div>
            </div>
            </div>
        </li>
    );
};

export default SnackItem;
