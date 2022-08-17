import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import AppRecipesContext from '../context/AppRecipesContext';
import Footer from '../components/Footer';
import { fetchDrinks, fetchDrinksByCategory,
  fetchDrinksCategory } from '../services/fetchAPI';

const maxReceitas = 12;
const maxCategories = 5;

function Bebidas() {
  const { receitas, setReceitas,
    drinksCategory, setDrinksCategory } = useContext(AppRecipesContext);
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
  const [prevCategory, setPrevCategory] = useState('');

  function redirectDrink() {
    if (receitas.drinks && receitas.drinks.length === 1) {
      history.push(`/bebidas/${receitas.drinks[0].idDrink}`);
    }
  }

  function handleClick(category) {
    if (category !== prevCategory && category !== 'all') {
      fetchDrinksByCategory(category).then((response) => setReceitas(response));
      setToggle(true);
      setPrevCategory(category);
    } if ((toggle && category === prevCategory) || category === 'all') {
      fetchDrinks('Nome', '').then((response) => setReceitas(response));
      setToggle(false);
      setPrevCategory(category);
    }
  }

  useEffect(() => {
    fetchDrinks('Nome', '').then((response) => setReceitas(response));
    fetchDrinksCategory().then((response) => setDrinksCategory(response));
  }, []);

  useEffect(() => {
    redirectDrink();
  }, [receitas]);

  return (
    <div className="foodContainer">
      <Header pageTitle="Bebidas" />
      <div className="foodContent">
        <div className="navbar">
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ () => handleClick('all') }
          >
            All
          </button>
          { drinksCategory && drinksCategory.filter((_, index) => index < maxCategories)
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
        { receitas.drinks && receitas.drinks.filter((_, index) => index < maxReceitas)
          .map((drink, index) => (
            <div
              key={ drink.idDrink }
              className="cardContent"
            >
              <Link
                data-testid={ `${index}-recipe-card` }
                to={ `/bebidas/${drink.idDrink}` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <p data-testid={ `${index}-card-name` }>
                  {drink.strDrink}
                </p>
              </Link>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

Bebidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Bebidas;
