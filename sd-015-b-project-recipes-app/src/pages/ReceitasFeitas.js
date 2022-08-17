import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

function ReceitasFeitas() {
  const [message, setMessage] = useState(false);
  const [listRecipes, setListRecipes] = useState([]);
  const history = useHistory();

  const doneRecipes = localStorage.getItem('doneRecipes')
    ? JSON.parse(localStorage.getItem('doneRecipes')) : [];

  useEffect(() => {
    setListRecipes(doneRecipes);
  }, []);

  function copyToClipBoard(type, id) {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setMessage(true);
  }

  function handleAll() {
    setListRecipes(doneRecipes);
  }

  function handleFood() {
    setListRecipes(doneRecipes.filter((recipes) => recipes.type === 'comida'));
  }

  function handleDrinks() {
    setListRecipes(doneRecipes.filter((recipes) => recipes.type === 'bebida'));
  }

  return (
    <>
      <Header pageTitle="Receitas Feitas" isExplore />
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
          {/* data que a receita foi feita */}
          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>
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
          {message && <p>Link copiado!</p>}
          {/* tags da receita */}
          { recipe.tags.map((tag) => (
            <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </p>
          )) }
        </div>
      ))}

    </>
  );
}

export default ReceitasFeitas;
