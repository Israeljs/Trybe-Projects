import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchMealsRecipe } from '../services/fetchAPI';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import Checkbox from '../components/Checkbox';

function ReceitaComidaEmAndamento(props) {
  const [recipe, setRecipe] = useState({});
  const [message, setMessage] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();

  let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'))
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

  // quando inicia a página - didMount
  useEffect(() => {
    fetchMealsRecipe(props.match.params.id)
      .then((response) => setRecipe(response.meals[0]));
    setFavorite(favoriteRecipes
      ? favoriteRecipes
        .some((favoriteRecipe) => favoriteRecipe.id === id)
      : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function copyToClipBoard() {
    navigator.clipboard.writeText(`http://localhost:3000/comidas/${id}`);
    setMessage(true);
  }

  function handleFavorite() {
    if (favorite) {
      favoriteRecipes = favoriteRecipes
        .filter((favoriteRecipe) => favoriteRecipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    } else {
      const recipeObject = {
        id,
        type: 'comida',
        area: recipe.strArea,
        alcoholicOrNot: '',
        category: recipe.strCategory,
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
      favoriteRecipes.push(recipeObject);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
    setFavorite(!favorite);
  }

  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        data-testid="recipe-photo"
        alt={ recipe.strMeal }
      />
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <button type="button" data-testid="share-btn" onClick={ copyToClipBoard }>
        Compartilhar
      </button>
      <button type="button" onClick={ handleFavorite }>
        {favorite ? (<img
          src={ blackHeartIcon }
          alt="favoritado"
          data-testid="favorite-btn"
        />)
          : (
            <img
              src={ whiteHeartIcon }
              alt="nao-favoritado"
              data-testid="favorite-btn"
            />)}
      </button>
      {message && <p>Link copiado!</p>}
      <p data-testid="recipe-category">{recipe.strCategory}</p>

      <Checkbox id={ id } type="meal" />
    </div>
  );
}

ReceitaComidaEmAndamento.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ReceitaComidaEmAndamento;
