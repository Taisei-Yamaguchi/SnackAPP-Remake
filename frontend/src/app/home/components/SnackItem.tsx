import React, { FC } from 'react';

type Snack = {
    id: number;
    tid: string;
    name: string;
    image: string;
    url: string;
    price: number;
    maker: string;
    type: string;
};

type Props = {
    snack: Snack;
};

const SnackItem: FC<Props> = ({ snack }) => {
    return (
        // <li className="snack-item" >
        //     <img src={snack.image} alt={snack.name} className=' h-28'/>
        //     <h2>{snack.name}</h2>
        //     <p>Price: ￥{snack.price}</p>
        //     <p>Maker: {snack.maker}</p>
        //     <p>Type: {snack.type}</p>
        // </li>
        <li>
            <div className="card w-96 bg-base-100 shadow-xl m-1">
            <figure><img className="h-32" src={snack.image} alt={snack.name} /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {snack.name}
                </h2>
                <h3>{snack.type}</h3>
                <a className="text-xs link link-primary" href={snack.url}>more info</a>
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
