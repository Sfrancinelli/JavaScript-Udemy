'use strict';

/*
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5 way to create default parameters
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 5);
createBooking('LH123', 2);

createBooking('LH123', 2, 800);
*/
/*
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 2345254323,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 2345254323) {
    alert('Check in');
  } else {
    alert('Wrong passport!');
  }
};

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000000);
};

newPassport(jonas);
console.log(jonas);
checkIn(flight, jonas);
*/

/////////////////////////////////////////////////////////////////////////////
// functions that take other functions as parameters

const oneWord = function (str) {
  return str.toLowerCase().replaceAll(' ', '');
};

const upperFirstWord = function (str) {
  const [firstWord, ...others] = str.split(' ');
  return [firstWord.toUpperCase(), ...others].join(' ');
};

console.log(
  oneWord('Hola Como estas todo BIEN?'),
  upperFirstWord('Sebastian Francinelli Un capo')
);

// Higher-order function (it takes a function as an argument)
const transformer = function (str, fn) {
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}()`);
};

// The argument functions are named callback functions cause we dont call em ourselves, we let js call em
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

const high5 = function () {
  console.log('🖐️');
};

document.body.addEventListener('click', high5);

// Higher order functions are good for higher levels of abtraction in the code. For example, the transformer function doesnt really care about how the string will be transformed. It only wants to transform the string and it will do so by receiving propper parameters

function calculator(fn, ...numbers) {
  return fn(...numbers);
}

function add(...numbers) {
  let sum = 0;
  for (let n of numbers) sum += n;
  return sum;
}

function substract(...numbers) {
  let less = 0;
  for (let n of numbers) less -= n;
  return less;
}

console.log(calculator(add, 10, 9, 8, 7, 5, 2, 6, 4));

////////////////////////////////////////////////////////////////////////////
// functions that return other functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');

greeterHey('Sebastian');
greeterHey('Steven');

greet('Hello')('Jonas');

// Doing the same but with arrow functions
const greetings = greeting => {
  return name => console.log(`${greeting} ${name}`);
};

greetings('Hello')('SF');
