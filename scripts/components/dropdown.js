/**********************************************************************

This JavaScript code is used for dropdown menus to sort recipes

**********************************************************************/

// Importing data and functions
import recipes from "../../data/recipes.js";

//1 - Afficher les listes

/************************
** INGREDIENT DROPDOWN **
************************/

// Créez un ensemble pour stocker les ingrédients uniques
let uniqueIngredients = new Set();

// Parcourir les recettes pour collecter les ingrédients uniques
recipes.forEach(item => {
    if(item?.ingredients) {
        for(let i = 0; i < item.ingredients.length; i ++) {
            uniqueIngredients.add(item.ingredients[i].ingredient.toLowerCase()); /* Converts a string to lower case to normalized cases */
        }   
    }
});

// Convertir les ingrédients collectés en tableau
let ingredientsArray = Array.from(uniqueIngredients);


// Capitalisez chaque mot avant de l'afficher + réceptionner un tableau trié par ordre alphabétique
let capitalizedIngredientsArray = ingredientsArray.map(ingredient =>
    ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase()
).sort();

// Pour chaque ingrédient à l'intérieur du tableau 'ingredientsArray', créer et intégrer les éléments du DOM
capitalizedIngredientsArray.forEach(item => {

    const element = document.createElement("li");
    const lien = document.createElement("a");
    lien.classList.add("dropdown-item", "d-flex", "flex-wrap", "align-items-center", "gap-2", "py-2");
    lien.setAttribute("href", "#");
    lien.textContent = `${item}`;
    
    element.appendChild(lien);
    
    document.querySelector("#dropdown-ingredients ul").appendChild(element);
});

/************************
** APPLIANCE DROPDOWN ***
************************/

// Créez un ensemble pour stocker les appareils uniques
let uniqueAppliances = new Set();

// Parcourir les recettes pour collecter les appareils uniques
recipes.forEach(item => {
    if(item?.appliance) {
        uniqueAppliances.add(item.appliance.toLowerCase()); /* Converts a string to lower case to normalized cases */
    }
});

// Convertir les appareils collectés en tableau
let appliancesArray = Array.from(uniqueAppliances);

// Capitalisez chaque mot avant de l'afficher + réceptionner un tableau trié par ordre alphabétique
let capitalizedAppliancesArray = appliancesArray.map(appliance =>
    appliance.charAt(0).toUpperCase() + appliance.slice(1).toLowerCase()
).sort();

// Pour chaque appareil, créer et intégrer les éléments du DOM
capitalizedAppliancesArray.forEach(item => {

    const element = document.createElement("li");
    const lien = document.createElement("a");
    lien.classList.add("dropdown-item", "d-flex", "flex-wrap", "align-items-center", "gap-2", "py-2");
    lien.setAttribute("href", "#");
    lien.textContent = `${item}`;
    
    element.appendChild(lien);
    
    document.querySelector("#dropdown-appliances ul").appendChild(element);
});

/************************
** USTENSILS DROPDOWN ***
************************/

// Créez un ensemble pour stocker les ustensiles uniques
let uniqueUstensils = new Set();

// Parcourir les recettes pour collecter les ustensiles uniques
recipes.forEach(item => {
    if(item?.ustensils) {
        for(let i = 0; i < item.ustensils.length; i ++) {
            uniqueUstensils.add(item.ustensils[i].toLowerCase()); /* Converts a string to lower case to normalized cases */
        }
    }
});

// Convertir les ustensiles collectés en tableau
let ustensilsArray = Array.from(uniqueUstensils);

// Capitalisez chaque mot avant de l'afficher + réceptionner un tableau trié par ordre alphabétique
let capitalizedUstensilsArray = ustensilsArray.map(ustensil =>
    ustensil.charAt(0).toUpperCase() + ustensil.slice(1).toLowerCase()
).sort();

// // Pour chaque ustensiles, créer et intégrer les éléments du DOM
capitalizedUstensilsArray.forEach(item => {

    const element = document.createElement("li");
    const lien = document.createElement("a");
    lien.classList.add("dropdown-item", "d-flex", "flex-wrap", "align-items-center", "gap-2", "py-2");
    lien.setAttribute("href", "#");
    lien.textContent = `${item}`;
    
    element.appendChild(lien);
    
    document.querySelector("#dropdown-utils ul").appendChild(element);
});


//2 - Action lors du clique au bouton ou au clavier