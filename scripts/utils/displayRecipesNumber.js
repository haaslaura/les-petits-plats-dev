/**********************************************************************

This JavaScript code displays the number of recipes

**********************************************************************/

export function displayRecipesNumber(array) {
	const numberRecipesText = document.querySelector(".filter-section p span");
	numberRecipesText.textContent = array.length;
}