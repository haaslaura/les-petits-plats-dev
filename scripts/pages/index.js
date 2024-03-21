/**********************************************************************

This JavaScript code is linked to the index.html page

**********************************************************************/

// Importing data and functions
import recipes from "../../data/recipes.js";
import { displayRecipes } from "../utils/displayRecipes.js";
import { DropdownManager } from "../classes/DropdownManager.js";
import { SearchBar } from "../classes/SearchBar.js";
import { displayRecipesNumber } from "../utils/displayRecipesNumber.js";


function initPage() {
	// Empty the contents of the section
	document.querySelector(".recipes-list").innerHTML = "";
	displayRecipes(recipes);
	displayRecipesNumber(recipes);
}

initPage();


// Initialise classes
const ingredientsDropdown = new DropdownManager("dropdown-ingredients", recipes, "ingredients");
const appliancesDropdown = new DropdownManager("dropdown-appliances", recipes, "appliance");
const ustensilssDropdown = new DropdownManager("dropdown-utils", recipes, "ustensils");
const searchBar = new SearchBar(recipes);