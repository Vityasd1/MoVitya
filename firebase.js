// Import the functions you need from the SDKs you need
import { initializeApp, getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDvJ_TejLD8QJby7Jayt3eqWtfAOVcPWmo",
    authDomain: "filmbyvitya.firebaseapp.com",
    projectId: "filmbyvitya",
    storageBucket: "filmbyvitya.appspot.com",
    messagingSenderId: "485442164893",
    appId: "1:485442164893:web:ccc56f979b4e02ce86dc74"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export {app, db, storage,auth}