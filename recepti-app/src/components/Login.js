
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
    const [email, setEmail] = useState(""); // Definisanje state-a za email
    const [password, setPassword] = useState(""); // Definisanje state-a za šifru
    const [error, setError] = useState(""); // Definisanje state-a za greške
    const navigate = useNavigate(); // Inicijalizacija navigacije

    console.log(auth?.currentUser?.email); // Ispisuje trenutnog korisnika (ako postoji) u konzolu
    
    // Funkcija za obradu prijave
    const handleSubmit = async (e) => { 
        e.preventDefault(); // Sprječava podrazumijevano ponašanje forme (refresh stranice)
        if (!validateEmail(email)) { // Provjera validnosti email-a
            setError("Invalid email"); // Postavljanje greške ako email nije validan
            return; // Prekida funkciju ako email nije validan
        }

        try {
            const q = query(collection(db, "blacklist"), where("email", "==", email)); // Kreira upit za provjeru da li je email na crnoj listi
            const querySnapshot = await getDocs(q); // Dohvaća rezultate upita
            if (!querySnapshot.empty) { // Provjerava da li je email na crnoj listi
                setError("This email has been deleted and cannot be used to sign in."); // Postavlja grešku ako je email na crnoj listi
                return; // Prekida funkciju ako je email na crnoj listi
            }

            if (email === "admin@gmail.com" && password === "adminadmin") { // Provjerava da li su unijeti admin podaci
                console.log("Admin logged in"); // Ispisuje poruku za prijavu admina
                navigate(`/admin`); // Navigira na admin stranicu
                return; // Prekida funkciju ako su unijeti admin podaci
            }

            await signInWithEmailAndPassword(auth, email, password); // Pokušava prijaviti korisnika sa unesenim podacima
            console.log("Logged in"); // Ispisuje poruku za prijavu korisnika
            navigate(`/${email}/`); // Navigira na korisničku stranicu
        } catch (err) { 
            console.error(err); // Ispisuje grešku u konzolu
            setError(err.message); // Postavlja grešku za prikaz korisniku
        }
    };

    const validateEmail = (email) => { // Funkcija za validaciju email-a
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regularni izraz za provjeru validnosti email-a
        return re.test(String(email).toLowerCase()); // Vraća true ako email odgovara regularnom izrazu
    };

    
    return (
    <>
        <div><Navbar/> 
            <div className="signup">
                <form className="signup-form" onSubmit={handleSubmit}> 
                    <h1>Prijava</h1> 
                    <label htmlFor="email">
                        Email:
                        <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} /> 
                    </label>
                    <label htmlFor="password">
                        Password:
                        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} /> 
                    </label>
                    <button type="submit">Prijava</button><br /> 
                    <br />
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Prikazuje grešku ako postoji */}
                    <p>Nemate račun? <button className='btn-sgn'><Link to="/prijava">Registracija</Link></button></p> {/* Link za registraciju */}
                </form>
            </div>
        </div>
    </>
    );
};
export default Login;