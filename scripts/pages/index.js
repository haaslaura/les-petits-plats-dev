/**********************************************************************

This JavaScript code is linked to the index.html page

**********************************************************************/

// Importing data and functions
import recipes from "../../data/recipes.js";
import { recipeCard } from "../templates/recipeCard.js";



function displayRecipes(dataArrow) {

	// Section liste des recettes
	const cardSection = document.querySelector(".recipes-list"); /* section bien obtenue */

	dataArrow.forEach(recipe => {

		// Usage du template
		const cardTemplate = recipeCard(recipe);
		const modelRecipeCard = cardTemplate.recipeCardTemplate();

		cardSection.appendChild(modelRecipeCard);
	});
}


function initPage() {

	// Vider le contenu de la section
	document.querySelector(".recipes-list").innerHTML = ""; /* Section bien vidée */

	// Intégrer les recettes
	displayRecipes(recipes);

}

initPage();