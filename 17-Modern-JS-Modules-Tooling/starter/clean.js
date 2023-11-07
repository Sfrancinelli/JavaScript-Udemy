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
const budget = [
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

/* BAD
var limits = {
  jonas: 1500,
  matilda: 100,
};
*/

const limits = {
  jonas: 1500,
  matilda: 100,
};

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

const checkLimit = function (user) {
  return limits[user] ? limits[user] : 0;
};

const addExpense = function (value, description, user = 'jonas') {
  user = checkUser(user);

  const limit = checkLimit(user);

  if (value <= limit) {
    budget.push({ value: -value, description, user });
  }
};

addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');

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

const checkBudget = function () {
  budget.forEach(el => {
    if (el.value < checkLimit(el.user)) el.flag = 'limit';
  });
};
checkBudget();

const bigExpenses = function (bigLimit) {
  let output = '';
  for (const entry of budget) {
    output +=
      entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

bigExpenses(1000);
bigExpenses(100);
console.log(budget);
