import { snackRecommend } from "@/django_api/snack_recommend"
import { useAppSelector } from "@/store"
import { RootState } from "@/store";
import { useEffect,useState } from "react";
import { SnackData } from "@/interfaces";

const RecommendedSnacks = () =>{
    const reloading = useAppSelector((state: RootState) => state.reloadSlice.reloading);
    const account = useAppSelector((state:RootState)=>state.loginUserSlice.account);
	const token = useAppSelector((state:RootState)=>state.loginUserSlice.token);
    const [recommendSnacks,setRecommendSnacks] = useState<SnackData[]|null>(null)

    
    useEffect(()=>{
        const getRecommendSnacks = async () => {
            try {
				const data= await snackRecommend(token);	
                setRecommendSnacks(data.items)
            } catch (error) {
                console.error('Error fetching recommend snacks:', error);
            }
        };
        getRecommendSnacks()
    },[reloading])

    return(
        <div className="md:fixed top-40 z-10  w-full flex flex-col items-center bg-gradient-to-r from-pink-400 to-white">
        <strong>Recommendation 👇</strong>
        <div className="carousel w-full  ">
            {recommendSnacks && recommendSnacks.map((item, index) => (
                <div id={`slide${index}`} className="carousel-item relative w-full flex max-md:justify-between" key={`recommend-${index}`}>
                    <img src={item.image} className="h-36 ml-20 max-md:ml-10 max-md:h-40 max-md:w-40" alt={item.name}/>
                    <div className="flex flex-col items-center mr-20 max-md:mr-10 ">
                        <strong>{item.name}</strong>
                        <div className="card-actions justify-end">
                            {/* type */}
                            <div className="badge badge-outline text-xs">{item.type}</div>
                            {/* maker */}
                            <div className="badge badge-outline text-xs">{item.maker}</div>
                        </div>
                        {/* account or toriko info */}
                        {item.account&&(
                            <div className="text-xs">
                                Provided by: <strong> {item.account.username}</strong>
                            </div>
                        )}
                        {item.tid && (
                            <div className="text-xs">
                                Provided by: <a href="https://sysbird.jp/toriko/" className="link link-primary"><strong> お菓子の虜</strong></a>
                            </div>
                        )}

                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 max-md:hidden">
                        {index === 0 ? (
                            <a href={`#slide${recommendSnacks.length - 1}`} className="btn btn-circle max-md:hidden">❮</a>
                        ) : (
                            <a href={`#slide${index - 1}`} className="btn btn-circle max-md:hidden">❮</a>
                        )}
                        {index === recommendSnacks.length - 1 ? (
                            <a href={`#slide0`} className="btn btn-circle">❯</a>
                        ) : (
                            <a href={`#slide${index + 1}`} className="btn btn-circle">❯</a>
                        )}
                    </div>
                </div> 
            ))}
        </div>
        </div>
    )
}

export default RecommendedSnacks