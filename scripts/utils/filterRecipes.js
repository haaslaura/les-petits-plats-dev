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
	
	const regex = new RegExp(searchbarText, "gi"); // g = global search, i = insensitive to breakag
	const filteredRecipes = [];
	
	// If there was an error message, remove it
	const errorMessage = document.querySelector(".error-message");
	if (errorMessage) {
		errorMessage.remove();
	}
	
	// If the entire filterOptions is empty, redisplay the originals recipes
	if (searchbarText === "" && selectedIngredients.length === 0 && selectedAppliances.length === 0 && selectedUstensils.length === 0) {
		
		// Creation of an event to retrieve the initial recipes in the DropDownManager class
		const newFilterRecipes =  new CustomEvent("new-filter", {
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
	

	// Function to check if a recipe matches search text
    function matchSearch(recipe) {
        if (searchbarText === "") return true;
        if (regex.test(recipe.name) || regex.test(recipe.description)) return true;
        for (let ing of recipe.ingredients) {
            if (regex.test(ing.ingredient)) return true;
        }
        return false;
    }

    // Function to check if a recipe matches selected ingredients
    function matchIngredients(recipe) {
        if (selectedIngredients.length === 0) return true;
        for (let selIng of selectedIngredients) {
            let found = false;
            for (let ing of recipe.ingredients) {
                if (ing.ingredient.toLowerCase().includes(selIng.toLowerCase())) {
                    found = true;
                    break;
                }
            }
            if (!found) return false;
        }
        return true;
    }

    // Function to check if a recipe matches selected appliances
    function matchAppliances(recipe) {
        if (selectedAppliances.length === 0) return true;
        return selectedAppliances.some(appl => recipe.appliance.toLowerCase().includes(appl.toLowerCase()));
    }

    // Function to check if a recipe matches selected utensils
    function matchUstensils(recipe) {
        if (selectedUstensils.length === 0) return true;
        const recipeUstensilsLowerCase = recipe.ustensils.map(ut => ut.toLowerCase());
        return selectedUstensils.every(ut => recipeUstensilsLowerCase.includes(ut.toLowerCase()));
    }

    // Filter recipes based on criteria
    for (let recipe of recipes) {
        if (matchSearch(recipe) && matchIngredients(recipe) && matchAppliances(recipe) && matchUstensils(recipe)) {
            filteredRecipes.push(recipe);
        }
    }
	
	
	// If at least 1 recipe is available, display the recipes
	if (filteredRecipes.length > 0) {
		
		// Creation of an event to retrieve filtered recipes in the DropDownManager class
		const newFilterRecipes =  new CustomEvent("new-filter", {
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
		const errorMessage = document.querySelector(".error-message");
		if (errorMessage) {
			errorMessage.remove();
		}
		displayErrorMessage(searchbarText);
		displayRecipesNumber([]); // display "0 recettes"
	}
}