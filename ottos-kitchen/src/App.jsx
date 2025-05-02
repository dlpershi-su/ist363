import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "./firebase"; // Import auth
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import auth functions

import RecipesPage from "./components/RecipesPage";
import SubmitPage from "./components/SubmitPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage"; // Import the SignupPage
import LikedRecipesPage from "./components/LikedRecipesPage"; // Import LikedRecipesPage
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Track authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Submit recipe to Firestore
  const addRecipe = async (recipe) => {
    try {
      const docRef = await addDoc(collection(db, "recipes"), recipe);
      console.log("Recipe added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };

  // Sign out function
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <Router>
      <div>
        <header>
          <h1>Otto's Kitchen</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recipes">Recipes</Link></li>
              <li><Link to="/liked-recipes">Liked Recipes</Link></li> {/* Liked Recipes Link */}
              <li><Link to="/submit">Submit Recipe</Link></li>
              {/* Show login/signup if no user, show logout if user exists */}
              {user ? (
                <li>
                  <span>Hello, {user.email}</span>
                  <button onClick={handleSignOut}>Logout</button>
                </li>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Sign Up</Link></li> {/* Added Signup Link */}
                </>
              )}
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<h2>Welcome to Otto's Kitchen!</h2>} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/liked-recipes" element={<LikedRecipesPage />} /> {/* Added Liked Recipes Route */}
            <Route path="/submit" element={<SubmitPage addRecipe={addRecipe} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} /> {/* Added Signup Route */}
          </Routes>
        </main>

        <footer>
          <p>&copy; 2025 Otto's Kitchen</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;













