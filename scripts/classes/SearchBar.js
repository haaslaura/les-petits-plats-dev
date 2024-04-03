import { displayErrorMessage } from "../utils/displayErrorMessage.js";
import { displayRecipes } from "../utils/displayRecipes.js";
import { filterRecipes } from "../utils/filterRecipes.js";


export class SearchBar {
	/**
     * @param {Array} recipes
     */
	constructor(recipes) {
		this.recipes = recipes;

		this.searchForm = document.querySelector(".searchform");
		this.searchBar = document.getElementById("searchbar");
		this.searchButton = document.querySelector(".loop-icon");
		this.errorMessage = null;

		// TEST
		// Initialisation de l'objet filterOptions

		this.filterOptions = {
			searchText: "", // Texte de recherche initial vide
			selectedIngredients: [],
			selectedAppliances: [],
			selectedUstensils: []
		};

		// FIN TEST
		

		this.initialize();	
	}

	initialize() {
		this.initializeEventListeners();
	}

	checkInputValueValidity(event) {

		this.errorMessage = document.querySelector(".error-message");

		// Check that there isn't already an error message, otherwise remove it
		if(this.errorMessage) {
			this.errorMessage.remove();
		}

		// If the constraints of the element (the input) are not satisfied
		if(!this.searchBar.checkValidity()){

			// Prevent default behaviour and add an error message
			event.preventDefault();
			document.querySelector(".recipes-list").innerHTML = ""; // Empty section
			displayErrorMessage(this.searchBar.value);
          
			// If the content of the input is valid
			// any error messages are removed and the recipes are filtered
		} else {

			// TEST
			this.filterOptions.searchText = this.searchBar.value;
			console.log(this.filterOptions);
			filterRecipes(this.filterOptions);
			// FIN TEST
			// filterRecipes(this.searchBar.value);
		}
	}

   
	/**********************************/
	/* Navigation management & events */
	/**********************************/

	// Initialization method for configuring event listeners
	initializeEventListeners() {

		// Style the search bar when it is in focus or lose focus
		this.searchBar.addEventListener("focus", function () {
			document.querySelector(".input-group").style.outline = "3px solid rgb(255, 209, 91)";
			document.querySelector(".input-group").style.borderRadius = "14px";
		});

		this.searchBar.addEventListener("blur", function () {
			document.querySelector(".input-group").style.outline = "";
			document.querySelector(".input-group").style.borderRadius = "";
		});

		// Button events
		this.searchButton.addEventListener("click", (event) => {
			this.checkInputValueValidity(event);
		});

		// Input events
		this.searchBar.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				this.checkInputValueValidity(event);
			}
		});

		this.searchBar.addEventListener("input", () => {
			// If the input is empty, redisplay the recipes
			if (this.searchBar.value.trim() === "") {
				document.querySelector(".recipes-list").innerHTML = "";
				displayRecipes(this.recipes);
			}
		});
		
	}
}