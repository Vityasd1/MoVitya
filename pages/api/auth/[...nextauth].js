import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { setDoc,doc,updateDoc, collection, getDocs,addDoc,query,where } from 'firebase/firestore';
import "firebase/firestore"
import { getAuth,signInAnonymously} from "firebase/auth";



import moviesState from "../../../recoil/atoms/movies";
import {app, auth, db} from "../../../firebase";
import {useRecoilState} from "recoil";


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
    // https://next-auth.js.org/providers/overview
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        redirect({url, baseUrl}) {
            // console.log(url,baseUrl);
            // if (url.startsWith(baseUrl)) return url
            // // Allows relative callback URLs
            // else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
            // return baseUrl
            return baseUrl;
        },
        async signIn({ user, account, profile, email, credentials }) {
            const resp = await signInAnonymously(auth).then((res) => {
                return res;
            }).catch(e => console.log(e));
            return true
        },
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            const resp = await signInAnonymously(auth).then((res) => {
                return res;
            }).catch(e => console.log(e));
            return token
        },
        async session({ session, user, token }) {
            const data = {...session}

            data.user.id = token.sub;
            return data;
        },
    },
    pages: {
        signIn: '/auth/signin',
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    secret: process.env.NEXTAUTH_SECRET
    // adapter: FirebaseAdapter(firestore),
})