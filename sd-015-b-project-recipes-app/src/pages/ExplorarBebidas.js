import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchRandomDrink } from '../services/fetchAPI';

function ExplorarBebidas() {
  const [randomDrink, setRandomDrink] = useState([]);

  useEffect(() => {
    fetchRandomDrink().then((response) => setRandomDrink(response.drinks[0].idDrink));
  }, []);

  return (
    <div className="explorerContainer">
      <Header pageTitle="Explorar Bebidas" isExplore />
      <div className="explorerContent">
        <Link to="/explorar/bebidas/ingredientes">
          <button data-testid="explore-by-ingredient" type="button">
            Por Ingredientes
          </button>
        </Link>

        <Link to={ `/bebidas/${randomDrink}` }>
          <button data-testid="explore-surprise" type="button">
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
