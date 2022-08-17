import React from 'react';
import PropTypes from 'prop-types';
import CartButton from '../components/CartButton';

export default class ProductDetails extends React.Component {
  render() {
    const { location: { state:
      { title, thumbnail, price, id, shipping } }, addToCart, cartList } = this.props;
    return (
      <div data-testid="product">
        <CartButton cartList={ cartList } />
        <h3 data-testid="product-detail-name">
          { title }
        </h3>
        <img src={ thumbnail } alt={ title } />
        <h2>
          R$
          {' '}
          { price }
        </h2>
        { shipping.free_shipping && <p data-testid="free-shipping">Frete Grátis</p>}
        <input
          id={ id }
          type="button"
          value="Adicionar item"
          data-testid="product-detail-add-to-cart"
          onClick={ addToCart }
        />
        <form>
          <label htmlFor="email">
            Email
            <input type="email" />
          </label>
          <label htmlFor="score" required>
            <input name="score" type="radio" value={ 1 } />
            1
            <input name="score" type="radio" value={ 2 } />
            2
            <input name="score" type="radio" value={ 3 } />
            3
            <input name="score" type="radio" value={ 4 } />
            4
            <input name="score" type="radio" value={ 5 } />
            5
          </label>
          <textarea
            data-testid="product-detail-evaluation"
            id=""
            cols="30"
            rows="10"
            placeholder="Mensagem (opcional)"
          />
          <button type="button">Avaliar</button>
        </form>
      </div>
    );
  }
}

ProductDetails.propTypes = PropTypes.shape({
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.string,
}).isRequired;
