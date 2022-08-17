import React from 'react';
import PropTypes from 'prop-types';

export default class ItemCart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      disabled: false,
    };
    this.changeQuantityIncrease = this.changeQuantityIncrease.bind(this);
    this.changeQuantityDecrease = this.changeQuantityDecrease.bind(this);
    this.disabledButton = this.disabledButton.bind(this);
  }

  disabledButton() {
    const { item } = this.props;
    const { quantity } = this.state;
    if (quantity === item.available_quantity) {
      this.setState({
        disabled: true,
      });
    } else {
      this.setState({
        disabled: false,
      });
    }
  }

  changeQuantityIncrease() {
    const { item } = this.props;
    const { quantity } = this.state;
    if (quantity < item.available_quantity) {
      this.setState((prevState) => ({
        quantity: prevState.quantity + 1,
      }), () => this.disabledButton());
    }
  }

  changeQuantityDecrease() {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState((prevState) => ({
        quantity: prevState.quantity - 1,
      }), () => this.disabledButton());
    }
  }

  render() {
    const { item } = this.props;
    const { quantity, disabled } = this.state;

    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">
          { item.title }
        </h3>
        <h4>{ item.id }</h4>
        <img src={ item.thumbnail } alt={ item.title } />
        <h2>
          R$
          {' '}
          { item.price }
        </h2>
        <button
          onClick={ this.changeQuantityDecrease }
          type="button"
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <p data-testid="shopping-cart-product-quantity">{quantity}</p>
        <button
          onClick={ this.changeQuantityIncrease }
          type="button"
          data-testid="product-increase-quantity"
          disabled={ disabled }
        >
          +
        </button>
      </div>
    );
  }
}

ItemCart.propTypes = PropTypes.shape({
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.string,
}).isRequired;
