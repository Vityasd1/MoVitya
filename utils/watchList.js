import {useRecoilState, useRecoilValue} from "recoil";
import {watchListState} from "../recoil/atoms/movies";
import {collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../firebase";
import {useSession} from "next-auth/react";


const setWatchList = async (force = false) => {
    const [movies, setMovies] = useRecoilValue(watchListState);
    if (force || movies.length === 0) {
        // const querySnapshot = await getDocs(collection(db, "user", token.sub.toString(), "movie"));
        // console.log(querySnapshot);
        // setMovies(querySnapshot.docs);
    }
}

const addToWatchList = async (movie,session,setWatchList) => {
   if(session?.data){
       const ref = doc(db,"user",session.data.user.id,"movie",`${movie.id.toString()}`);
       await setDoc(ref,movie).then((res) => {
           setWatchList(current => [...current,movie]);
       });
   }
   return true;
}
const removeFromWatchList = async (movie,session,movies,setMovies) => {

    if(session?.data){
        const ref = doc(db,"user",session.data.user.id,"movie",`${movie.id.toString()}`);
        await deleteDoc(ref).then((res) => {
            const temp = [...movies];
            temp.splice(temp.findIndex(element => element.id === movie.id),1);
            setMovies([...temp]);
        });
    }
    return true;

}

export {setWatchList,addToWatchList,removeFromWatchList}