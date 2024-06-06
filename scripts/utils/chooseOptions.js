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
 * @param {Object} recipes 
 * @param {FilterOptions} filterOptions 
 */


// Function to update the "tagged" class
const updateTaggedClass = (item, text) => {
    const allTags = document.querySelectorAll(".tag");
    allTags.forEach(tag => {
        if (tag.querySelector("p").textContent === text) {
            item.classList.add("tagged");
        }
    });
};


export function chooseOptions(recipes, filterOptions, dropdownId) {
    console.log("chooseOptions function");

    const choiceTables = filterOptions.filters;

    switch (dropdownId) {
        case "dropdown-ingredients":

            const listIngredients = document.getElementById(dropdownId).querySelectorAll("li");

            // Function to manage the addition/deletion of the ingredient
            const handleIngredientClick = (item, text) => {
                const tagManager = new TagManager(document.querySelector(".display-tag"));
                let indiceI = choiceTables.selectedIngredients.lastIndexOf(text);

                if (indiceI !== -1) {
                    choiceTables.selectedIngredients.splice(indiceI, 1);
                    filterRecipes(recipes, filterOptions);

                    const allTags = document.querySelectorAll(".tag");
                    allTags.forEach(tag => {
                        if (tag.querySelector("p").textContent === text) {
                            tagManager.removeTag(tag, item);
                            item.classList.remove("tagged");
                        }
                    });
                } else {
                    tagManager.createTag(text);
                    choiceTables.selectedIngredients.push(text);
                    filterRecipes(recipes, filterOptions);
                }
            };

            // Browse the list of ingredients
            listIngredients.forEach(item => {
                const text = item.textContent;
                
                updateTaggedClass(item, text);
                item.addEventListener("click", () => handleIngredientClick(item, text));
            });
  
            break;

        case "dropdown-appliances":

            const listAppliances = document.getElementById(dropdownId).querySelectorAll("li");

            // Function to manage the addition/deletion of the appliances
            const handleApplianceClick = (item, text) => {
                const tagManager = new TagManager(document.querySelector(".display-tag"));
                let indiceI = choiceTables.selectedAppliances.lastIndexOf(text);

                if (indiceI !== -1) {
                    choiceTables.selectedAppliances.splice(indiceI, 1);
                    filterRecipes(recipes, filterOptions);

                    const allTags = document.querySelectorAll(".tag");
                    allTags.forEach(tag => {
                        if (tag.querySelector("p").textContent === text) {
                            tagManager.removeTag(tag, item);
                            item.classList.remove("tagged");
                        }
                    });
                } else {
                    tagManager.createTag(text);
                    choiceTables.selectedAppliances.push(text);
                    filterRecipes(recipes, filterOptions);
                }
            };
            // Browse the list of appliances
            listAppliances.forEach(item => {
                const text = item.textContent;
                
                updateTaggedClass(item, text);
                item.addEventListener("click", () => handleApplianceClick(item, text));
            });
            
            break;

        case "dropdown-utils":

            const listUstensils = document.getElementById(dropdownId).querySelectorAll("li");

            // Function to manage the addition/removal of utensils
            const handleUstensilsClick = (item, text) => {
                const tagManager = new TagManager(document.querySelector(".display-tag"));
                let indiceI = choiceTables.selectedUstensils.lastIndexOf(text);

                if (indiceI !== -1) {
                    choiceTables.selectedUstensils.splice(indiceI, 1);
                    filterRecipes(recipes, filterOptions);

                    const allTags = document.querySelectorAll(".tag");
                    allTags.forEach(tag => {
                        if (tag.querySelector("p").textContent === text) {
                            tagManager.removeTag(tag, item);
                            item.classList.remove("tagged");
                        }
                    });
                } else {
                    tagManager.createTag(text);
                    choiceTables.selectedUstensils.push(text);
                    filterRecipes(recipes, filterOptions);
                }
            };

            // Browse the list of utensils
            listUstensils.forEach(item => {
                const text = item.textContent;
                
                updateTaggedClass(item, text);
                item.addEventListener("click", () => handleUstensilsClick(item, text));
            });

            break;
    
        default:
            console.log("Cette liste d'élément n'est pas pris en compte")
            break;
    }
}