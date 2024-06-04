import { chooseOptions } from "../utils/chooseOptions.js";
import { filterRecipes } from "../utils/filterRecipes.js";

export class DropdownManager {
	/**
     * 
     * @param {HTMLBodyElement} id
     * @param {data} dataArray
     * @param {string} dataKey 
     * @param {object} filterOptions 
     */
	constructor(id, dataArray, dataKey, filterOptions) {
		this.id = id;
		this.dataArray = dataArray;
		this.dataKey = dataKey;
        this.filterOptions = filterOptions;

		this.uniqueItems = new Set();
		this.itemsArray = [];
		this.capitalizedItemsArray = [];
	
		this.dropdown = document.getElementById(`${this.id}`); // The dropdown
		this.dropdownBtn = document.querySelector(`#${this.id} .dropdown-btn-filter`); // The button
		this.combobox = document.querySelector(`#${this.id} .option-list`); // The combobox node
		this.dropdownInput = document.querySelector(`#${this.id} .form-control`); // The Input
		this.dropdownElement = document.querySelector(`#${this.id} ul`); // The elements list		

		//this.collectUniqueItems();
        this.initializeEventListeners();
		this.comboboxAutocomplete();

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

	renderDropdownItems(array) {
		console.log("début fonction création DOM dropdown");

		this.dropdownElement.innerHTML = "";

		array.forEach(item => {
			const element = document.createElement("li");
			element.setAttribute("role", "option");
			element.classList.add("dropdown-item", "d-flex", "flex-wrap", "align-items-center", "py-2");
			element.textContent = `${item}`;

			this.dropdownElement.appendChild(element);
			
			
		});

		console.log("lance chooseOptions après créa DOM dropdown");
		chooseOptions(this.dataArray, this.filterOptions);
		
	}
		

	/***************************/
	/* Manage filter functions */
	/***************************/
	
	comboboxAutocomplete() {
		// Retrieve the current input value
		const filter = this.dropdownInput.value.trim().toLowerCase();
		const filteredOptions = [];		
		let count = 0;

		// Si la valeur du bouton est supérieur à 0
		if (filter.length > 0) {
			
			// on crée une regex pour compare le contenu
			const regex = new RegExp(filter, "gi");

			// On parcour le tableau des éléments avec majuscule
			this.capitalizedItemsArray.forEach(item => {

				// Si la regex est positive au test 
				if (regex.test(item)) {
					// Add the element to filteredOptions
					count = filteredOptions.push(item);
				}
			});
	
			// Update the options in the drop-down list according to the filtered options
			if (count > 0) {
				this.renderDropdownItems(filteredOptions);
				// this.collectUniqueItems();
			} else {
				this.dropdownElement.innerHTML = "Aucun élément ne correspond";
			}
		// Sinon on montre juste la liste initiale
		} else {
			// this.renderDropdownItems(this.capitalizedItemsArray); // Crée le DOM
			this.collectUniqueItems(this.dataArray);
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
		this.dropdown.addEventListener("new-filter", (e) => {

			// e.detail contient un tableau de recettes filtrés
			// console.log(e.detail);

			// ce tableau sert à afficher de nouvelles listes dans les dropdowns
			console.log("on rentre dans l'écoute de l'event new-filter");
			this.collectUniqueItems(e.detail);

		})
		// ERREUR CONSOLE
		// >> on voit que les recettes sont triées une 2e fois sans raison

		/* For open/close dropdown */

		// If the screen is not touch-sensitive
		if (!window.hasOwnProperty("ontouchstart")) {

			// Setting up hover events
			this.dropdown.addEventListener("mouseover", this.dropdownOpen.bind(this));
			this.dropdown.addEventListener("mouseout", this.dropdownClose.bind(this));

			// Setting up keyboard Enter button events
			this.dropdownBtn.addEventListener("keydown", (event) => {
				if (event.key === "Enter") {
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
	}
}