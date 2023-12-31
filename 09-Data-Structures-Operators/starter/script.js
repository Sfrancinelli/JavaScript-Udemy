'use strict';

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

///////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////
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

/*
////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////
// Logical operators
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
*/

////////////////////////////////////////////////////////////////
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

/*
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
*/

/*
///////////////////////////////////////////////////////(////////)
// For-Of Loop!
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const items of menu) console.log(items);

// To get index from for of loop
for (const items of menu.entries()) {
  // console.log(items);
  console.log(`${items[0] + 1}: ${items[1]}`);
}

// Doing the same as above but deestructuring the items array before initializing
for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

console.log(menu.entries());
console.log([...menu.entries()]);
*/

/*
/////////////////////////////////////////////////////////////
// Enhanced Object Literals
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// We can now compute the variable names to
// Pre ES6 we could only compute the values. Now we can compute also the
// vairable names as seen below
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 13,
    close: 23,
  },
  sat: {
    open: 0,
    close: 24,
  },
};

const restaurant2 = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // Before:
  // openingHours: openingHours,
  // ES6 Enhanced Object Literals
  openingHours,

  // before:
  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },
  // ES6 Enhanced Object Literals
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

console.log(restaurant2);

/////////////////////////////////////////////////////////////////
// Optional Chaining (?.) ES2020
// The Optional Chaining checks if the thing of the left exists.
// If it doesnt exists, it returns undefined, otherwise, it returns the value
// Because it returns value if the thing on its lefts does not exists, its always used with the Nullish Coalescent Operator to return something if its undefined
console.log(restaurant2.openingHours.mon); // undefined
// console.log(restaurant2.openingHours.mon.open); // error cause you cant call a method from 'undefined'

// WITH Optional Chaining
console.log(restaurant2.openingHours.mon?.open); // undefined. It avoids the error thanks to the optional chaining

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  // Using OPTIONAL CHAINING and the NULLISH COALESCING OPERATOR
  // To form a sentence according to dinamic values
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Optional chaining on methods:
console.log(restaurant.order?.(0, 1) ?? 'Method does not exists');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exists');

// Optional chaining on Arrays:
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
console.log(users[0]?.name ?? 'User array empty');
console.log(users[1]?.name ?? 'User array empty');

// Doing the same as above but with an if/else statement
if (users.length > 0) console.log(users[0].name);
else console.log('User array empty');

////////////////////////////////////////////////////
// Looping objects keys

// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

console.log(`We are open on ${properties.length} days`);

let openStr = `We are open on ${properties.length} days: `;

for (const day of Object.keys(openingHours)) {
  console.log(day);
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
console.log(entries);

for (const x of entries) {
  console.log(x);
}

for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
*/

///////////////////////////////////////////////////////////////7
// Coding Challenge #2

/*
1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandoski")
2. Use a loop to calculate the average odd and log it to the console
3. Print the 3 odds to the console but in a nice formatted way, exacltly like this:
      Odd od victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd od victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, dont hardcode them (except for 'draw'). HINT: Note how the odds and the game objects have the same property names

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby:1,
        Hummels:1,
        Lewandoski:2,
        etc.
      }
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

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandoski")

const properties = Object.keys(game);
const values = Object.values(game);
const entries = Object.entries(game);
console.log(entries);

const valueScored = Object.values(game['scored']);
console.log(Object.keys(valueScored));
console.log(valueScored);

const entriesScored = Object.entries(game['scored']);

for (const [key, player] of entriesScored) {
  console.log(`Goal ${Number(key) + 1}: ${player}`);
}

// 2. Use a loop to calculate the average odd and log it to the console

const oddsValues = Object.values(game['odds']);
console.log(oddsValues);

let sum = 0;
for (let num of oddsValues) {
  sum += num;
}
sum /= oddsValues.length;
console.log(sum);

/* 3. Print the 3 odds to the console but in a nice formatted way, exacltly like this:
      Odd od victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd od victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, dont hardcode them (except for 'draw'). HINT: Note how the odds and the game objects have the same property names */

const oddsEntries = Object.entries(game['odds']);
console.log(oddsEntries);

console.log(game[oddsEntries[0][0]]);

for (const [team, odd] of oddsEntries) {
  // console.log(team, odd);
  console.log(
    `Odd of${game[team] !== undefined ? ' victory' : ''} ${
      game[team] ?? 'draw'
    }: ${odd}`
  );
}

/* BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby:1,
        Hummels:1,
        Lewandoski:2,
        etc.
      } */

const scorers = {};

for (let x of game.scored) {
  console.log(x);
  scorers[x]++ || (scorers[x] = 1);
}

console.log(scorers);

//////////////////////////////////////////////////////////////
// SETS.
const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Rissoto',
  'Pasta',
  'Pizza',
]);

// All the duplicates will be gone. Sets are iterable, its elements are unique
console.log(orderSet);

console.log(new Set('Jonas'));

console.log(orderSet.size);
console.log(orderSet.has('Pizza'));
console.log(orderSet.has('Bread'));

// const arr = [1, 2, 3, 4, 5, 6, 7];
// console.log(arr.includes(8));
// console.log(arr.includes(5));

orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
// Only 1 garlic bread added (no duplicates allowrd)
console.log(orderSet);

orderSet.delete('Rissoto');
console.log(orderSet);

// orderSet.clear(); Cleans all the set
console.log(orderSet);

for (const order of orderSet) console.log(order);

// The sets are usually used to remove duplicate values from arrays
// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Managed', 'Chef', 'Waiter'];
// How many different positions are on this restaurant?

// const staffUnique = new Set(staff);
// console.log(staffUnique);

// We can create an array using the spread operator with a set:
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
// And now this new array ('StaffUnique') has the non duplicate values from the original
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Managed', 'Chef', 'Waiter']).size
);

console.log(new Set('SebastianFrancinelli').size);

/////////////////////////////////////////////////////////////////
// MAPS
// The keys on the maps can be almost anyting, even other maps
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');
// The set method also return the map itself:
console.log(rest.set(3, 'Paris, France'));
// The return from the set method allows us to chain sets to assing multiple key / values:
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(rest.get('name'));
console.log(rest.get(true));

const time = 21;
// Using a comparison to get either true or false and from that, map the value
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
// The result of this would be rest.get(true) witch maps to 'We are open' as seen on line 774

console.log(rest.has('categories'));
rest.delete(3);
console.log(rest);
console.log(rest.size);
// rest.clear()

// Setting an array as the key:
rest.set([1, 2], 'Test');
console.log(rest);

console.log(rest.get([1, 2])); // undefined

// We have to use the same array to properly get it from the map later, it has to be defined as a variale so it has a reference in memory
const arr = [1, 2];
rest.set(arr, 'Test');
console.log(rest.get(arr)); // 'Test'

// Getting a DOM Object to be the key:
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);

// Populating a ma without using the set method:
// We need to use an array of arrays
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct! 🎓'],
  [false, 'Try again!'],
]);

console.log(question);

// Convert object to map
// We use the object.entries because it returns an array of arrays!
console.log(Object.entries(game));
const gameMap = new Map(Object.entries(game));
console.log(gameMap);

// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

// const answer = prompt('Whats your answer? 1, 2 or 3?');

// if (Number(answer) === question.get('correct')) {
//   alert(`${question.get(true)}`);
// } else {
//   alert(question.get(false));
// }

// Converting a map to an array:
const mapArray = [...question];
// Array of arrays
console.log(mapArray);

// Maps also have the methods from objects and arrays like:
console.log(question.entries());
// The entries method is kinda dumb to use on maps, you just use the spread operator
console.log([...question]);
console.log([...question.keys()]);
console.log([...question.values()]);

/////////////////////////////////////////////////////////////////////
// CODING CHALLENGE #3
/*
Let's continue with our football betting app! This time, we have a map called 
'gameEvents' (see below) with a log of the events that happened during the 
game. The values are the events themselves, and the keys are the minutes in which 
each event happened (a football game has 90 minutes plus some extra time). 
Your tasks: 
1. Create an array 'events' of the different game events that happened (no 
duplicates) 
2. After the game has finished, is was found that the yellow card from minute 64 
was unfair. So remove this event from the game events log. 
3. Compute and log the following string to the console: "An event happened, on 
average, every 9 minutes" (keep in mind that a game has 90 minutes) 
4. Loop over 'gameEvents' and log each element to the console, marking 
whether it's in the first half or second half (after 45 min) of the game, like this: 
[FIRST HALF] 17: ⚽ GOAL 
 
GOOD LUCK 😀 
*/

/* 1. Create an array 'events' of the different game events that happened (no duplicates) */

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = [...gameEvents.values()];

const arrEvents = [...new Set(events)];
console.log(arrEvents);

/* 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log. */
gameEvents.delete(64);
console.log(gameEvents);

/* 3. Compute and log the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes) */

console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

/* 4. Loop over 'gameEvents' and log each element to the console, marking 
whether it's in the first half or second half (after 45 min) of the game, like this: 
[FIRST HALF] 17: ⚽ GOAL */

for (const [key, value] of gameEvents) {
  if (Number(key) < 45) {
    console.log(`[FIRST HALF] ${key}: ${value}`);
  } else if (Number(key) > 45) {
    console.log(`[SECOND HALF] ${key}: ${value}`);
  }
}

//////////////////////////////////////////////////////////////////////
// Working with Strings!
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B373'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal')); // Case sensitive

console.log(airline.slice(4));
console.log(airline.slice(4, 7)); // End value not included in slicing. The result length will always be end - beginning (in this case 7 - 4 = 3). Thats why it prints 'Air'

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2)); // Starts extracting from the end
console.log(airline.slice(1, -1)); // AP Air Portuga

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (seat.slice(seat.length - 1) === 'B' || s === 'E') {
    console.log('This are middle seats');
  } else {
    console.log('This arent middle seats');
  }
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name

const passenger = 'jOnAs'; // It should look like this: 'Jonas'
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.IO \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// Replace parts of strings
const priceGB = '$288,97';
const priceUS = priceGB.replace('$', '#').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replaceAll('door', 'gate'));

console.log(announcement.replace(/door/g, 'gate')); // Doing a replace all with a regular expresion. The 'g' behind the slash indicates that is a global parameter (It needs to be, in this case, replaced, globally)

// Booleans methods
const plane2 = 'A320neo';
console.log(plane2.includes('A320')); // True
console.log(plane2.includes('neo')); // True
console.log(plane2.includes('Boeing')); // False

console.log(plane2.startsWith('Air')); // false
console.log(plane2.startsWith('A3')); // True

if (plane2.startsWith('A320') && plane2.endsWith('neo'))
  console.log('Part of the NEW Airbus family');

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

// Split and Join methods
console.log('a+very+nice+string'.split('+')); // Returns a string splitted by the declared character
console.log('Sebastian Francineli'.split(' '));

const [firstName, lastName] = 'Sebastian Francinelli'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');

console.log(newName);

const toTitleCase = function (string) {
  const lowerSplitted = string.toLowerCase().split(' ');
  let finalStr = [];
  for (let i = 0; i < lowerSplitted.length; i++) {
    let newStr = [
      lowerSplitted[i][0].toUpperCase(),
      lowerSplitted[i].slice(1),
    ].join('');
    finalStr.push(newStr);
  }
  finalStr = finalStr.join(' ');
  return finalStr;
};

const capitalizeString = function (str) {
  const string = str.split(' ');
  const stringUpper = [];

  for (const s of string) {
    // stringUpper.push(s[0].toUpperCase() + s.slice(1));
    stringUpper.push(s.replace(s[0], s[0].toUpperCase()));
  }
  console.log(stringUpper.join(' '));
  return stringUpper.join(' ');
};

const passenger2 = 'jessica ann smith davis';
console.log(toTitleCase('sebastian francinelli senior dev'));
console.log(toTitleCase('SeBastIan FranCiNNelli JuNIOR Web DEVELOpeR'));
console.log(toTitleCase('seBastian'));

capitalizeString('seBasTiaN functiOn');

// Padding
const message = 'Go to gate 23!';
console.log(message.padStart(25, '%').padEnd(35, '&'));
console.log(message.length, message.padStart(25, '%').length);

const maskCreditCard = function (number) {
  const str = String(number);
  const lastFourDigits = str.slice(-4);
  const maskedCard = lastFourDigits.padStart(str.length, '*');
  return maskedCard;
};

console.log(maskCreditCard(46545412315468));
console.log(maskCreditCard('654541236874615468'));

// Repeat
const message2 = 'Bad wather... All Departues Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(45);

////////////////////////////////////////////////////////////////////////
// CODING CHALLENGE #4

/*
Write a program that receives a list of variable names written in underscore_case 
and convert them to camelCase. 
The input will come from a textarea inserted into the DOM (see code below to 
insert the elements), and conversion will happen when the button is pressed. 
Test data (pasted to textarea, including spaces): 
underscore_case 
 first_name 
Some_Variable  
  calculate_AGE 
delayed_departure 
Should produce this output (5 separate console.log outputs): 
underscoreCase      ✅ 
firstName           ✅✅ 
someVariable        ✅✅✅ 
calculateAge        ✅✅✅✅ 
delayedDeparture    ✅✅✅✅✅ 
Hints: 
§ Remember which character defines a new line in the textarea 😉 
§ The solution only needs to work for a variable made out of 2 words, like a_b 
§ Start without worrying about the ✅. Tackle that only after you have the variable 
name conversion working 😉 
§ This challenge is difficult on purpose, so start watching the solution in case 
you're stuck. Then pause and continue! 
 
Afterwards, test with your own test data! 
 
GOOD LUCK 😀 
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

function camelCaseGenerator(variable) {
  const splitVar = variable.toLowerCase().split('\n');
  const camelVar = [];
  for (let i = 0; i < splitVar.length; i++) {
    const splittedAndTrimmed = splitVar[i].trim().split('_');
    camelVar.push(
      splittedAndTrimmed[0] +
        splittedAndTrimmed[1][0].toUpperCase() +
        splittedAndTrimmed[1].slice(1)
    );
  }
  for (let j = 0; j < camelVar.length; j++) {
    console.log(`${camelVar[j].padEnd(20, ' ')}${'✅'.repeat(j + 1)}`);
  }
}

const button = document.querySelector('button');
const text = document.querySelector('textarea');

button.addEventListener('click', function () {
  camelCaseGenerator(text.value);
});

// CODING CHALLENGE #5
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const dividedFlights = flights.split('+');
console.log(dividedFlights);

const arrFli = [];

for (const flight of dividedFlights) {
  arrFli.push(flight.split(';'));
}

console.log(arrFli);
const formattedFli = [];

for (const f of arrFli) {
  formattedFli.push(
    f[0].replaceAll('_', ' ').trim() +
      ' ' +
      f[1].slice(0, 3).toUpperCase() +
      ' ' +
      'to ' +
      f[2].slice(0, 3).toUpperCase() +
      ` (${f[3].replace(':', 'h')})`
  );
  console.log(formattedFli[0].length);
}

for (let j = 0; j < formattedFli.length; j++) {
  console.log(
    `${formattedFli[j].startsWith('Delayed') ? '🚨' : '  '}${formattedFli[
      j
    ].padStart(36, ' ')}`
  );
}

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  let output = `${type.replaceAll('_', ' ')} from ${from
    .toUpperCase()
    .slice(0, 3)} to ${to.toUpperCase().slice(0, 3)} (${time.replace(
    ':',
    'h'
  )})`.padStart(50, ' ');

  output = output.includes('Delayed') ? output.replace('  ', '🛑') : output;

  console.log(output);
}
