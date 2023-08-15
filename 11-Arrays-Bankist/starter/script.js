'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE ( Does not mutate the original array )
console.log(arr.slice(2));
console.log(arr);
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

// SPLICE ( Mutates the original array )
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
console.log(arr.splice(1, 2)); // The second parameter is the number of elements to delete (not position like in slice)
console.log(arr);

// REVERSE ( Mutates the original array )
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2);
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join(' - '));

// AT Method
const arr3 = [23, 11, 64];
console.log(arr3[0]);
console.log(arr3.at(0));
// The AT Method also wok on strings
console.log('sebastian'.at(1)); // e

// Getting the last value of an array
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1));
console.log(arr3.at(-1));

// Looping Arrays: forEach!
// forEach:

const move = [200, 450, -400, 3003, -650, -100, 70, 1300];

for (const [i, movement] of move.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`); // Removing the '-'
  }
}

console.log('--------------- forEach ---------------');

// The first parameter in the callback function for the forEach function is always going to be the element that been looped through the array. So in this case, the first element will correspond to the numbers representing the movements of money (200, 450, etc...)
// The second parameter is always going to be the index for said element
// And the third parameter is going to be the array that we are looping through.
// The names of the parameter doesnt matter at all, but the order is very important as it will always be the same as depicted above.

// forEach method does not accept the break or continue clausules
move.forEach(function (elem, i, arr) {
  if (elem > 0) {
    console.log(`Movement ${i + 1}: You deposited ${elem}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(elem)}`);
  }
});

/////////////////////////////////////////////////////////////////////
// forEach with maps

const curr = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

console.log('--------------- forEach with Maps ---------------');

curr.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// forEach with sets
const currUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currUnique);
currUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
