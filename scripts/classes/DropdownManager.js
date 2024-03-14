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
		this.dropdownElement = document.querySelector(`#${this.id} ul`);

		/* Input event manager for the combobox */
		/*this.comboboxNode = document.querySelector(`#${this.id} .form-control`);

		this.comboboxNode.addEventListener("input", this.filterOptions.bind(this));
		this.comboboxNode.addEventListener("keydown", (event) => {
			if (event.key === "Backspace" || event.key === "Delete") {
				this.filterOptions();
			}
		});*/

		this.initialize();
	}

	initialize() {
		this.collectUniqueItems();
		this.convertItemsToArray();
		this.capitalizeItems();
		this.renderDropdownItems(this.capitalizedItemsArray);
		this.initializeEventListeners();
		this.filterOptions();
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

		options.forEach(item => {
			const element = document.createElement("li");
			element.setAttribute("role", "option");
			const link = document.createElement("a");
			link.classList.add("dropdown-item", "d-flex", "flex-wrap", "align-items-center", "gap-2", "py-2");
			link.setAttribute("href", "#");
			link.textContent = `${item}`;

			element.appendChild(link);

			this.dropdownElement.appendChild(element);
		});
	}

	// Combobox autocomplete	
	filterOptions() {
		// Retrieve the current input value
		const filter = this.comboboxNode.value.trim().toLowerCase();


		const filteredOptions = [];		
		let count = 0;

		if (filter.length > 0) {
			const regex = new RegExp(filter, 'i');
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

	// Keyboard navigation function
	handleKeyboardNavigation(event) {
		if (event.key === "Enter") {
			this.toggleDropdown();
		}
	}

    // Mouse-over function
    handleMouseHover(event) {
        const dropdownBtn = document.querySelector(`#${this.id} .dropdown-btn-filter`);
        const arrowIcon = document.querySelector(`#${this.id} .arrow-icon`);

        const isExpanded = dropdownBtn.getAttribute("aria-expanded") === "true";

        if (event.type === "mouseover") {
            if (!isExpanded) {
                dropdownBtn.setAttribute("aria-expanded", "true");
                arrowIcon.setAttribute("src", "assets/icones/arrow-up.svg");
            }
        } else if (event.type === "mouseout") {
            if (isExpanded) {
                dropdownBtn.setAttribute("aria-expanded", "false");
                arrowIcon.setAttribute("src", "assets/icones/arrow-down.svg");
            }
        }
    }

	// Function for unfolding or folding the drop-down list
	toggleDropdown() {
		const dropdownBtn = document.querySelector(`#${this.id} .dropdown-btn-filter`);
		const optionList = document.querySelector(`#${this.id} .option-list`);
        const arrowIcon = document.querySelector(`#${this.id} .arrow-icon`);

		const isExpanded = dropdownBtn.getAttribute("aria-expanded") === "true";

		if (!isExpanded) {
			dropdownBtn.setAttribute("aria-expanded", "true");
			optionList.style.maxHeight = "280px";
			optionList.style.opacity = "1";
            arrowIcon.setAttribute("src", "assets/icones/arrow-up.svg");
		} else {
			dropdownBtn.setAttribute("aria-expanded", "false");
			optionList.style.maxHeight = "0";
			optionList.style.opacity = "0";
            arrowIcon.setAttribute("src", "assets/icones/arrow-down.svg");
		}
	}

	// Initialization method for configuring event listeners
	initializeEventListeners() {
		
		/* For the button */
		const dropdownBtn = document.querySelector(`#${this.id} .dropdown-btn-filter`);

		dropdownBtn.addEventListener("keydown", this.handleKeyboardNavigation.bind(this));
		dropdownBtn.addEventListener("mouseover", this.handleMouseHover.bind(this));
		dropdownBtn.addEventListener("mouseout", this.handleMouseHover.bind(this));

		/* For the input */
		this.comboboxNode = document.querySelector(`#${this.id} .form-control`);

		this.comboboxNode.addEventListener("input", this.filterOptions.bind(this));
		this.comboboxNode.addEventListener("keydown", (event) => {
			if (event.key === "Backspace" || event.key === "Delete") {
				this.filterOptions();
			}
		});
	}
}