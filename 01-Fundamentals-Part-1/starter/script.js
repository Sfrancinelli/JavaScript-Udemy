// let js = 'amazing';

// console.log(40 + 8 + 23 + 10);

// country = 'Argentina';

// continent = 'America';

// population = 10_000_000;

// console.log(country, continent, population);

/*
// Let variables can change upon execution and can be undefined
let age = 30;
age = 31;

// Const variables cannot be reasigned later. Throws TypeError if i try to 
// Const can't be undefined
const birthYear = 1991;
*/

/*
// Math operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = "Jonas";
const lastName = 'Schmedtmann';
console.log(firstName + ' ' + lastName);

// Assignment operators
let x = 10 + 5;
x += 10; // x = x + 10 = 25
x *= 10; // x = x * 10 = 250
x++; // x = x + 1
x--; // x = x - 1 
console.log(x);

// Comparison operators 
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);
*/

/*
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

// 1
const markWeight = 78;
const markHeight = 1.69;

const johnWeight = 92;
const johnHeight = 1.95;

let markHigherBMI;

const markBMI = markWeight / (markHeight ** 2);
const johnBMI = johnWeight / (johnHeight ** 2);
console.log(markBMI);
console.log(johnBMI);

if (markBMI > johnBMI) {
    markHigherBMI = true;
}

else {
    markHigherBMI = false;
}

console.log(markHigherBMI);
*/

/*
const firstName = 'Jonas';
const job = 'teacher';
const birthYear = 1991;
const year = 2023

const jonas = "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job

console.log(jonas);

// Template literals (f'strings)

const jonasNew = `I'm ${firstName}, a ${year - birthYear} year old ${job}!`;
console.log(jonasNew);
*/

/*
const age = 18;
const isOldEnough = age >= 18;

if (age >= 18) {
    console.log('You can drive 🚗')
} else {
    const yearsLeft = 18 - age;
    console.log(`You have to wait another ${yearsLeft} years`)
}

const birthYear = 1998;
let century;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(century);
*/

/*
// Ejercicio 2
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

if (BMIMark > BMIJohn) {
    console.log(`Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`)
} else {
    console.log(`John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`)
}
*/

/*
// Type conversion
const inputYear = '1991';
console.log(Number(inputYear));
console.log(Number(inputYear) + 18);

console.log(Number('Jonas')); // NaN
console.log(typeof NaN);

console.log(String(23), 23);

// Type coercion
console.log('I am ' + 23 + ' years old');
console.log('23' - '10' - 3);
*/

/*
// Falsy values: 0, '', undefined, null, NaN
console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean(''));

const money = 0; // Falsy value
if (money) {
    console.log("Don't spend ir all ;)");
} else {
    console.log('You should get a job!')
}

let height;

if (height) {
    console.log('Height is defined');
} else {
    console.log('Height is UNDEFINED');
}
*/

/*
const age = 18;

if (age === 18) console.log('Adult');

const input = prompt('This is an input')

const numberInput = Number(prompt('This is a number input'))

console.log(typeof input, input, typeof numberInput, numberInput)

if (numberInput === 23) {
    console.log('You entered 23')
} else if (numberInput === 7) {
    console.log('You entered 7')
} else if (numberInput === 9) {
    console.log('You entered 9')
} else {
    console.log('Im bored')
}

if (numberInput !== 23) console.log('El número no es 23')
*/