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
			// Filter recipes... 
			displayRecipes(filteredRecipes);
			// ... and update the number of recipes
			displayRecipesNumber(filteredRecipes);
			// ... and add a tag with the content of the search
			const tagManagerInstance = new TagManager();
			tagManagerInstance.createTag(searchValue);
            
			// ...and using the DropDownManager method to display the new filtered array
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

/*

if (searchText.length < 3) {

		const errorMessage = document.querySelector(".error-message");
		if(errorMessage) {
			errorMessage.remove();
		}
		displayErrorMessage(searchText);
        
	} else {
    // Sinon filtrer les recettes en fonction des critères choisis par l'utilisateur

		
		const filteredRecipes = recipes.filter(recipe => {

			// Vérifier si le nom ou la description de la recette correspond à la recherche

			if (regex.test(recipe.name) || regex.test(recipe.description)) {

				// Vérifier si tous les ingrédients sélectionnés sont présents dans la recette
				if (selectedIngredients.every(ingredient => recipe.ingredients.some(recipeIngredient => recipeIngredient.ingredient === ingredient))) {
					
					// Vérifier si l'appareil sélectionné est présent dans la recette
					if (selectedAppliances.includes(recipe.appliance)) {
						
						// Vérifier si tous les ustensiles sélectionnés sont présents dans la recette
						if (selectedUstensils.every(ustensil => recipe.ustensils.includes(ustensil))) {
							return true; // La recette correspond à tous les critères
						}
					}
				}
			}
			return false; // La recette ne correspond pas à au moins un critère
		});

		// Afficher les recettes filtrées et mettre à jour le nombre de recettes affichées
		displayRecipes(filteredRecipes);
		displayRecipesNumber(filteredRecipes);

		// Créer un tag avec le texte de recherche
		const tagManagerInstance = new TagManager();
		tagManagerInstance.createTag(searchText);

		// Mettre à jour les listes déroulantes avec les éléments uniques des recettes filtrées
		ingredientsDropdown.collectUniqueItems(filteredRecipes);
		ustensilsDropdown.collectUniqueItems(filteredRecipes);
		appliancesDropdown.collectUniqueItems(filteredRecipes);


		// Afficher le message d'erreur s'il n'y a aucune recette
		if (filteredRecipes.length === 0) {
			const errorMessage = document.querySelector(".error-message");
			if(errorMessage) {
				errorMessage.remove();
			}
			displayErrorMessage(searchText);
		}
*/