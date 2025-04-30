import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RecipesPage from "./components/RecipesPage";
import SubmitPage from "./components/SubmitPage";
import LoginPage from "./components/LoginPage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Make sure this path is correct
import './App.css';

function App() {
  const addRecipe = async (recipe) => {
    try {
      const docRef = await addDoc(collection(db, "recipes"), recipe);
      console.log("Recipe added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
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
              <li><Link to="/submit">Submit Recipe</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<h2>Welcome to Otto's Kitchen!</h2>} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/submit" element={<SubmitPage addRecipe={addRecipe} />} />
            <Route path="/login" element={<LoginPage />} />
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











