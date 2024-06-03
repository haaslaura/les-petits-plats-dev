/**********************************************************************

This code concerns the message in case of error

**********************************************************************/


export function displayErrorMessage(search) {

	// Empty the section of recipes
	const cardSection = document.querySelector(".recipes-list");
	cardSection.innerHTML = "";

	// Display the error message
	const mainContainer = document.querySelector("main");

	const errorMessage = document.createElement("div");
	errorMessage.setAttribute("role", "alert");
	errorMessage.classList.add("error-message", "container", "alert", "alert-warning");
	errorMessage.textContent = `Aucune recette ne contient "${search}". Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;

	mainContainer.appendChild(errorMessage);
	return errorMessage;
}