import { displayErrorMessage } from "../utils/displayErrorMessage.js";
import { displayRecipes } from "../utils/displayRecipes.js";
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

		this.searchBarTag = new TagManager(document.querySelector(".display-tag"), 'search');

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
		console.log(event);
		console.log(this.searchBar.value); // coco / immédiat
		console.log(this.searchBar.value.length); // coco / immédiat
		console.log(this.filterOptions.searchbarText); // rien / décalé
		

		// V2

		// DANS TOUS LES CAS
		event.preventDefault();

		// 1) Retirer le message d'erreur précédent éventuel
		this.errorMessage = document.querySelector(".error-message");
		if(this.errorMessage) {
			this.errorMessage.remove();
		}

		// 	2) Retirer le tag précédent éventuel
		const allTags = document.querySelectorAll(".tag");
		allTags.forEach(tag => {
			if (tag.querySelector("p").textContent === this.filterOptions.searchbarText) {
				this.searchBarTag.removeTag(tag);
				// ce qui va activer le clear event
			}
		});

		// If (le message est invalide (sécurité) OU le message est > 0 ET < à 3 lettres) {
		if(!this.searchBar.checkValidity() || (this.searchBar.value.length > 0 && this.searchBar.value.length < 3)){
			
			// 	3) Vider le filtre de son contenu précédent éventuel
			this.filterOptions.searchbarText = "";
			filterRecipes(this.recipes, this.filterOptions);

			// 	4) Afficher une erreur (searchbar.value n'existe pas)
			displayErrorMessage(this.searchBar.value);

		// Si toutes les conditions sont remplies
		} else {
			this.filterOptions.searchbarText = this.searchBar.value;

			//  3) Ajouter le nouveau tag
			this.searchBarTag.createTag(this.filterOptions.searchbarText);

			// 	4) Ajouter le nouveau contenu au filtre
			filterRecipes(this.recipes, this.filterOptions);
		}


		// VERSION PRECEDENTE V1
		// this.errorMessage = document.querySelector(".error-message");

		// // Check that there isn't already an error message, otherwise remove it
		// if(this.errorMessage) {
		// 	this.errorMessage.remove();
		// }

		// // If the constraints of the element (the input) are not satisfied
		// if(!this.searchBar.checkValidity()){

		// 	// Prevent default behaviour and add an error message
		// 	event.preventDefault();
		// 	displayErrorMessage(this.searchBar.value);
          
		// 	// If the content of the input is valid, the recipe filter function is launched
		// } else if (this.searchBar.value.trim() === "") {

		// 	// If the tag already exists, delete it
		// 	const allTags = document.querySelectorAll(".tag");
		// 	allTags.forEach(tag => {
		// 		if (tag.querySelector("p").textContent === this.filterOptions.searchbarText) {
		// 			this.searchBarTag.removeTag(tag);
		// 			// ce qui va activer le clear event,
		// 			// vider les contenus et lancer le filtre
		// 		}
		// 	});

		// } else {


		// 	// 1er : coco, 2e fraise
		// 	console.log(this.searchBar.value); // 1er passage : coco | 2e : fraise
		// 	console.log(this.filterOptions.searchbarText); // 1er passage : vide | 2e : coco

		// 	const savSearchbarValue = this.searchBar.value;
			
		// 	// If the tag already exists, delete it
		// 	const allTags = document.querySelectorAll(".tag");
		// 	allTags.forEach(tag => {
		// 		if (tag.querySelector("p").textContent === this.filterOptions.searchbarText) {
		// 			this.searchBarTag.removeTag(tag);
		// 		}
		// 	});
		// 	// à partir de là, clear event vide searchBar.value et filterOptions.searchbarText
		// 	// et lance le filtrage

		// 	this.filterOptions.searchbarText = savSearchbarValue; // on remet une valeur
		// 	filterRecipes(this.recipes, this.filterOptions); // on relance le filtre
		// 	if (this.filterOptions.searchbarText !== "" && this.filterOptions.searchbarText.length > 3) {
		// 		this.searchBarTag.createTag(this.filterOptions.searchbarText); // on remet un tag
		// 	}
		// }
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
				
				console.log("input vidé");

				// ADD V2
				// 1) Retirer le message d'erreur précédent éventuel
				this.errorMessage = document.querySelector(".error-message");
				if(this.errorMessage) {
					this.errorMessage.remove();
				}

				// 2) Retirer le tag précédent éventuel
				const allTags = document.querySelectorAll(".tag");
				allTags.forEach(tag => {
					if (tag.querySelector("p").textContent === this.filterOptions.searchbarText) {
						this.searchBarTag.removeTag(tag);
						// ce qui va activer le clear event
					}
				});

				// 3) Vider le filtre de son contenu précédent éventuel
				this.filterOptions.searchbarText = "";
				filterRecipes(this.recipes, this.filterOptions);
			}

		});
	}
}

/*
Entrer message / Valider avec bouton ou entrer
>> lance la fonction

Si le message est vide ou vidé ?
	1) Retirer le message d'erreur précédent éventuel
	2) Retirer le tag précédent éventuel /!\ retirer le tag vide la searchbar
	3) Vider le filtre de son contenu précédent éventuel

If (le message est invalide (sécurité) OU le message est > 0 ET < à 3 lettres) {
	1) Retirer le message d'erreur précédent éventuel
	2) Retirer le tag précédent éventuel /!\ retirer le tag vide la searchbar
	3) Vider le filtre de son contenu précédent éventuel
	4) Afficher une erreur (searchbar.value n'existe pas)
}

If (le message n'est pas vide ET il est valide (sécurité) ET il fait plus de 3 lettres) {
	Alors il faut :
	1) Retirer le message d'erreur précédent éventuel
	2) Retirer le tag précédent éventuel
	3) Ajouter le nouveau tag
	4) Vider le filtre de son contenu précédent éventuel
	5) Ajouter le nouveau contenu au filtre
}
*/