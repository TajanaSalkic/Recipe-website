/*import { useState , useEffect} from "react"
import {db} from './firebase-config';
import {collection, getDocs, addDoc,deleteDoc,doc} from 'firebase/firestore';
*/
//import {Auth} from '../components/auth';
import SignUpForm from '../components/SignUpForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
//import Login from '../components/Login';


export default function Prijava(){
    
    return(
        
            <Routes>
                <Route path='/' element={<SignUpForm/>}/>

            </Routes>

      
    );
}


//Admin moze brisat usere???
