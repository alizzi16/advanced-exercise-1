export function createCard(meal, containerId, removeItem) {
  const container = document.getElementById(containerId);

  let stringIngredients = "";
  meal.ingredients.forEach((item) => {
    stringIngredients += `<li> ${item.measure} ${item.ingredient} </li>`;
  });

  const divCard = document.createElement("div");
  divCard.classList.add("card-container");
  divCard.classList.add("front");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  cardFront.innerHTML = `
    <div class='card-header'>
        <div class='card-header-title'>
            <h3 class='card-title'>${meal.name.toUpperCase()}</h3>
        </div>
    </div>
    <div class='card-attributes'>
        <p class='card-container__category'>${meal.category.toUpperCase()}</p>
        <p class='card-container__area'>${meal.area.toUpperCase()}</p>
    </div>
    <img class='card-image' src="${meal.imgUrl}" />
  `;

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardBack.classList.add("hidden");
  cardBack.innerHTML = `
    <div class='card-ingredients'>
        <div class='card-ingredients-title'>
            <h3>Ingredients</h3>
        </div>
        <ul>
        ${stringIngredients}
        </ul>
        <div class='card-instructions'>
            <h3>Instructions</h3>
            <p>${meal.instructions}</p>
        </div>        
    </div>
  `;

  divCard.append(cardFront, cardBack);

  divCard.addEventListener("click", () => {
    divCard.classList.toggle("front");
    cardFront.classList.toggle("hidden");
    cardBack.classList.toggle("hidden");
  });

  const deleteButton = document.createElement("a");
  deleteButton.textContent = "X";
  deleteButton.dataset.id = meal.id;

  const divTitle = divCard.querySelector(".card-header");
  divTitle.append(deleteButton);

  deleteButton.addEventListener("click", () => {
    divCard.remove();
    removeItem(deleteButton.dataset.id);
  });

  container.append(divCard);

  return {
    meal
  };
}
