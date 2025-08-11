const recipeContainer = document.getElementById("recipes");
const loading = document.getElementById("loading");

function showLoading() {
  loading.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
}

function searchRecipes() {
  let ingredient = document.getElementById("ingredientInput").value.trim();
  if (!ingredient) {
    alert("Please enter an ingredient");
    return;
  }

  showLoading();

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then(res => res.json())
    .then(data => {
      hideLoading();
      displayRecipes(data.meals);
    })
    .catch(() => {
      hideLoading();
      alert("Error fetching recipes");
    });
}

function randomRecipe() {
  showLoading();

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      hideLoading();
      displayRecipes(data.meals);
    })
    .catch(() => {
      hideLoading();
      alert("Error fetching recipe");
    });
}

function displayRecipes(meals) {
  recipeContainer.innerHTML = "";
  if (!meals) {
    recipeContainer.innerHTML = "<p>No recipes found</p>";
    return;
  }

  meals.forEach(meal => {
    let card = `
      <div class="recipe-card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
        <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Recipe</a>
      </div>
    `;
    recipeContainer.innerHTML += card;
  });
}