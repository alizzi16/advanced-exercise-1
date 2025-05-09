export function createCard(mealsList, mealObj, containerId) {
  const container = document.getElementById(containerId);

  const id = mealObj.idMeal;
  const name = mealObj.strMeal;
  const category = mealObj.strCategory;
  const area = mealObj.strArea;
  const imgUrl = mealObj.strMealThumb;

  const ingredients = [];
  let stringIngredients = "";

  for (const key of Object.keys(mealObj)) {
    if (key.startsWith("strIngredient")) {
      const ingredientNumber = key.replace("strIngredient", "");

      if (mealObj[key] !== "" && mealObj[key] !== null)
        ingredients.push({
          ingredient: mealObj[key],
          measure: mealObj[`strMeasure${ingredientNumber}`],
        });
    }
  }

  ingredients.forEach((item) => {
    stringIngredients += `<li> ${item.measure} ${item.ingredient} </li>`;
  });

  const divCard = document.createElement("div");
  divCard.classList.add("card-container");

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  cardFront.innerHTML = `
    <div class='card-header'>
        <div class='card-header-title'>
            <h2 class='card-title'>${name}</h2>
        </div>
    </div>
    <div class='card-attributes'>
        <p>${category}</p>
        <p>${area}</p>
    </div>
    <img class='card-image' src="${imgUrl}" />
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
    </div>
  `;

  divCard.append(cardFront, cardBack);

  divCard.addEventListener("click", () => {
    cardFront.classList.toggle("hidden");
    cardBack.classList.toggle("hidden");
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.dataset.id = id;

  const divTitle = divCard.querySelector(".card-header");
  divTitle.append(deleteButton);

  deleteButton.addEventListener("click", () => {
    const elementId = deleteButton.dataset.id;
    divCard.remove();

    mealsList = mealsList.filter((item) => item.idMeal !== elementId);
    console.log(mealsList);
  });

  container.append(divCard);

  return {
    id: id,
    name: name,
  };
}
