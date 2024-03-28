export class TagManager {
	
	constructor() {
		this.tagList = [];
		console.log(this.tagList);
	}
	
	/**
	* @param {string} item
	*/
	createTag(item) {		
		// Check whether the tag already exists in the tagList
		let exists = false;
		const allTag = document.querySelectorAll(".tag")
		
		allTag.forEach(tag => {
			if (tag.querySelector("p").textContent === item) {
				exists = true;
			}
		});
		
		if (!exists) {
			// Create DOM
			const tag = document.createElement("div");
			tag.classList.add("tag", "d-flex", "flex-row", "flex-nowrap", "justify-content-between", "align-items-center", "p-3", "me-4", "mb-2");
			tag.innerHTML = `
			<p>${item}</p>
			<button>Fermer</button>
			`;
			
			// Add an event listener for the close button
			const closeBtn = tag.querySelector("button");
			closeBtn.addEventListener("click", () => this.closeTag(tag));
			
			// Append the tag to the display area
			document.querySelector(".display-tag").appendChild(tag);
		}
	}
	
	/**
	* 
	* @param {HTMLDivElement} tag
	*/    
	closeTag(tag) {
		// Add a class to apply the closing animation
		tag.classList.add("closing-animation");
		
		
		tag.addEventListener("animationend", () => {
			// Remove the tag from the DOM
			tag.remove();
			
			// Remove a class of the element list dropdwown when the associated tag is closed
			document.querySelectorAll(".option-list ul").forEach(list => {
				list.querySelectorAll("li").forEach(item => {
					if(tag.querySelector("p").textContent === item.textContent) {
						item.classList.remove("tagged");

					}
				});				
			});
		});
	}
}