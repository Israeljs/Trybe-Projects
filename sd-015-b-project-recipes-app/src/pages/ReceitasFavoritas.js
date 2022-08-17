import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ReceitasFavoritas() {
  const [message, setMessage] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [selected, setSelected] = useState('');
  const [listRecipes, setListRecipes] = useState([]);
  const history = useHistory();

  let favoriteRecipes = localStorage.getItem('favoriteRecipes')
    ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];

  useEffect(() => {
    setListRecipes(favoriteRecipes);
  }, []);

  function copyToClipBoard(type, id) {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setSelected(id);
    setMessage(true);
  }

  function handleAll() {
    setListRecipes(favoriteRecipes);
  }

  function handleFood() {
    setListRecipes(favoriteRecipes.filter((recipes) => recipes.type === 'comida'));
  }

  function handleDrinks() {
    setListRecipes(favoriteRecipes.filter((recipes) => recipes.type === 'bebida'));
  }

  function handleFavorite(id) {
    // se a receita já estiver favorita, remove ela do localStorage.
    if (favorite) {
      favoriteRecipes = favoriteRecipes
        .filter((favoriteRecipe) => favoriteRecipe.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
    // sempre que clica, altera o estado de favoritada.
    setFavorite(!favorite);
  }

  return (
    <>
      <Header pageTitle="Receitas Favoritas" isExplore />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ handleAll }
      >
        All
      </button>

      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ handleFood }
      >
        Food
      </button>

      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ handleDrinks }
      >
        Drinks
      </button>

      {/* detalhes da receita */}
      { listRecipes && listRecipes.map((recipe, index) => (
        <div key={ recipe.name }>
          <button
            type="button"
            onClick={ () => history.push(`http://localhost:3000/${recipe.type}s/${recipe.id}`) }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              alt={ recipe.name }
              src={ recipe.image }
            />
          </button>
          {/* categoria da receita */}
          {(recipe.type === 'comida')
            ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${recipe.area} - ${recipe.category}`}
              </p>
            )
            : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.alcoholicOrNot }
              </p>
            )}

          {/* nome da receita */}
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
          >
            <p data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </p>
          </Link>
          <button
            type="button"
            onClick={ () => copyToClipBoard(recipe.type, recipe.id) }
          >
            <img
              src={ shareIcon }
              alt="favorite"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          {(message && selected === recipe.id) && <p>Link copiado!</p>}
          <button type="button" onClick={ () => handleFavorite(recipe.id) }>
            <img
              src={ blackHeartIcon }
              alt="favoritado"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      ))}

    </>
  );
}

export default ReceitasFavoritas;
