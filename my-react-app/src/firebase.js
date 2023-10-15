// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { collection, addDoc, getDocs } from "firebase/firestore";
// import {getDatabase} from "firebase/database"
// import {getFirestore, collection, getDocs} from 'firebase/firestore'
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDlQ_zwEBgiIF0XBbe43m5GaYcXh4-XnqI",
  authDomain: "mysuperstarnotes.firebaseapp.com",
  projectId: "mysuperstarnotes",
  storageBucket: "mysuperstarnotes.appspot.com",
  messagingSenderId: "278341759825",
  appId: "1:278341759825:web:ac9b93890daad929b09970"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)
export const db =  getFirestore(app)
export default app;