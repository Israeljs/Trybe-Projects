import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ItemCart from '../components/ItemCart';

export default class ShoppingCart extends React.Component {
  render() {
    const { location: { state } } = this.props;
    const shoppingCartList = state;
    return (
      <div>
        <Link to={ { pathname: '/checkout', state: shoppingCartList } }>
          <button
            type="button"
            data-testid="checkout-products"
          >
            Finalizar
          </button>
        </Link>
        <h3 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h3>
        {
          shoppingCartList.map((item) => (
            <ItemCart item={ item } key={ item.id } />
          ))
        }
      </div>
    );
  }
}

ShoppingCart.propTypes = PropTypes.shape({
  location: PropTypes.objectOf,
  state: PropTypes.objectOf,
}).isRequired;
