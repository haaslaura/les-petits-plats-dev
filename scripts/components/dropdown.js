/**********************************************************************

This JavaScript code is used for dropdown menus to sort recipes

**********************************************************************/

// Importing data and functions
import recipes from "../../data/recipes.js";
import { DropdownManager } from "../classes/DropdownManager.js";


// Initialise classes
const ingredientsDropdown = new DropdownManager("dropdown-ingredients", recipes, "ingredients");
const appliancesDropdown = new DropdownManager("dropdown-appliances", recipes, "appliance");
const ustensilssDropdown = new DropdownManager("dropdown-utils", recipes, "ustensils");