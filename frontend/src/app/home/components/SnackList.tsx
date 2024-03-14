"use client"
import { useSelector } from 'react-redux';
import { RootState } from '@/store'; 
import SnackItem from './SnackItem';

const SnackList = () => {
    const snackResult = useSelector((state: RootState) => state.snackResult.snackResult);

    return (
        <>
            {snackResult.length > 0 && (
                <ul className='flex justify-center flex-wrap'>
                    {snackResult.map((snack, index) => (
                        <SnackItem snack={snack} key={snack.id}/>
                    ))}
                </ul>
            )}
        </>
    );
};

export default SnackList;
