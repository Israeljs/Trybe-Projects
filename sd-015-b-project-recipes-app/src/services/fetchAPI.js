// busca por comidas
export async function fetchMeals(atributo, search) {
  if (atributo.includes('Ingrediente')) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
    const json = await response.json();
    return json;
  }

  if (atributo.includes('Nome')) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const json = await response.json();
    return json;
  }

  if (atributo.includes('Primeira')) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
    const json = await response.json();
    return json;
  }
}

// busca por bebidas
export async function fetchDrinks(atributo, search) {
  if (atributo.includes('Ingrediente')) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
    const json = await response.json();
    return json;
  }

  if (atributo.includes('Nome')) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
    const json = await response.json();
    return json;
  }

  if (atributo.includes('Primeira')) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`);
    const json = await response.json();
    return json;
  }
}

// busca categorias - comida
export async function fetchMealsCategory() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const json = await response.json();
  return json.meals;
}

// busca categorias - bebida
export async function fetchDrinksCategory() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const json = await response.json();
  return json.drinks;
}

// busca por categorias - comida
export async function fetchMealsByCategory(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const json = await response.json();
  return json;
}

// busca por categorias - bebida
export async function fetchDrinksByCategory(category) {
  const response = await
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const json = await response.json();
  return json;
}

// busca por receita de comida
export async function fetchMealsRecipe(id) {
  const response = await
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const json = await response.json();
  return json;
}

// busca por receita de bebida
export async function fetchDrinksRecipe(id) {
  const response = await
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const json = await response.json();
  return json;
}

// busca por receita aleatoria de comida
export async function fetchRandomMeal() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const json = await response.json();
  return json;
}

// busca por receita aleatoria de bebida
export async function fetchRandomDrink() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const json = await response.json();
  return json;
}

// busca por ingredientes de comida
export async function fetchMealsByIngredient() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const json = await response.json();
  const noMagicNumbers = 12;
  const filterIngredients = json.meals.filter((__, index) => index < noMagicNumbers);
  return filterIngredients;
}
