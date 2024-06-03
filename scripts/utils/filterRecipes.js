/**********************************************************************

This is the algorithm for filtering recipes

**********************************************************************/

import { chooseOptions } from "./chooseOptions.js";
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

	console.log(searchbarText);
	console.log(selectedIngredients);
	console.log(selectedAppliances);
	console.log(selectedUstensils);

	// S'il y avait un message d'erreur, le retirer
	const errorMessage = document.querySelector(".error-message");
	if (errorMessage) {
		errorMessage.remove();
	}

    // If the entire filterOptions is empty, redisplay the originals recipes
    if (searchbarText === '' && selectedIngredients.length === 0 && selectedAppliances.length === 0 && selectedUstensils.length === 0) {

		console.log("tous les filtres sont vides");
        displayRecipes(recipes);
        displayRecipesNumber(recipes);

        return;
    }

    // If the search is less than 3 characters long, display error message
    if (searchbarText.length > 0 && searchbarText.length < 3) {

		console.log("texte inférieur à 3 lettres, afficher une erreur");

        const errorMessage = document.querySelector(".error-message");
        if (errorMessage) {
            errorMessage.remove();
        }
        displayErrorMessage(searchbarText);
		displayRecipesNumber([]); // display "0 recettes"
        return;
    }

    const regex = new RegExp(searchbarText, "gi"); // g = global search, i = insensitive to breakag
    const filteredRecipes = [];
    
    // Browse the list of recipes
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        let match = false;

        // Check if the recipe name, description, or any ingredient matches the search text
        if (regex.test(recipe.name) || regex.test(recipe.description)) {

			// console.log(regex.test(recipe.name));
			// console.log(regex.test(recipe.description));

            match = true;
        } else {
            for (let ing = 0; ing < recipe.ingredients.length; ing++) {
                if (regex.test(recipe.ingredients[ing].ingredient)) {
                    match = true;
                    break;
                }
            }
        }

        // Check if the recipe matches the selected appliances
        if (selectedAppliances.length > 0) {
            if (!selectedAppliances.includes(recipe.appliance.toLowerCase())) {
                match = false;
            }
        }

        // Check if the recipe matches the selected ingredients
        if (selectedIngredients.length > 0) {
            for (let j = 0; j < selectedIngredients.length; j++) {
                let found = false;
                for (let ing = 0; ing < recipe.ingredients.length; ing++) {
                    if (recipe.ingredients[ing].ingredient.toLowerCase().includes(selectedIngredients[j].toLowerCase())) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    match = false;
                    break;
                }
            }
        }

        // Check if the recipe matches the selected ustensils
        if (selectedUstensils.length > 0) {
            for (let j = 0; j < selectedUstensils.length; j++) {
                if (!recipe.ustensils.includes(selectedUstensils[j].toLowerCase())) {
                    match = false;
                    break;
                }
            }
        }

        // If the recipe matches all the criteria, add it to the filtered recipes list
        if (match) {
            filteredRecipes.push(recipe);
        }
    }

    // If at least 1 recipe is available, display the recipes
    if (filteredRecipes.length > 0) {

		/**
		* Faire avec les autres dropdowns
		*/
		const newFilterRecipes =  new CustomEvent("new-filter", {
			detail: filteredRecipes
		})
		const ingredientsDD = document.getElementById("dropdown-ingredients");
		const appliancesDD = document.getElementById("dropdown-appliances");
		const ustensilsDD = document.getElementById("dropdown-utils");
		ingredientsDD.dispatchEvent(newFilterRecipes);
		appliancesDD.dispatchEvent(newFilterRecipes);
		ustensilsDD.dispatchEvent(newFilterRecipes);

		console.log(newFilterRecipes);

        displayRecipes(filteredRecipes);
        displayRecipesNumber(filteredRecipes);
		chooseOptions(filteredRecipes, filterOptions);

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



/*
export function filterRecipes(recipes, filterOptions) {
	console.time('filter')
	
	const searchFilter = filterOptions.searchbarText;
	const ingredFilter = filterOptions.filters.selectedIngredients;
	const applFilter = filterOptions.filters.selectedAppliances;
	const ustFilter = filterOptions.filters.selectedUstensils;
	
	console.log(searchFilter);
	console.log(ingredFilter);
	console.log(applFilter);
	console.log(ustFilter);

	// If the entire filterOptions is empty, redisplay the recipes
	if (searchFilter === '' && ingredFilter.length === 0 && applFilter.length === 0 && ustFilter.length === 0) {

		displayRecipes(recipes);
		displayRecipesNumber(recipes);
		
	// If the search is less than 3 characters long, display error message
	} else if (searchFilter.length < 3) {

		console.log(searchFilter.length);
				
		const errorMessage = document.querySelector(".error-message");
		if(errorMessage) {
			errorMessage.remove();
		}
		displayErrorMessage(searchFilter);
		
	} else {
		// Sinon filtrer les recettes en fonction des critères choisis par l'utilisateur
		const regex = new RegExp(searchFilter, "gi"); // g = global search, i = insensitive to breakag
		
		const filteredRecipes = [];
		let count = 0;
		
		let g = 0;
		// Browse the list of recipes
		for (let i = 0; i < recipes.length; i++) {
			if (regex.test(recipes[i].name)) {
				count = filteredRecipes.push(recipes[i]);
				continue;
			}
			if (regex.test(recipes[i].description)) {
				count = filteredRecipes.push(recipes[i]);
				continue;
			}

			// ET

			// Browse the appliance
			for (let j = 0; j < applFilter.length; j++) {
			
				if (regex.test(recipes[i].appliance) || recipes[i].appliance.includes(applFilter[j])) {
					console.log(recipes[i].appliance.includes(applFilter[j]));
					count = filteredRecipes.push(recipes[i]);
					continue;
				}			
			}

			
			// Browse the ingredients list
			const ingredientsList = recipes[i].ingredients;

			for (let j = 0; j < ingredFilter.length; j++) {

				for (g = 0; g < ingredientsList.length; g++){
					
					if (regex.test(ingredientsList[g].ingredient) || ingredientsList[g].ingredient.includes(ingredFilter[j])) { 
						count = filteredRecipes.push(recipes[i]);
						continue;
					}
				}
			}
			
			// Browse the ustensils list
			const ustensilsList = recipes[i].ustensils;
			for (g = 0; g < ustensilsList.length; g++){
				
				if (regex.test(ustensilsList[g]) /* || ou liste ustentils*//*) {
					count = filteredRecipes.push(recipes[i]);
					continue;
				}
			}
			/**
			* Dans le for : 
			* filtrer les recettes en fonction des dropdowns déjà sélectionnés
			*/
			/*
		}

		// If at least 1 recipe is available, display the recipes
		if (count > 0) {
			/**
			 * Faire avec les autres dropdowns
			 */
			/*
			const newFilterRecipes =  new CustomEvent('new-filter', {
				detail: filteredRecipes
			})
			const ingredienDD = document.getElementById('dropdown-ingredients')
			ingredienDD.dispatchEvent(newFilterRecipes);


			displayRecipes(filteredRecipes);
			displayRecipesNumber(filteredRecipes);
			
		// If not, display the error message
		} else {
			const errorMessage = document.querySelector(".error-message");
			if(errorMessage) {
				errorMessage.remove();
			}
			displayErrorMessage(searchFilter);
		}
	}
	
	console.timeEnd('filter')
}*/