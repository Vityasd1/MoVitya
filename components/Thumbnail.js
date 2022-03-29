import React, {forwardRef, useState} from 'react';
import Image from 'next/image'
import {HeartIcon} from "@heroicons/react/solid";
import {HeartIcon as HeartOutline} from "@heroicons/react/outline";
import {useRouter} from "next/router";
import {doc, setDoc,deleteDoc} from 'firebase/firestore';
import {useSession} from "next-auth/react";
import {useRecoilState} from "recoil";

import {watchListState as watchAtom} from "../recoil/atoms/movies";
import Loader from "./Loader";
import {db} from '../firebase'
import {addToWatchList, removeFromWatchList} from "../utils/watchList";


function Thumbnail({movie,fromWatchList = false},ref)  {
    const [watchList,setWatchList] = useRecoilState(watchAtom)
    const session = useSession();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading,setLoading] = useState(false);
    // const [movies, setMovies] = useRecoilState(moviesState);
    const router = useRouter();

    const handleClick = () => {
        router.push(`movie/${movie.id}`);
    }

    const handleAddToWatchlistClick = async (e) => {
        e.stopPropagation();
        setLoading(true);
        await addToWatchList(movie,session,setWatchList);
        setLoading(false);

    }
    const handleRemoveFromWatchlistClick = async (e) => {
        e.stopPropagation();
        setLoading(true);
        await removeFromWatchList(movie,session,watchList,setWatchList);
        setLoading(false);
    }

    if(loading){
        return <Loader/>
    }

    if(fromWatchList && !watchList.find(element => element.id === movie.id)){
        return <></>
    }

 return (
    <div ref={ref} onClick={handleClick} className="group p-2 cursor-pointer transition-duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
        <Image
            src={
                `${baseUrl}${movie.backdrop_path || movie.poster_path}` ||
                 `${baseUrl}${movie.poster_path}`
            }
            height={1080}
            width={1920}
            layout={"responsive"}
            alt={"Movie"}
        />
        <div className='p-2'>
            <p className='truncate max-w-md'>{movie.overview}</p>
            <h2 className="mt-1 text-2xl transition-all duration-100 ease-in-out group-hover:font-bold">
                {movie.title || movie.original_name}
            </h2>
            <div className="flex items-center opacity-0 group-hover:opacity-100">
                {movie.media_type && `${movie.media_type} • `}
                {movie.release_date || movie.first_air_date}{" "}
                {session.data &&
                    <div className="flex items-center pl-2">

                        {watchList.find(element => element.id === movie.id) ?
                            <>•<HeartIcon onClick={handleRemoveFromWatchlistClick}
                                         className={"h-5 mx-2 text-red-500"}/> {movie.vote_count}</> :
                            <>•<HeartOutline onClick={handleAddToWatchlistClick} className={"h-5 mx-2"}/> {movie.vote_count}</>
                        }
                    </div>
                }
            </div>
        </div>
    </div>
 );}



export default forwardRef(Thumbnail);