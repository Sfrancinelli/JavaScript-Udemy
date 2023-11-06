// Exporting module
console.log('Exporting module');

// Blocking code
// The code in script js will need to await for the promise to be fullfilled as we are using top level await and its blocking the code in this script but also on the script that imports it
console.log('Start fetching users');
// const res = await fetch('https://jsonplaceholder.typicode.com/users');
// const data = await res.json();
// console.log(data);
console.log('Finished fetching users');

const shippingCost = 10;
export const cart = [];

// Exports need to happen on top level code (cant export on block scope)
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}
