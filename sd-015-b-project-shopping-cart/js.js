const computador = 'sites/MLB/search?q=computador';
const home = 'https://api.mercadolibre.com/';
const specificItem = 'items/';
const cartItemClass = '.cart__items';

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

function cartItemClickListener(event) {
  const cart = getLocalstorage();
  const onclick = event.target;
  const id = onclick.innerText.slice(5, 18);

  const newCart = [...cart];
  // console.log(newCart);

  newCart.filter((item) => item.includes(id));
 
  if (newCart.length >= 2) newCart.shift();
  const includeId = newCart;
  console.log(includeId);

  const excludeId = cart.filter((item) => !item.includes(id));
  console.log(excludeId);
  const updatedCart = [...includeId, ...excludeId]

  onclick.remove();
  localStorage.setItem('item', JSON.stringify(updatedCart));
}


// function cartItemClickListener(event) {
//   const cart = getLocalstorage();
//   const onclick = event.target;
//   const id = onclick.innerText.slice(5, 18);

//   const updatedCart = cart.filter((item) => !item.includes(id));

//   onclick.remove();
//   localStorage.setItem('item', JSON.stringify(updatedCart));
// }


function removeAllCart() {
  const buttonRemoveAll = document.querySelector('.empty-cart');
  const cartItems = document.querySelector(cartItemClass);
  buttonRemoveAll.addEventListener('click', () => {
  cartItems.innerHTML = '';
  localStorage.clear();
  });
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function fetchProducts(pc) {
  try {
    const response = await fetch(`${home}${pc}`);
    const products = await response.json();
    return products;  
  } catch (error) {
    throw new Error(error);
  }
}

function creatProducts(param) {
  param.results.forEach(({ id, thumbnail, title }) => {
    const itemsObjects = { sku: id, name: title, image: thumbnail };
    const productSection = document.querySelector('.items');
    const itemElement = createProductItemElement(itemsObjects);
    productSection.appendChild(itemElement);
  });
}

async function renderProductsSection() {
  try {
    const items = await fetchProducts(computador);
    creatProducts(items);
  } catch (error) {
    throw new Error(error);
  }
}

// cart item

function getCartId(param) {
  const cartElementId = getSkuFromProductItem(param);
  const element = `${specificItem}${cartElementId}`;
  return element;
}

function createCartElement(params) {
  const liElement = createCartItemElement(params);
  const olElement = document.querySelector(cartItemClass);
  olElement.append(liElement);
}

async function renderCartSection(cartElement) {
  try {
    const { id, title, price } = await fetchProducts(getCartId(cartElement));
    const itemAttribute = { sku: id, name: title, salePrice: price };
    createCartElement(itemAttribute);
  } catch (error) {
    throw new Error(error);
  }
}

// setting localStorage

function getLocalstorage() {
  return JSON.parse(localStorage.getItem('item')) || [];
}

function setLocalstorage() {
  const itemsValue = getLocalstorage();
  const itemsStorages = document.querySelectorAll('.cart__item');
  // console.log(itemsStorages);
  itemsStorages.forEach((item) => {
  // console.log(item);
  localStorage.setItem('item', JSON.stringify([...itemsValue, item.innerText]));
  });
}

function createInincialCartItem(innerText) { //
  const lis = document.createElement('li');
  lis.className = 'cart__item';
  lis.innerText = innerText;
  const ol = document.querySelector(cartItemClass);
  lis.addEventListener('click', cartItemClickListener);
  ol.append(lis);
}

function setInitialCart() {
  const itemsStorages = getLocalstorage();
  if (itemsStorages !== null) {
    itemsStorages.forEach((item) => {
      // console.log(item);
    createInincialCartItem(item);
    });
  }
}

function addCartItem() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', async () => {
  await renderCartSection(button.parentElement);
  setLocalstorage();
  }));
}

const requestsAsincronos = async () => {
  try {
    await renderProductsSection();
    setInitialCart();
    addCartItem();
    removeAllCart();
  } catch (error) {
    console.log('Erro na função async');
  }
};

window.onload = () => {
  requestsAsincronos();
};

// function createProductImageElement(imageSource) {
//     const img = document.createElement('img');
//     img.className = 'item__image';
//     img.src = imageSource;
//     return img;
//   }
  
//   function createCustomElement(element, className, innerText) {
//     const e = document.createElement(element);
//     e.className = className;
//     e.innerText = innerText;
//     return e;
//   }
  
//   function createProductItemElement({ sku, name, image }) {
//     const section = document.createElement('section');
//     section.className = 'item';
//     section.appendChild(createCustomElement('span', 'item__sku', sku));
//     section.appendChild(createCustomElement('span', 'item__title', name));
//     section.appendChild(createProductImageElement(image));
//     section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
//     return section;
//   }
  
//   function getSkuFromProductItem(card) {
//     return card.querySelector('span.item__sku').innerText;
//   }
  
//   function cartItemClickListener(event) {
//     const onclick = event.target;
//     onclick.remove();
//   }
  
//   function removeAllCart() {
//     const buttonRemoveAll = document.querySelector('.empty-cart');
//     const cartItems = document.querySelector('.cart__items');
//     buttonRemoveAll.addEventListener('click', () => {
//       cartItems.innerHTML = '';
//     });
//   }
  
//   function createCartItemElement({ sku, name, salePrice }) {
//     const li = document.createElement('li');
//     li.className = 'cart__item';
//     li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
//     li.addEventListener('click', cartItemClickListener);
//     return li;
//   }
  
//   function loading() {
//     const section = document.querySelector('.container');
//     const spanLoading = createCustomElement('span', 'loading', 'Loading...');
//     section.appendChild(spanLoading);
//   }
  
//   function load() {
//     const spanLoad = document.querySelector('.loading');
//     spanLoad.remove();
//   }
  
//   async function fetchProducts() {
//     const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
//     const products = await response.json();
//     load();
//     return products;
//   }
  
//   async function requestProduct() {
//     try {
//       const items = await fetchProducts();
//       // load();
//       items.results.forEach(({ id, thumbnail, title }) => {
//         const itensObjects = { sku: id, name: title, image: thumbnail };
//         const classItems = document.querySelector('.items');
//         const element = createProductItemElement(itensObjects);
//         classItems.appendChild(element);
//       });
//     } catch (error) {
//       console.log('Error requestProduct');
//     }
//   }
  
//   function getLocalstorage() {
//     return JSON.parse(localStorage.getItem('item'));
//   }
  
//   function setLocalstorage(params) {
//     const valor = getLocalstorage() || [];
//     localStorage.setItem('item', JSON.stringify([...valor, params]));
//     console.log(valor);
//     // console.log(valor);
//   }
  
//   function createElement(params) {
//     const liElement = createCartItemElement(params);
//     const olElement = document.querySelector('.cart__items');
//     olElement.append(liElement);
//   }
  
//   async function fetchCartProduct(objectCard) {
//     const itemID = getSkuFromProductItem(objectCard);
//     const response = await fetch(`https://api.mercadolibre.com/items/${itemID}`);
//     const result = await response.json();
//     // console.log(result);
//     return result;
//   }
  
//   async function requestCartProduct(objectCard) {
//     const { id, title, price } = await fetchCartProduct(objectCard);
//     const itemsObject = { sku: id, name: title, salePrice: price };
//     createElement(itemsObject);
//     setLocalstorage(itemsObject);
//   }
  
//   function cardButton() {
//     const buttons = document.querySelectorAll('.item__add');
//     buttons.forEach((but) => but.addEventListener('click', () => {
//     requestCartProduct(but.parentElement);
//     }));
//   }
  
//   function setInitialCart() {
//     const itemsStorages = getLocalstorage();
//     if (itemsStorages !== null) itemsStorages.forEach((item) => createElement(item));
//   }
  
//   const requestsAsincronos = async () => {
//     try {
//       await requestProduct();
//       cardButton();
//       await requestCartProduct();
//     } catch (error) {
//       console.log('Erro na função async');
//     }
//   };
  
//   window.onload = () => { 
//     loading();
//     requestsAsincronos();
//     // load();
//     setInitialCart();
//     removeAllCart();
//   };  