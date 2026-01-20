import { useState } from 'react'
import { Navbar } from "./components/Navbar.js";
import { Search } from "lucide-react";
import { Card } from "./components/Card";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [recipes, setRecipes] = useState([]);

  async function searchRecipes() {
    if (searchInput.trim() === "" || searchInput.length === 0) return;
    
    const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;
      let url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput}&addRecipeInformation=true&apiKey=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data.results);

      setRecipes(data.results);
    }

  function handleSearchChange(e) {
    setSearchInput(e.target.value);
  }
  

  return (
    <>
    <Navbar />
    <div className="container">
    <h1>Start your recipe search!</h1>

    <div className="box">
      <div id="search-box">
        <input type="text" id="search-input" placeholder="Search for recipes..." value={searchInput} onChange={handleSearchChange} required />
        <button id="search-btn" className="icon" onClick={() => searchRecipes()}>
          <i className="fa-solid flex justify-center "><Search /></i>
        </button>
      </div>
    </div>

    <div id="recipe-container">
      <div className="dropdown-items">
        <select id="diet-filter" className="dropdown">
          <option value="" disabled selected hidden>Filter by diet</option>
          <option value="all">All Diets</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten free">Gluten Free</option>
          <option value="ketogenic">Keto</option>
          <option value="paleo">Paleo</option>
        </select>
  
        <select id="meal-type-filter" className="dropdown">
          <option value="" disabled selected hidden>Filter by meal type</option>
          <option value="all">All Meal Types</option>
          <option value="main course">Main Course</option>
          <option value="appetizer">Appetizer</option>
          <option value="side dish">Side Dish</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>

      <div className="results-grid" id="results-grid">
      {recipes.map((recipe) => (
        <Card
        title= {recipe.title}
        image = {recipe.image}
        servings = {recipe.servings}
        id = {recipe.id}
        />
      ))}
      </div>
    </div>
  </div>
    </>
  )
}

export default App
