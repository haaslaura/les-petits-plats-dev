export class TagManager {

    /**
     * @param {string} item
     */
    constructor(item) {
        this.tagList = []; // List for storing tag instances
    }
    
    createTag(item) {

        // Vérifiez si le tag existe déjà dans la tagList
        const exists = this.tagList.some(tag => tag.querySelector("p").textContent === item);

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

            // Add tag to the list
            this.tagList.push(tag);
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

            // Remove the tag from the tagList
            const index = this.tagList.indexOf(tag);
            if (index !== -1) {
                this.tagList.splice(index, 1);
            }
        });
    }

    getTagList() {
        return this.tagList;
    }
}