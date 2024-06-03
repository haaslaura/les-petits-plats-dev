/**********************************************************************

This JavaScript code displays the recipes

**********************************************************************/

import { recipeCard } from "../templates/recipeCard.js";

export function displayRecipes(dataArrow) {

	// Recipe list section
	const cardSection = document.querySelector(".recipes-list");
	cardSection.innerHTML = "";

	dataArrow.forEach(recipe => {

		// Using the template
		const cardTemplate = recipeCard(recipe);
		const modelRecipeCard = cardTemplate.recipeCardTemplate();

		cardSection.appendChild(modelRecipeCard);
	});
}