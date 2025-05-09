import { generateFilter } from "./generateFilter.js";

export function createFilters(mealsList, containerId) {
  const container = document.getElementById(containerId);

  const categories = new Set(mealsList.map((item) => item.strCategory));
  const areas = new Set(mealsList.map((item) => item.strArea));

  const categoryFilter = generateFilter("category", categories);
  const areaFilter = generateFilter("area", areas);

  container.innerHTML = `
    <label class="input-container">
        <span>Category</span>
        ${categoryFilter.outerHTML}
    </label>
    <label class="input-container">
        <span>Area</span>
        ${areaFilter.outerHTML}
    </label>
    `;
}
