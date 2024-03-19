import { useAppDispatch } from "@/store";
import { setReloading } from "@/store/slices/reload.slice";
import { useAppSelector } from "@/store";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { toggleLike } from "@/django_api/snack_like";
import { FaHeart, FaRegHeart } from "react-icons/fa"
import React, { FC } from 'react';
import { SnackData } from "@/interfaces";


type Props = {
    snack: SnackData;
};

const LikeSnack: FC<Props> =({snack}) =>{
    const router = useRouter()
    const dispatch = useAppDispatch()
    const account = useAppSelector((state:RootState)=>state.loginUserSlice.account)
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token)
	
    const handleLike = async () => {
        try {
            if (!account||!token) {
                router.push('/login');
                return;
            }
            dispatch(setReloading(true)); // reloading true
            const data =await toggleLike(snack.id,token)
        } catch (error) {
            console.error('Error updating text:', error);
        } finally {
            dispatch(setReloading(false)); // reloading false
        }
    };
    return(
        <>
            {/* like toggle */}
            <button className="skeleton w-24 btn" onClick={handleLike}>
                { snack.liked ?(<FaHeart/>):(<FaRegHeart/>)}
                <div className="badge">{snack.like_count}</div>
            </button>
        </>
    )
}

export default LikeSnack