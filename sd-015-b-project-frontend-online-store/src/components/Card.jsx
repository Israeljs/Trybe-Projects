import React from 'react';
import PropTypes from 'prop-types';

export default class Card extends React.Component {
  render() {
    const { state: { title, thumbnail, price, id, shipping } } = this.props;
    return (
      <div data-testid="product">
        <h3>
          { title }
        </h3>
        <h4>{ id }</h4>
        <img src={ thumbnail } alt={ title } />
        <h2>
          R$
          {' '}
          { price }
        </h2>
        { shipping.free_shipping && <p data-testid="free-shipping">Frete Grátis</p>}
      </div>
    );
  }
}

Card.propTypes = PropTypes.shape({
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.string,
}).isRequired;
