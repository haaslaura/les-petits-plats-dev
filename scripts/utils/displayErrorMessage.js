/**********************************************************************

This code concerns the message in case of error

**********************************************************************/


export function displayErrorMessage(search) {
	const mainContainer = document.querySelector("main");

	const errorMessage = document.createElement("div");
	errorMessage.setAttribute("role", "alert");
	errorMessage.classList.add("error-message", "container", "alert", "alert-warning");
	errorMessage.textContent = `Aucune recette ne contient "${search}". Vous pouvez chercher "tarte aux pommes", "poisson", etc.`;

	mainContainer.appendChild(errorMessage);
	return errorMessage;
}