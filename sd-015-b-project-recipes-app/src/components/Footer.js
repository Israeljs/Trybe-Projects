import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="footerContainer" data-testid="footer">
      <Link
        data-testid="drinks-bottom-btn"
        to="/bebidas"
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drink" />
      </Link>
      <Link
        data-testid="explore-bottom-btn"
        to="/explorar"
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="explore" />
      </Link>
      <Link
        data-testid="food-bottom-btn"
        to="/comidas"
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="meal" />
      </Link>

    </footer>

  );
}

export default Footer;
