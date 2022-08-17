import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomMeal } from '../services/fetchAPI';

function ExplorarComidas() {
  const [randomMeal, setRandomMeal] = useState([]);

  useEffect(() => {
    fetchRandomMeal().then((response) => setRandomMeal(response.meals[0].idMeal));
  }, []);

  return (
    <div className="explorerContainer">
      <Header pageTitle="Explorar Comidas" isExplore />
      <div className="explorerContent">
        <Link to="/explorar/comidas/ingredientes">
          <button data-testid="explore-by-ingredient" type="button">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button data-testid="explore-by-area" type="button">
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${randomMeal}` }>
          <button data-testid="explore-surprise" type="button">
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
