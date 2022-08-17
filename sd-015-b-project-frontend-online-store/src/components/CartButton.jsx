import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default class CartButton extends React.Component {
  render() {
    const { cartList } = this.props;
    return (
      <div>
        <Link to={ { pathname: '/cart', state: cartList } }>
          <button
            type="button"
            data-testid="shopping-cart-button"
          >
            <AiOutlineShoppingCart />
            <p data-testid="shopping-cart-size">{ cartList.length }</p>
          </button>
        </Link>
      </div>
    );
  }
}

CartButton.propTypes = PropTypes.shape({
  cartList: PropTypes.arrayOf,
}).isRequired;
