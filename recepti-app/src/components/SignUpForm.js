import React from "react";
import '../stilovi/signup.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {auth, googleProvider} from '../stranice/firebase-config'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../stranice/firebase-config';

//email mora biti normalno napisan, sifra mora imati 6 karaktera PORUKE ZA OVO!

const SignUpForm = () => {

    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validateEmail(email)){
            setError("Invalid email");
            return;
        }
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created");
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

    return (
        <div className="signup">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                
                <label htmlFor="email">
                    Email:
                    <input type="text" id="email" onChange={(e)=>setEmail(e.target.value)}/>
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} />
                </label>
                <button type="submit">Sign Up</button><br/>
                <br/>
                <button onClick={signInWIthGoogle}>Sign In WIth Google</button>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}

export default SignUpForm;

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