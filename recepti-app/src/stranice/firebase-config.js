// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

//import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

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

/*
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};*/






// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);

export const auth = getAuth(app);



//export const db = getFirestore(app);
export const db = getFirestore(app);



export const googleProvider= new GoogleAuthProvider();