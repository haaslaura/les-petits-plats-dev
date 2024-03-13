export class DropdownManager {
	/**
     * 
     * @param {HTMLBodyElement} id 
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

		this.initialize();
	}

	initialize() {
		this.collectUniqueItems();
		this.convertItemsToArray();
		this.capitalizeItems();
		this.renderDropdownItems();
		this.initializeEventListeners();
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
	}

    /* Create the DOM */

	renderDropdownItems() {
		this.capitalizedItemsArray.forEach(item => {
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

    /* Navigation management & events */

	// Fonction pour gérer la navigation au clavier
	handleKeyboardNavigation(event) {
		if (event.key === "Enter") {
			// Vérifier si l'événement a été déclenché par la touche "Entrée"
			this.toggleDropdown(); // Déplier ou replier la liste déroulante
		}
	}

    // Fonction pour gérer le survol à la souris
    handleMouseHover(event) {
        const dropdownBtn = document.querySelector(`#${this.id} .dropdown-btn-filter`);
        const arrowIcon = document.querySelector(`#${this.id} .arrow-icon`);

        const isExpanded = dropdownBtn.getAttribute("aria-expanded") === "true";

        if (event.type === "mouseover") {
            // Déplier la liste déroulante si elle n'est pas déjà dépliée
            if (!isExpanded) {
                dropdownBtn.setAttribute("aria-expanded", "true");
                arrowIcon.setAttribute("src", "assets/icones/arrow-up.svg");
            }
        } else if (event.type === "mouseout") {
            // Replier la liste déroulante si le curseur de la souris quitte la dropdown
            if (isExpanded) {
                dropdownBtn.setAttribute("aria-expanded", "false");
                arrowIcon.setAttribute("src", "assets/icones/arrow-down.svg");
            }
        }
    }

	// Fonction pour déplier ou replier la liste déroulante
	toggleDropdown() {
		const dropdownBtn = document.querySelector(`#${this.id} .dropdown-btn-filter`);
		const optionList = document.querySelector(`#${this.id} .option-list`);
        const arrowIcon = document.querySelector(`#${this.id} .arrow-icon`);

		const isExpanded = dropdownBtn.getAttribute("aria-expanded") === "true";

		if (!isExpanded) {
			// Si la liste déroulante n'est pas déjà dépliée
			dropdownBtn.setAttribute("aria-expanded", "true");
			optionList.style.maxHeight = "280px";
			optionList.style.opacity = "1";
            arrowIcon.setAttribute("src", "assets/icones/arrow-up.svg");
		} else {
			// Si la liste déroulante est déjà dépliée
			dropdownBtn.setAttribute("aria-expanded", "false");
			optionList.style.maxHeight = "0";
			optionList.style.opacity = "0";
            arrowIcon.setAttribute("src", "assets/icones/arrow-down.svg");
		}
	}

	// Méthode d'initialisation pour configurer les écouteurs d'événements
	initializeEventListeners() {
		const dropdownBtn = document.querySelector(`#${this.id} .dropdown-btn-filter`);

		// Ajouter un écouteur d'événements pour la touche "Entrée"
		dropdownBtn.addEventListener("keydown", this.handleKeyboardNavigation.bind(this));
		dropdownBtn.addEventListener("mouseover", this.handleMouseHover.bind(this));
		dropdownBtn.addEventListener("mouseout", this.handleMouseHover.bind(this));
	}
}