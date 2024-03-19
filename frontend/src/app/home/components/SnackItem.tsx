"use client"
import React, { FC } from 'react';
import { useAppSelector } from '@/store';
import { RootState } from '@/store';
import DeleteSnack from './DeleteSnack';
import LikeSnack from './LikeSnack';
import { SnackData } from '@/interfaces';

type Props = {
    snack: SnackData;
};

const SnackItem: FC<Props> = ({ snack }) => {
    const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	
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
                    <LikeSnack snack={snack}/>
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
