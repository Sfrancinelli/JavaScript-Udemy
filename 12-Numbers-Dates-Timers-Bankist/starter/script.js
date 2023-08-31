'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    const displayDate = `${day}/${month}/${year}`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

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

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// FAKE ALWAYS LOGGED IN (REMOVE LATER)
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;
// FAKE ALWAYS LOGGED IN (REMOVE LATER)

const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hour = now.getHours();
const min = now.getMinutes();

labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
// All numbers are registered as float point numbers in js
console.log(23 === 23.0);

console.log(0.1 + 0.3 === 0.3); // false beacuse js represents numbers in binary (base 2 - 0 and 1) and not in base 10 (0 to 9)

// Conversion
console.log(Number('23'));
console.log(+'23');

// Parsing
console.log(Number.parseInt('30px', 10)); //30
console.log(Number.parseInt('e23', 10)); // NaN

console.log(Number.parseFloat('2.5rem')); // 2.5

// Check if value is NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // flase
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23 / 0)); // false

// Best way of checking if value is a NUMBER (not a STRING)
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false

// Check for integer
console.log(Number.isInteger(20)); // true

// square root
console.log(Math.sqrt(25)); // 5
console.log(25 ** (1 / 2));

// Cubic root
console.log(8 ** (1 / 3));

// Return the maximum and minimum value
console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.min(5, 18, 23, 11, 2)); // 2

// Calculate area of a circule with radius of 10px
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Random numbers
console.log(Math.trunc(Math.random() * 6) + 1);

// Function to get random Ints beetween values passed
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

// Rounding integers
console.log(Math.trunc(23.3)); // Removes decimal part
console.log(Math.round(23.9)); // Round to the nearest integer
console.log(Math.ceil(23.3)); // Rounds always to the next integer (in this case, the result is 24)
console.log(Math.floor(23.9)); // Always rounded down (in this case 23)

// With negatives, trunc and floor works different
console.log(Math.trunc(-23.3)); // Removes decimal part
console.log(Math.floor(-23.9)); // Always rounded down (in this case -24)

// Rounding decimals
console.log((2.7).toFixed()); // Returns string (in this case, 3)
console.log((2.7).toFixed(3)); // Returns string (in this case, 2.700)

// Remainder operator
console.log(5 % 2); // 5 = 2 * 2 + 1
console.log(8 % 3);

const isEven = n => n % 2 === 0;

console.log(isEven(8));
console.log(isEven(823));
console.log(isEven(514));

labelBalance.addEventListener('click', function (e) {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) {
      row.style.backgroundColor = 'orangered';
    }

    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

// Numeric separator
// 287,460,000,000
const diameter = 287_460_000_000; // The engine ignores this underscores
console.log(diameter);

const priceCents = 345_99;

console.log(Number('230_000')); // NaN (don't write the numeric separator in strings, only in numbers)
console.log(parseInt('230_000')); // 230 (same as above)

// BigINT
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// To stablish a number as a big int we have to use an 'n' at the end
console.log(6156186432156485464468464684n);
console.log(BigInt(37912918918919164565622165469594956262n));

// Operation
console.log(10000n + 10000n);

const huge = 54694868468486n;
const num = 23;
// We cannot mix bigints with normal ints (we have to use the BigInt constructor as below)
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15); // True
console.log(20n === 20); // False cause js doesnt do type coersion
console.log(20n == '20'); // True cause js does type coersion
console.log(typeof 20n);
console.log(huge + ' is REALLY big!!!');

// Can't use Math module with bigints

// Division
console.log(10n / 3n); // 3n
console.log(10 / 3); // 3,333333333333
*/

/////////////////////////////////////////////////////////////////////7{/
// Dates and times
// Create a date
/*
let now = new Date();
console.log(now);

console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5));

console.log(new Date(0));
// 3 days later...
console.log(new Date(3 * 24 * 60 * 60 * 1000));
*/

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
// Month are 0 based like an array
console.log(future.getMonth()); // returns 10 but in real life is month 11
console.log(future.getDate()); // day of the month (19 in this case)
console.log(future.getDay()); // day of the week (4 in this case cause is thursday)
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // 2037-11-19T18:23:00.000Z
console.log(future.getTime()); // Miliseconds since jan 1 1970
