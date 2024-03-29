const searchGroupProducts = 'https://api.mercadolibre.com/sites/MLB/search?q=';
const searchSpecificProduct = 'https://api.mercadolibre.com/items/';

// Arrow Functions = Funções criadas por mim
// Functions normais = Funções dadas pelo sistema

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;

  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;

  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const getCartCointainer = () => document.querySelector('.cart__items');

const getCartItems = () => document.querySelectorAll('.cart__items li');

const filterIdFromLi = (innerText) => {
  const divideByBar = innerText.split('|');
  const [notTreatedId] = divideByBar;
  const divideByColon = notTreatedId.split(':');
  return divideByColon[1].trim();
};

const getApiData = async (api, product) => {
  const apiProduct = await fetch(api + product);
  const response = await apiProduct.json();

  return (response);
};

const sumProductsPrices = () => {
  const cartItems = getCartItems();
  const priceContainer = document.querySelector('.total-price');
  const sumPrices = [...cartItems].reduce((acc, { innerText }) => {
    const divideByMoney = innerText.split('$');
    const price = divideByMoney[1];
    const numPrice = Number(price);
    // return (acc + numPrice).toFixed(2);
    return (acc + numPrice);
  }, 0);

  priceContainer.innerText = sumPrices;
};

const sendCartIdsToCloud = () => {
  const cartItems = getCartItems();
  const productsIds = [];
  cartItems.forEach(({ innerText }) => {
    const treatedId = filterIdFromLi(innerText);
    productsIds.push(treatedId);
  });
  const stringItems = JSON.stringify(productsIds);
  
  localStorage.setItem('cart-items-ids', stringItems);
};

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.remove();
  sumProductsPrices();
  sendCartIdsToCloud();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const filterInfoToSendToCart = async (textId) => {
  const itemDetails = await getApiData(searchSpecificProduct, textId);
  const { id, title, price } = itemDetails;
  return { sku: id, name: title, salePrice: price };
};

const sendToCart = async (event) => {
  const cartContainer = getCartCointainer();
  const loading = createCustomElement('p', 'loading', 'loading...');
  
  cartContainer.appendChild(loading);

  const listLength = cartContainer.childNodes.length;
  const lastChild = cartContainer.childNodes[listLength - 1];
  const productContainer = event.target.parentNode;
  const textId = getSkuFromProductItem(productContainer);
  const filtredInfo = await filterInfoToSendToCart(textId);

  cartContainer.removeChild(lastChild);

  const cartItem = createCartItemElement(filtredInfo);

  cartContainer.appendChild(cartItem);
  sumProductsPrices();
  sendCartIdsToCloud();
};

const loadCloudCart = () => {
  const stringCloudCart = localStorage.getItem('cart-items-ids');
  if (stringCloudCart) {
    const cartContainer = getCartCointainer();
    const cloudCartIds = JSON.parse(stringCloudCart);
    
    cloudCartIds.forEach(async (productId) => {
      const filtredInfo = await filterInfoToSendToCart(productId);
      const cartItem = createCartItemElement(filtredInfo);
      cartContainer.append(cartItem);
      sumProductsPrices();
    });
  }
};

const getProductsButtons = () => {
  const buttons = document.querySelectorAll('.item__add');

  buttons.forEach((button) => {
    button.addEventListener('click', sendToCart);
  });
};

const appendListItems = async () => {
  const container = document.querySelector('.items');
  const loading = createCustomElement('p', 'loading', 'loading...');
  container.appendChild(loading);
  const research = await getApiData(searchGroupProducts, 'computador');
  container.innerHTML = '';
  console.log(research)
  research.results.forEach(({ id, title, thumbnail }) => {
    const productInfo = { sku: id, name: title, image: thumbnail };

    container.appendChild(createProductItemElement(productInfo));
  });

  getProductsButtons();
};

const cleanCartItems = () => {
  const cleanBtn = document.querySelector('.empty-cart');
  const price = document.querySelector('.total-price');

  cleanBtn.addEventListener('click', () => {
    const cartContainer = getCartCointainer();
    cartContainer.innerHTML = '';
    price.innerText = '0';
    localStorage.clear();
  });
};

window.onload = () => {
  appendListItems();
  cleanCartItems();
  loadCloudCart();
};
