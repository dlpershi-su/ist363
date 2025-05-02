import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust if needed
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // To manage loading state

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Basic frontend validation (optional)
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null); // Reset error on successful login
      navigate('/recipes'); // Redirect after successful login
    } catch (err) {
      // Handle Firebase specific errors
      if (err.code === 'auth/user-not-found') {
        setError("User not found. Please check your email.");
      } else if (err.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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

        <button type="submit" disabled={isLoading}>Login</button>

        {isLoading && <p>Loading...</p>} {/* Display loading message */}
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
}

export default LoginPage;




