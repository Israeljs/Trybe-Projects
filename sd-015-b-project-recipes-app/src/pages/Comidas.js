import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import AppRecipesContext from '../context/AppRecipesContext';
import Footer from '../components/Footer';
import { fetchMeals, fetchMealsByCategory,
  fetchMealsCategory } from '../services/fetchAPI';

const maxReceitas = 12;
const maxCategories = 5;

function Comidas() {
  const { receitas, setReceitas,
    mealsCategory, setMealsCategory } = useContext(AppRecipesContext);
  const history = useHistory();
  const [caseGoat, setCaseGoat] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [prevCategory, setPrevCategory] = useState('');

  function redirectMeal() {
    if ((receitas.meals) && (receitas.meals.length === 1) && (!caseGoat)) {
      history.push(`/comidas/${receitas.meals[0].idMeal}`);
    }
  }

  function handleClick(category) {
    if (category === 'Goat') {
      setCaseGoat(!caseGoat);
    }
    if (category !== prevCategory && category !== 'all') {
      fetchMealsByCategory(category).then((response) => setReceitas(response));
      setToggle(true);
      setPrevCategory(category);
    } if ((toggle && category === prevCategory) || category === 'all') {
      fetchMeals('Nome', '').then((response) => setReceitas(response));
      setToggle(false);
      setPrevCategory(category);
    }
  }

  // executa quando é montado pela primeira vez
  useEffect(() => {
    fetchMeals('Nome', '').then((response) => setReceitas(response));
    fetchMealsCategory().then((response) => setMealsCategory(response));
  }, []);

  // executa sempre que o receita mudar
  useEffect(() => {
    redirectMeal();
  }, [receitas]);

  return (
    <div className="foodContainer">
      <Header pageTitle="Comidas" />
      <div className="foodContent">
        <div className="navbar">
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => handleClick('all') }
          >
            All
          </button>
          { mealsCategory && mealsCategory.filter((_, index) => index < maxCategories)
            .map(({ strCategory }) => (
              <button
                type="button"
                key={ strCategory }
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => handleClick(strCategory) }
              >
                { strCategory }
              </button>

            ))}
        </div>
      </div>

      <div className="cardContainer">
        { receitas.meals && receitas.meals.filter((_, index) => index < maxReceitas)
          .map((meal, index) => (
            <div
              key={ meal.idMeal }
              className="cardContent"
            >
              <Link
                data-testid={ `${index}-recipe-card` }
                to={ `/comidas/${meal.idMeal}` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
                <p data-testid={ `${index}-card-name` }>
                  {meal.strMeal}
                </p>
              </Link>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Comidas;
