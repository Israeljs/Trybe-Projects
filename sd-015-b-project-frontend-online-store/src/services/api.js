const listCategories = 'https://api.mercadolibre.com/sites/MLB/categories';

export async function getCategories() {
  const fetchResponse = await fetch(listCategories);
  const results = await fetchResponse.json();
  return results;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const getProductsFromCategory = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const fetchResponse = await fetch(getProductsFromCategory);
  const results = await fetchResponse.json();
  return results;
}
