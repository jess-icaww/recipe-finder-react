import "../index.css";
import { useState } from "react";


type CardType = {
    title: string;
    image: string;
    servings: number;
    id: number;
}

export function Card({title, image, servings, id}: CardType) {


    async function getFullRecipe(id) {
      try {
    const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    const data = await response.json();

    console.log(data);

    const ingredientsList = data.extendedIngredients.map((ingredient) => `<li>${ingredient.original}</li>`).join(" ");

    const container = document.querySelector(`.container`);
    container.innerHTML = `
    <div class="recipe-details">
    <h1>${data.title}</h1>
    <img src=${data.image}>
    <h3>Category: </h3>
    <p>${data.dishTypes[0].charAt(0).toUpperCase() + data.dishTypes[0].slice(1)}</p>
    <h3>Servings: </h3><p>${data.servings}</p>
    <h3>Cook Time: </h3><p>${data.readyInMinutes} mins</p>
    <h3>Ingredients: </h3><ul class="ingredients-list">${ingredientsList}</ul>
    <h3>Instructions: </h3><p>${data.instructions}</p>
    <div id="source-wrapper"><a href="${data.sourceUrl}" target="_blank">View Original Source</a></div>
    <div id="save-favorite-container">
    <button class="save-favorite-btn btn" data-id="${data.id}">
    Save to Favorites</button></div></div>
    `
      } catch (error) {
        console.error(`Could not find recipe. Try again.`);
      }
    }

    return (
        <div className="recipe-card">
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <div className="recipe-quick-info">
                <p>Servings: {servings}</p>
            </div>
            <button className="full-recipe-btn btn" data-id={id} onClick = {() => getFullRecipe(id)}>Get Full Recipe</button>
        </div>
    )
}