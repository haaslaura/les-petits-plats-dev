/**********************************************************************

This code allows new tags to be created after selection by the user

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

export function chooseOptions(recipes, filterOptions) {

    const choiceTables = filterOptions.filters;

    // Parcourir les dropdowns
    const listDropdowns = document.querySelectorAll(".dropdown");
    listDropdowns.forEach(list => {

        const listItem = list.querySelectorAll(".dropdown-item");

        for (let i = 0; i < listItem.length; i++) {

            listItem[i].addEventListener("click", () => {
                switch (list.id) {
                case "dropdown-ingredients":

                    let indiceI = choiceTables.selectedIngredients.lastIndexOf(listItem[i].textContent);
                    if (indiceI !== -1) {
                        
                        // Retirer l'élément du tableau grâce à son indice :
                        choiceTables.selectedIngredients.splice(indiceI, 1);

                    } else {

                        // Ajouter l'élément au tableau :
                        choiceTables.selectedIngredients.push(listItem[i].textContent);
                    }
                    // Ajouter ou retirer le tag puis filtrer les recettes
                    createOrCloseTag(listItem[i]);
                    filterRecipes(recipes, filterOptions);

                    break;

                case "dropdown-appliances":

                    let indiceA = choiceTables.selectedAppliances.lastIndexOf(listItem[i].textContent);
                    if (indiceA !== -1) {
                        
                        // Retirer l'élément du tableau grâce à son indice :
                        choiceTables.selectedAppliances.splice(indiceA, 1);

                    } else {

                        // Ajouter l'élément au tableau :
                        choiceTables.selectedAppliances.push(listItem[i].textContent);
                    }
                    createOrCloseTag(listItem[i]);
                    filterRecipes(recipes, filterOptions);

                    break;

                case "dropdown-utils":
                    
                let indiceU = choiceTables.selectedUstensils.lastIndexOf(listItem[i].textContent);
                    if (indiceU !== -1) {
                        
                        // Retirer l'élément du tableau grâce à son indice :
                        choiceTables.selectedUstensils.splice(indiceU, 1);

                    } else {

                        // Ajouter l'élément au tableau :
                        choiceTables.selectedUstensils.push(listItem[i].textContent);
                    }
                    createOrCloseTag(listItem[i]);
                    filterRecipes(recipes, filterOptions);

                    break;
            
                default:
                    console.log("Cette liste d'élément n'est pas pris en compte");
                }
            })
        }
    });
}

function createOrCloseTag(item) {

    // Initialise the class
    const tagManager = new TagManager(document.querySelector(".display-tag"));

    const text = item.textContent;
    const allTags = document.querySelectorAll(".tag");
    let exists = false;

    // If the tag already exists, delete it
    allTags.forEach(tag => {
        if (tag.querySelector("p").textContent === text) {
            exists = true;
            tagManager.removeTag(tag, item);
        }
    });

    // If the tag does not exist, create it and add a class to the item
    if (!exists) {
        tagManager.createTag(text, item);
        item.classList.add("tagged");

    }
}

