import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchMealsRecipe, fetchDrinksRecipe } from '../services/fetchAPI';

export default function Checkbox({ id, type }) {
  const [recipe, setRecipe] = useState({});
  const [change, setChange] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isChecked, setIsChecked] = useState({});
  const initialCheck = {};
  const history = useHistory();

  const ingredientsKeys = recipe
    && Object.keys(recipe).filter((item) => item.includes('Ingredient'));
  const measuresKeys = recipe
    && Object.keys(recipe).filter((item) => item.includes('Measure'));

  const ingredients = [];
  const measures = [];

  ingredientsKeys.forEach((ingredient) => {
    if (recipe[ingredient]) {
      ingredients.push(recipe[ingredient]);
    }
  });
  measuresKeys.forEach((measure) => {
    if (recipe[measure] && recipe[measure] !== ' ') {
      measures.push(recipe[measure]);
    }
  });

  ingredients.forEach((_, index) => { (initialCheck[`isChecked${index}`] = false); });

  // quando inicia a página - didMount
  useEffect(() => {
    if (type === 'meal') {
      fetchMealsRecipe(id)
        .then((response) => setRecipe(response.meals[0]));
    } else {
      fetchDrinksRecipe(id)
        .then((response) => setRecipe(response.drinks[0]));
    }
    const checkedList = localStorage.getItem(`${id}`)
      ? JSON.parse(localStorage.getItem(`${id}`))
      : Object.values(initialCheck);
    checkedList.forEach((checked, index) => {
      initialCheck[`isChecked${index}`] = checked;
    });
    setLoaded(true);
  }, []);

  useEffect(() => {
    setIsChecked(initialCheck);
  }, []);

  // tipo component didUpdate
  useEffect(() => {
    if (loaded) {
      const checkedList = Object.values(isChecked);
      localStorage.setItem(`${id}`, JSON.stringify(checkedList));
      if (checkedList.every((check) => check)) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  }, [change]);

  function handleCheck(index) {
    const checkedList = isChecked;
    checkedList[`isChecked${index}`] = !checkedList[`isChecked${index}`];
    setIsChecked(checkedList);
    setChange(!change);
  }

  return (
    <>
      {ingredients.map((ingredient, index) => (
        <label
          key={ ingredient }
          htmlFor={ `${ingredient}${index}` }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            id={ `${ingredient}${index}` }
            defaultChecked={ isChecked[`isChecked${index}`] }
            value={ isChecked[`isChecked${index}`] }
            onChange={ () => handleCheck(`${index}`) }
          />
          {ingredient}
          {measures[index]}
        </label>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        className="start-recipe"
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ () => history.push('/receitas-feitas') }
      >
        Finalizar Receita
      </button>
    </>
  );
}

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
