'use strict';
/*
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
*/

/////////////////////////////////////////////////////////////////////777
// CODING CHALLENGE
/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners 
about their dog's age, and stored the data into an array (one array for each). For 
now, they are just interested in knowing whether a dog is an adult or a puppy. 
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years 
old. 
Your tasks: 
Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things: 
1. Julia found out that the owners of the first and the last two dogs actually have 
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat 
ages from that copied array (because it's a bad practice to mutate function 
parameters) 
2. Create an array with both Julia's (corrected) and Kate's data 
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 
🐶") 
4. Run the function for both test datasets 
Test data: 
§ Data 1: Julia's data , Kate's data 
§ Data 2: Julia's data , Kate's data 
*/
/*
function checkDogs(dogsJulia, dogsKate) {
  const correctedJulia = [...dogsJulia];
  const catRemoved = correctedJulia.slice(1, -2);
  console.log(catRemoved);
  const bothArrs = catRemoved.concat(dogsKate);
  bothArrs.forEach(function (dog, i) {
    console.log(
      bothArrs[i] >= 3
        ? `Dog numer ${i + 1} is an adult, and is ${dog} years old`
        : `Dog number ${i + 1} is still a puppy 
🐶`
    );
  });
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/

/////////////////////////////////////////////////////////////////////
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// MAP METHOD
// Map returns a new array containing the results of applying an operation on all original array elements.
// The map method also takes an array to loop, similar to the forEach method.
// The map method does not mutates the original array
const eurToUsd = 1.1;

const movementsUSD = movements.map(function(mov){
  return mov * eurToUsd
})

console.log(movements)
console.log(movementsUSD)

/ With FOR Loop
const movementsUSDfor = []
for (const mov of movements)movementsUSDfor.push(mov*eurToUsd)
console.log(movementsUSDfor)

const movementsUSDarrow = movements.map(mov => mov * eurToUsd)
console.log(movementsUSDarrow)

const movementsDescriptions = movements.map((mov, i) => {
    return `Movement ${i + 1}: You ${mov > 0 ? 'deposit' : 'withdrew'} ${Math.abs(mov)}`
  }
)
console.log(movementsDescriptions)
*/

// FILTER METHOD
// filter returns a new array containing the array elements that passed a specified test condition

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});

// With FOR Loop
const despositsFor = [];
for (const mov of movements) {
  if (mov > 0) despositsFor.push(mov);
}

console.log(movements);
console.log(deposits);
console.log(despositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/

/*
// REDUCE METHOD
// reduce boils ('reduces') all array elements down to one single value (e.g. adding all elements together)
console.log(movements);
const globalBalance = movements.reduce(function (accumulator, curr, i, arr) {
  console.log(`Iteration ${i}: ${accumulator}`);
  return accumulator + curr;
}, 0); // This 0 is the inicial value of the accumulator (its editable)
console.log(globalBalance);

// With Arrow function
const balance = movements.reduce((accumulator, curr) => accumulator + curr, 0);
console.log(balance);

// With FOR Loop
let sum = 0;
for (const mov of movements) sum += mov;
console.log(sum);

// Maximum value
const max = movements.reduce(
  (acc, curr) => (acc < curr ? (acc = curr) : (acc = acc)),
  movements[0]
);
console.log(max);
*/

// FIND METHOD
// The find method also needs a calback function that returns a boolean (like the filter method) but it will return the first element that satisfies that condition and not (like the filter method) a new array changing accordgin to condition.

//First withdrawal is this:
// console.log( movements.find(function (mov) {return mov < 0;}));

// Finding an object by its property
/*
const account5 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
};

const account6 = {
  owner: 'Jessica Davis',
  objeto: 'Este objetoooo',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
};

const account7 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
};

const account8 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
};

const accountss = [account5, account6, account7, account8];

const account = accountss.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
*/
//////////////////////////////////////////////////////////////////777777
// CODING CHALLENGE #3
/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert 
dog ages to human ages and calculate the average age of the dogs in their study. 
Your tasks: 
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's 
ages ('ages'), and does the following things in order: 
1. Calculate the dog age in human years using the following formula: if the dog is 
<= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, 
humanAge = 16 + dogAge * 4 
2. Exclude all dogs that are less than 18 human years old (which is the same as 
keeping dogs that are at least 18 years old) 
3. Calculate the average human age of all adult dogs (you should already know 
from other challenges how we calculate averages 😉) 
4. Run the function for both test datasets 
Test data: 
§ Data 1: [5, 2, 4, 1, 15, 8, 3] 
§ Data 2: [16, 6, 10, 5, 6, 1, 4] 
*/

/*
function calcAverageHumanAge(ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);
  const adults = humanAges.filter(age => age >= 18);
  console.log(adults);
  const avg = adults.reduce((acc, curr) => acc + curr, 0) / adults.length;
  console.log(avg);

  return avg;
}

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

function calcAverageHumanChain(ages) {
  const avg = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);

  console.log(avg);
  return avg;
}

calcAverageHumanChain([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanChain([16, 6, 10, 5, 6, 1, 4]);
*/

/*
////////////////////////////////////////////////////////////////
// Chaining methods
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // Printing array for debbuging
    console.log(mov, arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);
*/

/////////////////////////////////////////////////////////////////
// some and every
/*
console.log(movements);
console.log(movements.includes(-130));
console.log(movements.some(mov => mov === -130));
// With the some and every methods we can use complex conditions to check. The SOME METHOD returns a boolean corresponding to the condition specified in the function. The some method will return true if ANY value on the array corresponds to the condition (ANY).

const anyDeposits = movements.some(mov => mov > 0); //true
console.log(anyDeposits);

// The EVERY Method only return true if ALL the elements on the array satisfies the condition passed in the function callback (ALL)
const allDeposits = movements.every(mov => mov > 0); // False because not EVERY element on the array is positive
[100, 200, 300, 400, 500, 600].every(mov => mov > 0); //true cause ALL the elemnts are positive

// Seperate callback
const deposit = mov => mov > 0;
movements.every(deposit);
movements.some(deposit);
movements.filter(deposit);

////////////////////////////////////////////////////////////////
// FLAT and FLATMAP Methods
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());
// The FLAT Method removes the nested arrays from a given array and returns a new array with said modifications. The flat method goes ONE LEVEL DEEP.

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// If we try to flat this more deep nested array of arrays, the flat method cant do it in one go:
console.log(arrDeep.flat());
// Flat can accept arguments though and if we specify a given number, we can get event deeper flat:
console.log(arrDeep.flat(2));

const accountMovements = accountss.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

const overallBalance = accountss
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap
// The flatMap Method works as a map function but it then flattens the new array. It's important to know that the flatMap method can only go 1 level deep and it doesnt accept parameters for that matter.
const overallBalance2 = accountss
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance2);
*/

/*
// SORT METHOD
// The SORT METHOD actually mutates the original array
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());

// In order to sort numbers its actually neccesary to provide a callback function to the sort method. This happens because the sort method sorts by string alphabetical order and it takes the numbers as the string form of em
console.log(movements);
console.log(movements.sort()); // This doesnt work as explain above

// If we return something less than 0 (a < 0) then A will be sorted before B (A,B)
// If we return sometinh grater than 0 (a > 0) then A will be sorted after B (B,A)

// Sorting in ascending order:
console.log(
  movements.sort((a, b) => {
    if (a > b) return 1;
    if (b > a) return -1;
  })
);

// Sorting in descending order:
console.log(
  movements.sort((a, b) => {
    if (b > a) return 1;
    if (a > b) return -1;
  })
);

// It can also be done in a much simpler way:
// Sorting in ascending order:
console.log(movements.sort((a, b) => a - b));
// Sorting in descending order:
console.log(movements.sort((a, b) => b - a));
*/

/*
// FILL METHOD + EMPTY ARRAYS
const x = new Array(7); // This creates an array with 7 empty elements (weird behavior). To fill an array like this is that we use the fill method. In this way we can dinamically create arrays
console.log(x);
// The FILL METHOD mutates the original array!
x.fill(1);
console.log(x);
// We can also specify a second parameter indicating the index in which the fill starts and ends (The specified end parameter will not be included like in the slice method):
x.fill('filling', 3, 5);
console.log(x);

// FROM METHOD
// We call this method from the Array object itself (the constructor) and we specify, first, the length of the array. Second, que pass the callback function like in the map method. This function will need to return something that will fill the array in each iteration with the given returned value
const y = Array.from({ length: 7 }, function () {
  return 'Y Array';
});
console.log(y);

// Array from 1 to 7
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const hundredDiceRolls = Array.from({ length: 100 }, () => {
  return Math.floor(Math.random() * 6) + 1; //returns random number between [1-6]
});
console.log(hundredDiceRolls);

// Retreiving the movements from the UI and creating an array dinamically:

let labelBalance = document.querySelector('.balance__value');

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  // Using the second part of the Array.from() (the callback function) to already map the array and get the final result into the array.

  // console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));
  console.log(movementsUI);

  // We can use the spread operator to create an array from the elements of the document but its not as recommended as the above method (Array.from)
  const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI2);
});

///////////////////////////////////////////////////////////////////
// Array Methods Practice

// Getting the global positive balance from all accounts
const bankDepositSum = accountss
  .map(acc => acc.movements)
  .flat()
  .filter(mov => mov > 0)
  .reduce((val1, val2) => val1 + val2);
console.log(bankDepositSum);

// How many deposits in the bank with at least 1000USD
const numDeposits1000 = accountss
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;

const numDeposits1000v2 = accountss
  .flatMap(acc => acc.movements)
  .reduce((counter, curr) => (curr >= 1000 ? counter + 1 : counter), 0);

console.log(accountss.flatMap(acc => acc.movements));
console.log(numDeposits1000);

// New object from array.reduce()
const sums = accountss
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  ); // The accumulator starts being an object!

// When the function has a body is always necesary to return the accumulator!!

console.log(sums);

// New array from array.reduce()
const arrSums = accountss
  .flatMap(acc => acc.movements)
  .reduce((sum, cur) => {
    let deposits = 0;
    let withdrawals = 0;
    cur > 0 ? (deposits += cur) : (withdrawals += cur);
    if (deposits > 0) {
      sum.push(deposits);
    } else if (withdrawals < 0) sum.push(withdrawals);
    return sum;
  }, []);

console.log(arrSums);

// Convert string into titleCase
const toTitleCase = function (title) {
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (exceptions.includes(word)) {
        return word;
      } else {
        // return `${word[0].toUpperCase()}${word.slice(1)}`;
        return capitalize(word);
      }
    })
    .join(' ');
  return capitalize(titleCase);
};

console.log(toTitleCase('this is a nice title'));
console.log(toTitleCase('this is a LONG title but not too long'));
console.log(toTitleCase('and here is another title with an example'));

////////////////////////////////////////////////////////////////////
console.log('---------CODING CHALLENGE #4---------');

//Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Formula:
// recommendedFood = weigth ** 0.75 * 28 (The result is in grams of food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array and so this one is a bit tricky.
// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle')
// 4. Log a string to the console for each array created in 3. like this: 'Matilda and Alice and Bob's dogs eat too much!' and Sarah and John and Michael's dogs eat too little!'
// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6)
// 8. Create a shallow copu of the 'dogs' array and sort it by recommended food portion in ascending order (keep in mind that the potions are inside the array's objects)

// Hints:
// Use many different tools to solve these challenges, you can use the summary lecture to choose between them

// Being within a range 10% above and bellow the recommended portion means:
// current > (recommended * 0.90) && current < (recommended * 1.10)
// Basically, the current portion should be between 90% and 110% of the recommended portion

// DATA:
const dogs = [
  { weigth: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weigth: 8, curFood: 200, owners: ['Matilda'] },
  { weigth: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weigth: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(dog => {
  dog.recommendedFood = Math.trunc(dog.weigth ** 0.75 * 28);
});

// 2
dogs.forEach(dog => {
  if (dog.owners.includes('Sarah')) {
    console.log(
      dog.curFood > dog.recommendedFood
        ? "Sarah's dog is eating too much!"
        : "Sarah's dog is eating too little!"
    );
  }
});

// 3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4
function stringCreator(arr, mode) {
  let resultString = '';
  resultString += `${arr.join(' and ')}'s dogs eat too ${mode}!`;
  console.log(resultString);
}

stringCreator(ownersEatTooLittle.flat(), 'little');
stringCreator(ownersEatTooMuch.flat(), 'much');

// 5
console.log(dogs);
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6
console.log(
  dogs.some(
    dog =>
      dog.curFood > dog.recommendedFood * 0.9 &&
      dog.curFood < dog.recommendedFood * 1.1
  )
);

// 7
const okayAmount = dogs.filter(dog => {
  if (
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
  ) {
    return dog;
  }
});
console.log(okayAmount);

// 8
const shallowCopy = dogs
  .map(dog => dog)
  .sort((a, b) => a.recommendedFood - b.recommendedFood);

console.log(shallowCopy);

console.log('---------CODING CHALLENGE #4---------');
*/

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
// const labelBalance = document.querySelector('.balance__value');
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

// for (let acc of accounts) {
//   let user = acc.owner.split(' ');
//   for (let [i, _] of user.entries()) {
//     console.log(user);
//     console.log(user[i].slice(0, -user[i].length + 1).toLowerCase());
//     let username = user[i].slice(0, -user[i].length + 1).toLowerCase();
//     console.log((username += username));
//   }
// }

// Creating the usernames with the initials
const users = [];
let username;
// Current account:
let user;

for (let acc of accounts) {
  // Splitting the objects from the account into the names
  acc.balance = 0;
  users.push(acc.owner.split(' '));
  // console.log(users);
}

// Getting the user account owner in the correct format to compare to user imput
users.forEach(function (elem, i) {
  // console.log(elem, i);
  // Splitting the names of the owners into the initials in lowerCase and preparing a new property of the account object (user) with said value
  username =
    (elem[0][0] + elem[1][0]).toLowerCase() +
    (elem[2] ? elem[2][0].toLowerCase() : '') +
    (elem[3] ? elem[3][0].toLowerCase() : '');
  accounts[i].user = username;
  // console.log(accounts[i].user);
});

// Managing login
const login = function (e) {
  // event.preventDefault() so the page doesnt reload on login button and it properly displays the new opacity
  e.preventDefault();
  let correct = false;
  let inputLogin = inputLoginUsername.value;
  let inputPin = Number(inputLoginPin.value);

  // console.log(inputLogin, inputPin);
  for (let acc of accounts) {
    // console.log(acc.user, acc.pin);
    // Checking if the input corresponds to the account credential and when it matches one from the accounts array, it breaks the loop and sets the global variables 'user' to the current account loged
    if (inputLogin === acc.user && inputPin === acc.pin) {
      correct = true;
      user = acc;
      break;
    }
  }
  // console.log(correct);
  if (correct) {
    // If login is succesfull, the opacity of the conteiner app is setted to 1 to be dislplayed, it also shows the welcome message and blanks the user and pin inputs
    // document.querySelector('.app').style.opacity = '1';
    document.querySelector('.app').setAttribute('style', 'opacity: 1;');
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();
    labelWelcome.textContent = `Good Morning, ${user.owner.split(' ')[0]}!`;
  }

  // Dinnamically displaying the user movements, balance and summary.
  updateUI(user);

  return user;
};

// Displaying movements on containerApp
const displayMovements = function (movements) {
  // Creating the necessary HTML to display the movements. It requires an array of movements (numbers) and it defines wether is a deposit or a withdrawal if its greater or lesser than 0
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
<div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
<div class="movements__date">3 days ago</div>
<div class="movements__value">${mov}€</div>
</div>
`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Displaying the balance of the account
const calcDisplayBalance = function (movements) {
  // Adds up al the movements array and displays it in the corresponding label
  const balance = movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance}€`;
  user.balance = balance;
};

// Displaying the summary data
const calcDisplaySummary = function (user) {
  // Calculates all the summary values, the incomes by adding the positives (deposits), the outcomes by adding the negatives (withdrawals) and the interest base on the current acount interest.
  const incomes = user.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumIn.textContent = `${incomes}€`;

  const outcomes = user.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = user.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * user.interestRate) / 100)
    .filter((interest, i, arr) => {
      return interest >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);

  labelSumInterest.textContent = `${interest.toFixed(2)}€`;

  return incomes;
};

// Requesting a loan from the bank
const requestLoan = function (e) {
  // Request a loan into the bank and updates the the account movements. Also updates the balance and the summary.
  e.preventDefault();
  const loan = inputLoanAmount.value;
  user.movements.push(Number(loan));

  setTimeout(function () {
    updateUI(user);
  }, 3000);

  inputLoanAmount.value = '';
};

// Managing the transfer of money through accounts
const transferMoney = function (e) {
  // Transfer money from account to account, it updates the current account movements and also updates the movements from the destiny account
  e.preventDefault();
  const to = inputTransferTo.value;
  const amount = inputTransferAmount.value;

  const accountTo = accounts.find(acc => acc.username === to);
  if (
    user.balance >= amount &&
    amount > 0 &&
    accountTo?.username !== user.username &&
    accountTo
  ) {
    // console.log(to);
    // console.log(accountTo);
    user.movements.push(Number(-amount));
    accountTo.movements.push(Number(amount));

    setTimeout(function () {
      updateUI(user);
    }, 1000);

    inputTransferTo.value = '';
    inputTransferAmount.value = '';
  } else {
    alert('Cant trasnfer what you dont have');
  }
};

// Managing the closing of accounts
const closeAccount = function (e) {
  // 'Closes the account' that translates to removing the account from the accounts array so its never found when trying to login.
  e.preventDefault();
  let userConfirm = inputCloseUsername.value;
  let pinConfirm = inputClosePin.value;
  if (user.pin === Number(pinConfirm) && user.username === userConfirm) {
    accounts.forEach((account, i, arr) => {
      if (arr[i] === user) {
        arr.splice(i, 1);
      }
    });
    console.log(accounts);
    document.querySelector('.app').setAttribute('style', 'opacity: 0;');
    document.querySelector('.form__input--user').value = '';
    document.querySelector('.form__input--pin').value = '';
  }
};

let sorted = false;
let sortedMov;

// Managing the sort button for the movements
const sortDisplayMovements = function (e) {
  // If sort is false, it sorts the movements in ascending order. If sorted is true it return the original movements order (in date order)
  e.preventDefault();
  console.log(sorted);
  if (!sorted) {
    sortedMov = user.movements.map(function (mov) {
      return mov;
    });
    sortedMov.sort(function (a, b) {
      sorted = true;
      return a - b;
    });
    displayMovements(sortedMov);
  } else {
    sorted = false;
    displayMovements(user.movements);
  }
};

// Creaing a function for the update of the UI to keep the code DRY
const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDisplaySummary(acc);
  calcDisplayBalance(acc.movements);
};

// Event handlers
btnLogin.addEventListener('click', login);
btnLoan.addEventListener('click', requestLoan);
btnTransfer.addEventListener('click', transferMoney);
btnClose.addEventListener('click', closeAccount);
btnSort.addEventListener('click', sortDisplayMovements);

// DEBUG
document.body.addEventListener('click', function () {
  console.log(user);
});

////////////////////////////////////////////////////////////////////////
// Proffessor functions
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);
console.log(accounts);

let currentAccount;

const loginProff = function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    displayMovements(currentAccount.movements);
    calcDisplaySummary(currentAccount);
    calcDisplayBalance(currentAccount.movements);
  }
};

const transferProff = function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    recieverAccount &&
    currentAccount.balance >= amount &&
    recieverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieverAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = '';
};

const deleteAccProf = function (e) {
  const userClose = inputCloseUsername.value;
  const pinClose = Number(inputClosePin.value);

  if (userClose === user.username && pinClose === user.pin) {
    const index = accounts.findIndex(acc => acc.username === user.username);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
    inputCloseUsername.value = '';
    inputClosePin.value = '';
  }
};

const loanProff = function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
};

const displayMovementsProf = function (movements, sort = false) {
  // Creating the necessary HTML to display the movements. It requires an array of movements (numbers) and it defines wether is a deposit or a withdrawal if its greater or lesser than 0
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
<div class="movements__row">
<div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
<div class="movements__date">3 days ago</div>
<div class="movements__value">${mov}€</div>
</div>
`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// This function would call the from the button with the sort parameter setted to true:
let sortedProf = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovementsProf((currentAccount.movements, !sortedProf));
  sorted = !sorted;
});
