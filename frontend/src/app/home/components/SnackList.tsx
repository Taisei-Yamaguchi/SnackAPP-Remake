"use client"
import { useSelector } from 'react-redux';
import { RootState } from '@/store'; 
import SnackItem from './SnackItem';
import { useAppSelector } from '@/store';

const SnackList = () => {
    const snackResult = useSelector((state: RootState) => state.snackResult.snackResult);
    const reloading = useAppSelector((state: RootState) => state.reloadSlice.reloading);
    const searchLoad = useAppSelector((state: RootState) => state.reloadSlice.searchLoad);

    return (
        <div className='bg-gradient-to-r from-red-300 to-pink-300 z-0 '>
            {reloading || searchLoad ?(
                <>
                    <span className="loading loading-spinner loading-xs"></span>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span className="loading loading-spinner loading-md"></span>
                    <span className="loading loading-spinner loading-lg"></span>
                </>
            ):(
                <>
                {snackResult &&(<>
                    {snackResult.length > 0 ? (
                        <ul className='flex justify-center flex-wrap '>
                            {snackResult.map((snack, index) => (
                                <SnackItem snack={snack} key={snack.id}/>
                            ))}
                        </ul>
                    ):(
                        <div className='flex flex-col justify-center items-center w-screen h-full'>
                            <div className='text-xl'>No Result</div>
                            <div className='text-sm'>Please try different search.</div>
                        </div>
                    )}
                </>)
                }
                </>
            )}   
        </div>
    );
};

export default SnackList;
