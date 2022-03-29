import {selector} from "recoil";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase";
import {useSession} from "next-auth/react";

const {atom} = require("recoil");

const watchListState = atom({
    key: 'watchListState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

// const watchListSelector = selector({
//     key: 'WatchListSelector',
//     get: async ({get}) => {
//         const session = useSession();
//         const querySnapshot = await getDocs(collection(db, "user", session.data.user.id.toString(), "movie"));
//         // if (querySnapshot.error) {
//         //     throw response.error;
//         // }
//         return querySnapshot.docs;
//     },
// });
//
export {watchListState};