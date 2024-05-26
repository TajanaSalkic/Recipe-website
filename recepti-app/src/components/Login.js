import React from "react";
import '../stilovi/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {auth} from '../stranice/firebase-config'
import { signInWithEmailAndPassword, signOut} from 'firebase/auth';
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
    /*const signInWIthGoogle = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        }catch(err){
            console.error(err);
            setError(err.message);
        }
    };

    */

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
