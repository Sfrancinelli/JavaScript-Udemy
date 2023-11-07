// Importing module
// import {
//   addToCart,
//   totalPrice as price,
//   totalQuantity as quan,
// } from './shoppingCart.js';

// addToCart('bread', 5);
// console.log(`price: ${price}, quantity: ${quan}`);

// import * as ShoppingCart from './shoppingCart.js';

// console.log('Importing moduel');
// console.log(ShoppingCart);
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// console.log(shippingCost) // Not defined because variables are module scoped if not exported
// import add from './shoppingCart.js';
// Importing the default export no matter how the default export its called (in this case it doesnt have a name)
// add('pizza', 2);

import add, {
  addToCart,
  totalPrice as price,
  totalQuantity as tq,
  cart,
} from './shoppingCart.js';
add('pizza', 2);
console.log(price);

add('bread', 5);
add('apples', 4);

console.log(cart); // Prove that the import/export its a live connection. The cart was an empty array when exported and now, when logged to the console after adding the objects, it changed.
/*
// Top level await blocks the execution of the rest of the code
// const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
// const data = await res.json();
// console.log(data);

// console.log('Something')

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  // console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost(); // Returns promise

// NOt very clean
lastPost.then(last => console.log(last));

// Consuming the promise with top level await
const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

/*
// The module pattern
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is $${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);
*/

/*
// Exporting in nodeJS ( doesnt work in the web )
export.addToCart = function(product, quantity) {
  cart.push({product, quantity})
  console.log(`${quantity} ${product} added to cart`)
}

// Importing in nodeJS
const {addToCart} = required('./shoppingCart.js')
*/
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

// CLoning nested object with normal js
const stateClone = Object.assign({}, state);
console.log(stateClone);
// Changin the loggedIn to false
state.user.loggedIn = false;
// Loggin the clone and realizing that the loggedIn key is false because both objects point to the same memory heap
console.log(stateClone);

// With lodash clone this doesn't happen
const stateDeepClone = cloneDeep(state);
// Changing it again to true to see the differences
state.user.loggedIn = true;
// The clone with lodash will show that the loggedIn is false
console.log(stateDeepClone);
// The normal js clone will show that its true because its a live copy
console.log(stateClone);

if (module.hot) {
  module.hot.accept();
}

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));

Promise.resolve('TEST').then(x => console.log(x));

// Poliffiling array methods
import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polifilling async functions
import 'regenerator-runtime/runtime';
