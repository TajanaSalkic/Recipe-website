/*import { useState , useEffect} from "react"
import {db} from './firebase-config';
import {collection, getDocs, addDoc,deleteDoc,doc} from 'firebase/firestore';
*/
//import {Auth} from '../components/auth';
import SignUpForm from '../components/SignUpForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//import Login from '../components/Login';
import Navbar from '../components/Navbar';

export default function Prijava(){
    
    return(
        <>
        
                <div><Navbar/></div>
            <Routes>
                
                <Route path='/' element={<SignUpForm/>}/>

            </Routes>
        </>
      
    );
}


