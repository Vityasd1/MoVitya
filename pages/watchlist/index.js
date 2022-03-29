import React,{useEffect} from 'react';
import {useRecoilState} from "recoil";
import {watchListState} from "../../../recoil/atoms/movies";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../../firebase";
import {useSession} from "next-auth/react";

const Watchlist = (props) => {
    const [watchList,setWatchList] = useRecoilState(watchListState);
    const session = useSession();
    useEffect(async () => {
        if (watchList.length === 0) {
            if (session) {
                const querySnapshot = await getDocs(collection(db, "user", session.user.id.toString(), "movie"));
                querySnapshot.forEach((doc) => {
                    watchList.push(doc.data());
                });
            }
        }
    },[])

 return (
    <div>
        Watchlist
    </div>
 );}

export default Watchlist;