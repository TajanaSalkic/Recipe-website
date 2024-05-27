/*import React from "react";
import '../stilovi/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {auth,googleProvider} from '../stranice/firebase-config'
import { signInWithEmailAndPassword,signInWithPopup, signOut} from 'firebase/auth';
import app from '../stranice/firebase-config';

//email mora biti normalno napisan, sifra mora imati 6 karaktera PORUKE ZA OVO!

const Login = () => {

    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");

    const [error, setError] = useState("");
    const navigate = useNavigate();

    console.log(auth?.currentUser?.email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validateEmail(email)){
            setError("Invalid email");
            return;
        }
        try{
            if (email === "admin@gmail.com" && password === "adminadmin") {
                console.log("Admin logged in");
                navigate(`/admin`);
                return;
        }
                
            await signInWithEmailAndPassword(auth, email, password);
            console.log(" Logged in");
            const encodedEmail = encodeURIComponent(email);
            navigate(`/${encodedEmail}/`);
        }catch(err){
            console.error(err);
            setError(err.message);
        }
    };

    const signInWIthGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        }catch(err){
            console.error(err);
            setError(err.message);
        }
    };

    

    const validateEmail = (email) => {
        const re= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const logout = async () => {
        try{
            await signOut(auth);
        }catch(err){
            console.error(err);
        }};

    return (
        <div className="signup">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label htmlFor="email">
                    Email:
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button>
                <button onClick={logout}>Sign Out</button>
                <button onClick={signInWIthGoogle}>Login WIth Google</button>
                <p><br></br>Don't have an account? <button type="submit"><Link to="/prijava">Sign up</Link></button></p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
            </form>
        </div>
    );
};

export default Login;*/
//gore radi

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../stranice/firebase-config';
import React from "react";
import '../stilovi/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {auth} from '../stranice/firebase-config'
import { signInWithEmailAndPassword, signOut} from 'firebase/auth';
import app from '../stranice/firebase-config';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    console.log(auth?.currentUser?.email);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Invalid email");
            return;
        }

        try {
            // Check if the email is in the blacklist
            const q = query(collection(db, "blacklist"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setError("This email has been deleted and cannot be used to sign in.");
                return;
            }

            if (email === "admin@gmail.com" && password === "adminadmin") {
                console.log("Admin logged in");
                navigate(`/admin`);
                return;
            }

            await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in");
            const encodedEmail = encodeURIComponent(email);
            navigate(`/${encodedEmail}/`);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="signup">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label htmlFor="email">
                    Email:
                    <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button><br />
                <br />
                <p>Don't have an account? <Link to="/prijava">Sign up</Link></p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button onClick={logout}>Sign Out</button>
            </form>
        </div>
    );
};

export default Login;

/*
import { useState } from 'react';
import {auth, googleProvider} from '../stranice/firebase-config'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const Auth = () =>{
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");

    console.log(auth?.currentUser?.email);

    const signIn = async () => {
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }catch(err){
            console.error(err);
        }
    };
    const signInWIthGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        }catch(err){
            console.error(err);
        }
    };

        const logout = async () => {
            try{
                await signOut(auth);
            }catch(err){
                console.error(err);
            }};

    return <div>
        <input placeholder="Email..." 
        onChange={(e) => setEmail (e.target.value)}
        />

        <input placeholder="Password..."
        type="password"
        onChange={(e) => setPassword (e.target.value)}
        />
        <button onClick={signIn}>Sign In</button>

        <button onClick={signInWIthGoogle}>Sign In WIth Google</button>

        <button onClick={logout}>Sign Out</button>
    </div>
};
*/