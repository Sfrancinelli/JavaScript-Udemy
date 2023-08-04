'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // orderDelivery: function (obj) {
  //   console.log(obj);
  // },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order reveived! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient, otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

///////////////////////////7
// Spreand operator (...) (So usefull)
// SPREAND BECAUSE ON RIGHT SIDE!! GO TO LINE 200 TO SEE REST (on the left)

// The SPREAD OPERATOR is use where we would otherwise write values
// separated by a comma
/*
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// Spread operator to do the above but fine
const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menu);

// Iterables: arrays, strings, maps , sets. NOT objects

const str = 'Jonas';
const srtArr = [...str, '', 'S.'];
console.log(srtArr);

// Real world example
/*
const ingredients = [
  prompt("Let's make mpasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);
*/
/*
// Objects and spread operator (ES2018)
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/

/*
//////////////////////////////////////
// Destructuring Objects
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 0,
});

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// Changing the name of the variable that contains the same value from the object
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);
*/
/*
////////////////////////////////
// Destructuring Arrays
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);

let [first, second] = restaurant.categories;
console.log(first, second);

const [, , three, fourth] = restaurant.categories;
console.log(three, fourth);

// Changing the order of first and second for each other
const temp = first;
first = second;
second = temp;
console.log(first, second);

// Doing the same with deestructuring
[first, second] = [second, first];
console.log(first, second);

console.log(restaurant.order(2, 0));

// Receive 2 return values from a function
const [starter, main] = restaurant.order(2, 0);
console.log(starter, main);

// Nested deestructuring
const nested = [2, 4, [5, 6]];
const [nest1, nest2, nest56] = nested;
const [five, six] = nest56;
console.log(nest1, nest2, nest56, five, six);

// or, to the the above in one step:
const [i, j, [k, l]] = nested;
// Deestructuring inside a deestructuring
console.log(i, j, k, l);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
// If we dont default the values, the r value will ve undefined cause theres nothing on the index "2"
console.log(p, q, r);
*/

// REST SINTAX (...) on the left of the assign operator
// The REST operator
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// The rest operator needs to be the last one cause it will acumulate all the
// Values that have been left behind. It can only be one rest operator

// The REST OPERATOR is used where we otherwise would write variables
// separated by a commma

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays);

// Functions
// REST ARGUMENTS
const add = function (...numbers) {
  console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
  return sum;
};
add(2, 3);
add(2, 4, 6, 7, 8, 9, 4, 3, 2, 1);

const numbers = [23, 5, 7, 8];
add(...numbers);

restaurant.orderPizza(
  'Mozzarella',
  'Mushrooms',
  'Cipolla',
  'Olives',
  'Sinach',
  'Ham'
);

restaurant.orderPizza('Mozzarella');

console.log('-------OR-------');
// Logical operator can use ANY data type, return ANY data type, short-circuiting
// The OR operator shortcircuits when it meets the first thruthy value
console.log(3 || 'Jonas');
console.log(false || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('-------AND-------');
// The OR operator shortcircuits when it meets the first falsy value
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log('Hello' && 23 && null && 'jonas');

if (restaurant.orderPizza) {
  restaurant.orderPizza('Mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('Mushrooms', 'spinach');

console.log('-------Nullish coalescing operator-------');
// Nullish values = null && undefined (NOT 0 or '')
// The OR operator shortcircuits when it meets the first thruthy value
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

console.log('------------------------------------');

const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// console.log(rest1.numGuests, rest2.numGuests);

// OR assignment operator
// Same as above but in a more concise way with the OR asignment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// Nullish assignment operator (null or undefined)
// rest1.numGuests ??= 10;
// rest2.numGuests ??= 10;

// rest2.owner = rest2.owner && '<ANONYMOUS>';
// rest1.owner = rest1.owner && '<ANONYMOUS>';

// rest1.owner &&= '<ANONYMOUS>';
// rest2.owner &&= '<ANONYMOUS>';

// console.log(rest1, rest2);

// CODING CHALLENGE #1
/*
We're building a football betting app (soccer for my American friends 😅)! 
Suppose we get data from a web service about a certain game ('game' variable on 
next page). In this challenge we're gonna work with that data. 
Your tasks: 
1. Create one player array for each team (variables 'players1' and 
'players2') 
2. The first player in any player array is the goalkeeper and the others are field 
players. For Bayern Munich (team 1) create one variable ('gk') with the 
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 
field players 
3. Create an array 'allPlayers' containing all players of both teams (22 
players) 
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a 
new array ('players1Final') containing all the original team1 players plus 
'Thiago', 'Coutinho' and 'Perisic' 
5. Based on the game.odds object, create one variable for each odd (called 
'team1', 'draw' and 'team2') 
6. Write a function ('printGoals') that receives an arbitrary number of player 
names (not an array) and prints each of them to the console, along with the 
number of goals that were scored in total (number of player names passed in) 
7. The team with the lower odd is more likely to win. Print to the console which 
team is more likely to win, without using an if/else statement or the ternary 
operator.
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
const [players1, players2] = game.players;
console.log(players1, '---', players2);

// 2.
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5.
// Doing it from the complete game object and deestructuring from nested
const {
  odds: { team1: team1, x: draw, team2: team2 },
} = game;

// Doing it from the odds property of the game object, so no nested deestructuring
// const { team1: team1, x: draw, team2: team2 } = game.odds;
console.log(team1, draw, team2);

// 6.
const printGoals = function (...players) {
  for (let i = 0; i < players.length; i++) {
    console.log(players[i]);
  }
  console.log(`A total of ${players.length} goals were scored`);
};

// printGoals(...allPlayers);

// 7.
team1 < team2 && console.log('Team 1 is more likely to win!');
team2 < team1 && console.log('Team 2 is more likely to win!');
console.log(team2 && draw && team1);
