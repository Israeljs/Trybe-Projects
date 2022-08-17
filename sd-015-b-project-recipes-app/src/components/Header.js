import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppRecipesContext from '../context/AppRecipesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { fetchMeals, fetchDrinks } from '../services/fetchAPI';

function Header({ pageTitle, isExplore }) {
  const [abledSearch, setAbledSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [atributo, setAtributo] = useState('');
  const { setReceitas } = useContext(AppRecipesContext);

  // habilita ou não campo de busca, de acordo com clique
  function ableSearch() {
    setAbledSearch(!abledSearch);
  }

  async function handleClick() {
    if (atributo.includes('Primeira') && searchInput.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    if (pageTitle.includes('Comida')) {
      const guardaReceita = await fetchMeals(atributo, searchInput);
      setReceitas(guardaReceita);
      if (!guardaReceita.meals) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    } else {
      const guardaReceita = await fetchDrinks(atributo, searchInput);
      setReceitas(guardaReceita);
      if (!guardaReceita.drinks) {
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      }
    }
  }

  return (
    <header className="headerContainer">
      <Link
        to="/perfil"
        data-testid="profile-top-btn"
        src={ profileIcon }
      >
        <img src={ profileIcon } alt="profile" />
      </Link>
      <h1
        data-testid="page-title"
      >
        { pageTitle }
      </h1>
      {!isExplore
        ? (
          <button
            type="button"
            data-testid="search-top-btn"
            onClick={ ableSearch }
            src={ searchIcon }
          >
            <img src={ searchIcon } alt="search" />
          </button>
        ) : (
          <button
            className="hidden"
            type="button"
            data-testid="search-top-btn"
            onClick={ ableSearch }
            src={ searchIcon }
          >
            <img src={ searchIcon } alt="search" />
          </button>
        ) }
      {abledSearch
        && (
          <>
            <br />
            <input
              type="text"
              data-testid="search-input"
              placeholder="buscar"
              value={ searchInput }
              onChange={ (event) => setSearchInput(event.target.value) }
            />

            <br />
            <label htmlFor="Ingrediente">
              <input
                type="radio"
                data-testid="ingredient-search-radio"
                value="Ingrediente"
                name="atributo"
                id="Ingrediente"
                onChange={ (event) => setAtributo(event.target.value) }
              />
              Ingrediente
            </label>

            <label htmlFor="Nome">
              <input
                type="radio"
                data-testid="name-search-radio"
                value="Nome"
                name="atributo"
                id="Nome"
                onChange={ (event) => setAtributo(event.target.value) }
              />
              Nome
            </label>

            <label htmlFor="PrimeiraLetra">
              <input
                type="radio"
                data-testid="first-letter-search-radio"
                value="Primeira Letra"
                name="atributo"
                id="PrimeiraLetra"
                onChange={ (event) => setAtributo(event.target.value) }
              />
              Primeira Letra
            </label>

            <br />
            <button
              className="da-lhe"
              type="button"
              data-testid="exec-search-btn"
              onClick={ handleClick }
            >
              Dá-lhe
            </button>
          </>

        )}
    </header>
  );
}

Header.propTypes = {
  isExplore: PropTypes.bool.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
