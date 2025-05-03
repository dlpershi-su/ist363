import React, { useState, useEffect } from 'react';
import { app, auth } from '../firebase';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const db = getFirestore(app);

function LikedRecipesPage() {
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        fetchLikedRecipes(firebaseUser.uid);
      } else {
        setUser(null);
        setLikedRecipes([]);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchLikedRecipes = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userDocRef);
    
    if (userSnapshot.exists()) {
      const likedRecipeIds = userSnapshot.data().likedRecipes || [];

      const recipeData = await Promise.all(
        likedRecipeIds.map(async (recipeId) => {
          const recipeDoc = await getDoc(doc(db, 'recipes', recipeId));
          return recipeDoc.exists() ? { id: recipeId, ...recipeDoc.data() } : null;
        })
      );

      setLikedRecipes(recipeData.filter(Boolean)); 
    }
  };

  const handleUnlikeRecipe = async (recipeId) => {
    if (!user) return;

    const updatedRecipes = likedRecipes.filter((recipe) => recipe.id !== recipeId);
    setLikedRecipes(updatedRecipes);

    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      likedRecipes: updatedRecipes.map((recipe) => recipe.id)
    }, { merge: true });
  };

  return (
    <div>
      <h2>Your Liked Recipes</h2>
      {likedRecipes.length === 0 ? (
        <p>You haven't liked any recipes yet!</p>
      ) : (
        <div className="recipes">
          {likedRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              {recipe.imageUrl && (
                <img src={recipe.imageUrl} alt={recipe.recipeName} />
              )}
              <h3>{recipe.recipeName}</h3>
              <h4>Ingredients:</h4>
              <p>{recipe.ingredients}</p>
              <h4>Instructions:</h4>
              <p>{recipe.instructions}</p>
              <button
                onClick={() => handleUnlikeRecipe(recipe.id)}
                style={{
                  fontSize: '1.5rem',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                }}
                aria-label="Unlike"
              >
                ✔️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedRecipesPage;





