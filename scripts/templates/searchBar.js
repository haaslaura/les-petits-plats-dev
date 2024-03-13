
/**********************************************************************

This JavaScript code is used for apply a style to the searchbar

**********************************************************************/

// Add an event to the input when it is in focus
document.getElementById("search").addEventListener("focus", function () {
	document.querySelector(".input-group").style.outline = "3px solid rgb(255, 209, 91)";
	document.querySelector(".input-group").style.borderRadius = "14px";
});

// Add an event to the input when it loses focus
document.getElementById("search").addEventListener("blur", function () {
	document.querySelector(".input-group").style.outline = "";
	document.querySelector(".input-group").style.borderRadius = "";
});