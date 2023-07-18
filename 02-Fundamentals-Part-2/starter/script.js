'use strict';
/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true;
if (hasDriversLicense) console.log('Drive')
*/

// Functions:
/*
function logger() {
    console.log('Consola')
}

// calling / running / invoking
logger();

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;
}

let juiceNow = fruitProcessor(2, 3)

console.log(juiceNow)
*/

/*
// function declaration
function calcAge1(birthYear) {
    return 2023 - birthYear;
}

const age1 = calcAge1(2000);
console.log(age1)

// Anonymous function / function expression
const calcAge2 = function (birthYear) {
    return 2023 - birthYear;
}

// Calling an anonymous function is exactly the same as a normal function
console.log(calcAge2(2000));
const age2 = calcAge2(2000);

console.log(age1, age2);
*/

/* LECTURE 35
// Arrow function
const calcAge3 = birthYear => 2023 - birthYear;
const age3= calcAge3(2000)
console.log(age3)

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2023 - birthYear;
    const retirement = 65 - age;
    //return retirement;
    return `${firstName} retires in ${retirement} years!`
}

console.log(yearsUntilRetirement(2000, 'Sebastián'));
*/

/*
// LECTURE 36

function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces!`
    return juice
}

console.log(fruitProcessor(2,3))
*/

/*
// Lecture 37
const calcAge = (birthYear) => 2023 - birthYear;

const yearsUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;
    if (retirement <= 0) {
        return `${firstName} it's already on an age for retirement!`
    } else {
        return `${firstName} has ${retirement} years until retirement.`
    }
}

console.log(yearsUntilRetirement(1950, 'Sebastián Francinelli'))
*/

/*
// Lecture 38 (exercise)
const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const scoreDolphins = calcAverage(85, 54, 41);
const scoreKoalas = calcAverage(23, 34, 27);

function checkWinner(avgDolphins, avgKoalas) {
    if (avgDolphins >= (avgKoalas * 2)) {
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
    } else if (avgKoalas >= (avgDolphins * 2)) {
        console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
    } else {
        console.log('No team wins...')
    }
}

checkWinner(scoreDolphins, scoreKoalas)
*/

/*
// Lecture 39 - Arrays
const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends)

const years = new Array(1991, 1984, 2000, 2008, 2020);
console.log(years)

console.log(friends[0], friends[2], years[3])
console.log(friends.length)
console.log(friends[friends.length -1]);

friends[2] = 'Jay';
console.log(friends);
*/

/*
// Lecture 40

// Add elements
const friends = ['Michael', 'Steven', 'Peter'];
let newLength = friends.push('Jay');
console.log(friends, newLength);

newLength = friends.unshift('John');
console.log(friends, newLength);

// Remove elements
let removedValue = friends.pop(); // Last
console.log(friends, removedValue);

removedValue = friends.shift(); // First
console.log(friends, "///", removedValue);

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob')); // Returns -1 cause it doesn't exists.

friends.push(23);
console.log(friends.includes('Steven')); // true
console.log(friends.includes('Bob')); // false
console.log(friends.includes('23')); // false
console.log(friends.includes(23)); // true

if (friends.includes('Peter')) {
    console.log('El array contiene a Peter')
}
*/

// Exercise:
let tip;

function calcTip(bill) {
    if (bill >= 50 && bill <= 300) {
        tip = bill * 0.15;
    } else {
        tip = bill * 0.20;
    }
    return tip;
}

const tip100 = calcTip(100);
console.log(tip100);

const bills = [125, 555, 44];
const tips = [];

tips.push(calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2]));
console.log(tips);

const totals = [];

totals.push(`${bills[0]} + ${calcTip(bills[0])}`, `${bills[1]} + ${calcTip(bills[1])}`, `${bills[2]} + ${calcTip(bills[2])}`);
console.log(totals)