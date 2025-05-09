import { createCard } from "./cards.js";
import { generateFilter } from "./selectFilter.js";

export function createFilters(mealsList, formId, containerMealId) {
  const form = document.getElementById(formId);

  const categories = new Set(mealsList.map((item) => item.strCategory));
  const areas = new Set(mealsList.map((item) => item.strArea));

  const categoryFilter = generateFilter("category", categories);
  const areaFilter = generateFilter("area", areas);

  form.innerHTML = `
    <label class="input-container">
        <span>Category</span>
        ${categoryFilter.outerHTML}
    </label>
    <label class="input-container">
        <span>Area</span>
        ${areaFilter.outerHTML}
    </label>
    `;

  form.addEventListener("change", (_e) => {
    const containerMeals = document.getElementById(containerMealId);
    containerMeals.innerHTML = "";

    const selectedCategory = document.querySelector(
      '[name="categoryFilter"]'
    ).value;
    const selectedArea = document.querySelector('[name="areaFilter"]').value;

    const newMealList = mealsList.filter((meal) => {
      const matchCategory =
        selectedCategory === "all" || meal.strCategory === selectedCategory;
      const matchArea = selectedArea === "all" || meal.strArea === selectedArea;
      return matchCategory && matchArea;
    });

    newMealList.forEach((meal) => {
      createCard(newMealList, meal, containerMealId);
    });
  });
}
