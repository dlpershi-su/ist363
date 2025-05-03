import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import { app, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const db = getFirestore(app);

function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [user, setUser] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, 'recipes'));
      const recipesData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRecipes(recipesData);
    };

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        fetchLikedRecipes(firebaseUser.uid);
      } else {
        setUser(null);
        setLikedRecipes([]);
      }
    });

    fetchRecipes();
    return () => unsubscribe();
  }, []);

  const fetchLikedRecipes = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      setLikedRecipes(userSnapshot.data().likedRecipes || []);
    }
  };

  const handleLikeRecipe = async (recipeId) => {
    if (!user) {
      alert("Please log in to like a recipe");
      return;
    }

    const updatedLikes = likedRecipes.includes(recipeId)
      ? likedRecipes.filter((id) => id !== recipeId) 
      : [...likedRecipes, recipeId]; 

    setLikedRecipes(updatedLikes);

    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, { likedRecipes: updatedLikes }, { merge: true });
  };

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
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
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

            <button
              onClick={() => handleLikeRecipe(recipe.id)}
              style={{
                fontSize: '1.5rem',
                border: 'none',
                background: 'none',
                cursor: user ? 'pointer' : 'not-allowed',
                transition: 'color 0.3s ease',
              }}
              aria-label={likedRecipes.includes(recipe.id) ? 'Unlike this recipe' : 'Like this recipe'}
              disabled={!user}
              title={!user ? 'Log in to like recipes' : ''}
            >
              {likedRecipes.includes(recipe.id) ? '✔️' : '❤️'}
            </button>
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









