export function recipeCard(recipesData) {

	const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipesData;

	function recipeCardTemplate() {
        // Créer le contenant de la carte
		const recipeCard = document.createElement("div");
		recipeCard.classList.add("card", "recipe-card", "mb-5");

        // Créer la partie pour afficher l'image et la durée de la recette
        const recipeCardImg = document.createElement("div");
        recipeCardImg.className = "recipe-card__img";

        const imageCard = document.createElement("img");
        imageCard.className = "card-img-top";
        imageCard.setAttribute("src", `../../assets/recipes-thumbnail/${image}`);
        imageCard.setAttribute("alt", "");

        const duration = document.createElement("p");
        duration.innerText = `${time}min`;
        duration.setAttribute("aria-label", "Temps moyen pour réaliser la recette");

        recipeCardImg.appendChild(imageCard);
        recipeCardImg.appendChild(duration);

        // Corps de la carte
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

        // Liste des ingrédients
        const ingredientsList = document.createElement("div");
        ingredientsList.classList.add("ingredients-list", "d-flex", "flex-row", "flex-wrap", "card-body");

        // Parcourir le tableau des ingrédients
        ingredients.forEach(item => {

            const p = document.createElement("p");
            if (item) { /*Si un item est présent */

                if (item?.ingredient) { /*Vérifier si ingredient */
                    if (item?.quantity) { /*Vérifier si quantity */
                        if (item?.unit) { /*Vérifier si unit */
                            p.innerHTML = `${item.ingredient}<br><span>${item.quantity} ${item.unit}</span>`;

                            
                        } else {
                            p.innerHTML = `${item.ingredient}<br><span>${item.quantity}</span>`;

                        }
                    } else {
                        p.innerHTML = `${item.ingredient}`;

                    }
                }
            }
            // Intégrer les balises p
            ingredientsList.appendChild(p);
        });

        // Intégrer les éléments dans le contenant de la carte
        recipeCard.appendChild(recipeCardImg);
        recipeCard.appendChild(cardBody);
        recipeCard.appendChild(ingredientsList);

		return recipeCard;      
	}

	return { id, servings, ingredients, appliance, ustensils, recipeCardTemplate };
}
/*
<div class="card recipe-card mb-4">
    <div class="recipe-card__img">
        <img class="card-img-top" src="assets/images/hero-header.webp" alt="">
        <p>10min</p>
    </div>
    <div class="card-body">
        <h2 class="card-title">Limonade de coco</h2>
        <h3 class="card-subtitle">Recette</h3>
        <p class="card-text">
            Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée.
        </p>
        <h3 class="card-subtitle">Ingrédients</h3>
        <div class="ingredients-list d-flex flex-row flex-wrap align-content-around">
            <p>Lait de coco<br><span>400ml</span></p>
            <p>Crème de coco<br><span>4 cuillères</span></p>
            <p>Glaçons<br><span>2</span></p>
            <p>Jus de citrons<br><span>2</span></p>
            <p>Sucre<br><span>20g</span></p>
        </div>
    </div>
</div>
*/