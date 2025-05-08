const form = document.getElementById('form');
let mealsList = [];

form.addEventListener('submit', (event) => {

    const container = document.getElementById("meals");
    const containerFilters = document.getElementById("additional-filters");
    container.innerHTML = "";
    containerFilters.innerHTML = "";

    event.preventDefault();

    const data = { search: form.firstLetter.value };
    const url = new URL('https://www.themealdb.com/api/json/v1/1/search.php');

    url.searchParams.set('f', data.search);
    console.log(url.toString());

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            mealsList = data.meals;

            if (mealsList.length > 0)
                createFilters(mealsList, containerFilters.id);

            mealsList.forEach(meal => {
                createCard(meal, container.id);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

function createCard(mealObj, containerId) {

    const container = document.getElementById(containerId);
    container.classList.add("meals-container");

    const id = mealObj.idMeal;
    const name = mealObj.strMeal;
    const category = mealObj.strCategory;
    const area = mealObj.strArea;
    const imgUrl = mealObj.strMealThumb;

    const ingredients = [];
    let stringIngredients = "";

    for (const key of Object.keys(mealObj)) {

        if (key.startsWith('strIngredient')) {

            const ingredientNumber = key.replace('strIngredient', '');

            if (mealObj[key] !== '' && mealObj[key] !== null)

                ingredients.push(
                    {
                        'ingredient': mealObj[key],
                        'measure': mealObj[`strMeasure${ingredientNumber}`]
                    }
                );
        }
    }

    ingredients.forEach(item => {
        stringIngredients += `<li> ${item.measure} ${item.ingredient} </li>`;
    });

    const divCard = document.createElement('div');
    divCard.id = id;
    divCard.classList.add("card-container");
    divCard.innerHTML = `
            <div class='card-front'>
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
            </div>
            <div class='card-back'>
            <div class='card-ingredients'>
                <div class='card-ingredients-title'>
                    <h3>Ingredients</h3>
                </div>
                <ul>
                ${stringIngredients}
                </ul>
            </div>
        </div>
        `;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "X";
    deleteButton.setAttribute('data-id', id);

    const divTitle = divCard.querySelector('.card-header');
    divTitle.append(deleteButton);

    deleteButton.addEventListener('click', () => {
        const elementId = deleteButton.getAttribute('data-id');
        const divToDelete = document.getElementById(elementId);
        divToDelete.remove();

        mealsList = mealsList.filter(item => item.idMeal !== elementId);
        console.log(mealsList);
    });

    container.append(divCard);

    return {
        id: id,
        name: name
    };

}

function createFilters(mealObj, containerId) {
    const container = document.getElementById(containerId);

    container.innerHTML = `
                <label class="input-container">
                    <span>Category</span>
                    <input type="text" name="categoryFilter" />
                </label>
                <label class="input-container">
                    <span>Area</span>
                    <input type="text" name="areaFilter" />
                </label>
                `;
}