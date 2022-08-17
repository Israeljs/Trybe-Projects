import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import Card from './components/Card';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Checkout from './pages/Checkout';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      inputSearch: '',
      idCategories: '',
      productsList: [],
      cartList: [],
    };
    this.renderCategories = this.renderCategories.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onClickCategory = this.onClickCategory.bind(this);
    this.verifyProductList = this.verifyProductList.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.addLocalStorage = this.addLocalStorage.bind(this);
    this.restoreCartList = this.restoreCartList.bind(this);
  }

  componentDidMount() {
    this.renderCategories();
    this.restoreCartList();
  }
  // 2 - input text

  onInputChange({ target }) {
    const targetValue = target.value;
    this.setState({
      inputSearch: targetValue,
    });
  }

  // 2 - radio button
  onClickCategory({ target }) {
    const targetId = target.id;
    this.setState({
      idCategories: targetId,
    }, () => this.renderProducts());
  }

  addToCart({ target }) {
    const { productsList, cartList } = this.state;
    const { id } = target;
    const item = productsList.filter((product) => product.id === id);
    this.setState({
      cartList: [...cartList, ...item],
    }, () => this.addLocalStorage());
  }

  addLocalStorage() {
    const { cartList } = this.state;
    localStorage.setItem('cartLocalStorage', JSON.stringify(cartList));
  }

  restoreCartList() {
    const actualCartList = JSON.parse(localStorage.getItem('cartLocalStorage'));
    if (actualCartList !== null) {
      this.setState({ cartList: actualCartList });
    }
  }

  // 4
  verifyProductList() {
    const { productsList } = this.state;
    if (productsList.length > 0) {
      return (
        <div>
          {
            productsList.map((product) => (
              <div key={ product.id }>
                <Link
                  to={ { pathname: `/productdetails/${product.id}`, state: product } }
                  data-testid="product-detail-link"
                >
                  <Card
                    state={ product }
                  />
                </Link>
                <input
                  id={ product.id }
                  type="button"
                  value="Adicionar item"
                  data-testid="product-add-to-cart"
                  onClick={ this.addToCart }
                />
              </div>
            ))
          }
        </div>
      );
    }
  }

  // 3
  async renderProducts() {
    const { idCategories, inputSearch } = this.state;
    const products = await getProductsFromCategoryAndQuery(idCategories, inputSearch);
    this.setState({
      productsList: products.results,
    });
  }

  // 1
  async renderCategories() {
    const categories = await getCategories();
    this.setState({
      categories: [...categories],
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => (<Home
                { ...props }
                { ...this.state }
                renderCategories={ this.renderCategories }
                renderProducts={ this.renderProducts }
                onInputChange={ this.onInputChange }
                onClickCategory={ this.onClickCategory }
                verifyProductList={ this.verifyProductList }
                addToCart={ this.addToCart }
              />) }
            />
            <Route exact path="/cart" component={ ShoppingCart } />
            <Route
              exact
              path="/productdetails/:id"
              render={ (props) => (<ProductDetails
                { ...props }
                { ...this.state }
                renderCategories={ this.renderCategories }
                renderProducts={ this.renderProducts }
                onInputChange={ this.onInputChange }
                onClickCategory={ this.onClickCategory }
                verifyProductList={ this.verifyProductList }
                addToCart={ this.addToCart }
              />) }
            />
            <Route exact path="/checkout" component={ Checkout } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
