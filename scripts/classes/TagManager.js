import { filterRecipes } from "../utils/filterRecipes.js";

export class TagManager {
	/**
    * @param {HTMLElement} container
    * @param {'search'  | 'dropdown'} type
    * @param {Object} filterOptions
    * @param {Object} recipes
    */
   
	constructor(container, type, filterOptions, recipes) {
		this.container = container;
		this.type = type;
		this.filterOptions = filterOptions;
		this.recipes = recipes;
	}

	/**
	* @param {string} text
	* @param {HTMLElement} item
	* @param {string} tagType
	* @param {string} choiceType - 'ingredient' | 'appliance' | 'ustensil'
	*/
	createTag(text, item, tagType, choiceType) {
		console.log(text);
		console.log(item);
		console.log(tagType);
		console.log("Create Tag");
		// Create the tag container
		const tag = document.createElement('div');
		tag.classList.add("tag", "d-flex", "flex-row", "flex-nowrap", "justify-content-between", "align-items-center", "p-3", "me-4", "mb-2");
		tag.innerHTML = `
		<p>${text}</p>
		<button>Fermer</button>
		`;
	
		// Add an event on the close button
		const closeButton = tag.querySelector("button");
		closeButton.addEventListener('click', () => {
			// Deletes the tag and the "tagged" class on the item
			this.removeTag(tag, item, tagType, text, choiceType);
		});
		
		// Append the tag to the container
		this.container.appendChild(tag);
	}

	/**
	* @param {HTMLElement} tag
	* @param {HTMLElement} item
	* @param {string} tagType
	* @param {string} text
	* @param {string} choiceType - 'ingredient' | 'appliance' | 'ustensil'
	*/
	removeTag(tag, item, tagType, text, choiceType) {
		console.log(tag);
		console.log(item);
		console.log(tagType);
		console.log(text);
		console.log("Remove Tag");
		
		if(tagType === 'search') {
			// Vider la searchbar
			const searchBar = document.getElementById("searchbar");
			searchBar.value = '';
			this.filterOptions.searchbarText = '';
		
		} else if (tagType === 'dropdown') {
			// Retirer la classe tagged
			if(item) {
				item.classList.remove("tagged");
			}
			// Retirer l'élément du tableau des choix approprié
            let choiceArray;
            switch(choiceType) {
                case 'ingredient':
                    choiceArray = this.filterOptions.filters.selectedIngredients;
                    break;
                case 'appliance':
                    choiceArray = this.filterOptions.filters.selectedAppliances;
                    break;
                case 'ustensil':
                    choiceArray = this.filterOptions.filters.selectedUstensils;
                    break;
            }

            const index = choiceArray.indexOf(text);
            if (index > -1) {
                choiceArray.splice(index, 1);
            }
		}

		// Supprimer le tag du DOM
		this.container.removeChild(tag);

		// Relancer la fonction filterRecipes avec les options de filtrage mises à jour
		console.log("trie recettes TagManager");
		filterRecipes(this.recipes, this.filterOptions);
	}


	
	// V1
	// /**
	// * @param {HTMLElement} container
	// * @param {'search'  | 'dropdown'} type
	// */
	// constructor(container, type) {
	// 	this.container = container;
	// 	this.type = type;
	// }
	
	// /**
	// * @param {string} text
	// * @param {HTMLElement} item
	// */
	// createTag(text, item) {
	// 	// Create the tag container
	// 	const tag = document.createElement('div');
	// 	tag.classList.add("tag", "d-flex", "flex-row", "flex-nowrap", "justify-content-between", "align-items-center", "p-3", "me-4", "mb-2");
	// 	tag.innerHTML = `
	// 	<p>${text}</p>
	// 	<button>Fermer</button>
	// 	`;
		
	// 	// Add an event on the close button
	// 	const closeButton = tag.querySelector("button");
	// 	closeButton.addEventListener('click', () => {
			
	// 		// Deletes the tag and the "tagged" class on the item
	// 		this.removeTag(tag, item);
			
	// 	});
		
	// 	// Append the tag to the container
	// 	this.container.appendChild(tag);
	// }
	
	// /**
	// * @param {HTMLElement} tag
	// * @param {HTMLElement} item
	// */
	// removeTag(tag, item) {
	// 	// if(this.type === 'search') {
	// 	// 	// Vider la seachbar
	// 	// 	const searchBar = document.getElementById("searchbar");

	// 	// 	const clearSearchBar = new CustomEvent('clear');
	// 	// 	searchBar.dispatchEvent(clearSearchBar)
	// 	// } else {

	// 	// 	// retirer la classe tagged
	// 	// 	if(item) {
	// 	// 		item.classList.remove("tagged");
	// 	// 	}
	// 	// }

	// 	// retirer la classe tagged
	// 	if(item) {
	// 		item.classList.remove("tagged");
	// 	}
		
	// 	this.container.removeChild(tag);
	// }
}