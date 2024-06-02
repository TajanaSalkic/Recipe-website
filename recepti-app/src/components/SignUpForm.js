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
    setError("");  // Clear any previous errors

    if (!validateEmail(email)) {
      setError("Invalid email");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
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
      navigate(`/${email}/`);  // Redirect to the user page
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
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display errors */}
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
          Password:
          <input
            type="password"
            id="password"
            value={password}
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

export default SignUpForm;
