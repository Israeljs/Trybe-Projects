import React from 'react';
import PropTypes from 'prop-types';
import CartButton from '../components/CartButton';

export default class Home extends React.Component {
  render() {
    const { categories, onInputChange, onClickCategory,
      renderProducts, verifyProductList, cartList } = this.props;
    return (
      <div>
        <label htmlFor="input-text">
          <input
            onChange={ onInputChange }
            data-testid="query-input"
            type="text"
            id="input-text"
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          onClick={ renderProducts }
        >
          Pesquisar
        </button>
        <h3
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.

        </h3>

        <CartButton cartList={ cartList } />

        <section>
          <ul>
            {categories.map(({ id, name }) => (
              <li key={ id }>
                <label htmlFor={ id }>
                  { name }
                  <input
                    name="category"
                    key={ id }
                    id={ id }
                    value={ name }
                    type="radio"
                    onClick={ onClickCategory }
                    data-testid="category"
                  />
                </label>
              </li>
            ))}
          </ul>
        </section>
        { verifyProductList() }
      </div>
    );
  }
}

Home.propTypes = PropTypes.shape({
  categories: PropTypes.arrayOf,
  cartList: PropTypes.arrayOf,
  onInputChange: PropTypes.func,
  onClickCategory: PropTypes.func,
  renderProducts: PropTypes.func,
  verifyProductList: PropTypes.func,
}).isRequired;
