/**********************************************************************

This code is used to fill in the user choice tables when an ingredient, appliance or utensil is clicked.

**********************************************************************/

import { TagManager } from "../classes/TagManager.js";
import { filterRecipes } from "./filterRecipes.js";

/**
* @typedef {Object} FilterOptions
* @property {Object} filters
* @property {string[]} selectedIngredients
* @property {string[]} selectedAppliances
* @property {string[]} selectedUstensils
* 
* @typedef {Object} Recipes
* @param {FilterOptions} filterOptions
* 
* @typedef {string} DropdownId
* @param {string} dropdownId
*/

export function chooseOptions(recipes, filterOptions, dropdownId) {
	
	const choiceTables = filterOptions.filters;
	const tagManager = new TagManager(document.querySelector(".display-tag"), "dropdown", filterOptions, recipes);
	
	switch (dropdownId) {
	case "dropdown-ingredients": {
			
		const listIngredients = document.getElementById(dropdownId).querySelectorAll("li");
			
		// Function to update the "tagged" class
		const updateTaggedClassI = () => {
				
			const allTags = document.querySelectorAll(".tag");
			listIngredients.forEach(item => {
				const text = item.textContent;
				let tagged = false;
					
				allTags.forEach(tag => {
					if (tag.querySelector("p").textContent === text) {
						item.classList.add("tagged");
						tagged = true;
					}
				});
				if (!tagged) {
					item.classList.remove("tagged");
				}
			});
		};
			
			
		// Function to manage the addition/deletion of the ingredient
		const handleIngredientClick = (item, text) => {
				
			let indiceI = choiceTables.selectedIngredients.lastIndexOf(text);
				
			if (indiceI !== -1) {
					
				choiceTables.selectedIngredients.splice(indiceI, 1);
					
				const allTags = document.querySelectorAll(".tag");
				allTags.forEach(tag => {
					if (tag.querySelector("p").textContent === text) {
						tagManager.removeTag(tag, item, "dropdown", text, "ingredient");                      
					}
				});
			} else {
				tagManager.createTag(text, item, "dropdown", "ingredient");
				choiceTables.selectedIngredients.push(text);
			}
				
			// Filter recipes
			filterRecipes(recipes, filterOptions);
			// Update the tagged class after modifying the selection
			updateTaggedClassI();
		};
			
			
		// Browse the list of ingredients
		listIngredients.forEach(item => {
			const text = item.textContent;
				
			updateTaggedClassI();
			item.addEventListener("click", () => handleIngredientClick(item, text));
			item.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {
					handleIngredientClick(item, text);
				}
			});
		});
			
		break;
	}
		
	case "dropdown-appliances": {
			
		const listAppliances = document.getElementById(dropdownId).querySelectorAll("li");
			
		// Function to update the "tagged" class
		const updateTaggedClassA = () => {
				
			const allTags = document.querySelectorAll(".tag");
			listAppliances.forEach(item => {
				const text = item.textContent;
				let tagged = false;
					
				allTags.forEach(tag => {
					if (tag.querySelector("p").textContent === text) {
						item.classList.add("tagged");
						tagged = true;
					}
				});
				if (!tagged) {
					item.classList.remove("tagged");
				}
			});
		};
			
			
		// Function to manage the addition/deletion of the ingredient
		const handleAppliancesClick = (item, text) => {
				
			let indiceI = choiceTables.selectedAppliances.lastIndexOf(text);
				
			if (indiceI !== -1) {
					
				choiceTables.selectedAppliances.splice(indiceI, 1);
					
				const allTags = document.querySelectorAll(".tag");
				allTags.forEach(tag => {
					if (tag.querySelector("p").textContent === text) {
						tagManager.removeTag(tag, item, "dropdown", text, "appliance");                      
					}
				});
			} else {
				tagManager.createTag(text, item, "dropdown", "appliance");
				choiceTables.selectedAppliances.push(text);
			}
				
			// Filter recipes
			filterRecipes(recipes, filterOptions);
			// Update the tagged class after modifying the selection
			updateTaggedClassA();
		};
			
			
		// Browse the list of ingredients
		listAppliances.forEach(item => {
			const text = item.textContent;
				
			updateTaggedClassA();
			item.addEventListener("click", () => handleAppliancesClick(item, text));
			item.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {
					handleAppliancesClick(item, text);
				}
			});
		});
			
		break;
	}
		
	case "dropdown-utils": {
			
		const listUstensils = document.getElementById(dropdownId).querySelectorAll("li");
			
		// Function to update the "tagged" class
		const updateTaggedClassU = () => {
				
			const allTags = document.querySelectorAll(".tag");
			listUstensils.forEach(item => {
				const text = item.textContent;
				let tagged = false;
					
				allTags.forEach(tag => {
					if (tag.querySelector("p").textContent === text) {
						item.classList.add("tagged");
						tagged = true;
					}
				});
				if (!tagged) {
					item.classList.remove("tagged");
				}
			});
		};
			
			
		// Function to manage the addition/deletion of the ingredient
		const handleUstensilsClick = (item, text) => {
				
			let indiceI = choiceTables.selectedUstensils.lastIndexOf(text);
				
			if (indiceI !== -1) {
					
				choiceTables.selectedUstensils.splice(indiceI, 1);
					
				const allTags = document.querySelectorAll(".tag");
				allTags.forEach(tag => {
					if (tag.querySelector("p").textContent === text) {
						tagManager.removeTag(tag, item, "dropdown", text, "ustensil");                      
					}
				});
			} else {
				tagManager.createTag(text, item, "dropdown", "ustensil");
				choiceTables.selectedUstensils.push(text);
			}
				
			// Filter recipes
			filterRecipes(recipes, filterOptions);
			// Update the tagged class after modifying the selection
			updateTaggedClassU();
		};
			
			
		// Browse the list of ingredients
		listUstensils.forEach(item => {
			const text = item.textContent;
				
			updateTaggedClassU();
			item.addEventListener("click", () => handleUstensilsClick(item, text));
			item.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {
					handleUstensilsClick(item, text);
				}
			});
		});
			
			
		break;
	}
		
	default: {
		console.log("Cette liste d'élément n'est pas pris en compte");
		break;
	}
	}
}