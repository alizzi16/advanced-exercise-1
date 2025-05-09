import { createCard } from "./js/cards.js";
import { createFilters } from "./js/filters.js";

function init() {
  const form = document.getElementById("form");
  let mealsList = [];

  form.addEventListener("submit", (event) => {
    const container = document.getElementById("meals");
    container.classList.add("meals-container");
    const containerFilters = document.getElementById("additional-filters");
    container.innerHTML = "";
    containerFilters.innerHTML = "";

    event.preventDefault();

    const data = { search: form.firstLetter.value };
    const url = new URL("https://www.themealdb.com/api/json/v1/1/search.php");

    url.searchParams.set("f", data.search);
    console.log(url.toString());

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        mealsList = data.meals;

        if (mealsList.length > 0) createFilters(mealsList, containerFilters.id);

        mealsList.forEach((meal) => {
          createCard(mealsList, meal, container.id);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

init();
