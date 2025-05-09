import { createCard } from './card.mjs';

export function createFilters(mealsList, formId) {
  const form = document.getElementById(formId);

  const categories = new Set(mealsList.map((meal) => meal.strCategory));
  const areas = new Set(mealsList.map((meal) => meal.strArea));

  function createOptionAll() {
    const optionAll = document.createElement('option');
    optionAll.value = 'all';
    optionAll.textContent = 'All';

    return optionAll;
  }

  const categoryFilter = document.createElement('select');
  categoryFilter.name = 'categoryFilter';
  categoryFilter.append(createOptionAll());
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.append(option);
  });

  const areaFilter = document.createElement('select');
  areaFilter.name = 'areaFilter';
  areaFilter.append(createOptionAll());
  areas.forEach((area) => {
    const option = document.createElement('option');
    option.value = area;
    option.textContent = area;
    areaFilter.append(option);
  });

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

  form.addEventListener('change', (event) => {
    const [formCategory, formArea] = form.elements;

    const selectedCategory = formCategory.value;
    const selectedArea = formArea.value;

    const filteredMeals = mealsList.filter((meal) => {
      const matchesCategory =
        selectedCategory === 'all' || meal.strCategory === selectedCategory;
      const matchesArea =
        selectedArea === 'all' || meal.strArea === selectedArea;

      return matchesCategory && matchesArea;
    });

    const container = document.getElementById('meals');
    container.innerHTML = '';

    console.log(filteredMeals);

    filteredMeals.forEach((meal) => {
      createCard(meal, container.id);
    });
  });
}
