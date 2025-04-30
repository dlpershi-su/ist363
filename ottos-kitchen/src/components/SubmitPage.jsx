// src/components/SubmitPage.js
import React, { useState } from 'react';

function SubmitPage({ addRecipe }) {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      recipeName,
      ingredients,
      instructions,
      imageUrl,
      tags: tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== ''),
      createdAt: new Date() // Optional: timestamp
    };

    console.log('Submitting recipe:', newRecipe);

    try {
      await addRecipe(newRecipe);
      setStatus('success');
      setRecipeName('');
      setIngredients('');
      setInstructions('');
      setImageUrl('');
      setTags('');
    } catch (error) {
      console.error('Error submitting recipe:', error);
      setStatus('error');
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Your Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="recipe-name">Recipe Name</label>
        <input
          type="text"
          id="recipe-name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          required
        />

        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        ></textarea>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        ></textarea>

        <label htmlFor="image-url">Image URL (optional)</label>
        <input
          type="text"
          id="image-url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label htmlFor="tags">Tags (comma-separated)</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button type="submit">Submit Recipe</button>

        {status === 'success' && (
          <p style={{ color: 'green', marginTop: '1em' }}>
            Recipe submitted successfully!
          </p>
        )}
        {status === 'error' && (
          <p style={{ color: 'red', marginTop: '1em' }}>
            There was an error submitting your recipe. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

export default SubmitPage;





