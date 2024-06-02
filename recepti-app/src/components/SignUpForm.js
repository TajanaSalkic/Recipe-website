import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../stranice/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../stilovi/signup.css';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [email, setEmail] = useState(""); // State za email
  const [password, setPassword] = useState(""); // State za lozinku
  const [error, setError] = useState(""); // State za greške
  const navigate = useNavigate(); // Hook za navigaciju

  const handleSubmit = async (e) => { // Funkcija za obradu submit-a forme
    e.preventDefault(); // Sprječava ponovno učitavanje stranice
    setError(""); // Resetovanje prethodnih grešaka

    if (!validateEmail(email)) { // Provjera ispravnosti email-a
      setError("Neispravan email"); // Postavljanje greške za neispravan email
      return;
    }

    if (password.length < 8) { // Provjera dužine lozinke
      setError("Lozinka mora imati najmanje 8 karaktera"); // Postavljanje greške za kratku lozinku
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Kreiranje korisnika sa emailom i lozinkom
      const user = userCredential.user; // Dobijanje korisničkog objekta

      // Dodavanje korisnika u Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        otherInfo: "dodatne informacije o korisniku" // Dodavanje dodatnih informacija o korisniku
      });

      console.log("Korisnik kreiran i podaci sačuvani u Firestore"); // Logovanje uspjeha
      navigate(`/${email}/`); // Navigacija na stranicu korisnika
    } catch (err) {
      console.error(err); // Logovanje greške
      setError(err.message); // Postavljanje greške
    }
  };
  
  const validateEmail = (email) => { // Funkcija za validaciju email-a
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    return re.test(String(email).toLowerCase()); // Provjera email-a
  };

  return (
    <div className="signup"> 
      <form className="signup-form" onSubmit={handleSubmit}> 
        <h1>Registracija</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>} 
        <label htmlFor="email"> 
          Email:
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Lozinka:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Registracija</button> 
        <br />
        <p>Imate račun? <button className='btn-sgn'><Link to="/login">Prijava</Link></button></p> {/* Link za prijavu */}
      </form>
    </div>
  );
};

export default SignUpForm;