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

	console.log("Recipes are filtered");
    
    const { searchbarText, filters } = filterOptions;
    const { selectedIngredients, selectedAppliances, selectedUstensils } = filters;

    console.log(filters);

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

    const regex = new RegExp(searchbarText, "gi"); // g = global search, i = insensitive to breakag
    const filteredRecipes = [];
    
    // Browse the list of recipes
    for (let i = 0; i < recipes.length; i++) {

        const recipe = recipes[i];
		let matchSearchBar = true;
		let matchIngredients = true;
		let matchAppliances = true;
		let matchUstensils = true;

        // Check if the recipe name, description, or any ingredient matches the search text
		if (searchbarText !== "") {
			matchSearchBar = false;
			
			if (regex.test(recipe.name) || regex.test(recipe.description)) {
				matchSearchBar = true;

        	} else {
				for (let ing = 0; ing < recipe.ingredients.length; ing++) {

					if (regex.test(recipe.ingredients[ing].ingredient)) {
						matchSearchBar = true;
						break;
					}
				}
        	}
		}
        

        // Check if the recipe matches the selected appliance
        if (selectedAppliances.length > 0) {
			matchAppliances = false;

            if (recipe.appliance.toLowerCase().includes(selectedAppliances[0].toLowerCase())) {
                matchAppliances = true;
            }
        }

        // Check if the recipe matches the selected ingredients
        if (selectedIngredients.length > 0) {

			matchIngredients = true;

            for (let j = 0; j < selectedIngredients.length; j++) {
                let found = false;
                
				for (let ing = 0; ing < recipe.ingredients.length; ing++) {
                    if (recipe.ingredients[ing].ingredient.toLowerCase().includes(selectedIngredients[j].toLowerCase())) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    matchIngredients = false;
                    break;
                }
            }
        }


        // Check if the recipe matches the selected ustensils
        if (selectedUstensils.length > 0) {
			matchUstensils = false;

			const recipeUstensilsLowerCase = [];
    		for (let i = 0; i < recipe.ustensils.length; i++) {
				recipeUstensilsLowerCase.push(recipe.ustensils[i].toLowerCase());
			}

            for (let j = 0; j < selectedUstensils.length; j++) {

                if (recipeUstensilsLowerCase.includes(selectedUstensils[j].toLowerCase())) {
                    matchUstensils = true;
                    break;
                }
            }
        }

        // If the recipe matches all the criteria, add it to the filtered recipes list
        if (matchSearchBar && matchIngredients && matchAppliances && matchUstensils) {
            filteredRecipes.push(recipe);
        }
    }

    // If at least 1 recipe is available, display the recipes
    if (filteredRecipes.length > 0) {

		console.log(filteredRecipes);

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