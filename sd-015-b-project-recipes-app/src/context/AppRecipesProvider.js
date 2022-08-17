import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppRecipesContext from './AppRecipesContext';

function AppRecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [receitas, setReceitas] = useState([]);
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);

  return (
    <AppRecipesContext.Provider
      value={ { email,
        setEmail,
        receitas,
        setReceitas,
        mealsCategory,
        setMealsCategory,
        drinksCategory,
        setDrinksCategory } }
    >
      { children }
    </AppRecipesContext.Provider>
  );
}

AppRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppRecipesProvider;
