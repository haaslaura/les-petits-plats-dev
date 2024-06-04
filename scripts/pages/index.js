/**********************************************************************

This JavaScript code is linked to the index.html page

**********************************************************************/

// Importing data and functions
import recipes from "../../data/recipes.js";
import { DropdownManager } from "../classes/DropDownManager.js";
import { SearchBar } from "../classes/SearchBar.js";
// import { chooseOptions } from "../utils/chooseOptions.js";
import { displayRecipes } from "../utils/displayRecipes.js";
import { displayRecipesNumber } from "../utils/displayRecipesNumber.js";


// Display the all recipes
displayRecipes(recipes);
displayRecipesNumber(recipes);


// Initialisation of filter data
// TODO : voir pour rationaliser "filters"
const filterOptions = {
    searchbarText: "",
    filters: {
        selectedIngredients: [],
        selectedAppliances: [],
        selectedUstensils: [],
    },
}


// Initialise classes
new SearchBar(recipes, filterOptions);

new DropdownManager("dropdown-ingredients", recipes, "ingredients", filterOptions);
new DropdownManager("dropdown-appliances", recipes, "appliance", filterOptions);
new DropdownManager("dropdown-utils", recipes, "ustensils", filterOptions);


// Choose your dropdown filtering options
// chooseOptions(recipes, filterOptions);