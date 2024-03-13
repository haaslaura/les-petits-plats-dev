/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 */

"use strict";

export class ComboboxAutocomplete {
	constructor(comboboxNode, buttonNode, listboxNode) {
		this.comboboxNode = comboboxNode;
		this.buttonNode = buttonNode;
		this.listboxNode = listboxNode;

		this.comboboxHasVisualFocus = false;
		this.listboxHasVisualFocus = false;

		this.hasHover = false;

		this.isNone = false;
		this.isList = false;
		this.isBoth = false;

		this.allOptions = [];

		this.option = null;
		this.firstOption = null;
		this.lastOption = null;

		this.filteredOptions = [];
		this.filter = "";

		var autocomplete = this.comboboxNode.getAttribute("aria-autocomplete");

		if (typeof autocomplete === "string") {
			autocomplete = autocomplete.toLowerCase();
			this.isNone = autocomplete === "none";
			this.isList = autocomplete === "list";
			this.isBoth = autocomplete === "both";
		} else {
			// default value of autocomplete
			this.isNone = true;
		}

		this.comboboxNode.addEventListener(
			"keydown",
			this.onComboboxKeyDown.bind(this)
		);
		this.comboboxNode.addEventListener(
			"keyup",
			this.onComboboxKeyUp.bind(this)
		);
		this.comboboxNode.addEventListener(
			"click",
			this.onComboboxClick.bind(this)
		);
		this.comboboxNode.addEventListener(
			"focus",
			this.onComboboxFocus.bind(this)
		);
		this.comboboxNode.addEventListener("blur", this.onComboboxBlur.bind(this));

		document.body.addEventListener(
			"pointerup",
			this.onBackgroundPointerUp.bind(this),
			true
		);

		// initialize pop up menu
    
		this.listboxNode.addEventListener(
			"pointerover",
			this.onListboxPointerover.bind(this)
		);
		this.listboxNode.addEventListener(
			"pointerout",
			this.onListboxPointerout.bind(this)
		);

		// Traverse the element children of domNode: configure each with
		// option role behavior and store reference in.options array.
		var nodes = this.listboxNode.getElementsByTagName("LI");

		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			this.allOptions.push(node);

			node.addEventListener("click", this.onOptionClick.bind(this));
			node.addEventListener("pointerover", this.onOptionPointerover.bind(this));
			node.addEventListener("pointerout", this.onOptionPointerout.bind(this));
		}

		this.filterOptions();

		// Open Button

		var button = this.comboboxNode.nextElementSibling;

		if (button && button.tagName === "BUTTON") {
			button.addEventListener("click", this.onButtonClick.bind(this));
		}
	}

	getLowercaseContent(node) {
		return node.textContent.toLowerCase();
	}

	// Vérifie si une option de la liste déroulante est visible dans la fenêtre d'affichage.
	isOptionInView(option) {
		var bounding = option.getBoundingClientRect();
		return (
			bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <=
        (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	// Définit l'option active dans la liste déroulante et la fait défiler dans la vue si elle n'est pas visible
	setActiveDescendant(option) {
		if (option && this.listboxHasVisualFocus) {
			this.comboboxNode.setAttribute("aria-activedescendant", option.id);
			if (!this.isOptionInView(option)) {
				option.scrollIntoView({ behavior: "smooth", block: "nearest" });
			}
		} else {
			this.comboboxNode.setAttribute("aria-activedescendant", "");
		}
	}

	// Définit la valeur de la combobox et filtre les options en fonction de cette valeur
	setValue(value) {
		this.filter = value;
		this.comboboxNode.value = this.filter;
		this.comboboxNode.setSelectionRange(this.filter.length, this.filter.length);
		this.filterOptions();
	}

	// Définit l'option sélectionnée dans la liste déroulante et met à jour la valeur de la combobox en conséquence
	setOption(option, flag) {
		if (typeof flag !== "boolean") {
			flag = false;
		}

		if (option) {
			this.option = option;
			this.setCurrentOptionStyle(this.option);
			this.setActiveDescendant(this.option);

			if (this.isBoth) {
				this.comboboxNode.value = this.option.textContent;
				if (flag) {
					this.comboboxNode.setSelectionRange(
						this.option.textContent.length,
						this.option.textContent.length
					);
				} else {
					this.comboboxNode.setSelectionRange(
						this.filter.length,
						this.option.textContent.length
					);
				}
			}
		}
	}

	// Met le focus visuel sur la combobox
	setVisualFocusCombobox() {
		this.listboxNode.classList.remove("focus");
		this.comboboxNode.parentNode.classList.add("focus"); // set the focus class to the parent for easier styling
		this.comboboxHasVisualFocus = true;
		this.listboxHasVisualFocus = false;
		this.setActiveDescendant(false);
	}

	// Met le focus visuel sur la liste déroulante
	setVisualFocusListbox() {
		this.comboboxNode.parentNode.classList.remove("focus");
		this.comboboxHasVisualFocus = false;
		this.listboxHasVisualFocus = true;
		this.listboxNode.classList.add("focus");
		this.setActiveDescendant(this.option);
	}

	// Supprime le focus visuel de la combobox et de la liste déroulante
	removeVisualFocusAll() {
		this.comboboxNode.parentNode.classList.remove("focus");
		this.comboboxHasVisualFocus = false;
		this.listboxHasVisualFocus = false;
		this.listboxNode.classList.remove("focus");
		this.option = null;
		this.setActiveDescendant(false);
	}

	// ComboboxAutocomplete Events

	// Filtre les options de la liste déroulante en fonction de la valeur de la combobox
	filterOptions() {
		// do not filter any options if autocomplete is none
		if (this.isNone) {
			this.filter = "";
		}

		var option = null;
		var currentOption = this.option;
		var filter = this.filter.toLowerCase();

		this.filteredOptions = [];
		this.listboxNode.innerHTML = "";

		for (var i = 0; i < this.allOptions.length; i++) {
			option = this.allOptions[i];
			if (
				filter.length === 0 ||
        this.getLowercaseContent(option).indexOf(filter) === 0
			) {
				this.filteredOptions.push(option);
				this.listboxNode.appendChild(option);
			}
		}

		// Use populated options array to initialize firstOption and lastOption.
		var numItems = this.filteredOptions.length;
		if (numItems > 0) {
			this.firstOption = this.filteredOptions[0];
			this.lastOption = this.filteredOptions[numItems - 1];

			if (currentOption && this.filteredOptions.indexOf(currentOption) >= 0) {
				option = currentOption;
			} else {
				option = this.firstOption;
			}
		} else {
			this.firstOption = null;
			option = null;
			this.lastOption = null;
		}

		return option;
	}

	// Applique un style à l'option actuelle dans la liste déroulante pour la mettre en surbrillance.
	setCurrentOptionStyle(option) {
		for (var i = 0; i < this.filteredOptions.length; i++) {
			var opt = this.filteredOptions[i];
			if (opt === option) {
				opt.setAttribute("aria-selected", "true");
				if (
					this.listboxNode.scrollTop + this.listboxNode.offsetHeight <
          opt.offsetTop + opt.offsetHeight
				) {
					this.listboxNode.scrollTop =
            opt.offsetTop + opt.offsetHeight - this.listboxNode.offsetHeight;
				} else if (this.listboxNode.scrollTop > opt.offsetTop + 2) {
					this.listboxNode.scrollTop = opt.offsetTop;
				}
			} else {
				opt.removeAttribute("aria-selected");
			}
		}
	}

	// Récupère l'option précédente dans la liste déroulante par rapport à l'option actuelle
	getPreviousOption(currentOption) {
		if (currentOption !== this.firstOption) {
			var index = this.filteredOptions.indexOf(currentOption);
			return this.filteredOptions[index - 1];
		}
		return this.lastOption;
	}

	// Récupère l'option suivante dans la liste déroulante par rapport à l'option actuelle
	getNextOption(currentOption) {
		if (currentOption !== this.lastOption) {
			var index = this.filteredOptions.indexOf(currentOption);
			return this.filteredOptions[index + 1];
		}
		return this.firstOption;
	}

	/* MENU DISPLAY METHODS */

	// Vérifie si une option de la liste déroulante a le focus
	doesOptionHaveFocus() {
		return this.comboboxNode.getAttribute("aria-activedescendant") !== "";
	}

	// Vérifie si la liste déroulante est ouverte
	isOpen() {
		return this.listboxNode.style.display === "block";
	}

	// Vérifie si la liste déroulante est fermée
	isClosed() {
		return this.listboxNode.style.display !== "block";
	}

	// Vérifie si la liste déroulante contient des options
	hasOptions() {
		return this.filteredOptions.length;
	}

	// Ouvre la liste déroulante
	open() {
		this.listboxNode.style.display = "block";
		this.comboboxNode.setAttribute("aria-expanded", "true");
		this.buttonNode.setAttribute("aria-expanded", "true");
	}

	// Ferme la liste déroulante avec la possibilité de forcer la fermeture même si d'autres éléments ont le focus
	close(force) {
		if (typeof force !== "boolean") {
			force = false;
		}

		if (
			force ||
      (!this.comboboxHasVisualFocus &&
        !this.listboxHasVisualFocus &&
        !this.hasHover)
		) {
			this.setCurrentOptionStyle(false);
			this.listboxNode.style.display = "none";
			this.comboboxNode.setAttribute("aria-expanded", "false");
			this.buttonNode.setAttribute("aria-expanded", "false");
			this.setActiveDescendant(false);
			this.comboboxNode.parentNode.classList.add("focus");
		}
	}

	/* combobox Events */

	// Gère l'événement de pression d'une touche dans la combobox.
	onComboboxKeyDown(event) {
		var flag = false,
			altKey = event.altKey;

		if (event.ctrlKey || event.shiftKey) {
			return;
		}

		switch (event.key) {
		case "Enter":
			if (this.listboxHasVisualFocus) {
				this.setValue(this.option.textContent);
			}
			this.close(true);
			this.setVisualFocusCombobox();
			flag = true;
			break;

		case "Down":
		case "ArrowDown":
			if (this.filteredOptions.length > 0) {
				if (altKey) {
					this.open();
				} else {
					this.open();
					if (
						this.listboxHasVisualFocus ||
              (this.isBoth && this.filteredOptions.length > 1)
					) {
						this.setOption(this.getNextOption(this.option), true);
						this.setVisualFocusListbox();
					} else {
						this.setOption(this.firstOption, true);
						this.setVisualFocusListbox();
					}
				}
			}
			flag = true;
			break;

		case "Up":
		case "ArrowUp":
			if (this.hasOptions()) {
				if (this.listboxHasVisualFocus) {
					this.setOption(this.getPreviousOption(this.option), true);
				} else {
					this.open();
					if (!altKey) {
						this.setOption(this.lastOption, true);
						this.setVisualFocusListbox();
					}
				}
			}
			flag = true;
			break;

		case "Esc":
		case "Escape":
			if (this.isOpen()) {
				this.close(true);
				this.filter = this.comboboxNode.value;
				this.filterOptions();
				this.setVisualFocusCombobox();
			} else {
				this.setValue("");
				this.comboboxNode.value = "";
			}
			this.option = null;
			flag = true;
			break;

		case "Tab":
			this.close(true);
			if (this.listboxHasVisualFocus) {
				if (this.option) {
					this.setValue(this.option.textContent);
				}
			}
			break;

		case "Home":
			this.comboboxNode.setSelectionRange(0, 0);
			flag = true;
			break;

		case "End":
			var length = this.comboboxNode.value.length;
			this.comboboxNode.setSelectionRange(length, length);
			flag = true;
			break;

		default:
			break;
		}

		if (flag) {
			event.stopPropagation();
			event.preventDefault();
		}
	}

	// Vérifie si une chaîne de caractères est un caractère imprimable (non de contrôle).
	isPrintableCharacter(str) {
		return str.length === 1 && str.match(/\S| /);
	}

	// Gère l'événement de relâchement d'une touche dans la combobox.
	onComboboxKeyUp(event) {
		var flag = false,
			option = null,
			char = event.key;

		if (this.isPrintableCharacter(char)) {
			this.filter += char;
		}

		// this is for the case when a selection in the textbox has been deleted
		if (this.comboboxNode.value.length < this.filter.length) {
			this.filter = this.comboboxNode.value;
			this.option = null;
			this.filterOptions();
		}

		if (event.key === "Escape" || event.key === "Esc") {
			return;
		}

		switch (event.key) {
		case "Backspace":
			this.setVisualFocusCombobox();
			this.setCurrentOptionStyle(false);
			this.filter = this.comboboxNode.value;
			this.option = null;
			this.filterOptions();
			flag = true;
			break;

		case "Left":
		case "ArrowLeft":
		case "Right":
		case "ArrowRight":
		case "Home":
		case "End":
			if (this.isBoth) {
				this.filter = this.comboboxNode.value;
			} else {
				this.option = null;
				this.setCurrentOptionStyle(false);
			}
			this.setVisualFocusCombobox();
			flag = true;
			break;

		default:
			if (this.isPrintableCharacter(char)) {
				this.setVisualFocusCombobox();
				this.setCurrentOptionStyle(false);
				flag = true;

				if (this.isList || this.isBoth) {
					option = this.filterOptions();
					if (option) {
						if (this.isClosed() && this.comboboxNode.value.length) {
							this.open();
						}

						if (
							this.getLowercaseContent(option).indexOf(
								this.comboboxNode.value.toLowerCase()
							) === 0
						) {
							this.option = option;
							if (this.isBoth || this.listboxHasVisualFocus) {
								this.setCurrentOptionStyle(option);
								if (this.isBoth) {
									this.setOption(option);
								}
							}
						} else {
							this.option = null;
							this.setCurrentOptionStyle(false);
						}
					} else {
						this.close();
						this.option = null;
						this.setActiveDescendant(false);
					}
				} else if (this.comboboxNode.value.length) {
					this.open();
				}
			}

			break;
		}

		if (flag) {
			event.stopPropagation();
			event.preventDefault();
		}
	}

	// Gère l'événement de clic sur la combobox
	onComboboxClick() {
		if (this.isOpen()) {
			this.close(true);
		} else {
			this.open();
		}
	}

	// Gère l'événement de focus sur la combobox
	onComboboxFocus() {
		this.filter = this.comboboxNode.value;
		this.filterOptions();
		this.setVisualFocusCombobox();
		this.option = null;
		this.setCurrentOptionStyle(null);
	}

	// Gère l'événement de perte de focus sur la combobox
	onComboboxBlur() {
		this.removeVisualFocusAll();
	}

	// Gère l'événement de relâchement du clic sur l'arrière-plan, en dehors de la combobox et de la liste déroulante
	onBackgroundPointerUp(event) {
		if (
			!this.comboboxNode.contains(event.target) &&
      !this.listboxNode.contains(event.target) &&
      !this.buttonNode.contains(event.target)
		) {
			this.comboboxHasVisualFocus = false;
			this.setCurrentOptionStyle(null);
			this.removeVisualFocusAll();
			setTimeout(this.close.bind(this, true), 300);
		}
	}

	// Gère l'événement de clic sur le bouton associé à la combobox
	onButtonClick() {
		if (this.isOpen()) {
			this.close(true);
		} else {
			this.open();
		}
		this.comboboxNode.focus();
		this.setVisualFocusCombobox();
	}

	/* Listbox Events */

	// Gère l'événement de survol de la souris sur la liste déroulante
	onListboxPointerover() {
		this.hasHover = true;
	}

	// Gère l'événement de sortie de la souris de la liste déroulante
	onListboxPointerout() {
		this.hasHover = false;
		setTimeout(this.close.bind(this, false), 300);
	}

	// Listbox Option Events

	// Gère l'événement de clic sur une option de la liste déroulante
	onOptionClick(event) {
		this.comboboxNode.value = event.target.textContent;
		this.close(true);
	}

	// Gère l'événement de survol de la souris sur une option de la liste déroulante
	onOptionPointerover() {
		this.hasHover = true;
		this.open();
	}

	// Gère l'événement de sortie de la souris d'une option de la liste déroulante
	onOptionPointerout() {
		this.hasHover = false;
		setTimeout(this.close.bind(this, false), 300);
	}
}

// Initialize comboboxes

window.addEventListener("load", function () {
	var comboboxes = document.querySelectorAll(".dropdown");

	for (var i = 0; i < comboboxes.length; i++) {
		var combobox = comboboxes[i];
		var comboboxNode = combobox.querySelector("input");
		var buttonNode = combobox.querySelector("button");
		var listboxNode = combobox.querySelector("[role=\"listbox\"]");
		new ComboboxAutocomplete(comboboxNode, buttonNode, listboxNode);
	}
});
