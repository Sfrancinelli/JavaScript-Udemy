'strict mode';

// Fixing bad practices on code

/* BAD
var budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];
*/

// Freezing the budget cause its a good practice to not modify the original data and create copies of this data and then modify said copies
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

/* BAD
var limits = {
  jonas: 1500,
  matilda: 100,
};
*/

// By wrapping the limits into the Object.freeze function we make the object inmutable
const limits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
// This wont work cause of the Object.freeze()
limits.jay = 200;
console.log(limits);

/* BAD
var add = function (value, description, user) {
  if (!user) user = 'jonas';
  user = user.toLowerCase();

  var lim;
  if (limits[user]) {
    lim = limits[user];
  } else {
    lim = 0;
  }

  if (value <= lim) {
    budget.push({ value: -value, description: description, user: user });
  }
};
*/

const checkUser = function (user) {
  return user.toLowerCase();
};

const checkLimit = function (limits, user) {
  return limits[user] ? limits[user] : 0;
};

const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = checkUser(user);

  const limit = checkLimit(limits, cleanUser);

  if (value <= limit) {
    // Instead of pushing into the original data, its a better practice to create a copy of the data and modify said copy
    return [...state, { value: -value, description, user: cleanUser }];

    // budget.push({ value: -value, description, user: cleanUser });
  }

  return state;
};

const newBudget1 = addExpense(budget, limits, 10, 'Pizza 🍕');
console.log(newBudget1);
const newBudget2 = addExpense(
  newBudget1,
  limits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, limits, 200, 'Stuff', 'Jay');

/* BAD
var checkBudget = function () {
  for (var el of budget) {
    var lim;
    if (limits[el.user]) {
      lim = limits[el.user];
    } else {
      lim = 0;
    }

    if (el.value < -lim) {
      el.flag = 'limit';
    }
  }
};
checkBudget();

console.log(budget);
*/

const checkBudget = function (state, limit) {
  return state.map(entry => {
    return entry.value < -checkLimit(limit, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry;
  });

  // return state.map(el => {
  //   if (el.value < checkLimit(limit, el.user)) el.flag = 'limit';
  // });
};
const finalBudget = checkBudget(newBudget3, limits);
console.log(finalBudget);

// const bigExpenses = function (state, bigLimit) {
//   let output = '';
//   for (const entry of budget) {
//     output +=
//       entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
//   }
//   output = output.slice(0, -2); // Remove last '/ '
//   console.log(output);
// };

const bigExpenses = function (state, bigLimit) {
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');

  return bigExpenses;
};

console.log(bigExpenses(finalBudget, 1000));
bigExpenses(finalBudget, 100);
console.log(finalBudget);
