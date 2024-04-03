/**********************************************************************

This code concerns the recipes sorting algorithm

**********************************************************************/

import recipes from "../../data/recipes.js";
import { DropdownManager } from "../classes/DropdownManager.js";
import { TagManager } from "../classes/TagManager.js";
import { displayErrorMessage } from "./displayErrorMessage.js";
import { displayRecipes } from "./displayRecipes.js";
import { displayRecipesNumber } from "./displayRecipesNumber.js";



// Initialise class
const ingredientsDropdown = new DropdownManager("dropdown-ingredients", recipes, "ingredients");
const appliancesDropdown = new DropdownManager("dropdown-appliances", recipes, "appliance");
const ustensilsDropdown = new DropdownManager("dropdown-utils", recipes, "ustensils");


export function filterRecipes(filterOptions) {

	// Vider la section
	document.querySelector(".recipes-list").innerHTML = "";

	// Destructurer l'objet
	const { searchText, selectedIngredients, selectedAppliances, selectedUstensils } = filterOptions;
	console.log(searchText);
	console.log(selectedIngredients);
	console.log(selectedAppliances);
	console.log(selectedUstensils);

	// Convertir le texte de recherche en expression régulière
    const regex = new RegExp(searchText, "gi"); // g = global search, i = insensitive to breakag
	const filteredRecipes = [];
	let count = 0;


	// Si la recherche fait moins de 3 caractères, afficher message d'erreur
	if (searchText.length < 3) {

		const errorMessage = document.querySelector(".error-message");
		if(errorMessage) {
			errorMessage.remove();
		}
		displayErrorMessage(searchText);
        
	} else {
    // Sinon filtrer les recettes en fonction des critères choisis par l'utilisateur

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
			// Filter recipes... 
			displayRecipes(filteredRecipes);
			// ... and update the number of recipes
			displayRecipesNumber(filteredRecipes);
			// ... and add a tag with the content of the search
			const tagManagerInstance = new TagManager();
			tagManagerInstance.createTag(searchText);
            
			// ...and using the DropDownManager method to display the new filtered array
			ingredientsDropdown.collectUniqueItems(filteredRecipes);
			ustensilsDropdown.collectUniqueItems(filteredRecipes);
			appliancesDropdown.collectUniqueItems(filteredRecipes);

		} else {
			const errorMessage = document.querySelector(".error-message");
			if(errorMessage) {
				errorMessage.remove();
			}
			displayErrorMessage(searchText);
			// Ne devrait être rien d'autre car les mots que 'searchText'
			// clés sont créer à partir des recettes

		}  
	}
}