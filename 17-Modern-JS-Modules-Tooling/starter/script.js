// Importing module
// import {
//   addToCart,
//   totalPrice as price,
//   totalQuantity as quan,
// } from './shoppingCart.js';

// addToCart('bread', 5);
// console.log(`price: ${price}, quantity: ${quan}`);

import * as ShoppingCart from './shoppingCart.js';

console.log('Importing moduel');
console.log(ShoppingCart);
ShoppingCart.addToCart('bread', 5);
console.log(ShoppingCart.totalPrice);

// console.log(shippingCost) // Not defined because variables are module scoped if not exported
import add from './shoppingCart.js';
// Importing the default export
