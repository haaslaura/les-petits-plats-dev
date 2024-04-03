/**********************************************************************

This JavaScript code is linked to the index.html page

**********************************************************************/

// Importing data and functions
import recipes from "../../data/recipes.js";
import { SearchBar } from "../classes/SearchBar.js";
import { displayRecipes } from "../utils/displayRecipes.js";
import { displayRecipesNumber } from "../utils/displayRecipesNumber.js";


function initPage() {
	// Empty the contents of the section
	document.querySelector(".recipes-list").innerHTML = "";
	displayRecipes(recipes);
	displayRecipesNumber(recipes);
}

initPage();

// Initialise classes
const searchBar = new SearchBar(recipes);
