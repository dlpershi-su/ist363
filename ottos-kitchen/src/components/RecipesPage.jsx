// src/components/RecipesPage.js
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase'; // Import firebase app from the file where it is initialized

const db = getFirestore(app);

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  // Fetch recipes from Firestore when the page loads
  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      const recipesData = querySnapshot.docs.map((doc) => doc.data());
      setRecipes(recipesData);
    };
    fetchRecipes();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const clearFilter = () => {
    setSelectedTag(null);
  };

  const filteredRecipes = selectedTag
    ? recipes.filter((recipe) => recipe.tags && recipe.tags.includes(selectedTag))
    : recipes;

  return (
    <div>
      <h2>All Recipes</h2>
      {selectedTag && (
        <div style={{ marginBottom: '1rem' }}>
          <strong>Filtering by tag:</strong> {selectedTag}{' '}
          <button onClick={clearFilter}>Clear Filter</button>
        </div>
      )}
      <div className="recipes">
        {filteredRecipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            {recipe.imageUrl && (
              <img src={recipe.imageUrl} alt={recipe.recipeName} />
            )}
            <h3>{recipe.recipeName}</h3>
            <h4>Ingredients:</h4>
            <p>{recipe.ingredients}</p>
            <h4>Instructions:</h4>
            <p>{recipe.instructions}</p>
            {recipe.tags && recipe.tags.length > 0 && (
              <div className="tags">
                <strong>Tags:</strong>{' '}
                {recipe.tags.map((tag, i) => (
                  <button
                    key={i}
                    className="tag-button"
                    onClick={() => handleTagClick(tag)}
                    style={{
                      margin: '0 0.5rem 0.5rem 0',
                      padding: '0.2rem 0.5rem',
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      background: selectedTag === tag ? '#e2625c' : '#f0f0f0',
                      color: selectedTag === tag ? 'white' : 'black',
                      cursor: 'pointer',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {filteredRecipes.length === 0 && (
          <p>No recipes found for tag: {selectedTag}</p>
        )}
      </div>
    </div>
  );
}

export default RecipesPage;



