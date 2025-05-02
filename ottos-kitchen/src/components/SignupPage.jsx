import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust if your path is different
import { useNavigate } from 'react-router-dom'; // Step 5

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Step 5

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Ensure password is at least 6 characters (optional basic check)
      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      
      await createUserWithEmailAndPassword(auth, email, password);
      setError(null); // Clear any previous errors
      navigate('/recipes'); // Step 5 - redirect after signup
    } catch (err) {
      // Handle Firebase-specific error messages
      if (err.code === 'auth/email-already-in-use') {
        setError("Email is already in use.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password is too weak. It must be at least 6 characters.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button type="submit">Sign Up</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignupPage;


