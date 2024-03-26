/**********************************************************************

This code concerns the recipes sorting algorithm

**********************************************************************/

import recipes from "../../data/recipes.js";
import { DropdownManager } from "../classes/DropdownManager.js";
import { displayErrorMessage } from "./displayErrorMessage.js";
import { displayRecipes } from "./displayRecipes.js";
import { displayRecipesNumber } from "./displayRecipesNumber.js";


// Initialise class
const ingredientsDropdown = new DropdownManager("dropdown-ingredients", recipes, "ingredients");
const appliancesDropdown = new DropdownManager("dropdown-appliances", recipes, "appliance");
const ustensilsDropdown = new DropdownManager("dropdown-utils", recipes, "ustensils");


export function filterRecipes(searchValue) {
    
	// Check the current input or tag value
	const valueToSearch = searchValue.trim().toLowerCase();    
	const regex = new RegExp(searchValue, "gi"); // g = global search, i = insensitive to breakage
	const filteredRecipes = [];		
	let count = 0;
    
	document.querySelector(".recipes-list").innerHTML = ""; // Empty section
    
	// The search must be at least 3 characters long
	if(valueToSearch.length < 3) {
		const errorMessage = document.querySelector(".error-message");
		if(errorMessage) {
			errorMessage.remove();
		}
		displayErrorMessage(searchValue);
        
	} else {
        
		// Browse the list of recipes
		for (let i = 0; i < recipes.length; i++) {
            
			let continu = true;
            
			// If content searchBar === content in recipe.[information]
			// Push recipe into filteredRecipes
            
			if(continu && regex.test(recipes[i].name)) {
				count = filteredRecipes.push(recipes[i]);
				continu = false; // Stop
			}
			if (continu && regex.test(recipes[i].description)) {
				count = filteredRecipes.push(recipes[i]);
				continu = false; // Stop
			}
			if (continu && regex.test(recipes[i].appliance)) {
				count = filteredRecipes.push(recipes[i]);
				continu = false; // Stop
			}
            
			// Browse the ingredients list
			const ingredientsList = recipes[i].ingredients;
			for (let g = 0; g < ingredientsList.length; g++){
                
				if(continu && regex.test(ingredientsList[g].ingredient)) { 
					count = filteredRecipes.push(recipes[i]);
					continu = false; // Stop
				}
			}
            
			// Browse the ustensils list
			const ustensilsList = recipes[i].ustensils;
			for (let g = 0; g < ustensilsList.length; g++){
                
				if(continu && regex.test(ustensilsList[g])) {
					count = filteredRecipes.push(recipes[i]);
					continu = false; // Stop
				}
			}
		}
        
		if (count > 0) {
			displayRecipes(filteredRecipes);
			displayRecipesNumber(filteredRecipes);
            
			// Using the DropDownManager method
			// To display the new filtered array
			ingredientsDropdown.collectUniqueItems(filteredRecipes);
			ustensilsDropdown.collectUniqueItems(filteredRecipes);
			appliancesDropdown.collectUniqueItems(filteredRecipes);

		} else {
			const errorMessage = document.querySelector(".error-message");
			if(errorMessage) {
				errorMessage.remove();
			}
			displayErrorMessage(searchValue);

		}       
	}
}