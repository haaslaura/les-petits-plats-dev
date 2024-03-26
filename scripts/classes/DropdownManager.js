import { filterRecipes } from "../utils/filterRecipes.js";
import { TagManager } from "./TagManager.js";

export class DropdownManager {
	/**
     * 
     * @param {HTMLBodyElement} id
     * @param {data} dataArray
     * @param {string} dataKey 
     */
	constructor(id, dataArray, dataKey) {
		this.id = id;
		this.dataArray = dataArray;
		this.dataKey = dataKey;

		this.uniqueItems = new Set();
		this.itemsArray = [];
		this.capitalizedItemsArray = [];

		this.allTag = document.querySelectorAll(".tag");
		
		this.dropdown = document.getElementById(`${this.id}`); // The dropdown
		this.dropdownBtn = document.querySelector(`#${this.id} .dropdown-btn-filter`); // The button
		this.combobox = document.querySelector(`#${this.id} .option-list`); // The combobox node
		this.dropdownInput = document.querySelector(`#${this.id} .form-control`); // The Input
		this.dropdownElement = document.querySelector(`#${this.id} ul`); // The elements list		

		this.initialize();
	}

	initialize() {
		this.collectUniqueItems();
		this.initializeEventListeners();
	}


	/***********************************/
	/* Create the list of the elements */
	/***********************************/

	// Browse the recipe table to collect unique items
	collectUniqueItems(newRecipes) {
		
		const recipes = newRecipes || this.dataArray;
		this.uniqueItems = new Set();

		recipes.forEach(item => {
			
			if (item?.[this.dataKey]) {
				switch (typeof item[this.dataKey]) {

				case "object":   
					item[this.dataKey].forEach(subItem => {
						if (subItem?.ingredient) {
							this.uniqueItems.add(subItem.ingredient.toLowerCase());
						} else {
							this.uniqueItems.add(subItem.toLowerCase());
						}
					});
					break;

				case "string":
					this.uniqueItems.add(item[this.dataKey].toLowerCase());
					break;

				default:
					console.log("Erreur, format de données non pris en compte");
				} 
			}  
		});
		this.convertItemsToArray();
	}

	// Create an array of unique elements
	convertItemsToArray() {
		this.itemsArray = Array.from(this.uniqueItems);
		this.capitalizeItems();
	}

	// Re-capitalise the first letter of the first word
	capitalizeItems() {
		this.capitalizedItemsArray = this.itemsArray.map(item =>
			item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
		).sort();

		this.renderDropdownItems(this.capitalizedItemsArray);
	}


	/******************/
	/* Create the DOM */
	/******************/

	renderDropdownItems(options) {

		console.log("création");
		this.dropdownElement.innerHTML = "";

		options.forEach(item => {
			const element = document.createElement("li");
			element.setAttribute("role", "option");
			element.classList.add("dropdown-item", "d-flex", "flex-wrap", "align-items-center", "py-2");
			element.textContent = `${item}`;

			this.dropdownElement.appendChild(element);
		});		
	}
	
	// Add a class to the li item if the tag exist
	addClassToTheListElement(element) {

		console.log(this.allTag);
		console.log(element);

		if (element) {
			
			this.allTag.forEach(tag => {

				if(tag) {

					console.log(tag.querySelector("p").textContent);
					console.log(element.textContent);

					if (tag.querySelector("p").textContent === element.textContent) {

						element.classList.add("tagged");
					}
				}
			});
		}
	}


	/***************************/
	/* Manage filter functions */
	/***************************/
	
	comboboxAutocomplete() {
		// Retrieve the current input value
		const filter = this.dropdownInput.value.trim().toLowerCase();
		const filteredOptions = [];		
		let count = 0;

		if (filter.length > 0) {
			const regex = new RegExp(filter, "gi");
			this.capitalizedItemsArray.forEach(item => {
				if (regex.test(item)) {
					// Add the element to filteredOptions
					count = filteredOptions.push(item);
				}
			});
	
			// Update the options in the drop-down list according to the filtered options
			if (count > 0) {
				this.renderDropdownItems(filteredOptions);
			} else {
				this.dropdownElement.innerHTML = "Aucun élément ne correspond";
			}
		}
	}


	/**********************************/
	/* Navigation management & events */
	/**********************************/

	// Functions for unfolding or folding the drop-down list
	dropdownOpen() {
		this.dropdownBtn.setAttribute("aria-expanded", "true");
		this.combobox.style.maxHeight = "280px";
		this.combobox.style.opacity = "1";
		this.dropdownBtn.querySelector(".arrow-icon").setAttribute("src", "assets/icones/arrow-up.svg");
	}
	dropdownClose() {
		this.dropdownBtn.setAttribute("aria-expanded", "false");
		this.combobox.style.maxHeight = "0";
		this.combobox.style.opacity = "0";
		this.dropdownBtn.querySelector(".arrow-icon").setAttribute("src", "assets/icones/arrow-down.svg");
	}

	toggleDropdown() {
		const isExpanded = this.dropdownBtn.getAttribute("aria-expanded") === "true";

		if (!isExpanded) {
			this.dropdownOpen();
		} else {
			this.dropdownClose();
		}
	}

	// Initialization method for configuring event listeners
	initializeEventListeners() {
		
		/* For open/close dropdown */

		// If the screen is not touch-sensitive
		if (!window.hasOwnProperty("ontouchstart")) {

			// Setting up hover events
			this.dropdown.addEventListener("mouseover", this.dropdownOpen.bind(this));
			this.dropdown.addEventListener("mouseout", this.dropdownClose.bind(this));

			// Setting up keyboard Enter button events
			this.dropdownBtn.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {

					console.log("Avec tab + entrée :");
					this.toggleDropdown();
				}
				if (event.key === "Escape") {
					this.dropdownClose();
				}
			});

		// If the screen is touch-sensitive 
		} else {
			// Setting up click events
			this.dropdownBtn.addEventListener("click", this.toggleDropdown.bind(this));

			// Add an event to close the dropdown on an external click
			document.addEventListener("click", (event) => {
				if (!this.dropdown.contains(event.target)) {
					this.dropdownClose();
				}
			});
		}
		
		/* For the input */
		this.dropdownInput.addEventListener("input", this.comboboxAutocomplete.bind(this));
		this.dropdownInput.addEventListener("keydown", (event) => {
			if (event.key === "Backspace" || event.key === "Delete") {
				this.comboboxAutocomplete();
			}
		});

		/* For the li element */
		// Adds an event to create a new tag when an element is clicked

		const elementArray = this.dropdownElement.querySelectorAll("li");
		
		elementArray.forEach(element => {
		
			element.addEventListener("click", () =>	{
				
				// Trier recettes
				filterRecipes(element.textContent);
				
				// Crée le tag
				const tagManagerInstance = new TagManager();
				tagManagerInstance.createTag(element.textContent);

				// Element commun au tag en jaune
				this.addClassToTheListElement(element);
				console.log(element);

				// Si element en jaune, empêcher nouveau clic pour trier recette
				// ...
			});
		});
	}
}