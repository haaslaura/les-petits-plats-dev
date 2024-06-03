export class TagManager {
	
	/**
	* @param {HTMLElement} container
	* @param {'search'  | 'dropdown'} type
	*/
	constructor(container, type) {
		this.container = container;
		this.type = type;
	}
	
	/**
	* @param {string} text
	* @param {HTMLElement} item
	*/
	createTag(text, item) {
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
			this.removeTag(tag, item);
			
		});
		
		// Append the tag to the container
		this.container.appendChild(tag);
	}
	
	/**
	* @param {HTMLElement} tag
	* @param {HTMLElement} item
	*/
	removeTag(tag, item) {
		// if(this.type === 'search') {
		// 	// Vider la seachbar
		// 	const searchBar = document.getElementById("searchbar");

		// 	const clearSearchBar = new CustomEvent('clear');
		// 	searchBar.dispatchEvent(clearSearchBar)
		// } else {

		// 	// retirer la classe tagged
		// 	if(item) {
		// 		item.classList.remove("tagged");
		// 	}
		// }

		// retirer la classe tagged
		if(item) {
			item.classList.remove("tagged");
		}
		
		this.container.removeChild(tag);
	}
}