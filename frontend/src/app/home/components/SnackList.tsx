"use client"
import { useSelector } from 'react-redux';
import { RootState } from '@/store'; 
import SnackItem from './SnackItem';

const SnackList = () => {
    const snackResult = useSelector((state: RootState) => state.snackResult.snackResult);

    return (
        <div className='bg-gradient-to-r from-red-300 to-pink-300 overflow-y-auto '>
            {snackResult.length > 0 ? (
                <ul className='flex justify-center flex-wrap overflow-y-auto'>
                    {snackResult.map((snack, index) => (
                        <SnackItem snack={snack} key={snack.id}/>
                    ))}
                </ul>
            ):(
                <div className='flex flex-col justify-center items-center'>
                    <div className='text-xl'>No Result</div>
                    <div className='text-sm'>Please try different search.</div>
                </div>
            )}
        </div>
    );
};

export default SnackList;
