import { createCard } from "./cards.js";
import { generateFilter } from "./selectFilter.js";

export function createFilters(formId, containerMealId, getMeals, removeItem) {
  const form = document.getElementById(formId);
  const categories = new Set(getMeals().map((meal) => meal.category));
  const areas = new Set(getMeals().map((meal) => meal.area));

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

  const selectedCategory = localStorage.getItem("selectedCategory");
  const selectedArea = localStorage.getItem("selectedArea");

  const existCategoryFilter =
    selectedCategory !== null && selectedCategory !== undefined;
  const existAreaFilter = selectedArea !== null && selectedArea !== undefined;

  if (existCategoryFilter && existAreaFilter) {
    document.querySelector('[name="categoryFilter"]').value = selectedCategory;
    document.querySelector('[name="areaFilter"]').value = selectedArea;

    const newMealList = getMeals().filter((meal) => {
      const matchCategory =
        selectedCategory === "all" || meal.category === selectedCategory;
      const matchArea = selectedArea === "all" || meal.area === selectedArea;
      return matchCategory && matchArea;
    });

    newMealList.forEach((meal) => {
      createCard(meal, containerMealId, removeItem);
    });
  }

  form.addEventListener("change", (_e) => {
    const containerMeals = document.getElementById(containerMealId);
    containerMeals.innerHTML = "";

    const selectedCategory = document.querySelector(
      '[name="categoryFilter"]'
    ).value;
    const selectedArea = document.querySelector('[name="areaFilter"]').value;

    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("selectedArea", selectedArea);

    const newMealList = getMeals().filter((meal) => {
      const matchCategory =
        selectedCategory === "all" || meal.category === selectedCategory;
      const matchArea = selectedArea === "all" || meal.area === selectedArea;
      return matchCategory && matchArea;
    });

    newMealList.forEach((meal) => {
      createCard(meal, containerMealId, removeItem);
    });
  });

  return existCategoryFilter && existAreaFilter;
}
