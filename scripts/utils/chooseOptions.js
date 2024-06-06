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

export function chooseOptions(recipes, filterOptions, dropdownId) {
    console.log("chooseOptions()");

    const choiceTables = filterOptions.filters;
    const tagManager = new TagManager(document.querySelector(".display-tag"));

    switch (dropdownId) {
        case "dropdown-ingredients":
        
            console.log("cas ingrédient");      

            const listIngredients = document.getElementById(dropdownId).querySelectorAll("li");
        
            // Function to update the "tagged" class
            const updateTaggedClassI = (item, text) => {
                console.log("updateTaggedClass()");

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
                console.log("lance handleIngredientClick");
                
                let indiceI = choiceTables.selectedIngredients.lastIndexOf(text);

                if (indiceI !== -1) {
                    
                    choiceTables.selectedIngredients.splice(indiceI, 1);

                    const allTags = document.querySelectorAll(".tag");
                    allTags.forEach(tag => {
                        if (tag.querySelector("p").textContent === text) {
                            tagManager.removeTag(tag, item);                      
                        }
                    });
                } else {
                    tagManager.createTag(text);
                    choiceTables.selectedIngredients.push(text);
                }

                // Filter recipes
                filterRecipes(recipes, filterOptions);
                // Update the tagged class after modifying the selection
                updateTaggedClassI(item, text);
            };


            // Browse the list of ingredients
            listIngredients.forEach(item => {
                const text = item.textContent;

                updateTaggedClassI(item, text);
                item.addEventListener("click", () => handleIngredientClick(item, text));
            });
              
            break;

        case "dropdown-appliances":
        console.log("cas appareil");      

        const listAppliances = document.getElementById(dropdownId).querySelectorAll("li");

        // Function to update the "tagged" class
        const updateTaggedClassA = (item, text) => {
            console.log("updateTaggedClass()");

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
            console.log("lance handleAppliancesClick");
            
            let indiceI = choiceTables.selectedAppliances.lastIndexOf(text);

            if (indiceI !== -1) {
                
                choiceTables.selectedAppliances.splice(indiceI, 1);

                const allTags = document.querySelectorAll(".tag");
                allTags.forEach(tag => {
                    if (tag.querySelector("p").textContent === text) {
                        tagManager.removeTag(tag, item);                      
                    }
                });
            } else {
                tagManager.createTag(text);
                choiceTables.selectedAppliances.push(text);
            }

            // Filter recipes
            filterRecipes(recipes, filterOptions);
            // Update the tagged class after modifying the selection
            updateTaggedClassA(item, text);
        };


        // Browse the list of ingredients
        listAppliances.forEach(item => {
            const text = item.textContent;

            updateTaggedClassA(item, text);
            item.addEventListener("click", () => handleAppliancesClick(item, text));
        });
            
            break;

        case "dropdown-utils":
            console.log("cas ustensiles");      

            const listUstensils = document.getElementById(dropdownId).querySelectorAll("li");
    
            // Function to update the "tagged" class
            const updateTaggedClassU = (item, text) => {
                console.log("updateTaggedClass()");
    
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
                console.log("lance handleUstensilsClick");
                
                let indiceI = choiceTables.selectedUstensils.lastIndexOf(text);
    
                if (indiceI !== -1) {
                    
                    choiceTables.selectedUstensils.splice(indiceI, 1);
    
                    const allTags = document.querySelectorAll(".tag");
                    allTags.forEach(tag => {
                        if (tag.querySelector("p").textContent === text) {
                            tagManager.removeTag(tag, item);                      
                        }
                    });
                } else {
                    tagManager.createTag(text);
                    choiceTables.selectedUstensils.push(text);
                }
    
                // Filter recipes
                filterRecipes(recipes, filterOptions);
                // Update the tagged class after modifying the selection
                updateTaggedClassU(item, text);
            };
    
    
            // Browse the list of ingredients
            listUstensils.forEach(item => {
                const text = item.textContent;
    
                updateTaggedClassU(item, text);
                item.addEventListener("click", () => handleUstensilsClick(item, text));
            });


            break;
    
        default:
            console.log("Cette liste d'élément n'est pas pris en compte")
            break;
    }
}