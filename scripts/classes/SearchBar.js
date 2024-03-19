export class SearchBar {
	/**
     * 
     * @param {..} i..
     */
	constructor() {
          this.searchBar = document.getElementById("searchbar");
		
	}





     // Initialization method for configuring event listeners

     initializeEventListeners() {

          // Add an event to the input when it is in focus
          this.searchBar.addEventListener("focus", function () {
               document.querySelector(".input-group").style.outline = "3px solid rgb(255, 209, 91)";
               document.querySelector(".input-group").style.borderRadius = "14px";
          });

          // Add an event to the input when it loses focus
          this.searchBar.addEventListener("blur", function () {
               document.querySelector(".input-group").style.outline = "";
               document.querySelector(".input-group").style.borderRadius = "";
          });
     }
}