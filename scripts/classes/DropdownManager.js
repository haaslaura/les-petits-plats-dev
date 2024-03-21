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

		this.dropdownBtn = document.querySelector(`#${this.id} .dropdown-btn-filter`); // The button
		this.combobox = document.querySelector(`#${this.id} .option-list`); // The combobox node
		this.dropdownInput = document.querySelector(`#${this.id} .form-control`); // The Input
		this.dropdownElement = document.querySelector(`#${this.id} ul`); // The elements list		

		this.initialize();
	}

	initialize() {
		this.collectUniqueItems();
		this.convertItemsToArray();
		this.capitalizeItems();
		this.renderDropdownItems(this.capitalizedItemsArray);
		this.initializeEventListeners();
		this.listElementAddClass();
	}

    /* Create the list of the elements */

	// Browse the recipe table to collect unique items
	collectUniqueItems() {
		this.dataArray.forEach(item => {

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
	}

	// Create an array of unique elements
	convertItemsToArray() {
		this.itemsArray = Array.from(this.uniqueItems);
	}

	// Re-capitalise the first letter of the first word
	capitalizeItems() {
		this.capitalizedItemsArray = this.itemsArray.map(item =>
			item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
		).sort();

		this.renderDropdownItems(this.capitalizedItemsArray);
	}


    /* Create the DOM */

	renderDropdownItems(options) {

		this.dropdownElement.innerHTML = "";
		const tagManagerInstance = new TagManager();

		options.forEach(item => {
			const element = document.createElement("li");
			element.setAttribute("role", "option");
			element.classList.add("dropdown-item", "d-flex", "flex-wrap", "align-items-center", "py-2");
			element.textContent = `${item}`;

			this.dropdownElement.appendChild(element);

			// Adds an event to create a new tag when an element is clicked
			element.addEventListener("click", () =>	{
				tagManagerInstance.createTag(element.textContent);
				this.listElementAddClass(element);
			});
		});
	}

	// Add a class to the list item if the tag is created
	listElementAddClass(element) {
		
		if(document.querySelectorAll(".tag")) {
			const allTag = document.querySelectorAll(".tag p");
			allTag.forEach(tag => {
				
				if (element.textContent === tag.textContent) {
					element.classList.add("tagged");
				} else {
					element.classList.remove("tagged");
				}
			});
		}
	}

	// Combobox autocomplete	
	filterOptions() {
		// Retrieve the current input value
		const filter = this.dropdownInput.value.trim().toLowerCase();
		const filteredOptions = [];		
		let count = 0;

		if (filter.length > 0) {
			const regex = new RegExp(filter, 'gi');
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


    /* Navigation management & events */

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
		
		/* For the button */

		// Hover
		this.dropdownBtn.addEventListener("mouseover", this.dropdownOpen.bind(this));
		// Hover perdu
		this.dropdownBtn.addEventListener("mouseout", this.dropdownClose.bind(this));

		// Entrée + Entrée bis (ouvrir/fermer) + Echap
		this.dropdownBtn.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				this.toggleDropdown();
			}
			if (event.key === "Escape") {
				this.dropdownClose();
			}
		});

		// Click
		// Re click
		// Click externe

		//dropdownBtn.addEventListener("click", this.closeDropdown.bind(this));

		
		/* For the input */
		this.dropdownInput.addEventListener("input", this.filterOptions.bind(this));
		this.dropdownInput.addEventListener("keydown", (event) => {
			if (event.key === "Backspace" || event.key === "Delete") {
				this.filterOptions();
			}
		});
	}
}