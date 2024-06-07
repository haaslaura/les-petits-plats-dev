import { displayErrorMessage } from "../utils/displayErrorMessage.js";
import { displayRecipesNumber } from "../utils/displayRecipesNumber.js";
import { filterRecipes } from "../utils/filterRecipes.js";
import { TagManager } from "./TagManager.js";


export class SearchBar {
	/**
     * @param {Array} recipes
     */
	constructor(recipes, filterOptions) {
		this.recipes = recipes;
		this.filterOptions = filterOptions;

		// V1
		// this.searchBarTag = new TagManager(document.querySelector(".display-tag"), 'search');
		// V2 avec correction TagManager
		this.searchBarTag = new TagManager(document.querySelector(".display-tag"), 'search', this.filterOptions, recipes);

		this.searchForm = document.querySelector(".searchform");
		this.searchBar = document.getElementById("searchbar");
		this.searchButton = document.querySelector(".loop-icon");
		this.errorMessage = null;

		this.initialize();	
	}

	initialize() {
		this.initializeEventListeners();
	}

	checkInputValueValidity(event) {		
		event.preventDefault();

		// Remove any previous error message
		this.errorMessage = document.querySelector(".error-message");
		if(this.errorMessage) {
			this.errorMessage.remove();
		}

		// Remove any previous tag
		const allTags = document.querySelectorAll(".tag");
		allTags.forEach(tag => {
			if (tag.querySelector("p").textContent === this.filterOptions.searchbarText) {
				this.searchBarTag.removeTag(tag); // active the clear event
			}
		});

		if(!this.searchBar.checkValidity() || (this.searchBar.value.length > 0 && this.searchBar.value.length < 3)){
			
			// Empty the filter of any previous contents
			this.filterOptions.searchbarText = "";
			filterRecipes(this.recipes, this.filterOptions);

			// Display the error message
			displayErrorMessage(this.searchBar.value);
			displayRecipesNumber([]);

		// If all conditions are met
		} else {
			this.filterOptions.searchbarText = this.searchBar.value;

			if (this.searchBar.value.length !== 0) {
				// V1
				// this.searchBarTag.createTag(this.filterOptions.searchbarText);
				// V2 = text, item, tagType
				this.searchBarTag.createTag(this.filterOptions.searchbarText, null, 'search');
			}
			
			filterRecipes(this.recipes, this.filterOptions);
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

		// Clear the searchbar
		this.searchBar.addEventListener('clear', () => {

			console.log("clear event");

			this.searchBar.value = "";
			this.filterOptions.searchbarText = "";
			filterRecipes(this.recipes, this.filterOptions);
		})
       
		// If the input is empty, redisplay the recipes
		this.searchBar.addEventListener("input", () => {
			
			if (this.searchBar.value.trim() === "") {
				
				// Remove any previous error message
				this.errorMessage = document.querySelector(".error-message");
				if(this.errorMessage) {
					this.errorMessage.remove();
				}

				// Remove any previous tag
				const allTags = document.querySelectorAll(".tag");
				allTags.forEach(tag => {
					if (tag.querySelector("p").textContent === this.filterOptions.searchbarText) {
						this.searchBarTag.removeTag(tag); // active the clear event
					}
				});

				this.filterOptions.searchbarText = "";
				filterRecipes(this.recipes, this.filterOptions);
			}

		});
	}
}