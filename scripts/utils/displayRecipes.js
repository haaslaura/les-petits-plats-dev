/**********************************************************************

This JavaScript code displays the recipes

**********************************************************************/

import { recipeCard } from "../templates/recipeCard.js";

export function displayRecipes(dataArrow) {

	// Section liste des recettes
	const cardSection = document.querySelector(".recipes-list"); /* section bien obtenue */

	dataArrow.forEach(recipe => {

		// Usage du template
		const cardTemplate = recipeCard(recipe);
		const modelRecipeCard = cardTemplate.recipeCardTemplate();

		cardSection.appendChild(modelRecipeCard);
	});
}