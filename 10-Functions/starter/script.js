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

//////////////////////////////////////////////////////////////////////////////////////////////
// Call method!

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, nombre) {
    console.log(
      `${nombre} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, nombre });
  },
};

lufthansa.book(239, 'Sebastián Francinelli');
lufthansa.book(635, 'john Smith');
console.log(lufthansa);

const book = lufthansa.book;

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
  book: book,
};

eurowings.book(23, 'Sarah');

// book(23, 'Sarah');

// Using the call method we can specify what will be the value of the this keyword. The first parameter of the call method is the reference for the this keyword, in this case, eurowings.
book.call(eurowings, 23, 'Sarah Williams');

book.call(lufthansa, 45, 'SF');

console.log(eurowings);
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Airline',
  iataCode: 'SS',
  bookings: [],
};

book.call(swiss, 45, 'SGF');

// The aplly method is basically the same as the call method but instead, it receives the arguments for the function called in the way of an array:
book.apply(swiss, [657, 'SG']);
const flightData = [657, 'SG'];
// The aplly method is really not very usefull and used in modern js. We can do the same using the spread operator:
book.call(swiss, ...flightData);

//////////////////////////////////////////////////////////////////////////////////////
// Bind method
// The bind method allows us to specify the this keyword just like call and apply but with one major difference.
// This method doesnt call the functon instantly. It returns a new function where the this keyword specified is bind!
const eurowingsBook = book.bind(eurowings);
const bookLh = book.bind(lufthansa);
const bookSS = book.bind(swiss);

eurowingsBook(234, 'Steven Williams');

// We can also specify a given parameter and it will stay the same every time we call this new function. For example, we could specify a function with a given this keyword, so, in this case, for a given airline and we could also set a flight number to be always the same:
const bookEW23 = book.bind(eurowings, 23);

bookEW23('SF');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

// If the this keyword is not specified via the bind method on an EventListener, the this keyword will always point to the object that is calling the function (in this case, the 'Buy new plane' button on the document).
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
// Partial application refers to the preapplication of parameters

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// this two are the same thing, but the above one is using partial application (best practice)
const addVAT = addTax.bind(null, 0.23);
// const addVAT = value => value + value * 0.23;

console.log(addVAT(200));

const tax = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

console.log(tax(0.1)(200));

const addVAT2 = tax(0.23);

console.log(addVAT2(200));
