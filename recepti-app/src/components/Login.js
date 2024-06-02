
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../stranice/firebase-config';
import React from "react";
import '../stilovi/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {auth} from '../stranice/firebase-config'
import { signInWithEmailAndPassword, signOut} from 'firebase/auth';

import Navbar from './Navbar';
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
            navigate(`/${email}/`);
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
    <>
        <div><Navbar/>
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
                    <p>Don't have an account? <button className='btn-sgn'><Link to="/prijava">Sign up</Link></button></p>
                </form>
            </div>
        </div>
    </>
    );
};
//<button onClick={logout}>Sign Out</button>
//{error && <p style={{ color: 'red' }}>{error}</p>} ispis errora tokom logina problem kada yeli sa logina da ide na signup JER ISPISUJE I TADA GRESKU

export default Login;
