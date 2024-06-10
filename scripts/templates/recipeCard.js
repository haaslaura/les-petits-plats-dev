export function recipeCard(recipesData) {
	
	const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipesData;
	
	function recipeCardTemplate() {
		// Create the card container
		const recipeCard = document.createElement("div");
		recipeCard.classList.add("card", "recipe-card", "mb-5");
		
		// Create the section to display the image and duration of the recipe
		const recipeCardImg = document.createElement("div");
		recipeCardImg.className = "recipe-card__img";
		
		const imageCard = document.createElement("img");
		imageCard.className = "card-img-top";
		imageCard.setAttribute("src", `../../assets/recipes-thumbnail/${image}`);
		imageCard.setAttribute("alt", "");
		
		const duration = document.createElement("time");
		duration.innerText = `${time}min`;
		duration.setAttribute("datetime", `PT${time}M`);
		
		recipeCardImg.appendChild(imageCard);
		recipeCardImg.appendChild(duration);
		
		// Card body
		const cardBody = document.createElement("div");
		cardBody.classList.add ("recipe-sequence", "card-body");
		
		const h2Title = document.createElement("h2");
		h2Title.className = "card-title";
		h2Title.innerHTML = `${name}`;
		
		const h3Title = document.createElement("h3");
		h3Title.className = "card-subtitle";
		h3Title.innerHTML = "Recette";
		
		const recipeDescription = document.createElement("p");
		recipeDescription.className = "card-text";
		recipeDescription.textContent = description;        
		
		const h3Title2 = document.createElement("h3");
		h3Title2.className = "card-subtitle";
		h3Title2.innerHTML = "Ingrédients";
		
		cardBody.appendChild(h2Title);
		cardBody.appendChild(h3Title);
		cardBody.appendChild(recipeDescription);
		cardBody.appendChild(h3Title2);
		
		// List of ingredients
		const ingredientsList = document.createElement("div");
		ingredientsList.classList.add("ingredients-list", "d-flex", "flex-row", "flex-wrap", "card-body");
		
		// Browse the ingredients table
		ingredients.forEach(item => {
			
			const p = document.createElement("p");
			if (item) {
				
				if (item?.ingredient) { /* Check if ingredient */
					if (item?.quantity) { /* Check if quantity */
						if (item?.unit) { /* Check if unit */
							p.innerHTML = `${item.ingredient}<br><span>${item.quantity} ${item.unit}</span>`;
							
							
						} else {
							p.innerHTML = `${item.ingredient}<br><span>${item.quantity}</span>`;
							
						}
					} else {
						p.innerHTML = `${item.ingredient}`;
						
					}
				}
			}
			// Integrating <p>
			ingredientsList.appendChild(p);
		});
		
		// Integrate the elements into the card container
		recipeCard.appendChild(recipeCardImg);
		recipeCard.appendChild(cardBody);
		recipeCard.appendChild(ingredientsList);
		
		return recipeCard;      
	}
	
	return { id, servings, ingredients, appliance, ustensils, recipeCardTemplate };
}