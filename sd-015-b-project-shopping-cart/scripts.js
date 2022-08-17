const computador = 'sites/MLB/search?q=computador';
const home = 'https://api.mercadolibre.com/';
const specificItem = 'items/';
const cartItemClass = document.querySelector('.cart__items');

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

// function cartItemClickListener(event) {
//   const onclick = event.target;
//   onclick.remove();
// }
function removeProductsFromLocalStorage(index) {
  const productStorage = JSON.parse(localStorage.getItem('item'));
  if (!productStorage) return;
  // console.log(productStorage);
  const newStorage = [];
  productStorage.forEach((item, i) => {
    if (i !== index) newStorage.push(item);
  });
  localStorage.setItem('userCart', JSON.stringify(newStorage));
}

function cartItemClickListener(event) {
  const e = event.target;
  const productIndex = Array.from(cartItemClass.children).indexOf(el);
  // subtractPrice(productIndex);
  removeProductsFromLocalStorage(productIndex);
  e.remove();
}



function removeAllCart() {
  const buttonRemoveAll = document.querySelector('.empty-cart');
  // const cartItems = document.querySelector(cartItemClass);
  buttonRemoveAll.addEventListener('click', () => {
  localStorage.setItem('item',JSON.stringify([]));
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
  const olElement = cartItemClass;
  olElement.append(liElement);
}

async function renderCartSection(cartElement) {
  try {
    const { id, title, price } = await fetchProducts(getCartId(cartElement));
    const itemAttribute = { sku: id, name: title, salePrice: price };
    createCartElement(itemAttribute);
    setLocalstorage(itemAttribute);
  } catch (error) {
    throw new Error(error);
  }
}

function getLocalstorage() {
  return JSON.parse(localStorage.getItem('item')) || [];
}

function setLocalstorage(obj) {
  const itemsValue = getLocalstorage();
  itemsValue.push(obj);

  localStorage.setItem('item', JSON.stringify(itemsValue));
}

function setInitialCart() {
  const ol = cartItemClass;
  const itemsStorages = getLocalstorage();
  if (itemsStorages !== null) {
    itemsStorages.forEach((item) => {
      console.log(item);
    ol.appendChild(createCartItemElement(item));
    });
  }
}

function addCartItem() {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => button.addEventListener('click', async () => {
  await renderCartSection(button.parentElement);
  // setLocalstorage();
  }));
}

const requestsAsincronos = async () => {
  try {
    await renderProductsSection();
    // setInitialCart();
    addCartItem();
    removeAllCart();
  } catch (error) {
    console.log('Erro na função async');
  }
};

window.onload = () => {
  setInitialCart();
  requestsAsincronos();
};