import { generateAlphabetFilter } from "./js/alphabetFilter.js";
import { createCard } from "./js/cards.js";
import { createFilters } from "./js/filters.js";

function init() {
  let mealsList = [];
  const containerMeals = document.getElementById("meals");
  const containerAlphabetFilter = generateAlphabetFilter("alfabet");
  const containerFilters = document.getElementById("additional-filters");

  containerAlphabetFilter.addEventListener("click", (event) => {
    event.preventDefault();

    containerMeals.innerHTML = "";
    containerFilters.innerHTML = "";

    const url = new URL("https://www.themealdb.com/api/json/v1/1/search.php");
    url.searchParams.set("f", event.target.dataset.letter);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.meals === null || data.meals.length === 0) {
          containerMeals.innerHTML = `<p>No se encontraron resultados.</p>`;
          return;
        }
        mealsList = data.meals;
        createFilters(mealsList, containerFilters.id, containerMeals.id);
        mealsList.forEach((meal) => {
          createCard(mealsList, meal, containerMeals.id);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

init();
