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

/*
Let's build a simple poll app! 
A poll has a question, an array of options from which people can choose, and an 
array with the number of replies for each option. This data is stored in the starter 
'poll' object below. 
Your tasks: 
1. Create a method called 'registerNewAnswer' on the 'poll' object. The 
method does 2 things: 
1.1. Display a prompt window for the user to input the number of the 
selected option. The prompt should look like this: 
What is your favourite programming language? 
0: JavaScript 
1: Python 
2: Rust 
3: C++ 
(Write option number) 
1.2. Based on the input number, update the 'answers' array property. For 
example, if the option is 3, increase the value at position 3 of the array by 
1. Make sure to check if the input is a number and if the number makes 
sense (e.g. answer 52 wouldn't make sense, right?) 
2. Call this method whenever the user clicks the "Answer poll" button.

3. Create a method 'displayResults' which displays the poll results. The 
method takes a string as an input (called 'type'), which can be either 'string' 
or 'array'. If type is 'array', simply display the results array as it is, using 
console.log(). This should be the default option. If type is 'string', display a 
string like "Poll results are 13, 2, 4, 1".  

4. Run the 'displayResults' method at the end of each 
'registerNewAnswer' method call. 

5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test 
data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll 
object! So what should the this keyword look like in this situation? 
 
 
The Complete JavaScript Course 21 
Test data for bonus:  
§ Data 1: [5, 2, 3] 
§ Data 2: [1, 5, 3, 9, 6, 1] 
Hints: Use many of the tools you learned about in this and the last section 😉 
 
GOOD LUCK 😀 
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3:  C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const input = Number(
      prompt(
        'What is your favourite programming language?\n0: JavaScript\n1: Python\n2: Rust\n3: C++\n(Write option number)'
      )
    );
    console.log(input);
    if (input <= 3 && input >= 0) this.answers[input]++;
    else alert('Please answer with a proper number');
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    return type === 'array'
      ? console.log(this.answers)
      : console.log(`Poll results are ${this.answers.join(', ')}`);
    // console.log(`Poll results are ${this.answers[0]}, ${this.answers[1]}, ${this.answers[2]}, ${this.answers[3]}`)
  },
};

const answerBtn = document.querySelector('.poll');
answerBtn.addEventListener('click', poll.registerNewAnswer.bind(poll));

// Manually setting this keyword to be the bonus data array
// Test data for bonus:
// § Data 1: [5, 2, 3]
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');

///////////////////////////////////////////////////////////////
// Immediatly Invoked Function Expressions (IIFE) or functions that only run once an then 'dissapear'

(function () {
  console.log('This will never run again');
})();

(() => console.log('This will ALSO never run again'))();

///////////////////////////////////////////////////////////////////
// CLOSURES!
// CLosures are not features that we explicitly use. We don't create em explicitly.
// Closures happen automaticly in certein situations

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// A closure makes a function remember all the variables that were there when the function was created in the first time. The function can 'remember' the variables that were there even when the function is no longer running in the call stack.

// Any function always has access to the variable enviroment of the execution context in which the function was created. !!!!
// That conection beetween the variable enviroment in which the function was born and the function later is whats called CLOSURE.
// Closure: Variable Enviroment attached to the function, exactly as it was at the time and place the function was created.
const booker = secureBooking();
// The booker function has acces the the passengerCount variable beacuse its actually defined in the variable enviroment in which this function was created. So it will always have access to said variable and that conection its whats called CLOSURE.
// The scope chain its actually preserver in the CLOSURE

booker();
booker();
booker();

// Closure definitions:
// A Closure is the closed.over vairable environment of the execution context in which a function was created, even after that execution context is gone
// A closure gives a function access to all the variables of its parent function, even after that parent function has returned. The function keeps a reference to its outer scopre, which preserves the scope chain throughout time.
// A closure makes sure that a function doest loose connection to variables that existed at the functions birth place
// A closure is like a backpack that a function carries around wherever it goes. THis backpack hass all the variables that were present in the environment where the function was created.

// We do NOT have to manually create closures, this is a JavaScript feature that happens automatically. We cant even access closed-over variables explicitly. A closure is NOT a tangible JavaScript object.

// However, we can look at the closure of a givent function using this command:
console.dir(booker);

// More examples on closures
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f();
console.dir(f);

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

// Re-assigning 'f' function
h();
f();
console.dir(f);

// Another example
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

// Proof that closures have priority over scope. If it wasnt for the closure, it would use the perGroup from below.
const perGroup = 1000;

boardPassengers(180, 2);

/*
Coding Challenge #2 
This is more of a thinking challenge than a coding challenge 🤓 
Your tasks: 
1. Take the IIFE below and at the end of the function, attach an event listener that 
changes the color of the selected h1 element ('header') to blue, each time 
the body element is clicked. Do not select the h1 element again! 
2. And now explain to yourself (or someone around you) why this worked! Take all 
the time you need. Think about when exactly the callback function is executed, 
and what that means for the variables involved in this example. 
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
