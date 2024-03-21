import { displayRecipes } from "../utils/displayRecipes.js";
import { displayRecipesNumber } from "../utils/displayRecipesNumber.js";
export class SearchBar {
	/**
     * @param {Array} data
     */
	constructor(data) {
          this.data = data;
          this.searchForm = document.querySelector(".searchform");
          this.searchBar = document.getElementById("searchbar");
          this.searchButton = document.querySelector(".loop-icon");
          this.errorMessage = null;

          this.initialize();	
	}

     initialize() {
		this.initializeEventListeners();
	}

     checkInputValueValidity(event) {

          // If the constraints of the element (the input) are not satisfied
          if(!this.searchBar.checkValidity()){

               // Check that there isn't already an error message, otherwise remove it
               if(this.errorMessage) {
                    this.errorMessage.remove();
               }
               // Prevent default behaviour and add an error message
               event.preventDefault();
               document.querySelector(".recipes-list").innerHTML = ""; // Empty section
               this.displayErrorMessage(this.searchBar.value);
          
          // If the content of the input is valid
          // any error messages are removed and the recipes are filtered
          } else {
               if(this.errorMessage) {
                    this.errorMessage.remove();
               }
               this.filterRecipies();
          }
     }

     displayErrorMessage(search) {
          const mainContainer = document.querySelector("main");

          this.errorMessage = document.createElement("div");
          this.errorMessage.setAttribute("role", "alert");
          this.errorMessage.classList.add("error-message", "container", "alert", "alert-warning");
          this.errorMessage.textContent = `Aucune recette ne contient "${search}". Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;

          mainContainer.appendChild(this.errorMessage);
     }

     // WORKING WITH NATIVE LOOP
     filterRecipies() {

          // Retrieve the current input value
          const searchBarValue = this.searchBar.value.trim().toLowerCase();
          const recipes = this.data;
          const filteredRecipies = [];		
          let count = 0;

          document.querySelector(".recipes-list").innerHTML = ""; // Empty section

          // The search must be at least 3 characters long
          if(searchBarValue.length < 3) {
               this.displayErrorMessage(searchBarValue);
                              
          } else {
               const regex = new RegExp(searchBarValue, 'gi'); // g = global search, i = insensitive to breakage

               // Browse the list of recipes
               for (let i = 0; i < recipes.length; i++) {
                    
                    let continu = true;

                    // If content searchBar === content in recipe.[information]
                    // Push recipe into filteredRecipies

                    if(continu && regex.test(recipes[i].name)) {
                         count = filteredRecipies.push(recipes[i]);
                         continu = false; // Stop ici
                    }
                    if (continu && regex.test(recipes[i].description)) {
                         count = filteredRecipies.push(recipes[i]);
                         continu = false; // Stop ici
                    }
                    if (continu && regex.test(recipes[i].appliance)) {
                         count = filteredRecipies.push(recipes[i]);
                         continu = false; // Stop ici
                    }

                    // Browse the ingredients list
                    const ingredientsList = recipes[i].ingredients;
                    for (let g = 0; g < ingredientsList.length; g++){

                         if(continu && regex.test(ingredientsList[g].ingredient)) { 
                              count = filteredRecipies.push(recipes[i]);
                              continu = false; // Stop ici
                         }
                    }

                    // Browse the ustensils list
                    const ustensilsList = recipes[i].ustensils;
                    for (let g = 0; g < ustensilsList.length; g++){

                         if(continu && regex.test(ustensilsList[g])) {
                              count = filteredRecipies.push(recipes[i]);
                              continu = false; // Stop ici
                         }
                    }
               }

               if (count > 0) {
                    displayRecipes(filteredRecipies);
                    displayRecipesNumber(filteredRecipies);
               } else {
                    this.displayErrorMessage(searchBarValue);
               }       
          }
     }
   

     // Initialization method for configuring event listeners
     initializeEventListeners() {

          // Style the search bar when it is in focus or lose focus
          this.searchBar.addEventListener("focus", function () {
               document.querySelector(".input-group").style.outline = "3px solid rgb(255, 209, 91)";
               document.querySelector(".input-group").style.borderRadius = "14px";
          });

          this.searchBar.addEventListener("blur", function () {
               document.querySelector(".input-group").style.outline = "";
               document.querySelector(".input-group").style.borderRadius = "";
          });

          // Button events
          this.searchButton.addEventListener("click", (event) => {
               this.checkInputValueValidity(event);
          });

          // Input events
          this.searchBar.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
                    this.checkInputValueValidity(event);
			}
		});

          this.searchBar.addEventListener("input", () => {
               // If the input is empty, redisplay the recipes
               if (this.searchBar.value.trim() === "") {
                   document.querySelector(".recipes-list").innerHTML = "";
                   displayRecipes(this.data);
               }
          });
     }
}