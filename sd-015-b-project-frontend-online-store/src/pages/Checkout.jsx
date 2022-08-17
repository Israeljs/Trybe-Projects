import React from 'react';
import PropTypes from 'prop-types';

export default class Checkout extends React.Component {
  render() {
    const { location: { state } } = this.props;
    return (
      <div>
        {
          state.map((item) => (
            <div key={ item.id }>
              <img src={ item.thumbnail } alt={ item.title } width="50px" />
              <h3>
                { item.title }
              </h3>
              <h3>
                R$
                {' '}
                { item.price }
              </h3>
            </div>
          ))
        }
        <h2>Valor Total</h2>
        <form>
          <input
            type="text"
            data-testid="checkout-fullname"
            placeholder="Nome Completo"
            required="required"
          />
          <input
            type="email"
            data-testid="checkout-email"
            placeholder="Email"
            required="required"
          />
          <input
            type="text"
            data-testid="checkout-cpf"
            placeholder="CPF"
            required="required"
          />
          <input
            type="text"
            data-testid="checkout-phone"
            placeholder="Telefone"
            required="required"
          />
          <input
            type="text"
            data-testid="checkout-cep"
            placeholder="CEP"
            required="required"
          />
          <input
            type="text"
            data-testid="checkout-address"
            placeholder="Endereço"
            required="required"
          />
          <button type="submit">Comprar</button>
        </form>
      </div>

    );
  }
}

Checkout.propTypes = PropTypes.shape({
  title: PropTypes.string,
  price: PropTypes.string,
}).isRequired;
