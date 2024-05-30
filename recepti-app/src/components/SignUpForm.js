import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../stranice/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../stilovi/signup.css';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        otherInfo: "additional user info"  // Add any other user information here
      });

      console.log("User created and data saved to Firestore");
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="signup">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
        <br />
        <p>Already have an account? <button className='btn-sgn'><Link to="/login">Login</Link></button></p>
      </form>
    </div>
  );
};

//{error && <p style={{ color: 'red' }}>{error}</p>}

export default SignUpForm;

