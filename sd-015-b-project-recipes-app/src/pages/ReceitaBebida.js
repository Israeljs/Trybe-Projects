import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AppRecipesContext from '../context/AppRecipesContext';
import { fetchDrinksRecipe, fetchMeals } from '../services/fetchAPI';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './ReceitaComida.css';

const noMagicalNumbers = 15;

function ReceitaBebida(props) {
  const [recipe, setRecipe] = useState({});
  const [favorite, setFavorite] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const { receitas, setReceitas } = useContext(AppRecipesContext);

  const history = useHistory();
  let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'))
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

  useEffect(() => {
    fetchMeals('Nome', '').then((response) => setReceitas(response));
    fetchDrinksRecipe(props.match.params.id)
      .then((response) => setRecipe(response.drinks[0]));
    setFavorite(favoriteRecipes
      ? favoriteRecipes
        .some((favoriteRecipe) => favoriteRecipe.id === props.match.params.id)
      : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const disableButton = doneRecipes
    ? doneRecipes.some((doneRecipe) => doneRecipe.id === props.match.params.id)
    : false;

  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  const inProgressButton = inProgressRecipes
    ? Object.keys(inProgressRecipes.cocktails).some(
      (recipeId) => recipeId === props.match.params.id,
    )
    : false;

  const threeSeconds = 3000;

  // função retirada do site https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_snackbar
  function myFunction() {
    const x = document.getElementById('snackbar');
    x.className = 'show';
    setTimeout(() => { x.className = x.className.replace('show', ''); }, threeSeconds);
  }

  function handleClick() {
    history.push(`/bebidas/${props.match.params.id}/in-progress`);
  }

  function copyToClipBoard() {
    navigator.clipboard.writeText(`http://localhost:3000/bebidas/${props.match.params.id}`);
    myFunction();
  }

  function handleFavorite() {
    if (favorite) {
      favoriteRecipes = favoriteRecipes
        .filter((favoriteRecipe) => favoriteRecipe.id !== props.match.params.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    } else {
      const recipeObject = {
        id: props.match.params.id,
        type: 'bebida',
        area: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
      favoriteRecipes.push(recipeObject);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
    setFavorite(!favorite);
  }

  const handleLeft = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRight = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    const listWidth = receitas.meals.length * 120;
    if ((window.innerWidth - listWidth) > x) {
      x = (window.innerWidth - listWidth) - 60;
    }

    setScrollX(x);
  };

  return (
    <div className="recipe-card">
      <div id="snackbar">Copiado!</div>
      <header>
        <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
        <div className="buttons">
          <button type="button" data-testid="share-btn" onClick={ copyToClipBoard }>
            <img src={ shareIcon } alt="compartilhar" />
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
        </div>
      </header>
      <div className="recipeContent">
        <img
          src={ recipe.strDrinkThumb }
          data-testid="recipe-photo"
          alt={ recipe.strDrink }
        />
        <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
        <p data-testid={ `${0}-ingredient-name-and-measure` }>
          {recipe.strIngredient1}
          {recipe.strMeasure1}
        </p>
        <p data-testid={ `${1}-ingredient-name-and-measure` }>
          {recipe.strIngredient2}
          {recipe.strMeasure2}
        </p>
        <p data-testid={ `${2}-ingredient-name-and-measure` }>
          {recipe.strIngredient3}
          {recipe.strMeasure3}
        </p>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        <h3>Recomendadas</h3>
        {/* <section style={ { overflow: 'auto', width: '250px', display: 'flex' } }>
          {receitas.meals && receitas.meals
            .filter((_, index) => index < noMagicalNumbers)
            .map((food, index) => (
              <div data-testid={ `${index}-recomendation-card` } key={ index }>
                <img
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                  width="200px"
                  height="200px"
                />
                <h4>{food.strCategory}</h4>
                <h3 data-testid={ `${index}-recomendation-title` }>
                  {food.strMeal}
                </h3>
              </div>
            ))}
        </section> */}
        <div className="movieRow">
          <h3>Recomendadas</h3>
          <div className="movieRow--left" onClick={ handleLeft }>
            <NavigateBeforeIcon style={ { fontSize: 50 } } />
          </div>
          <div className="movieRow--right" onClick={ handleRight }>
            <NavigateNextIcon style={ { fontSize: 50 } } />
          </div>
          <div className="movieRow--listarea">
            <div
              className="movieRow--list"
              style={ {
                marginLeft: scrollX,
                width: receitas.meals
                && receitas.meals.length * 150,
              } }
            >
              {receitas.meals
                && receitas.meals
                  .filter((_, index) => index < noMagicalNumbers)
                  .map((meal, index) => (
                    <div
                      data-testid={ `${index}-recomendation-card` }
                      key={ index }
                      className="movieRow--item"
                    >
                      <img
                        src={ meal.strMealThumb }
                        alt={ meal.strMeal }
                        width="150"
                        height="150"
                      />
                      <h4 className="drink--category">
                        {meal.strCategory}
                        {' '}
                      </h4>
                      <h3 data-testid={ `${index}-recomendation-title` } className="drink--name">
                        {meal.strMeal}
                      </h3>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        {inProgressButton ? (
          <button
            className="start-recipe"
            data-testid="start-recipe-btn"
            type="button"
          >
            Continuar Receita
          </button>
        ) : (
          !disableButton && (
            <button
              className="start-recipe"
              data-testid="start-recipe-btn"
              type="button"
              onClick={ handleClick }
            >
              Iniciar Receita
            </button>
          )
        )}
      </div>
    </div>
  );
}

ReceitaBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ReceitaBebida;
