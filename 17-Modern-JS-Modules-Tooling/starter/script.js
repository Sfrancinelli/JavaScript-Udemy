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
// // Importing the default export no matter how the default export its called (in this case it doesnt have a name)
// add('pizza', 2);

/*
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
