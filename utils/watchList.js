import {deleteDoc, doc, setDoc} from "firebase/firestore";

import {db} from "../firebase";

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

export {addToWatchList, removeFromWatchList}