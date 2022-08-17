import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import AppRecipesContext from '../context/AppRecipesContext';
import { fetchMealsRecipe, fetchDrinks } from '../services/fetchAPI';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './ReceitaComida.css';

const noMagicalNumbers = 15;

function ReceitaComida(props) {
  const [recipe, setRecipe] = useState({});
  const [favorite, setFavorite] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const { receitas, setReceitas } = useContext(AppRecipesContext);

  const history = useHistory();

  // verifica se existe algum item no localStorage com a chave 'favoriteRecipes',
  // se tiver salva na variável favoriteRecipes, caso contrario a inicializa
  // com um array vazio.
  let favoriteRecipes = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes'))
    : [];

  // useEffect executando com componentDidMount, inicia as variáveis receitas,
  // recipe e favorite.
  useEffect(() => {
    fetchDrinks('Nome', '').then((response) => setReceitas(response));
    fetchMealsRecipe(props.match.params.id)
      .then((response) => setRecipe(response.meals[0]));
    setFavorite(
      favoriteRecipes
        ? favoriteRecipes.some(
          (favoriteRecipe) => favoriteRecipe.id === props.match.params.id,
        )
        : false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // como a doneRecipes só é executada uma vez na tela não precisa usar estado para isso.
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  // caso tenha o id da receita atual entre a lista de receitas completas
  // o botão fica desabilitado.
  const disableButton = doneRecipes
    ? doneRecipes.some((doneRecipe) => doneRecipe.id === props.match.params.id)
    : false;

  // executada uma vez como a doneRecipes.
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  // caso o id da receita atual seja uma das chaves do objeto inProgressRecipes
  // ele muda a variável que seleciona se vai iniciar receita ou continuar receita.
  const inProgressButton = inProgressRecipes
    ? Object.keys(inProgressRecipes.meals).some(
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

  // ao clicar no botão de iniciar receita vai para a página de receita em progresso.
  function handleClick() {
    history.push(`/comidas/${props.match.params.id}/in-progress`);
  }

  // ao clicar no botão de compartilhar coloca o link da página atual na área
  // de transferência.
  function copyToClipBoard() {
    navigator.clipboard.writeText(
      `http://localhost:3000/comidas/${props.match.params.id}`,
    );
    myFunction();
  }

  // função que gere a atuação do botão de favorite/unfavorite.
  function handleFavorite() {
    // se a receita já estiver favorita, remove ela do localStorage.
    if (favorite) {
      favoriteRecipes = favoriteRecipes.filter(
        (favoriteRecipe) => favoriteRecipe.id !== props.match.params.id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    } else {
      // caso ela ainda não esteja favoritada, cria um objeto com as informações
      // necessárias e salva no localStorage.
      const recipeObject = {
        id: props.match.params.id,
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
    // sempre que clica, altera o estado de favoritada.
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
    const listWidth = receitas.drinks.length * 120;
    if ((window.innerWidth - listWidth) > x) {
      x = (window.innerWidth - listWidth) - 60;
    }

    setScrollX(x);
  };

  return (
    <div className="recipe-card">
      <div id="snackbar">Copiado!</div>
      <header>
        <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
        <div className="buttons">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ copyToClipBoard }
          >
            <img src={ shareIcon } alt="compartilhar" />
          </button>
          <button type="button" onClick={ handleFavorite }>
            {favorite ? (
              <img
                src={ blackHeartIcon }
                alt="favoritado"
                data-testid="favorite-btn"
              />
            ) : (
              <img
                src={ whiteHeartIcon }
                alt="nao-favoritado"
                data-testid="favorite-btn"
              />
            )}
          </button>
        </div>
      </header>
      <div className="recipeContent">
        <img
          src={ recipe.strMealThumb }
          data-testid="recipe-photo"
          alt={ recipe.strMeal }
        />
        <p data-testid="recipe-category">{recipe.strCategory}</p>
        {/* feito nas coxas, pois não sabemos fazer elementos dinâmicos sem array. */}
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
        <p data-testid="3-ingredient-name-and-measure">
          {recipe.strIngredient4}
          {recipe.strMeasure4}
        </p>
        <p data-testid="4-ingredient-name-and-measure">
          {recipe.strIngredient5}
          {recipe.strMeasure5}
        </p>
        <p data-testid="5-ingredient-name-and-measure">
          {recipe.strIngredient6}
          {recipe.strMeasure6}
        </p>
        <p data-testid="6-ingredient-name-and-measure">
          {recipe.strIngredient7}
          {recipe.strMeasure7}
        </p>
        <p data-testid="7-ingredient-name-and-measure">
          {recipe.strIngredient8}
          {recipe.strMeasure8}
        </p>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        {/* video no youtube, tentamos fazer funcionar, mas os conflitos de região
      não permitem executar o video. */}
        {/* <embed
          width="420"
          height="315"
          src={ recipe.strYoutube }
          data-testid="video"
        /> */}
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
                width: receitas.drinks
                && receitas.drinks.length * 150,
              } }
            >
              {receitas.drinks
                && receitas.drinks
                  .filter((_, index) => index < noMagicalNumbers)
                  .map((drink, index) => (
                    <div
                      data-testid={ `${index}-recomendation-card` }
                      key={ index }
                      className="movieRow--item"
                    >
                      <img
                        src={ drink.strDrinkThumb }
                        alt={ drink.strDrink }
                        width="150"
                        height="150"
                      />
                      <h4 className="drink--category">
                        {drink.strCategory}
                        {' '}
                      </h4>
                      <h3 data-testid={ `${index}-recomendation-title` } className="drink--name">
                        {drink.strDrink}
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

ReceitaComida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ReceitaComida;
