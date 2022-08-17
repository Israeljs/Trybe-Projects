import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchMealsByIngredient } from '../services/fetchAPI';

function ExplorarIngredientesComidas() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchMealsByIngredient().then(
      (response) => setIngredients(response),
    );
  }, []);

  return (
    <div className="exploreContainer">
      <Header pageTitle="Explorar Ingredientes Comidas" isExplore />
      {ingredients.map((ingredient, index) => (
        <div
          className="exploreContent"
          data-testid={ `${index}-ingredient-card` }
          key={ ingredient.strIngredient }
        >
          <img
            src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            data-testid={ `${index}-card-img` }
            alt={ ingredient }
            width="150px"
            height="150px"
          />
          <h4 data-testid={ `${index}-card-name` }>
            {' '}
            {ingredient.strIngredient}
            {' '}
          </h4>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default ExplorarIngredientesComidas;
