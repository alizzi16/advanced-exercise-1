import { generateAlphabetFilter } from "./js/alphabetFilter.js";
import { createCard } from "./js/cards.js";
import { createFilters } from "./js/filters.js";

function init() {
  let mealsList = JSON.parse(localStorage.getItem("meals"));
  let selectedLetter = localStorage.getItem("selectedLetter");

  const containerMeals = document.getElementById("meals");
  const containerAlphabetFilter = generateAlphabetFilter(
    "alphabet",
    selectedLetter
  );
  const containerFilters = document.getElementById("additional-filters");

  if (mealsList !== null && mealsList !== undefined) {
    const selected = createFilters(
      containerFilters.id,
      containerMeals.id,
      getMeals,
      removeMeal
    );

    if (!selected) {
      mealsList.forEach((meal) => {
        createCard(meal, containerMeals.id, removeMeal);
      });
    }
  } else {
    mealsList = [];
    if (selectedLetter !== null && selectedLetter !== undefined)
      containerMeals.innerHTML = `<p>No se encontraron resultados.</p>`;
  }

  containerAlphabetFilter.addEventListener("click", (event) => {
    event.preventDefault();

    containerMeals.innerHTML = "";
    containerFilters.innerHTML = "";
    mealsList = [];

    [...containerAlphabetFilter.children].forEach((a) => {
      a.classList.remove("active");
    });
    event.target.classList.add("active");

    selectedLetter = event.target.dataset.letter;
    const url = new URL("https://www.themealdb.com/api/json/v1/1/search.php");
    url.searchParams.set("f", selectedLetter);
    localStorage.setItem("selectedLetter", selectedLetter);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.meals === null || data.meals.length === 0) {
          mealsList = [];
          localStorage.removeItem("meals");
          localStorage.removeItem("selectedCategory");
          localStorage.removeItem("selectedArea");
          containerMeals.innerHTML = `<p>No se encontraron resultados.</p>`;
          return;
        }

        data.meals.forEach((item) => {
          const ingredients = [];

          for (const key of Object.keys(item)) {
            if (key.startsWith("strIngredient")) {
              const ingredientNumber = key.replace("strIngredient", "");

              if (item[key] !== "" && item[key] !== null)
                ingredients.push({
                  ingredient: item[key],
                  measure: item[`strMeasure${ingredientNumber}`],
                });
            }
          }
          const meal = {
            id: item.idMeal,
            name: item.strMeal,
            category: item.strCategory,
            area: item.strArea,
            imgUrl: item.strMealThumb,
            ingredients: ingredients,
            instructions: item.strInstructions,
          };

          mealsList.push(meal);
        });

        localStorage.setItem("meals", JSON.stringify(mealsList));
        localStorage.removeItem("selectedCategory");
        localStorage.removeItem("selectedArea");

        createFilters(
          containerFilters.id,
          containerMeals.id,
          getMeals,
          removeMeal
        );
        mealsList.forEach((meal) => {
          createCard(meal, containerMeals.id, removeMeal);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  function removeMeal(id) {
    mealsList = mealsList.filter((meal) => meal.id !== id);
    localStorage.setItem("meals", JSON.stringify(mealsList));
  }

  function getMeals() {
    return mealsList;
  }
}

init();
