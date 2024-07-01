/**********************************************************************

This is the algorithm for filtering recipes

**********************************************************************/

import { displayErrorMessage } from "./displayErrorMessage.js";
import { displayRecipes } from "./displayRecipes.js";
import { displayRecipesNumber } from "./displayRecipesNumber.js";

/**
* @typedef {Object} TagFilters
* @property {string[]} selectedIngredients
* @property {string[]} selectedAppliances
* @property {string[]} selectedUstensils
* 
* @typedef {Object} FilterOptions
* @property {string} searchbarText
* @property {TagFilters} filters
* 
* @param {Object} recipes
* @param {FilterOptions} filterOptions
*  
*/

export function filterRecipes(recipes, filterOptions) {
	const { searchbarText, filters } = filterOptions;
	const { selectedIngredients, selectedAppliances, selectedUstensils } = filters;
	
	const regex = new RegExp(searchbarText, "gi"); // g = global search, i = insensitive to case
	

	// If there was an error message, remove it
	const errorMessage = document.querySelector(".error-message");
	if (errorMessage) {
		errorMessage.remove();
	}
	

	// If the entire filterOptions is empty, redisplay the originals recipes
	if (searchbarText === "" && selectedIngredients.length === 0 && selectedAppliances.length === 0 && selectedUstensils.length === 0) {
		
		// Creation of an event to retrieve the initial recipes in the DropDownManager class
		const newFilterRecipes = new CustomEvent("new-filter", {
			detail: recipes
		});
		const ingredientsDD = document.getElementById("dropdown-ingredients");
		const appliancesDD = document.getElementById("dropdown-appliances");
		const ustensilsDD = document.getElementById("dropdown-utils");
		
		// Recipes are returned via the event to display new lists
		ingredientsDD.dispatchEvent(newFilterRecipes);
		appliancesDD.dispatchEvent(newFilterRecipes);
		ustensilsDD.dispatchEvent(newFilterRecipes);
		
		displayRecipes(recipes);
		displayRecipesNumber(recipes);
		return;
	}
	

	const filteredRecipes = recipes.filter(recipe => {
		const matchSearchBar = searchbarText === "" || regex.test(recipe.name) || regex.test(recipe.description) || recipe.ingredients.some(ingredient => regex.test(ingredient.ingredient));
		
		const matchAppliances = selectedAppliances.length === 0 || selectedAppliances.some(appliance => recipe.appliance.toLowerCase().includes(appliance.toLowerCase()));
		
		const matchIngredients = selectedIngredients.length === 0 || selectedIngredients.every(selectedIngredient => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedIngredient.toLowerCase())));
		
		const matchUstensils = selectedUstensils.length === 0 || selectedUstensils.every(selectedUstensil => recipe.ustensils.map(ustensil => ustensil.toLowerCase()).includes(selectedUstensil.toLowerCase()));
		
		return matchSearchBar && matchAppliances && matchIngredients && matchUstensils;
	});
	

	// If at least 1 recipe is available, display the recipes
	if (filteredRecipes.length > 0) {

		// Creation of an event to retrieve filtered recipes in the DropDownManager class
		const newFilterRecipes = new CustomEvent("new-filter", {
			detail: filteredRecipes
		});
		const ingredientsDD = document.getElementById("dropdown-ingredients");
		const appliancesDD = document.getElementById("dropdown-appliances");
		const ustensilsDD = document.getElementById("dropdown-utils");
		
		// Recipes are returned via the event to display new lists
		ingredientsDD.dispatchEvent(newFilterRecipes);
		appliancesDD.dispatchEvent(newFilterRecipes);
		ustensilsDD.dispatchEvent(newFilterRecipes);
		
		displayRecipes(filteredRecipes);
		displayRecipesNumber(filteredRecipes);
		
		// If not, display the error message
	} else {
		displayErrorMessage(searchbarText);
		displayRecipesNumber([]); // display "0 recettes"
	}
}