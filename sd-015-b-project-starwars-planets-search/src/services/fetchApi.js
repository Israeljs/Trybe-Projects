const ATAR_WARS_DATA = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchApi = async () => {
  const response = await fetch(ATAR_WARS_DATA);
  const { results } = await response.json();

  return response.ok ? Promise.resolve(results) : Promise.reject(results);
};

export default fetchApi;
