// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

//import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "@firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Promijeniti apikey radi sigurnosti

const firebaseConfig = {
  apiKey: "AIzaSyDPd7RVC6iigayhlysJeY15-ZO3jE4MFv8",
  authDomain: "wd-projekat-st.firebaseapp.com",
  projectId: "wd-projekat-st",
  storageBucket: "wd-projekat-st.appspot.com",
  messagingSenderId: "734080100337",
  appId: "1:734080100337:web:f80257c6ea1fa8894f8650",
  measurementId: "G-56DL638E9L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

export const auth = getAuth(app);

//export const db = getFirestore(app);

export const googleProvider= new GoogleAuthProvider();